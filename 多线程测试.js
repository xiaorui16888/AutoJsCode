console.show()
function 任务() {
    //在线程中每隔1秒打印"线程1"
    for (var i = 0; i < 70; i++) {
        log("线程1");
        sleep(1000);
    }
}
var thread = threads.start(function () {
    //在线程中每隔1秒打印"线程1"
    任务()
});
// 现在想在主线程里判断。当上面的子线程结束以后，主线程重新启动一个子线程接着执行
var timestamp = Date.parse(new Date());
while (true) {
    sleep(3000);
    var 脚本执行经历时间 = Date.parse(new Date()) - timestamp//任务开始到现在所经历的总时间
    log(脚本执行经历时间)
    if (thread.isAlive() == null || thread.isAlive() == false) {
        log("开始重启子线程了");
        thread = threads.start(function () {
            任务()
        }); 
    };
    if (脚本执行经历时间 >= 1000 * 60) {
        log("时间到了，强制停止子线程");
        thread.interrupt()//强行结束任务子程序
        sleep(3000);
        timestamp = Date.parse(new Date());//重置现行时间
    }

}