/*
飞猪  
屏幕 1080*1920
初始位置     偏移量
x540        119
y1402       152
*/
requestScreenCapture(false);
setScreenMetrics(1080, 1920);
var ws = device.width / 1080,
    hs = device.height / 1920;
var fx = Math.round(540 * ws),
    fy = Math.round(1402 * hs),
    sx = Math.round(119 * ws),
    sy = Math.round(152 * hs);
var color = "#FFAFB42B";
//log(ws,hs,fx,fy,sx,sy);
function capturescreen() { //稳定截图模块
    var a;
    while (true) {
        if (a = captureScreen()) {
            return a;
        }
    }
};

function weiyi() {
    var num = 0;
    for (var i = 0; i < arguments.length; i++) {
        num += arguments[i] * arguments[i];
    }
    return Math.round(Math.sqrt(num) * 1000) / 1000
};

var window = floaty.window(
    <frame>
        <button id="but" text="开始" textSize="20sp" bg="#77000000"/>
    </frame>
);
sleep(200);
window.setPosition(0, 1600 * hs);

setInterval(function() {}, 500);

var x, y, X, Y, ax, ay;
window.but.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            X = window.getX();
            Y = window.getY();
            return true;
        case event.ACTION_MOVE:
            ax = event.getRawX() - x;
            ay = event.getRawY() - y;
            window.setPosition(X + ax, Y + ay);
            return true;
        case event.ACTION_UP:
            if (weiyi(ax, ay) < 20) {
                onClick();
            };
            return true;
    }
    return true;
});
var thread;

function onClick() {
    try {
        if (window.but.getText() == "开始") {
            thread = threads.start(kaishi); //定义一个线程
            ui.run(() => {
                window.but.setText("停止");
            });
        } else {
            //thread.stop(); //线程停止
            thread.interrupt();
            ui.run(() => {
                window.but.setText("开始");
            });
        };
    } catch (e) {
        toast(e);
    }
};

function kaishi() {
    //console.show();
    while (true) {
        var img = capturescreen();
        //var img=images.read("/sdcard/脚本创作部/飞猪/imgs/img3.jpg");
        var x = fx,
            y = fy;
        var ary = new Array;
        while (true) {
            if (colors.isSimilar(images.pixel(img, Math.round(x + sx), Math.round(y - sy)), color, 16)) {
                x += sx;
                y -= sy;
                //ary.push(1);
                click(Math.round(device.width * 0.75 + random(0, 100)), Math.round(device.height * 0.75 + random(0, 100)));
            } else if (colors.isSimilar(images.pixel(img, Math.round(x - sx), Math.round(y - sy)), color, 16)) {
                x -= sx;
                y -= sy;
                //ary.push(0);
                click(Math.round(device.width * 0.25 + random(0, 100)), Math.round(device.height * 0.75 + random(0, 100)));
            } else {
                break;
                // if (device.width <= x || x < 0 || y < 400 * hs)
            };
            sleep(100);
            log(x, y);
        };
        //sleep(100);
        //log(ary);
    };
};