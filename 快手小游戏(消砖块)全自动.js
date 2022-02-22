/**
 *作者QQ: 1811588980
 *完成时间: 2019年3月8日 下午10:22:09
 *测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
 *备注: (适用于快手小游戏(消砖块))直接运行脚本即可。
 **/


var x = device.width / 8,
    x1 = x,
    x2 = x * 3,
    x3 = x * 5,
    x4 = x * 7;
var y = device.height / 2;


var yo = 2, //点击用时。
    ys = 55; //点击延时。

launchApp("快手小游戏");


waitForPackage(app.getPackageName("快手小游戏"));

while (true) {
    if (text("一起玩").exists()) {
        if (!j点击(text("消砖块").findOne(200))) {
            j滑动(id("recycler_view").findOne(200));
        };
        //sleep(100);
        continue;
    };
    if (id("tv_result_tip").exists()) {
        if (j点击(text("对方已准备好，点击再战").findOne(200))) {
            //sleep(300);
            goTo();
            continue;
        };
        if (j点击(text("换个对手").findOne(200))) {
            //sleep(100);
            continue;
        };
    } else {
        if (text("临时会话").exists()) {
            j点击(id("left_iv_btn").findOne(200));
            //sleep(100);
            continue;
        };
    };
    if (text("匹配成功").exists()) {
        goTo();
    };

};

function goTo() {
    while (true) {
        if (!id("tv_result_tip").exists()) {
            break;
        };
    };
    while (true) {
        if (id("tv_result_tip").exists()) {
            break;
        };
        press(x1, y, yo);
        sleep(ys);
        press(x2, y, yo);
        sleep(ys);
        press(x3, y, yo);
        sleep(ys);
        press(x4, y, yo);
        sleep(ys);
    };
};


function j点击(UiObject, M) {
    if (UiObject) {
        if (M) {
            var rect = UiObject.bounds();
            return click(rect.centerX(), rect.centerY());
        } else {
            if (UiObject.clickable()) {
                return UiObject.click();
            } else {
                return arguments.callee(UiObject.parent());
            };
        };
    };
    return false;
};

function j滑动(UiObject, T) {
    if (UiObject) {
        if (UiObject.scrollable()) {
            if (T) {
                return UiObject.scrollBackward();
            } else {
                return UiObject.scrollForward();
            };
        };
    };
    return false;
};