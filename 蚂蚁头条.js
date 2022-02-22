"auto";
var max=dialogs.input("大约刷多少分钟",60);
var t=0;
var w=device.width,h=device.height;
waitForActivity("com.weishang.wxrd.activity.MainActivity");
function cha(){if(currentPackage()!="com.ldzs.zhangxin"){toast("结束"); exit();}}


sleep(400);
while(t<1.4*max){
    sleep(200);
    id("tv_home_tab").findOne().click();
    sleep(800+800*random());
    var list=id("pull_list_view").findOnce();
    for(var i=1;i<list.childCount();i++){
        if(list.child(i).find(textContains("广告")).size()!=0)continue;
        list.child(i).click();
        for(var j=0;j<11;j++){
            sleep(2000+2000*random());
            cha();
            swipe(w/2,h*0.6,w/2,h*0.3,800);
            sleep(500);
           
        }
        cha();
        back();
        t++;
        sleep(500+500*random());
    }
    
    sleep(300);
    list.scrollDown();
    sleep(800);
    list=id("pull_list_view").findOnce();
    for(var i=1;i<list.childCount();i++){
        if(list.child(i).find(textContains("广告")).size()!=0)continue;
        list.child(i).click();
        for(var j=0;j<11;j++){
            sleep(2000+2000*random());
            cha();
            swipe(w/2,h*0.6,w/2,h*0.3,800);
            sleep(500);
            
        }
        cha();
        back();
        t++;
        sleep(400+600*random());
    }   
}