/**
 *by Hyun Mai
 *QQ:2668649792
 *华为解锁
 */
var i=0
var pass = "2369874123" //解锁密码
while (true) {
    
    if(i==10){
        exit();
        }else{
            Unlock();
            sleep(1000)
            i++
            toast(i)
            
            }
            
}

function Unlock() {
    if (!device.isScreenOn()) {
        device.wakeUp();
        
    } else if (packageName("com.android.systemui").text("输入密码").findOnce()) {
        sleep(500);
        for (var i = 0; i < pass.length; i++) {
            var aa = text(pass[i].toString()).findOne().bounds();
            click(aa.centerX(), aa.centerY());
        }
    } else if (packageName("com.android.systemui").findOnce()) {
        sleep(500)
        swipe(360, 600, 360, 0, 100);
        sleep(500)
    }
    //逻辑有问题，死在了循环上
}