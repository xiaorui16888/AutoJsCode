function unlock() {
    if (!device.isScreenOn()) {
        device.wakeUp();
        sleep(1000);
        swipe(540, 1600, 540, 400, 300);
        sleep(4000);
        gesture(1000, [540, 1425], [540, 1680], [800, 1425], [800, 1680]);
        sleep(300);
        home();
    }
}

function mainpage() {
    app.startActivity({        
        action: "VIEW",
        data: "alipays://platformapi/startapp?appId=60000002"    
    });
    sleep(2000);
}

function myself() {
    if (!textContains("蚂蚁森林").exists() || !descContains("返回").exists()) mainpage();
    if (idEndsWith("J_pop_treedialog_close").exists()) idEndsWith("J_pop_treedialog_close").findOne().click();
    sleep(2000);
    collect();
    sleep(2000);
}

function collect() {
    if (descEndsWith("克").exists()) {
        descEndsWith("克").find().forEach(function(object) {
            click(object.bounds().centerX(), object.bounds().centerY());
            sleep(1000);
        });
    }
}

function friendslist() {
    if (!textContains("好友排行榜").exists()) {
        if (!textContains("蚂蚁森林").exists() || !descContains("返回").exists()) mainpage();
    }
    while (true) {
        if (descEndsWith("查看更多好友").exists()) {
            if (descEndsWith("查看更多好友").findOne().bounds().centerY() < device.height) {
                bs = descEndsWith("查看更多好友").findOne().bounds();
                click(bs.centerX(), bs.centerY());
                break;
            }
        }
        scrollDown();
    }
}

function steal() {
    friendslist();
    sleep(2000);
    while (true) {
        var p = 1;
        while (p) {
            var p = images.findImage(captureScreen(), img);
            if (p) {
                click(p.x + 7, p.y + 7);
                sleep(2000);
                collect();
                back();
                sleep(2000);
            }
        }
        if (descEndsWith("邀请").exists()) {
            if (descEndsWith("邀请").findOne().bounds().centerY() < device.height) break;
        }
        scrollDown();
        sleep(1000);
    }
    if (descEndsWith("关闭").exists()) descEndsWith("关闭").findOne().click();
    home();
}

auto();
requestScreenCapture();
unlock();
var img = images.read("/sdcard/tmp.png");
var i = 0;
while (i < 300) {
    myself();
    steal();
    i++;
}