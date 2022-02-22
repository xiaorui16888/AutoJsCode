"ui";
importClass(android.content.pm.ActivityInfo);
importClass(android.view.WindowManager);

ui.layout(
    <frame>
        <canvas id="board" />
        <canvas id="board2" alpha="0.5" w="200" h="200" layout_gravity="left|bottom"/>
        <vertical alpha="0.5" w="90" h="180"  layout_gravity="right|bottom">
           <button id="but_up" alpha="0.5" w="90" h="90" text="前进" layout_gravity="center"/>
           <button id="but_down" alpha="0.5" w="90" h="90" text="前进" layout_gravity="center"/>
        </vertical>
    </frame>
);
ui.run(() => {
    //横屏
    activity.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN); //设置成全屏模式
    activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE); //强制为横屏
    /*
        //竖屏
        activity.getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);//设置成全屏模式
        activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);//竖屏
    */
});


var W = 128;

var paint = new Paint();
//paint.setColor(colors.WHITE);
//paint.setColor(colors.BLACK);
paint.setARGB(255, 64, 64, 64);
paint.setStrokeWidth(10);
paint.setTextSize(75);
//paint.setStyle(Paint.Style.STROKE);
//paint.setStrokeCap(Paint.Cap.ROUND);
//paint.setShader(new android.graphics.RadialGradient(0,200,50,200,colors.RED,colors.GREEN,android.graphics.Shader.TileMode.REPEAT));
var paint1 = new Paint();
//paint1.setColor(colors.BLACK);
paint1.setARGB(255, 0,255,0);
paint1.setStrokeWidth(5)
paint1.setStyle(Paint.Style.STROKE);
paint1.setStrokeCap(Paint.Cap.ROUND);
//paint1.setShader(new android.graphics.RadialGradient(0,200,50,200,colors.RED,colors.GREEN,android.graphics.Shader.TileMode.REPEAT));
//paint1.setXfermode(new android.graphics.PorterDuffXfermode(android.graphics.PorterDuff.Mode.XOR));
//var mbitmap = android.graphics.Bitmap.createBitmap(W, W, android.graphics.Bitmap.Config.ARGB_8888);

//var mcanvas = new Canvas(mbitmap);
var rainbowColor = [-65536, -23296, -256, -16711936, -16744449, -16776961, -7667457];

var xyz = [{ //x
    x: 0,
    y: 0,
    z: 0,
    x1: 10,
    y1: 0,
    z1: 0,
}, { //y
    x: 0,
    y: 0,
    z: 0,
    x1: 0,
    y1: 10,
    z1: 0,
}, { //z
    x: 0,
    y: 0,
    z: 0,
    x1: 0,
    y1: 0,
    z1: 10,
}];




var player = {
    x: 24,
    y: 5,
    z: 6,
    Y: 182, //平面360度。
    YW: 120,
    P: -9, //垂直90度。
    PW: 45
};


var Suum = 0;

ui.board.post(function(){
    let w=ui.board.getWidth();
    let h=ui.board.getHeight();
    player.YW=player.PW/h*w;
});


var ASX = new XYToMatrix(null, 4);



//{{{{{{{{{{{修改视角

