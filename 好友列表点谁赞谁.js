auto();
toast("音量加键停止");
sleep(1000);
toast("打开好友名片自动点赞自动返回");
sleep(2000);
launchApp("QQ");
while (true) {
    var zan = descEndsWith("次赞").findOne(2000);
    if (zan) {
        for (var i = 0; i < 10; i++) {
            sleep(200)
            zan.click()
        }
        sleep(200);
        back();
    }
    
}