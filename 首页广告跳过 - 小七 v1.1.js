var arr = engines.all(),
    me = engines.myEngine(),
    stop = false;
for (let i = 0; i < arr.length; i++) {
    if(arr[i].getSource().toString() == me.getSource().toString()){
        if (arr[i] != me) {
            arr[i].forceStop();
            stop = true;
        }
    }
}
if (stop) {
    exit();
}

auto.waitFor();

var adList = [ //将可以跳过的首页广告活动构成的对象添加到这里。其中的jumpFunction 可以是自己编写的函数操作。返回值 设置为"成功"或者"失败"。

        {
            appName: "爱听4G",
            packageName: "com.imusic.iting",
            activityName: "com.gwsoft.imusic.controller.LoadingActivity",
            jumpFunction: text跳
        },

        {
            appName: "迅雷",
            packageName: "com.xunlei.downloadprovider",
            activityName: "com.xunlei.downloadprovider.loading.LoadingActivity",
            jumpFunction: text跳
        },

        {
            appName: "腾讯视频",
            packageName: "com.tencent.qqlive",
            activityName: "com.tencent.qqlive.ona.activity.WelcomeActivity",
            jumpFunction: text跳
        },

        {
            appName: "天气通",
            packageName: "sina.mobile.tianqitong",
            activityName: "com.sina.tianqitong.ui.main.Splash",
            jumpFunction: idSkip
        },

        {
            appName: "微博",
            packageName: "com.sina.weibo",
            activityName: "com.sina.weibo.SplashActivity",
            jumpFunction: descSkip
        },

        {
            appName: "花粉俱乐部",
            packageName: "com.huawei.fans",
            activityName: "com.huawei.fans.activity.SplashActivity",
            jumpFunction: text跳
        },

        {
            appName: "华为应用市场",
            packageName: "com.huawei.appmarket",
            activityName: "com.huawei.appmarket.MainActivity",
            jumpFunction: text跳
        },

        {
            appName: "百度网盘",
            packageName: "com.baidu.netdisk",
            activityName: "com.baidu.netdisk.ui.Navigate",
            jumpFunction: text跳
        },

        {
            appName: "微博国际版",
            packageName: "com.weico.international",
            activityName: "com.weico.international.activity.NewSplashActivity",
            jumpFunction: text跳
        }

    ],

    blackList = [ //应用黑名单，该数组中的应用不会记录活动。
        "com.huawei.android.launcher", //华为桌面
        "com.android.systemui", //华为最近任务界面
        "com.teslacoilsw.launcher", //Nova桌面
        "org.autojs.autojs", //Auto.js
        "com.stardust.scriptdroid" //Auto.js
    ];

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
    choice = dialogs.confirm("开启应用活动记录？", "    开启后，可以在运行日志中找到可能的广告活动\n    在数组 adList 中添加 需要跳过的应用对象");

setInterval(() => {
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
    toast("跳过首页广告 " + t.toString(), 2000);
}

function clicks(obj) {
    obj = obj || "";
    if (obj == "") return "失败";
    while (true) {
        if (obj.clickable() == true) {
            if (obj.click()) return "成功";
            return "失败";
        }
        if (obj.depth() <= 1) return "失败";
        obj = obj.parent();
    }
}

function clickXY(obj) {
    obj = obj || "";
    if (obj == "") return "失败";
    obj = obj.bounds();
    if (click(obj.centerX(), obj.centerY())) return "成功";
    return "失败";
}

function descSkip(package) {
    return clickXY(descContains("skip").packageName(package).findOne(2000));
}

function idSkip(package) {
    return clickXY(idContains("skip").packageName(package).findOne(2000));
}

function descLose(package) {
    return clicks(descContains("lose").packageName(package).findOne(2000));
}

function text跳(package) {
    return clicks(textContains("跳").packageName(package).findOne(2000));
}

function classUtton(package) {
    return clicks(classNameContains("utton").packageName(package).findOne(2000));
}