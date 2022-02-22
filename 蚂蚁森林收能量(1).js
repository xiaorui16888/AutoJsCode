/*
锁屏密码为 九宫格 图形手势密码的数字顺序
应用锁密码为小米手机自带的应用锁九宫格解锁密码

想要定时收能量，可以创建定时任务方法如下:
脚本右边的 选项> 更多> 定时任务> 特定事件(广播)触发运行> 每分钟一次> 点击右上角✔
如果autojs的定时任务不好用可以用tasker的定时任务或者shell脚本过其他方法定时运行脚本
作者:攀登
*/
var 锁屏密码 = "145698736"
var 应用锁密码 = "1236974"

var 本地配置 = storages.create("蚂蚁森林");
//本地配置.clear()//清空本地配置，取消注释可以不判断时间直接运行
if (本地配置.get("蚂蚁森林") > new Date().getTime()) exit()
if (context.getResources().getConfiguration().orientation == 2) {
    for (let a = 0; a < 3; a++) toastLog("在看电影还是玩游戏啊，支付宝有能量可以收取啦")
    exit()
}
停止其他脚本() 
while (解锁()) {}
var 截图 = threads.start(function() {
    sleep(5000)
    toastLog("请求截图权限卡住了，请重新运行")
    exit()
})
if (!requestScreenCapture()) {
    toastLog("请求截图失败");
    exit();
}
截图.interrupt();
var 当前能量 = 0
var 锁屏 = 0
var 界面
var 查看更多 = 载入更多();
var 滑动
var 有保护罩 = JSON.parse(本地配置.get("有保护罩") || "{}")
log(有保护罩)
var 最短时间 = 99
threads.start(function() {
    events.observeToast();
    events.onToast(function(toast) {
        var pkg = toast.getPackageName();
        if (pkg == "com.eg.android.AlipayGphone") {
            let 内容 = toast.getText()
            if (内容 = 内容.match(/00:(\d+)后/)) {
                if (内容[1] < 最短时间) {
                    最短时间 = 内容[1]
                    log("最短时间", 最短时间)
                }
            }
        }
    });
})
while (1) {
    sleep(200)
    var img = captureScreen();
    if ((images.findColorInRegion(img, "#108ee9", 40, 100, 100, 100, threshold = 25) && images.detectsColor(img, "#ffffffff", 10, 100, threshold = 66, algorithm = "diff")) || text("好友排行榜").idEndsWith("h5_tv_title").findOnce()) {
        //log("好友排行榜")
        let a = 460
        for (a = 460; a < 1000; a += random(10, 50)) {
            if (!images.detectsColor(img, "#ffffffff", 170, a, threshold = 66, algorithm = "diff")) {
                a = 460
                break
            }
        }
        if (a > 900) {
            toastLog("好友列表载入中")
            if (desc("再试一次").findOnce()) back()
            sleep(3000)
            continue
        }
        查看更多.开()
        let 状态 = 0
        let 手 = 找手()
        for (let a = 0; a < 手.length; a++) {
            查看更多.关()
            let 名 = (控件1([240, 手[a].y, 1008, 手[a].y + 200], depth(13)))
            if (名) {
                名 = 名.desc().replace(/\s/gi, "")
            }
            log(名, 有保护罩[名 + "的蚂蚁森林"])
            if (!有保护罩[名 + "的蚂蚁森林"] || 有保护罩[名 + "的蚂蚁森林"] - (-1000 * 60 * 60) < new Date().getTime()) {
                本地配置.remove(名 + "的蚂蚁森林")
                click(手[0].x - 100, 手[0].y + 50)
                sleep(1000)
                状态 = 1
                break
            } else {
                toastLog(名 + "有保护罩")
            }
        }
        if (状态) continue
        var img = captureScreen();
        if (images.findColorInRegion(img, "#30bf6c", 842, 600, 10, 600, threshold = 25)) {
            log("没有了")
            let 剩余 = descEndsWith("’").find()
            for (let a = 0; a < 剩余.length; a++) {
                let b = 剩余[a].desc().match(/\d+/)
                if (b && 最短时间 > b[0]) {
                    最短时间 = b[0]
                }
            }
            back()
            if (最短时间 == 1) {
                toastLog("还剩" + 最短时间 + "分钟有能量")
                本地配置.put("蚂蚁森林", 5 * 60 * 1000 + new Date().getTime())
            } else {
                sleep(1000)
                let 能量 = depth(15).descEndsWith("g").findOnce()
                if (能量) 能量 = 能量.desc().match(/\d+/)[0] - 当前能量
                toastLog("本次共收取到" + 能量 + "g能量\n等待" + 最短时间 + "分钟会有能量")
                toastLog("本次共收取到" + 能量 + "g能量\n等待" + 最短时间 + "分钟会有能量")
                toastLog("本次共收取到" + 能量 + "g能量\n等待" + 最短时间 + "分钟会有能量")
                本地配置.put("蚂蚁森林", 最短时间 * 60 * 1000 + new Date().getTime())
                if (锁屏) Power()
                exit()
            }
            最短时间 = 99
            sleep(1000)
        } else {
            swipe(500, 1688, 565, 248, 100)
        }
        sleep(20)
        continue
    } else {
        查看更多.关()
    }
    if (界面 = textEndsWith("的蚂蚁森林").findOnce()) {
        log("进入", 界面.text())
        if (控件1([], desc("地图"))) {
            var 保护罩 = images.findColorInRegion(img, "#ffc3fb58", 429, 345, 651 - 429, 23, threshold = 20)
            if (保护罩) {
                有保护罩[界面.text().replace(/\s/gi, "")] = new Date().getTime()
                本地配置.put("有保护罩", JSON.stringify(有保护罩))
                toastLog(界面.text() + "有保护罩…好我记住你了┐(´-｀)┌")
                back()
                sleep(500)
            } else {
                收能量()
                收能量(1)
            }
        }
        sleep(1000)
    } else if (text("蚂蚁森林").idEndsWith("h5_tv_title").findOnce()) {
        if (控件1([627, 166, 1080, 1001], desc("地图"))) {
            if (!当前能量) {
                当前能量 = depth(15).descEndsWith("g").findOnce()
                if (当前能量) 当前能量 = 当前能量.desc().match(/\d+/)[0]
            }
            收能量()
            收能量()
            if (控件1(desc("查看更多好友"), 1)) {
                sleep(1000)
                continue
            }
            滑动 = scrollable(true).findOnce()
            if (滑动) {
                滑动.scrollForward()
                sleep(300)
                滑动.scrollForward()
                sleep(300)
                滑动.scrollForward()
                sleep(300)
                滑动.scrollForward()
                sleep(300)
                滑动.scrollForward()
            }
            控件1([], desc("查看更多好友"), 2)
            sleep(1000)
        } else {
            滑动 = scrollable(true).findOnce()
            if (滑动) {
                滑动.scrollBackward() //下滑()
                sleep(300)
                滑动.scrollBackward()
                sleep(300)
                滑动.scrollBackward()
            }
        }
    } else if (解锁()) {
        sleep(100)
    } else {
        运行支付宝()
        sleep(1000)
    }
}
function 停止其他脚本() {
    var 当前脚本 = engines.myEngine()
    log(当前脚本 + "")
    var 正在运行 = engines.all();
    log("正在运行的脚本有", 正在运行.length, "个")
    for (var i = 0; i < 正在运行.length; i++) {
        if (正在运行[i].toString() != 当前脚本.toString()) {
            log("停止脚本", 正在运行[i].toString());
            正在运行[i].forceStop();
        }
    }
}
function 解锁() {
    if (!context.getSystemService(context.POWER_SERVICE).isInteractive()) {
        log("屏幕没亮")
        device.wakeUp()
        锁屏 = 1
        sleep(1000)
        swipe(500, 1800, 600, 700, 200)
        sleep(2000)
        九宫格解锁(锁屏密码)
        sleep(2000)
    } else if (packageName("com.android.systemui").exists() || packageName("com.android.keyguard").exists()) {
        log("锁屏")
        锁屏 = 1
        Swipe(500, 1800, 600, 700, 500)
        sleep(2000)
        九宫格解锁(锁屏密码)
        sleep(2000)
    } else if (packageName("com.miui.securitycenter").findOnce()) {
        九宫格解锁(应用锁密码)
        运行支付宝()
        sleep(2000)
    } else {
        return 0
    }
    return 1
}

