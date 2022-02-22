// const profile = require('profile1920.js');
// const robot = require('robot.js');
const DEVICE = require('device.js');
const PLAY = require('play.js').mp;
const PLAY2 = require('play.js').mp2;
const carHunt = require('play.js').ch;
const robot = require('robot.js');
var counterMP = 0;

toast("7秒后将开始运行程序,请迅速切换至游戏主界面");
sleep(3000);
toast("开局可能会弹广告,请自己手动关掉,直至保证程序正常选关为止");
sleep(4000);

DEVICE.checkPermission();
DEVICE.setEventListener();
DEVICE.savePower();

var startTime = new Date().getTime();
var nowTime = new Date().getTime();
var mp2Time = new Date().getTime();

// 截止今天（2019年7月31日）本人所需功能已经基本完成，由于某憨承诺的UI迟迟不见踪影，所以在此写一个简单的说明，
// 能看懂的就用，不懂就问，问了还是不懂的就只能阿弥陀佛了

// 功能基本上分为4个：生涯、寻车、上面多人、下面多人，所有选车配置都在profile1920.js中，功能选择在此文件中

// mp2任务间隔，单位为分钟，此处为每60分钟进入下面多人
var mp2interval = 60;
// 寻车任务间隔，单位为分钟，此处为每100分钟进入寻车
var interval = 100;
// 寻车按钮在每日赛事中的位置，从0开始计数，0=特别赛事寻车
var position = 3;
// 选取上次用车上面/下面
// 由于寻车赛事一般都是2票跑一次，所以每次寻车会运行5次，请选择能够自动拿到奖励，并且是5个油的车，
// 在运行脚本之前请确认：1、最后一次寻车用的必须是这辆车，2、此车满油。3、如果该车在下方，请选择up=0
var up = 1;

// 前置寻车开关，如果运行脚本时想先跑一轮寻车，请把0改成1
if (0) {
    // start carHunt
    for ( let i = 0; i < 5; i++ ) {
        carHunt.beforeRun(position);
        carHunt.chooseCar(up);
        sleep(10000);
        carHunt.run(i);
        startTime = new Date().getTime();
    }
}

// 前置下方多人开关，如果运行脚本时想先跑下方多人，请把0改成1
if (1) {
            // start mp2
            for ( let i = 1; i < 5000; i++ ) {
                PLAY2.beforeRun();
                if(PLAY2.chooseCar(1)){
                    sleep(12000);
                    PLAY2.run(i);
                }
                // 无油，退出
                else{
                    sleep(500);
                    break;
                }
            }
            PLAY2.goingHome();
            mp2Time = new Date().getTime();
}

for (;;counterMP++) {
    // 下方多人开关，如果想定时跑下方多人，请把0改成1
    if (0){
        nowTime = new Date().getTime();
        toastLog("倒计时："+(mp2interval*60000 - (nowTime-mp2Time))/60000);
        if ((nowTime - mp2Time) > (mp2interval*60000)) {
            PLAY2.goingHome();
            // start mp2
            for ( let i = 0; i < 5000; i++ ) {
                PLAY2.beforeRun();
                if(PLAY2.chooseCar(0)){
                    sleep(12000);
                    PLAY2.run(i);
                }
                // 无油，退出
                else{
                    sleep(500);
                    break;
                }
            }
            PLAY2.goingHome();
            mp2Time = new Date().getTime();
        }
    }//endof mp2
    
    // 寻车开关，如果想定时跑寻车，请把0改成1
    if(0){        
        nowTime = new Date().getTime();
        toastLog("倒计时："+(interval*60000 - (nowTime-startTime))/60000);
        if ((nowTime - startTime) > (interval*60000)) {
            // toastLog(nowTime+"-"+startTime+"="+(nowTime-startTime));
            // start carHunt
            for ( let i = 0; i < 5; i++ ) {
                carHunt.beforeRun(position);
                carHunt.chooseCar(up);
                sleep(10000);
                carHunt.run(i);
            }
            PLAY2.goingHome();
            startTime = new Date().getTime();
        }
    }//endof 定时任务
    
    // 多人开关，也可以关闭
    if (1){
        PLAY.beforeRun();
        if(PLAY.chooseCar()){
            sleep(12000);
            PLAY.run(counterMP);
        }
        // 无油，尝试激活mp2
        else{
            robot.back();
            counterMP--;
            sleep(500);
            PLAY2.goingHome();  
            mp2Time -= (mp2interval*60000);
            continue;
        }
    }
    else {
       sleep(60000);
    } // endof 多人
       
}
