"ui";


ui.layout(
    <vertical bg="#ff0000">
        <canvas id="board" layout_weight="1"/>
    </vertical>
);


threads.start(function() {
    //console.show();

});




var W = 2000;

var rainbowColor = [-65536, -23296, -256, -16711936, -16744449, -16776961, -7667457];;

var paint = new Paint();
//paint.setColor(colors.WHITE);
//paint.setColor(colors.BLACK);
paint.setARGB(255, 255, 0, 0);
paint.setStrokeWidth(5);
paint.setStyle(Paint.Style.STROKE);
//paint.setStrokeCap(Paint.Cap.ROUND);
//paint.setShader(new android.graphics.RadialGradient(0,200,50,200,colors.RED,colors.GREEN,android.graphics.Shader.TileMode.REPEAT));
var paint1 = new Paint();
//paint1.setColor(colors.BLACK);
paint1.setARGB(255, 127, 127, 127);
paint1.setStrokeWidth(5)
paint1.setStrokeCap(Paint.Cap.ROUND);
//paint1.setShader(new android.graphics.RadialGradient(0,200,50,200,colors.RED,colors.GREEN,android.graphics.Shader.TileMode.REPEAT));
//paint1.setXfermode(new android.graphics.PorterDuffXfermode(android.graphics.PorterDuff.Mode.XOR));
var mbitmap = android.graphics.Bitmap.createBitmap(W, W, android.graphics.Bitmap.Config.ARGB_8888);

var mcanvas = new Canvas(mbitmap);
mcanvas.drawRect(0, 0, W, W, paint);
threads.start(function() {
    try {
        drawRect(mcanvas, W / 2 - W / 16, W / 2 + W / 3, W / 2 + W / 16, W / 2 + W / 3, 10, paint);
    } catch (e) {
        toastLog(e);
    };

});


var ASX = new XYToMatrix(null, 4);

//ui.board.setMaxFps(60);
ui.board.on("draw", function(canvas) {
    let w = canvas.getWidth();
    let h = canvas.getHeight();
    //canvas.translate(w/2,h/2);
    let matrix = canvas.getMatrix();
    //绘制背景色
    canvas.drawColor(colors.BLACK);
    //canvas.drawARGB(255, 127, 127, 127);
    matrix.setRectToRect(new android.graphics.RectF(0, 0, W, W), new android.graphics.RectF(0, 0, w, h), android.graphics.Matrix.ScaleToFit.CENTER);
    matrix.postConcat(ASX.matrix);
    canvas.setMatrix(matrix);
    //paint.setColor(rainbowColor[random(0,rainbowColor.length-1)]);
    canvas.drawBitmap(mbitmap, 0, 0, paint);


});


ui.board.setOnTouchListener(ASX.touchListener);

function drawRect(canvas, x1, y1, x2, y2, C, paint) {
    canvas.drawLine(x1, y1, x2, y2, paint);
    if (C <= 0) {
        return
    };
    C = C || 10;
    //正方形;
    let s = weiyi([x2 - x1, y2 - y1]);
    let R = xyToR(x2 - x1, y2 - y1);
    let xy_ary = RToxy(R - Math.PI / 2);
    let sxy_ary = getsd(s, xy_ary);

    let X1 = x1 + sxy_ary[0];
    let Y1 = y1 + sxy_ary[1];
    let X2 = x2 + sxy_ary[0];
    let Y2 = y2 + sxy_ary[1];
    paint.setStrokeWidth(s / 30);
    paint.setColor(rainbowColor[C % rainbowColor.length]);
    canvas.drawLines([x1, y1, X1, Y1, X1, Y1, X2, Y2, X2, Y2, x2, y2], paint);
    sleep(10);
    drawTriangle(canvas, X1, Y1, X2, Y2, C, paint);
};


function drawTriangle(canvas, x1, y1, x2, y2, C, paint) {
    if (C <= 0) {
        return
    };
    C = C || 10;
    let a = 3,
        b = 4;
    let s = weiyi([x2 - x1, y2 - y1]);
    //距离
    let R = xyToR(x2 - x1, y2 - y1);
    //方向
    let sxy_ary = getsd(s / (a + b * b / a) * a, [x2 - x1, y2 - y1]);
    //中间点向距
    let cx = x1 + sxy_ary[0];
    let cy = y1 + sxy_ary[1];
    //中间点

    let xy_ary = RToxy(R - Math.PI / 2);
    //垂直方向
    let cxy_ary = getsd(s / (a + b * b / a) * b, xy_ary);
    let ctx = cx + cxy_ary[0];
    let cty = cy + cxy_ary[1];
    canvas.drawLines([x1, y1, ctx, cty, ctx, cty, x2, y2], paint);
    //sleep(100);
    drawRect(canvas, x1, y1, ctx, cty, C - 1, paint);
    //sleep(200);
    drawRect(canvas, ctx, cty, x2, y2, C - 1, paint);
};







function RToxy(R) {
    var x = Math.cos(R);
    var y = Math.sin(R);
    return [x, y];
};

