/*
适用于 1080*2340 屏幕的手机
右下角悬浮条开始滑动。


*/

var window = floaty.rawWindow(
    <frame>
        <button id="action" text=" " textColor="#850000ec" gravity="center" bg="#3366ec15"/>
    </frame>
);
var window2 = floaty.rawWindow(
    <frame>
        <button  w="*" h="*" circle="true" id="act" text="〇" textSize="10sp" textColor="#ff0000ec" gravity="center" bg="#9966ec15"/>
    </frame>
);
setInterval(() => {}, 1000);
window.setTouchable(true);
ww=30
hh=700
window.setSize(ww,hh);
//0
kx=1080/(1080-850)
ky=2340/(2340-1555)
window.setPosition(1060, 1444)
window2.setSize(30, 30)
var execution = null;
window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            return true;
        case event.ACTION_MOVE:

            xx = event.getRawX();
           xw=1080-kx*(1080-xx)+300;
            yy = event.getRawY();
           yw=2340-ky*(2340-yy)
           
            xc=xx-x;
            yc=yy-y;
            window2.setPosition(xw, (yw- 78))
            return true;
        case event.ACTION_UP:
            threads.start(function() {
                x=window2.getX()
                y=window2.getY()
                if(x<0||y<0){
                    }else{
                window2.setSize(0, 0);
                window.setSize(0, 0);
                sleep(80);
                press(x+15 , y +95, 16)
                otim = new Date().getTime();
                window.setSize(ww,hh)
                window2.setSize(30, 30)
                }
            });
 return true;
    }
    return true;
});