console.show();
log("3秒后开始测试");
sleep(3000);
threads.start(function() {
    for (;;) {
        sleep(1000);
        log("子线程1"); //启动一个子线程  
    };
});
threads.start(function() {
    for (;;) {
        sleep(1000);
        log("子线程2"); //启动一个子线程  
    };
});
threads.start(function() {
    for (;;) {
        sleep(1000);
        log("子线程3"); //启动一个子线程  
    };
});
for (i = 0; i < 10; i++) {
    sleep(1000);
    log("主线程"+i+"次");
};
log("主线程执行完了")
threads.start(function() {
    for (;;) {
        sleep(1000);
        log("子线程4"); //启动一个子线程  
    };
});