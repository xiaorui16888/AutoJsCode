
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
    
//click(1046,993);
}
var fanhuizhi1=jietupanduan1(600,1000,255,255,255);
    toast("4");
    if(fanhuizhi1==1){
    toast("已开启软件");
    sleep(2000);
click(540,1938);
}
    
    
    
    

function jietupanduan(x,y,a,b,d) {
    var z=0;
while(z==0){
if(!requestScreenCapture()){
   toast("请求截图失败");
   exit
}
sleep(2000);

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




function jietupanduan1(x1,y1,a1,b1,d1) {
    toast("判断白色");
    var z1=0;
while(z1==0){
    toast("进行判断");
if(!requestScreenCapture()){
   toast("请求截图失败");
   exit
}
toast("4.5");
sleep(2000);
toast("5");
var x1;
var y1;
var a1;
var b1;
var d1;
//获取在点(x, y)处的颜色
var c1 = images.pixel(captureScreen(), x1, y1);
//显示该颜色
msg += "\nR = " + colors.red(c) + ", G = " + colors.green(c) + ", B = " + colors.blue(c);
//检测在点(x, y)处是否有颜色#73bdb6 (模糊比较)
if(colors.red(c1)==a1&&colors.green(c1)==b1&&colors.blue(c1)==d1)
{z1=1;
}
}
return(z1);
     }

