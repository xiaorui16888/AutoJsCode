/**
 * 安全相关
 * @param {Robot} robot 机器人对象
 * @param {int} max_retry_times 最大尝试次数
 * @author ridersam <e1399579@gmail.com>
 */
function Secure(robot, max_retry_times) {
    this.robot = robot;
    this.max_retry_times = max_retry_times || 10;
    this.km = context.getSystemService(context.KEYGUARD_SERVICE);
    this.secure = (function() {
        var secure = new NativeSecure(this, max_retry_times);
        return secure;
    }.bind(this))();

    this.isLocked = function() {
        return this.km.inKeyguardRestrictedInputMode();
    };

    this.openLock = function(password, pattern_size) {
        var isLocked = this.isLocked(); // 是否已经上锁
        var isSecure = this.km.isKeyguardSecure(); // 是否设置了密码
        pattern_size = pattern_size || 3;
        log({
            isLocked: isLocked,
            isSecure: isSecure
        });
        if (!(isLocked && isSecure)) return true;
        var i = 0;
        log("开始解锁");
        for (var i = 0; i < this.max_retry_times; i++) {
            if (this.unlock(password, pattern_size)) {
                return true; //解锁成功
            }
        }
        toastLog("解锁失败，不再重试，已超过最大次数:" + this.max_retry_times);
        return this.failed();
    };

    this.failed = function() {
        KeyCode("KEYCODE_POWER");
        engines.stopAll();
        exit();
        return false;
    };
    //向上滑动解锁
    this.openLayer = function() {
        var x = WIDTH / 2;
        var y = HEIGHT - 200;
        this.robot.swipe(x, y, x, HEIGHT / 2, 500);
        sleep(1500); // 等待动画
    };
    //解锁方法
    this.unlock = function(password, pattern_size) {
        var len = password.length;
        if (len < 4) {
            throw new Error("密码至少4位");
        }
        return this.secure.unlock(password, pattern_size);
    };
    //检测是否处于锁屏
    this.isLocked = function() {
        return this.km.inKeyguardRestrictedInputMode();
    };
}

function NativeSecure(secure, max_retry_times) {
    this.__proto__ = secure;
    //解锁
    this.unlock = function(password, pattern_size) {
        var isFinish = false;
        var i = 0;
        //多线程解锁
        var thread = threads.start(function() {
            device.wakeUp();
            sleep(1000);
            swipe(500, 1000, 500, 10, 1000);
            sleep(1000);
            press(201, 1400, 100);
            press(523, 1133, 100);
            press(560, 955, 100);
            press(855, 1163, 100);
            sleep(1000);
            isFinish = true;
        });
        //检测解锁
        while (true) {
            if (!secure.isLocked()) {
                thread.interrupt();
                return true; //解锁成功
            }
            if (isFinish) {
                return false; //解锁失败
            }
            if (i == 10) {
                return false;
            }
            i++;
            sleep(12000);
        }
    };
}
module.exports = Secure;