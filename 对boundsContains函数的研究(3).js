var 悬浮控制 = function(window, windowid, ar) {
    this.Orientation = context.resources.configuration.orientation;
    this.Width = this.Orientation == 1 ? device.width : device.height;
    this.Height = this.Orientation == 2 ? device.width : device.height;
    this.Click = function() {};
    this.LongClick = function() {};
    this.setClick = (fun) => {
        fun = fun || function() {};
        this.Click = fun;
    };
    this.setLongClick = (fun, ji) => {
        fun = fun || function() {};
        this.LongClick = fun;
        if (parseInt(ji)) {
            this.Tjitime = parseInt(ji) / 50;
        };
    };
    setInterval(() => {
        if (context.resources.configuration.orientation != this.Orientation) {
            this.Orientation = context.resources.configuration.orientation;
            this.Width = this.Orientation == 1 ? device.width : device.height;
            this.Height = this.Orientation == 2 ? device.width : device.height;
            var xy = this.windowGXY(window.getX(), window.getY(), this.G(window));
            this.windowyidong([
                [window.getX(), window.getY()],
                [xy.x, xy.y]
            ]);
        };
    }, 100);
    this.TX = 0;
    this.TY = 0;
    this.Tx = 0;
    this.Ty = 0;
    this.Tyidong = false;
    this.Tkeep = false;
    this.Tjitime = 12;
    this.Ttime = 0;
    setInterval(() => {
        if (this.Tkeep) {
            this.Ttime++;
            if (!this.Tyidong && this.Ttime > this.Tjitime) {
                //非移动且按下时长超过1秒判断为长按
                this.Tkeep = false;
                this.Ttime = 0;
                this.LongClick();
            };
        };
    }, 50);
    if (windowid) {
        windowid.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
            switch (event.getAction()) {
                case event.ACTION_DOWN:
                    this.Tx = event.getRawX();
                    this.Ty = event.getRawY();
                    this.TX = window.getX();
                    this.TY = window.getY();
                    this.Tkeep = true; //按下,开启计时
                    break;
                case event.ACTION_MOVE:
                    var sx = event.getRawX() - this.Tx;
                    var sy = event.getRawY() - this.Ty;
                    if (!this.Tyidong && this.Tkeep && this.weiyi(sx, sy) >= 10) {
                        this.Tyidong = true;
                    };
                    if (this.Tyidong && this.Tkeep) {
                        window.setPosition(this.TX + sx, this.TY + sy);
                    };
                    break;
                case event.ACTION_UP:
                    if (!this.Tyidong && this.Tkeep && this.Ttime < 7) {
                        this.Click(event);
                    };
                    this.Tkeep = false;
                    this.Ttime = 0;
                    if (this.Tyidong) {
                        this.Tyidong = false;
                    };
                    break;
            };
            return true;
        }));
    };
    this.G = (win) => {
        var K = 35, //悬浮窗的隐形边矩
            H = 66; //手机通知栏的高度
        if (!ar) {
            return [
                [-K, -K],
                [this.Width - win.getWidth() + K, this.Height - win.getHeight() - H + K]
            ];
        } else {
            return [
                [0, H],
                [this.Width - win.getWidth(), this.Height - win.getHeight()]
            ];
        };
    };
    this.weiyi = function() { //平方和开方
        var num = 0;
        for (var i = 0; i < arguments.length; i++) {
            num += arguments[i] * arguments[i];
        };
        return Math.round(Math.sqrt(num) * 1000) / 1000
    };
    this.windowGXY = function(x, y, k) {
        x = (k[0][0] < x && x < k[1][0]) ? x : (k[0][0] < x ? k[1][0] : k[0][0]);
        y = (k[0][1] < y && y < k[1][1]) ? y : (k[0][1] < y ? k[1][1] : k[0][1]);
        return {
            x: x,
            y: y
        };
    };
    this.windowyidong = (A, s, w) => {
        w = w || window;
        s = s || 10;
        var sx = A[1][0] - A[0][0],
            sy = A[1][1] - A[0][1];
        var sd = this.weiyi(sx, sy) / s;
        var X = sx / sd,
            Y = sy / sd;
        var x = 0,
            y = 0;
        for (var i = 0; i < sd; i++) {
            x += X;
            y += Y;
            sleep(1);
            w.setPosition(A[0][0] + x, A[0][1] + y);
        };
        w.setPosition(A[1][0], A[1][1]);
    };
    this.OutScreen = () => {
        var F = this.G(window);
        var x = window.getX(),
            y = window.getY();
        var sx = window.getX() + window.getWidth() / 2,
            sy = window.getY() + window.getHeight() / 2 + 66;
        var cx = Math.abs(sx < (this.Width - sx) ? sx : (this.Width - sx)) < Math.abs(sy < (this.Height - sy) ? sy : (this.Height - sy)) ? (sx < this.Width / 2 ? (F[0][0] - window.getWidth()) : (F[1][0] + window.getWidth())) : x,
            cy = Math.abs(sx < (this.Width - sx) ? sx : (this.Width - sx)) < Math.abs(sy < (this.Height - sy) ? sy : (this.Height - sy)) ? y : (sy < this.Height / 2 ? (F[0][1] - window.getHeight()) : (F[1][1] + window.getHeight()));
        return [
            [x, y],
            [cx, cy]
        ];
    };
    var A = this.windowGXY(window.getX(), window.getY(), this.G(window));
    threads.start(new java.lang.Runnable(() => {
        this.windowyidong([
            [window.getX(), window.getY()],
            [A.x, A.y]
        ], 1);
    }));
};


