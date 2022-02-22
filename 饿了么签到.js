auto.waitFor();

var 饿了么 = function () {
    app.launchApp("饿了么");
    waitForActivity("me.ele.application.ui.home.d");
    sleep(300);
    var me=desc("我的").findOne();
    while (!me.parent().click());
    签到文字 = text("签到领红包").findOne(200);
    if (!签到文字) {
        log("饿了吗签到失败");
        return;
    }
    签到文字.parent().click();
    签到();
}

function 签到() {
    waitForActivity("me.ele.component.web.c");
    sleep(200);
    if (desc("签到").findOnce()) {
        log("进入");
        desc("签到").findOnce().click();
        sleep(1000);
        翻牌();
    }
}

function 翻牌(){
    click(device.width/2,device.height/2);
}

// module.exports = 饿了么;
饿了么();