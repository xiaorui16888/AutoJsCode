"ui";

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="色组生成器" h="40dp"/>
            </appbar>
            <canvas id="canvas" margin="5" layout_weight="1"/>
            <horizontal>
                <vertical layout_weight="1"h="100dp">
                    <button id="set_maxColors" text="最大点数" w="*" layout_weight="1"/>
                    <button id="set_A" text="生成找色代码" w="*" layout_weight="1"/>
                </vertical>
                <vertical layout_weight="1"h="100dp">
                    <button id="to_" text="移动切换" w="*" layout_weight="1"/>
                    <button id="toAry" text="保存数组" w="*" layout_weight="1"/>
                </vertical>
                <vertical layout_weight="1"h="100dp">
                    <button id="set_J" text="记点模式" w="*" layout_weight="1"/>
                    <button id="set_go" text="重置" w="*" layout_weight="1"/>
                </vertical>
            </horizontal>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <text text="颜色匹配函数" textSize="25sp" margin="5" gravity="center"/>
            <input id="in_fun" w="*" h="*"  layout_weight="1" textSize="16sp" bg="#dddddd" margin="5"/>
            <button id="save_fun" text="保存函数" w="*"/>
            <button id="open_img" text="打开图片" w="*"/>
        </vertical>
    </drawer>
);


toastLog("注意侧拉菜单");
//var img = images.read("/storage/emulated/0/建记/图片/img04.jpg");
var canvasAD = new 图片查看(ui.canvas);

threads.start(function() {
    console.show();
});


//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.in_fun.setText(canvasAD.isColor.toString());

ui.save_fun.click(function() {
    var txt = ui.in_fun.getText();
    if (txt) {
        try {
            var fun = eval("(" + txt + ")");

        } catch (e) {
            toastLog(e);
        };
        if (typeof fun == "function") {
            canvasAD.isColor = fun;
            toast("OK");
        } else {
            toastLog("不是一个函数");
        };
    };
});

ui.open_img.click(function() {

    选择图片(function(path) {
        var IMG = 加载图片(path);
        canvasAD.setImg(IMG);
        Script_data.imgPath = path;

        //IMG.recycle();
    });
});

ui.set_maxColors.click(function() {
    var max = canvasAD.maxColors;
    threads.start(function() {
        var num = parseInt(dialogs.prompt("修改最大点数", String(max)));
        if (num > 20) {
            canvasAD.maxColors = num;
            Script_data.max = num;
            toastLog("已修改");
        } else {
            toastLog("点数过少");
        };
    });
});

ui.set_A.click(function() {
    var colorData=canvasAD.getColors();
    setClip("var colorData=" + JSON.stringify(colorData) + ";\nvar p = images.findMultiColors(img, colorData.color, colorData.ary);");
    if(colorData.ary.length){
    toast("已复制");
    }else{
    toast("数据为空，失败");
    };

});


ui.to_.click(function() {
    canvasAD.toMode();

});

ui.toAry.click(function() {
    
    var colorData=canvasAD.getColors();
    setClip(JSON.stringify(colorData));
    if(colorData.ary.length){
    toast("已复制");
    }else{
    toast("数据为空，失败");
    };
});

ui.set_J.click(function() {
    canvasAD.colorMode();
});

ui.set_go.click(function() {
    canvasAD.resetColor();

});



var storage = storages.create("取色_多点");
var Script_data = storage.get("data", {});
events.on("exit", function() {
    Script_data.fun = canvasAD.isColor.toString();

    storage.put("data", Script_data);
});

if (Script_data.fun) {
    try {
        var fun = eval("(" + Script_data.fun + ")");

    } catch (e) {
        toastLog(e);
    };
    if (typeof fun == "function") {
        canvasAD.isColor = fun;
        toast("OK");
    };
};

if (Script_data.max) {
    canvasAD.maxColors = parseInt(Script_data.max);
};

thread = threads.start(function() {
    sleep(1000);
    if (Script_data.imgPath) {
        var IMG = 加载图片(Script_data.imgPath);
        canvasAD.setImg(IMG);
    };
});


var fileType = {
    文本: {
        img: "format_text.png",
        ends: ["js", "txt", "json"]
    },
    图片: {
        img: "format_picture.png",
        ends: ["png", "jpg"]
    },
    音乐: {
        img: "format_music.png",
        ends: ["mp3", "m4a"]
    },
    视频: {
        img: "format_media.png",
        ends: ["mp4"]
    },
    安装包: {
        img: "format_apk.png",
        ends: ["apk"]
    },
    压缩包: {
        img: "format_zip.png",
        ends: ["zip"]
    },
    数据: {
        img: "format_unkown.png",
        ends: ["abc"]
    }
};

