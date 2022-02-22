//首次打开应用后的提现弹窗没处理请知悉 
//逻辑是找进度条颜色区域在右上部分 请把进度圈拖至右上区域
//控制台档不住进度条就行
launchApp("快看点");
sleep(5000)
console.show();
console.setPosition(600, -20)
sleep(200)
console.setSize(500, 400);
while (!click("小视频"));
sleep(2000)
click("次播放",0)
var x = device.width / 2
var y = 40
var x1 = device.width / 2
var y1 = device.height / 2
var w = device.width;
var h = device.height;
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
sleep(3000);
var img = captureScreen();
sleep(5000)
var point = findColorInRegion(img, "#ff5800", x, 40, x1, y1);
if (point) {
    toastLog("进度条坐标x" + point.x + ", y" + point.y);
    xx = point.x
    yy = point.y
}//找到颜色并赋值给坐标，方便循环时做下一步动作
for (i = 0; i < 300; i++) {
    toastLog("进度条坐标x" + point.x + ", y" + point.y);
    var ig = captureScreen();
    sleep(2000);
    if (text("广告").visibleToUser(true).findOnce()) {
        sleep(1000)//先判断是否有广告 有就滑走
        log("广告")
        swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235));
    };
    sleep(2000);
    var p = findColorInRegion(ig, "#ff5800", x, 40, x1, y1);
    if (p) {//找屏幕的颜色判断是不是进度条
        log("找到")
        c = random(9000, 16000);
        d = parseInt(c / 1000);
        log("观看第" + i + "个视频，视频随机时长" + d + "秒");
        sleep(c);
        swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235));
    } else {//颜色判断不成立就是蛋
        log("蛋")
        click(xx, yy)//点击循环外已经赋值的坐标
        sleep(5000);
        if (text("继续阅读>").visibleToUser(true).findOnce()) {
            click("继续阅读>");
        } else {
            back()//找到蛋后的后续动作
        }
        sleep(3000);
    }
};