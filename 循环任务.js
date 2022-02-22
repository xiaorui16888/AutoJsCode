/**
 * 使用说明请看 https://github.com/e1399579/autojs/blob/master/README.md
 * @author ridersam <e1399579@gmail.com>
 */

auto(); // 自动打开无障碍服务
//初始化配置
if (!files.isFile("config.js")) {
    log("config.js配置文件丢失,请检查");
    exit();
}
var config = require("config.js");
var options = Object.assign({}, config);; // 用户配置
// 所有操作都是竖屏
const WIDTH = Math.min(device.width, device.height);
const HEIGHT = Math.max(device.width, device.height);
//检查是否有ROOT权限
const IS_ROOT = files.exists("/sbin/su") || files.exists("/system/xbin/su") || files.exists("/system/bin/su");
//设置脚本坐标点击所适合的屏幕宽高
setScreenMetrics(WIDTH, HEIGHT);
var source = "antForest";
var stateStorage = storages.create(source);
var times = 0; //脚本执行计数
var sleepTime = 300; //默认循环时间
var isCircu = true; //是否循环
var Robot = require("Robot.js");
var robot = new Robot(options.max_retry_times);
var package = "com.eg.android.AlipayGphone"; // 支付宝包名
var state = {};
var capture = null;
var bounds = [0, 0, WIDTH, 1100];
if (device.isScreenOn()) {
    toastLog("请关闭手机屏幕，手机才会执行脚本");
    while (device.isScreenOn()) {
        sleep(1000);
    }
    saveState();
    log("锁屏后开始计时");
    var d1 = new Date();
    var d2 = new Date();
    d2 = d2.setSeconds(d2.getSeconds() + 10);
    while (true) {
        sleep(1000);
        d1 = new Date();
        if (d1 > d2) {
            log("计时结束");
            break;
        }
    }
    device.wakeUp();
}
//循环脚本
while (true) {
    auto(); // 自动打开无障碍服
    log("---------------------------");

    log("进入脚本");
    checkTask(); //检测任务
    var runTime = new Date();
    log("运行时间:" + runTime.toDateString() + " " + runTime.getHours() + ":" + runTime.getMinutes() + ":" + runTime.getSeconds());
    times += 1;
    log("运行次数:" + times);
    start();
}

/**
 * 开始运行
 * @param options
 */
function start() {

    checkModule();
    //获取手机当前状态
    //saveState();

    while (!device.isScreenOn()) {
        device.wakeUp();
        sleep(1000); // 等待屏幕亮起
    }
    toastLog("即将收取能量，按音量上键停止");
    // 子线程监听音量上键
    threads.start(function() {
        events.observeKey();
        events.onceKeyDown("volume_up", function(event) {
            toastLog("停止脚本");
            engines.stopAll();
            exit();
        });
    });
    // 监听退出事件
    events.on("exit", function() {
        running = stateStorage.get("running", false);
        if (running) {
            storages.remove(source);
            toastLog("完全退出");
        }
    });
    // 先打开APP，节省等待时间
    threads.start(function() {
        openApp();
    });
    //解锁
    if (files.exists("Secure.js")) {
        var Secure = require("Secure.js");
        var secure = new Secure(robot, options.max_retry_times);
        if (!secure.openLock(options.password, options.pattern_size)) {
            log("解锁失败!");
            exit();
        }
        // 拉起到前台界面
        openApp();
    } else {
        log("解锁脚本不存在:Secure.js");
    }
    //启动APP
    enterApp();
    //收取能量
    work();
    //回到原来的状态
    resumeState();
    //外部循环检测
    checkCirculationScript();
    //退出脚本
    storages.remove(source);
    //exit();
}
//检测外部是否有循环脚本
function checkCirculationScript() {
    if (isCircu) {
        //判断是否处于夜晚(夜晚不收能量)
        var today = new Date();
        var hour = today.getHours();
        var starHour = 0;
        var endHour = 7;
        var isEnter = false;
        while (true) {
            if (hour >= 0 && hour < 7) {
                sleep(1000);
                today = new Date();
                hour = today.getHours();
                if (!isEnter) {
                    log("进入夜间");
                    isEnter = true; //跳入夜间
                }
                continue;
            } else {
                var addTime = new Date();
                var nowTime = new Date();
                addTime = addTime.setSeconds(addTime.getSeconds() + sleepTime); //获取下次收取能量时间
                log("进入白天");
                while (true) {
                    //判断是否刚刚跳出夜间
                    if (isEnter) {
                        hour = nowTime.getHours();
                        if (hour >= 7 && hour <= 23) {
                            return; //跳出夜间
                        }
                    }
                    if (nowTime > addTime) {
                        return; //到达收取能量的时候了
                    } else {
                        sleep(1000);
                    }
                    nowTime = new Date();
                }
            }
        }
    }
}
/**
 * 检查任务
 */
