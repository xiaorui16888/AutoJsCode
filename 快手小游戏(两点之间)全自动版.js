/**
 *作者QQ: 1811588980
 *完成时间: 2019年3月7日 下午9:40:27
 *测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920(目前只适用于这个屏幕)
 *API: 24(自动操作安卓7.0以上)
 *备注: 只允许已授权的人使用。不允许借予他人。一经发现打死你和他。
 *用法: 适用游戏(快手小游戏两点之间) 使用方法：直接开启脚本。(最好两点之间是你常玩的游戏,要不然找不到);
 *本脚本是全自动的。会自动认输的。7秒没找到方法自动认输。
 **/



var bc = "#ff029eab"; //底色。
//var fs /*4个方向*/ = [1, 0, 0, 1, -1, 0, 0, -1];

//  地图
//[ [ 0, 0, 1, 0, 1 ],
//  [ 0, 2, 0, 0, 3 ],
//  [ 0, 0, 0, 0, 4 ],
//  [ 0, 0, 0, 0, 0 ],
//  [ 0, 2, 0, 3, 4 ] ];

auto();
requestScreenCapture();
launchApp("快手小游戏");


onClick();


function onClick() {
            try {
                Main();
            } catch (e) {
                toastLog(JSON.stringify(ER_mss(e)));
            };
};

var paint = new Paint(5);
paint.setStrokeWidth(5);
var size = 80;
paint.setTextSize(size);
paint.setTextAlign(Paint.Align.CENTER);


function j点击(UiObject, M) {
    if (UiObject) {
        if (M) {
            var rect = UiObject.bounds();
            return click(rect.centerX(), rect.centerY());
        } else {
            if (UiObject.clickable()) {
                return UiObject.click();
            } else {
                return arguments.callee(UiObject.parent());
            };
        };
    };
};


