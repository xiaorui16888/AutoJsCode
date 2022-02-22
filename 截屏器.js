var ScriptName = engines.myEngine().getSource().toString().match(/[^\/]+$/)[0];
var execution = engines.all();
var Scripts = 0;
for (var i = 0; i < execution.length; i++) {
    if (ScriptName == execution[i].getSource().toString().match(/[^\/]+$/)[0]) {
        Scripts++;
        if (Scripts == 2) {
            toast(ScriptName + "已有");
            exit();
        }
    }
}

try {
    //auto();
} catch (e) {
    toast("无障碍未启用");
    exit();
};

requestScreenCapture();

function 截图() {
    while (true) {
        if (图 = captureScreen()) {
            return 图;
            break;
        }
    }
};


var window = floaty.window(
    <frame>
        <button id="but" text="截屏" textSize="20sp" bg="#77000000"/>
    </frame>
);

var x, y, sx, sy, dx, dy;
//记录按键被按下时的悬浮窗位置
var X, Y;
//记录按键被按下的时间以便判断长按等动作
var Akeep = false,
    yidong = false,
    Time = 0;

setInterval(function() {
    if (Akeep) {
        Time++;
        if (!yidong && Time > 20) {
            //非移动且按下时长超过1秒判断为长按
            window.close();
            toast("已停止运行");
            exit();
        }
    }
}, 50);
sleep(100);
G = function(win) {
    var K = 35, //悬浮窗的隐形边矩
        H = 66; //手机通知栏的高度
    return [-K, -K, device.width - win.getWidth() + K, device.height - win.getHeight() - H + K]
};
// G(window) 悬浮窗位置限制范围
window.but.setOnTouchListener(function(view, event) {
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
            if (!yidong && weiyi(sx, sy) >= 50) {
                yidong = true;
                dx = 0;
                dy = 0;
            };
            if (yidong) {
                window.setPosition(X + sx - dx, Y + sy - dy);
            };
            return true;
        case event.ACTION_UP:
            if (!yidong && Time < 7) {
                var a = x - (X + window.getWidth() / 2),
                    b = y - (Y + window.getHeight() / 2);
                onClick();
            }
            Akeep = false;
            Time = 0;
            if (yidong) {
                var gx = Math.round(X + sx - dx),
                    gy = Math.round(Y + sy - dy);
                var A = windowGXY(gx, gy, G(window));
                window.setPosition(A.x, A.y);
                yidong = false;
            };
            return true;
    }
    return true;
});
//var F = G(window);
//windowyidong(F, window);
//windowyidong([F[2], F[3], F[2], F[1]], window);
//windowyidong([F[2], F[1], F[0], F[1]], window);
//windowyidong([F[0], F[1], F[0], F[3]], window);
//windowyidong([F[0], F[3], F[2], F[3]], window);
windowyidong([0,0,device.width/2-window.getWidth()/2,device.width/2-window.getHeight()], window);

function weiyi() {
    var num = 0;
    for (var i = 0; i < arguments.length; i++) {
        num += arguments[i] * arguments[i];
    }
    return Math.round(Math.sqrt(num) * 1000) / 1000
}

function windowyidong(A, B, C) {
    var sx = A[2] - A[0],
        sy = A[3] - A[1];
    C = C || 75;
    var sd = weiyi(sx, sy) / C;
    var X = sx / sd,
        Y = sy / sd;
    var x = 0,
        y = 0;
    for (var i = 0; i < sd; i++) {
        x += X;
        y += Y;
        sleep(5);
        B.setPosition(A[0] + x, A[1] + y);
    }
    B.setPosition(A[2], A[3]);
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
    return {
        x: x,
        y: y
    };
}
var thread = null;

function onClick() {
    if (!thread) {
        thread = threads.start(kaishi);
    };
};

function kaishi() {
     try{
    requestScreenCapture();
    var Width=device.width,Height=device.height;
    var img = 截图();
    if(img.getWidth()>img.getHeight()){Width=device.height;Height=device.width;};
    var x = window.getX(),
        y = window.getY();
    var sx = window.getX() + window.getWidth() / 2,
        sy = window.getY() + window.getHeight() / 2;
    var cx = Math.abs(Width/2 - sx) > Math.abs(Height/2 - sy) ? (sx < Width / 2 ? -window.getWidth() : Width) : x;
    var cy = Math.abs(Width/2 - sx) > Math.abs(Height/2 - sy) ? y : (sy < Height / 2 ? -window.getHeight()-66 : Height);
    windowyidong([x, y, cx, cy], window);
    sleep(100);
    var img = 截图();
    var path = files.join("/sdcard/Pictures/ScreenShots", gettime() + ".png");
    files.createWithDirs(path);
    images.save(img, path, "png", 100);
    media.scanFile(path);
    var window1 = floaty.window(
        <frame w="{{device.width/2-75}}px" h="{{device.width/2-75+20}}px" gravity="center" bg="#000000">
                <img id="img" w="{{device.width/2-75}}px" margin="0px 10px 0px 10px" gravity="center" bg="#000000"/>
                </frame>
    );
    window1.img.setOnClickListener(function() {
        app.viewFile(path);
    });
    window1.setPosition(Width, Height);
    window1.img.setSource(img);
    sleep(100);
    windowyidong([Width / 2 - window1.getWidth() / 2, Height, Width / 2 - window1.getWidth() / 2, Height / 2-66], window1, 50);
    sleep(1000);
    windowyidong([Width / 2 - window1.getWidth() / 2, Height / 2-66, Width / 2 - window1.getWidth() / 2, Height], window1, 50);
    window1.close();
    windowyidong([cx, cy, x, y], window);
    thread = null;
    }catch(e){toastLog(e)};    
};


function gettime() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    };
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    };
    var hour = date.getHours();
    if (hour < 10) {
        hour = "0" + hour;
    };
    var minute = date.getMinutes();
    if (minute < 10) {
        minute = "0" + minute;
    };
    return year + month + day + hour + minute;
};