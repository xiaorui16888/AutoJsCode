auto();
//z字解锁大法   启动后请马上关闭屏幕
setScreenMetrics(1080, 1920);
sleep(6000);
//唤醒屏幕
device.wakeUp();
sleep(3000);
//关闭qq消息
click(958,528);   
sleep(3000);
//上滑操作
swipe(544, 1820, 487,500, 1000);
sleep(100);
//解锁屏幕的坐标   不同手势自己找坐标
var points=[[239,1030],[840,1044],[248,1653],[844,1653]];
gesture(1000, points);
//测试机型360n5  无root   安卓7.0