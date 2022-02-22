importPackage(android.graphics);
var dir = "/sdcard/games/Mannix/test/";
var imgs = files.listDir(dir, function(name) {
    return name.endsWith(".png") && files.isFile(files.join(dir, name));
});
var size = 128
for (i = 0; i < imgs.length; i++) {
    var img = images.read(dir + imgs[i])
    width = img.getWidth();
    height = img.getHeight();
    if (height <= 256) {
        var b = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888);
        var canvas = new Canvas(b);
        var paint = new Paint();
        for (y = 0; y < size; y++) {
            for (x = 0; x < size; x++) {
                //newImg.
                try {
                    var arr = getColor(x,y,width,height)
                    var ox = mod(arr[0], width)
                    var oy = mod(arr[1], height)
                    var pixelColor = img.pixel(ox, oy)
                    paint.setColor(pixelColor);
                    canvas.drawPoint(x, y, paint);
                } catch (err) {}
            }
            //log(y+";"+imgs[i]+";"+i)

        }
        log(imgs[i] + ";" + i)
        var newImg = com.stardust.autojs.core.image.ImageWrapper.ofBitmap(b);
        images.save(newImg, "/sdcard/games/Mannix/test2/" + imgs[i]);
    }
}

function mod(a, b) {
    return a - Math.floor(a / b) * b
}

function getColor(x,y,width,height){
	ax = width/2 + (width/2)*(x/size) - (width/2)*(y/size)
	ay = (height/2)*(y/size) + (height/2)*(x/size)
	return [ax,ay]
}