function checkTask() {
    // 连续运行处理

    var running = stateStorage.get("running", false);
    if (!running) { //没有其他线程运行
        log("队列:无其他任务");
        stateStorage.put("running", true);
    } else {
        log("队列:当前有任务");
        //exit();
    }
}
/**
 * 检查必要模块
 */
function checkModule() {
    if (!files.exists("Robot.js")) {
        throw new Error("缺少Robot.js文件，请核对第一条");
    }

    if (!files.exists("Secure.js") && context.getSystemService(context.KEYGUARD_SERVICE).inKeyguardRestrictedInputMode()) {
        throw new Error("缺少Secure.js文件，请核对第一条");
    }
} //检查必要模块

/**
 * 蚂蚁森林的各个操作
 * @param robot
 * @param options
 * @constructor
 */






function saveState() {
    state.isScreenOn = device.isScreenOn();
    state.currentPackage = currentPackage(); // 当前运行的程序
    state.isRunning = IS_ROOT ? parseInt(shell("ps | grep 'AlipayGphone' | wc -l", true).result) : 0; // 支付宝是否运行
    state.version = context.getPackageManager().getPackageInfo(this.package, 0).versionName;
    log(state);
};

function resumeState() {
    if (state.currentPackage !== package) {
        back(); // 回到之前运行的程序
        sleep(1500);
    }

    if (!state.isRunning) {
        closeApp();
    }

    if (!state.isScreenOn) {
        KeyCode("KEYCODE_POWER");
    }
};

function openApp() {
    launch(package);
};

function closeApp() {
    robot.kill(package);
};

function enterApp() {
    var times = 0;
    do {
        if (this.doLaunch()) {
            return;
        } else {
            times++;
            this.back();
            sleep(1500);
            this.openApp();
        }
    } while (times < this.options.max_retry_times);

    toastLog("运行失败");
    exit();
};

function doLaunch() {
    // 可能出现的红包弹框，点击取消
    var timeout = options.timeout;
    threads.start(function() {
        var cancelBtn;
        if (cancelBtn = id("com.alipay.android.phone.wallet.sharetoken:id/btn1").findOne(timeout)) {
            cancelBtn.click();
        }
    });

    var home = id("com.alipay.android.phone.openplatform:id/tab_description").text("首页").findOne(timeout);
    if (!home) {
        toastLog("进入支付宝首页失败");
        return false;
    }
    home.parent().click();

    var success = false;
    var btn = id("com.alipay.android.phone.openplatform:id/app_text").text("蚂蚁森林").findOne(timeout);
    if (!btn) {
        toastLog("查找蚂蚁森林按钮失败");
        return false;
    }
    log("点击按钮");
    if (!(btn.parent() && btn.parent().click())) {
        toastLog("点击蚂蚁森林失败");
        return false;
    }

    // 等待加载
    if (this.waitForLoading("合种")) {
        log("进入蚂蚁森林成功");
    } else {
        toastLog("进入蚂蚁森林失败");
        return false;
    }

    return true;
};

function waitForLoading(keyword) {
    var timeout = options.timeout;
    var waitTime = 200;
    sleep(2000);
    timeout -= 2000;
    for (var i = 0; i < timeout; i += waitTime) {
        if (desc(keyword).exists()) {
            sleep(1000);
            return true;
        }

        sleep(waitTime); // 加载中
    }

    return false;
};

