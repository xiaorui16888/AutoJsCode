toastLog("Are you ready？");
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
};
var window = floaty.window(
    <vertical bg="#aaaaaa">
        <frame w="*">
            <text text="图片查看器" textSize="60px"  gravity="center" layout_gravity="center"/>
            <button id="but_" w="100px" margin="0px 25px 0px 0px" bg="@drawable/ic_remove_black_48dp" gravity="center" layout_gravity="right"/>
        </frame>
        <canvas id="canvas" w="800px" h="1000px" margin="0px 20px 0px 20px"/>
        <horizontal w="*" gravity="center">
            <button id="butJ" w="200px" text="截图"/>
            <button id="butX" w="200px" text="选图"/>
            <button id="butY" w="200px" text="移动"/>
            <button id="butG" w="200px" text="关闭"/>
        </horizontal>
    </vertical>
);

var window_ = floaty.window(
    <frame >
        <img w="150px" h="150px" src="#88eeeeee" radius="70px"/>
        <img id="but_$" w="150px" h="150px" src="@drawable/ic_details_black_48dp"/>
    </frame>
);

setInterval(() => {}, 1000);
window.exitOnClose();
threads.start(function() {});
var windowPosition = [{
    x: 0,
    y: 0,
    size: [0, 0]
}, {
    x: 0,
    y: 0,
    size: [0, 0]
}];
sleep(100);
window_.setPosition(device.width, device.height);
window.setPosition(device.width, device.height);
var IMG = 截图();
var img = images.copy(IMG);
window.setPosition(0, 0);
var paint = new Paint;
paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(5);
paint.setStyle(Paint.Style.STROKE);
var data = {
    translate: {
        x: 0,
        y: 0
    },
    scale: 1,
    rotate: 0
};
var 点色;
window.canvas.on("draw", function(canvas) {
    canvas.drawARGB(255, 127, 127, 127);
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    paint.setStrokeWidth(5);
    var matrix = new android.graphics.Matrix();
    matrix.postRotate(data.rotate);
    matrix.postScale(data.scale, data.scale);
    matrix.postTranslate(data.translate.x, data.translate.y);
    paint.setARGB(255, 0, 0, 0);
    canvas.drawImage(img, matrix, paint);
    paint.setStrokeWidth(5);
    paint.setStyle(Paint.Style.STROKE);
    for (var i = 0; i < TouchPoints.length; i++) {
        break;
        try {
            if (!TouchPoints[i]) {
                continue;
            };
            var X = TouchPoints[i].X,
                Y = TouchPoints[i].Y,
                x = TouchPoints[i].x,
                y = TouchPoints[i].y;
            canvas.drawCircle(X, Y, 200, paint);
            canvas.drawCircle(X, Y, 100, paint);
            canvas.drawLine(X, Y, x, y, paint);
            canvas.drawCircle(x, y, 100, paint);
            if (TouchPoints[i + 1]) {
                var x1 = TouchPoints[i + 1].x,
                    y1 = TouchPoints[i + 1].y;
                canvas.drawLine(x, y, x1, y1, paint);
            };
        } catch (e) {};
    };
    var matrix = new android.graphics.Matrix();
    matrix.postRotate(data.rotate, w / 2, h / 2);
    canvas.setMatrix(matrix);
    paint.setStrokeWidth(5);
    paint.setARGB(255, 255, 255, 0);
    canvas.drawLine(w / 2 - 50, h / 2, w / 2 - 100, h / 2, paint);
    paint.setARGB(255, 255, 0, 255);
    canvas.drawLine(w / 2, h / 2 - 50, w / 2, h / 2 - 100, paint);
    paint.setARGB(255, 255, 0, 0);
    canvas.drawLine(w / 2 + 50, h / 2, w / 2 + 100, h / 2, paint);
    paint.setARGB(255, 0, 0, 255);
    canvas.drawLine(w / 2, h / 2 + 50, w / 2, h / 2 + 100, paint);
    var S = 算坐标(w / 2, h / 2, data, img);
    点色 = S;
    paint.setColor(S.color);
    paint.setStrokeWidth(15);
    canvas.drawCircle(w / 2, h / 2, 41, paint);
    paint.setColor(反色(S.color));
    paint.setStrokeWidth(5);
    canvas.drawCircle(w / 2, h / 2, 50, paint);
    var S1 = 算坐标(w / 2, h / 2 - 100, data, img);
    var S2 = 算坐标(w / 2, h / 2 + 100 - 12.5, data, img);
    var S3 = 算坐标(w / 2, h / 2 + 100 + 12.5, data, img);
    canvas.setMatrix(new android.graphics.Matrix());
    paint.setStrokeWidth(1);
    paint.setStyle(Paint.Style.FILL);
    var size = 40;
    paint.setTextSize(size);
    paint.setColor(反色(S1.color));
    canvas.drawText(S.x + "," + S.y, w / 2, h / 2 - 100 + 0.365 * size, paint);
    paint.setColor(反色(S2.color));
    canvas.drawText(S.color, w / 2, h / 2 + 100 - 12.5 + 0.365 * size, paint);
    paint.setColor(反色(S3.color));
    canvas.drawText(S.colorString, w / 2, h / 2 + 100 + 20 + 0.365 * size, paint);
});

