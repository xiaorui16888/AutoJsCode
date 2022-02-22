auto.waitFor();

openTaobao();
autoClose();
function autoClose() {
    setTimeout(function () {
        log("超过10分钟自动结束")
        exit();
    }, 60 * 60 * 1000);
}
/*
初始化
*/


const IS_ANDROID7 = device.sdkInt >= 24;
const IS_ROOT = files.exists("/sbin/su") || files.exists("/system/xbin/su") || files.exists("/system/bin/su");
if (IS_ROOT) {
    log(IS_ROOT);
    var ra = new RootAutomator();
}

var _log_ = log;
log = function (message) {
    ui.run(function () {
        if (window.echos.text() == "") {
            window.echos.setText(message + "\n");
        } else {
            window.echos.append(message + "\n");
        }
        window.logs.scrollTo(0, window.echos.getHeight());
    });
}



var move = true
var window = floaty.rawWindow(
    <frame w="*" h="100" >
        <card cardCornerRadius="10dp" cardElevation="5dp" >
            <vertical w="auto">
                <horizontal id="move" bg="#eeeeee" w="*" padding="10 0" h="30" >
                    <text text="养猫" layout_gravity="center_vertical" w="auto" textStyle="bold" h="auto" textSize="10sp" />
                    <horizontal gravity="right|center_vertical" w="*" >
                        <img id="remove" marginRight="10" src="@drawable/ic_remove_black_48dp" w="25" h="25" />
                        <img id="exit" src="@drawable/ic_close_black_48dp" w="25" h="25" />
                    </horizontal >
                </horizontal >
                <vertical>
                    <Switch id='cb1' text="启动" />
                </vertical>
                <ScrollView id="logs" w="*">
                    <vertical>
                        <card w="*" margin="10 5" cardCornerRadius="2dp" cardElevation="1dp" gravity="center_vertical">
                            <vertical>
                                <text id="echos" textSize="10sp" ></text>
                            </vertical>
                        </card>
                    </vertical>
                </ScrollView>
            </vertical>
        </card>
    </frame>
);
setInterval(() => { }, 1000);

window.setPosition(0, device.height / 2);
window.cb1.on("check", (checked) => {
    if (checked == false) {
        thread.interrupt();
    } else {
        threads.start(function () {
            text("明天继续找猫猫").waitFor();
            log("明天继续找猫猫")
            thread.interrupt();
        });
        run();
    }
});
window.remove.click(() => {
    if (move) {
        move = false;
        window.setSize(120, 90);
    } else {
        move = true;
        window.setSize(windowWidth, windowHeight);
    }
});
window.exit.on("click", () => {
    exit();
});

var x = 0,
    y = 0; //记录按键被按下时的触摸坐标
var windowX, windowY; //记录按键被按下时的悬浮窗位置
var downTime; //记录按键被按下的时间以便判断长按等动作
ui.run(function () {
    windowWidth = window.getWidth();
    windowHeight = window.getHeight();

});
window.move.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                min();
            }
            return true;
    }
    return true;
});

/**
 * 最小化
 */
function min() {
    if (move) {
        move = false;
        window.setSize(120, 90);
        if (windowX < 0) {
            window.setPosition(0, windowY);
        }
    } else {
        move = true;
        window.setSize(windowWidth, windowHeight);
    }
}




function run() {
    thread = threads.start(function () {
        while (true) {

            get()

        }
    });
}

function get() {
    sleep(500);
    text("点击得喵币").waitFor()
    text("点击得喵币").findOne().click()
    log("点击得喵币")
    sleep(500)

    text("开心收下").waitFor()
    text("开心收下").findOne().click()
    log("开心收下")
    sleep(500);
    id("browser_menu_refresh").findOne().click()
    log("刷新")


}

/**
 * 搜寻阳光
 */
function 搜寻阳光() {
    thread2 = threads.start(function () {
        for (let i = 1; i <= 8; i++) {
            text("搜寻阳光").findOne().parent().click()
            b = desc("立即打开").findOne(10000)
            if (b) {
                b.parent().click()
                back()
                sleep(1000);
                continue;
            }
            c = text(" 关注店铺 ").findOne(10000)
            if (c) {
                c.parent().click()
                back()
                sleep(1000);
                continue;
            }
        }

    });
}

/**
 * 收阳光
 */
function 收阳光() {
    log("收阳光");
    let superMario = captureScreen();
    let block = images.read("sun.png");
    // let block = images.read("/sdcard/脚本/焱燚自动化/sun.png");
    /*  for (let i = 0; i < 10; i++) {
        let point = findImage(superMario, block, {
            threshold: 0.8
        });
        if (point) {
            click(point.x, point.y);
            sleep(300)
        }
    }*/



    let points = images.matchTemplate(superMario, block, {
        threshold: 0.8,
    }).points;
    points.forEach(point => {
        click(point.x, point.y);
        sleep(400)
    });
    sleep(1000)
}

function 偷取阳光() {
    log("偷取阳光");
    for (let i = 1; i <= 10; i++) {
        text("偷取阳光").findOne().parent().click()
        log("偷取阳光")
        text("TA").waitFor()
        sleep(2000)
        收阳光()
        back();
    }
}





function openTaobao() {
    url = "pages.tmall.com/wow/a/act/tmall/tmc/22351/wupr?&wh_pid=industry-161308";
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "taobao://" + url
    });
}