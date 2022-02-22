launchApp("QQ");
toast("请打开需要群加好友的群聊天页面")
waitForActivity("com.tencent.mobileqq.activity.SplashActivity", [period = 200])
desc("群资料卡").waitFor();
sleep(5 * 1000);
desc("群资料卡").id("ivTitleBtnRightImage").click();
var widget = text("群聊成员").findOne();
click(widget.bounds().centerX(), widget.bounds().centerY());
加群();

function 加群() {
    waitForActivity("com.tencent.mobileqq.activity.TroopMemberListActivity", [period = 200]);
    toast("请等待5秒")
    sleep(5000);
    while (true) {
        desc("更多操作").waitFor();
        sleep(2000)
        var p = id("tv_name").find();
        var q = p.size();
        for (i = 0; i < q; i++) {
            sleep(2000);
            p.get(i).parent().parent().click()
            sleep(1000)
            if (text("加好友").exists()) {
                click("加好友");
                sleep(2000);
                text("发送").waitFor();
                if (text("输入答案").exists()) {
                    text("取消").findOne().click();
                    sleep(500);
                    id("ivTitleBtnLeft").findOne().click()
                } else {
                    var name = id("nickname").findOne().text();
                    setText(0, "你好"); //验证消息
                    setText(1, name); //QQ昵称
                    click("发送");
                    id("ivTitleBtnLeft").findOne().click()
                }
            } else {
                id("ivTitleBtnLeft").findOne().click()
                sleep(2000)
            }
        }
        sleep(1000)
        swipe(500,1500,500,500,500)
        sleep(700)
        swipe(500,1500,500,500,500)
        sleep(700);
    }
}