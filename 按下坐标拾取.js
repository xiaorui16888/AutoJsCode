try {
    runControl();
    auto.waitFor();
    toasts("按下 音量- 可以切换");
    events.observeKey();
    events.on("key", function(k, e) {
        let ek = k * 10 + e.getAction();
        switch (ek) {
            case 30:
                log("menu down");
                break

            case 31:
                log("menu up");
                break

            case 40:
                log("back down");
                break

            case 41:
                log("back up");
                break

            case 240:
                log("volume_up down");
                break

            case 241:
                log("volume_up up");
                break

            case 250:
                // log("volume_down down");
                event.emit("touchable");
                break

            case 251:
                log("volume_down up");
                break

            case 820:
                log("menu down");
                break

            case 821:
                log("menu up");
                break
        }
        ek = 0;
    });

    var event = events.emitter();
    event.on("touchable", function() {
            touchable_state = !touchable_state;
            x.setTouchable(touchable_state);
            if (touchable_state) {
                toasts("禁止 触摸屏幕");
            } else {
                toasts("允许 触摸屏幕");
            }
    });

    var x = floaty.rawWindow(
            <frame id="but" bg="#00000000"/>
        ),
        touchable_state = false;
    x.setSize(-1, -1);
    x.setTouchable(touchable_state);
    x.but.setOnTouchListener(function(v, e) {
        switch (e.getAction()) {
            case e.ACTION_DOWN:
                toasts(e.getRawX().toFixed(0) + " , " + e.getRawY().toFixed(0));
                break

            case e.ACTION_MOVE:
                toasts(e.getRawX().toFixed(0) + " , " +  e.getRawY().toFixed(0));
                break

            case e.ACTION_UP:
                toasts(e.getRawX().toFixed(0) + " , " + e.getRawY().toFixed(0));
        }
        return true;
    });

} catch (e) {
    log(e);
}
// 脚本引擎运行控制函数
// runControl(true) 重新启动本脚本
// runControl(false) 保留本脚本已经在运行的脚本引擎，停止本次脚本引擎运行
// runControl() 若本脚本已经在运行，则停止本脚本所有正在运行的脚本引擎
function runControl(stop) {
    let arr = engines.all(),
        me = engines.myEngine(),
        run = true;
    for (i in arr) {
        if (arr[i].getSource().toString() == me.getSource().toString() && arr[i] != me) {
            if (stop != false) arr[i].forceStop();
            run = stop == true;
        }
    }
    if (!run) exit();
}


// toast通知代替函数
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
   // log(text);
    events.broadcast.emit("toast", [
        [engines.myEngine(), [text, time]]
    ]);
}