function 找手() {
    var 个数 = []
    var img = captureScreen();
    for (let a = 190; a < 1500; a += 380) {
        var p = images.findMultiColors(img, "#25a472", [
            [59, 15, "#1da06d"],
            [65, 14, "#1da06d"],
            [64, 64, "#26a473"]
        ], {
            region: [1000, a, 20, 380],
            threshold: 25
        });
        if (!p) p = findColor(img, "#f99137", {
            region: [1000, a, 20, 380],
            threshold: 25
        });
        if (p) 个数.push(p)
    }
    if (个数[0]) log("有", 个数.length)
    return 个数
}

function 载入更多() {
    var 状态 = 0
    var 查看更多
    var 线程 = threads.start(function() {
        while (1) {
            sleep(200)
            if (状态 == 1) {
                查看更多 = idContains("J_rank_list_more").findOnce()
                if (查看更多) {
                    for (let j = 0; j < 50; j++) {
                        if (状态 != 1) break
                        try {
                            查看更多.click()
                            sleep(100)
                        } catch (e) {
                            log(e, "错误")
                            break
                        }
                    }
                }
                if (desc("没有更多了").findOnce()) {
                    状态 = 2
                    toastLog("载入完成")
                } else {
                    log("未知")
                }
            }
        }
    })
    return {
        开: function() {
            if (状态 == 0) 状态 = 1
        },
        关: function() {
            状态 = 0
        },
        停: function() {
            线程.interrupt()
        }
    }
}

