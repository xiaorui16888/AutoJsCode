"ui";
ui.layout(
<ImageView id="img"/>
);


var paint = new android.graphics.Paint;
paint.setStrokeWidth(5);
paint.setTextAlign(Paint.Align.CENTER); //写字左右中心

var ad=new 绘布(ui.img);
var matrix = new android.graphics.Matrix();
  //matrix.postScale(0.3,0.3,500,500);
//matrix.postTranslate(data.translate.x, data.translate.y);
ad.setDraw(function(canvas){
    var w=canvas.getWidth();
    var h=canvas.getHeight();
    paint.setARGB(255,0,0,0);
    //canvas.drawLine(0,0,w,h,paint);
    //canvas.rotate(5,w/2,h/3);
    canvas.translate(1,2);
    
    //canvas.setMatrix(matrix);
    paint.setStyle(Paint.Style.FILL);
    var size = 200;
    paint.setTextSize(size);
    for(var i=0;i<256 ;i+=32){
    paint.setARGB(255,i,0,i);
    canvas.drawText("我的三维", w / 3+i/10, h / 5+i/10 + 0.365 * size, paint);
        };
    });




function 绘布(view) {
    if (view.accessibilityClassName != "android.widget.ImageView") {
        throw "我报错";
    };
    this.width = view.getWidth();
    this.height = view.getHeight();
    this.matrix = new android.graphics.Matrix();
    this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
    this.canvas = new android.graphics.Canvas(this.bitmap);
    threads.start(new java.lang.Runnable(() => {
        while (true) {
            if (view.getWidth() != this.width || view.getHeight() != this.height) {
                this.width = view.getWidth();
                this.height = view.getHeight();
                this.bitmap = android.graphics.Bitmap.createBitmap(this.width || 1, this.height || 1, android.graphics.Bitmap.Config.ARGB_8888);
                this.canvas = new android.graphics.Canvas(this.bitmap);
            };
            sleep(500);
        };
    }));
    this.Draw = function() {};
    this.setDraw = function(fun) {
        if (typeof fun == "function") {
            this.Draw = fun;
        };
    };
    setInterval(() => {
        try {
            //重置canvas为初始状态。
            //this.bitmap.eraseColor(0);
            //this.canvas.setMatrix(this.matrix);
            this.Draw(this.canvas);
            ui.run(() => {
                view.setImageBitmap(this.bitmap);
            });
        } catch (e) {
            toastLog(e);
        };
    }, 50);
};