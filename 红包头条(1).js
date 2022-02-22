//console.show()
launchApp("红包头条")
sleep(10000)
/*id("tab_textview").className("android.widget.TextView").text("任务").findOne().parent().click()
sleep(2000)
id("mc_sign").findOne().click()
id("fr_option_button").findOne().click()*/
/*if(text("立即签到").exists()){
text("立即签到").click()
}
id("fr_option_button").findOne().click()
id("tab_textview").className("android.widget.TextView").text("头条").findOne().parent().click()*/
setScreenMetrics(1080, 1920);
var biaoti=""
swipe(544,1633,544,404,500)
sleep(2000)
swipe(544,1077,544,404,300)
while(true){
    waitForActivity("com.martian.hbnews.activity.MainActivity")
var list=className("android.support.v7.widget.RecyclerView").findOne();
//log(list.children())

//log(list1[0])
for(var i=0;i<list.childCount();i++){
    //toast("进去了")
  //  toast(i)
    //if(id("news_push_hint").exists()){
 // back()
//}
    
    //sleep(2000)
  //  waitForActivity("com.martian.hbnews.activity.MainActivity")
    sleep(1000)
    //toast(list.child(i).find(textContains("广告")).size())
  list=className("android.support.v7.widget.RecyclerView").findOne()
var c=list.child(i).find(textContains("广告"))
toast(c.empty())
if(c.empty()){
  var biaoti1=list.child(i).child(0).child(0).child(0).text()
  if(biaoti!=biaoti1){
    list.child(i).child(0).child(0).click();     
  waitForActivity("com.martian.hbnews.libnews.activity.MartianNewsWebViewActivity")
   sleep(2000);
   h=random(8,9)
   log(h)
   for(var j=0;j<h;j++){
    swipe(504,1437,504,837,300)
   sleep(600+random(2,4)*600)
   淘宝()
   if(id("news_push_hint").exists()){
  recents()
sleep(2000)
swipe(892,1457,204,1457,200)

sleep(3000)
click(854,1425)
sleep(3000)
  
  exit()
}
   log("2")
     }
     biaoti=biaoti1
     }
     sleep(2000)
     click(88,162)
     sleep(2000)
     if(currentActivity()=="com.martian.hbnews.libnews.activity.MartianNewsWebViewActivity"){
         back()
         }
     }
      
     waitForActivity("com.martian.hbnews.activity.MainActivity")
     
    sleep(2000)
     }
     sleep(2000)
  swipe(544,1633,544,404,300)
sleep(2000)
swipe(544,1077,544,404,300)
sleep(2000)
swipe(544,1077,544,404,300)
sleep(2000)
     }
     function 淘宝(){
        if(currentActivity()=="com.taobao.browser.BrowserActivity"){
            back()
            
            }
         
         
         
         }