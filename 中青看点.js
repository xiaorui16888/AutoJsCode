"auto";
var max=dialogs.input("大约刷多少分钟",60);
var t=0;
var w=device.width,h=device.height;
waitForActivity("com.weishang.wxrd.activity.MainActivity");
function cha(){if(currentPackage()!="cn.youth.news"){toast("结束"); exit();}}
function is(parent){
    if(parent.childCount()==0){if(parent.text()=="\u5e7f\u544a"||(parent.text()=="\u4e13\u9898"||parent.text()=="精彩视频"))return true;return false;}
    for(var i=0;i<parent.childCount();i++){
        if(is(parent.child(i)))return true;
    }
    return false;
}
sleep(200);
while(t<1.5*max){
    sleep(400);
    id("tv_home_tab").findOne().click();
    sleep(random(1000,1500));
    var list=className("android.widget.ListView").findOne();
    if(list==null)continue;
    for(var i=2;i<list.childCount();i++){
        var item=list.child(i);
        if(item==null)continue;
        if(is(item))continue;
        if(random()>0.85)continue;
        item.click();
        var stimes=random(8,11);
        for(var j=0;j<stimes;j++){
            sleep(random(2000,3000));
            cha();
            swipe(w/2+random(5,15),h*0.6+random(10,25),w/2+random(5,15),h*0.3+random(10,20),random(700,1000));
            sleep(800);
            if(click("查看全文，奖励更多"))j-=2;
        }
        cha();
        back();
        t++;
        if(t%7==4||t%13==9)sleep(random(8000,10000));
        sleep(random(500,1000));
    }
    sleep(400);
    
    list.scrollDown();
    sleep(600);
    list=className("android.widget.ListView").findOne();
    if(list==null)continue;
    for(var i=1;i<list.childCount();i++){
        var item=list.child(i);
        if(item==null)continue;
        if(is(item))continue;
        if(random()>0.85)continue;
        item.click();
        var stimes=random(8,11);
        for(var j=0;j<stimes;j++){
            sleep(random(2000,3000));
            cha();
            swipe(w/2+random(5,15),h*0.6+random(5,20),w/2+random(5,15),h*0.3+random(10,20),random(700,1000));
            sleep(800);
            if(click("查看全文，奖励更多"))j-=2;
        }
        cha();
        back();
        t++;
        if(t%7==4||t%13==9)sleep(random(7000,12000));
        sleep(random(500,1000));
    } 
    sleep(random(800,1500));
}