function 算坐标(X, Y, data, img) {
    var X = X - data.translate.x,
        Y = Y - data.translate.y;
    var WE = weiyi([X, Y]);
    log(WE);
    var YY = ydfx([X, Y]);
    log(YY);
    var KY = YY - data.rotate;
    var KK = kdfx(KY);
    log(KK);
    var SS = getsd(WE / data.scale, KK);
    log(SS);
    var x = Math.floor((0 <= SS[0] && SS[0] < img.getWidth()) ? SS[0] : (0 <= SS[0] ? img.getWidth() - 1 : 0));
    var y = Math.floor((0 <= SS[1] && SS[1] < img.getHeight()) ? SS[1] : (0 <= SS[1] ? img.getHeight() - 1 : 0));
    var color = images.pixel(img, x, y);
    var colorString = colors.toString(color);
    return {
        x: x,
        y: y,
        color: color,
        colorString: String(colorString)
    };
};

function 反色(color) {
    return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};
var Touch = new Array;
var TouchPoints = new Array;
var TouchData = new Array;
var Wx, Wy, fuzhiid = 0,
    fuzhi = false;
window.canvas.setOnTouchListener(function(view, event) {
    try {
        sw: switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
            case event.ACTION_DOWN:
                var i = Math.floor(event.getAction() / 256);
                var id = event.getPointerId(i);
                var X = event.getX(i);
                var Y = event.getY(i);
                if (weiyi([view.width / 2 - X, view.height / 2 - Y]) <= 50) {
                    Wx = X;
                    Wy = Y;
                    fuzhi = true;
                    fuzhiid = id;
                    break;
                };
                TouchPoints[id] = {
                    X: X,
                    Y: Y,
                    x: X,
                    y: Y
                };
                var PC = event.getPointerCount();
                if (PC >= 3) {
                    data = {
                        translate: {
                            x: 0,
                            y: 0
                        },
                        scale: 1,
                        rotate: 0
                    };
                };
                Touch[id] = {
                    X: X - data.translate.x,
                    Y: Y - data.translate.y
                };
                TouchData = {
                    translate: {
                        x: data.translate.x,
                        y: data.translate.y
                    },
                    scale: data.scale,
                    rotate: data.rotate
                };
                break;
            case event.ACTION_MOVE:
                if (fuzhi) {
                    break
                };
                var PC = event.getPointerCount();
                for (var i = 0; i < PC; i++) {
                    var id = event.getPointerId(i);
                    var X = event.getX(i);
                    var Y = event.getY(i);
                    X = (0 <= X && X < view.width - 1) ? X : (0 <= X ? view.width - 1 : 0);
                    Y = (0 <= Y && Y < view.height - 1) ? Y : (0 <= Y ? view.height - 1 : 0);
                    TouchPoints[id].x = X;
                    TouchPoints[id].y = Y;
                };
                if (PC == 1) {
                    var id = event.getPointerId(0);
                    var X = event.getX(0);
                    var Y = event.getY(0);
                    data.translate.x = X - Touch[id].X;
                    data.translate.y = Y - Touch[id].Y;
                } else if (PC == 2) {
                    var id = event.getPointerId(0);
                    var X = event.getX(0);
                    var Y = event.getY(0);
                    var id1 = event.getPointerId(1);
                    var X1 = event.getX(1);
                    var Y1 = event.getY(1);
                    var YY = ydfx([Touch[id1].X - Touch[id].X, Touch[id1].Y - Touch[id].Y]);
                    var YY1 = ydfx([X1 - X, Y1 - Y]);
                    var kY = YY1 - YY;
                    data.rotate = TouchData.rotate + kY;
                    var SS = weiyi([Touch[id1].X - Touch[id].X, Touch[id1].Y - Touch[id].Y]);
                    var SS1 = weiyi([X1 - X, Y1 - Y]);
                    var kS = SS1 / SS;
                    data.scale = TouchData.scale * kS;
                    var TY = ydfx([-Touch[id].X, -Touch[id].Y]);
                    var YC = TY - YY;
                    var TS = weiyi([Touch[id].X, Touch[id].Y]);
                    var TY1 = YY1 + YC;
                    var KKK = kdfx(TY1);
                    var SD = getsd(TS * kS, KKK);
                    data.translate.x = X + SD[0];
                    data.translate.y = Y + SD[1];
                } else {
                    data = {
                        translate: {
                            x: 0,
                            y: 0
                        },
                        scale: 1,
                        rotate: 0
                    };
                };
                break;
            case event.ACTION_UP:
                var i = Math.floor(event.getAction() / 256);
                var id = event.getPointerId(i);
                if (fuzhi && id == fuzhiid) {
                    if (weiyi([event.getX(i) - Wx, event.getY(i) - Wy]) <= 10) {
                        setClip(Disassembly(点色));
                        toastLog("已复制 \n" + Disassembly(点色));
                    };
                    fuzhi = false;
                    break;
                };
                TouchPoints[id] = undefined;
                Touch[id] = undefined;
                var PC = event.getPointerCount();
                for (var i = 0; i < PC; i++) {
                    var id1 = event.getPointerId(i)
                    var X = event.getX(i);
                    var Y = event.getY(i);
                    if (id1 != id) {
                        Touch[id1] = {
                            X: X - data.translate.x,
                            Y: Y - data.translate.y
                        };
                    };
                };
                log(PC);
                break;
        };
        return true;
    }
    catch (e) {
        toastLog("Touch: " + e);
        return true;
    };
});

