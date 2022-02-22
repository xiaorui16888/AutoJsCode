/**
 * 原文链接:  https://blog.csdn.net/u014452224/article/details/55193542
 * 翻译:     家
 * QQ:      203118908
 * 功能:    波浪进度条
 */
'ui';
var marginSize = '30'
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
importClass(android.animation.ObjectAnimator)
importClass(android.graphics.PorterDuffXfermode)
importClass(android.graphics.Xfermode)
importClass(android.graphics.PorterDuff)
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
ui.post(
  function(){
    w=view.getWidth()
    h=view.getHeight()
  }
)
w=0
黑洞圆的半径=50
var 半边宽度=w/2
myPath.reset();
mWaveHight = 150;//水波纹的高度
mWaveWidth = 100;//水波纹的宽度
mWaveSpeed = 30;
maxProgress = 100;
currentProgress = 0;
var currentY;
deviceHeightHalf=device.height/2
deviceWidthHalf=device.width/2
deviceWidth=device.width
deviceHeight=device.height
distance=0
ui.board.on("draw", function (canvas) {
  canvas.drawARGB(255, 127, 127, 127);
  myPath.reset();
  distance+=30;
  // log(distance,w)
  if(distance>w){
    distance=0
  }
  myPath.moveTo(0-distance,deviceHeightHalf);
  waveNum = deviceWidthHalf/mWaveWidth;
  num = 0;
  for(var i =0;i<waveNum;i++){
      myPath.quadTo(mWaveWidth*(num+1)-distance,deviceHeightHalf-mWaveHight,mWaveWidth*(num+2)-distance,deviceHeightHalf);
      myPath.quadTo(mWaveWidth*(num+3)-distance,deviceHeightHalf+mWaveHight,mWaveWidth*(num+4)-distance,deviceHeightHalf);
      num+=4;
  }
  myPath.lineTo(deviceWidth,deviceHeight);
  myPath.lineTo(0-mWaveWidth,deviceHeight);
  myPath.close();
  canvas.drawPath(myPath, myPaint);
});
