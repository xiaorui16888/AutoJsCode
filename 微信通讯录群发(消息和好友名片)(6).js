auto();


//适用微信版本6.7.3
var message = dialogs.prompt("要发送的消息"); //要发送的消息。

var name = dialogs.prompt("要发送名片的好友"); //要发送的好友名片 呢称或备注。有备注用备注。没备注用昵称。


console.show();
log("M: \n"+message);
log("N: \n"+name);


var nameAry = new Array;


app.launchPackage("com.tencent.mm");
sleep(1500);
while (true) {
    if (currentPackage() != "com.tencent.mm") {
        continue;
    };
    waitForActivity("com.tencent.mm.ui.LauncherUI");
    while (!text("通讯录").findOne().parent().parent().click());
    log("通讯录");

    w1: while (true) {
        try {
            var ob = className("android.widget.ListView").id("li").findOne();
            for (var i = 0; i < ob.childCount(); i++) {
                var iob = ob.child(i);
                if (iob.className() == "android.widget.LinearLayout") {
                    for (var j = 0; j < iob.childCount(); j++) {
                        var job = iob.child(j);
                        if (job.className() == "android.widget.LinearLayout") {
                            var viewOb = job.child(0).child(0);
                            if (viewOb.text()!=name&&!shifou(viewOb.text())) {
                                nameAry.push(viewOb.text());
                                log(viewOb.text());
                                while (!job.parent().click());
                                log("进入");
                                break w1;
                            };
                        };
                    };
                };
            };
            if (!ob.scrollForward()) {
                log("停止");
                exit();
            };
        } catch (e) {
            log(e);
            exit();
        };
    };

    waitForActivity("com.tencent.mm.plugin.profile.ui.ContactInfoUI");


    while (!click("发消息"));
    log("发消息");

    waitForActivity("com.tencent.mm.ui.chatting.ChattingUI");



    //发送消息部分***********
if(message){
    var edit = className("android.widget.EditText").findOne();
    while (!edit.setText(message));
    while (!click("发送"));
    log("发送");
};

    //发送图片部分*********

    //待会就做个自动群发的



    //发送名片部分***************

if(name){
    if (!className("android.widget.TextView").text("名片").exists()) {
        while (!desc("更多功能按钮，已折叠").click());
    };
    var 名片 = className("android.widget.TextView").text("名片").findOne();
    while (!名片.parent().parent().parent().click());
    log("名片");

    waitForActivity("com.tencent.mm.ui.contact.SelectContactUI");
    var 名片list = className("android.widget.ListView").findOne();

    while (true) {
        if (textContains(name).exists()) {;
            while (!textContains(name).findOne().parent().parent().parent().parent().click());
            break;
        } else {
            if (!名片list.scrollForward()) {
                throw "查无此人" + name;
                break;
            };
        };
    };

    waitForActivity("com.tencent.mm.ui.chatting.ChattingUI");

    while (!click("发送"));
};

    while(!className("android.widget.ImageView").desc("返回").findOne().parent().click());//按返回键。
    //break;
};


function shifou(text) {
    for (var i in nameAry) {
        if (nameAry[i] == text) {
            return true;
        };
    };
    return false;
};