window.but_.click(() => {
    threads.start(function() {
        windowPosition[0].x = window.getX(),
            windowPosition[0].y = window.getY();
        windowyidong([windowPosition[0].x, windowPosition[0].y, windowPosition[1].x, windowPosition[1].y], window);
        window.setPosition(device.width, device.height);
        window_.setPosition(windowPosition[1].x, windowPosition[1].y);
    });
});
var WX, WY, yidong = false;
window_.but_$.setOnTouchListener(function(view, event) {
    try {
        sw: switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
            case event.ACTION_DOWN:
                Wx = event.getRawX();
                Wy = event.getRawY();
                WX = window_.getX();
                WY = window_.getY();
                break;
            case event.ACTION_MOVE:
                if (yidong) {
                    window_.setPosition(WX + event.getRawX() - Wx, WY + event.getRawY() - Wy);
                } else {
                    if (weiyi([event.getRawX() - Wx, event.getRawY() - Wy]) >= 10) {
                        yidong = true;
                    };
                };
                break;
            case event.ACTION_UP:
                if (yidong) {
                    window_.setPosition(WX + event.getRawX() - Wx, WY + event.getRawY() - Wy);
                    yidong = false;
                } else {
                    threads.start(function() {
                        windowPosition[1].x = window_.getX(),
                            windowPosition[1].y = window_.getY();
                        window_.setPosition(device.width, device.height);
                        windowyidong([windowPosition[1].x, windowPosition[1].y, windowPosition[0].x, windowPosition[0].y], window);
                    });
                };
                break;
        };
        return true;
    }
    catch (e) {
        toastLog("Touch2: " + e);
        return true;
    };
});



window.butJ.click(() => {
    threads.start(function() {
        windowPosition[0].x = window.getX(),
            windowPosition[0].y = window.getY();
        window.setPosition(device.width, device.height);
        sleep(100);
        var IMG = 截图();
        img = images.copy(IMG);
        window.setPosition(windowPosition[0].x, windowPosition[0].y);
    });
});
window.butX.click(() => {
    threads.start(function() {
        var Apath = "/sdcard";
        var path = listpath(Apath);
        if (path) {
            var IMG = 加载图片(path);
            img = images.copy(IMG);
        };
    });
});
window.butY.setOnTouchListener(function(view, event) {
    try {
        sw: switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
            case event.ACTION_DOWN:
                Wx = event.getRawX();
                Wy = event.getRawY();
                WX = window.getX();
                WY = window.getY();
                break;
            case event.ACTION_MOVE:
                window.setPosition(WX + event.getRawX() - Wx, WY + event.getRawY() - Wy);
                break;
            case event.ACTION_UP:
                window.setPosition(WX + event.getRawX() - Wx, WY + event.getRawY() - Wy);
                yidong = false;
                break;
        };
        return true;
    }
    catch (e) {
        toastLog("Touch1: " + e);
        return true;
    };
});
window.butG.click(() => {
    window.close();
    exit();
});

function 截图() {
    while (true) {
        if (图 = captureScreen()) {
            return 图;
            break;
        }
    }
};

