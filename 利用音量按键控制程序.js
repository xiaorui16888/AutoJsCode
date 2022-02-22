
auto.waitFor();  //等待启用 无障碍功能。

//屏蔽音量键。
events.setKeyInterceptionEnabled("volume_down",true);
events.setKeyInterceptionEnabled("volume_up",true);

var run = false;
var stop = false;

//新的线程，用来监听按键。
threads.start(function(){
    events.observeKey();    //启用按键监听
    events.onKeyDown("volume_down",function(){ //按键按下监听函数，监听按键  音量减
        run = !run;  //切换 执行控制变量的值
    });
    events.onKeyDown("volume_up",function(){   //按键按下监听函数，监听按键  音量加
        stop = true; 
    });
});

console.show();  //不需要控制台的自行删除。
while(true) {
    
    //音量减 启动/暂停 程序执行。
    //音量加 停止 程序。
    while(!run && !stop) {  //run 和 stop 两个变量 都为false是进入while循环。
        sleep(300);
    }
    if(stop) {   //stop 为 true 时进入if
        threads.shutDownAll(); // 停止所有的进程（主进程除外）
        exit();  // 退出 脚本程序。
    }
    
    //这里是需要执行的程序（时间最好不要太长）。
    log(new Date())
    sleep(1000);
    
}
    