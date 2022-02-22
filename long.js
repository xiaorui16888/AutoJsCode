
//longClickable(true).findOne().longClick();
depth(6).drawingOrder(3).className("android.widget.RelativeLayout").id("name").findOne();
sleep(900);
var a=depth(7).className("android.view.View").desc("录音按钮 按住录音").id("name").findOne();
x=a.bounds().centerX();
y=a.bounds().centerY();
engines.execScriptFile("/sdcard/脚本/222实验室/抢红包/语音红包/long2.js");
press(x,y,5000);
