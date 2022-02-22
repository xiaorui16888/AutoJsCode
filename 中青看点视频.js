"auto";
console.show();
device.keepScreenOn();
while(true){
   swipe(990,400,990,1000,800);
   sleep(2000);
   var list=id("pull_list_view").findOnce();
   for(var i=1;i<list.childCount();i++){
       if(list.child(i).find(text("广告")).size()!=0)continue;
       log(list.child(i).find(id("tv_video_title")).get(0).text())
       list.child(i).click();
       sleep(32000);
       back();
       sleep(400);
   }
}