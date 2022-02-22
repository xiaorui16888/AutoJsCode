auto();
var window = floaty.rawWindow(
    <frame>
    
        <img id="action" src="http://www.autojs.org/assets/uploads/profile/1-profileavatar.jpeg"
                w="40" h="40" circle="true"/>
 
    </frame>
);
//这是以前写的，只做了一半边
//发现好像和全面屏不兼容  没写了
//实现原理很垃圾
setInterval(() => {}, 1000);
window.setSize(800, 800);
var w = device.width;
var h = device.height;
var zt=parseInt(h/40);
//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
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
            // log(windowY + (event.getRawY() - y));
            

            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 1500) {
                exit();
            }

            return true;
        case event.ACTION_UP:
        if (y < 30) {
                window.setPosition(windowX + (event.getRawX() - x), -30);
            log(windowX + (event.getRawX() - x));
            }
            if ((windowX + (event.getRawX() - x)) <= w / 2) {
            
                tx(windowX,windowY,event.getRawX(),event.getRawY(),x,y);
            } else {
                window.setPosition(w - 90,
                    windowY + (event.getRawY() - y));
            }
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
               onClick();

            }
            return true;
    }
    return true;
});


window.setPosition(0, parseInt(w / 8));

function tx(windowX,windowY,RawX,RawY,x,y){
   threads.start(function(){
     //ui.run(function(){
         window.setPosition(40,
            windowY + (RawY - y));
            sleep(60);
        window.setPosition(-30,
            windowY + (RawY - y));
            sleep(55);
        window.setPosition(30,
            windowY + (RawY - y));
            sleep(40);
        window.setPosition(-30,
            windowY + (RawY - y));

    });
}


function onClick() {
    ui.run(function() {
        
    });
log(window.getX());
log(window.getY());
}