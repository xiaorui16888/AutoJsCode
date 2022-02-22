launchApp("支付宝");
var window = floaty.window(
    <frame>
        <button id="action" text="开始运行" w="90" h="40" bg="#77ffffff"/>
    </frame>
);

setInterval(()=>{}, 1000);

var execution = null;

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function(view, event){
    switch(event.getAction()){
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if(new Date().getTime() - downTime > 1500){
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                onClick();
            }
            return true;
    }
    return true;
});

function onClick(){
    if(window.action.getText() == '开始运行'){
       window.action.setText('正在运行');
        engines.execScript("zfb", "zfb();\n" + zfb.toString());
         window.action.setText('运行完毕');
       window.action.setText('开始运行');
        
    }else{
        window.action.setText('开始运行');
    }
}
function zfb(){
    //注意，这里的变量和脚本主体的变量并不共享
     var aaa=getClip();
var bbb=aaa.replace(/[&\|*^%$#@\-¥€<>()"=;{}!+-?]/g,"");
setClip(bbb);
shell("am start -n com.eg.android.AlipayGphone/com.alipay.android.phone.discovery.envelope.HomeActivity", true);
  sleep(100);
 Tap(284,1625);
  sleep(100);
  Tap(659,1154);
  sleep(20);
  Tap(915,1462);
  sleep(20);
  Tap(832,795);
}