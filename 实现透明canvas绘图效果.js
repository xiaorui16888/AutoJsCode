importClass(android.graphics.BitmapFactory);
importClass(android.graphics.drawable.BitmapDrawable);
importClass(android.graphics.Bitmap);
importClass(android.graphics.Paint);
importClass(android.graphics.Color);
var f = floaty.rawWindow(
    <frame id="fr" bg="#00000000" w="*" h="*">
    </frame>
);
f.setSize(-1, -1);
f.setTouchable(false);
setInterval(() => {}, 2000);
draw();//开始绘制
function setBackgroundBitmap(bmp, view) {
    view.setBackgroundDrawable(new BitmapDrawable(bmp));
}

function draw() {
    //创建屏幕大小的Bitmap
    var bmp = Bitmap.createBitmap(device.width, device.height, Bitmap.Config.ARGB_8888);
    var canvas = new Canvas(bmp);
    var paint = new Paint();
    paint.setColor(Color.RED); //设置画笔颜色为红色
    paint.setAlpha(255); //透明度0-255
    paint.setStyle(Paint.Style.STROKE); //设置为描边 可选Paint.Style.FILL Paint.Style.FILL_AND_STROKE
    paint.setStrokeWidth(5);
    //以下这行代码将绘制一个屏幕1/3大小的矩形
    canvas.drawRect(0,device.height/3,device.width,device.height/3*2,paint);
    //先绘制Bitmap
    
    //再设置为背景
    setBackgroundBitmap(bmp,f.fr);
}