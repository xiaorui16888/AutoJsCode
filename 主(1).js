
var name = getPackageName("多开分身");
launch(name);
toast("1");
setTimeout

/*判断开启软件，点击添加分身
var fanhuizhi=jietupanduan(600,1000,0,205,137);
if(fanhuizhi=1){
    toast("已开启软件");
    sleep(2000);
click(540,1938);
sleep(2000);
click(1046,993);
}
*/
    
    
var fanhuizhi=jietupanduan(600,1000,0,205,137);
toast("2");
if(fanhuizhi==1){
    toast("正开启软件");
    var fanhuizhi1=jietupanduan(600,1000,255,255,255);
    toast("4");
    if(fanhuizhi1==1){
    toast("已开启软件");
    sleep(2000);
click(540,1938);
}
//click(1046,993);
}
else{toast("未开启软件");}

    
    
    
    

function jietupanduan(x,y,a,b,d) {
    var z=0;
while(z==0){
if(!requestScreenCapture()){
   toast("请求截图失败");
   exit
}
sleep(2000);
toast("截图");
var x;
var y;
var a;
var b;
var d;
//获取在点(x, y)处的颜色
var c = images.pixel(captureScreen(), x, y);
//显示该颜色
var msg = "";
msg += "在位置(" + x + ", " + y + ")处的颜色为" + colors.toString(c);
msg += "\nR = " + colors.red(c) + ", G = " + colors.green(c) + ", B = " + colors.blue(c);
//检测在点(x, y)处是否有颜色#73bdb6 (模糊比较)
if(colors.red(c)==a&&colors.green(c)==b&&colors.blue(c)==d)
{z=1;
}
}
return(z);
     }
