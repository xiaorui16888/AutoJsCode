
/*
单击: 返回键
长按: 移动图标
左滑: 多任务键
右滑: Home键
上滑: 双击多任务(某些手机双击多任务可以切换上个应用)
下滑: 下拉通知栏
*/

runControl();

if (files.exists("/sdcard/小七_1334435449/悬浮图标/icon.png")) {
    var flo = floaty.rawWindow(
        <button id="icon" bg="file:///sdcard/小七_1334435449/悬浮图标/icon.png" scaleType="fitXY"/>
    );
} else {
    var flo = floaty.rawWindow(
        <button id="icon" bg="#55ff55" scaleType="fitXY"/>
    );
}
flo.setSize(0, 0);

var tex = "var icon = {\n        bg: \"/sdcard/小七_1334435449/悬浮图标/icon.png\",\n        XY: [30,30],\n        wh: [10,10],\n        alpha: 0.8\n    },\n    sensitivity = 5,\n    long_press_time = 500,\n    double_click_time = 500;",
    path = "/sdcard/小七_1334435449/悬浮图标/图标数据";
if (files.createWithDirs(path)) {
    files.write(path, tex);
}
eval(files.read(path));

var parameter = {
        dx: device.width / 100,
        dm: Math.floor(device.width / 100 * sensitivity)
    },
    iconFB = {
        XY: [Math.floor(icon.XY[0] * parameter.dx), Math.floor(icon.XY[1] * parameter.dx)],
        wh: [Math.floor(icon.wh[0] * parameter.dx), Math.floor(icon.wh[1] * parameter.dx)],
        XY_max: []
    };

iconFB.XY_max = [device.width - iconFB.wh[0], device.height - iconFB.wh[1]];
flo.icon.setAlpha(icon.alpha);
flo.setSize(iconFB.wh[0], iconFB.wh[1]);
flo.setPosition(iconFB.XY[0], iconFB.XY[1]);

var downTime = 0,
    eventTime = 0,
    floatyX0 = 0,
    floatyY0 = 0,
    x0 = 0,
    y0 = 0,
    dx = 0,
    dy = 0,

    state = [false, false],
    th = {
        long_press: "",
        double_click: ""
    },

    click_able = true, //单击允许
    double_click_able = false, //双击允许
    long_press_able = true, //长按允许

    function_list = {
        返回键: back,
        多任务键: recents,
        双击多任务: () => {
            recents();
            sleep(200);
            recents();
        },
        Home键: home,
        下拉通知栏: notifications,
        通知栏快捷设置: quickSettings,
        长按电源菜单: powerDialog,
        分屏: splitScreen,
        移动图标: move_icon
    },
    gesture_list = {
        click: function_list.返回键,
        double_click: function_list.正在运行脚本管理,
        left: function_list.多任务键,
        right: function_list.Home键,
        up: function_list.双击多任务,
        down: function_list.下拉通知栏,
        long_press: function_list.移动图标,
        long_left: () => {},
        long_right: () => {},
        long_up: () => {},
        long_down: () => {}
    };

setInterval(() => {}, 10000);

