//我的世界MC自动钓鱼。
//适用场景。
//最好有一个附魔的钓鱼竿。
//最好是在海边。
//面向海水。
//拿着钓鱼竿。
//钓鱼的时候尽量让浮漂在屏幕中间。
//然后点开始按钮就行了。
//



//请求截图
if (!requestScreenCapture(true)) {
    //横屏截图。
    toast("请求截图失败");
    exit();
};

auto();
//适配各种屏幕自动缩放坐标。
setScreenMetrics(1080, 1920);

//定义悬浮窗控制模块，命名为(悬块)。
var 悬块 = function(window, view) {
    //判断是否缺少构造参数。
    if (!window || !view) {
        //缺少构造参数，抛出错误。
        throw "缺参数";
    };
    //记录按键被按下时的触摸坐标
    this.x = 0, this.y = 0;
    //记录按键被按下时的悬浮窗位置
    this.windowX, this.windowY;
    //按下时长超过此值则执行长按等动作
    this.downTime = 500;
    //记录定时执行器的返回id
    this.Timeout = 0;
    //创建点击长按事件
    this.Click = function() {};
    this.LongClick = function() {};
    //可修改点击长按事件
    this.setClick = function(fun) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.Click = fun;
        };
    };
    this.setLongClick = function(fun, ji) {
        //判断参数类型是否为函数？
        if (typeof fun == "function") {
            this.LongClick = fun;
            //判断参数是否可为设置数字？
            if (parseInt(ji) <= 1000) {
                this.downTime = parseInt(ji);
            };
        };
    };

    view.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
        //判断当前触控事件，以便执行操作。
        switch (event.getAction()) {
            //按下事件。
            case event.ACTION_DOWN:
                //按下记录各种坐标数据。
                this.x = event.getRawX();
                this.y = event.getRawY();
                this.windowX = window.getX();
                this.windowY = window.getY();
                //创建一个定时器用来定时执行长按操作。
                this.Timeout = setTimeout(() => {
                    this.LongClick();
                    this.Timeout = 0;
                }, this.downTime);
                return true;
                //移动事件。
            case event.ACTION_MOVE:
                //移动距离过大则判断为移动状态
                if (Math.abs(event.getRawY() - this.y) > 5 && Math.abs(event.getRawX() - this.x) > 5) {
                    //移动状态清除定时器
                    if (this.Timeout) {
                        //定时器存在则清除定时器。
                        clearTimeout(this.Timeout);
                        this.Timeout = 0;
                    };
                    //移动手指时调整悬浮窗位置
                    window.setPosition(this.windowX + (event.getRawX() - this.x), this.windowY + (event.getRawY() - this.y));
                };
                return true;
                //抬起事件。
            case event.ACTION_UP:
                if (this.Timeout) {
                    //手指抬起时，定时器存在，说明没有移动和按下时间小于长按时间。
                    //清除定时器。
                    clearTimeout(this.Timeout);
                    this.Timeout = 0;
                    //执行点击事件。
                    this.Click();
                };
                return true;
        };
        //控件的触控事件函数必须要返回true。否则报错。
        return true;
    }));
};





//创建并生成一个悬浮窗。
var window = floaty.window(
    //创建一个按钮，并设置其id宽高文字等属性。
    <button  id="but" w="200px" h="200px" text="开始"/>
);
//输出提示信息。
toastLog("长按悬浮窗关闭本脚本");
//空运行定时器保持脚本运行中,这是悬浮窗脚本所必需的。
setInterval(() => {}, 500);
//声明一个变量用来控制线程。
var thread = null;
//创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。
var ad = new 悬块(window, window.but);
//设置长按事件。
ad.setLongClick(function() {
    //输出气泡信息。
    toast("脚本已关闭");
    //脚本停止代码。
    exit();
});
//设置点击事件。
ad.setClick(function() {
    //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
    if (thread ? !thread.isAlive() : true) { //线程没有运行。
        ui.run(() => {
            window.but.setText("停止");
        });
        //新建一个线程，赋值给变量thread
        thread = threads.start(Main);
    } else {
        thread.interrupt();
        ui.run(() => {
            window.but.setText("开始");
        });
    };
});


//960,540,960,820,
function Main() {
    while (true) {
        var img = captureScreen();
        if (!判断(img)) {
            toastLog("钓鱼");
            click(960, 820);
            sleep(1000);
            click(960, 820);
            sleep(2000);
        };
        img.recycle();
        sleep(50);
    };
};

function 判断(img) {
    var w = parseInt(img.getWidth());
    var h = parseInt(img.getHeight());
    var x = Math.floor(w / 2);
    var y = Math.floor(h / 3);
    var s = y / 72;
    for (let i = 0; i < 72; i++) {
        var color = img.pixel(x, Math.floor(y + i * s));
        if (颜色(color)) {
            return true;
        };
    };
    return false;
};


function 颜色(color) {
    var r = colors.red(color),
        g = colors.green(color),
        b = colors.blue(color);

    if (weiyi([r - g, g - b, b - r]) < 30) {
        return true;
    };
    return false;
};

function weiyi(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};