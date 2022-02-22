"auto"
//需要用到的软件 有缘网，Auto.js
//修改发送话术在32行，while(!setText(" "));，
////测试机 vivox20A,root情况 无，安卓版本7.1.1。分辨率大小1080×2610
//仅供学习参考，请勿用于商业用途。请在下载后24小时内删除。作者不承担任何法律责任
setScreenMetrics(2160,1080);
while (true) {
    sleep(100);
    launchApp("有缘网");
    sleep(2000);
    for (let i = 0; i <= 3; i++) {
        if (currentActivity() == "com.app.ui.activity.HomeActivity") {
            sleep(100);
            click(357, 2007, 453, 2133)
            toast("以跳出循环!")
            break
        } else {
            sleep(1000)
        }
    }


    for (let i = 0; i <= 30; i++) {
        if (currentActivity() == "com.app.ui.activity.MessageContentActivity") {
            click(0, 96, 120, 192)
        }
        click("消息", 2)
        sleep(500);
        click("寻缘")
        sleep(500);
    }
    while (!click("召唤有缘人"));
    sleep(100);
    while (!setText("你威丨信给我"));
    sleep(200);
    while (!click("发送"));
    sleep(500);
    openAppSetting(getPackageName("有缘网"));
    while (!click("强行停止"));
    sleep(100);
    while (!click("确定"));
    sleep(100);
}