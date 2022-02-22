"auto";
setScreenMetrics(1080,1920);

//请求截图
while(!requestScreenCapture()){
    toast("请求截图失败");
}
var n = dialogs.input("请输入循环次数","0");
var m = 0;

while(1){
//1.查找并点击30级和35级的开始按钮
//位置 100 800 900 1400
//30级颜色：ff500706
  //  40 ff470735
var point = null;
var img = null;
while(!point){
   click(1000,1500);
    img = captureScreen();
	point = findColorInRegion(img, "#ff470735", 100, 800, 800, 600);
  //  toast(point.x);
  //able  if(point==null){
   // click(639,1600);
     //   }
}
click(point.x,point.y);
sleep(1000);

//2.点击开始战斗
click(639,1349);

//3.延迟(加载战斗,期{间点击屏幕)
sleep(3000);
for(var i=0;i<2;i++){
   sleep(1000);
    click(1000,1500);
}

sleep(3000);

//4.查找并点击自动战斗的游戏按钮
//位置区间250 1750 950 1900
//自动战斗颜色：ff11e959
var point2 = null;
img = null;
while(!point2){
    click(1000,1500);
    img = captureScreen();
    point2 = findColorInRegion(img, "#ff11e959", 250, 1750, 700, 150);
}
click(point2.x,point2.y);
sleep(1200);
click(580,935);
sleep(1500);

//5.延迟（给战斗预留时间，期间可以点击屏幕）
sleep(7*1000);//9 4 12 8 13 18 7自己预设的战斗时间

//6.点击屏幕，完成战斗
click(639,1500);

sleep(5000);
    var point3=null;
    var img=null;
    while(!point3){
    click(1000,1500);
    img = captureScreen();
    point3 = findColorInRegion(img, "#275a40", 475, 1600, 125, 100);
}
   // toast(point3.x);
sleep(500);
click(point3.x,point3.y);
   // click(639,1600);
    
    m++;
    toast(m);
  if(m == n){
    exit();
    }
}