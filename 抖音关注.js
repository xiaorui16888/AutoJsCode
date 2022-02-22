auto();
    for(;;){
    var a=className("android.support.v7.widget.RecyclerView").findOne();
  var b=a.children();
   b.forEach((item,pisition)=>{
       var gz=item.findOne(text("关注"));
       if(gz){gz.click();sleep(2000)}
       }
       )
   scrollDown()
   }
   
   
