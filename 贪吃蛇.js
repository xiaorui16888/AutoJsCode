"ui";
ui.layout(
    <frame> 
<canvas id="canvas"/>
</frame>
);

var paint = new Paint;
paint.setTextAlign(Paint.Align.CENTER);

var json;
var path = "/sdcard/脚本/贪吃蛇.json"
if (files.exists(path)) {
    json = eval("(" + files.read(path) + ")");
} else {
    json = {
        JSNAKE: [
            [0, 2, 0, 1],
            [0, 1, 0, 1],
            [0, 0, 0, 1]
        ],
        JSNAKEColor: new Array,
        Japple: {
            x: 0,
            y: 3
        },
        Jdirection: {
            x: 0,
            y: 1
        },
        JTime: 0,
        Jgameover:true
    };
    threads.start(function(){
        alert("游戏介绍:\n通过滑动控制蛇的前进方向\n通过吃掉闪烁的球来增长\n注意不要咬蛇自尽，或者撞墙而死\n本游戏支持断点保存(按返回键退出游戏)");
        });
};

events.on("exit", function() {
    log("结束运行");
    json.JTime = Time;
    json.Jgameover = gameover;
    var text = Disassembly(json);
    log(text);
    files.write(path, text);
});

var SNAKE = json.JSNAKE;
var SNAKEColor = json.JSNAKEColor;
for (var i = 0; i < SNAKE.length; i++) {
    var color = colors.argb(255, random(0, 255), random(0, 255), random(0, 255));
    SNAKEColor.push(color);
};
var apple = json.Japple;
var direction = json.Jdirection;
var Time = json.JTime;
var gameover = json.Jgameover;


var gameW = device.width / 11;
ui.canvas.on("draw", function(canvas) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    if (!gameover) {
        paint.setStrokeWidth(0);
        var A = DrawGrid(canvas, paint, gameW);
        var B = DrawWall(canvas, paint, A);
        var appleX = apple.x * B.s + B.x + B.s / 2,
            appleY = apple.y * B.s + B.y + B.s / 2;
        if ((Math.floor(new Date().getMilliseconds() / 250) % 2 ? true : false)) {
            paint.setStyle(Paint.Style.FILL);
            paint.setARGB(255, 255, 0, 0);
            canvas.drawCircle(appleX, appleY, B.s * 0.4, paint);
            paint.setARGB(255, 0, 255, 0);
            canvas.drawCircle(appleX, appleY, B.s * 0.2, paint);
        };
        var t = Math.floor(new Date().getMilliseconds() / 1000 * B.s);
        Time += (Math.floor(B.s * 0.1));
        var C = DrawSNAKE(canvas, paint, B, Time);
        if (Time / B.s >= 0.95) {
            Time = 0;
        };
    } else {
        paint.setStrokeWidth(1);
        paint.setColor(colors.BLACK);
        paint.setStyle(Paint.Style.FILL);
        var size = 200;
        paint.setTextSize(size);
        canvas.drawText("游戏结束", w / 2, h * 0.3 + 0.365 * size, paint);
        var size = 100;
        paint.setTextSize(size);
        canvas.drawText("分数 " + (SNAKE.length - 3), w * 0.5, h * 0.5 + 0.365 * size, paint);
        paint.setColor(colors.GREEN);
        var size = 150;
        paint.setTextSize(size);
        canvas.drawText("重新开始", w * 0.5, h * 0.75 + 0.365 * size, paint);
        paint.setStrokeWidth(5);
        canvas.drawLine(0, h * 0.65, w, h * 0.65, paint);
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
            if (!gameover) {
                if (Math.abs(event.getX() - Xw) <= Math.abs(event.getY() - Yh)) {
                    if (Math.abs(SNAKE[0][3]) != 1) {
                        if (event.getY() - Yh > 0) {
                            direction.x = 0;
                            direction.y = 1;
                        } else {
                            direction.x = 0;
                            direction.y = -1;
                        };
                    };
                } else {
                    if (Math.abs(SNAKE[0][2]) != 1) {
                        if (event.getX() - Xw > 0) {
                            direction.x = 1;
                            direction.y = 0;
                        } else {
                            direction.x = -1;
                            direction.y = 0;
                        };
                    };
                };
            } else {
                if (Yh > view.height * 0.65 && event.getY() > view.height * 0.65) {
                    json = {
                        JSNAKE: [
                            [0, 2, 0, 1],
                            [0, 1, 0, 1],
                            [0, 0, 0, 1]
                        ],
                        JSNAKEColor: new Array,
                        Japple: {
                            x: 0,
                            y: 3
                        },
                        Jdirection: {
                            x: 0,
                            y: 1
                        },
                        JTime: 0,
                        Jgameover:false
                    };
                    SNAKE = json.JSNAKE;
                    SNAKEColor = json.JSNAKEColor;
                    for (var i = 0; i < SNAKE.length; i++) {
                        var color = colors.argb(255, random(0, 255), random(0, 255), random(0, 255));
                        SNAKEColor.push(color);
                    };
                    apple = json.Japple;
                    direction = json.Jdirection;
                    Time = json.JTime;
                    gameover = json.Jgameover;
                };
            };
            break;
    };
    return true;
});

function DrawGrid(canvas, paint, s) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    var sx = Math.floor(w / s),
        sy = Math.floor(h / s);
    paint.setARGB(255, 0, 0, 0);
    for (var i = -sx; i < sx; i++) {
        canvas.drawLine(w * 0.5 + i * s, 0, w * 0.5 + i * s, h, paint);
    };
    for (var i = -sy; i < sy; i++) {
        canvas.drawLine(0, h * 0.5 + i * s, w, h * 0.5 + i * s, paint);
    };
    var x = (w / 2) % s,
        y = (h / 2) % s;
    return {
        x: x,
        y: y,
        w: (w - 2 * x) / s,
        h: (h - 2 * y) / s,
        s: s
    };
};

