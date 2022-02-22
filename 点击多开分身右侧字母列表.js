 //导入模块
 function 导入常用函数模块() {
  var url = 'https://raw.githubusercontent.com/snailuncle/autojsCommonFunctions/master/autojsCommonFunctions.js'
  var r = http.get(url)
  log("code = " + r.statusCode);
  var html = r.body.bytes()
  files.writeBytes('./autojsCommonFunctions.js', html)
  var common = require('./autojsCommonFunctions.js')
  return common
}
var common = 导入常用函数模块()

// 第一步启动多开分身
var appName = '多开分身'
common.启动app(appName)

// 第二步点击加号
var 加号fullId = 'com.bly.dkplat:id/iv_btn_create'
log(common.clickAttr('id', 加号fullId))

// 第三布 找右侧字母控件
var 多开分身右侧字母区域控件 = common.获取多开分身右侧字母区域控件()
log(多开分身右侧字母区域控件)

// 第四步 获取app的拼音头一个字母
var 字母 = common.获取拼音(appName).substr(0, 1)
log("字母=", 字母)

// 第五步 获取字母的位置
var 字母的位置 = common.获取多开分身右侧字母区域指定字母的位置(多开分身右侧字母区域控件, 字母)
log(字母的位置)

// 第六步 画个点显示一下位置
common.画点(字母的位置.x, 字母的位置.y)
press(字母的位置.x, 字母的位置.y, 1)