//ui.board.setMaxFps(60);
ui.board.on("draw", function(canvas) {
    let w = canvas.getWidth();
    let h = canvas.getHeight();
    //canvas.translate(w / 2, h / 2);
    //let matrix = canvas.getMatrix();
    //绘制背景色
    //canvas.drawColor(colors.argb(25, 0, 0, 0));
    canvas.drawARGB(255, 127, 127, 127);
   // matrix.postConcat(ASX.matrix);
   // canvas.setMatrix(matrix);
    //paint.setColor(rainbowColor[random(0,rainbowColor.length-1)]);
    //canvas.drawBitmap(mbitmap, 0, 0, paint);


    //log(maxY, minY);
    let jij=0;
    for(let i in player){
    canvas.drawText(i+":" + round(1000, player[i]), 0, 75+jij*75, paint);
        jij++;
    };

    canvas.save();
    var mapCenX = w - 200,
        mapCenY = 200,
        mapScale = 10; //x向右y向前z向上
    paint.setARGB(255, 0, 255, 0);
    paint.setStrokeWidth(3 / mapScale);

    canvas.translate(mapCenX-player.x*mapScale, mapCenY-player.y*-mapScale);
    canvas.scale(mapScale, -mapScale);
    canvas.drawPoint(player.x, player.y, paint);

    var xy = getsd(10, kdfx(player.Y,0));
    canvas.drawLine(player.x, player.y, player.x + xy[0], player.y + xy[1], paint);
    var xy = getsd(20, kdfx(player.Y + player.YW / 2, 0));
    canvas.drawLine(player.x, player.y, player.x + xy[0], player.y + xy[1], paint);
    var xy = getsd(20, kdfx(player.Y - player.YW / 2, 0));
    canvas.drawLine(player.x, player.y, player.x + xy[0], player.y + xy[1], paint);

    paint.setARGB(255, 0, 0, 0);
    paint.setStrokeWidth(10 / mapScale);
    for (obj of xyz) {

    paint.setARGB(255, 0, 0, 255);
        canvas.drawLine(obj.x, obj.y,obj.x1, obj.y1, paint);
    paint.setARGB(255, 255, 0, 0);
        canvas.drawPoint(obj.x1, obj.y1, paint);

    };

    canvas.restore();
    canvas.save();
    canvas.translate(w/2,h/2);
    
    
    paint.setARGB(255, 0, 0, 0);

    paint.setStrokeWidth(10);
    
    
    var Yw1 = player.YW / 2;
    var Pw1 = player.PW / 2;

    var maxY = player.Y + 180;
    var minY = player.Y - 180;
    //log(maxY, minY);
    var maxP = player.P + 180;
    var minP = player.P - 180;


    for (obj of xyz) {
        var S = weiyi(obj.x - player.x, obj.y - player.y, obj.z - player.z);
        var YP = ydfx(obj.x - player.x, obj.y - player.y, obj.z - player.z);
        var Y = YP[0];
        var P = YP[1];

        while (Y >= maxY) {
            Y -= 360;
        };
        while (Y < minY) {
            Y += 360;
        };
        var Yl = (player.Y - Y) / player.YW;
        var Pl = (player.P - P) / player.PW;
        var bx = w * Yl;
        var by = h * Pl;
        
        var S1 = weiyi(obj.x1 - player.x, obj.y1 - player.y, obj.z1 - player.z);
        var YP1 = ydfx(obj.x1 - player.x, obj.y1 - player.y, obj.z1 - player.z);
        var Y1 = YP1[0];
        var P1 = YP1[1];

        while (Y1 >= maxY) {
            Y1 -= 360;
        };
        while (Y1 < minY) {
            Y1 += 360;
        };
        var Yl1 = (player.Y - Y1) / player.YW;
        var Pl1 = (player.P - P1) / player.PW;
        var bx1 = w * Yl1;
        var by1 = h * Pl1;
        //  log(bx);
        canvas.drawLine(bx,by,bx1,by1, paint);
        canvas.drawCircle(bx1, by1, 1000 / S, paint);
    };
    canvas.restore();


if(isToUp){
    player.z+=0.5;
};
if(isToDown){
    player.z-=0.5;
};



    paint.setARGB(255, 0, 0, 0);


    //canvas.drawText("当前分数" + Suum, w / 2, h / 10, paint);


});

var pYP;
var mLastX, mLastY;
ui.board.setOnTouchListener(new android.view.View.OnTouchListener({
    onTouch: function(view, event) {
        var x = event.getX();
        var y = event.getY();
        switch (event.getAction()) {
            case android.view.MotionEvent.ACTION_DOWN:
                mLastX = x;
                mLastY = y;
                pYP = {
                    Y: player.Y,
                    P: player.P
                };
                break;
            case android.view.MotionEvent.ACTION_MOVE:

                setPlayerYP(pYP.Y - (x - mLastX) / 5, pYP.P - (y - mLastY) / 5);
                break;
            case android.view.MotionEvent.ACTION_UP:
                setPlayerYP(pYP.Y - (x - mLastX) / 5, pYP.P - (y - mLastY) / 5);
                break;
        }
        return true;
    }
}));

