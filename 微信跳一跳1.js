//随便问下脚本中途结束，运行命令怎么写
toast("请在5秒内打开游戏，并点击开始按钮");
sleep(1000)
setScreenMetrics(1080, 1920);
sleep(5000)
if (!requestScreenCapture()) {
  toast("请求截图失败");
  exit
}
sleep(10)
dx = 2
while (dx) {
  var img = captureScreen();
  a2x = 0
  a2y = 0
  var point = findColorEquals(img, 0x41395b, 90, 620, 900, 1000);
  if (point) {
    a1x = point.x
    a1y = point.y
  } else {
    toastLog("没有找到");
  }
  sleep(1000)
  for (a = 530; a < 1000; a = a + dx) {
    for (b = 100; b < 1000; b = b + dx) {
      aa1 = images.pixel(img, b, a);
      aa = images.pixel(img, b + 3, a);
      if (Math.abs(aa - aa1) > 100000) {
        log("aa" + aa)
        log("aa1" + aa1)
        log("x=" + b + "--y=" + a)
        a2x = b
        a2y = a
        a = 5000
        b = 5000
      }
    }
  }
  jl = Math.round(Math.sqrt((Math.abs(a2x - a1x)) * (Math.abs(a2x - a1x)) + (Math.abs(a2y - a1y)) * (Math.abs(a2y - a1y))))
  log(jl)
  press(559, 1500, jl * 1.5)
  sleep(2000);
}