function xyToR(x, y) {
    var ary = getsd(1, [x, y]);
    x = ary[0],
        y = ary[1];
    var R = Math.asin(y);
    if (x < 0) {
        R = Math.PI - R;
    };
    return R;
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

function getsd(s, ary) {
    var sum = weiyi(ary);
    var S = s / sum;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
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




function XYToMatrix(matrix, maxPoints) {
    this.matrix = matrix || new android.graphics.Matrix;
    this.invertMatrix = new android.graphics.Matrix;
    this.matrix.invert(this.invertMatrix);
    this.getScaling = function(ary) {
        ary = Array.isArray(ary) ? ary : [0, 0, 100, 100];
        try {
            var Ary = this.matrixPoints(this.matrix, ary);
            return this.weiyi([Ary[2] - Ary[0], Ary[3] - Ary[1]]) / this.weiyi(ary);
        } catch (e) {
            toastLog(e);
        };
    };
    this.maxPoints = maxPoints || 2;
    this.maxPointsListener = () => {};
    this.Touch = {
        Matrix: this.matrix,
        PointStart: new Array,
        PointCurrent: new Array,

    };
    this.touchListener = new android.view.View.OnTouchListener((view, event) => {
        try {
            var W = view.getWidth();
            var H = view.getHeight();
            var PC = event.getPointerCount();
            switch (event.getActionMasked()) {
                case event.ACTION_MOVE:
                    try {
                        for (let i = 0; i < PC; i++) {
                            let id = event.getPointerId(i);
                            let x = event.getX(i);
                            let y = event.getY(i);
                            this.Touch.PointCurrent[i * 2] = x;
                            this.Touch.PointCurrent[i * 2 + 1] = y;
                        };

                        //记录当前各手指坐标信息。
                        if (PC > this.maxPoints) { //手指数大于4个虽然记录坐标信息，但是不进行矩阵操作。
                            this.maxPointsListener(view, event);
                            break;
                        };

                        var Matrix = new android.graphics.Matrix();
                        Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                        this.matrix = new android.graphics.Matrix();
                        this.matrix.setConcat(Matrix, this.Touch.Matrix);
                        //进行矩阵运算并刷新矩阵。
                        this.matrix.invert(this.invertMatrix);
                        //反矩阵
                    } catch (e) {
                        throw "MOVE " + e;
                    };


                    break;
                case event.ACTION_CANCEL:
                    //log("CANCEL");
                    this.Touch.PointStart = new Array;
                    this.Touch.PointCurrent = new Array;

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
                            try {
                                log("down");
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                this.Touch.Matrix = this.matrix;
                                //log(this.Touch.Matrix);
                            } catch (e) {
                                throw "DOWN " + e;
                            };
                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            log("up");
                            this.Touch.PointStart = new Array;
                            this.Touch.PointCurrent = new Array;

                            break;
                        case event.ACTION_POINTER_DOWN:
                            log("POINTER_DOWN");
                            try {
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                //获取点的总数量。
                                this.Touch.Matrix = this.matrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                //保存坐标的数组。
                                if (PC > this.maxPoints) { //手指数大于4个化为原始矩阵虽然记录坐标信息，但是不进行矩阵操作。
                                    this.maxPointsListener(view, event);
                                    break;
                                };

                                var Matrix = new android.graphics.Matrix();
                                Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                                this.matrix = new android.graphics.Matrix();
                                this.matrix.setConcat(Matrix, this.Touch.Matrix);
                                //进行矩阵运算并刷新矩阵。
                                this.matrix.invert(this.invertMatrix);
                                //反矩阵
                            } catch (e) {
                                throw "P_DOWN " + e;
                            };

                            break;
                        case event.ACTION_POINTER_UP:
                            log("POINTER_UP");
                            try {
                                this.Touch.Matrix = this.matrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                this.Touch.PointStart.splice(I * 2, 2);
                                this.Touch.PointCurrent.splice(I * 2, 2);

                            } catch (e) {
                                throw "P_UP " + e;
                            };
                            break;
                    };
            };
        } catch (e) {
            throw "imgTouch: " + e;
        };

        return true;

    });

    this.matrixPoints = function(matrix, ary) {
        //通过矩阵运算坐标数组。但是需要转换为浮点数组。
        var ary = this.toJavaArray("float", ary);
        matrix.mapPoints(ary);
        return this.toJsArray(ary);
    };
    this.toJavaArray = function(type, ary) {
        //var Ary = java.lang.reflect.Array.newInstance(		java.lang.Float.TYPE, 4);
        var Ary = util.java.array(type, ary.length);
        for (let i in ary) {
            Ary[i] = ary[i];
        };
        return Ary;
    };
    this.toJsArray = function(ary) {
        var Ary = new Array(ary.length);
        for (let i in ary) {
            Ary[i] = ary[i];
        };
        return Ary;
    };
    this.getsd = (s, ary) => {
        var sum = this.weiyi(ary);
        var S = (s / sum) || 0;
        for (var i = 0; i < ary.length; i++) {
            ary[i] = ary[i] * S;
        };
        return ary;
    };
    this.weiyi = function(ary) {
        var sum = 0;
        for (var i = 0; i < ary.length; i++) {
            sum += Math.pow(ary[i], 2);
        };
        return Math.sqrt(sum);
    };
    this.kdfx = function(Y) {
        var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
        var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
        return [x, y];
    };
    this.ydfx = (ary) => {
        var ary = this.getsd(1, ary);
        var x = ary[0],
            y = ary[1];
        var Y = Math.asin(y) / (2 * Math.PI) * 360;
        if (x < 0) {
            Y = 180 - Y;
        };
        return Y;
    };


};