function setPlayerYP(Yr, Pr) {
    while (Yr < 0) {
        Yr += 360;
    };
    while (Yr >= 360) {
        Yr -= 360;
    };
    player.Y = Yr;

    player.P = sinon(Pr, -90, 90);


};

function sinon(a, b, c) {
    return (a >= b && a <= c) ? a : (a >= b ? c : b);
};

//}}}}}}}}}



//{{{{{{{{{{{- xy坐标修改



ui.board2.on("draw",function(canvas){
    canvas.drawColor(android.graphics.Color.TRANSPARENT, android.graphics.PorterDuff.Mode.CLEAR);
    let w = canvas.getWidth();
    let h = canvas.getHeight();
     //paint1.setARGB(255, 0, 0, 0);
     canvas.drawRect(0,0,w,h,paint1);

    if (isTouch) {
        canvas.drawCircle(fx, fy, radius, paint1);
        canvas.drawCircle(fx, fy, radius1, paint1);
        canvas.drawLine(fx, fy, ex, ey, paint1);
        canvas.drawCircle(ex, ey, radius2, paint1);
        if (isMove) {
            let FY=ydfx(ex - fx, ey - fy,0);
            let xy=kdfx(-FY[0]+player.Y-90,0);
            xy = getsd(0.5, xy);
            player.x+=xy[0];
            player.y+=xy[1];
        };
    };
});




var isTouch = false;
var isMove = false;
var radius = 200;
var radius1 = 50;
var radius2 = 100;
var fx = 0,
    fy = 0;
var ex = 0,
    ey = 0;

ui.board2.setOnTouchListener(function(view, event) {
    var x = event.getX(),
        y = event.getY();

    switch (event.getAction()) {
        case event.ACTION_DOWN:
            fx = x;
            fy = y;
            ex = x;
            ey = y;

            isTouch = true;
            break;
        case event.ACTION_MOVE:
            ex = x;
            ey = y;

            if (weiyi_([ex - fx, ey - fy]) > radius1) {
                isMove = true;

                if (weiyi_([ex - fx, ey - fy]) > radius) {
                    var xy = getsd(radius, [fx - ex, fy - ey]);
                    fx = ex + xy[0];
                    fy = ey + xy[1];

                };

            } else {
                isMove = false;

            };

            break;
        case event.ACTION_UP:
            isTouch = false;
            isMove = false;
            break;

    };
    return true;
});


//}}}}}}}}}

//{{{{{{{{{{{z高



var isToUp = false;
ui.but_up.setOnTouchListener(new android.view.View.OnTouchListener({
    onTouch: function(view, event) {
        switch (event.getAction()) {
            case android.view.MotionEvent.ACTION_DOWN:
                isToUp = true;
                break;
            case android.view.MotionEvent.ACTION_MOVE:

                break;
            case android.view.MotionEvent.ACTION_UP:
                isToUp = false;
                break;
        }
        return true;
    }
}));
var isToDown = false;
ui.but_down.setOnTouchListener(new android.view.View.OnTouchListener({
    onTouch: function(view, event) {
        switch (event.getAction()) {
            case android.view.MotionEvent.ACTION_DOWN:
                isToDown = true;
                break;
            case android.view.MotionEvent.ACTION_MOVE:

                break;
            case android.view.MotionEvent.ACTION_UP:
                isToDown = false;
                break;
        }
        return true;
    }
}));






function round(a, b) {
    return Math.round(b * a) / a;
};

function print_a() {
    var A = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        A = A + "§" + arguments[i];
    };
    log(A);
};

//绝对值Math.abs(a) 

function shuzuG(a) {
    var k = new Array;
    for (var i = 0; i < a.length; i++) {
        k.push(round(10, a[i]));
    };
    return k;
};