auto();

var x = device.width/2,
    y = device.height/2;
var s = 10;
var UiObAry = clickable().boundsContains(x - s, y - s, x + s, y - s).find();
toastLog(UiObAry.length);
if (!UiObAry.length) {
    toastLog("发生了bug，没找到控件");
    exit();
};
var ji = 0;

var window = floaty.window(
    <vertical>
        <canvas id="canvas" w="800px"h="1500px"/>
    </vertical>
);
var wc = new 悬浮控制(window, window.canvas);

wc.setLongClick(exit);
wc.setClick(function(e) {

    var x = e.getRawX(),
        y = e.getRawY();
    var s = 10;
    var ObAry = clickable().boundsContains(x - s, y - s, x + s, y - s).find();
    toastLog(ObAry.length);
    if (!ObAry.length) {
        toastLog("发生了bug，没找到控件");
        //exit();
    } else {
        UiObAry = ObAry;
    }

});


importClass(android.graphics.Paint);
importClass(android.graphics.Bitmap);
//importClass(android.graphics.canvas);

//var bitmap = Bitmap.createBitmap(device.width, device.height, Bitmap.Config.ARGB_8888);
//var canvas = new Canvas(bitmap);
var paint = new Paint();

paint.setStrokeWidth(5);
paint.setStyle(Paint.Style.STROKE);
paint.setColor(colors.RED);
paint.setTextAlign(Paint.Align.CENTER); //写字左右中心

var size = 60;
paint.setTextSize(size);

//paint.setARGB(255,255,255,255);
window.canvas.on("draw", function(canvas) {
    var w = canvas.getWidth(),
        h = canvas.getHeight();
    var sw = w / 1080,
        sh = h / 1920;
    canvas.drawARGB(255, 127, 127, 127);

    var matrix = new android.graphics.Matrix();
    matrix.postScale(0.8, 0.8, w / 2, h / 2);
    canvas.setMatrix(matrix);
    paint.setColor(colors.GREEN);
    canvas.drawRect(0, 0, 1080 * sw, 1920 * sh, paint);
try{
    ji += 1;
    var a = Math.floor(ji / 5);
    if (a >= UiObAry.length) {
        ji = 0;
        a = 0;
    };
    if (UiObAry.length) {
        var u = UiObAry[a];
        if (u) {
            let r = u.bounds();
            //log(r);
            paint.setColor(colors.RED);
            canvas.drawRect(r.left * sw, r.top * sh, r.right * sw, r.bottom * sh, paint);
            paint.setColor(colors.GREEN);
            canvas.drawText(String(a), r.centerX() * sw, r.centerY() * sh + 0.365 * size, paint);
        };
    };
    }catch(e){
        toastLog(e);
        };
});

//toastLog(saveimg(files.path("./图片.png"), bitmap));


//存画
function saveimg(path, bitmap) {
    try {
        var file = new java.io.File(path);
        var fileOutput = new java.io.FileOutputStream(file);
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, fileOutput);
        return true;
    } catch (e) {
        log(e);
        return false;
    }
};