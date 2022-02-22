
//请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}
    var img=captureScreen();
    img=images.clip(img,200,998,822,824);
    images.save(img, "/sdcard/1.png");
   


var w = floaty.window(
    <frame> 
    <img  id="i" src="file:///sdcard/1.png"/>
    </frame>);
    w.setPosition(200,98);
    

setInterval(()=>{}, 1000);
while(1){
    w.i.setAlpha(100);
    sleep(10);
    w.i.setAlpha(0);
    sleep(10);}