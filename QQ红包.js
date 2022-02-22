"auto";
launch("com.tencent.mobileqq");
toast("打开聊天窗口，出现红包时将会自动拆开并关闭（可配合红包提醒APP）");
while (!isStopped()) {
    waitForActivity("com.tencent.mobileqq.activity.SplashActivity");
    //普通红包
    if (text("QQ红包").exists()) {
        var id = text("QQ红包").findOne();
        id.parent().click();
        close();
    }
    //口令红包
    if (click("口令红包")) {
        click("点击输入口令");
        click("发送");
        close();
    }
}


function close() {
    //拆开红包后尝试10次关闭红包页面
    for (let i = 0; i < 10; i++) {
        sleep(300);
        if (click("关闭")) break;
    }
}