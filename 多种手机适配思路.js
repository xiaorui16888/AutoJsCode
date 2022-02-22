/**
 * @author 家
 * @date 20190803
 */

// autojs基于控件, 大部分操作都是通用的, 一部分不通用, 比如模拟停止app
// 常用手机如 小米, 华为, 模拟器
// app.openAppSetting(packageName) 打开app详情页
// 点击停止, 停止的控件名字是不一样的
// 模拟器直接就用shell停止

// 大部分方法是共享的,  放到 prototype 上共享
// 一少部分各是各的, 重写父类的方法

// 基类 Mobile
var Mobile = function (name) {
  if (this instanceof Mobile) {
    this.name = name
    this.stopApp = function () {
      throw new Error('请重写该手机的停止app方法')
    }
  } else {
    return new Mobile(name)
  }
}
// 通用的方法 在这里共享
Mobile.prototype = {
  show: function () {
    log('this mobile name is ' + this.name)
  },
  openApp: function () {    
    log('打开app')
  },
  sendMsg: function () {    
    log('发送消息')
  },
}
// 实例 华为 
var huawei = new Mobile('huawei')
// 实例 小米 
var xiaomi = new Mobile('xiaomi')
// 实例 模拟器 
var simulator = new Mobile('simulator')


// xiaomi.show()


// 这里报错, 因为没有重写stopApp方法
// xiaomi.stopApp()
//重写 stopApp 方法
xiaomi.stopApp = function () {
  log('停止app')
}
// xiaomi.stopApp()


// 以上操作完成后, 下面的是逻辑部分, 一般不需要改, 要改只改上面的

var mobiles = {
  Huawei: huawei,
  Xiaomi: xiaomi,
  Simulator: simulator,
}

mobiles[device.brand].show()
mobiles[device.brand].openApp()
mobiles[device.brand].sendMsg()
mobiles[device.brand].stopApp()