function getPower() {
    var energy = descMatches(/\d+g/).findOnce();
    return energy ? parseInt(energy.contentDescription) : null;
};
//能量收取开始入口
function work() {
    sleep(1000);
    this.robot.click(WIDTH / 2, 510);

    var timeout = options.timeout;
    var startPower = this.getPower();
    log("当前能量：" + startPower);

    // 开始收取
    this.take();
    this.takeRemain(this.getRemainList(), options.min_time, options.max_time);
    sleep(500);

    var power = this.getPower() - startPower;
    if (power > 0) toastLog("收取了" + power + "g自己的能量");

    var icon = images.read(options.takeImg);
    if (null === icon) {
        toastLog("缺少图片文件，请仔细查看使用方法的第一条！！！");
        exit();
    }
    // 截图权限申请
    threads.start(function() {
        var remember;
        var beginBtn;
        if (remember = id("com.android.systemui:id/remember").checkable(true).findOne(timeout)) {
            remember.click();
        }
        if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(timeout)) {
            beginBtn.click();
        }
    });
    if (!requestScreenCapture(false)) {
        toastLog("请求截图失败");
        exit();
    }

    // 跳过当前屏幕
    var y = Math.min(HEIGHT, 1720);
    this.robot.swipe(WIDTH / 2, y, WIDTH / 2, 0);
    sleep(500);
    log("开始收取好友能量");

    var total = 0;
    var bottom = 0;
    total += this.takeOthers(icon, 500, function() {
        var rect = desc("合种").findOnce().bounds();

        if (rect.bottom === bottom) {
            return true;
        }

        bottom = rect.bottom;
        return false;
    });

    // 统计下次时间
    var minuteList = [];
    var keyword = "查看更多好友";
    if (desc(keyword).exists()) {
        log(keyword);
        if (this.robot.clickCenter(desc(keyword).findOne(timeout))) {
            //if(true){
            // 等待更多列表刷新
            if (id("com.alipay.mobile.nebula:id/h5_tv_title").text("好友排行榜").findOne(timeout)) {
                //if(true){
                sleep(1000);
                log("进入好友排行榜成功");
                // 跳过第一屏
                var y = Math.min(HEIGHT, 1720);
                this.robot.swipe(WIDTH / 2, y, WIDTH / 2, 0);
                sleep(500);

                var page, min_minute, swipe_sleep = 500;
                for (;;) {
                    log("往下翻页");
                    page = 0;
                    total += this.takeOthers(icon, swipe_sleep, function() {
                        /*var selector = desc("没有更多了");
                        if (!selector.exists()) return false;

                        return selector.findOne().visibleToUser();*/
                        page++;
                        return (page > options.max_swipe_times) ||
                            (findColorEquals(this.capture, "#30BF6C", WIDTH - 300, 0, 200, HEIGHT) !== null);
                    }.bind(this));

                    minuteList = this.statisticsNextTime();
                    this.filterMinuteList(minuteList);

                    if (!this.executeNextTask()) {
                        break;
                    }

                    if (!minuteList.length) {
                        break;
                    }
                    min_minute = minuteList[0];
                    log("当前最小剩余" + min_minute + "分钟");
                    //获取最近可收取能量时刻(带完善)
                    // if (min_minute > 0) {
                    // if (typeof(sleepTime) != "undefined") {
                    // sleepTime = min_minute * 60 * 1000;
                    // }
                    // }
                    if (true) { //修改
                        break;
                    }
                }

                this.back();
                sleep(2000);
                this.waitForLoading("合种");
            } else {
                toastLog("进入好友排行榜失败");
            }
        } else {
            toastLog("进入好友排行榜失败");
        }
    } else {
        minuteList = this.statisticsNextTime();
        this.filterMinuteList(minuteList);
    }

    var endPower = this.getPower();

    var added = endPower - startPower;
    added = Math.max(0, added);

    this.back();
    toastLog("收取完毕，共" + total + "个好友，" + added + "g能量");
    sleep(1500);

    // 统计部分，可以删除
}; //能量收取结束

function statisticsNextTime() {
    var minuteList = [];
    descMatches(/\d+’/).find().forEach(function(o) {
        minuteList.push(parseInt(o.contentDescription));
    });
    return minuteList;
};

function filterMinuteList(minuteList) {
    // 排序
    minuteList.sort(function(m1, m2) {
        return m1 - m2;
    });
    // 去掉重复的
    for (var i = 1, len = minuteList.length; i < len; i++) {
        // 相差1分丶钟以内认为是同一时间
        if ((minuteList[i] - minuteList[i - 1]) <= 1) {
            minuteList.splice(i--, 1);
            len--;
        }
    }
};

