launchApp("惠头条")
text("视频").findOne().parent().click()

sleep(500)



//遇见播放失败，返回
threads.start(function(){

while(true){
text("视频加载失败~").findOne()
back()
sleep(1000)
}
}
)


//一小时之后，运行趣头条
threads.start(function(){
    
    sleep(1.5*60*60*1000)
    
engines.execScriptFile("./淘新闻.js");
exit()
})

threads.start(function(){
    
while(true){
    id("img_close").findOne().click()
    
    }
    
    
    })





     threads.start(function(){
         while(true){
         text("安全升级").findOne()
         click("以后再说")
         }
         })




     threads.start(function(){
     //以下为子线程
     //遇到加锁软件自动关闭并播放视频
   setInterval(function(){ 
   id("confirm_lock_pattern_view").findOne()
back()
 
},500) });



//播放视频
threads.start(function(){
while(true){
text("游戏").findOne()
sleep(1000)
swipe(300,330,300,700,1000)
sleep(2000)
  
//获取这个控件
var widget = id("adapter_player_control").findOne().bounds();
//获取其中心位置并点击
click(widget.centerX(), widget.centerY());
sleep(1000)
}
//如果用root权限则用Tap
})



//关闭广告
threads.start(function(){
while(true){
id("premovie_ad_skip_layout").findOne().click()
sleep(1000)
}
  
})


//碰见重播返回
threads.start(function(){
while(true){
id("video_center_replay").findOne()
sleep(1000)
back()
sleep(1000)

}
  
})


