"ui";
/**
 *作者QQ: 1811588980
 *完成时间: 2019年5月19日 下午4:22:57
 *备注: 暂无备注
**/

ui.layout(
    <vertical>
        <canvas id="canvas" layout_weight="1"/>
        
        <button id="openImage" text="打开图片"/>
        <button id="imageSave" text="保存处理后图片"/>
    </vertical>
);

threads.start(function() {
    //console.show();
});

var imagesPath = new Array;

thread = threads.start(function() {
    sleep(1000);
    getPhotosInfo(25, imagesPath);
});


var storage = storages.create("图片剪切");
var imagePath = storage.get("imagePath");
events.on("exit", function() {
    storage.put("imagePath", imagePath);
});

var MainImg = 加载图片(imagePath);


ui.openImage.click(function() {
    threads.start(function() {
        switch (dialogs.singleChoice("选择方式", ["媒体库", "本机文件"])) {
            case 0:
                媒体库选择(function(path) {
                    var img = MainImg;
                    MainImg = 加载图片(path);
                    if (MainImg) {
                        imageRect.set(new android.graphics.RectF(0, 0, MainImg.getWidth(), MainImg.getHeight()));
                        canvasMatrix.setRectToRect(imageRect, canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
                    };
                    if (img) {
                        img.recycle();
                    };
                });
                break;
            case 1:
                选择图片(function(path) {
                    var img = MainImg;
                    MainImg = 加载图片(path);
                    if (MainImg) {
                        imageRect.set(new android.graphics.RectF(0, 0, MainImg.getWidth(), MainImg.getHeight()));
                        canvasMatrix.setRectToRect(imageRect, canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
                    };
                    if (img) {
                        img.recycle();
                    };
                });

                break;
        };
    });
});



ui.imageSave.click(function() {
    if (MainImg) {

        let x1 = imageRect.left < imageRect.right ? imageRect.left : imageRect.right,
            y1 = imageRect.top < imageRect.bottom ? imageRect.top : imageRect.bottom,
            x2 = imageRect.right >= imageRect.left ? imageRect.right : imageRect.left,
            y2 = imageRect.bottom >= imageRect.top ? imageRect.bottom : imageRect.top;
        let img = images.clip(MainImg, x1, y1, x2 - x1, y2 - y1);

        let file = new java.io.File(imagePath);
        var toPath = files.join(file.getParent(), files.getNameWithoutExtension(imagePath) + "(剪切)" + getTimeString() + "." + files.getExtension(imagePath));
        //var toPath = "/sdcard/脚本/" + (new Date().getTime()) + ".png";
        images.save(img, toPath, "png", 100);
        //img.recycle();
        media.scanFile(toPath);
        threads.start(function() {
            showImage(img, true);
        });
        toastLog("保存");
    } else {
        toastLog("没图");
    };
});


//黑色画笔。
var paint = new Paint;
var paint1 = new Paint;
var paint2 = new Paint;
//paint1.setTextSize(75);
//paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(0.675);
paint1.setStrokeWidth(0.675);
paint.setStyle(Paint.Style.STROKE);
paint1.setStyle(Paint.Style.STROKE);
paint2.setStyle(Paint.Style.FILL);
//paint.setARGB(255, 0, 0, 0);
paint.setColor(colors.RED);
paint1.setColor(colors.GREEN);
paint2.setColor(colors.GREEN);
//paint.setTextSize(75);
//android.view.MotionEvent

var imageRect = new android.graphics.RectF;
var canvasRect = new android.graphics.RectF;
var canvasMatrix = new android.graphics.Matrix;

var ASX = new XYToMatrix(canvasMatrix);

//可以用两只手指移动缩放图像。
var touchControlPoint;
ui.canvas.setOnTouchListener(new android.view.View.OnTouchListener(function(view, event) {
    try {
        let W = view.getWidth();
        let H = view.getHeight();
        let PC = event.getPointerCount();
        switch (event.getActionMasked()) {
            case event.ACTION_MOVE:
                try {
                    if (touchControlPoint) {
                        for (let i = 0; i < PC; i++) {
                            let id = event.getPointerId(i);
                            let x = event.getX(i);
                            let y = event.getY(i);
                            let XYary = ASX.matrixPoints(ASX.invertMatrix, [x, y]);
                            setRectXY(imageRect, touchControlPoint, XYary[0], XYary[1]);
                        };
                    };

                } catch (e) {
                    throw "MOVE " + e;
                };


                break;
            case event.ACTION_CANCEL:
                toast("触摸被系统拦截\n可能是三指截屏等功能");

                break;
            case event.ACTION_OUTSIDE:
                log("OUTSIDE");

                break;
            default:
                let I = event.getActionIndex();
                let ID = event.getPointerId(I);
                let X = event.getX(I);
                let Y = event.getY(I);
                switch (event.getActionMasked()) {
                    case event.ACTION_DOWN:
                        try {
                            //log("down");
                            //当有新的手指按下时使坐标差为零。
                            let scale = ASX.getScaling();
                            let touchRadius = 50 / scale;
                            let XYary = ASX.matrixPoints(ASX.invertMatrix, [X, Y]);
                            let resAry = isRectXY(imageRect, XYary[0], XYary[1], touchRadius);
                            //log(resAry);
                            if (resAry) {
                                touchControlPoint = resAry;
                            };
                        } catch (e) {
                            throw "DOWN " + e;
                        };
                        break;
                    case event.ACTION_UP:
                        //最后一个手指抬起。
                        //log("up");
                        touchControlPoint = undefined;

                        break;
                    case event.ACTION_POINTER_DOWN:

                        break;
                    case event.ACTION_POINTER_UP:
                        break;
                };
        };
    } catch (e) {
        throw "imgTouch: " + e;
    };
    if (touchControlPoint) {
        return true;
    };

    return ASX.touchListener(view, event);

}));

function setRectXY(rect, idAry, x, y) {
    x = sinon(Math.floor(x - idAry[1]), 0, MainImg.getWidth());
    y = sinon(Math.floor(y - idAry[2]), 0, MainImg.getHeight());
    //log(x,y);
    switch (idAry[0]) {
        case 0:
            if (rect.right != x && rect.bottom != y) {
                rect.left = x;
                rect.top = y;
            };
            break;
        case 1:
            if (rect.left != x && rect.bottom != y) {
                rect.right = x;
                rect.top = y;
            };
            break;
        case 2:
            if (rect.right != x && rect.top != y) {
                rect.left = x;
                rect.bottom = y;
            };
            break;
        case 3:
            if (rect.left != x && rect.top != y) {
                rect.right = x;
                rect.bottom = y;
            };
            break;
    };
};

function sinon(a, b, c) {
    return (a >= b && a < c) ? a : (a >= b ? c : b);
};


function isRectXY(rect, x, y, r) {
    let x1 = x - rect.left,
        y1 = y - rect.top,
        x2 = x - rect.right,
        y2 = y - rect.bottom;

    if (weiyi([x1, y1]) <= r) {
        return [0, Math.floor(x1), Math.floor(y1)];

    } else if (weiyi([x2, y1]) <= r) {
        return [1, Math.floor(x2), Math.floor(y1)];

    } else if (weiyi([x1, y2]) <= r) {
        return [2, Math.floor(x1), Math.floor(y2)];

    } else if (weiyi([x2, y2]) <= r) {
        return [3, Math.floor(x2), Math.floor(y2)];
    };

    return null;
};




ui.canvas.on("draw", function(canvas) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    canvas.drawARGB(255, 127, 127, 127)
    if (MainImg) {
        let scale = ASX.getScaling();
        let strokeWidth = 5 / scale;
        let TextSize = 75 / scale;
        let radius = 50 / scale;
        paint.setStrokeWidth(strokeWidth); //画笔边缘宽度
        paint1.setStrokeWidth(strokeWidth); //画笔边缘宽度
        paint2.setStrokeWidth(strokeWidth); //画笔边缘宽度
        paint.setTextSize(TextSize);
        paint1.setTextSize(TextSize);
        paint2.setTextSize(TextSize);
        //canvas.drawImage(MainImg, 0, 0, paint1);
        //canvas.setMatrix(canvasMatrix);
        canvas.setMatrix(ASX.matrix);
        // let matrix = canvas.getMatrix();
        //绘制背景色
        // matrix.postConcat(ASX.matrix);
        //canvas.setMatrix(matrix);

        canvas.drawImage(MainImg, 0, 0, paint);
        //图片宽高。
        canvas.drawText("w: " + MainImg.getWidth(), MainImg.getWidth(), MainImg.getHeight(), paint2);
        canvas.drawText("h: " + MainImg.getHeight(), MainImg.getWidth(), MainImg.getHeight() + TextSize, paint2);

        canvas.drawRect(imageRect, paint);
        canvas.drawText("w: " + Math.abs(imageRect.width()), imageRect.right, imageRect.bottom, paint2);
        canvas.drawText("h: " + Math.abs(imageRect.height()), imageRect.right, imageRect.bottom + TextSize, paint2);
        canvas.drawText("x: " + Math.abs(imageRect.left), imageRect.left, imageRect.top- TextSize, paint2);
        canvas.drawText("y: " + Math.abs(imageRect.top), imageRect.left, imageRect.top , paint2);
        canvas.drawPoint(imageRect.left, imageRect.top, paint1);
        canvas.drawPoint(imageRect.left, imageRect.bottom, paint1);
        canvas.drawPoint(imageRect.right, imageRect.top, paint1);
        canvas.drawPoint(imageRect.right, imageRect.bottom, paint1);
        canvas.drawCircle(imageRect.left, imageRect.top, radius, paint1);
        canvas.drawCircle(imageRect.left, imageRect.bottom, radius, paint1);
        canvas.drawCircle(imageRect.right, imageRect.top, radius, paint1);
        canvas.drawCircle(imageRect.right, imageRect.bottom, radius, paint1);

        canvas.setMatrix(new android.graphics.Matrix);
        paint2.setStrokeWidth(5); //画笔边缘宽度
        paint2.setTextSize(75);
        canvas.drawText(String(Math.floor(scale * 100) / 100), 0, 75, paint2);


    } else {
        canvas.drawText("请打开一个图片", 0, h / 2, paint1);
    };
});

ui.canvas.post(function() {
    let v = ui.canvas;
    //var rect=new android.graphics.Rect;
    //ui.canvas.getBoundsOnScreen(canvasRect);
    let w = v.getWidth(),
        h = v.getHeight();
    canvasRect.set(new android.graphics.RectF(0, 0, w, h));
    if (MainImg) {
        imageRect.set(new android.graphics.RectF(0, 0, MainImg.getWidth(), MainImg.getHeight()));
        canvasMatrix.setRectToRect(imageRect, canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
    };
    ASX.maxPointsListener();
});


function getTimeString() {
    return new java.text.SimpleDateFormat("yyyy_MM_dd_HH:mm:ss").format(new Date());
}


function getsd(s, ary) {
    //将数组内所有值的平方和开方等于s
    var sum = weiyi(ary);
    var S = (s / sum) || 0;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};

function weiyi(ary) {
    //数组所有值平方和开方
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

function kdfx(Y) {
    //数学二维坐标系xy,输入角度。
    var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
    var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
    return [x, y];
};

function ydfx(ary) {
    //数学二维坐标系xy,返回角度。
    var ary = getsd(1, ary);
    var x = ary[0],
        y = ary[1];
    var Y = Math.asin(y) / (2 * Math.PI) * 360;
    if (x < 0) {
        Y = 180 - Y;
    };
    return Y;
};

function showImage(img, isRec) {
    try {
        var Width = device.width,
            Height = device.height;
        if (context.resources.configuration.orientation == 2) {
            Width = device.height;
            Height = device.width;
        };
        sleep(100);
        var window1 = floaty.rawWindow(
            <frame w="{{Math.floor(device.width*0.7)}}px" h="{{Math.floor(device.height*0.7)}}px"alpha="0.9" gravity="center" bg="#888888">
                <img id="img" w="*"alpha="0.9" margin="5" gravity="center"/>
            </frame>
        );
        window1.setPosition(Width, Height);
        window1.setTouchable(false);
        window1.img.setSource(img);
        //window1.img.setAlpha(0.5);
        sleep(50);
        windowyidong([Width / 2 - window1.getWidth() / 2, Height, Width / 2 - window1.getWidth() / 2, Height * 0.3 - 66], window1, 50);
        sleep(2000);
        windowyidong([Width / 2 - window1.getWidth() / 2, Height * 0.3 - 66, Width / 2 - window1.getWidth() / 2, Height], window1, 50);
        window1.close();
        if (isRec) {
            img.recycle();
        };
    } catch (e) {
        toastLog(e)
    };

    function windowyidong(A, B, C) {
        var sx = A[2] - A[0],
            sy = A[3] - A[1];
        C = C || 75;
        var sd = weiyi(sx, sy) / C;
        var X = sx / sd,
            Y = sy / sd;
        var x = 0,
            y = 0;
        for (var i = 0; i < sd; i++) {
            x += X;
            y += Y;
            sleep(5);
            B.setPosition(A[0] + x, A[1] + y);
        }
        B.setPosition(A[2], A[3]);
    };

    function weiyi() {
        var num = 0;
        for (var i = 0; i < arguments.length; i++) {
            num += arguments[i] * arguments[i];
        }
        return Math.round(Math.sqrt(num) * 1000) / 1000
    };

};

function XYToMatrix(matrix, maxPoints) {
    //通过多点触控来设置matrix从而来缩放图像。
    //第2个参数。最大的手指数量。手指数量超过之后matrix将初始化。
    this.originalMatrix = matrix || new android.graphics.Matrix;
    this.matrix = new android.graphics.Matrix(this.originalMatrix);
    this.invertMatrix = new android.graphics.Matrix;
    this.matrix.invert(this.invertMatrix);
    this.getScaling = function(ary) {
        //获取缩放比例。
        ary = Array.isArray(ary) ? ary : [0, 0, 100, 100];
        try {
            var Ary = this.matrixPoints(this.matrix, ary);
            return this.weiyi([Ary[2] - Ary[0], Ary[3] - Ary[1]]) / this.weiyi(ary);
        } catch (e) {
            toastLog(e);
        };
    };
    this.maxPoints = maxPoints || 2;
    this.maxPointsListener = function() {
        this.matrix = new android.graphics.Matrix(this.originalMatrix);
        //this.invertMatrix = new android.graphics.Matrix;
        this.matrix.invert(this.invertMatrix);

    };
    this.Touch = {
        Matrix: this.matrix,
        PointStart: new Array,
        PointCurrent: new Array,

    };
    //new android.view.View.OnTouchListener();
    this.touchListener = (view, event) => {
        try {
            let W = view.getWidth();
            let H = view.getHeight();
            let PC = event.getPointerCount();
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

                        let Matrix = new android.graphics.Matrix();
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
                    log("CANCEL");
                    toast("触摸被系统拦截\n可能是三指截屏等功能");
                    this.Touch.PointStart = new Array;
                    this.Touch.PointCurrent = new Array;

                    break;
                case event.ACTION_OUTSIDE:
                    log("OUTSIDE");

                    break;
                default:
                    let I = event.getActionIndex();
                    let ID = event.getPointerId(I);
                    let X = event.getX(I);
                    let Y = event.getY(I);
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

                                let Matrix = new android.graphics.Matrix();
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

    };

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


function 加载图片(A) {
    if (files.isFile(A)) {
        imagePath = A;
        return images.read(A);
    };
    return null;
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








function 选择图片(fun) {
    ui.run(() => {
        importPackage(org.autojs.autojs.ui.explorer);
        importPackage(org.autojs.autojs.model.explorer);
        var explorerView = new ExplorerView(new android.view.ContextThemeWrapper(context, org.autojs.autojs.R.style.AppTheme));
        explorerView.setExplorer(Explorers.workspace(), ExplorerDirPage.createRoot("/sdcard"));
        explorerView.setDirectorySpanSize(2);
        var dialog = new org.autojs.autojs.theme.dialog.ThemeColorMaterialDialogBuilder(context)
            .title("选择图片文件")
            .customView(explorerView, false)
            .positiveText("取消")
            .build();
        explorerView.setOnItemClickListener(function(view, item) {
            if (nameToType(String(item.toScriptFile())) == "图片") {
                fun(String(item.toScriptFile()));
                dialog.dismiss();
            } else {
                toastLog("不是图片");
            };
        });
        com.stardust.app.DialogUtils.showDialog(dialog);
    });
};






function 媒体库选择(fun) {
    ui.run(function() {
        var ctx = activity;
        var window = new android.widget.PopupWindow();
        var view = XmlToView(
            <vertical padding="5">
                        <text text="选择图片" textSize="25sp" gravity="center"/>
                        <list id="list" w="*">
                            <vertical w="*" margin="5" bg={colors.toString(colors.GRAY)} gravity="center">
                                <img w="auto" h="auto" margin="6" src="file://{{filePath}}"/>
                                <text w="*" h="25" margin="2" text="{{title}}" textSize="20sp" line="1"  margin="5" gravity="center"/>
                            </vertical>
                        </list>
                    </vertical>
        );
        view.list.setDataSource(imagesPath);

        view.list.on("item_click", function(item) {
            threads.start(function() {
                dialogs.confirm("确定要打开文件", item.filePath, function(A) {
                    if (A) {
                        fun(item.filePath);
                        window.dismiss();
                    };
                });
            });
        });
        //log(view);
        window.setContentView(view);
        window.setWidth(device.width * 0.8);
        window.setHeight(device.height * 0.8);
        window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.LTGRAY));
        window.setFocusable(true);
        window.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, -1, -1);
    });
};





function XmlToView(xml) {
    runtime.ui.layoutInflater.setContext(context);
    return runtime.ui.layoutInflater.inflate(xml.toXMLString().toString(), null, true);
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
            //sleep(100);
        };
        cursor.moveToPrevious();

    }
    return Ary;
};