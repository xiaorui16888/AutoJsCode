"ui";
ui.layout(
    <vertical>
        <canvas id="canvas"/>
    </vertical>
);

var IMGUriAry = ['http://img.shu163.com/uploadfiles/wallpaper/2010/6/2010101306112568.jpg',
    'http://i0.hdslb.com/bfs/article/90cb53c5b41dbdff09f198b732a14417db85b5ca.jpg',
    'http://desk.wbsz.com/uploads/allimg/140916/co140916120306-0.jpg',
    'http://b-ssl.duitang.com/uploads/blog/201309/29/20130929153548_rECFe.jpeg',
    'http://img.pconline.com.cn/images/upload/upc/tx/softbbs/1010/08/c0/5441933_1286539377307_1024x1024soft.jpg',
    'http://uploads.5068.com/allimg/151111/48-151111113R2-51.jpg',
    'http://img.pconline.com.cn/images/upload/upc/tx/wallpaper/1302/04/c0/17980414_1359967901033.jpg',
    'http://pic1.win4000.com/wallpaper/0/5417cb13963e7.jpg?down',
    'http://pic1.win4000.com/wallpaper/2017-12-06/5a2752c57f47c.jpg?down',
    'http://uploads.5068.com/allimg/171104/1-1G104142608.jpg',
    'http://b-ssl.duitang.com/uploads/blog/201510/27/20151027194141_kHtKn.jpeg',
    'http://pic1.win4000.com/wallpaper/b/599a960329df8.jpg',
    'http://cdnq.duitang.com/uploads/item/201412/11/20141211222646_Kyjt2.jpeg',
    'http://www.91zhuti.com/uploads/131224/6-131224135R0T9.jpg',
    'http://i2.i557.com/wp-content/uploads/2018/03/1521143454.jpg?imageMogr2/interlace/1/crop/1920x1080',
    'http://img05.tooopen.com/images/20140603/sy_62176619341.jpg',
    'http://b-ssl.duitang.com/uploads/item/201601/02/20160102113322_jznev.jpeg',
    'http://pic1.win4000.com/wallpaper/a/598ac157c61d0.jpg',
    'http://pic33.photophoto.cn/20141112/0005018332875764_b.jpg',
    'http://uploads.5068.com/allimg/171026/1-1G0261Q229.jpg',
    'http://up.enterdesk.com/edpic/26/a5/40/26a5408a3f2f4c25a7752a0bf10ca390.jpg',
    'http://uploads.5068.com/allimg/1801/151-1P106093610.jpg',
    'http://pic13.photophoto.cn/20091202/0005018325716234_b.jpg',
    'http://b-ssl.duitang.com/uploads/item/201502/15/20150215103554_PjtxY.jpeg',
    'http://uploads.5068.com/allimg/1801/151-1P106094352.jpg',
    'http://tu.simei8.com:7788/pic102/10257-2.jpg',
    'http://uploads.5068.com/allimg/1712/151-1G22P92U6.jpg',
    'http://b-ssl.duitang.com/uploads/item/201707/08/20170708143034_tx2P5.png',
    'http://i2.hdslb.com/bfs/archive/178ee8fe958eaae8e452a55c6c58cf200228c164.jpg',
    'http://uploads.5068.com/allimg/1802/78-1P211141141.jpg'
];


//创建画笔
var paint = new Paint;
paint.setTextAlign(Paint.Align.CENTER);

var RY = 0;

//游戏参数
var gameSuccess = false,
    loadOK = false;
var IMG, rect, thread;
var imgAry = new Array,
    gameAry = new Array,
    gameWidth = 3,
    gameHeight = 3,
    imgWidth, imgHeight,
    theEndImg,
    BlankXY;


//载入大图片
if (0) {
    IMG = images.read("/storage/emulated/0/建记/图片/img01.jpg");
} else {
    thread = threads.start(function() {
        toastLog("正在加载图片");
        IMG = images.load(IMGUriAry[Math.floor(Math.random() * IMGUriAry.length)]);
        if (!IMG) {
            toastLog("网络连接异常");
            toastLog("或使用本地图片");
            exit();
        };
        toastLog("图片加载完成");
    });
};

threads.start(function() {
    while (true) {
        if (IMG) {
            //剪切大图片放到小图数组里
            imgWidth = IMG.getWidth() / gameWidth,
                imgHeight = IMG.getHeight() / gameHeight;
            for (var x = 0; x < gameWidth; x++) {
                var Ary = new Array;
                for (var y = 0; y < gameHeight; y++) {
                    Ary.push(images.clip(IMG, x * imgWidth, y * imgHeight, imgWidth, imgHeight));
                };
                imgAry.push(Ary);
            };
            //取出最后一个小图
            theEndImg = imgAry[imgAry.length - 1].pop();
            //游戏坐标数组
            for (var x = 0; x < gameWidth; x++) {
                var Ary = new Array;
                for (var y = 0; y < gameHeight; y++) {
                    Ary.push({
                        x: x,
                        y: y
                    });

                };
                gameAry.push(Ary);
            };


            //空白坐标。
            BlankXY = {
                x: gameWidth - 1,
                y: gameHeight - 1
            };

            //打乱图片
            thread = threads.start(gameAryReset);
            loadOK = true;
            break;
        };
        sleep(100);
    };
});

