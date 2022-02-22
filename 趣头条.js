"auto";
var max=dialogs.input("大约刷多少分钟",60);
var t=0;
var w=device.width,h=device.height;
waitForActivity("com.jifen.qkbase.main.MainActivity");
function cha(){if(currentPackage()!="com.jifen.qukan"){toast("结束"); exit();}}
function is(parent){
    if(parent.childCount()==0){if(parent.text()=="\u5e7f\u544a"||(parent.text()=="\u7f6e\u9876"||parent.text()=="\u89c6\u9891"))return true;return false;}
    for(var i=0;i<parent.childCount();i++){
       if(is(parent.child(i)))return true;
    }
    return false;
}
while(t<1.1*max){
    sleep(400);
    click("刷新");
    sleep(random(2000,3000));
    var list=className("android.support.v7.widget.RecyclerView").findOnce();
    sleep(250);
    //var is_ent=false;
    for(var i=1;i<list.childCount()/*&&!is_ent*/;i++){
        if(list.child(i).find(text("广告")).size()!=0)continue;
        if(list.child(i).find(text("置顶")).size()!=0)continue;
        if(list.child(i).find(text("视频")).size()!=0)continue;
        if(list.child(i).find(id("aay")).size()!=0)continue;//aay是图集内特征id
        //is_ent=true;
        list.child(i).click();
        var stimes=random(7.9,10.1);
        for(var j=0;j<stimes;j++){
            sleep(1400+1000*random());
            cha();
            swipe(w/2+random(10,20),h*0.6+random(10,40),w/2+random(20,30),h*0.25+random(30,60),random(500,800));
            sleep(1600+800*random());
        }
        cha();
        back();
        t++;
        if(t%5==4)sleep(9000);
        sleep(random(1600,2600));
    }
}