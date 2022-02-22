/**
 * 环境：安卓6ROOT、安卓7+
 * 测试手机360N4S、努比亚z17s未适配其它手机
 */
const IS_ANDROID7 = isAndroid7();
const IS_ROOT = isRoot();
if (IS_ROOT) {
    var ra = new RootAutomator();
}
if (!IS_ANDROID7 && !IS_ROOT) {
    toast("当前系统版本不是7+，也末ROOT,不支持坐标点击");
    exit();
}
var window = floaty.window(
    <frame>
        <vertical bg="#ff0000" w='70'>
            <text id="action" bg="#ff0000" text="↖拖动这里改变位置" />
            <button id="dj" text="开始" w="60" h="40" />
            <button id="cs" text="次数" w="60" h="40" />
            <button id="jg" text="间隔" w="60" h="40" />
            <button id="et" text="退出" w="60" h="40" />
        </vertical>
    </frame>
);

setInterval(() => { }, 1000);


var execution = null;
var djcs = 1;
var djjgsj = 1;
//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;


window.action.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            return true;
    }
    return true;
});

window.dj.click(() => {
    onClick();
});
window.cs.click(() => {
    rawInput("请输入次数", djcs, name => {
        djcs = parseInt(name);
    });
});
window.jg.click(() => {
    rawInput("请输入间隔时间（毫秒）", djjgsj, name => {
        djjgsj = parseInt(name);
    });
});
window.et.click(() => {
    execution.interrupt();
    exit();
});
function onClick() {
    if (window.dj.getText() == '开始') {
        window.dj.setText('停止');
        helloWorld();


    } else {
        if (execution) {
            execution.interrupt()
        }
        window.dj.setText('开始');
    }
}

function helloWorld() {
    execution = threads.start(function () {
        for (var i = 1; i <= djcs; i++) {
            log(window.getX(), window.getY(), djcs, djjgsj)
            //Tap(window.getX(), window.getY())
            root_7_tap(window.getX()+20, window.getY()+70, i);
            sleep(djjgsj)
        }
        ui.run(function () {
            window.dj.setText('开始');
        });
    });
}


/*
点击判断
root_7_tap(x, y[, i])
*/
function root_7_tap(x, y, i) {
    i = i || 1;
    if (IS_ANDROID7) {
        click(x, y);
    } else if (IS_ROOT) {
        ra.tap(x, y, i);
    }
}

/*
判断安卓系统7+
*/
function isAndroid7() {
    if (device.sdkInt >= 24) {
        return true;
    }
}

/*
判断安卓系统ROOT
*/
function isRoot() {
    if (files.exists('/su/bin/su') == true || files.exists('/system/bin/su') == true || files.exists('/system/xbin/su') == true) {
        return true;
    }
}