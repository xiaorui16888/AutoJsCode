auto.waitFor();
var a = files.read("/sdcard/qq.txt");
var QQ_Arry = a.split(",");
var xx;
for (let i in QQ_Arry) {
    app.startActivity({
        data: "mqqapi://card/show_pslcard?&uin=" + QQNum_Arry[i]
    });
    waitForActivity("com.tencent.mobileqq.activity.FriendProfileCardActivity");
    packageName("com.tencent.mobileqq").className("android.widget.FrameLayout").desc("查看大头像").waitFor();
    //toasts("💦出现了");
    //赞();
    if (text("加好友").exists()) {
        click("加好友");
        sleep(2000);
        if (xx == "对方拒绝被添加") {
            log(xx);
        } else {
            text("发送").waitFor();
            if (text("输入答案").exists()) {
                text("取消").findOne(500).click();
                sleep(500);
            } else {
                var name = id("nickname").findOne(500).text();
                log(name);
                setText(0, "加好友  互赞"); //验证消息
                setText(1, name); //QQ昵称
                click("发送");
                sleep(2000);
                back();
            }
        }
    }
}

function 赞() {
    let Btn = descEndsWith("次赞").findOne().bounds();
    for (let i = 0; i < 10; i++) {
        press(Btn.centerX(), Btn.centerY(), 100);
    }
    //back();
    sleep(500);
}

events.observeToast();
events.onToast(function(toast) {
    xx = toast.getText();
    log(xx);
});


function toasts(text, time) {
    text = text || null;
    time = time || 2500;
    if (isNaN(time)) return;
    let arr = engines.all(),
        run = false;
    for (i in arr) {
        if (files.getName(arr[i].getSource()) == "toast.js") {
            run = true;
            break;
        }
    }
    if (!run) {
        let tex = "var t = toasts();\nevents.broadcast.on(\"toast\", (arr) => {\nif (arr.length != 2) return;\nlet time = new Number(arr[1][1]),text = arr[1][0];\nif(isNaN(time)) time = 5000;\nif(!text) return;\nt(text, time);});\nsetInterval(() => {}, 10000);\nfunction toasts() {\nvar th = \"\",Y = device.width / 4,X = Y,x = Y * 2;\nvar flo = floaty.rawWindow(\n<frame gravity=\"center\" bg=\"#00000000\">\n<text id=\"message\"  bg=\"#70000000\" textColor=\"#ffffff\" textSize=\"15sp\" gravity=\"center\" w=\"auto\" padding=\"1\"/>\n</frame>);\nflo.setTouchable(false);\nflo.setSize(0, 0);\nreturn doflo;\nfunction doflo(mes, time) {\nmes = \" \" + mes.toString().split(\"\\n\").join(\" \\n \") + \" \";\nif (th != \"\") {\nth.interrupt();\nth = \"\";}\nui.run(function() {\nflo.message.setText(mes);});\nflo.setPosition(X, Y);\nflo.setSize(x, -2);\nth = threads.start(function() {\nsleep(time);\nui.run(function() {\nflo.message.setText(\"\");});\nflo.setSize(0, 0);\nth = \"\";});}}";
        engines.execScript("toast", tex);
        sleep(500);
    }
    events.broadcast.emit("toast", [
        [engines.myEngine(), [text, time]]
    ]);
}