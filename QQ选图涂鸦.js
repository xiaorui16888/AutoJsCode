/**
 *作者QQ: 1811588980
 *完成时间: 2019年6月19日 下午11:30:24
 *测试机型: vivo PD1813D
  *Auto.js版本: 4.1.0 Alpha5
  *Android版本: 8.1.0
  *屏幕: 1080*2280
  *API: 27
 *备注: 选择图片，手动到涂鸦界面，点击开始。
 *开始按钮长按可以关闭脚本。
**/




//定义悬浮窗控制模块，命名为(悬块)。
function 悬块(window, view) {
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



auto();
//console.show();
launchApp("QQ");

log("开始");


//创建并生成一个悬浮窗。
var window = floaty.window(
    <vertical >
        <button  id="but_x"w="*" layout_weight="1" text="选图"/>
        <button  id="but" w="*" layout_weight="1" text="开始"/>
    </vertical>
);
//输出提示信息。
toastLog("长按悬浮窗关闭本脚本");
//空运行定时器保持脚本运行中,这是悬浮窗脚本所必需的。
setInterval(() => {}, 500);
//声明一个变量用来控制线程。
var thread = null;
var path;

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
    //输出气泡信息。
    toast("点击");
    //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
    if (thread ? !thread.isAlive() : true) { //线程没有运行。
        ui.run(() => {
            //在ui线程中修改按钮的文字
            window.but.setText("停止");
        });
        //新建一个线程，赋值给变量thread
        thread = threads.start(function() {
            try {
                Main();
            } catch (e) {
                toastLog(e);
            };
            //运行完毕修改按钮文字
            ui.run(() => {
                //在ui线程中修改按钮的文字
                window.but.setText("开始");
            });
        });
    } else {
        thread.interrupt();
        //中断线程;
        ui.run(() => {
            //在ui线程中修改按钮的文字
            window.but.setText("开始");
        });
    };
});

window.but_x.click(function() {
    threads.start(function() {
        switch (dialogs.select("选择方式", ["媒体库", "文件"])) {
            case 0:
                var photosPath = getPhotosInfo(5).map(function(obj) {
                    return obj.filePath;
                });
                let i = dialogs.select("选择", photosPath);
                if (i + 1) {
                    path = photosPath[i];
                    toastLog("已选");
                };
                break;
            case 1:
                let p = selectFile("/sdcard/", "", function(name) {
                    return name.endsWith(".jpg") || name.endsWith(".png") || files.isDir(files.join("/sdcard", name));
                });
                if (p) {
                    path = p;
                    toastLog("已选");
                };
                break;
        };
    });
});

toast("finish");



function Main() {
    //这里是主要运行的内容
    /*

    var colorBoard = depth(11).className("android.widget.AbsListView").findOne()
    changeColor(0)
    draw(180)
    changeColor(2)
    draw(140)
    changeColor(0)
    draw(100)
    */
    if (path) {
        draw(path);
    } else {
        toastLog("未选图片");
    };
};


