//console.show()
setScreenMetrics(1080, 1920);
var biaoti=""
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
    sleep(2000)
    //toast(list.child(i).find(textContains("广告")).size())
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
   log("2")
     }
     biaoti=biaoti1
     }
     sleep(2000)
     click(88,162)
     }
      
     waitForActivity("com.martian.hbnews.activity.MainActivity")
    sleep(3000)
     }
     sleep(4000)
  swipe(544,1633,544,404,500)
sleep(2000)
swipe(544,1077,544,404,300)
sleep(2000)
swipe(544,1077,544,404,300)
sleep(2000)
     }