function 九宫格解锁(密码) {
    //密码为九宫格1-9的数字顺序
    var 坐标 = [238, 1024, 840, 1625]
    var x1 = (坐标[2] - 坐标[0]) / 2
    var y1 = (坐标[3] - 坐标[1]) / 2
    var 手势 = [密码.length * 110]
    for (let a = 0; a < 密码.length; a++) {
        let b = 密码[a] - 1
        if (b < 3) 手势.push([x1 * b + 坐标[0], 坐标[1]]);
        else if (b < 6) 手势.push([x1 * (b - 3) + 坐标[0], y1 + 坐标[1]]);
        else 手势.push([x1 * (b - 6) + 坐标[0], y1 * 2 + 坐标[1]]);
    }
    gesture.apply(null, 手势);
    sleep(1000)
}

function 运行支付宝() {
    var i = app.intent({
        action: "VIEW",
        data: "alipayqr://platformapi/startapp?saId=60000002"
    });
    app.startActivity(i);
    sleep(1000)
    if (!packageName("com.eg.android.AlipayGphone").exists()) {
        toastLog("支付宝启动失败！尝试使用root权限打开支付宝")
        var aa = shell("am start -n com.eg.android.AlipayGphone/com.eg.android.AlipayGphone.AlipayLogin", true);
        sleep(2000)
    }
}

function 收能量(返回) {
    var 能量球 = boundsInside(0, 300, 1040, 1217).className("android.widget.Button").find()
    //log("有"+能量球.length+"能量球")
    for (let a = 0; a < 能量球.length; a++) {
        let c = 能量球[a].bounds()
        if (c.height() > c.width()) 控件点击(能量球[a], 2)
    }
    if (返回) back()
}

function 控件点击(a, b) {
    try {
        if (b == 2) {
            let fw = a.bounds()
            log("坐标点击", fw.centerX(), fw.centerY())
            return click(fw.centerX(), fw.centerY())
        } else if (a) {
            log("控件点击", a.text() || a.desc())
            for (let i = 0; i < 5; i++) {
                if (a.clickable() == true) {
                    return a.click()
                } else {
                    a = a.parent()
                }
            }
        } else {
            log("控件不存在", a)
            return 0
        }
    } catch (e) {
        log("点击失败", a, b, e)
    }
    return 0
}

function 控件1() {
    var a = arguments
    var kj, kj1
    if (a[0] instanceof Array) {
        var ws = device.width / 1080
        var hs = device.height / 1920
        kj = a[1].find()
        if (kj.empty() && ("" + a[1]).match(/(text|desc)/)) {
            if (("" + a[1]).indexOf("text") > -1) {
                a[1] = eval((a[1] + "").replace(/text/g, "desc"))
            } else if (("" + a[1]).indexOf("desc") > -1) {
                a[1] = eval(("" + a[1]).replace(/desc/g, "text"))
            }
            kj = a[1].find()
        }
        for (let b = 0; b < kj.size(); b++) {
            var c = kj[b].bounds()
            if (a[0].length == 4) {
                let w1 = c.right - c.left
                let h1 = c.bottom - c.top
                if (c.height() > 0 && c.width() > 0 && a[0][0] * ws <= c.left && a[0][1] * hs <= c.top && a[0][2] * ws >= c.right && a[0][3] * hs >= c.bottom) {
                    kj1 = kj[b]
                    break
                }
            } else if (a[0].length == 2) {
                if (Math.abs(c.width() - a[0][0] * ws) < 20 && Math.abs(c.height() - a[0][1] * hs) < 20) {
                    kj1 = kj[b]
                    break
                }
            } else {
                if (c.height() > 0 && c.width() > 0) {
                    kj1 = kj[b]
                    break
                }
            }
        }
        if (a[2] && kj1) {
            控件点击(kj1, a[2])
        }
        return kj1
    } else {
        kj1 = a[0].findOnce()
        if (!kj1 && ("" + a[0]).match(/(text|desc)/)) {
            if (("" + a[0]).indexOf("text") > -1) {
                a[0] = eval((a[0] + "").replace(/text/g, "desc"))
            } else if (("" + a[0]).indexOf("desc") > -1) {
                a[0] = eval(("" + a[0]).replace(/desc/g, "text"))
            }
            kj1 = a[0].findOnce()
        }
        if (a[1] && kj1) {
            控件点击(kj1, a[1])
        }
        return kj1
    }
}