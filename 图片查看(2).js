"ui";
ui.layout(
    <vertical>
        <frame layout_weight="1">
            <canvas id="canvas"/>
            <list id="list" w="90dp" h="*" bg="#346489" layout_gravity="right">
                <text w="*" h="50" text="{{text}}" textSize="16sp" bg="#dddddd" margin="5" gravity="center"/>
            </list>
        </frame>
        <horizontal>
        <button id="but" text="复制信息"/>
        <button id="center" layout_weight="1" text="菜单"/>
        </horizontal>
    </vertical>
);

ui.list.setVisibility(8);

var listAry = [{
    text: "灰度化"
}, {
    text: "二值化"
}, {
    text: "自适应二值化"
}, {
    text: "RGB转HSV"
}, {
    text: "模糊"
}, {
    text: "中值滤波"
}, {
    text: "高斯模糊"
}, {
    text: "原图"
}];

ui.list.setDataSource(listAry);

//var storage = storages.create("找英雄略图");
//var IMG = 加载图片(storage.get("path", "./img/rect_2.jpg"));

var IMG;
var thread = threads.start(function() {
    var url = "https://www.autojs.org/assets/uploads/files/1540386817060-918021-20160416200702191-185324559.jpg";
    IMG = images.load(url);
});
thread.join();

var img = images.copy(IMG);
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

//启动一个处理图片的线程
var imgProcess = threads.start(function() {
    setInterval(() => {}, 1000);
});

//处理图片的函数，把任务交给图片处理线程处理
function processImg(process) {
    imgProcess.setTimeout(() => {
        try {
            //处理图片
            var result = process(IMG);
            toastLog("OK");
            //把处理后的图片设置到图片控件中
            img = images.copy(result);
            result.recycle();
        } catch (e) {
            toastLog(e)
        };
    }, 0);
}


ui.list.on("item_click", function(item, i) {
    ui.run(() => {
        ui.list.setVisibility(8);
    });
    switch (item.text) {
        case "灰度化":
            processImg(img => {
                //灰度化
                return images.grayscale(img);
            });
            break;
        case "二值化":
            processImg(img => {
                var g = images.grayscale(img);
                //二值化，取灰度为30到200之间的图片
                var result = images.threshold(g, 100, 200);
                g.recycle();
                return result;
            });
            break;
        case "自适应二值化":

            processImg(img => {
                var g = images.grayscale(img);
                //自适应二值化，最大值为200，块大小为25
                var result = images.adaptiveThreshold(g, 200, "MEAN_C", "BINARY", 25, 10);
                g.recycle();
                return result;
            });
            break;
        case "RGB转HSV":

            processImg(img => {
                //RGB转HSV
                return images.cvtColor(img, "BGR2HSV");
            });
            break;
        case "模糊":

            processImg(img => {
                //模糊
                return images.blur(img, [10, 10]);
            });
            break;
        case "中值滤波":

            processImg(img => {
                //中值滤波
                return images.medianBlur(img, 5);
            });
            break;
        case "高斯模糊":

            processImg(img => {
                //高斯模糊
                return images.gaussianBlur(img, [5, 5]);
            });
            break;
        case "原图":
            processImg(img => {
                //高斯模糊
                return images.copy(img);
            });
            break;
    };
});

ui.but.click(function(v) {
    setClip(JSON.stringify(点色));
    toast("已复制\n"+JSON.stringify(点色));
});


ui.center.click(function(v) {
    if (ui.list.visibility == 8) {
        ui.run(() => {
            ui.list.setVisibility(0);
        });
    } else {
        ui.run(() => {
            ui.list.setVisibility(8);
        });

    };
});

var 点色;
ui.canvas.on("draw", function(canvas) {
    canvas.drawARGB(255, 127, 127, 127);
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    paint.setStrokeWidth(5);
    paint.setStyle(Paint.Style.STROKE);
    var matrix = new android.graphics.Matrix();
    matrix.postRotate(data.rotate);
    matrix.postScale(data.scale, data.scale);
    matrix.postTranslate(data.translate.x, data.translate.y);
    paint.setARGB(255, 0, 0, 0);
    canvas.drawImage(img, matrix, paint);
    paint.setStrokeWidth(2);
    paint.setStyle(Paint.Style.FILL);
    var size = 50;
    paint.setTextSize(size);
    paint.setARGB(255, 255, 0, 0);
    canvas.drawText(String(Math.floor(device.width / data.scale)), w / 2, h * 0.1 + 0.365 * size, paint);
    var S = 算坐标(w / 2, h / 2, data, img);
    点色 = S;
    paint.setStyle(Paint.Style.STROKE);
    paint.setColor(S.color);
    paint.setStrokeWidth(15);
    canvas.drawCircle(w / 2, h / 2, 41, paint);
    paint.setColor(反色(S.color));
    paint.setStrokeWidth(5);
    canvas.drawCircle(w / 2, h / 2, 50, paint);
    var S1 = 算坐标(w / 2, h / 2 - 100, data, img);
    var S2 = 算坐标(w / 2, h / 2 + 100 - 12.5, data, img);
    var S3 = 算坐标(w / 2, h / 2 + 100 + 12.5, data, img);
    //canvas.setMatrix(new android.graphics.Matrix());
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
    try {
        var X = X - data.translate.x,
            Y = Y - data.translate.y;
        var WE = weiyi([X, Y]);
        //log(WE);
        var YY = ydfx([X, Y]);
        //log(YY);
        var KY = YY - data.rotate;
        var KK = kdfx(KY);
        //log(KK);
        var SS = getsd(WE / data.scale, KK);
        //log(SS);
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
    } catch (e) {
        return {
            x: 0,
            y: 0,
            color: 0,
            colorString: "0"
        };
    };
};

function 反色(color) {
    return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};

var Touch = new Array;
var TouchData = new Array;
ui.canvas.setOnTouchListener(function(view, event) {
    try {
        switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
            case event.ACTION_DOWN:
                var i = Math.floor(event.getAction() / 256);
                var id = event.getPointerId(i);
                var X = event.getX(i);
                var Y = event.getY(i);
                if (!id) {
                    bitmap = android.graphics.Bitmap.createBitmap(view.getWidth(), view.getHeight(), android.graphics.Bitmap.Config.ARGB_8888);
                    canvas = new android.graphics.Canvas(bitmap);
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
                var PC = event.getPointerCount();
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
                break;
        };
        return true;
    } catch (e) {
        toastLog("Touch: " + e);
        return true;
    };
});


/*
window.butJ.click(() => {
    threads.start(function() {
        var X=window.getX(),Y=window.getY();
        window.setPosition(device.width, device.height);
        sleep(100);
        var IMG = 截图();
        img = images.copy(IMG);
        window.setPosition(X,Y);
    });
});

*/




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


function windowGXY(x, y, k) {
    x = (k[0][0] < x && x < k[1][0]) ? x : (k[0][0] < x ? k[1][0] : k[0][0]);
    y = (k[0][1] < y && y < k[1][1]) ? y : (k[0][1] < y ? k[1][1] : k[0][1]);
    return {
        x: x,
        y: y
    };
};

function deepCopy(obj) {
    if (typeof obj != 'object') {
        return obj;
    }
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = deepCopy(obj[attr]);
    }
    return newobj;
};