ui.canvas.on("draw", function(canvas) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    if (!loadOK) {
        RY += 20;
        if (RY >= 360) {
            RY = 0;
        };
        canvas.rotate(RY, w * 0.5, h * 0.52);
        paint.setStrokeWidth(5);
        paint.setStyle(Paint.Style.STROKE);
        canvas.drawCircle(w / 2, h * 0.48, w / 3, paint);
        canvas.setMatrix(new android.graphics.Matrix());
        canvas.rotate(-RY, w * 0.5, h * 0.52);
        paint.setStyle(Paint.Style.FILL);
        paint.setStrokeWidth(1);
        var size = 100;
        paint.setTextSize(size);
        canvas.drawText("正在下载图片", w / 2, h * 0.48 + 0.365 * size, paint);
        return;
    };
    var vw = w,
        vh = gameSuccess ? h : w,
        iw = IMG.getWidth(),
        ih = IMG.getHeight();
    var scale = (vw / vh < iw / ih ? vw / iw : vh / ih);
    var x = vw / vh < iw / ih ? 0 : vw / 2 - iw / 2 * scale;
    var y = vw / vh < iw / ih ? vh / 2 - ih / 2 * scale : 0;
    canvas.translate(x, gameSuccess ? y : ((h - w) / 2 + y));
    canvas.scale(scale, scale);

    canvas.drawImage(IMG, 0, 0, paint);
    if (!gameSuccess) {
        paint.setStyle(Paint.Style.FILL);
        paint.setARGB(200, 127, 127, 127);
        canvas.drawRect(android.graphics.RectF(0, 0, iw + 1, ih + 1), paint);
        paint.setStyle(Paint.Style.STROKE);
        canvas.drawRect(android.graphics.RectF(0, 0, iw + 1, ih + 1), paint);
        for (var x = 0; x < gameWidth; x++) {
            for (var y = 0; y < gameHeight; y++) {
                var xy = gameAry[x][y];
                var img = imgAry[xy.x][xy.y];
                if (img) {
                    canvas.drawImage(img, x * imgWidth, y * imgHeight, paint);
                    if (xy.x == x && xy.y == y) {
                        paint.setStrokeWidth(3);
                        paint.setColor(colors.GREEN);
                    } else {
                        paint.setStrokeWidth(1);
                        paint.setColor(colors.RED);
                    };
                    canvas.drawRect(x * imgWidth + 1, y * imgHeight + 1, (x + 1) * imgWidth - 1, (y + 1) * imgHeight - 1, paint);
                };
            };
        };
    };
    canvas.setMatrix(new android.graphics.Matrix());
    if (!gameSuccess) {
        paint.setStrokeWidth(5);
        rect = android.graphics.RectF(w / 100, h / 100, w - w / 100, h / 10);
        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(colors.RED);
        canvas.drawRect(rect, paint);

        paint.setStyle(Paint.Style.FILL);
        paint.setStrokeWidth(1);
        var size = 100;
        paint.setTextSize(size);
        canvas.drawText("重新开始", rect.centerX(), rect.centerY() + 0.365 * size, paint);
    };
    if (gameSuccess) {
        //canvas.drawARGB(63, 127, 127, 127);
        paint.setStrokeWidth(5);
        paint.setStyle(Paint.Style.FILL);
        paint.setColor(colors.GREEN);
        var size = 250;
        paint.setTextSize(size);
        canvas.drawText("OK", w * 0.5, h * 0.7 + 0.365 * size, paint);
        var size = 150;
        paint.setTextSize(size);
        canvas.drawText("重新开始", w * 0.5, h * 0.85 + 0.365 * size, paint);
        canvas.drawLine(0, h * 0.9, w, h * 0.9, paint);
    };
});