function nameToType(name) {
    var Extension = name.split(".").pop();
    for (var i in fileType) {
        for (var a = 0; a < fileType[i].ends.length; a++) {
            if (Extension == fileType[i].ends[a]) {
                return i;
            };
        }
    };
    return "unkown";
};

function 加载图片(A) {
    if (files.isFile(A)) {
        imagePath = A;
        return images.read(A);
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


function 图片查看(canvasView, img) {
    this.maxColors = 300;
    this.mode = 0;
    this.toMode = function() {
        if (this.mode == 0) {
            this.mode = 1;
        } else {
            this.mode = 0;
        };
    };

    this.isColor = function(color) {
        return colors.isSimilar(color, "#ff0000", 127);
    };

    this.view = {
        x: canvasView.getX(),
        y: canvasView.getY(),
        w: canvasView.getWidth(),
        h: canvasView.getHeight()
    };
    this.canvasRect = new android.graphics.RectF(0, 0, this.view.w || device.width, this.view.h || device.height);
    this.paint = new Paint;
    this.paint.setTextAlign(Paint.Align.CENTER);
    this.paint.setStrokeWidth(5);
    this.paint.setARGB(127, 0, 0, 0);
    //this.paint.setStyle(Paint.Style.STROKE);
    this.paint.setStyle(Paint.Style.FILL);
    this.textSize = 20;
    this.paint.setTextSize(this.textSize);
    this.matrix = new android.graphics.Matrix();
    this.imginvertMatrix = new android.graphics.Matrix();
    this.imgRect;
    this.colorsMatrix = new android.graphics.Matrix();
    this.colorsinvertMatrix = new android.graphics.Matrix();
    this.colorsData = {
        x: 0,
        y: 0,
        first: false,
        color: 0,
        ary: new Array
    };
    this.PointsAry = {
        rectAry: new Array,
        XYAry: new Array,
        imgAry: new Array
    };

    this.color = {
        x: 0,
        y: 0,
        first: false,
        color: 0,
        ary: new Array
    };

    this.colorMode = function() {
        threads.start(new java.lang.Runnable(function() {
            console.show();
        }));
        this.mode = 2;
        toastLog("记点模式");
    };
    this.resetColor = function() {
        this.color.first = false;
        this.color.ary = new Array;
        toastLog("重置");
    };

    this.getColors = function() {
        if (this.mode == 0 || this.mode == 1) {
            return {
                x:this.colorsData.x,
                y:this.colorsData.y,
                color: this.colorsData.color,
                ary: this.colorsData.ary
            };
        } else if (this.mode == 2) {
            return {
                x:this.color.x,
                y:this.color.y,
                color: this.color.color,
                ary: this.color.ary
            };
        };
    };

    if (img) {
        this.imgRect = new android.graphics.RectF(0, 0, img.getWidth(), img.getHeight());
        this.matrix.setRectToRect(this.imgRect, this.canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
    };

    this.RY = {
        Y: 0
    };

    this.setImg = function(IMG) {
        var mg = img;
        img = IMG.clone();
        //mg.recycle();
        this.imgToCenter();
        this.colorsToCenter();
        this.textSize = 20;
        this.paint.setTextSize(this.textSize);
    };

    this.imgToCenter = function() {
        if (img) {
            this.imgRect = new android.graphics.RectF(0, 0, img.getWidth(), img.getHeight());
            this.view = {
                x: canvasView.getX(),
                y: canvasView.getY(),
                w: canvasView.getWidth(),
                h: canvasView.getHeight()
            };
            this.canvasRect = new android.graphics.RectF(0, 0, this.view.w, this.view.h);
            //this.matrix = new android.graphics.Matrix();
            this.matrix.setRectToRect(this.imgRect, this.canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
            this.matrix.invert(this.imginvertMatrix);
        };
    };

    this.colorsToCenter = function() {
        if (img) {
            this.imgRect = new android.graphics.RectF(0, 0, img.getWidth(), img.getHeight());
            this.view = {
                x: canvasView.getX(),
                y: canvasView.getY(),
                w: canvasView.getWidth(),
                h: canvasView.getHeight()
            };
            this.canvasRect = new android.graphics.RectF(0, 0, this.view.w, this.view.h);
            //this.matrix = new android.graphics.Matrix();
            this.colorsMatrix.setRectToRect(this.imgRect, this.canvasRect, android.graphics.Matrix.ScaleToFit.CENTER);
            this.colorsMatrix.invert(this.imginvertMatrix);
        };
    };

    this.maxPoints = 2;
    this.Touch = {
        PointStart: new Array,
        PointCurrent: new Array,
        Matrix: new android.graphics.Matrix()
    };

    canvasView.on("draw", (canvas) => {
        canvas.drawARGB(255, 127, 127, 127);
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        if (img) {
            this.textSize = 20;
            this.paint.setTextSize(this.textSize);

            this.paint.setARGB(255, 128, 0, 0);
            canvas.drawImage(img, this.matrix, this.paint);
            if (this.mode == 2) {
                return
            };
            this.drawRect(canvas, this.imgRect, this.paint, this.colorsMatrix);
            this.drawPoints(canvas, this.PointsAry.XYAry, this.paint);
            if (img) {
                this.mainCount();
            };
        } else {
            this.Loading(canvas, this.paint, this.RY);
        };
    });

    this.drawRect = function(canvas, rect, paint, matrix) {
        paint.setARGB(255, 0, 255, 0);
        paint.setStrokeWidth(5);
        let X = rect.left,
            Y = rect.top,
            x = rect.right,
            y = rect.bottom;
        let ary = this.matrixPoints(matrix, [X, Y, x, Y, X, Y, X, y, X, y, x, y, x, Y, x, y]);
        canvas.drawLines(ary, paint);
    };

    this.drawPoints = function(canvas, ary, paint) {
        this.paint.setStrokeWidth(10);
        for (var i = 0; i < ary.length; i++) {
            paint.setColor(this.反色(ary[i].color));
            canvas.drawPoint(ary[i].x, ary[i].y, paint);
        };
    };

    this.countPoints = function(ary) {
        return this.matrixPoints(this.imginvertMatrix, this.matrixPoints(this.colorsMatrix, ary));
    };

    this.startAry = function(rect) {
        let X = rect.left,
            Y = rect.top,
            x = rect.right,
            y = rect.bottom;
        let a = this.countPoints([X, Y, x, Y, X, y]);
        let x_ = this.weiyi([a[0] - a[2], a[1] - a[3]]);
        let y_ = this.weiyi([a[0] - a[4], a[1] - a[5]]);
        let w = x - X,
            h = y - Y;
        let M = this.startPoints(w, h, this.maxColors);

        let A = this.weiyi([w, h]);
        let B = this.weiyi([x_, y_]);
        let D = B > A ? M : (B < this.weiyi(M) ? [x_, y_] : M);
        let cx = Math.abs(D[0]);
        let cy = Math.abs(D[1]);
        let sx = (w / cx) / 2,
            sy = (h / cy) / 2;
        var Ary = new Array;
        for (var iy = 0; iy < cy; iy++) {
            for (var ix = 0; ix < cx; ix++) {
                Ary.push(sx + sx * 2 * ix, sy + sy * 2 * iy);
            };
        };
        return this.matrixPoints(this.colorsMatrix, Ary);
    };

    this.startPoints = function(w, h, d) {
        var c = Math.sqrt(w * h / d);
        return [w / c, h / c];
    };


    this.toColorsAry = function(ary, matrix, img, fun) {
        let w = img.getWidth(),
            h = img.getHeight();
        let Ary = this.matrixPoints(matrix, ary);
        var Bry = new Array;
        this.colorsData.first = false;
        this.colorsData.ary = new Array;
        for (let i = 0; i < Ary.length; i += 2) {
            let x = Math.floor(Ary[i]),
                y = Math.floor(Ary[i + 1]);
            if (!(0 <= x && x < w && 0 <= y && y < h)) {
                continue;
            };
            let color = img.pixel(x, y);
            if (fun(color)) {
                Bry.push({
                    x: ary[i],
                    y: ary[i + 1],
                    color: color
                });
                if (!this.colorsData.first) {
                    this.colorsData.first = true;
                    this.colorsData.x = x;
                    this.colorsData.y = y;
                    this.colorsData.color = color;
                } else {
                    this.colorsData.ary.push([x - this.colorsData.x, y - this.colorsData.y, color]);
                };
            };
        };
        return Bry;
    };

    this.mainCount = function() {
        var ary = this.startAry(this.imgRect);
        this.PointsAry.XYAry = this.toColorsAry(ary, this.imginvertMatrix, img, this.isColor);
    };



    this.Loading = function(canvas, paint, RY) {
        var w = canvas.getWidth();
        var h = canvas.getHeight();
        RY.Y += 5;
        if (RY.Y >= 360) {
            RY.Y = 0;
        };
        canvas.rotate(RY.Y, w * 0.5, h * 0.52);
        paint.setStrokeWidth(5);
        paint.setStyle(Paint.Style.STROKE);
        canvas.drawCircle(w / 2, h * 0.48, w / 3, paint);
        canvas.setMatrix(new android.graphics.Matrix());
        canvas.rotate(-RY.Y, w * 0.5, h * 0.52);
        paint.setStyle(Paint.Style.FILL);
        paint.setStrokeWidth(1);
        var size = 100;
        paint.setTextSize(size);
        canvas.drawText("侧拉菜单中打开一个图片", w / 2, h * 0.48 + 0.365 * size, paint);
    };

    this.反色 = function(color) {
        return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
    };


    this.imgTouch = (view, event) => {
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
                            this.imgToCenter();
                            break;
                        };

                        var matrix = new android.graphics.Matrix();
                        matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                        this.matrix = new android.graphics.Matrix();
                        this.matrix.setConcat(matrix, this.Touch.Matrix);
                        //进行矩阵运算并刷新矩阵。
                        this.matrix.invert(this.imginvertMatrix);
                        //反矩阵
                    } catch (e) {
                        log("MOVE " + e);
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
                                toastLog("DOWN " + e);
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
                                    this.imgToCenter();
                                    break;
                                };

                                var matrix = new android.graphics.Matrix();
                                matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                                this.matrix = new android.graphics.Matrix();
                                this.matrix.setConcat(matrix, this.Touch.Matrix);
                                //进行矩阵运算并刷新矩阵。
                                this.matrix.invert(this.imginvertMatrix);
                                //反矩阵
                            } catch (e) {
                                log("P_DOWN " + e);
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
                                log("P_UP " + e);
                            };
                            break;
                    };
            };
        } catch (e) {
            log("0: " + e);
        };

        return true;

    };
    this.colorsTouch = (view, event) => {
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
                            this.colorsToCenter();
                            break;
                        };

                        var matrix = new android.graphics.Matrix();
                        matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                        this.colorsMatrix = new android.graphics.Matrix();
                        this.colorsMatrix.setConcat(matrix, this.Touch.Matrix);
                        //进行矩阵运算并刷新矩阵。
                        this.colorsMatrix.invert(this.colorsinvertMatrix);
                        //反矩阵
                    } catch (e) {
                        log("MOVE " + e);
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
                                this.Touch.Matrix = this.colorsMatrix;
                                //log(this.Touch.Matrix);
                            } catch (e) {
                                toastLog("DOWN " + e);
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
                                this.Touch.Matrix = this.colorsMatrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                //保存坐标的数组。

                                if (PC > this.maxPoints) { //手指数大于4个化为原始矩阵虽然记录坐标信息，但是不进行矩阵操作。
                                    this.colorsToCenter();
                                    break;
                                };

                                var matrix = new android.graphics.Matrix();
                                matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                                this.colorsMatrix = new android.graphics.Matrix();
                                this.colorsMatrix.setConcat(matrix, this.Touch.Matrix);
                                //进行矩阵运算并刷新矩阵。
                                this.colorsMatrix.invert(this.colorsinvertMatrix);
                                //反矩阵
                            } catch (e) {
                                log("P_DOWN " + e);
                            };

                            break;
                        case event.ACTION_POINTER_UP:
                            log("POINTER_UP");
                            try {
                                this.Touch.Matrix = this.colorsMatrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                this.Touch.PointStart.splice(I * 2, 2);
                                this.Touch.PointCurrent.splice(I * 2, 2);

                            } catch (e) {
                                log("P_UP " + e);
                            };
                            break;
                    };
            };
        } catch (e) {
            log("0: " + e);
        };

        return true;

    };
    this.colorTouch = (view, event) => {
        try {
            var W = view.getWidth();
            var H = view.getHeight();
            var PC = event.getPointerCount();
            switch (event.getActionMasked()) {
                case event.ACTION_MOVE:
                    break;
                case event.ACTION_CANCEL:
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
                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            let Ary = this.matrixPoints(this.imginvertMatrix, [X, Y]);
                            let x = Math.floor(Ary[0]),
                                y = Math.floor(Ary[1]);
                            if (!this.color.first) {
                                this.color.first = true;
                                this.color.x = x;
                                this.color.y = y;
                                this.color.color = img.pixel(x, y);
                                log(this.color.color);
                            } else {
                                this.color.ary.push([x - this.color.x, y - this.color.y, img.pixel(x, y)]);
                                log(this.color.ary[this.color.ary.length - 1]);
                            };
                            break;
                        case event.ACTION_POINTER_DOWN:
                            break;
                        case event.ACTION_POINTER_UP:
                            break;
                    };
            };
        } catch (e) {
            log("0: " + e);
        };

        return true;

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
    this.matrixPoints = function(matrix, ary) {
        var ary = this.toJavaArray("float", ary);
        matrix.mapPoints(ary);
        return this.toJsArray(ary);
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



    canvasView.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {

        if (this.mode == 0) {
            this.imgTouch(view, event);
        } else if (this.mode == 1) {
            this.colorsTouch(view, event);
        } else if (this.mode == 2) {
            this.colorTouch(view, event);
        };
        return true;
    }));


};