function DrawWall(canvas, paint, S) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    var x = S.x,
        y = S.y;
    for (var i = 0; i < S.w; i++) {
        DrawBlock(canvas, paint, x + i * S.s, y, S.s, S.s);
        DrawBlock(canvas, paint, x + i * S.s, y + (S.h - 1) * S.s, S.s, S.s);
    };
    for (var i = 0; i < S.h; i++) {
        DrawBlock(canvas, paint, x, y + i * S.s, S.s, S.s);
        DrawBlock(canvas, paint, x + (S.w - 1) * S.s, y + i * S.s, S.s, S.s);
    };
    return {
        x: S.x + S.s,
        y: S.y + S.s,
        w: S.w - 2,
        h: S.h - 2,
        s: S.s
    };

    function DrawBlock(canvas, paint, x, y, w, h) {
        paint.setARGB(255, 0, 0, 0);
        canvas.drawLine(x, y, x + w, y + h, paint);
        canvas.drawLine(x + w, y, x, y + h, paint);
        canvas.drawLine(x, y, x + w, y, paint);
        canvas.drawLine(x, y, x, y + h, paint);
        canvas.drawLine(x + w, y, x + w, y + h, paint);
        canvas.drawLine(x, y + h, x + w, y + h, paint);
        paint.setStyle(Paint.Style.FILL);
        paint.setARGB(255, 0, 0, 255);
        canvas.drawCircle(x + w * 0.5, y + h * 0.5, w * 0.5, paint);
    };
};

function DrawSNAKE(canvas, paint, S, T) {
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    for (var i = 0; i < SNAKE.length; i++) {
        var x = S.x + S.s * 0.5 + S.s * SNAKE[i][0] + SNAKE[i][2] * T,
            y = S.y + S.s * 0.5 + S.s * SNAKE[i][1] + SNAKE[i][3] * T;
        paint.setColor(SNAKEColor[i]);
        canvas.drawCircle(x, y, S.s * 0.5, paint);
    };
    if (T / S.s >= 0.95) {
        if (SNAKE[0][0] + SNAKE[0][2] == apple.x && SNAKE[0][1] + SNAKE[0][3] == apple.y) {
            var space = new Array;
            for (var X = 0; X < S.w; X++) {
                for (var Y = 0; Y < S.h; Y++) {
                    if (!shifou(X, Y, SNAKE) && (SNAKE[0][0] + SNAKE[0][2] != X || SNAKE[0][1] + SNAKE[0][3] != Y)) {
                        space.push([X, Y]);
                    };
                };
            };
            if (space.length) {
                var r = Math.floor(Math.random() * space.length);
                apple.x = space[r][0];
                apple.y = space[r][1];
            } else {
                gameover = true;
            };
            if (SNAKEColor.length <= SNAKE.length) {
                var color = colors.argb(255, random(0, 255), random(0, 255), random(0, 255));
                SNAKEColor.push(color);
            };
        } else {
            SNAKE.pop();
        };
        if (SNAKE[0][0] + SNAKE[0][2] > S.w - 1 || SNAKE[0][0] + SNAKE[0][2] < 0 || SNAKE[0][1] + SNAKE[0][3] > S.h - 1 || SNAKE[0][1] + SNAKE[0][3] < 0 || shifou(SNAKE[0][0] + SNAKE[0][2], SNAKE[0][1] + SNAKE[0][3], SNAKE)) {
            gameover = true;
        };
        SNAKE.unshift([SNAKE[0][0] + SNAKE[0][2], SNAKE[0][1] + SNAKE[0][3], direction.x, direction.y]);
    };
};

function shifou(x, y, A) {
    for (var i = 0; i < A.length; i++) {
        if (A[i][0] == x && A[i][1] == y) {
            return true;
        };
    };
};

function weiyi() {
    var num = 0;
    for (var i = 0; i < arguments.length; i++) {
        num += arguments[i] * arguments[i];
    }
    return Math.sqrt(num);
};

function ydfx(bx, by, bz, w) {
    var Y, P;
    var k = new Array;
    Y = 180 * Math.asin(Math.abs(bx) / weiyi(bx, bz)) / Math.PI;
    P = -180 * Math.asin(by / weiyi(bx, by, bz)) / Math.PI;
    if (bx > 0 && bz < 0) {
        Y = 180 - Y
    };
    if (bx < 0 && bz < 0) {
        Y = Y + 180
    };
    if (bx < 0 && bz > 0) {
        Y = 360 - Y
    };
    if (Math.abs(P) == 90) {
        Y = 0;
    };
    if (!w) {
        w = 10000;
    };
    Y = Math.round(w * Y) / w;
    P = Math.round(w * P) / w;
    return {
        Y: Y,
        P: P
    };
};

function Disassembly(A) {
    switch (typeof(A)) {
        case "object":
            var ary = new Array;
            if (Array.isArray(A)) {
                for (var i in A) {
                    ary.push(Disassembly(A[i]));
                };
                return "[" + ary.join(",") + "]";
            } else {
                for (var i in A) {
                    ary.push(i + ":" + Disassembly(A[i]));
                };
                return "{" + ary.join(",") + "}";
            };
            break;
        case "function":
            return A.toString();
            break;
        case "string":
            return "\"" + A.toString() + "\"";
            break;
        case "number":
            return A.toString();
            break;
        case "boolean":
            return A.toString();
            break;
        default:
            return A.toString();
    };
};