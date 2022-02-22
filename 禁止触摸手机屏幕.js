/*
比如: 某些情况下手机屏幕要一直保持开启，但是放到口袋里又怕误触屏幕。
本脚本是针对这种情况做的，利用 音量减 来控制 是否允许触摸屏幕
没办法遮挡 顶部的状态栏和底部的导航栏，建议自己隐藏 导航栏。
如果出现按键无法控制的情况，重启手机即可。
本脚本需要启用无障碍服务，需要悬浮窗权限。
如果本脚本正在运行中，之后再次运行，即可停止本脚本。
*/
runControl();
toasts();
auto.waitFor();

events.observeKey();
events.setKeyInterceptionEnabled("volume_down", true);
var x = floaty.rawWindow(
    <frame />
);
x.setSize(-1, -1);
var s = false,
    t = "";
x.setTouchable(false);
events.onKeyDown("volume_down", function(event) {
    s = !s;
    x.setTouchable(s);
    if (s) {
        device.keepScreenDim();
        t = "禁止触摸屏幕(除状态栏和导航栏)"
    } else {
        device.cancelKeepingAwake();
        t = "允许触摸屏幕"
    }
    toasts(t);
});

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
        //files.write("/sdcard/toast.js", tex)
        engines.execScript("toast", tex);
        sleep(500);
    }
    events.broadcast.emit("toast", [
        [engines.myEngine(), [text, time]]
    ]);
}