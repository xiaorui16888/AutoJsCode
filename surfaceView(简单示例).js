"ui";
//花了几个小时搜了一下网上的示例
//用surfaceView搞的一个画布
//写一些小游戏应该可以更流畅一些
var linear = new android.widget.LinearLayout(activity);
var surface = new android.view.SurfaceView(activity);
linear.addView(surface);
activity.setContentView(linear);

surface.setFocusable(true)
surface.setFocusableInTouchMode(true)
surface.setKeepScreenOn(true);

var mPaint = new Paint(Paint.ANTI_ALIAS_FLAG | Paint.DITHER_FLAG);
        //mPaint.setStrokeWidth("10f");
        mPaint.setColor(android.graphics.Color.parseColor("#FF4081"));
        mPaint.setStyle(Paint.Style.STROKE);
        mPaint.setStrokeJoin(Paint.Join.ROUND);
        mPaint.setStrokeCap(Paint.Cap.ROUND);
var mPath = new android.graphics.Path();

var holder = surface.getHolder();
holder.addCallback(new android.view.SurfaceHolder.Callback({
    surfaceCreated: function(holder) {
        isDrawing = true;
        new java.lang.Thread(new java.lang.Runnable({run: function() {
        while (isDrawing) {
          try{
  var mCanvas = holder.lockCanvas();
   mCanvas.drawColor(android.graphics.Color.WHITE);
    mCanvas.drawPath(mPath,mPaint);
           //这里进行内容的绘制
     }catch(e){
           }finally {
           if (mCanvas != null){
               holder.unlockCanvasAndPost(mCanvas);
           }
           }
        }
    }})).start();
    },
    surfaceChanged: function(holder, format, width, height) { //改变

    },
    surfaceDestroyed: function(holder) { //销毁
        isDrawing = false;
    }
    
}));

surface.setOnTouchListener(new android.view.View.OnTouchListener({
onTouch:function(view,event){
       var x = event.getX();
       var y = event.getY();
        switch (event.getAction()) {
            case android.view.MotionEvent.ACTION_DOWN:
                mLastX = x;
                mLastY = y;
                mPath.moveTo(mLastX, mLastY);
                break;
            case android.view.MotionEvent.ACTION_MOVE:
                var dx = Math.abs(x - mLastX);
                var dy = Math.abs(y - mLastY);
                if (dx >= 3 || dy >= 3) {
                    mPath.quadTo(mLastX, mLastY, (mLastX + x) / 2, (mLastY + y) / 2);
                }
                mLastX = x;
                mLastY = y;
                break;
            case android.view.MotionEvent.ACTION_UP:
                break;
        }
        return true;
        }}));

    
    
    
    
    
    