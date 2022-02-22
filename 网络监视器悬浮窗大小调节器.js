"ui";
importClass(android.graphics.Paint);
Canvas = android.graphics.Canvas;
importClass(android.graphics.Bitmap);
ui.statusBarColor("#ff000000");
ui.layout(
    <frame id="bg" background="#000000">
        <vertical gravity="bottom">
            <text id="xs" color="#ffffff"/>
            <img id="ok" gravity="bottom" bg="#110011" w="360" h="360"/>
        </vertical>
    </frame>
);

sjd=2000;
tu = han(sjd);
ui.ok.setImageBitmap(tu);
var zhx, zhy;
var ix, iy;
resourceId = context.getResources().getIdentifier("status_bar_height", "dimen", "android");
var ztlh = context.getResources().getDimensionPixelSize(resourceId);

var kz1 = 0;
var jd;
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
ui.ok.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX() - ix-zhx;
            y = event.getRawY() - iy-zhy;
            jd = du(x, y);
            ui.xs.text(parseInt(sjd)+"");
            b1=new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            nx = parseInt(event.getRawX()) - ix-zhx;
            ny = parseInt(event.getRawY()) - iy-zhy;
            xjd=du(nx,ny);
            b2=new Date().getTime();
            cjd=xjd-jd;
            if(Math.abs(cjd)>180){
                if(xjd>jd){cjd=-(jd+360-xjd);}else{
                    cjd=xjd+360-jd;
                    }
                }
            sjd+=cjd;
            tu=han(sjd);
            ui.ok.setImageBitmap(tu);
            
            events.broadcast.emit("hello",parseInt(sjd/10)+"");
            jd=xjd;
            b1=b2;
           
            ui.xs.text(parseInt(sjd)+"");
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {

            }
            return true;
    }
    return true;
});

function du(ax, ay) {
    var jd0=180*Math.atan(ay / ax)/Math.PI;
    if(ax>=0){return 90+jd0;}
    if(ax<0){return 270+jd0;}
    return jd0;
}
threads.start(function() {
    ui.run(function() {
        zhy = ui.ok.getMeasuredHeight()/2;
        zhx = ui.ok.getMeasuredWidth()/2;
        ix = ui.ok.getX();
        iy = ui.ok.getY() + ztlh;
    });
});

function han(xzjd) {
    var bitmap = Bitmap.createBitmap(1080, 1080, Bitmap.Config.ARGB_8888);

    var canvas = new Canvas(bitmap);
    canvas.rotate(xzjd,540,540);
    canvas.drawARGB(0, 0, 0, 0);
    var paint = new Paint();
    //圆盘背景
    paint.setARGB(255, 0, 0, 0); //白色画笔
    paint.setStyle(Paint.Style.FILL); //空心样式  
    canvas.drawCircle(540, 540, 536, paint); //绘制圆

    paint.setARGB(255, 166, 166, 166); //白色画笔
    canvas.drawCircle(540, 540, 150, paint); //绘制圆
    paint.setARGB(255, 66, 66, 66); //白色画笔
    canvas.drawCircle(540, 540, 96, paint); //绘制圆
    //指针轴圆点
    paint.setARGB(255, 55, 55, 55); //白色画笔
    canvas.drawCircle(540, 540, 20, paint); //绘制圆

    for (var 刻度 = 0; 刻度 < 360; 刻度 += 30) {
        var 度数 = (Math.PI / 180) * (刻度 - 90);
        paint.setARGB(255, 255, 255, 0); //青色画笔
        paint.setStrokeWidth(5); //边缘宽度 
        canvas.drawLine(98 * Math.cos(度数) + 540, 98 * Math.sin(度数) + 540, 148 * Math.cos(度数) + 540, 148 * Math.sin(度数) + 540, paint); //绘制直线
    }

    //表边圆
    paint.setARGB(255, 100, 100, 100); //白色画笔
    paint.setStyle(Paint.Style.STROKE); //空心样式  
    paint.setStrokeWidth(10); //边缘宽度  
    canvas.drawCircle(540, 540, 525, paint); //绘制圆

    for (var 刻度 = 0; 刻度 < 360; 刻度 += 5) {
        var 度数 = (Math.PI / 180) * (刻度 - 90);
        paint.setARGB(255, 0, 255, 255); //青色画笔
        paint.setStrokeWidth(5); //边缘宽度 
        canvas.drawLine(420 * Math.cos(度数) + 540, 420 * Math.sin(度数) + 540, 530 * Math.cos(度数) + 540, 530 * Math.sin(度数) + 540, paint); //绘制直线
    }
    paint.setStyle(Paint.Style.FILL); //
    paint.setARGB(255, 255, 0, 55); //色画笔
    canvas.drawCircle(60, 540, 20, paint); //绘制圆


    canvas.save(Canvas.ALL_SAVE_FLAG);
    canvas.restore();
    return bitmap;
}



function xzt(alpha) {
    origin = han();
    matrix = new android.graphics.Matrix();
    matrix.setRotate(alpha);
    // 围绕原地进行旋转
    newBM = Bitmap.createBitmap(origin, 0, 0, 1080, 1080, matrix,false);
    if (newBM.equals(origin)) {
        tu=newBM;
    }
    origin.recycle();
    tu=newBM;
}