function getTimeList(minuteList) {
    var date = new Date();
    var timeList = [];
    var timestamp = date.getTime() - 20000;
    for (var i = 0, len = minuteList.length; i < len; i++) {
        var minute = minuteList[i];
        var now = timestamp + minute * 60 * 1000;
        date.setTime(now);
        timeList.push(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
    }
    return timeList;
};

function executeNextTask() {
    var date = new Date();
    var timestamp = date.getTime();
    var today = date.toDateString();
    var max_time = today + " " + options.max_time;
    var max_timestamp = Date.parse(max_time);
    return (timestamp > max_timestamp);
};
//获取最近可收取能量时刻
function notifyTasker(time) {

    app.sendBroadcast({
        action: "net.dinglisch.android.tasker.ActionCodes.RUN_SCRIPT",
        extras: {
            name: "蚂蚁森林",
            time: time
        }
    });
    log("已发送Tasker任务：" + time);
};

/**
 * 收取能量
 */
function take() {
    var filters = className("android.widget.Button").filter(function(o) {
        var desc = o.contentDescription;

        return (null !== desc.match(/^收集能量|^$/));
    }).find();

    var num = filters.length;
    log("找到" + num + "个能量球");
    sleep(100 * num);

    this.robot.clickMultiCenter(filters);

    this.autoBack();
};

function autoBack() {
    // 误点了按钮则返回
    sleep(1000);
    if (id("com.alipay.mobile.ui:id/title_bar_title").exists() || text("通知").exists()) {
        this.back();
        sleep(1500);
    }
};

/**
 * 获取剩余能量球列表
 */
function getRemainList() {
    var list = [];
    className("android.widget.Button").filter(function(o) {
        var desc = o.contentDescription;
        return (null !== desc.match(/才能收取$/));
    }).find().forEach(function(o) {
        var rect = o.bounds();
        list.push([rect.centerX(), rect.centerY()]);
    }.bind(this));

    return list;
};

function takeRemain(list, min_time, max_time) {
    var len = list.length;
    if (!len) return;

    var date = new Date();
    var today = date.toDateString();
    var min_timestamp = Date.parse(today + " " + min_time);
    var max_timestamp = Date.parse(today + " " + max_time);
    var now = date.getTime();

    if ((min_timestamp <= now) && (now <= max_timestamp)) {
        toastLog("开始检测剩余能量");
        var millisecond = max_timestamp - now;
        var step_time = 0;
        var use_time = step_time + 156 * len;
        for (var i = 0; i <= millisecond; i += use_time) {
            this.robot.clickMulti(list);

            sleep(step_time);
        }
        this.autoBack();

        toastLog("检测结束");
    }
};

/**
 * 收取好友能量
 * @param icon
 * @param isEndFunc
 * @param swipe_sleep
 * @param scroll
 * @returns {number}
 */
function takeOthers(icon, swipe_sleep, isEndFunc, scroll) {
    var row = (192 * (HEIGHT / 1920)) | 0;
    var total = 0;
    var x1, y1, x2, y2;
    x2 = x1 = WIDTH / 2;
    switch (scroll) {
        case "next":
        default:
            y1 = HEIGHT - row;
            y2 = row;
            break;
        case "prev":
            y1 = row * 1.5;
            y2 = HEIGHT - row;
            break;
    }
    while (1) {
        total += this.takeFromImage(icon);

        if (isEndFunc()) {
            break;
        }

        this.robot.swipe(x1, y1, x2, y2);
        sleep(swipe_sleep); // 等待滑动动画
    }

    return total;
};

/**
 * 找图收取
 * @param icon
 * @returns {number}
 */
function takeFromImage(icon) {
    var point;
    var row_height = HEIGHT / 10;
    var imgOptions = {
        region: [WIDTH - row_height, row_height],
        threshold: 0.8
    };
    var total = 0;
    var times = 0;
    var x = WIDTH / 2;
    var offset = icon.getHeight() / 2;
    while (times < options.max_retry_times) {
        this.capture = captureScreen();
        if (null === this.capture) {
            toastLog("截图失败");
            times++;
            sleep(200);
            continue;
        }
        point = findImage(this.capture, icon, imgOptions);
        if (null === point) {
            break;
        }

        var y = point.y + offset;
        this.robot.click(x, y);

        // 等待好友的森林
        var title = "好友森林";
        if (this.waitForLoading("浇水")) {
            title = id("com.alipay.mobile.nebula:id/h5_tv_title").findOnce();
            log("进入" + title.text() + "成功");
            total++;

            //var cover;
            //if (cover = descMatches(/\d{2}:\d{2}:\d{2}/).findOnce()) {
            //   toastLog("保护罩还剩" + cover.contentDescription + "，忽略");
            //} else {
            // 收取
            this.take();
            //}
        } else {
            toastLog("进入好友森林失败");
        }

        // 返回好友列表
        back();
        sleep(3000);
    }

    return total;
};