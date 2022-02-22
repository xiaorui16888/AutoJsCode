"auto";
var ts=dialogs.input("大概刷多久",60);
toast("刷宝刷视频开始");
sleep(400);
var w=device.width;var h=device.height;
device.keepScreenOn();
function cha(){if(currentActivity()!="com.jm.video.ui.main.MainActivity"){toast("结束");exit();}}

var t=0;
while(t<5*ts){
    sleep(random(9000,15000));
    cha();
    swipe(w/2-random(10,30),h*0.7+random(10,20),w/2+random(50,80),h*0.4+random(10,30),random(220,235));
    t++;
}