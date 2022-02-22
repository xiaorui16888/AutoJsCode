"ui";
ui.layout(
    <vertical>
        <canvas id="canvas"/>
    </vertical>
);

threads.start(function() {
    //console.show();
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
        var AY = h / 2;
        this.paint.setStyle(Paint.Style.STROKE);

        if (this.TouchPointStart.length) {

            for (let i = 0; i < this.TouchPointStart.length; i += 2) {
                let X = this.TouchPointStart[i];
                let Y = this.TouchPointStart[i + 1];
                let x = this.TouchPointCurrent[i];
                let y = this.TouchPointCurrent[i + 1];
                X = X || 0;
                Y = Y || 0;
                x = x || 0;
                y = y || 0;
                let a = X - (x - X);
                let b = Y - (y - Y);
                canvas.drawLine(X, Y, x, y, this.paint);
                //canvas.drawLine(X, Y, a, b, this.paint);
                canvas.drawText(String("A"), X, Y, this.paint)
                canvas.drawText(String("B"), x, y, this.paint);
                canvas.drawCircle(X, Y, 10, this.paint);
                canvas.drawCircle(x, y, 10, this.paint);
                //canvas.drawCircle(a, b, 10, this.paint);
            };
            if (this.TouchResult.length) {
                for (let i = 0; i < this.TouchResult.length; i++) {
                    var obj = this.TouchResult[i];
                    var obj1 = this.TouchResult[i - 1];
                    var X = this.TouchPointStart[(i - 1) * 2];
                    var Y = this.TouchPointStart[(i - 1) * 2 + 1];
                    X = X || 0;
                    Y = Y || 0;
                    canvas.drawCircle(obj.ox, obj.oy, obj.r, this.paint);
                    canvas.drawCircle(obj.ox, obj.oy, 10, this.paint);
                    canvas.drawText(String("O"), obj.ox, obj.oy, this.paint);
                    let SP = obj.pos;
                    for (let i = 0; i < SP.length; i += 2) {
                        let x = SP[i];
                        let y = SP[i + 1];
                        canvas.drawLine(X, Y, x, y, this.paint);
                        canvas.drawCircle(x, y, 10, this.paint);
                        canvas.drawText(String("C"), x, y, this.paint);
                    };
                };

            };
        };

        canvas.drawText("", w / 2, h / 5, this.paint);
    });

    this.TouchPointStart = new Array;
    this.TouchPointCurrent = new Array;
    this.TouchResult = new Array;





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

                        let AX = this.TouchPointStart[i * 2];
                        let AY = this.TouchPointStart[i * 2 + 1];
                        let BX = this.TouchPointStart[(i - 1) * 2] || AX;
                        let BY = this.TouchPointStart[(i - 1) * 2 + 1] || AY;
                        //log(BX,BY);
                        //this.TouchResult[i] = 平面预判(BX, BY, AX, AY, this.weiyi([AX - BX, AY - BY]), this.weiyi([AX - X, AY - Y]), X - AX, Y - AY);
                        this.TouchResult[i] = 平面预判(BX, BY, AX, AY, 10,5, X - AX, Y - AY);
                    };


                    break;
                case event.ACTION_CANCEL:
                    //log("CANCEL");
                    this.TouchPointStart = new Array;
                    this.TouchPointCurrent = new Array;

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
                            this.TouchPointStart.splice(I * 2, 0, X, Y);
                            this.TouchPointCurrent.splice(I * 2, 0, X, Y);

                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            //log("up");
                            this.TouchPointStart = new Array;
                            this.TouchPointCurrent = new Array;
                            this.TouchResult = new Array;

                            break;
                        case event.ACTION_POINTER_DOWN:
                            //log("POINTER_DOWN");
                            this.TouchPointStart.splice(I * 2, 0, X, Y);
                            this.TouchPointCurrent.splice(I * 2, 0, X, Y);


                            break;
                        case event.ACTION_POINTER_UP:
                            //log("POINTER_UP");
                            this.TouchPointStart.splice(I * 2, 2);
                            this.TouchPointCurrent.splice(I * 2, 2);
                            this.TouchResult.splice(I, 1);

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


function 平面预判(x1, y1, x2, y2, v1, v2, fx, fy) {
    //1号追击2号，已知2号的方向f和两者的速度。
    //求两者相遇的位置。


    let V1 = v1;
    let V2 = v2;
    let VC = V2 / (V1 - V2);
    let V1S = V1 / (V2 + V1);
    let V2S = V2 / (V2 + V1);


    let S = weiyi([x2 - x1, y2 - y1]);
    let S0 = VC * S;
    let S1 = V1S * S;
    let S2 = V2S * S;
    let R = (S0 + S2) / 2;
    let OB = R + S1;
    let O_ary = getsd(OB, [x2 - x1, y2 - y1]);
    let OX = x1 + O_ary[0];
    let OY = y1 + O_ary[1];
    let AB_ary = XYTOAB(x2, y2, fx, fy);

    let pos_ary = SolvePos(OX, OY, R, AB_ary[0], AB_ary[1]);




    return {
        ox: OX,
        oy: OY,
        r: R,
        pos: pos_ary
    };

    function isOKxy(x, y) {
        if (fx != 0 && (x - x2) / fx > 0 && fy != 0 && (y - y2) / fy > 0) {
            return true;
        };
        return false;
    };


    function getsd(s, ary) {
        var sum = weiyi(ary);
        var S = s / sum;
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

    function XYTOAB(x, y, fx, fy) {
        var A = fy / fx;
        var B = y - A * x;
        return [A, B];
    };

    function SolvePos(a, b, r, k, c) {
        //圆与直线的交点
        //圆心坐标。a,b。半径r
        //直线表达方式为。y=kx+c;
        let a1 = k * k + 1;
        let b1 = 2 * k * (c - b) - 2 * a;
        let c1 = a * a + (c - b) * (c - b) - r * r;
        let delta = b1 * b1 - 4 * a1 * c1;
        let result = [];
        if (delta == 0) {
            let x0 = Math.sqrt(delta);
            let x1 = -b1 / (2 * a1);
            let y1 = k * x1 + c;
            if (isOKxy(x1, y1)) {
                result.push(x1, y1);
            };
        } else if (delta > 0) {
            let x0 = Math.sqrt(delta);
            let x1 = (-b1 - x0) / (2 * a1);
            let y1 = k * x1 + c;
            if (isOKxy(x1, y1)) {
                result.push(x1, y1);
            };
            let x2 = (-b1 + x0) / (2 * a1);
            let y2 = k * x2 + c;
            if (isOKxy(x2, y2)) {
                result.push(x2, y2);
            };
        }
        return result;
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