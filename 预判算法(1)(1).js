"ui";
ui.layout(
    <vertical>
        <canvas id="canvas"/>
    </vertical>
);

threads.start(function() {
    console.show();
});

new canvasDraw(ui.canvas);

function canvasDraw(canvasView) {
    this.paint = new Paint;
    //this.paint.setTextAlign(Paint.Align.CENTER);
    this.paint.setStrokeWidth(5);
    this.paint.setStyle(Paint.Style.STROKE);
    this.paint.setARGB(255, 0, 0, 0);
    this.paint.setTextSize(75);

    //new android.graphics.RectF


    canvasView.on("draw", (canvas) => {
        canvas.drawARGB(255, 127, 127, 127);
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        var AX = w / 2;
        var AY = h / 10;
        this.paint.setStyle(Paint.Style.FILL);
        canvas.drawCircle(AX, AY, 10, this.paint);
        this.paint.setStyle(Paint.Style.STROKE);
        canvas.drawCircle(AX, AY, 100, this.paint);
        canvas.drawText(String("B"), AX, AY, this.paint);

        if (this.TouchPointStart.length) {

            for (let i = 0; i < this.TouchPointStart.length; i += 2) {
                let X = this.TouchPointStart[i];
                let Y = this.TouchPointStart[i + 1];
                let x = this.TouchPointCurrent[i];
                let y = this.TouchPointCurrent[i + 1];
                let a = X - (x - X);
                let b = Y - (y - Y);
                canvas.drawLine(X, Y, x, y, this.paint);
                canvas.drawLine(X, Y, a, b, this.paint);
                canvas.drawText(String("A"), X, Y, this.paint)
                canvas.drawCircle(X, Y, 10, this.paint);
                canvas.drawCircle(x, y, 10, this.paint);
                canvas.drawCircle(a, b, 10, this.paint);
            };
            if (this.SP.length) {
                canvas.drawCircle(this.CC.ox, this.CC.oy, this.CC.r, this.paint);
                canvas.drawCircle(this.CC.ox, this.CC.oy, 10, this.paint);
                canvas.drawText(String("O"), this.CC.ox, this.CC.oy, this.paint);
                canvas.drawText(String(this.SP.length / 2), w / 2, h / 4, this.paint);
                for (var i = 0; i < this.SP.length; i += 2) {
                    var x = this.SP[i];
                    var y = this.SP[i + 1];
                    canvas.drawLine(AX, AY, x, y, this.paint);
                    canvas.drawCircle(x, y, 10, this.paint);
                    canvas.drawText(String("C"), x, y, this.paint);
                };

            };
        };

        canvas.drawText(String(this.LL), w / 2, h / 5, this.paint);
    });

    this.TouchPointStart = new Array;
    this.TouchPointCurrent = new Array;
    this.CC = {
        ox: 0,
        oy: 0,
        r: 0,
    };
    this.SP = new Array;
    this.LL;
    this.V1 = 2;
    this.V2 = 10;
    this.VC = this.V1 / (this.V2 - this.V1);
    this.V1S = this.V1 / (this.V1 + this.V2);
    this.V2S = this.V2 / (this.V1 + this.V2);


    canvasView.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
        try {
            var W = view.getWidth();
            var H = view.getHeight();
            var PC = event.getPointerCount();
            switch (event.getActionMasked()) {
                case event.ACTION_MOVE:
                    for (let i = 0; i < PC; i++) {
                        let id = event.getPointerId(i);
                        let X = event.getX(i);
                        let Y = event.getY(i);
                        this.TouchPointCurrent[i * 2] = X;
                        this.TouchPointCurrent[i * 2 + 1] = Y;
                    };
                    var BX = W / 2;
                    var BY = H / 10;
                    var AX = this.TouchPointStart[0];
                    var AY = this.TouchPointStart[1];
                    var CX = this.TouchPointCurrent[0];
                    var CY = this.TouchPointCurrent[1];

                    var S = this.weiyi([AX - BX, AY - BY]);
                    var S0 = this.VC * S;
                    var S1 = this.V1S * S;
                    var S2 = this.V2S * S;
                    var R = (S0 + S1) / 2;
                    var OB = R + S2;
                    var O_ary = this.getsd(OB, [AX - BX, AY - BY]);
                    var OX = BX + O_ary[0];
                    var OY = BY + O_ary[1];
                    var AB_ary = this.XYTOAB(AX, AY, CX, CY);
                    this.LL = [Math.round(AB_ary[0] * 100) / 100, Math.round(AB_ary[1] * 100) / 100];
                    //log(OX,OB,R);
                    this.CC = {
                        ox: OX,
                        oy: OY,
                        r: R,
                    };
                    this.SP = this.SolvePos(OX, OY, R, AB_ary[0], AB_ary[1]);


                    break;
                case event.ACTION_CANCEL:
                    log("CANCEL");
                    this.TouchPointStart = new Array;
                    this.TouchPointCurrent = new Array;

                    break;
                case event.ACTION_OUTSIDE:
                    log("OUTSIDE");

                    break;
                default:
                    var I = Math.floor(event.getAction() / 256);
                    var ID = event.getPointerId(I);
                    var X = event.getX(I);
                    var Y = event.getY(I);
                    switch (event.getActionMasked()) {
                        case event.ACTION_DOWN:
                            //第一个手指按下。
                            log("down");
                            this.TouchPointStart.splice(I * 2, 0, X, Y);
                            this.TouchPointCurrent.splice(I * 2, 0, X, Y);
                            this.CC = {
                                ox: X,
                                oy: Y,
                                r: 0,
                            };

                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            log("up");
                            this.TouchPointStart = new Array;
                            this.TouchPointCurrent = new Array;
                            this.SP = new Array;

                            break;
                        case event.ACTION_POINTER_DOWN:
                            log("POINTER_DOWN");
                            this.TouchPointStart.splice(I * 2, 0, X, Y);
                            this.TouchPointCurrent.splice(I * 2, 0, X, Y);


                            break;
                        case event.ACTION_POINTER_UP:
                            log("POINTER_UP");
                            this.TouchPointStart.splice(I * 2, 2);
                            this.TouchPointCurrent.splice(I * 2, 2);

                            break;
                    };
            };
        } catch (e) {
            log("0: " + e);

        };

        return true;
    }));


    this.反色 = function(color) {
        return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
    };

    this.toJavaArray = function(type, ary) {
        //var Ary = java.lang.reflect.Array.newInstance(		java.lang.Float.TYPE, 4);
        var Ary = util.java.array(type, ary.length);
        for (let i in ary) {
            Ary[i] = ary[i];
        };
        return Ary;
    };

    this.SolvePos = function(a, b, r, k, c) {
        let a1 = k * k + 1;
        let b1 = 2 * k * (c - b) - 2 * a;
        let c1 = a * a + (c - b) * (c - b) - r * r;
        let delta = b1 * b1 - 4 * a1 * c1;
        let result = [];
        if (delta == 0) {
            let x0 = Math.sqrt(delta);
            let x1 = -b1 / (2 * a1);
            let y1 = k * x1 + c;
            result.push(x1, y1);
        } else if (delta > 0) {
            let x0 = Math.sqrt(delta);
            let x1 = (-b1 - x0) / (2 * a1);
            let y1 = k * x1 + c;
            result.push(x1, y1);
            let x2 = (-b1 + x0) / (2 * a1);
            let y2 = k * x2 + c;
            result.push(x2, y2);
        }
        return result;
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
        return {
            x: x,
            y: y
        };
    };

    this.ydfx = function(obj) {
        var ary = this.getsd(1, [obj.x, obj.y]);
        var x = ary[0],
            y = ary[1];
        var Y = Math.asin(y) / (2 * Math.PI) * 360;
        if (x < 0) {
            Y = 180 - Y;
        };
        return Y;
    };

    this.getsd = function(s, ary) {
        var sum = this.weiyi(ary);
        var S = s / sum;
        for (var i = 0; i < ary.length; i++) {
            ary[i] = ary[i] * S;
        };
        return ary;
    };

    this.XYTOAB = function(x, y, x1, y1) {
        var A = (y1 - y) / (x1 - x);
        var B = y - A * x;
        return [A, B];
    };



};




/*
int getPointerCount() //手势操作所包含的点的个数
int findPointerIndex(int pointerId) //根据pointerId找到pointer在MotionEvent中的index
int getPointerId(int pointerIndex) //根据MotionEvent中的index返回pointer的唯一标识
float getX(int pointerIndex) //返回手势操作点的x坐标
float getY(int pointerIndex) //返回手势操作点的y坐标
final int getActionMasked () //获取特殊点的action 
final int getActionIndex()//  用来获取当前按下／抬起的点的标识。如果当前没有任何点抬起／按下，该函数返回0。比如事件类型为ACTION_MOVE时，该值始终为0。

*/