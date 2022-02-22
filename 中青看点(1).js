"auto";
var max=dialogs.input("大约刷多少分钟",60);
var t=0;
var w=device.width,h=device.height;
waitForActivity("com.weishang.wxrd.activity.MainActivity");
function cha(){if(currentPackage()!="cn.youth.news"){toast(""); exit();}}
function is(parent){
    if(parent.childCount()==0){if(parent.text()=="\u5e7f\u544a")return true;return false;}
    for(var i=0;i<parent.childCount();i++){
        if(is(parent.child(i)))return true;
    }
    return false;
}
while(t<1.3*max){
    id("tv_home_tab").findOne().click();
    sleep(800);
    var list=className("android.widget.ListView").findOne();
    for(var i=2;i<list.childCount();i++){
        if(is(list.child(i)))continue;
        list.child(i).click();
        for(var j=0;j<12;j++){
            sleep(3500);
            cha();
            swipe(w/2,h*0.6,w/2,h*0.3,800);
        }
        cha();
        back();
        t++;
        sleep(300);
    }
    list.scrollDown();
    sleep(400);
    list=className("android.widget.ListView").findOne();
    for(var i=2;i<list.childCount();i++){
        if(is(list.child(i)))continue;
        list.child(i).click();
        for(var j=0;j<12;j++){
            sleep(3500);
            cha();
            swipe(w/2,h*0.6,w/2,h*0.3,800);
        }
        cha();
        back();
        t++;
        sleep(300);
    }   
}