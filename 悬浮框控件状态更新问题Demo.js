var window = floaty.window(
    <frame w="110">
        <vertical >        
            <button id="action" text="点击拖动" style="Widget.AppCompat.Button.Colored"/>
            <button id="end" text="结束" />
        </vertical>
    </frame>
);
setInterval(() => {}, 500);

var x = 0, y = 0;
var windowX, windowY;
//    events.observeTouch();
    //注册触摸监听器
//    events.onTouch(function(p){
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
                onClick();
            }
            return true;
    }
    sleep(10);
    return true;
});

var numnum=0;
function onClick(str,sec){
    numnum++;
    显示状态信息("按键"+numnum,1);
}

var timerId;
function 显示状态信息(str,sec){
    try {
        clearTimeout(timerId);
    } 
    catch (error) {
        toastLog("error");
    }
    ui.run(()=>{
        window.action.setText(str);
    });
    timerId=setTimeout(function(){
        ui.run(()=>{
            window.action.setText("");
        });
    }, sec*1000);
}

window.end.click(() => {
    floaty.closeAll();
    engines.stopAll();
    exit();
});


var ha=0;
threads.start(function(){
    ha++;
    显示状态信息("线程"+ha,1);
    sleep(3000);
    ha++;
    显示状态信息("线程"+ha,1);
    sleep(3000);
    ha++;
    显示状态信息("线程"+ha,1);
    sleep(3000);
    ha++;
    显示状态信息("线程"+ha,1);
    sleep(3000);
});
