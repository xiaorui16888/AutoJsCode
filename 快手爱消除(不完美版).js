auto();
requestScreenCapture();
awc = 15;
ays = 1;
var window = floaty.window(
    <frame><linear>
        <button id="action" text="运行" w="40" h="40" color="#ffffff" bg="#66000000" />
    </linear> </frame>
);

var execution = null;

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 1500) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                onClick();
            }
            return true;
    }
    return true;
});

setInterval(() => {}, 1000);


function capturescreen() {
    while (true) {
        if (ajt = captureScreen()) {
            return ajt;
            break;
        }
    }
}

function c0() {
    for (i0 = 0; i0 <= 6; i0++) {
        for (i1 = 0; i1 <= 9; i1++) {
            c1 = -10523472;
            c2 = a2[i0][i1];
            if (Math.abs(colors.red(c1) - colors.red(c2)) < awc && Math.abs(colors.green(c1) - colors.green(c2)) < awc && Math.abs(colors.blue(c1) - colors.blue(c2)) < awc) {
                b1[i0][i1] = 0;
            }
        }
    }
}

function d0(d01, d02, d03, d04) {
    if (d01 == d03) {
        d05 = (d02 - d04) / (Math.abs(d02 - d04));
        for (d06 = d04 + d05; d06 != d02; d06 += d05) {
            if (b1[d01][d06] != 0) {
                return false;
            }
        }
    }
    if (d02 == d04) {
        d05 = (d01 - d03) / (Math.abs(d01 - d03));
        for (d06 = d03 + d05; d06 != d01; d06 += d05) {
            if (b1[d06][d02] != 0) {
                return false;
            }
        }
    }
    if (d01 != d03 && d02 != d04) {
        return false;
    }
    return true;
}

function d1(d11, d12, d13, d14) {
    if (b1[d11][d14] == 0) {
        if (d0(d11, d14, d11, d12) && d0(d11, d14, d13, d14)) {
            return true;
        }
    }
    if (b1[d13][d12] == 0) {
        if (d0(d13, d12, d11, d12) && d0(d13, d12, d13, d14)) {
            return true;
        }
    }
    return false;
}

function d2(d21, d22, d23, d24) {
    if (d21 == 0 && d23 == 0) {
        return true;
    }
    if (d21 == 6 && d23 == 6) {
        return true;
    }
    if (d22 == 0 && d24 == 0) {
        return true;
    }
    if (d22 == 9 && d24 == 9) {
        return true;
    }
    for (d25 = 0; d25 <= 6; d25++) {
        if (b1[d25][d22] == 0 && d0(d25, d22, d21, d22) && d1(d25, d22, d23, d24)) {
            return true;
        }
    }
    for (d25 = 0; d25 <= 9; d25++) {
        if (b1[d21][d25] == 0 && d0(d21, d25, d21, d22) && d1(d21, d25, d23, d24)) {
            return true;
        }
    }
    if (b1[0][d22] == 0 && b1[0][d24] == 0 && d0(0, d22, d21, d22) && d0(0, d24, d23, d24)) {
        return true;
    }
    if (b1[6][d22] == 0 && b1[6][d24] == 0 && d0(6, d22, d21, d22) && d0(6, d24, d23, d24)) {
        return true;
    }
    if (b1[d21][0] == 0 && b1[d23][0] == 0 && d0(d21, 0, d21, d22) && d0(d23, 0, d23, d24)) {
        return true;
    }
    if (b1[d21][9] == 0 && b1[d23][9] == 0 && d0(d21, 9, d21, d22) && d0(d23, 9, d23, d24)) {
        return true;
    }
    return false;
}

function d3(d31, d32, d33, d34) {
    if (d0(d31, d32, d33, d34) || d1(d31, d32, d33, d34) || d2(d31, d32, d33, d34)) {
        return true;
    }
}

function abs(a7, a8, a9, a10) {
    a11 = a2[a7][a8];
    a12 = a2[a9][a10];
    //log(colors.toString(ab6)+":"+colors.toString(ab7));
    if (Math.abs(colors.red(a11) - colors.red(a12)) < awc && Math.abs(colors.green(a11) - colors.green(a12)) < awc && Math.abs(colors.blue(a11) - colors.blue(a12)) < awc) {
        return true;
    } else {
        return false;
    }
}

function onClick(){
    threads.start(function() {
    a0 = [114,260,394,537,683,825,969];
    a1 = [535,667,813,954,1098,1237,1380,1525,1667,1810];
    a2 = new Array();
    b1 = new Array();
    for (i0 = 0; i0 <= 6; i0++) {
        a2[i0] = new Array();
        b1[i0] = new Array();
        for (i1 = 0; i1 <= 9; i1++) {
            a2[i0][i1] = images.pixel(capturescreen(), a0[i0], a1[i1])
        }
    }
    b0 = 1;
    for (i0 = 0; i0 <= 6; i0++) {
        for (i1 = 0; i1 <= 9; i1++) {
            if (b1[i0][i1] == null) {
                b1[i0][i1] = b0;
                b0++;
                for (i2 = 0; i2 <= 6; i2++) {
                    for (i3 = 0; i3 <= 9; i3++) {
                        if (abs(i0, i1, i2, i3)) {
                            b1[i2][i3] = b1[i0][i1];
                        }
                    }
                }
            }
        }
    }
    c0();
    while (true) {
        e = 0;
        for (i0 = 0; i0 <= 6; i0++) {
            for (i1 = 0; i1 <= 9; i1++) {
                if (b1[i0][i1] != 0) {
                    for (i2 = 0; i2 <= 6; i2++) {
                        for (i3 = 0; i3 <= 9; i3++) {
                            if ((i0 != i2 || i1 != i3) && b1[i0][i1] == b1[i2][i3] && b1[i0][i1] != 0) {
                                if (d3(i0, i1, i2, i3)) {
                                    swipe(a0[i0], a1[i1], a0[i0], a1[i1], ays);
                                    swipe(a0[i2], a1[i3], a0[i2], a1[i3], ays);
                                    e++;
                                    log(i0 + "," + i1 + "," + i2 + "," + i3);
                                    b1[i0][i1] = 0;
                                    b1[i2][i3] = 0;
                                }
                            }
                        }
                    }
                }
            }
        }
        if (e == 0) {
            break;
        }
        t = "";
        for (i0 = 0; i0 <= 9; i0++) {
            t = t + "\n";
            for (i1 = 0; i1 <= 6; i1++) {
                t = t + b1[i1][i0] + ",  ";
            }
        }
        log(t);
    }
});}