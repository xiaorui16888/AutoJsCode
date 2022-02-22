var ScriptName = (engines.myEngine().getSource().toString().match(/\/([^\/]+)$/))[1];
//var ScriptName="小尾巴";
ScriptName  =  new  RegExp(ScriptName);
var execution = engines.all();
for (var i = 1; i < execution.length; i++) {
    if (ScriptName.test((execution[i].getSource().toString().match(/\/([^\/]+)$/))[1])) {
        toast(ScriptName + "已有");
        exit();
    }
}

auto();
setScreenMetrics(2316,1080);
var window = floaty.window(
    <vertical alpha="0.5" bg="#ff000000">
      <horizontal>
         <button id="butX" text="♢" bg="file://img/X.jpg" w="120px" h="120px"/>
         <button id="but1" text="1" bg="file://img/法.jpg" w="120px" h="120px"/>
         <button id="but2" text="2" bg="file://img/防.jpg" w="120px" h="120px"/>
         <button id="but3" text="3" bg="file://img/攻.jpg" w="120px" h="120px"/>
         <button id="but4" text="♡" bg="file://img/L.jpg" w="120px" h="120px"/>
      </horizontal>
    </vertical>
);

function weiyi(a, b, c) {
    var a, b, c;
    return Math.round(Math.sqrt(a * a + b * b + c * c) * 1000) / 1000
}

function windowGXY(x, y, k) {
    if (x < k[0]) {
        x = k[0]
    };
    if (k[2] < x) {
        x = k[2]
    };
    if (y < k[1]) {
        y = k[1]
    };
    if (k[3] < y) {
        y = k[3]
    };
    return [x, y];
}

sleep(50);
var size = [window.getWidth(), window.getHeight()];
window.setPosition(300, 200);
window.setSize(size[1], size[1]);
var time = 70;

setInterval(() => {
    runTick()
}, 50);

var array = {
    商: [1860, 50],
    第: [430, 990],
    售: [1750, 840],
    滑: [960, 750, 920, 360],
    攻: [125, 360, 1360, 330],
    法: [125, 450, 990, 870],
    防: [125, 550, 430, 870],
    买: [1750, 950, 1750, 830, 1840, 190],
    关: [1840, 80]
};

var x, y, sx, sy, dx, dy;
//记录按键被按下时的悬浮窗位置
var X, Y;
//记录按键被按下的时间以便判断长按等动作
var Akeep = false,
    yidong = false,
    Time = 0;

function runTick() {
    while (true) {
        if (Akeep) {
            Time++;
            if (!yidong && Time > 20) {
                //非移动且按下时长超过1秒判断为长按
                sleep(50);
                window.close();
                toast("已停止运行");
                exit();
            }
        }
        sleep(50);
    }
}

window.butX.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            X = window.getX();
            Y = window.getY();
            Akeep = true; //按下,开启计时
            //console.clear();
            return true;
        case event.ACTION_MOVE:
            sx = event.getRawX() - x;
            sy = event.getRawY() - y;
            if (!yidong && weiyi(sx, sy, 0) >= 20) {
                yidong = true;
                dx = sx;
                dy = sy
            };
            if (yidong) {
                window.setPosition(X + sx - dx, Y + sy - dy);
            }
            return true;
        case event.ACTION_UP:
            if (!yidong && Time < 7) {
                if (Math.abs(window.getWidth() - window.getHeight()) < 10) {
                    window.setSize(size[0], size[1]);
                } else {
                    window.setSize(size[1], size[1]);
                }
            }
            Akeep = false;
            Time = 0;
            if (yidong) {
                var gx = Math.round(X + sx - dx),
                    gy = Math.round(Y + sy - dy);
                var A = windowGXY(gx, gy, [0, -70, device.width - window.getWidth(), device.height - window.getHeight() - 70])
                window.setPosition(A[0], A[1]);
                yidong = false;
            };
            return true;
    }
    return true;
});

window.but1.click(() => {
    threads.start(function() {

        click(array.商[0], array.商[1]);
        sleep(time);
        click(array.第[0], array.第[1]);
        sleep(time);
        click(array.售[0], array.售[1]);
        sleep(time);
        click(array.法[0], array.法[1]);
        sleep(time);
        click(array.法[2], array.法[3]);
        sleep(time);
        click(array.买[0], array.买[1]);
        sleep(time);
        click(array.防[0], array.防[1]);
        sleep(time);
        click(array.防[2], array.防[3]);
        sleep(time);
        click(array.买[2], array.买[3]);
        sleep(time);
        click(array.关[0], array.关[1]);
        sleep(time);



    });
});

window.but2.click(() => {
    threads.start(function() {

        click(array.商[0], array.商[1]);
        sleep(time);
        click(array.第[0], array.第[1]);
        sleep(time);
        click(array.售[0], array.售[1]);
        sleep(time);
        click(array.关[0], array.关[1]);
        sleep(time);
        click(array.买[4], array.买[5]);
        sleep(time);

    });
});

window.but3.click(() => {
    threads.start(function() {

        click(array.商[0], array.商[1]);
        sleep(time);
        click(array.第[0], array.第[1]);
        sleep(time);
        click(array.售[0], array.售[1]);
        sleep(time);
        click(array.攻[0], array.攻[1]);
        sleep(time);
        click(array.攻[2], array.攻[3]);
        sleep(time);
        click(array.买[0], array.买[1]);
        sleep(time);
        click(array.关[0], array.关[1]);
        sleep(time);

    });
});

window.but4.click(() => {
    threads.start(function() {
        rawInput("延迟", "", input => {
            input = parseInt(input);
            if (input) {
                time = input;
                toast("延迟: " + time);
            }
        });
    });
});