"auto";
toast("开始了");
var w=device.width;var h=device.height;
device.keepScreenOn();
function cha(){if(currentActivity()!="com.baidu.iknow.video.activity.HomeVideoDetailActivity"){toast("结束");exit();}}

while(true){
    var time=10000+10000*random();
    sleep(time);
    cha();
    if(random()>0.5){
        if(id("frame_like").find().size()!=0){
            var b=id("frame_like").findOnce().bounds();
            click(b.left/2+b.right/2,b.top/2+b.bottom/2);
            
        }
    }
    time=12000+6000*random();
    sleep(time);
    cha();
    var p=0.3+random()*0.4;
    swipe(w*p,h*0.9,w*p,h*0.3,500+random()*300);
}