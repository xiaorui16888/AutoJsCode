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
            this.windowyidong([[window.getX(), window.getY()], [xy.x, xy.y]], window);
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
                    this.Tkeep = true;
                    break;
                case event.ACTION_MOVE:
                    var sx = event.getRawX() - this.Tx;
                    var sy = event.getRawY() - this.Ty;
                    if (!this.Tyidong && this.weiyi(sx, sy) >= 10) {
                        this.Tyidong = true;
                    };
                    if (this.Tyidong) {
                        window.setPosition(this.TX + sx, this.TY + sy);
                    };
                    break;
                case event.ACTION_UP:
                    if (!this.Tyidong && this.Ttime < 7) {
                        this.Click();
                    };
                    this.Tkeep = false;
                    this.Ttime = 0;
                    if (this.Tyidong) {
                        var A = this.windowGXY(window.getX(), window.getY(), this.G(window));
                        threads.start(new java.lang.Runnable(() => {
                            this.windowyidong([
                                [window.getX(), window.getY()],
                                [A.x, A.y]
                            ], window);
                        }));
                        this.Tyidong = false;
                    };
                    break;
            };
            return true;
        }));
    };
    this.G = (win) => {
        var K = 35,
            H = 66;
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
    this.weiyi = function() {
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
    this.windowyidong = (A, w, s) => {
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
        var F=this.G(window);
        var x = window.getX(),
            y = window.getY();
        var sx = window.getX() + window.getWidth() / 2,
            sy = window.getY() + window.getHeight() / 2 + 66 ;
        var cx = Math.abs(sx<(this.Width-sx)?sx:(this.Width-sx)) < Math.abs(sy<(this.Height - sy)?sy:(this.Height - sy)) ? (sx < this.Width / 2 ? (F[0][0]-window.getWidth()) : (F[1][0]+window.getWidth())) : x,
            cy = Math.abs(sx<(this.Width-sx)?sx:(this.Width-sx)) < Math.abs(sy<(this.Height - sy)?sy:(this.Height - sy)) ? y : (sy < this.Height / 2 ? (F[0][1]-window.getHeight()) : (F[1][1]+window.getHeight()));
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
        ], window, 1);
    }));
};



importClass(android.graphics.Paint);
importClass(android.graphics.Bitmap);
auto();
var csx = device.width / 1080;
var csy = device.height / 1920;
var sf = 1.37;
dialogs.alert("此乃大维版，禁止抄袭");
dialogs.alert("用你的手指连接起点和终点");
var Rwindow = floaty.rawWindow(
    <vertical bg="#40808080">
        <frame bg="#c0808080" margin="10px">
            <button id="to_" w="auto" text="▽" layout_gravity="left" gravity="center"/>
            <button id="Gsf" w="auto" text="{{sf}}" layout_gravity="right" gravity="center"/>
            <button id="but" w="auto" text="移动窗口(长按关闭)" layout_gravity="center_horizontal" gravity="center"/>
        </frame>
        <img id="img" w="{{device.width}}px"h="{{device.width}}px" margin="10px"/>
    </vertical>
);
var window_ = floaty.window(
    <frame >
        <img w="{{Math.floor(device.width*0.14)}}px" h="{{Math.floor(device.width*0.14)}}px" src="#88eeeeee" radius="{{Math.floor(device.width*0.7)}}px"/>
        <img id="but_" w="{{Math.floor(device.width*0.14)}}px" h="{{Math.floor(device.width*0.14)}}px" src="@drawable/ic_details_black_48dp"/>
    </frame>
);
var rad = new 悬浮控制(Rwindow, Rwindow.but, 1);
var rd = new 悬浮控制(window_, window_.but_);
var RWF = rad.OutScreen(),
    WF = rd.OutScreen();
