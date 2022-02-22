/**
 * 作者:     家
 * QQ:      203118908
 * 功能:    二姐贝塞尔曲线
 */
'ui';
var marginSize = '10'
var myMargin = marginSize + ' ' + marginSize + ' ' + marginSize + ' ' + marginSize
// <button id='button' >button</button>

ui.layout(
  <vertical>
    <frame margin= '{{myMargin}}' >
      <canvas id='board'></canvas>
    </frame>
  </vertical>
)
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
var myPath = new Path();
var myPaint = new Paint();
var myMatrix = new Matrix();
var myPoint = new Point(50, 300);



myPaint.setStrokeWidth(2);
myPaint.setTextAlign(Paint.Align.CENTER);
myPaint.setColor(-28707)
// myPaint.setColor(-65536)
// myPaint.setColor(13823224)
myPaint.setStyle(Paint.Style.FILL_AND_STROKE);
// myPaint.setStyle(Paint.Style.FILL);
// myPaint.setStyle(Paint.Style.STROKE);
var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
var myCanvas = new Canvas(bitmap);


var 弧度360=function(){
  var 角度=0
  return function(){
    if(角度>360){角度=0}
    角度=角度+10
    return 角度;
  }
}()
view = ui.board
var rect = new Rect;
view.getBoundsOnScreen(rect)
left=rect.left
top=rect.top
right=rect.right
bottom=rect.bottom
centerx = rect.centerX()
centery = rect.centerY()
w=view.getWidth()
h=view.getHeight()
log(centerx,centery,w, h)

黑洞圆的半径=50
var 半边宽度=w/2
myPath.reset();
ui.board.on("draw", function (canvas) {
  canvas.drawARGB(255, 127, 127, 127);
  myPath.reset();

  myPath.moveTo(50, 300);


  myPath.quadTo(myPoint.x, myPoint.y, 900, 300);
  canvas.drawPath(myPath, myPaint);


  // canvas.drawBitmap(bitmap, 0, 0, myPaint);
});
// path.moveTo(500,300);
// path.lineTo(378,230);
// myCanvas.drawPath(path, myPaint);
ui.post(
  function () {
    threads.start(function () {
      asd(myCanvas, myPaint, myPath);
    });
  }
)
view=ui.board
function asd(myCanvas, myPaint, myPath) {
  画黑洞(myCanvas, myPaint,myPath)
}


function 画黑洞(myCanvas, myPaint,myPath){



}

function youWannaDo(myCanvas, myPaint,myPath,myPoint){
  // toastLog('hello')
  myPath.reset();
  myPath.moveTo(50, 300);

  myPath.quadTo(myPoint.x, myPoint.y, 900, 300);
  myCanvas.drawPath(myPath, myPaint);


}
view.setOnTouchListener(function(view, event){
  switch(event.getAction()){
      case event.ACTION_DOWN:
          x = event.getRawX();
          y = event.getRawY();
          downTime = new Date().getTime();
          // toastLog('down')

          return true;
      case event.ACTION_MOVE:
          //如果按下的时间超过5秒判断为长按，退出脚本
          // if(new Date().getTime() - downTime > 5500){
          //     exit();
          // }
          // toastLog('world')
          myPoint.x =  event.getX();
          myPoint.y =  event.getY();
          // log(myPoint)
          // youWannaDo(myCanvas, myPaint,myPath,myPoint)
          return true;
      case event.ACTION_UP:
          //手指弹起时如果偏移很小则判断为点击
          if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
          }
          return true;
  }
  return true;
});
