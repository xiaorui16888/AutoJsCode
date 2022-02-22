importPackage(android.graphics);
var dir = "/sdcard/mctools/test/";
var imgs = files.listDir(dir, function(name) {
    return name.endsWith(".png") && files.isFile(files.join(dir, name));
});
var size = 2
for (i = 0; i < imgs.length; i++) {
    var img = images.read(dir + imgs[i])
    width=img.getWidth();
    height=img.getHeight();
    var b = Bitmap.createBitmap(width*size, height*size, Bitmap.Config.ARGB_8888);
    var canvas = new Canvas(b);
    var paint = new Paint();
    for (y = 0; y < height*size; y++) {
        for (x = 0; x < width*size; x++) {
            //newImg.
            var ox=mod(x,width)
            var oy=mod(y,height)
            var pixelColor=colors.toString(img.pixel(ox,oy))
            paint.setColor(colors.parseColor(pixelColor));
            canvas.drawPoint(x, y, paint);
        }
                    log(y+";"+imgs[i]+";"+i)

    }
    var newImg = com.stardust.autojs.core.image.ImageWrapper.ofBitmap(b);
    images.save(newImg, "/sdcard/mctools/test2/" + imgs[i]);
}

function mod(a,b) {
    return a-Math.floor(a/b)*b
}