function Main() {
    while (true) {
        if (text("推荐游戏").exists()) {
            j点击(text("两点之间").findOne(200));
            sleep(100);
            continue;
        };
        if (text("对方已退出").exists()) {
            back();
            sleep(100);
            continue;
        };
        if (j点击(text("对方已准备好，点击再战").findOne(200))) {
            sleep(100);
            continue;
        };
        if (j点击(text("换个对手").findOne(200))) {
            sleep(100);
            continue;
        };



        //var img = images.read("./ic_2.jpg");
        var img = captureScreen();
        var canvas = new Canvas(img);

        //{"x":540,"y":990,"color":-16605525,"colorString":"#ff029eab"}
        //中心
        var fx = 202,
            fy = 652,
            ex = 879,
            ey = 1328; //起始坐标。

        var AW = 5,
            AH = 5;
        var sx = (ex - fx) / (AW - 1),
            sy = (ey - fy) / (AH - 1); //位差


        var colAry = new Array; //记录相通颜色坐标。
        var Ary = new Array;
        var PtAry = new Array;

        if (getGameData()) {
            toastLog(AW + "图");
            var OK = false;

            var FirstPt = PtAry[0];
            log(FirstPt);
            //第一条线。
            var x = FirstPt[0],
                y = FirstPt[1]
            let startTime = new Date().getTime();
            let TimeString = getTimeString(startTime);
            //images.save(img, "/sdcard/两点之间2/img/OK_" + M + "_" + TimeString + ".jpg", "jpg", 50);
            var resultLines;
            var thread2 = threads.start(function() {
                resultLines = DFS([
                    [x, y]
                ], x, y, FirstPt[2], FirstPt[3], 0);
                //开始走这条线上的点。
            });
            var thread3 = threads.start(function() {
                sleep(7000);
                if (!(thread2 ? !thread2.isAlive() : true)) { //线程运行中。
                    OK = true;
                    thread2.interrupt();
                    var bounds = new android.graphics.Rect(21, 22, 123, 124);
                    click(bounds.centerX(), bounds.centerY());
                    j点击(text("认输退出").findOne(300));
                    sleep(300);
                    j点击(text("回到首页").findOne(300));
                    sleep(500);
                    toastLog("认输");
                    //onClick();
                    //continue;
                };
            });
            thread2.join();
            if (OK) {
                thread3.join();
            };
            if (!(thread3 ? !thread3.isAlive() : true)) { //线程运行中。

                thread3.interrupt();
            };
            log(resultLines);
            //log(Ary);
            if (resultLines&&!OK) {
                toastLog("成功");
                let TotalTime = (new Date().getTime() - startTime) / 1000;
                //let Text = String(M + "用时: " + TotalTime + "秒");
                //toastLog(Text);
                gestureResultLines(resultLines, fx, fy, sx, sy);
                //drawResultLines(canvas, resultLines, paint, colAry, fx, fy, sx, sy);
                //paint.setColor(colors.BLUE);
                //canvas.drawText(Text, 540, 350, paint);
                //var toImg = canvas.toImage();
                //images.save(toImg, "/sdcard/两点之间2/OK/OK_" + M + "_" + TimeString + ".jpg", "jpg", 50);
                sleep(100);
            } else {
                //toastLog("没办法");
            };
        };

    };

    function getGameData() {
        //{"x":202,"y":653,"color":-16671065,"colorString":"#ff019ea7"}
        //{"x":878,"y":1328,"color":-16736082,"colorString":"#ff00a0ae"}
        //5*5
        fx = 202;
        fy = 652;
        ex = 879;
        ey = 1328; //起始坐标。

        AW = 5;
        AH = 5;
        sx = (ex - fx) / (AW - 1);
        sy = (ey - fy) / (AH - 1); //位差

        if (getGameData2() && PtAry.length == AW - 1) {
            return true;

        } else {
            Ary = new Array;
            PtAry = new Array;
            colAry = new Array;
        };

        //{"x":201,"y":652,"color":-16671065,"colorString":"#ff019ea7"}
        //{"x":878,"y":1328,"color":-16736082,"colorString":"#ff00a0ae"}
        //6*6
        fx = 202;
        fy = 652;
        ex = 879;
        ey = 1328; //起始坐标。
        AW = 6;
        AH = 6;
        sx = (ex - fx) / (AW - 1);
        sy = (ey - fy) / (AH - 1); //位差
        if (getGameData2() && PtAry.length == AW - 1) {
            return true;

        } else {
            Ary = new Array;
            PtAry = new Array;
            colAry = new Array;
        };
        //{"x":185,"y":632,"color":-16671065,"colorString":"#ff019ea7"}
        //{"x":896,"y":1343,"color":-16736082,"colorString":"#ff00a0ae"}
        //7*7
        fx = 185;
        fy = 632;
        ex = 896;
        ey = 1343; //起始坐标。
        AW = 7;
        AH = 7;
        sx = (ex - fx) / (AW - 1);
        sy = (ey - fy) / (AH - 1); //位差

        if (getGameData2() && PtAry.length == AW - 1) {
            return true;

        } else {
            Ary = new Array;
            PtAry = new Array;
            colAry = new Array;
        };
        //{"x":144,"y":591,"color":-3597027,"colorString":"#ffc91d1d"}
        //{"x":935,"y":1380,"color":-16736082,"colorString":"#ff00a0ae"}
        //8*8
        fx = 144;
        fy = 591;
        ex = 935;
        ey = 1380; //起始坐标。
        AW = 8;
        AH = 8;
        sx = (ex - fx) / (AW - 1);
        sy = (ey - fy) / (AH - 1); //位差

        if (getGameData2() && PtAry.length == AW - 1) {
            return true;

        } else {
            Ary = new Array;
            PtAry = new Array;
            colAry = new Array;
        };
        return false;

        function getGameData2() {
            for (let iy = 0; iy < AW; iy++) {
                let ary = new Array;
                for (let ix = 0; ix < AH; ix++) {
                    let color = img.pixel(fx + sx * ix, fy + sy * iy);
                    if (colors.isSimilar(color, bc)) {
                        ary.push(0);
                    } else {
                        let i = colAry.findIndex(function(v) {
                            return colors.isSimilar(v, color);
                        });
                        if (i === -1) {
                            colAry.push(color);
                            ary.push(colAry.length);
                            PtAry.push([ix, iy]);
                        } else {
                            ary.push(i + 1);
                            if (PtAry[i].length < 3) {
                                PtAry[i].push(ix, iy);
                            } else {
                                return false;
                            };
                        };
                    };
                };
                Ary.push(ary);
            };
            log(Ary);
            log(PtAry);
            return true;
        };
    };


    function gestureResultLines(resultLines, fx, fy, sx, sy) {
        for (var ii = 0; ii < resultLines.length; ii++) {
            gestureLine(resultLines[ii], fx, fy, sx, sy);
            //一条线。
        };
    };

    function gestureLine(ar, fx, fy, sx, sy) {
        gesture.apply(null, SToXY(ar, fx, fy, sx, sy));
    };

    function SToXY(ar, fx, fy, sx, sy) {
        var result = [ar.length * 150];
        var ar = ar.map(function(A) {
            //线上的每个点。
            let ax = A[0] * sx + fx;
            let ay = A[1] * sy + fy;
            return [ax, ay];
        });
        return result.concat(ar);
    };



    function drawResultLines(canvas, resultLines, p, colAry, fx, fy, sx, sy) {
        for (var ii = 0; ii < resultLines.length; ii++) {
            var ar = resultLines[ii];
            //一条线。
            drawLine(canvas, ar, p, colAry[ii], fx, fy, sx, sy);
        };
    };

    function drawLine(canvas, ar, p, color, fx, fy, sx, sy) {
        p.setColor(color);
        for (var i = 1; i < ar.length; i++) {
            //线上的每个点。
            let ax = ar[i - 1][0] * sx + fx;
            let ay = ar[i - 1][1] * sy + fy;
            let bx = ar[i][0] * sx + fx;
            let by = ar[i][1] * sy + fy;

            canvas.drawLine(ax, ay, bx, by, p);
        };
    };

    //距离排序。将点距离短的优先。
    function DistanceSort(Ary) {



    };






    //是否有空位？
    function isNoVacancy(Ary) {
        //Ary = deepCopy(Ary);
        for (let iy = 0; iy < Ary.length; iy++) {
            let ary = Ary[iy];
            for (let ix = 0; ix < ary.length; ix++) {
                let id = ary[ix];
                if (id == 0) {
                    return false;
                };
            };
        };
        return true;
    };


    //当前点到终点的走向。//递归！
    function DFS(ary, x, y, x2, y2, di) {
        //sleep(100);
        //作用:递归走路
        //  地图  -1为已走过的点
        //[ [ 0, 0, 1, 0, 1 ],
        //  [ 0, 2, 0, 0, 3 ],
        //  [ 0, 0, 0, 0, 4 ],
        //  [ 0, 0, 0, 0, 0 ],
        //  [ 0, 2, 0, 3, 4 ] ];

        //走过的路,[[x,y],[x,y],[x,y],……];
        //当前位置{x:2,y:0}
        //终点位置{x:4,y:0}
        //当前几号点?
        //返回,[……,[[x,y],[x,y],[x,y]]];
        //左下右上
        //log(fs);
        //最开始的查找方向影响整个查找的速度。

        //log("C",x,y);
        //遍历每个方向。
        //  log("ret");

        var res = DFS2(ary, x + 1, y, x2, y2, di);
        if (res) {
            return res
        };
        res = DFS2(ary, x, y + 1, x2, y2, di);
        if (res) {
            return res
        };
        res = DFS2(ary, x - 1, y, x2, y2, di);
        if (res) {
            return res
        };
        res = DFS2(ary, x, y - 1, x2, y2, di);
        if (res) {
            return res
        };


        //既没到终点也没有找到路。
        return null;
    };

    function DFS2(ary, x, y, x2, y2, di) {
        ary.push([x, y]);
        if (x == x2 && y == y2) {
            // log("zh");
            //是终点
            let nextPt = PtAry[di + 1];
            //下一条线。
            if (nextPt) {
                //有下一条线。
                let nx = nextPt[0],
                    ny = nextPt[1];
                //log("next",di+1,nx,ny);
                //log(Ary);

                let nextDFS = DFS([
                    [nx, ny]
                ], nx, ny, nextPt[2], nextPt[3], di + 1);
                //开始走这条线上的点。
                if (nextDFS) {
                    //下一条路走通了。
                    nextDFS.push(ary);
                    return nextDFS;
                };
            } else {
                //没有下一条线。
                //代表地图完全走通了。
                //判断地图上还有没有空位。
                if (isNoVacancy(Ary)) {
                    //没空位。成功了。
                    //result.push(ary);
                    return [ary];
                };
            };

        } else if ((x < AW && x >= 0) && (y < AH && y >= 0)) {
            //这个方向是在地图上。
            let id = Ary[y][x];
            if (id == 0) { //这个方向上有点。
                //log();
                Ary[y][x] = -1;

                //log("di",di,ax,ay);
                let nextDFS2 = DFS(ary, x, y, x2, y2, di);
                //开始走这条线上的点。
                if (nextDFS2) {
                    //地图走通了。
                    //nextDFS.unshift(ary);
                    return nextDFS2;
                };
                Ary[y][x] = 0;
            };
        };
        ary.pop();
        return null;
    };

};


function deepCopy(Ary) {
    if (typeof Ary != 'object') {
        return Ary;
    };
    var newAry = [];
    for (let i = 0; i < Ary.length; i++) {
        newAry[i] = deepCopy(Ary[i]);
    }
    return newAry;
};

function weiyi(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

function ER_mss(er) {
    var e = er.name;
    A = "";
    if (e.equalsIgnoreCase("SyntaxError")) {
        A = "语法错误(检查变量或符号)";
    }
    if (e.equalsIgnoreCase("ReferenceError")) {
        A = "赋值错误或变量、函数不存在";
    }
    if (e.equalsIgnoreCase("RangeError")) {
        A = "某数值无效";
    }
    if (e.equalsIgnoreCase("TypeError")) {
        A = "参数不是预期类型";
    }
    if (e.equalsIgnoreCase("EvalError")) {
        A = "eval执行出错";
    }
    return {
        e: e,
        类型: A,
        原因: er.message,
        位置: er.stack
    };
};


function getTimeString(date, T) {
    return new java.text.SimpleDateFormat((T || "yyyyMMdd_HH:mm:ss")).format(new Date(date));
}