function draw(path) {
    var img = images.read(path);
    img = images.resize(img, [64], "LANCZOS4");
    img = images.grayscale(img);
    img = images.adaptiveThreshold(img, 200, "MEAN_C", "BINARY", 25, 10);
    img_w = img.getWidth()
    img_h = img.getHeight()
    img = images.rotate(img, 0);
    /*
    if (Boolean(mode)) {
        img = images.inRange(img, colors.rgb(0, 0, 0), colors.rgb(threshold, threshold, threshold)) //越大越暗
    } else {
        img = images.inRange(img, colors.rgb(threshold, threshold, threshold), colors.rgb(255, 255, 255)) //越大越暗
    }
    for (var i = 0; i < length - 1; i++) {
        img_l = images.concat(img_l_o, img_l, "TOP")
    }
    img = images.concat(img, img_l)
    */

    images.save(img, "./img1.png");
    // media.scanFile("./img1.png");
    log("img", img_w, img_h);
    //exit();

    board = className("android.view.View").depth(9).findOne()
    log("ui");
    rect = board.bounds();

    //rect=new android.graphics.Rect(0,0,128,128);
    rect_w = rect.width()
    rect_h = rect.height()
    rect_l = rect.left
    rect_t = rect.top
    var o_x
    var o_y
    var isPaint = false
    for (var y = 0; y < img_h; y++) {
        for (var x = 0; x < img_w; x++) {
            color = img.pixel(x, y);
            if (colors.isSimilar(color, "#ff000000")) {
                if (!isPaint) {
                    ox = x
                    oy = y
                    isPaint = true
                };
            } else {
                if (isPaint) {
                    swipe(ox / img_w * rect_w + rect_l, oy / img_h * rect_h + rect_t, x / img_w * rect_w + rect_l, y / img_h * rect_h + rect_t, 1);
                    log(ox / img_w * rect_w + rect_l, oy / img_h * rect_h + rect_t, x / img_w * rect_w + rect_l, y / img_h * rect_h + rect_t, 1);
                    //line((ox + 0.5) / length, oy / length, (x - 0.5) / length, y / length)
                    isPaint = false
                };
            };
        };
        isPaint = false;
        //changeColor(0)
        //line(0, (y + 1.5) / length, 1, (y + 1.5) / length)
        //changeColor(2)
    };
    toastLog("完成");
}




function line(ox, oy, x, y) {
    var k = img_h / img_w
    var sizeX = 0.8
    var sizeY = 0.9
    if (k > 1) {
        sizeX = sizeX / k
    } else {
        sizeY = sizeY * k
    }
    ox = (ox - 0.5) * sizeX + 0.5
    oy = (oy - 0.5) * sizeY + 0.5
    x = (x - 0.5) * sizeX + 0.5
    y = (y - 0.5) * sizeY + 0.5
    swipe(ox * rect_w + rect_l, oy * rect_h + rect_t, x * rect_w + rect_l, y * rect_h + rect_t, 1)
}

function changeColor(n) {
    colorBoard.child(n).click()
}



function selectFile(Apath, Bpath) {
    Apath = Apath || "/sdcard";
    Bpath = Bpath || "";

    return main(Bpath);

    function main(Bpath) {
        var path = files.join(Apath, Bpath);
        var a = files.listDir(path).sort();
        if (a.length) {
            a = a.join("/").split("/");
            a.unshift("返回上一层");
        } else {
            a = ["返回上一层"];
        };
        i = dialogs.singleChoice("选择文件\n" + path, a);
        if (i >= 0) {
            if (i) {
                name = a[i];
                path = files.join(path, name);
                if (files.isDir(path)) {
                    return arguments.callee(files.join(Bpath, name));
                } else {
                    if (dialogs.confirm("确定文件？", name)) {
                        return path;
                    } else {
                        return arguments.callee(Bpath);
                    }
                }
            } else {
                var ary = Bpath.split("/");
                if (ary.length && Bpath.length) {
                    ary.pop();
                    return arguments.callee(ary.join("/"));
                };
            };
        };
    };
};


//获取设备上所有的照片信息
function getPhotosInfo(maxAmount, ary) {
    MediaStore = android.provider.MediaStore;
    var Ary = ary || new Array;
    let contentResolver = context.getContentResolver();
    let photoColumns = [
        MediaStore.Images.Media._ID,
        MediaStore.Images.Media.DATA,
        MediaStore.Images.Media.TITLE,
        MediaStore.Images.Media.MIME_TYPE,
        MediaStore.Images.Media.SIZE,
        MediaStore.Images.Media.ORIENTATION
    ];
    let cursor = contentResolver.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, photoColumns, null, null, null);
    maxAmount = maxAmount ? (maxAmount < cursor.getCount() ? maxAmount : cursor.getCount()) : cursor.getCount();
    cursor.moveToLast();
    while (Ary.length < maxAmount) {
        var ob = {};
        //ob._id = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID));
        ob.filePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA));
        ob.title = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.TITLE));
        //ob.mime_type = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.MIME_TYPE));
        ob.size = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.SIZE));
        if (files.exists(ob.filePath)) {
            Ary.push(ob);
            sleep(100);
        };
        cursor.moveToPrevious();

    }
    return Ary;
};