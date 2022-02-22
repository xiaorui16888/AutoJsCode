function clickView(view) {
  log(arguments.callee.name + '开始')
  log(view)
  if (view) {
    var x = view.bounds().centerX()
    var y = view.bounds().centerY()
    log('将要点击的坐标 %s,%s', x, y)
    press(x, y, 1)
  } else {
    throw '传入clickView中的view异常'
  }
  log(arguments.callee.name + '结束')
}
