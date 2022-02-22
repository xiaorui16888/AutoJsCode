"ui";
//ui布局为一块画布
ui.layout(
    <vertical>
        <canvas id="canvas" layout_weight="1"/>
        <horizontal h="auto"w="*">
            <vertical h="auto" layout_weight="1">
                <button id="but_A" layout_weight="1" h="auto" text="开头添加一点"/>
                <button id="but_B" layout_weight="1" h="auto" text="去掉开头一点"/>
            </vertical>
            <vertical h="auto" layout_weight="1">
                <button id="but_C" layout_weight="1" h="auto" text="末尾添加一点"/>
                <button id="but_D" layout_weight="1" h="auto" text="去掉末尾一点"/>
            </vertical>
        </horizontal>
    </vertical>
);


//画笔
var paint = new Paint();
//paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(5);
//paint.setStyle(Paint.Style.STROKE);
paint.setStyle(Paint.Style.FILL);
paint.setARGB(255, 255, 0, 0);
paint.setTextSize(75);
//android.graphics
var rainbowColor = [-65536, -23296, -256, -16711936, -16744449, -16776961, -7667457];

var storage = storages.create("曲线");
var pointsAry = [533.0925903320312,
    1274.8876953125,
    10.490286827087402,
    906.9931640625,
    919.14892578125,
    774.5621948242188,
    291.7298889160156,
    1186.8128662109375,
    771.2858276367188,
    1183.8489990234375,
    156.355224609375,
    782.0582275390625,
    1055.023193359375,
    901.0370483398438,
    539.50048828125,
    1276.30078125
];
pointsAry = storage.get("Bessel", pointsAry);
//log(pointsAry);

events.on("exit", function() {
    log("结束运行");
    storage.put("Bessel", pointsAry);
});



var path = new android.graphics.Path;
resetPath();

var D = 0;

function 计时() {
    if (D < 1) {
        D += 0.01;
    } else {
        D = 0;
        resetPath();
    };
};

function resetPath() {
    path = new android.graphics.Path;
    let length = pointsAry.length;
    if (length) {
        path.moveTo(pointsAry[0], pointsAry[1]);
    };
};


ui.but_A.click(function() {
    let length = pointsAry.length;
    if (length) {
        pointsAry.unshift(pointsAry[0], pointsAry[1]);
    } else {
        let w = ui.canvas.getWidth();
        let h = ui.canvas.getHeight();
        pointsAry = [w / 2, h / 2];
    };
    log(pointsAry.length);
});
ui.but_B.click(function() {
    let length = pointsAry.length;
    pointsAry.splice(0, 2);
    log(pointsAry.length);
});

ui.but_C.click(function() {
    let length = pointsAry.length;
    if (length) {
        pointsAry.push(pointsAry[length - 2], pointsAry[length - 1]);
    } else {
        let w = ui.canvas.getWidth();
        let h = ui.canvas.getHeight();
        pointsAry = [w / 2, h / 2];
    };
    log(pointsAry.length);
});
ui.but_D.click(function() {
    let length = pointsAry.length;
    pointsAry.splice(length - 2, 2);
    log(pointsAry.length);
});




ui.canvas.on("draw", function(canvas) {
    canvas.drawARGB(255, 214,214,214);
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    //canvas.drawPoints(pointsAry,paint);
    paint.setStyle(Paint.Style.FILL);
    try {
        Curve(canvas, pointsAry, D, paint,path);
        //递归绘制
    } catch (e) {
        toastLog(e);
    };
    paint.setARGB(255, 0,0,0);
    paint.setStyle(Paint.Style.STROKE);
    canvas.drawPath(path, paint);
    计时();
});




var TouchPoint = {
    isTouch: false,
    TouchId: 0,
    point: 0,
};

ui.canvas.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
    try {
        var W = view.getWidth();
        var H = view.getHeight();
        var PC = event.getPointerCount();
        switch (event.getActionMasked()) {
            case event.ACTION_MOVE:
                if (TouchPoint.isTouch) {
                    for (let i = 0; i < PC; i++) {
                        let id = event.getPointerId(i);
                        let X = event.getX(i);
                        let Y = event.getY(i);
                        if (id == TouchPoint.TouchId) {
                            pointsAry[TouchPoint.point] = X;
                            pointsAry[TouchPoint.point + 1] = Y;
                        };
                    };
                };


                break;
            case event.ACTION_CANCEL:
                //log("CANCEL");
                TouchPoint.isTouch = false;

                break;
            case event.ACTION_OUTSIDE:
                //log("OUTSIDE");

                break;
            default:
                var I = Math.floor(event.getAction() / 256);
                var ID = event.getPointerId(I);
                var X = event.getX(I);
                var Y = event.getY(I);
                switch (event.getActionMasked()) {
                    case event.ACTION_DOWN:
                        //第一个手指按下。
                        //log("down");
                        let length = pointsAry.length;
                        for (let i = 0; i < length; i += 2) {
                            let x = pointsAry[length - 2 - i];
                            let y = pointsAry[length - 1 - i];
                            if (weiyi([X - x, Y - y]) <= 50) {
                                TouchPoint.isTouch = true;
                                TouchPoint.point = length - 2 - i;
                                TouchPoint.TouchId = ID;
                                break;
                            };
                        };




                        break;
                    case event.ACTION_UP:
                        //最后一个手指抬起。
                        //log("up");
                        TouchPoint.isTouch = false;

                        break;
                    case event.ACTION_POINTER_DOWN:
                        //log("POINTER_DOWN");

                        break;
                    case event.ACTION_POINTER_UP:
                        //log("POINTER_UP");
                        break;
                };
        };
    } catch (e) {
        log("0: " + e);

    };

    return true;
}));





function Curve(canvas, pointsAry, D, paint,path, C) {
    C = C || 0;
    var Ary = new Array;
    //paint.setARGB(255, 0, 214, 0);
    paint.setColor(rainbowColor[Math.floor(C % 7)]);
    for (let i = 2; i < pointsAry.length; i += 2) {
        let x = pointsAry[i - 2];
        let y = pointsAry[i + 1 - 2];
        let x1 = pointsAry[i];
        let y1 = pointsAry[i + 1];
        let S = weiyi([x1 - x, y1 - y]);
        let sd = getsd(S * D, [x1 - x, y1 - y]);
        Ary.push(x + sd[0], y + sd[1]);
        canvas.drawLine(x, y, x1, y1, paint);
    };
    paint.setARGB(255, 255,255,255);
    for (let i = 0; i < pointsAry.length; i += 2) {
        let x = pointsAry[i];
        let y = pointsAry[i + 1];
        canvas.drawCircle(x, y, 10, paint);
    };
    if (Ary.length) {
        arguments.callee(canvas, Ary, D, paint,path, C + 1);
    } else {
        let length = pointsAry.length;
        if (length) {
            path.lineTo(pointsAry[0], pointsAry[1]);
        };
    };
};





function getsd(s, ary) {
    var sum = this.weiyi(ary);
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
    var ary = this.getsd(1, ary);
    var x = ary[0],
        y = ary[1];
    var Y = Math.asin(y) / (2 * Math.PI) * 360;
    if (x < 0) {
        Y = 180 - Y;
    };
    return Y;
};
//    canvas.drawCircle(w/2+B2[0],h/2+B2[1],200*Math.sqrt(3),paint);