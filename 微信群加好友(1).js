auto();

//alert("适用微信版本 6.7.3");

launch("com.tencent.mm"); //启动微信。
sleep(1000);
toast("请进入微信群成员列表界面");

var 验证信息 = dialogs.prompt("要发送的验证申请消息"); //这是验证申请信息


var Tlog = dialogs.confirm("是否显示运行日志") ? (function() {
    console.show();
    return log;
})() : function() {};


var yanzheng = 验证信息;


var kg = "com.tencent.mm.chatroom.ui.ChatroomInfoUI";
var storage = storages.create("已操作微群友表");
var DoOkAry = storage.get("Ary", new Array);
if (DoOkAry.length) {
    DoOkAry = dialogs.confirm("是否清除已操作微群友列表") ? new Array : DoOkAry;
};
var friendAry = new Array;

events.on("exit", function() {
    log("结束运行");
    storage.put("Ary", DoOkAry);
});

function shifou(text, ary) {
    for (var i in ary) {
        if (ary[i] == text) {
            return true;
        };
    };
    return false;
};

Tlog("等待进入群成员列表");


waitForActivity(kg);
while (true) {
    var ob = className("android.widget.ListView").findOne();
    Tlog("列表");
    if (className("android.widget.TextView").text("查看全部群成员").exists()) {
        Tlog("查看全部群成员");
        while (!className("android.widget.TextView").text("查看全部群成员").findOne().parent().click());
        kg = "com.tencent.mm.chatroom.ui.SeeRoomMemberUI";
        break;
    };
    if (!ob.scrollForward()) {
        while (ob.scrollBackward());
        //toastLog("A");
        break;
    };
};



while (true) {

    waitForActivity(kg);

    Tlog("群成员列表页");
    if (kg == "com.tencent.mm.chatroom.ui.ChatroomInfoUI") {
        w1: while (true) {
            try {
                var ob = className("android.widget.ListView").findOne();
                Tlog("列表");
                for (var i = 0; i < ob.childCount(); i++) {
                    var iob = ob.child(i);
                    if (iob.className() == "android.widget.LinearLayout") {
                        for (var j = 0; j < iob.childCount(); j++) {
                            var job = iob.child(j);
                            if (job.className() == "android.widget.RelativeLayout") {
                                if (job.childCount() >= 2) {
                                    for (var k = 0; k < job.childCount(); k++) {
                                        var kob = job.child(k);
                                        if (kob.className() == "android.widget.RelativeLayout") {
                                            if (kob.childCount() && kob.child(0).className() == "android.widget.TextView") {
                                                var viewOb = kob.child(0);
                                                if (!shifou(viewOb.text(), DoOkAry)) {
                                                    DoOkAry.push(viewOb.text());
                                                    log(viewOb.text());
                                                    while (!job.click());
                                                    log("进入");
                                                    break w1;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                if (!ob.scrollForward()) {
                    toastLog("停止");
                    exit();
                };
            } catch (e) {
                toastLog(e);
                exit();
            };
        };

    }
    else if (kg == "com.tencent.mm.chatroom.ui.SeeRoomMemberUI") {
        w1: while (true) {
            try {
                var ob = className("android.widget.GridView").findOne();
                Tlog("列表");
                for (var i = 0; i < ob.childCount(); i++) {
                    var iob = ob.child(i);
                    if (iob.className() == "android.widget.LinearLayout") {
                        if (iob.childCount() >= 2) {
                            if (iob.child(1).className() == "android.widget.TextView") {
                                var viewOb = iob.child(1);
                                if (!shifou(viewOb.text(), DoOkAry)) {
                                    DoOkAry.push(viewOb.text());
                                    log(viewOb.text());
                                    while (!iob.click());
                                    log("进入");
                                    break w1;
                                };
                            };
                        };
                    };
                };
                if (!ob.scrollForward()) {
                    toastLog("停止");
                    exit();
                };
            } catch (e) {
                toastLog(e);
                exit();
            };
        };
    };


    waitForActivity("com.tencent.mm.plugin.profile.ui.ContactInfoUI");
    Tlog("群员页");

    if (className("android.widget.Button").text("添加到通讯录").exists()) {
        Tlog("添加到通讯录");
        while (!className("android.widget.Button").text("添加到通讯录").findOne().click());
    } else {
        Tlog("已是好友");
        var a = className("android.widget.TextView").id("u0").findOne(100);
        var b = className("android.widget.TextView").id("awj").findOne(100);
        var c = className("android.widget.TextView").id("ax2").findOne(100);
        var D = {};
        if (a) {
            D.a = a.text();
        };
        if (b) {
            D.b = b.text();
        };
        if (c) {
            D.c = c.text();
        };
        friendAry.push(D);
        while (!back());
        Tlog("返回");
        continue;
    };


    while (true) {
        if (currentActivity() == "com.tencent.mm.plugin.profile.ui.SayHiWithSnsPermissionUI") {;
            Tlog("加群员页");
            className("android.widget.EditText").id("dny").findOne().setText(yanzheng);
            Tlog("输入验证消息");
            while (!className("android.widget.TextView").id("j0").text("发送").findOne().click());
            Tlog("发送");
            break;
        } else if (text("由于对方的隐私设置，你无法通过群聊将其添加至通讯录。").exists()) {
            while (!text("确定").findOne().click());
            break;
        } else if (className("android.widget.Button").text("发消息").exists()) {
            break;
        } else if (className("android.widget.Button").text("添加到通讯录").exists()) {
            break;
        };
    };

    waitForActivity("com.tencent.mm.plugin.profile.ui.ContactInfoUI");
    Tlog("群员页");
    while (!back());
    Tlog("返回");

};