rad.setLongClick(function() {
    toastLog("OFF");
    exit();
});
rd.setLongClick(function() {
    toastLog("OFF");
    exit();
});
rad.setClick(function() {
    threads.start(new java.lang.Runnable(() => {
        var F = rad.OutScreen();
        rad.windowyidong(F, Rwindow);
        dialogs.alert("用你的手指连接起点和终点");
        rad.windowyidong(F.reverse(), Rwindow);
    }));
});
rd.setClick(function() {
    threads.start(new java.lang.Runnable(() => {
        WF = rd.OutScreen();
        rd.windowyidong(WF, window_);
        rad.windowyidong(RWF.reverse(), Rwindow);
    }));
});
Rwindow.to_.click(function() {
    threads.start(new java.lang.Runnable(() => {
        RWF = rad.OutScreen();
        rad.windowyidong(RWF, Rwindow);
        rd.windowyidong(WF.reverse(), window_);
    }));
});
Rwindow.Gsf.click(function() {
    threads.start(new java.lang.Runnable(() => {
        var F = rad.OutScreen();
        rad.windowyidong(F, Rwindow);
        dialogs.prompt("修改系数", sf, function(i) {
            if (parseFloat(i)) {
                sf = parseFloat(i);
                ui.run(() => {
                    Rwindow.Gsf.setText(String(sf));
                });
            };
        });
        rad.windowyidong(F.reverse(), Rwindow);
    }));
});
var Tx, Ty, TX, TY;
Rwindow.img.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            Tx = event.getRawX();
            Ty = event.getRawY();
            TX = event.getX();
            TY = event.getY();
    bitmap = Bitmap.createBitmap(view.getWidth(), view.getHeight(), Bitmap.Config.ARGB_8888);
    canvas = new Canvas(bitmap);
            DrawBitmap( [
                [TX, TY],
                [event.getX(), event.getY()]
            ]);
            break;
        case event.ACTION_MOVE:
            DrawBitmap( [
                [TX, TY],
                [event.getX(), event.getY()]
            ]);
            break;
        case event.ACTION_UP:
            DrawBitmap();
            var S = Math.abs((event.getRawX() - Tx) * 2 / Math.sqrt(3) / csx);
            threads.start(new java.lang.Runnable(() => {
                var F = rad.OutScreen();
                rad.windowyidong(F, Rwindow, 100);
                sleep(50);
                press(Tx, Ty, (S * sf) || 1);
                rad.windowyidong(F.reverse(), Rwindow, 100);
            }));
            break;
    };
    return true;
}));

        var AS = kdfx(30);
        var BS = kdfx(-30);
        var Axy = getsd(200 * csx,[AS.x,AS.y]);
        var Bxy = getsd(200 * csx,[BS.x,BS.y]);
    var bitmap = Bitmap.createBitmap( 1000,  1000, Bitmap.Config.ARGB_8888);
    var canvas = new Canvas(bitmap);
    var paint = new Paint();
    paint.setStrokeWidth(5);
    paint.setColor(colors.RED);
log(Axy,Bxy);
function DrawBitmap( A) {
    bitmap.eraseColor(0);
    if (A) {
        var cx = A[1][0] - A[0][0];
        var cy = Math.abs(cx) / Math.sqrt(3);
        canvas.drawLine(A[0][0] + Axy[0], A[0][1] + Axy[1], A[0][0] - Axy[0], A[0][1] - Axy[1], paint);
        canvas.drawLine(A[0][0] + Bxy[0], A[0][1] + Bxy[1], A[0][0] - Bxy[0], A[0][1] - Bxy[1], paint);
        //canvas.drawLine(A[1][0] + Axy[0], A[1][1] + Axy[1], A[1][0] - Axy[0], A[1][1] - Axy[1], paint);
        //canvas.drawLine(A[1][0] + Bxy[0], A[1][1] + Bxy[1], A[1][0] - Bxy[0], A[1][1] - Bxy[1], paint);
        //canvas.drawLine(A[0][0], A[0][1], A[1][0], A[1][1], paint);
        canvas.drawCircle(A[1][0], A[1][1],20,paint);
        var x = A[1][0];
        var y = A[0][1] - cy;
        canvas.drawLine(x + Axy[0], y + Axy[1], x - Axy[0], y - Axy[1], paint);
        canvas.drawLine(x + Bxy[0], y + Bxy[1], x - Bxy[0], y - Bxy[1], paint);
        var y = A[0][1] + cy;
        canvas.drawLine(x + Axy[0], y + Axy[1], x - Axy[0], y - Axy[1], paint);
        canvas.drawLine(x + Bxy[0], y + Bxy[1], x - Bxy[0], y - Bxy[1], paint);
    };
    ui.run(() => {
        Rwindow.img.setImageBitmap(bitmap);
    });
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

function kdfx(Y) {
    var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
    var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
    return {
        x: x,
        y: y
    };
};


