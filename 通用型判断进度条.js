sleep(3000)
console.show()
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
log("2")
var w = device.width;
var h = device.height;
var 范围 = id("red_packet").findOne();
//在这里自行定义颜色 替换颜色常量
log(范围.bounds())
x1 = (范围.bounds().left)+10
y1 = (范围.bounds().top)
x2 = (范围.bounds().right)-10
y2 = (范围.bounds().top)
x3 = (范围.bounds().right)-10
y3 = (范围.bounds().bottom)
x4 = (范围.bounds().left)+10
y4 = (范围.bounds().bottom)
var image = captureScreen();
log(x2)
log(y2)
log(x3)
log(y3)
sleep(1500)
var color = images.pixel(image, x1, y1); //显示该颜色值 
log(colors.toString(color));
for (i = 0; i < 100; i++) {   
    sleep(8000)
    log("检查第二坐标")
    if (colors.toString(images.pixel(image, x2, y2)) == "#ffffd235") {
        log("进度正常x2")
        log(colors.toString(color))
    } else {
        log("进度疑为暂停3秒后重新判断")
        sleep(5000)
        a()
    }
    sleep(8000)
    log("检查第三坐标")
    if (colors.toString(images.pixel(image, x3, y3)) == "#ffffd235") {
        log("进度正常x3")
    } else {
        log("进度疑为暂停3秒后重新判断")
        sleep(5000)
        b()
    }
    sleep(8000)
    log("检查第四坐标")
    if (colors.toString(images.pixel(image, x4, y4)) == "#ffffd235") {
        log("进度正常x4")
    } else {
        log("进度疑为暂停3秒后重新判断")
        sleep(5000)
        c()
    }
    sleep(8000)
    log("检查第一坐标")
    if (colors.toString(images.pixel(image, x1, y1)) == "#ffffd235") {
        log("进度正常x1")
        log(colors.toString(color))
    } else {
        log("进度疑为暂停3秒后重新判断")
        sleep(5000)
        d()
    }
};

function a() {
    log("检查第二坐标颜色")
    if (colors.toString(images.pixel(image, x2, y2)) == "#ffffd235") {
        log("进度正常")
    } else {
        log("进度已暂停")
        log("滑动")
        swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
    }
};

function b() {
    log("检查第三坐标颜色")
    if (colors.toString(images.pixel(image, x3, y3)) == "#ffffd235") {
        log("进度正常")
    } else {
        log("进度已暂停")
        log("滑动")
          w = device.width;
h = device.height;
        swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
    }
};

function c() {
    log("检查第四坐标颜色")
    if (colors.toString(images.pixel(image, x4, y4)) == "#ffffd235") {
        log("进度正常")
    } else {
        log("进度已暂停")
        log("滑动")
        swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
    }
};

function d() {
    log("检查第一坐标颜色")
    if (colors.toString(images.pixel(image, x1, y1)) == "#ffffd235") {
        log("进度正常")
    } else {
        log("进度已暂停")
        log("滑动")
        swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
    }
};