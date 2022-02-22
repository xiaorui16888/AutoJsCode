"auto";
var ts = dialogs.input("1.需要截屏权限以读取视频进度\n2.请务必关闭护眼模式\n\n下面输入阅读视频个数",160);
if(!ts){
   toast("结束");
   exit(); 
}
if(!requestScreenCapture()){
   toast("请求截图失败");
   exit();
}
toast("刷宝刷视频开始");
sleep(400);
var w=device.width;var h=device.height;

function cha(){if(currentPackage()!="com.jm.video"){toast("结束");exit();}}

var divider=id("divider").findOnce();
if(divider==null){toast("获取进度条高度失败，退出");exit();}
var dh=divider.bounds().top/2+divider.bounds().bottom/2;
var t=0;
while(t<ts){
    sleep(500);
    if(random()>0.85)var rn=(0.30+random()*0.3).toFixed(2);
    else var rn=(0.78+random()*0.12).toFixed(2);
    var l=0;
    while(!images.findColorInRegion(captureScreen(),"#ffe5e5e5",w*rn,dh)&&l<90){sleep(350);l++;}
    cha();
    if(random()>0.8){
        if(id("image_view").find().size()!=0){
            var b=id("image_view").findOnce().bounds();
            click(b.left/2+b.right/2+random(5,10),b.top/2+b.bottom/2+random(3,8));    
        }
    }
    sleep(1000);
    cha();
    if(random()>0.5)swipe(w*0.6-random(10,30),h*0.7+random(10,20),w*0.6+random(50,80),h*0.4+random(10,30),random(220,235));
    else swipe(w*0.6-random(10,30),h*0.7+random(10,20),w*0.6+random(50,80),h*0.4+random(10,30),random(220,235));
    log(++t); 
}
home();