function windowyidong(A, B, s) {
    s = s || 5;
    var sx = A[2] - A[0],
        sy = A[3] - A[1];
    var sd = weiyi([sx, sy]) / 50;
    var X = sx / sd,
        Y = sy / sd;
    var x = 0,
        y = 0;
    for (var i = 0; i < sd; i++) {
        x += X;
        y += Y;
        sleep(s);
        B.setPosition(A[0] + x, A[1] + y);
    }
    B.setPosition(A[2], A[3]);
};

function DrawGrid(canvas, paint, s) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    var sx = Math.floor(w / s),
        sy = Math.floor(h / s);
    for (var i = -sx; i < sx; i++) {
        canvas.drawLine(i * s, -h, i * s, h, paint);
    };
    for (var i = -sy; i < sy; i++) {
        canvas.drawLine(-w, i * s, w, i * s, paint);
    };
    var x = (w / 2) % s,
        y = (h / 2) % s;
    return {
        x: x,
        y: y,
        w: (w - 2 * x) / s,
        h: (h - 2 * y) / s,
        s: s
    };
};

function Details(A, re) {
    threads.start(function() {
        console.show();
    });
    log(typeof(A));
    log(typeof(re));
    if (typeof(re) == "string") {
        re = new RegExp(re, "i")
    };
    log(A);
    try {
        log(A.toString());
    } catch (e) {
        toast(e)
    };
    for (var i in A) {
        try {
            if (!re || re.test(i.toString())) {
                log(typeof(A[i]));
                log(i + "\n" + A[i].toString())
            };
        } catch (e) {
            log("错误")
        }
    };
};

function 加载图片(A) {
    if (files.isFile(A)) {
        return images.read(A);
    };
    var dir = "/storage/emulated/0/DCIM";
    var jsFiles = files.listDir(dir, function(name) {
        return (name.endsWith(".jpg") || name.endsWith(".png")) && files.isFile(files.join(dir, name));
    });
    if (jsFiles.length) {
        return images.read(files.join(dir, jsFiles[jsFiles.length - 1]));
    } else {
        toastLog("没有图片可以查看");
        toastLog("请自己修改路径");
        toastLog("后使用");
        exit();
    };
};

function listpath(Apath, Bpath) {
    Bpath = Bpath || "";
    var path = files.join(Apath, Bpath);
    var a = files.listDir(path, function(name) {
        return name.endsWith(".jpg") || name.endsWith(".png") || files.isDir(files.join(path, name));
    }).sort();
    i = dialogs.select(path, a);
    if (i + 1) {
        path = files.join(path, a[i]);
        if (files.isDir(path)) {
            return listpath(Apath, files.join(Bpath, a[i]));
        } else {
            if (dialogs.confirm("确定文件？", a[i])) {
                return path;
            } else {
                return listpath(Apath, Bpath);
            }
        }
    } else {
        var ary = Bpath.split("/");
        if (ary.length && Bpath.length) {
            ary.pop();
            return listpath(Apath, ary.join("/"));
        }
    }
};

function getsd(s, ary) {
    var sum = weiyi(ary);
    var S = (s / sum) || 0;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};

function weiyi(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

function kdfx(Y) {
    var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
    var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
    return [x, y];
};

function ydfx(ary) {
    var ary = getsd(1, ary);
    var x = ary[0],
        y = ary[1];
    var Y = Math.asin(y) / (2 * Math.PI) * 360;
    if (x < 0) {
        Y = 180 - Y;
    };
    return Y;
};

function Disassembly(A) {
    log(typeof(A) + " , " + A);
    switch (typeof(A)) {
        case "object":
            var ary = new Array;
            if (Array.isArray(A)) {
                for (var i in A) {
                    ary.push(Disassembly(A[i]));
                };
                return "[" + ary.join(",\n") + "]";
            } else {
                for (var i in A) {
                    ary.push(i + ":" + Disassembly(A[i]));
                };
                return "{" + ary.join(",\n") + "}";
            };
            break;
        case "function":
            return A.toString();
            break;
        case "string":
            return "\"" + A.toString() + "\"";
            break;
        case "number":
            return A.toString();
            break;
        case "boolean":
            return A.toString();
            break;
        default:
            return String(A);
    };
};


脚本备份();

function 脚本备份(path) {
    path = path || "/sdcard/备份脚本";
    var file = new java.io.File(path);
    var fromfile = String(engines.myEngine().getSource());
    var filename = new java.io.File(fromfile).getName();
    if (!file.isDirectory()) {
        if (!file.mkdirs()) {
            log("夹失败");
        };
    };
    var txt = files.read(fromfile);
    files.write(files.join(path, filename), txt);
};