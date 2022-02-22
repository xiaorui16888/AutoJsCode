/**
 * 作者:  家
 * QQ:   203118908
 * 功能:  自定义toast
 * 群文件有一个 [动态布局], 帮主 管家 白夫人 乔峰
 */

var count = function () {
  var count = 1
  return function () {
    return count++;
  }
}()

function thread(text, count) {
  threads.start(
    function () {
      for (let i = 0; i < 1; i++) {
        toastAt(text, 366, count * 100)
        sleep(20)
      }
    }
  )
}

function toastAt(msg, x, y) {
  ui.run(() => toastAt0(msg, x, y));
}

function toastAt0(msg, x, y) {
  importClass(android.widget.Toast);
  importClass(android.view.Gravity);
  importClass(android.widget.TextView)
  importClass(android.widget.ImageView)
  // importClass(android.widget.ImgView)
  importClass(android.graphics.BitmapFactory)

  var toast = Toast.makeText(context, msg, Toast.LENGTH_SHORT)  ;



  
  toast.setGravity(Gravity.TOP | Gravity.LEFT, x, y);

  toastView = toast.getView();
  addLayout(toastView) 
  toast.show();
}

function rndColor() {
  return colors.rgb(random(0, 255), random(0, 255), random(0, 255))
}

function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
log('开始')
thread('梅', count())


function addLayout(parent) {
  var layo = new android.widget.LinearLayout(context)
  // var layo=android.widget.FrameLayout.LinearLayout(context)
  layo.setOrientation(android.widget.LinearLayout.HORIZONTAL);
  // layo.setOrientation(android.widget.LinearLayout.VERTICAL);
  layo.setId(android.view.View.generateViewId())
  // layo.setOrientation( android.widget.FrameLayout.LinearLayout.VERTICAL );
  var child1 = new TextView(context);
  child1.setTextSize(20);
  child1.setTextColor(colors.parseColor("#ff00f0"))
  child1.setText("左护法");
  child1.setGravity(0); //左护法
  child1.setLayoutParams(new android.widget.LinearLayout.LayoutParams(0, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, 1));
  // child1.setLayoutParams(new android.widget.LinearLayout.LayoutParams(android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, 0, 1));
  var child2 = new TextView(context);
  child2.setTextSize(20);
  child2.setTextColor(colors.parseColor("#ff00f0"))
  child2.setText("大长老"); //中间的是大长老
  child2.setGravity(1);
  child2.setLayoutParams(new android.widget.LinearLayout.LayoutParams(0, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, 1));
  var child3 = new TextView(context);
  child3.setTextSize(20);
  child3.setTextColor(colors.parseColor("#ff00f0"))
  child3.setText("右护法");
  child3.setGravity(5); //右护法
  child3.setLayoutParams(new android.widget.LinearLayout.LayoutParams(0, android.widget.LinearLayout.LayoutParams.WRAP_CONTENT, 1));




  var child5 = new ImageView(context);
  var imgPath="/sdcard/fo.jpg"
  bitmap = BitmapFactory.decodeFile(imgPath)
  child5.setImageBitmap(bitmap); //要求传递一个bitmap对象  
  child5.setLayoutParams(new android.widget.LinearLayout.LayoutParams(0, android.widget.LinearLayout.LayoutParams.MATCH_PARENT, 1));



  layo.addView(child1)
  layo.addView(child2)
  layo.addView(child3)
  layo.addView(child5)
  parent.addView(layo)
}