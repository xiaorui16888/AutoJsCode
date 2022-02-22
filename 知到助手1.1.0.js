while(true){
try{
    auto();
    mySlowLog("无障碍开启成功",500);
    break;
    }
catch(a){
    myLog("无障碍服务未开启");
    sleep(3000);
    }
}

launchApp("知到");
mySlowLog("已打开知到，请手动进入课程",2000);
var image_close, zoomImg,
    _10, _125, msg;
    
while(true){
    sleep(200);
    if(id("zoomImg").exists()){
       mySlowLog("全屏",500)
       id("zoomImg").findOne().click();
       sleep(1000);
    }
    else if(id("image_close").exists()){
       id("image_close").findOne().click();
       myLog("关闭弹窗");
    }
    else if(id("rateLayout").text("1.0x").exists()){
       id("rateLayout").text("1.0x").findOne().click();
    }
    else if(id("rateLayout").text("1.25x").exists()){
       mySlowLog("1.5x倍速",500);
       id("rateLayout").text("1.25x").findOne().click();
       sleep(2000);
    }
    else if(id("lineLayout").text("标准").exists()){
       id("lineLayout").text("标准").click();
       mySlowLog("切换画质流畅",1000);
       text("流畅").click();
       sleep(1000);
    }
}
function myLog(msg){
    console.log(msg);
    toast(msg);
}
function mySlowLog(msg, waitTime){
    console.log(msg);
    toast(msg);
    sleep(waitTime);
}