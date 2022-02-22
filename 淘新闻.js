"auto";
setScreenMetrics(1080,2160);
var left_num=50;
function cha(){if(currentActivity()!="com.coohua.xinwenzhuan.controller.MainActivity"){toast("结束");exit();}}
waitForActivity("com.coohua.xinwenzhuan.controller.MainActivity");
if(textMatches("推荐").find().size()==0){toast("请到主界面再打开脚本");exit();}
textMatches("推荐").findOnce().parent().click();
sleep(400);
while(left_num>0){
click(110,2080);;
sleep(1500+random()*2000);
cha();
var list=className("android.support.v7.widget.RecyclerView").findOnce();
for(var i=0;i<list.childCount();i++){
    if(list.child(i).find(idContains("_ad")).size()!=0)continue;
    if(list.child(i).find(idContains("_video")).size()!=0)continue;
    if(list.child(i).find(idContains("img_large_title")).size()!=0)continue;
    if(list.child(i).className()=="android.widget.TextView")continue;
    list.child(i).click();
    var t=0;
    while(className("android.webkit.WebView").find().size()<2&&t<8){sleep(700);t++;}
    if(t==8){cha();back();break;}//等待过久，退出
    sleep(600);
    var web=className("android.webkit.WebView").find().get(1);
    cha();
    click("查看全文");
    left_num=id("news_detail_credit_text").findOnce().text();
    if(left_num.length>3){console.show();log(left_num);exit();}
    toast("剩下"+left_num+"篇");
    
    for(t=0;t<9;t++){
        swipe(540,1700,540,500,200);
        sleep(700+random()*300);
    }
    //效率高，错误也多，替换上面for循环
   // t=0;
   // while(web.scrollDown()&&t<6){sleep(900+random()*400);t++;}
   while(id("news_detail_credit_text").find().size()!=0){
      cha();
      back();
      sleep(500);
   }
   sleep(600);
}
}