flo.icon.setOnTouchListener(function(v, e) {
    try {
        auto();
    } catch (err) {
        toasts("启用无障碍功能");
        return true;
    }

    switch (e.getAction()) {
        case e.ACTION_DOWN:
            downTime = e.getEventTime();
            x0 = e.getRawX();
            y0 = e.getRawY();
            floatyX0 = Math.floor(flo.getX());
            floatyY0 = Math.floor(flo.getY());
            state = [false, false];
            th.long_press = threads.start(function() {
                sleep(long_press_time);
                state[0] = "长按";
                gesture_list.long_press();
                th.long_press = "";
            });
            break

        case e.ACTION_MOVE:
            dx = Math.floor(e.getRawX() - x0);
            dy = Math.floor(e.getRawY() - y0);

            switch (state[0]) {
                case false:
                    if (Math.abs(dx) > parameter.dm || Math.abs(dy) > parameter.dm) {
                        state[0] = "滑动";
                        if (th.long_press != "") {
                            th.long_press.interrupt();
                            th.long_press = "";
                        }
                    }
                    break

                case "长按":
                    break

                case "滑动":
                    if (Math.abs(dx) < parameter.dm && Math.abs(dy) < parameter.dm) {
                        state = ["滑动", false];
                    } else {
                        threads.start(function() {
                            滑动();
                        });
                    }
            }
            break

        case e.ACTION_UP:
            switch (state[0]) {
                case false:
                    if (th.long_press != "") {
                        th.long_press.interrupt();
                        th.long_press = "";
                    }

                    if (th.double_click != "") {
                        th.double_click.interrupt();
                        th.double_click = "";
                        threads.start(function() {
                            gesture_list.double_click();
                        });
                    } else if (double_click_able) {
                        th.double_click = threads.start(function() {
                            sleep(double_click_time);
                            if (click_able) {
                                gesture_list.click();
                            } else {
                                穿透();
                            }
                            th.double_click = "";
                        });
                    } else if (click_able) {
                        threads.start(function() {
                            gesture_list.click();
                        });
                    } else {
                        threads.start(function() {
                            穿透();
                        });
                    }
                    break

                case "滑动":
                    threads.start(function() {
                        滑动结束()
                    });
            }
            state[0] = false;
    }
    return true
});

function 穿透() {
    log("穿透");
    flo.setSize(0, 0);
    sleep(200);
    log(click(x0, y0));
    flo.setSize(iconFB.wh[0], iconFB.wh[1]);
}

function move_icon() {
    state[0] = "滑动";
    move_able = true;
}

function 滑动() {
    if (move_able) {
        iconFB.XY = [dx + floatyX0, dy + floatyY0];
        showRefresh();
    } else {
        let i = (dx - dy) > 0,
            n = (dx + dy) > 0;
        switch (true) {
            case i && n:
                state[1] = "right";
                break
            case (!i) && (!n):
                state[1] = "left";
                break
            case i && (!n):
                state[1] = "up";
                break
            case (!i) && n:
                state[1] = "down";
        }
    }
}

function 滑动结束() {
    if (move_able) {
        fileRefresh();
        move_able = false;
    } else {
        switch (state[1]) {
            case "right":
                gesture_list.right();
                break
            case "left":
                gesture_list.left();
                break
            case "up":
                gesture_list.up();
                break
            case "down":
                gesture_list.down();
        }
    }
}


function showRefresh() {
    flo.icon.setAlpha(icon.alpha);
    flo.setSize(iconFB.wh[0], iconFB.wh[1]);
    iconFB.XY_max = [device.width - iconFB.wh[0], device.height - iconFB.wh[1]];
    if (iconFB.XY[0] > iconFB.XY_max[0]) iconFB.XY[0] = iconFB.XY_max[0];
    if (iconFB.XY[1] > iconFB.XY_max[1]) iconFB.XY[1] = iconFB.XY_max[1];
    if (iconFB.XY[0] < 0) iconFB.XY[0] = 0;
    if (iconFB.XY[1] < 0) iconFB.XY[1] = 0;
    flo.setPosition(iconFB.XY[0], iconFB.XY[1]);
}

function fileRefresh() {
    let text = "var icon = {\n        bg: \"" + icon.bg + "\",\n        XY: [" + iconFB.XY[0] / parameter.dx + ", " + iconFB.XY[1] / parameter.dx + "],\n        wh: [" + iconFB.wh[0] / parameter.dx + ", " + iconFB.wh[1] / parameter.dx + "],\n        alpha: " + icon.alpha + "\n    },\n    sensitivity = " + sensitivity + ",\n    long_press_time = " + long_press_time + ",\n    double_click_time = " + double_click_time + ";",
        path = "/sdcard/小七_1334435449/悬浮图标/图标数据";
    files.write(path, text);
}


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