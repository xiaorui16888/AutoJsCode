
var name = getPackageName("淘宝联盟");
launch(name);
    toast("2");
    //判断是否开启软件并点击添加分身
var fanhuizhi=jietupanduan(538,714,255,255,255);
toast("1");
if(fanhuizhi==1){
    toast("正打开软件");
    var fanhuizhi=jietupanduan1(538,714,231,34,65);
    if(fanhuizhi==1){
        toast("已打开软件");
    click(538,714);
}
}
else{toast("未开启软件");}

var fanhuizhi1=jietupanduan1(800,1700,191,191,191);
if(fanhuizhi1==1){
    toast("红包金额数量界面");
    setText(1,0.9);
    setText(2,1);
    var fanhuizhi3=jietupanduan1(800,1700,247,191,27);
    if(fanhuizhi3==1){
    toast("红包已填好");
    click(800,1700);
}
}
else{toast("未开启软件");}

var fanhuizhi2=jietupanduan1(820,1940,29,145,229);
if(fanhuizhi2==1){
    toast("付款界面");
    click(820,1940);
   /* var fanhuizhi1=jietupanduan1(600,1000,255,255,255);
    if(fanhuizhi1==1){
    toast("已开启软件");
    click(540,1938);
}*/
}
else{toast("未开启软件");}

//截图函数1
function jietupanduan(x,y,a,b,d) {
    var z=0;
    toast("进入");
while(z==0){
if(!requestScreenCapture()){
   toast("请求截图失败");
   exit
}
toast("jietu");
sleep(2000);
var x;
var y;
var a;
var b;
var d;
//获取在点(x, y)处的颜色
var c = images.pixel(captureScreen(), x, y);
toast("截图");
if(colors.red(c)==a&&colors.green(c)==b&&colors.blue(c)==d)
{z=1;}
}
return(z);
}

//截图函数2
function jietupanduan1(x,y,a,b,d) {
    var z=0;
while(z==0){

sleep(1000);
var x;
var y;
var a;
var b;
var d;
//获取在点(x, y)处的颜色
var c = images.pixel(captureScreen(), x, y);
if(colors.red(c)==a&&colors.green(c)==b&&colors.blue(c)==d)
{z=1;}
}
return(z);
}
