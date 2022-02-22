try { auto(); } catch (err) { toast("请开启Autojs无障碍"); auto.waitFor(); };

//测试机型：MI 9
//测试机型：MI 8 SE
//请勿设置音乐类锁屏歌词。

var d = new Date();
var d2 = d.getHours();
//var d3 = d.getMinutes();
while(true){
  //设置时间
  //小时
if(new Date().getHours() == 17){
    //判断是否有其中一个分钟通过
    if(new Date().getMinutes() == 33|new Date().getMinutes() == 02|new Date().getMinutes() == 03){
sleep(1500);
setTimeout(
function() {
}, 3000)    

//定制数字位置
function getxy(num) {
arr = Array()
arr[1] = [240, 1235]
arr[2] = [530, 1235]
arr[3] = [820, 1235]

arr[4] = [240, 1525]
arr[5] = [530, 1525]
arr[6] = [820, 1525]

arr[7] = [240, 1815]
arr[8] = [530, 1815]
arr[9] = [820, 1815]

return arr[num]
}

//唤醒手机
device.wakeUp()
sleep(500)
//下拉状态栏
swipe(500, 10, 500, 1000, 500)
sleep(200)
//点击时间
click(100, 120)
//swipe(250,1335,540,1335,1000)
sleep(300)
//滑动手势进行解锁
gestureAsync(1000, getxy(3), getxy(5), getxy(6),
getxy(8)
)
sleep(1000)
home()
toastLog("233");
sleep(200);
   home();
 sleep(200);
break//跳出while循环




}else{
    toast(" ")
    sleep(59000);}
}else{
 toast("2");
    sleep(1800000);
    }
  };
  