/**
 * 作者:  家
 * QQ:    203118908
 * 功能:   阿基米德螺线?
 */
'ui';
ui.layout(
  <vertical>
    <vertical>
      <canvas id='board'></canvas>
    </vertical>
    <button id='but' textSize='16sp'>123</button>
  </vertical>
)
var path = new android.graphics.Path();
var paint = new android.graphics.Paint();
paint.setStrokeWidth(5);
paint.setTextAlign(Paint.Align.CENTER);
paint.setColor(-28707)
paint.setStyle(Paint.Style.STROKE);
var bitmap = android.graphics.Bitmap.createBitmap(1080, 1920, android.graphics.Bitmap.Config.ARGB_8888);
var mcanvas = new Canvas(bitmap);
ui.board.on("draw", function (canvas) {
  canvas.drawBitmap(bitmap, 0, 0, paint);
});
threads.start(function () {
  asd(mcanvas);
});
function asd(canvas) {
  canvas.drawARGB(255, 123, 104, 238);
  path.reset();
  origin = {
    x: 0,
    y: 0
  };
  origin.x = 600;
  origin.y = 600;
  path.moveTo(origin.x, origin.y);
  var point = {};
  var 线速度 = 2
  var 角速度 = 6
  var t = 1
  var width = device.width * 2
  log(width)
  var limit=300
  count=0
  while (count < limit) {
    point.x = 线速度 * t * Math.cos(角速度 * t) + origin.x;
    point.y = 线速度 * t * Math.sin(角速度 * t) + origin.y;
    path.lineTo(point.x, point.y)
    canvas.drawPath(path, paint);
    // log(point)
    sleep(15)
    t++;
    count++;
  }
}
