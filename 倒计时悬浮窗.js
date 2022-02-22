/*
输入时间不小于 5 。 单位是 s 秒。
*/
runControl();
var flo = floaty.rawWindow(
        <button id="time" text="单击输入时间" bg="#66000000"/>
    ),
    touchable = true,
    timeover = false,
    t = 180,
    i = "",
    run = true;
flo.setSize(device.width / 6, device.height / 16);
flo.setPosition(device.width / 4, device.height / 4);
flo.exitOnClose();
sleep(500);
var xy0 = [0, 0],
    floatyXY0 = [0, 0],
    floatyXY1 = [0, 0],
    floatyxy0 = [device.width - flo.getWidth(), device.height - flo.getHeight()],
    dxy = [0, 0],
    state = "点击",
    oldTime = 0,
    nowTime = 0;

flo.time.setOnTouchListener(function(v, e) {
    switch (e.getAction()) {
        case e.ACTION_DOWN:
            xy0 = [e.getRawX(), e.getRawY()];
            floatyXY0 = [flo.getX(), flo.getY()];
            break

        case e.ACTION_MOVE:
            dxy = [Math.floor(e.getRawX() - xy0[0]), Math.floor(e.getRawY() - xy0[1])];
            switch (state) {
                case "点击":
                    if (Math.abs(dxy[0]) > 10 || Math.abs(dxy[1]) > 10) {
                        state = "滑动";
                    }
                    break

                case "滑动":
                    floatyXY1 = [floatyXY0[0] + dxy[0], floatyXY0[1] + dxy[1]];
                    if (floatyXY1[0] > floatyxy0[0]) floatyXY1[0] = floatyxy0[0];
                    if (floatyXY1[0] < 0) floatyXY1[0] = 0;
                    if (floatyXY1[1] > floatyxy0[1]) floatyXY1[1] = floatyxy0[1];
                    if (floatyXY1[1] < 0) floatyXY1[1] = 0;
                    flo.setPosition(floatyXY1[0], floatyXY1[1]);
                    break
            }
            break

        case e.ACTION_UP:
            if (state == "滑动") {
                state = "点击";
            } else {
                dialogs.input("时间", t).then(tim => {
                    if (isNaN(tim) || tim < 5) return true;
                    if (i != "") clearInterval(i);
                    oldTime = new Date().getTime() + (tim * 1000);
                    t = tim;
                    i = setInterval(() => {
                        if (!run) clearInterval(i);
                        nowTime = new Date().getTime();
                        let s = oldTime - nowTime;
                        if (s <= 0) {
                            flo.time.setText("计时结束");
                            clearInterval(i);
                            i = "";
                        } else {
                            flo.time.setText((s / 1000).toFixed(2) + " s");
                        }
                    }, 100);
                });

            }
    }
    return true;
});

setInterval(() => {}, 10000);

events.on("exit", function() {
    run = false;
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