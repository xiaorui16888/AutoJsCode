"auto";
sleep(5000);

threads.start(function(){ 
    for(;;){
        desc("删除").findOne().click();
    }
});

for(;;){
    var a = id("relativeItem").findOne().bounds();//返回控件范围
    swipe(a.centerX(),a.centerY(),a.centerX()/2,a.centerY(),1000)
}
