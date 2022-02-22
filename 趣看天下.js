"auto";
var w=device.width,h=device.height;
waitForActivity("com.yanhui.qktx.activity.MainActivity");
function cha(){if(currentPackage()!="com.yanhui.qktx"){toast("结束"); exit();}}

sleep(400);
device.setBrightnessMode(0);
device.setBrightness(0);
while(true){
    sleep(200);
    if(!click("刷新"))click("首页");
    sleep(random(1500,3000));
    var list=id("rv_news").findOnce();
    if(list==null)continue;
    for(var i=1;i<list.childCount();i++){
        cha();
        var item=list.child(i);
        if(item==null)continue;
        if(item.find(text("置顶")).size()!=0)continue;
        if(item.find(text("广告")).size()!=0)continue;
        if(item.find(id("iv_play")).size()!=0)continue;
        if(random()<0.1)continue;
        item.click();
        sleep(random(1000,2500));
        var stimes=random(6,8);
        for(var j=0;j<stimes;j++){
            click("展开查看全文");
            sleep(random(3000,5000));
            cha();
            swipe(w/2+random(5,25),h*0.6+random(5,20),w/2+random(5,15),h*0.2+random(10,25),random(600,1000));
            sleep(random(800,1800));
        }
        cha();
        back();
        sleep(random(800,2800));
    }  
    sleep(random(2800,4200));
    
}