function weiyi_(ary) {
    let sum = 0;
    for (let i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};


function getsd(s, ary) {
    let sum = weiyi_(ary);
    let S = s / sum;
    for (let i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};


//位移
function weiyi(a, b, c) {
    return Math.sqrt(a * a + b * b + c * c);
};

//速度
function getsdxyz(x, y, z, s) {
    var k = new Array,
        d, c = s * s,
        sx, sy, sz;
    if (z != 0) {
        a = x / z;
        b = y / z;
        d = a * a + b * b + 1;
        sz = z / Math.abs(z) * Math.sqrt(c / d);
        sx = sz * a;
        sy = sz * b;
    } else if (x != 0) {
        a = y / x;
        d = a * a + 1;
        sx = x / Math.abs(x) * Math.sqrt(c / d);
        sy = sx * a;
        sz = z;
    } else {
        sy = y / Math.abs(y) * s;
        sx = x;
        sz = z;
    }
    sx = round(10000, sx);
    sy = round(10000, sy);
    sz = round(10000, sz);
    return [sx, sy, sz];
};

//看的方向
function kdfx(Y, P) {

    var x, y, z;
    za = Math.sin(P * Math.PI / 180);
    zb = Math.cos(P * Math.PI / 180);
    z = za;
    ya = Math.sin(Y % 360 * Math.PI / 180);
    y = ya * zb;

    xa = Math.cos(Y % 360 * Math.PI / 180);
    x = xa * zb;
    x = round(10000, x);
    y = round(10000, y);
    z = round(10000, z);
    return [x, y, z];
};

//移动方向
function ydfx(bx, by, bz) {
    //x向右y向前z向上

    var Y, P;
    Y = 180 * Math.asin(Math.abs(by) / weiyi(bx, by, 0)) / Math.PI;
    P = 180 * Math.asin(bz / weiyi(bx, by, bz)) / Math.PI;
    if (by > 0 && bx < 0) {
        Y = 180 - Y
    };
    if (by < 0 && bx < 0) {
        Y = Y + 180
    };
    if (by < 0 && bx > 0) {
        Y = 360 - Y
    };
    if (Math.abs(P) == 90) {
        Y = 0;
    };
    Y = round(10000, Y);
    P = round(10000, P);
    return [Y, P];
};


//～～～～～～～～～～～～～～～～～～～～

/*
//位移
function weiyi2(obj) {
    return Math.sqrt(obj.x * obj.x + obj.y * obj.y + obj.z * obj.z);
};

//速度
function getsdxyz2(obj, s) {
    var x = obj.x,
        y = obj.y,
        z = obj.z;
    var k = new Array,
        d, c = s * s,
        sx, sy, sz;
    if (z != 0) {
        a = x / z;
        b = y / z;
        d = a * a + b * b + 1;
        sz = z / Math.abs(z) * Math.sqrt(c / d);
        sx = sz * a;
        sy = sz * b;
    } else if (x != 0) {
        a = y / x;
        d = a * a + 1;
        sx = x / Math.abs(x) * Math.sqrt(c / d);
        sy = sx * a;
        sz = z;
    } else {
        sy = y / Math.abs(y) * s;
        sx = x;
        sz = z;
    }
    sx = round(10000, sx);
    sy = round(10000, sy);
    sz = round(10000, sz);
    return {
        x: sx,
        y: sy,
        z: sz
    };
};

//看的方向
function kdfx2(obj) {
    //x向右y向前z向上
    var Y = obj.Y,
        P = obj.P;
    var x, y, z;
    za = Math.sin(P * Math.PI / 180);
    zb = Math.cos(P * Math.PI / 180);
    z = za;
    ya = Math.sin(Y % 360 * Math.PI / 180);
    y = ya * zb;

    xa = Math.cos(Y % 360 * Math.PI / 180);
    x = xa * zb;
    x = round(10000, x);
    y = round(10000, y);
    z = round(10000, z);
    return {
        x: x,
        y: y,
        z: z
    };
};

//移动方向
function ydfx2(obj) {
    //x向右y向前z向上

    var bx = obj.x,
        by = obj.y,
        bz = obj.z;

    var Y, P;
    Y = 180 * Math.asin(Math.abs(by) / weiyi(bx, by, 0)) / Math.PI;
    P = 180 * Math.asin(bz / weiyi(bx, by, bz)) / Math.PI;
    if (by > 0 && bx < 0) {
        Y = 180 - Y
    };
    if (by < 0 && bx < 0) {
        Y = Y + 180
    };
    if (by < 0 && bx > 0) {
        Y = 360 - Y
    };
    if (Math.abs(P) == 90) {
        Y = 0;
    };
    Y = round(10000, Y);
    P = round(10000, P);
    return {
        Y: Y,
        P: P
    };
};

*/

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