console.show();
requestScreenCapture(false);
function 卡屏检测(){
宽度=device.width
高度=device.height
//log(高度+";"+宽度)
var 颜色记录1=new Array();
var 颜色记录2=new Array();
取点数量=50;
导航栏高度=100;
function sum (m,n){//随机函数
　　return Math.floor(Math.random()*(m - n) + n);}
屏幕=captureScreen();
for( n=0;n<取点数量;n++){
    颜色记录1[n]=new Array();
    x坐标=sum(1,宽度)
    y坐标=sum(导航栏高度,高度)
    颜色值=colors.toString(images.pixel(屏幕, x坐标, y坐标))
    颜色记录1[n][0]=x坐标
    颜色记录1[n][1]=y坐标
    颜色记录1[n][2]=颜色值
 // log(颜色记录1[n])
    }
while (1){
    相同个数=0;
    屏幕=captureScreen();
    for( n=0;n<取点数量;n++){
    颜色记录2[n]=new Array();
    x坐标=颜色记录1[n][0]
    y坐标=颜色记录1[n][1]
    颜色值=colors.toString(images.pixel(屏幕, x坐标, y坐标))
    颜色记录2[n][0]=x坐标
    颜色记录2[n][1]=y坐标
    颜色记录2[n][2]=颜色值
  //  log(颜色记录2[n])
    if (颜色记录2[n][2]==颜色记录1[n][2]){
        相同个数=相同个数+1;
        }
    }
    
    //log(相同个数)
if(相同个数==取点数量){log("屏幕卡主")} 
else{
    log("屏幕没卡主")
    for( n=0;n<取点数量;n++){
        颜色记录1[n][2]=颜色记录2[n][2]
    }
    }
    
  
sleep(2000);//2秒检测一次
}
}