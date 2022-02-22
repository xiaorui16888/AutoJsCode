 /*
  * 适用于拥有诱饵三的鱼竿和半自动钓鱼机的人
  * 作者QQ：1409807664
  * 可能触碰位置需要调整
  * 这是一个js小白的作品
  * 收放杆隔20s
  */
 
app.launchApp("Minecraft");
toast("请于60秒之内进入存档抛竿进入半自动钓鱼机");
sleep(1000*60);
setScreenMetrics(1080, 1920);
toast("开始运行");
setInterval(function(){
    click(1200, 700);
    sleep(500);
    click(1200, 700);
},(1000*20)); 

//这样的代码，你们完全可以自己写的吧(๑>؂<๑）
//2019.1.1