

auto.waitFor();///单独auto的请在没有障碍模式下会停止
//setScreeMetrics(1080, 1920)
////sleep("1000")
sleep("1000")
toast("开始启动脚本................")
//home()
//
//click(100, 100) 
//threads.start(function () {

// while(1){
//toast("现在线程1")
// sleep(4000) 
// swipe(96,1022,575,465,3000)
///// } 
///});


//toast(!click("躺一会"))///直接找字，后台查找的///找到了返回false，跟帮助文档有区别
//toast (click("躺一会", 0))//只点击第一次TEXT

////click(left, top, bottom, right)//点击（x,y,x1,y1）
//longClick(text[, i]))//需要长按的文字
//scrollUp([i])//找到第i+1个可滑动控件上滑或左滑。返回是否操作成功。屏幕上没有可滑动的控件时返回false，例如scrollUp(0)为滑动第一个可滑动控件。
//scrollDown([i])/找到第i+1个可滑动控件下滑或右滑。返回是否操作成功。屏幕上没有可滑动的控件时返回false，例如scrollUp(0)为滑动第一个可滑动控件。
//setText([i, ]text)//不加参数i则会把所有输入框的文本都置为text。例如setText("测试")。这里的输入文本的意思是，把输入框的文本置为text，而不是在原来的文本上追加。
//input([i, ]text)    //不加参数i则会把所有输入框的文本追加内容text。例如input("测试")。
//  var sendButton = text("发送").findOne();  //text("发送")表示一个条件(文本属性为"发送")，findOne()表示基于这个条件找到一个符合条件的控件，从而我们可以得到发送按钮sendButton，再执行sendButton.click()即可点击"发送"按钮。
//  sendButton.click();  //
//   desc("搜索").findOne().click(); //控件有各种属性，包括文本(text), 描述(desc), 类名(className), id等等
//    id("action_search").findOne().click()//id搜索
// 除了这些属性外，主要还有以下几种属性：

///className 类名。类名表示一个控件的类型，例如文本控件为"android.widget.TextView", 图片控件为"android.widget.ImageView"等。
//packageName 包名。包名表示控件所在的应用包名，例如QQ界面的控件的包名为"com.tencent.mobileqq"。
//bounds 控件在屏幕上的范围。
//drawingOrder 控件在父控件的绘制顺序。
//indexInParent 控件在父控件的位置。
//////clickable 控件是否可点击。
////longClickable 控件是否可长按。
//checkable 控件是否可勾选。
//checked 控件是否可已勾选。
//scrollable 控件是否可滑动。
//selected 控件是否已选择。
//editable 控件是否可编辑。
//visibleToUser 控件是否可见。
//enabled 控件是否已启用。
//depth 控件的布局深度。   //
//    //
//click() 点击。点击一个控件，前提是这个控件的clickable属性为true
//longClick() 长按。长按一个控件，前提是这个控件的longClickable属性为true
//setText() 设置文本，用于编辑框控件设置文本。
//scrollForward(), scrollBackward() 滑动。滑动一个控件(列表等), 前提是这个控件的scrollable属性为true
////exits() 判断控件是否存在
//waitFor() 等待控件出现    //
//    //
//    //
///while(true){
//  className("EditText").findOne().setText("刷屏...");
//  text("发送").findOne().clicK();
//}
//    //如果不加findOne()而直接进行操作，则选择器会找出所有符合条件的控件并操作。
// toast(app.getPackageName("微信"))。   //控件的packageName表示控件所属界面的应用包名。例如微信的包名为"com.tencent.mm", 那么微信界面的控件的packageName为"com.tencent.mm"。
// //启动Auto.js
//launchApp("Auto.js");
//在6秒内找出日志图标的控件
//var w = id("action_log").findOne(6000);
//如果找到控件则点击
//if(w != null){
////    w.click();
//}else{
//否则提示没有找到
//toast("没有找到日志图标");
//}   //以上是六秒内找到控件并点击
//  var b = desc("打开侧拉菜单").findOne().bounds();
//click(b.centerX(), b.centerY());
//如果使用root权限，则用 Tap(b.centerX(), b.centerY());  //
//    //以上是如果一个控件本身无法通过click()点击，那么我们可以利用bounds()函数获取其坐标，再利用坐标点击。例如：
//toast  id()  //获取控件的id，如果一个控件没有id，则返回null。
//  text()  //获取控件的文本，如果控件没有文本，返回""。
//    //
//    //
//id("chat_item_head_icon").findOne();
// findOne().clicK();
//    //
//id("chat_item_head_icon").findOne().click(); 
//    //









function czsr(kj, mc, zwm) {
    kj(mc).findOne().setText(zwm)
    toast(zwm)
 
}///查找输入

function czdj(kj, mc, zwm) {
    kj(mc).findOne().click()
    toast(zwm)
  
    
}///查找点击
function czpd(kj, mc, zwm) {
    kj(mc).findOne()
    toast(zwm) 
    
}///查找判断

 

function longtap(x, y) {
    longClick(x, y)
}

function lxtap(x, y) {
    for (var i = 0; i < 100; i++) {
        //点击位置(500, 1000), 每次用时1毫秒
        press(500, 1000, 1);
    }
}


function swipe(x1, y1, x2, y2, duration) {
    swipe(x1, y1, x2, y2, duration)
}

function xxswipe(delay1, duration1, [x1, y1], [x2, y2], delay2, duration2, [x3, y3], [x4, y4]) {
    gestures([delay1, duration1, [x1, y1], [x2, y2]],
        [delay2, duration2, [x3, y3], [x4, y4]]);
}





czdj(desc, "发消息", "发消息")
czsr(id, "input", "我爱你")
czdj(id, "fun_btn", "发送")
czdj(text, "发送", "发送")

czdj(id, "tosign", "一键签到")
czdj(id, "ll_tab1_layout", "刷新")
czdj(className, "android.widget.lmageView","广告关闭")

























//    //
//    //
//    //
//    //
//    //
//    //
//    //
