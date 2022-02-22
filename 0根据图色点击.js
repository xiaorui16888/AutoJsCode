console.show()
requestScreenCapture(true);
console.log("开始截图")
images.captureScreen("/sdcard/临时存放/截图.png")
sleep(1000)
console.log("开始读取")
读取 = images.read("/sdcard/临时存放/截图.png")

var 闯关 = threads.start(function() {
  var 读取闯关 = findColor(读取, "#00ff00")
  region: [898, 584, 1063, 636]
  threshold: 5
  if (读取闯关) {
    console.info("点击闯关按钮")
    click(读取闯关.x, 读取闯关.y)
  } else {
    console.warn("未找到闯关按钮")
  }
})