var Xw, Yh;
ui.canvas.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            Xw = event.getX();
            Yh = event.getY();
            break;
        case event.ACTION_MOVE:
            break;
        case event.ACTION_UP:
            if (!loadOK) {
                break;
            };
            if (thread && thread.isAlive()) {
                break;
            };
            if (!gameSuccess) {
                if (rect.contains(event.getX(), event.getY())) {
                    thread = threads.start(gameAryReset);
                };
                if (weiyi([event.getX() - Xw, event.getY() - Yh]) >= 5) {
                    if (Math.abs(event.getX() - Xw) <= Math.abs(event.getY() - Yh)) {
                        if (event.getY() - Yh < 0) {
                            //toast(1);
                            if (BlankXY.y < gameHeight - 1) {

                                var A = gameAry[BlankXY.x][BlankXY.y],
                                    B = gameAry[BlankXY.x][BlankXY.y + 1];
                                gameAry[BlankXY.x][BlankXY.y] = B;
                                gameAry[BlankXY.x][BlankXY.y + 1] = A;
                                BlankXY.y++;
                            };
                        } else {
                            //toast(2);
                            if (BlankXY.y > 0) {
                                var A = gameAry[BlankXY.x][BlankXY.y],
                                    B = gameAry[BlankXY.x][BlankXY.y - 1];
                                gameAry[BlankXY.x][BlankXY.y] = B;
                                gameAry[BlankXY.x][BlankXY.y - 1] = A;
                                BlankXY.y--;

                            };
                        };
                    } else {
                        if (event.getX() - Xw < 0) {
                            //toast(3);
                            if (BlankXY.x < gameWidth - 1) {
                                var A = gameAry[BlankXY.x][BlankXY.y],
                                    B = gameAry[BlankXY.x + 1][BlankXY.y];
                                gameAry[BlankXY.x][BlankXY.y] = B;
                                gameAry[BlankXY.x + 1][BlankXY.y] = A;
                                BlankXY.x++;

                            };
                        } else {
                            //toast(4);
                            if (BlankXY.x > 0) {
                                var A = gameAry[BlankXY.x][BlankXY.y],
                                    B = gameAry[BlankXY.x - 1][BlankXY.y];
                                gameAry[BlankXY.x][BlankXY.y] = B;
                                gameAry[BlankXY.x - 1][BlankXY.y] = A;
                                BlankXY.x--;
                            };
                        };
                    };
                };
                if (gameisOK()) {
                    toastLog("OK");
                    gameSuccess = true;
                    imgAry[imgAry.length - 1].push(theEndImg);
                };
            } else {
                if (Yh > view.height * 0.65 && event.getY() > view.height * 0.65) {
                    theEndImg = imgAry[imgAry.length - 1].pop();
                    gameSuccess = false;
                    thread = threads.start(gameAryReset);

                };
            };
            break;
    };
    return true;
});

events.on("exit", function() {
    log("结束运行");
    for (let x = 0; x < imgAry.length; x++) {
        var ary = imgAry[x];
        for (let y = 0; y < imgAry.length; y++) {
            ary[y].recycle();
        };
    };
    IMG.recycle();
    theEndImg.recycle();
});

function deepCopy(obj) {
    if (typeof obj != 'object') {
        return obj;
    }
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = this.deepCopy(obj[attr]);
    }
    return newobj;
};

function weiyi(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
}

function gameisOK() {
    for (var x = 0; x < gameWidth; x++) {
        for (var y = 0; y < gameHeight; y++) {
            var A = gameAry[x][y];
            //log(x, y, A);
            if ((A.x != x || A.y != y)) {
                return false;
            };
        };
    };
    return true;
};


function gameAryReset() {
    //打乱图片
    /*
    for (var i = 0; i < 10; i++) {
        var X = Math.floor(Math.random() * gameWidth),
            Y = Math.floor(Math.random() * gameHeight),
            x = Math.floor(Math.random() * gameWidth),
            y = Math.floor(Math.random() * gameHeight);
        var A = gameAry[X][Y],
            B = gameAry[x][y];
        gameAry[X][Y] = B;
        gameAry[x][y] = A;
        if (!imgAry[B.x][B.y]) {
            BlankXY = {
                x: X,
                y: Y
            };
        };
        if (!imgAry[A.x][A.y]) {
            BlankXY = {
                x: x,
                y: y
            };
        };
    };
    */

    for (var i = 0; i < gameWidth * gameHeight * 10; i++) {
        switch (Math.floor(Math.random() * 4) + 1) {
            case 1:
                if (BlankXY.y < gameHeight - 1) {

                    var A = gameAry[BlankXY.x][BlankXY.y],
                        B = gameAry[BlankXY.x][BlankXY.y + 1];
                    gameAry[BlankXY.x][BlankXY.y] = B;
                    gameAry[BlankXY.x][BlankXY.y + 1] = A;
                    BlankXY.y++;
                } else {
                    i--;
                };
                break;
            case 2:
                if (BlankXY.y > 0) {
                    var A = gameAry[BlankXY.x][BlankXY.y],
                        B = gameAry[BlankXY.x][BlankXY.y - 1];
                    gameAry[BlankXY.x][BlankXY.y] = B;
                    gameAry[BlankXY.x][BlankXY.y - 1] = A;
                    BlankXY.y--;

                } else {
                    i--;
                };
                break;
            case 3:
                if (BlankXY.x < gameWidth - 1) {
                    var A = gameAry[BlankXY.x][BlankXY.y],
                        B = gameAry[BlankXY.x + 1][BlankXY.y];
                    gameAry[BlankXY.x][BlankXY.y] = B;
                    gameAry[BlankXY.x + 1][BlankXY.y] = A;
                    BlankXY.x++;

                } else {
                    i--;
                };
                break;
            case 4:
                if (BlankXY.x > 0) {
                    var A = gameAry[BlankXY.x][BlankXY.y],
                        B = gameAry[BlankXY.x - 1][BlankXY.y];
                    gameAry[BlankXY.x][BlankXY.y] = B;
                    gameAry[BlankXY.x - 1][BlankXY.y] = A;
                    BlankXY.x--;
                } else {
                    i--;
                };
                break;
        };
        sleep(1);
    };
};