auto();
var window = floaty.window(
    <frame>    
        <img id="action" src="http://www.autojs.org/assets/uploads/profile/1-profileavatar.jpeg"
                w="40" h="40" circle="true"/>
                     </frame>
);
setInterval(() => {}, 1000);

var w = device.width;
var h = device.height;
/*
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
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 1500) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                onClick();
            }
            return true;
    }
    return true;
});
*/

var wi=w/2-20;
var hi=h/2-20;
var i=0;
var o=0;

window.setPosition(wi,hi);

var fx;

sensors.register("gravity", sensors.delay.game)
    .on("change", function(event, gx, gy, gz){
      //  log("gx:"+gx);
      //  log("gy:"+gy);
      //  log("gz:"+gz);
       //竖直向下为0/10/0
       //右侧向下为-10/0/0
       //左侧向下为10/0/0
       //倒置向下为0/-10/0 
        //水平放置0/0/10
        //背面放置0/0/-10
        if(-5<gx&&gx<5&&5<=gy){
            fx=1;
            
            }
        if(gx<=-5&&-5<gy&&gy<5){
            fx=2;
            
            }
         if(5<=gx&&-5<gy&&gy<5){
            
          fx=3;
            }   
        if(-5<gx&&gx<5&&gy<=-5){
            
           fx=4;
            }
       })  
//onClick();
//function onClick(){
threads.start(function(){
      while(true){
      tot(fx); 
      }
function tot(a){
 
   if(((wi+i)>=w)||((hi+o)>=h)){
       a=5;
           }
   if(((wi+i)<=40)||((hi+o)<=40)){  
   a=6;
   }
 
   
    
   switch (a){
    case 1:
    o++;
    ui.run(function(){
    window.setPosition(wi+i,hi+o);
    });
    sleep(5);
    return true;   
    case 2:
    i++;
    ui.run(function(){
    window.setPosition(wi+i,hi+o);
    });
    sleep(5);
    return true;
    case 3:
    i--;
    ui.run(function(){
    window.setPosition(wi+i,hi+o);
    });
    sleep(5);
    return true;
    case 4:
    o--;
    ui.run(function(){
    window.setPosition(wi+i,hi+o);
    });
    sleep(5);
    return true;
    
    case 5:
    ui.run(function(){
    window.setPosition(w+80,h+80);
    });
    sleep(5);
    return true;
    case 6:
    ui.run(function(){
    window.setPosition(w-80,h-80);
    });
    sleep(5);
    return true;
    
    }
    
    
    
}        
});
//}






