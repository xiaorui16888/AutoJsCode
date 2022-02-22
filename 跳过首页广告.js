var arr = engines.all(),
    me = engines.myEngine(),
    stop = false;
for (let i = 0; i < arr.length; i++) {
    if (arr[i].getSource().toString() == me.getSource().toString()) {
        if (arr[i] != me) {
            arr[i].forceStop();
            stop = true;
        }
    }
}
if (stop) {
    exit();
}

/*
注意事项：

在 数组 list 中添加 需要跳过的 应用的 
包名 : 广告的活动名

在 数组 superList 中添加 需要采用特殊方法跳过广告的 应用的
包名,方法


*/
var list = [
    //Auto.js
    "org.autojs.autojs : com.google.android.gms.ads.AdActivity",

    //微博国际版
    "com.weico.international : com.weico.international.activity.NewSplashActivity",

    //花粉俱乐部
    "com.huawei.fans : com.huawei.fans.activity.SplashActivity",

    //华为应用市场
    "com.huawei.appmarket : com.huawei.appmarket.MarketActivity",

    //爱听4G
    "com.imusic.iting : com.gwsoft.imusic.controller.LoadingActivity",

    //视频•优酷版
    "com.huawei.hwvplayer.youku : com.huawei.hwvplayer.framework.MainActivity"
];

var superList = [
    //Auto.js
    "org.autojs.autojs", //包名
    function() {    //方法
        sleep(300);
        back();
        return true;
    }

];

var functionList = [
    function(package) {
        return descContains("lose").packageName(package).findOne(200);
    },
    function(package) {
        return textContains("跳").packageName(package).findOne(200);
    },
    function(package) {
        return classNameContains("utton").packageName(package).findOne(200);
    }
]
threads.start(function() {
    var choice = dialogs.confirm("开启应用活动记录？", "    开启后，可以在运行日志中找到可能的广告活动\n    在数组 list 中添加 需要跳过的应用的\n包名 : 广告的活动名\n    在数组 superList 中添加 需要采用特殊方法跳过广告的应用的\n包名,方法");
    var apk = [currentActivity(), currentActivity(), currentPackage(), ""];
    while (true) {
        switch (apk[2]) {
            case "com.huawei.android.launcher":
            case "com.android.systemui":
                break;
            default:
                apk[1] = currentActivity();
                if (apk[0] != apk[1]) {
                    apk[0] = apk[1];
                    apk[3] = [apk[2] + " : " + apk[1]]
                    events.broadcast.emit("跳过首页广告-活动变动", apk[3]);
                    if (choice) {
                        console.info("\n\/\/" +
                            app.getAppName(apk[2]) + "\n\"" + apk[3] + "\",\n");
                    }
                }
        }
        sleep(700);
        apk[2] = currentPackage();
    }
});


events.broadcast.on("跳过首页广告-活动变动", function(item) {
    if (list.indexOf(item) != -1) {
        var packageName = item.split(" : ")[0];
        toastLog(app.getAppName(packageName) + " : " + jump(packageName));
    }
});

function jump(packageName) {
    var a = superList.indexOf(packageName);
    if (a != -1) {
        a = superList[a + 1]();
    } else {
        a = null;
        for (let n = 3; !a && n; n--) {
            for (let i = functionList.length; !a && i;) {
                i--;
                a = functionList[i](packageName);
            }
        }
        if (a) {
            a = a.click();
        } else {
            a = false;
        }
    }
    return "广告跳过 " + a;
}