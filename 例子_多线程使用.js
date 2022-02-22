/*
==============================
使用方法：
    可直接执行主程序。
适用版本：
    在 Android 7.0 + Auto.JS v4.0.3 Alpha2 环境中测试通过。
制作：
    by 学徒小徐 in 2018-09-27
==============================
*/
/*
==============================
 以下是主程序的内容
==============================
*/
var mIntervalObj;
var mTimeoutObj;
var mThreadObj;
var mCurSec = 0;
var mi1 = 0;

//启动子线程
function startThread(){
    mCurSec = 0;
    //启动子线程
    mThreadObj = threads.start(function(){
        console.log("子线程已启动！");
        });
    //等待子线程完成启动
    mThreadObj.waitFor();
    //设置子线程的循环定时器，每1秒钟执行一次。
    mIntervalObj = mThreadObj.setInterval(function(){
        console.log("子线程的1秒循环定时器已启动[" + mCurSec + "]次。");
        mCurSec = mCurSec + 1;
        }, 1 * 1000);
    //设置子线程的延时定时器，在15秒后执行。
    mTimeoutObj = mThreadObj.setTimeout(function(){
        console.log("子线程的15秒延时定时器已启动。");
        }, 15 * 1000);
    console.log("设置子线程存活30秒，但是被循环定时器阻止了。");
    //为避免出错，习惯加上子线程的存活时间30秒，即30秒后子线程无论如何都自动关闭
    //不过在本例子中，由于子线程设置了定时器，所以join()是不生效的。
    mThreadObj.join(30 * 1000);
    console.log("设置子线程完成。");
    }

//结束子线程
function quitThread(){
    //判断子线程是否存在，若存在则关闭子线程及对应的定时器
    if(mThreadObj.isAlive()){
        console.log("检测到子线程存在！关闭子线程。");
        //关闭子线程的循环定时器
        mThreadObj.clearInterval(mIntervalObj);
        //关闭子线程的延时定时器
        mThreadObj.clearTimeout(mTimeoutObj);
        //关闭子线程自身
        mThreadObj.interrupt();
    }else{
        console.log("检测不到子线程！");
        };
    //为啥要延时一下？因为关闭子线程需要时间。
    mi1 = 0;
    while(mi1 < 5){
        console.log("关闭后的等待循环" + mi1 + "次");
        mi1 = mi1 + 1;
        sleep(1000);
    }
    if(mThreadObj.isAlive()){
        console.log("关闭子线程后再次检测，子线程存在！");
    }else{
        console.log("关闭子线程后再次检测，子线程不存在！");
        };
    }

console.show();
console.clear();
console.log("本例子展示了子线程的调用方法");
//启动子线程
console.log("在主程序中启动子线程");
startThread();
//返回到主程序
console.log("返回到主程序了哦~~~");
mi1 = 0;
while(mi1 < 100){
    console.log("主程序内的等待循环" + mi1 + "次");
    mi1 = mi1 + 1;
    sleep(1000);
}
//结束子线程
console.log("在主程序中结束子线程");
quitThread();

exit();
