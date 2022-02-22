sjxs=1.715;//时间系数，自己修改
//修改了我的bug
setScreenMetrics(1080,1920)
var window = floaty.window(
    <frame>
        <button id="action" text="记起点" w="90" h="40" bg="#7766ccff"/>
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
            
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                //如果按下的时间超过0.2秒判断为长按，退出脚本
            if(new Date().getTime() - downTime > 200){
                window.action.setText('记起点');
            }else{
                onClick();}
            }
            onClick();
            return true;
    }
    return true;
});
qx=0;qy=0;zx=0;zy=0;
function onClick(){

       if(window.action.getText()=="记起点"){
            qx=window.getX();
            qy=window.getY();
        window.action.setText('记终点');}else if(window.action.getText()=="记终点"){
            zx=window.getX();
            zy=window.getY();
            window.action.setText('记起点');
                threads.start(function(){
            x=zx-qx;//x长度
            y=(zy-qy)*(449/262);//y长度
            time=Math.sqrt((x*x)+(y*y))*sjxs;//长度乘时间系数
            var rand=random(0,100);
            press(300+rand,300+rand,time);});
            }
      
}






