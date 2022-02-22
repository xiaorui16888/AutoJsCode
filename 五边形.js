"ui";

ui.layout(
    <vertical>
        <canvas id="board" layout_weight="1"/>
    </vertical>
);
/*尺寸                                                                                                                                         */
importClass(java.io.File);
importClass(java.io.FileFilter);
importClass(android.graphics.Path);
importClass(android.graphics.RectF);
importClass(android.graphics.Rect);
importClass(android.graphics.Paint);
importClass(android.graphics.Point);
importClass(android.graphics.BitmapFactory);
importClass(android.graphics.Bitmap);
importClass(android.graphics.Matrix);
importClass(android.graphics.Color);
importClass(android.graphics.ColorMatrix);
importClass(android.graphics.ColorFilter);
importClass(android.animation.ObjectAnimator)
importClass(android.graphics.PorterDuffXfermode)
importClass(android.graphics.Xfermode)
importClass(android.graphics.PorterDuff)

//
const size = 256;
var i = 0

var tween = require('缓动.js');
var o = [0, 0, 0]
var paint = new Paint();
var path = new Path();
path.reset();
ui.board.on("draw", function(canvas) {
    //绘制背景色
    canvas.drawColor(colors.argb(255, 255, 255, 255));
    //绘制分数
    paint.setColor(colors.BLACK);
    paint.setTextSize(50);
    //canvas.drawText(n);
    //toast(JSON.stringify(degree,null,4))
    paint.setStrokeWidth(3);
    var offset = {
        x: 200,
        y: 200
    };
    //偏移坐标
    canvas.translate(offset.x, offset.y);
    //绘制围墙
    //
    var size = 600
    var k = 6
    var s = 0.2
    for (let py = 0; py <= k; py++) {
        for (let px = 0; px <= k; px++) {
            pens(canvas, paint, s, size / k * px, size / k * py, size / k * (px + 1))
            pens(canvas, paint, s, size * (px/k-1/2/k), size *(py/k+1/2/k ), size * (px/k+1/2/k))

        }
    }

    paint.setColor(colors.BLACK);

    line(canvas, paint, 0, 0, size, size)

});

function zero(num) {
    if (num < 0) {
        return -1
    } else {
        return 1
    }
}

function pens(canvas, paint, s, xc, yc, xd, yd) {
    var yd = yc
    pen(canvas, paint, s, xc, yc, xd, yd)
    pen(canvas, paint, s, xd, yd, xc, yc)
    pen(canvas, paint, s, (xd + xc) / 2, (yd + yc) / 2, (xd + xc) / 2, yd - (xd - xc))
    pen(canvas, paint, s, (xd + xc) / 2, (yd + yc) / 2, (xd + xc) / 2, yd + (xd - xc))

}

function pen(canvas, paint, s, xa, ya, xb, yb) {
    var sq2 = Math.sqrt(2)
    var x1 = s / 2 * ((xb - xa) * Math.cos(90 * Math.PI / 180) - (yb - ya) * Math.sin(90 * Math.PI / 180)) + xa
    var y1 = s / 2 * ((xb - xa) * Math.sin(90 * Math.PI / 180) + (yb - ya) * Math.cos(90 * Math.PI / 180)) + ya

    var x2 = sq2 / 4 * ((xb - xa) * Math.cos(45 * Math.PI / 180) - (yb - ya) * Math.sin(45 * Math.PI / 180)) + xa
    var y2 = sq2 / 4 * ((xb - xa) * Math.sin(45 * Math.PI / 180) + (yb - ya) * Math.cos(45 * Math.PI / 180)) + ya

    var x3 = (xb - xa) * (1 - s) / 2 + xa
    var y3 = (yb - ya) * (1 - s) / 2 + ya

    var x4 = sq2 / 4 * ((xb - xa) * Math.cos(-45 * Math.PI / 180) - (yb - ya) * Math.sin(-45 * Math.PI / 180)) + xa
    var y4 = sq2 / 4 * ((xb - xa) * Math.sin(-45 * Math.PI / 180) + (yb - ya) * Math.cos(-45 * Math.PI / 180)) + ya


    var x5 = s / 2 * ((xb - xa) * Math.cos(-90 * Math.PI / 180) - (yb - ya) * Math.sin(-90 * Math.PI / 180)) + xa
    var y5 = s / 2 * ((xb - xa) * Math.sin(-90 * Math.PI / 180) + (yb - ya) * Math.cos(-90 * Math.PI / 180)) + ya
    //五边形
    paint.setColor((Math.random() - 1) * 10000000);
    path.reset()
    path.moveTo(x1, y1)
    path.lineTo(x2, y2)
    path.lineTo(x3, y3)
    path.lineTo(x4, y4)
    path.lineTo(x5, y5)
    path.close()
    canvas.drawPath(path, paint)
}

//连线
function line(canvas, paint, x1, y1, x2, y2) {
    canvas.drawLine(x1, y1, x2, y2, paint);
}

//三轴矩阵旋转