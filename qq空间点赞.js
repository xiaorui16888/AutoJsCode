auto();
launchApp("QQ");
console.show();
sleep(2000);
while (true) {
    if (currentPackage() != "com.tencent.mobileqq") {
        continue;
    };
    if (currentActivity() != "cooperation.qzone.QzoneFeedsPluginProxyActivity") {
        continue;
    };
    var ob = className("AbsListView").findOne();
    ob.children().forEach(function(ob) {
        try {
            if (ob.className().endsWith("LinearLayout")) {
                ob.children().forEach(function(ob) {
                    if (ob.className().endsWith("RelativeLayout")) {
                        ob.children().forEach(function(ob) {
                            if (ob.className().endsWith("FrameLayout")) {
                                ob = ob.child(0);
                                log("赞" + ob.selected());
                                if (!ob.selected()) {
                                    log("点" + ob.click());
                                };
                            };
                        });
                    };
                });
            };
        } catch (e) {};
    });
    while (true) {
        if (ob.scrollForward()) {
            log("滑true");
            break;
        } else {
            log("滑false");
        };
        sleep(250);
    };
    sleep(250);
};