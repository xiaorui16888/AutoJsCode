auto();
var w=device.width;
var h=device.height;
//log("w="+w*908/1080+"h="+h*1590/2160)
device.keepScreenDim(50*30*1000);
var i = app.intent({
    action: "findCats",
});
app.sendBroadcast(i);
threads.start(function (){
    while (true){
       if(text("太勤快啦~").exists()){
       toastLog("抓猫结束");
       exit();
        }
        }
    });
for (var i = 0; i < 50; i++) {
    click(w*908/1080, h*1590/2160);
    sleep(500);
    
    text("去逛店").findOnce().click();
    sleep(500);
    
    text("猫猫出现啦").waitFor();
    var a=text("猫猫出现啦").findOne().bounds();
    click(a.centerX(), a.centerY());
    text("成功抓到猫猫啦").waitFor();
    var b = text("开心收下").findOne().bounds();
    click(b.centerX(), b.centerY());
    sleep(500);
    back();
    sleep(1000);
    
}