auto.waitFor();
launchApp("迅雷");
var b = text("跳过").findOne(5000);
if (b) {
    var 全 = text("跳过").find();
    var Xx = 全[全.length - 1].bounds().centerX(),
        Yy = 全[全.length - 1].bounds().centerY();
    sleep(300);
    click(Xx, Yy);
    toast("广告已被无视");
};