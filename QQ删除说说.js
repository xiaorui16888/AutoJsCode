"auto";

//在次说明，我写这个脚本只希望帮大家解决繁琐的操作
//不希望各位将这脚本拿来恶搞

//因为我在720*1280分辨率的手机写的，其他适不适合不清楚，有问题联系我QQ:2261988895

sleep(4567);
requestScreenCapture();

function 检测(){
    var a = text("写说说").findOne().bounds();
    var YH = findColorInRegion(captureScreen(), "#A1A1A1", a.centerX()+a.width()/3, a.centerY(), 3, 300);
    if(YH){
        click(YH.x,YH.y);
    }
    
}

threads.start(function(){
    //i<10这个设定可以控制删多少条说说
    //在这里只删10条，可以改成100，这样就删100条
    for(var i=0; i<10; i++){
       text("删除").findOne().parent().parent().click();
    }
});//子线程

threads.start(function(){
    for(;;){
        click("确认");
    }
});//子线程

for(;;){
    检测();
    sleep(500);
}//主线程

