 try {
     auto(); 
} catch (err) { 
toast("请开启Autojs无障碍");
 auto.waitFor(); 
 };
//一直等待闹钟控件出现
var w = id("alertclose").findOne();
  if(w != null){
      //控件出现上滑取消闹钟
     swipe(500, 1918, 500, 800, 1);

  //唤醒手机
//device.wakeUp();
//device.wakeUpIfNeeded();
//解锁屏幕方法
function getxy(num) {
arr = Array()
arr[1] = [254, 1026]
arr[2] = [540, 1026]
arr[3] = [825, 1026]

arr[4] = [254, 1314]
arr[5] = [540, 1314]
arr[6] = [825, 1314]

arr[7] = [254, 1596]
arr[8] = [540, 1596]
arr[9] = [825, 1596]

return arr[num]
}
//停顿半秒
sleep(500);
//上滑时间页面，出现解锁页面
swipe(500, 1918, 500, 800, 1);
sleep(500);
//滑动解锁
gestureAsync(1000, getxy(1), getxy(5), getxy(3),getxy(7));
 //停顿半秒
 sleep(500);
 //启动应用
 launchApp("巅峰Q神");
 //以下是应用操作
id("goget").findOne().click();
sleep(500);
desc("历 史").findOne().click();
sleep(500);
click("2660500834");
sleep(500);
desc("登 录").findOne().click();
sleep(500);
var c = text("OK").findOne();
c.click();
id("goget").findOne().click();
var fang=true;
while(fang){
if(id("guanbi").exists()){
    home();
  fang=false;
  exit;
}
}
      toastLog("我进来了");
      }
      