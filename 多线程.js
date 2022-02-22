console.show();
var thread = new java.lang.Thread(new java.lang.Runnable({
    run: function() {
        var a=ac;
        for(var i=0;i< 30;i++){
        //log(a+i);
        //thread.sleep(5); //线程暂停
        //thread.wait();
        //thread.stop(); //线程停止
    }
    }
})); //定义一个线程
var ac="a";
log(thread.alive);
thread.start(); //线程开始执行
log(thread.alive);
//thread.join(); //等待线程执行完闭
thread.interrupt();
//log(3);
log(thread.alive);
log(thread ? true : false);
Details(thread);


function Details(A) {
    log(A);
    try {
        log(A.toString());
    } catch (e) {};
    for (var i in A) {
        try {
            log(i + "\n" + A[i].toString())
        } catch (e) {}
    };
};