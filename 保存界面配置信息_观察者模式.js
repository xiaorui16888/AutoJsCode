"ui";
/**
 * @author 家
 * @date 20190803
 */
// 有界面的一般希望保存用户的常用设置
// 一开始有作者的默认界面设置, 用户使用后有自己的使用习惯,
// app第二次打开后应当加载用户自己的界面配置

// 这是一种双向通信, 
// 通信双方是 app界面配置文件 <-> app界面控件
// 可以使用  发布-订阅者模式 别名 观察者模式

// app界面配置文件相当于发布者:
// 1. 注册界面控件, 也就是 与发布者签合同的人是谁
// 2. 订阅方法, 也就是 与发布者签订合同
// 3. 取消订阅方法, 也就是 与发布者取消合同
// 4. 执行订阅者注册的函数, 也就是 按合同办事


var Publisher = (
  function () {
    var _messages = {}
    return {
      // 订阅
      subscribe: function (type, fn) {
        if (typeof _messages[type] === 'undefined') {
          _messages[type] = [fn]
        } else {
          _messages[type].push(fn)
        }
      },
      // 取消订阅
      unsubscribe: function (type, fn) {
        if (_messages[type] instanceof Array) {
          var i = _messages[type].length - 1;
          for (; i >= 0; i--) {
            _messages[type][i] === fn && _messages[type].splice(i, 1)
          }
        }
      },
      // 发布
      publish: function (type, args) {
        if (!_messages[type]) return;
        len = _messages[type].length
        for (var i = 0; i < len; i++) {
          _messages[type][i].call(this, args)
        }
      },
    }
  }
)()

// // 测试发布者
// Publisher.subscribe('test', function (event) {
//   log(event.type, event.args.msg)
// })
// Publisher.publish('test', {
//   msg: '传递参数'
// })

// 现在创建一个输入框, 下拉框, 保存界面信息的按钮
var entries = "选项1|选项2|选项3"
ui.layout(
  <vertical>
    <horizontal>
      <text textSize='20sp'>请输入: </text>
      <input w='*' id='input'></input>
    </horizontal>
    <spinner id="spinner" entries="{{entries}}" />
    <button textSize='20sp' id='save' margin='30 150 30 10'>保存界面配置信息</button>
    <text textSize='20sp' id='config'></text>
  </vertical>
)

// 本地存储用来保存配置文件
var path = files.join(files.getSdcardPath(), 'widgetConfig.json')
if (!files.exists(path)) {
  files.write(path, '{}')
}
ui.save.click(
  function () {
    // 向app配置文件注册  输入框
    Publisher.subscribe('输入框', function (idAndWidget) {
      var id = idAndWidget.id
      var widget = idAndWidget.widget
      log('id=' + id)
      var widgetText = widget.text()
      log('widgetText=' + widgetText)
      var widgetValue = readWidgetConfig()
      widgetValue[id] = widgetValue[id] || {}
      var info = {
        type: 'input',
        text: widgetText,
      }
      widgetValue[id].info = info
      log('保存前')
      log(widgetValue)
      writeWidgetConfig(widgetValue)
      log('保存后')
      widgetValue = readWidgetConfig()
      log(widgetValue)
    })
    // 向app配置文件注册  下拉框
    Publisher.subscribe('下拉框', function (idAndWidget) {
      var id = idAndWidget.id
      var widget = idAndWidget.widget
      log('id=' + id)
      var widgetSelectedItem = widget.getSelectedItem()
      log('widgetSelectedItem=' + widgetSelectedItem)
      var widgetValue = readWidgetConfig()
      widgetValue[id] = widgetValue[id] || {}
      var info = {
        type: 'spinner',
        selectedItem: widgetSelectedItem,
      }
      widgetValue[id].info = info
      log('保存前')
      log(widgetValue)
      writeWidgetConfig(widgetValue)
      log('保存后')
      widgetValue = readWidgetConfig()
      log(widgetValue)
    })

    Publisher.publish('输入框', {
      id: 'input',
      widget: ui.input
    })
    Publisher.publish('下拉框', {
      id: 'spinner',
      widget: ui.spinner
    })
    var widgetValue = readWidgetConfig()
    log(widgetValue)
    ui.config.setText(JSON.stringify(widgetValue))
  }
)

ui.post(
  function () {
    var widgetValue = readWidgetConfig()
    for (var k in widgetValue) {
      var widgetInfo = widgetValue[k]
      log(k + '=' + JSON.stringify(widgetInfo))
      var id = k
      log('id=' + id)
      // 每种控件设置属性的方式不一样, 所以增加了type来判断是那种控件.
      var type = widgetInfo.info.type
      log('type=' + type)
      if (type === 'input') {
        var text = widgetInfo.info.text
        log('text=' + text)
        ui[k].setText(text)
      } else if (type === 'spinner') {
        var selectedItem = widgetInfo.info.selectedItem
        log('selectedItem=' + selectedItem)
        log('entries=' + entries)
        var myEntries = entries.split('|')
        for (var i = 0; i < myEntries.length; i++)
          if (myEntries[i] === selectedItem) {
            log('myEntries[' + i + ']=' + myEntries[i])
            log('selectedItem=' + selectedItem)
            log('这俩一样')
            ui[k].setSelection(i, true);
            break;
          } else {
            log('myEntries[' + i + ']=' + myEntries[i])
            log('selectedItem=' + selectedItem)
            log('这俩不一样')
          }
      } else {

      }
    }
  }
)


function writeWidgetConfig(widgetValue) {
  var path = files.join(files.getSdcardPath(), 'widgetConfig.json')
  var fileContent = files.read(path)
  var oldWidgetValue = JSON.parse(fileContent)
  var newWidgetValue = Object.assign(oldWidgetValue, widgetValue);
  files.write(path, JSON.stringify(newWidgetValue))
}


function readWidgetConfig() {
  var path = files.join(files.getSdcardPath(), 'widgetConfig.json')
  var fileContent = files.read(path)
  var widgetValue = JSON.parse(fileContent)
  return widgetValue
}









