/*
将广告跳过数据存储到文件 /sdcard/小七_1334435449/首页广告跳过.txt 中
需要跳过广告的应用 自行修改 文件中的内容，不再需要修改 本 脚本。
新增了toasts（）函数，不再依赖系统的 提示气泡。
如果不喜欢╮（﹀＿﹀）╭这个，可以自行将最后一行的toasts 修改为 toast。
*/
function runControl(stop) {
    switch (stop) {
        case false:
            stop = 1;
            break;
        case undefined:
            stop = 2;
            break;
        case true:

            defult:
                stop = 3;
    }
    let arr = engines.all(),
        me = engines.myEngine(),
        run = true;
    for (i in arr) {
        if (arr[i].getSource().toString() == me.getSource().toString() && arr[i] != me) {
            if (stop != 1) arr[i].forceStop();
            run = stop == 3;
        }
    }
    if (!run) exit();
}

function toasts(text, time) {
    text = text || null;
    time = time || 5000;
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
    let engine = engines.myEngine();
    events.broadcast.emit("toast", [[engine,[text, time]]]);
}

runControl();
//………………………………以上是准备工作………………………………

var path = files.getSdcardPath() + "/小七_1334435449/首页广告跳过.txt",
    content = files.exists(path) ? files.read(path) : null;
if (content) {
    eval(content);
} else {
    content = "var adList = [\n\n        {\n            appName: \"微博\",\n            packageName: \"com.sina.weibo\",\n            activityName: \"com.sina.weibo.SplashActivity\",\n            jumpFunction: descSkip\n        },\n\n        {\n            appName: \"花粉俱乐部\",\n            packageName: \"com.huawei.fans\",\n            activityName: \"com.huawei.fans.activity.SplashActivity\",\n            jumpFunction: text跳\n        },\n\n        {\n            appName: \"华为应用市场\",\n            packageName: \"com.huawei.appmarket\",\n            activityName: \"com.huawei.appmarket.MainActivity\",\n            jumpFunction: text跳\n        }\n\n    ],\n\n    blackList = [ \/\/应用黑名单，该数组中的应用不会记录活动。\n        \"com.huawei.android.launcher\", \/\/华为桌面\n        \"com.android.systemui\", \/\/华为最近任务界面\n        \"com.teslacoilsw.launcher\", \/\/Nova桌面\n        \"org.autojs.autojs\", \/\/Auto.js\n        \"com.stardust.scriptdroid\" \/\/Auto.js\n    ];\nfunction clicks(obj) {\n    obj = obj || \"\";\n    if (obj == \"\") return \"失败\";\n    while (true) {\n        if (obj.clickable() == true) {\n            if (obj.click()) return \"成功\";\n            return \"失败\";\n        }\n        if (obj.depth() <= 1) return \"失败\";\n        obj = obj.parent();\n    }\n}\n\nfunction clickXY(obj) {\n    obj = obj || \"\";\n    if (obj == \"\") return \"失败\";\n    obj = obj.bounds();\n    if (click(obj.centerX(), obj.centerY())) return \"成功\";\n    return \"失败\";\n}\n\nfunction descSkip(package) {\n    return clickXY(descContains(\"skip\").packageName(package).findOne(2000));\n}\n\nfunction idSkip(package) {\n    return clickXY(idContains(\"skip\").packageName(package).findOne(2000));\n}\n\nfunction descLose(package) {\n    return clicks(descContains(\"lose\").packageName(package).findOne(2000));\n}\n\nfunction text跳(package) {\n    return clicks(textContains(\"跳\").packageName(package).findOne(2000));\n}\n\nfunction classUtton(package) {\n    return clicks(classNameContains(\"utton\").packageName(package).findOne(2000));\n}\n";
    files.write(path,content);
    eval(content);
}

var packageNameAndActivityNameList = [],
    activityList = [],
    packageList = [],
    jumpFunctionList = [];

for (i in adList) {
    packageNameAndActivityNameList.push(adList[i].packageName + " : " + adList[i].activityName);
    activityList.push(adList[i].activityName);
    packageList.push(adList[i].packageName);
    jumpFunctionList.push(adList[i].jumpFunction);
}
blackList = blackList.concat(packageList);
var activity = ["", ""],
    thTEST = "",
    thRECORD = "",
    thJUMP = "",
    QJBL = "",
    choice = dialogs.confirm("开启应用活动记录？", "开启后，可以在运行日志中找到可能的广告活动\n然后在文件\n/sdcard/小七_1334435449/首页广告跳过.txt\n数组 adList 中添加 需要跳过的应用对象");

setInterval(() => {
    auto.waitFor();
    activity[1] = currentActivity();
    if (activity[1] == activity[0]) {
        return;
    }
    activity[0] = activity[1];
    if (thJUMP != "") thJUMP.interrupt();
    if (choice) {
        if (thRECORD != "") thRECORD.interrupt();
        thRECORD = threads.start(RECORD);
    }
    if (thTEST != "") thTEST.interrupt();
    thTEST = threads.start(TEST);
}, 1000);

function RECORD() {
    var PACKAGE = currentPackage();
    if (blackList.indexOf(PACKAGE) != -1) {
        thRECORD = "";
        return;
    }
    var APP = app.getAppName(PACKAGE),
        information = "\n        {\n            appName: \"" + APP + "\",\n            packageName: \"" + PACKAGE + "\",\n            activityName: \"" + activity[0] + "\",\n            jumpFunction:  text跳\n        },\n";
    console.warn(information);
    thRECORD = "";
}

function TEST() {
    if (activityList.indexOf(activity[0]) == -1) {
        thTEST = "";
        return;
    }
    QJBL = packageNameAndActivityNameList.indexOf(currentPackage() + " : " + activity[0]);
    if (QJBL == -1) return;
    if (thJUMP != "") thJUMP.interrupt();
    thJUMP = threads.start(JUMP);
    thTEST = "";
}

function JUMP() {
    let t = jumpFunctionList[QJBL](packageList[QJBL]);
    thJUMP = "";
    toasts("跳过首页广告 " + t.toString(), 2000);
}