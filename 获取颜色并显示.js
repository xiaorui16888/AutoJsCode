toastLog("有问题联系 QQ:986883511");

if(!requestScreenCapture()){
    toastLog("请求截图失败");
    exit();
}

var 颜色字符串;
setInterval(()=>{
    try{
        _x_color=window.getX()+150;
        _y_color=window.getY()+150;
        _c_color = images.pixel(captureScreen(), _x_color, _y_color);
        _ARGB=colors.toString(_c_color);
        _RGB="#"+_ARGB.substring(3,9);
        颜色字符串="坐标点("+_x_color+","+_y_color+") "+"RGB:"+_RGB+" "+"ARGB:"+_ARGB;
        //log(颜色字符串);
        ui.run(()=>{
            window.action.setText(_ARGB);
            window.end.setBackgroundColor(colors.parseColor(_ARGB));
            window.action.setTextColor(colors.parseColor(_ARGB));
        });
    }catch(e){
        log(e);
    }
}, 100);

var window = floaty.rawWindow(
    <frame h="300px" w="300px">
    <vertical  >  
        <text bg="#000000"id="action" gravity="center"text="查色" textSize="55px"w="300px"h="140px"/>  
        <horizontal  gravity="center"> 
            <text alpha="0.5"bg="#000000"id="tu1" text="" w="140px" h="20px"/> 
            <text alpha="0" id="tu2" text="" w="20px" h="20px"/> 
            <text alpha="0.5"bg="#000000"id="tu3" text="" w="140px" h="20px"/> 
        </horizontal> 
        <text bg="#ffffff" gravity="center"id="end" text="复制结束" textColor="#000000"textSize="60px"w="300px" h="140px"/> 
    </vertical>   
    </frame>
);
sleep(100);
var 显示位置=parseInt(device.width/2-window.getWidth()/2);
window.setPosition(显示位置,显示位置);



window.action.on("touch",(event)=>{
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
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                app.openUrl("http://tool.oschina.net/commons?type=3");
            }
            return true;
    }
    sleep(10);
    return true;
});

window.end.click(()=>{
    setClip(颜色字符串);
    log(颜色字符串);
    exit();
    floaty.closeAll();
});

