importPackage(android.graphics);
var dir = "/sdcard/games/Mannix/五边形材质/from/";
var imgs = files.listDir(dir, function(name) {
    return name.endsWith(".png") && files.isFile(files.join(dir, name));
});
var size = 128
for (i = 0; i < imgs.length; i++) {
    var img = images.read(dir + imgs[i])
    var b = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888);
    var canvas = new Canvas(b);
    var paint = new Paint();
    
var path = new Path();
    var k = 6
    var s = 0.23
    for (let py = 0; py <= k; py++) {
        for (let px = 0; px <= k; px++) {
            pens(canvas, paint, s, size / k * px, size / k * py, size / k * (px + 1))
            pens(canvas, paint, s, size * (px / k - 1 / 2 / k), size * (py / k + 1 / 2 / k), size * (px / k + 1 / 2 / k))
        }
    }
    log(imgs[i] + ";" + i)

    var newImg = com.stardust.autojs.core.image.ImageWrapper.ofBitmap(b);
    images.save(newImg, "/sdcard/games/Mannix/五边形材质/to/" + imgs[i]);
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
    var color = img.pixel(Math.max(Math.min((xa*3+xb)/4/size*img.getWidth(),img.getWidth()-1),0),Math.max(Math.min((ya*3+yb)/4/size*img.getHeight(),img.getHeight()-1),0))



    paint.setColor(color);
    path.reset()
    path.moveTo(x1, y1)
    path.lineTo(x2, y2)
    path.lineTo(x3, y3)
    path.lineTo(x4, y4)
    path.lineTo(x5, y5)
    path.close()
    canvas.drawPath(path, paint)
}