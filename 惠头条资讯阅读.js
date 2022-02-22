auto.waitFor()

setScreenMetrics(1080, 2160)
;




//设置媒体音量
device.setMusicVolume(0)






threads.start(function(){
    
while(true){
    id("img_close").findOne().click()
    
    }
    
    
    })



     threads.start(function(){
         while(true){
         text("安全升级").findOne()
         click("以后再说")}
         })






//五小时之后，运行惠头条视频脚本
threads.start(function(){
    
    sleep(5.5*60*60*1000)
    text("奇趣").findOne()
engines.execScriptFile("./惠头条视频.js");
exit()

})

threads.start(function(){sleep(20000)


//设置亮度
//device.setBrightnessMode(0)
sleep(1000)
device.setBrightness(3)
})



     threads.start(function(){
     //以下为子线程
     //遇到加锁软件自动关闭
   while(true){
   id("confirm_lock_pattern_view").findOne()
back()
}

 }); 
 



//遇到打开软件弹窗，则关闭
threads.start(function(){
    while(true){id("img_close").findOne().click()}
    })
    
    
    //遇到忽略，点击忽略
    threads.start(function(){
    while(true){text("忽略").findOne().click()
    }
    })
    
   
    //如果遇到时段奖励，则领取
    threads.start(function(){
    while(true){
        text("奇趣").findOne()
  click(943,139)
  sleep(60*60*1000)

    }
    })


//遇到时段奖励的弹窗则关闭
   threads.start(function(){
    while(true){id("tv_click_more").findOne().click()

    }
    })



launchApp("惠头条")
sleep(11000)

while(true){
if(text("奇趣").exists()){
 
 sleep(2000)
swipe(611,361,611,953,1000)
sleep(3000)
click(560,1164)

}else{
    for(var g=0;g<20;g++){
        sleep(4500)
        swipe(300,900,300,700,500)
        }
sleep(4500)
back()}
sleep(1000)}







