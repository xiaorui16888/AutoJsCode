"ui";

/**
 *作者QQ: 1811588980
 *完成时间: 2019年1月29日 下午12:49:03
 *测试机型: meizu_M5 Note
 *Auto.js版本: 4.1.0 Alpha5
 *屏幕: 1080*1920
 *API: 24
 *备注: 有个问题没法解决。为什么球落地之后会一直跳动,不会停了？
 **/

ui.layout(
    <vertical>
        <canvas id="canvas" layout_weight="1" margin="10"/>
        <horizontal h="auto">
            <button id="but_G" layout_weight="1" h="auto" text="重力"/>
            <button id="but_F" layout_weight="1" h="auto" text="弹性"/>
            <button id="but_sy" layout_weight="1" h="auto" text="y轴速度"/>
        </horizontal>
    </vertical>
);

function round_A(a, b) {
    return Math.round(b * a) / a
};


var rainbowColor = [-65536, -23296, -256, -16711936, -16744449, -16776961, -7667457];;

var paint = new Paint;
//paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(5);
//paint.setStyle(Paint.Style.STROKE);
paint.setStyle(Paint.Style.FILL);
paint.setARGB(255, 255, 0, 0);
paint.setTextSize(25);

var ballsAry = new Array;
for (let i in rainbowColor) {
    ballsAry.push({
        r: 50,
        c: rainbowColor[3],
        x: 300,
        y: 100,
        sx: 0,
        sy: 0,
    });
    break;
};
var G = 11;
var F = 0.8;

ui.but_G.click(function() {
    threads.start(function() {
        var num = parseInt(dialogs.prompt("修改重力", String(G)));
        if (num) {
            G = num;
            toastLog("已修改");
        } else {
            toastLog("错误");
        };
    });

});
ui.but_F.click(function() {
    threads.start(function() {
        var num = parseFloat(dialogs.prompt("修改弹性", String(F)));
        if (num) {
            F = num;
            toastLog("已修改");
        } else {
            toastLog("错误");
        };
    });

});
ui.but_sy.click(function() {
    threads.start(function() {
        var num = parseInt(dialogs.prompt("修改"));
        if (num) {
            ballsAry[0].sy = num;
            toastLog("已修改");
        } else {
            toastLog("错误");
        };
    });

});




ui.canvas.on("draw", function(canvas) {
    canvas.drawARGB(255, 127, 127, 127);
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    //canvas.translate(0,h);
    //canvas.scale(1,-1);
    for (let i = 0; i < ballsAry.length; i++) {
        let ball = ballsAry[i];
        //log(ball);
        //ball.sx += G;
        ball.sy += G;
        ball.x += ball.sx;
        ball.y += ball.sy;
        var rect = android.graphics.RectF(ball.x - ball.r, ball.y - ball.r, ball.x + ball.r, ball.y + ball.r);

        if (ball.sx > 0 && rect.right >= w) {
            //向右撞墙后反弹。
            ball.x = w - ball.r - (rect.right - w) * F;
            ball.sx = -Math.abs(ball.sx * F);
        };
        if (ball.sx < 0 && rect.left <= 0) {
            //向左撞墙后反弹。
            ball.x = ball.r - (rect.left) * F;
            ball.sx = Math.abs(ball.sx * F);
        };
        if (ball.sy > 0 && rect.bottom >= h) {
            //向下撞墙后反弹。            
            ball.y = h - ball.r - (rect.bottom - h) * F;
            ball.sy = -Math.abs(ball.sy * F);
        };
        if (ball.sy < 0 && rect.top <= 0) {
            //向上撞墙后反弹。
            ball.y = ball.r - (rect.top) * F;
            ball.sy = Math.abs(ball.sy * F);
        };
        paint.setColor(ball.c);
        canvas.drawCircle(ball.x, ball.y, ball.r, paint);
        canvas.drawText("y: "+String(ball.y), 0, 500, paint);
        canvas.drawText("sy: "+String(ball.sy), 0, 600, paint);
    };
});





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