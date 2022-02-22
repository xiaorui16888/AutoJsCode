sleep(1);
//可以在不打开指针显示下获取坐标点，刘海屏福音！非刘海屏使用，请详细查看下面注释
/*threads.start(function() {
    events.observeKey();
    events.on("key_down", function(keyCode, events) {
        if (keyCode == keys.volume_up) {
            exit();
        };
    });
});
*/

var window = floaty.window(    
    <frame h="80">
     <img src="http://img03.sogoucdn.com/app/a/100520146/71316125981b3b548da388527ac92f65" />
 
        <text id="action" text="  取坐标点" color="#ffffff" bg="#00000000"/>
           </frame>
);
setInterval(()=>{}, 1000);
toastLog("轻点复制坐标到通知栏、日志。长按0.5秒退出");
sleep(2500);
toast("轻点复制坐标到通知栏、日志。长按0.5秒退出");
var execution = null;
aw=0;
ah=0;
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
            aw=window.getWidth();
            ah=window.getHeight();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            onchange();
            return true;
        case event.ACTION_UP:
            onchange();
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                //如果按下的时间超过0.2秒判断为长按，退出脚本
            if(new Date().getTime() - downTime > 5){
                setClip(bx+","+by);
                log(bx+","+by);
                window.action.setText("  复制成功");
            }
            if(new Date().getTime() - downTime > 500){
               toastLog("退出脚本");
               exit();
            }   
            }                                                          
            
            return true;
    }
    return true;
});

function onchange(){
ax = window.getX();
ay = window.getY();
bx=ax+(aw/2);
by=ay+(ah+2/2)-50;//刘海专用！非刘海：by=ay+(ah/2);可微调后面的50
window.action.setText("  "+bx+","+by);

            
      
}





