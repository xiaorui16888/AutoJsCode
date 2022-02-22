launchApp("网易云音乐");
const NE_LOAD = "com.netease.cloudmusic.activity.LoadingActivity";
const NE_MAIN = "com.netease.cloudmusic.activity.MainActivity";
sleep(2000);
if (currentActivity() == NE_LOAD) { //APP刚打开需要等待进入主页面
    waitForActivity(NE_MAIN);
    sleep(800)
}
while (currentActivity() != NE_MAIN) {
    back(); //按返回键回到主页面
    sleep(600);
}
var left = className("android.widget.FrameLayout").find();
log(left.size());
for (var i = 0; i < left.size(); i++) {
    var n = left.get(i).bounds();
    if (n.width() == n.height() && n.left < device.width) {
        log(n);
        left = n; //侧边栏
        break;
    };
}
click(left.centerX(), left.centerY()); //展开
//点击签到
var qd = text("签到").findOne(3000);
if (qd) {
    qd.click()
}