var window = floaty.window(
    <frame gravity="center" id="action" alpha="0.8">
        <card cardCornerRadius="10dp" cardElevation="5dp" >
            <horizontal w="auto" bg="#eeeeee">
                <text id="text" textSize="20sp" textColor="#f44336" margin="8 2" />
            </horizontal >
        </card>
    </frame >
);
window.exitOnClose();
window.setPosition(device.width / 4, 80)
toast("上方显示本机时间，\n下方显示网络时间，\n拖动移动，长按5秒关闭");
var showAll = true;
threads.start(function () {
    sleep(60000);
    showAll = false;
});
var timeDiff = dateDiff(gettime(), new Date().getTime())
log(0, gettime(), new Date().getTime())

showTime();
function showTime() {
    ttt = timeDiff % 1000;
   // sleep(1000 + ttt);
  //  log(timeDiff, ttt);
    setInterval(() => {
        //对控件的操作需要在UI线程中执行
        ui.run(function () {
            window.text.setText(LocaleTime());
        });
    }, 100);
}

function LocaleTime() {
    let str;
    if (showAll) {
        let date = new Date();
        str = util.format("%s:%s:%s.%s", checkTime(date.getHours()), checkTime(date.getMinutes()), checkTime(date.getSeconds()), checkTime2(date.getMilliseconds()));
        date = new Date(+new Date() - timeDiff)
        str += util.format("\n%s:%s:%s.%s", checkTime(date.getHours()), checkTime(date.getMinutes()), checkTime(date.getSeconds()), checkTime2(date.getMilliseconds()));

    } else {
        date = new Date(+new Date() - timeDiff)
        str = util.format("%s:%s:%s.%s", checkTime(date.getHours()), checkTime(date.getMinutes()), checkTime(date.getSeconds()), checkTime2(date.getMilliseconds()));
    }
    return str;
}

/**
 * 时间加0
 */
function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
/**
 * 时间加0
 */
function checkTime2(i) {
    if (i < 100) {
        i = "0" + i;
    } else if (i < 10) {
        i = "00" + i;
    }
    return i;
}
var execution = null;

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 2000) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                window.setAdjustEnabled(!window.isAdjustEnabled());
                if (windowX < 0) {
                    window.setPosition(0, windowY);
                }
                if (windowY < 0) {
                    window.setPosition(windowX, 0);
                }
            }
            return true;
    }
    return true;
});

function gettime() {
    d = httpTimeAPI();
    if (d) {
        return d;
    }
    d = httpTime();
    if (d) {
        return d;
    }
    return false;
}

function httpTimeAPI() {
    try {
        var res = http.get("api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp");
        if (res.statusCode != 200) {
            return false;
        } else {
            var d = Date.parse(res.headers.Date)
            var tt = res.body.json();
            return Number(tt.data.t);
        }
    } catch (e) {
        log(e)
    }

}

function httpTime() {
    try {
        var res = http.get("www.baidu.com/");
        if (res.statusCode != 200) {
            return false;
        } else {
            var d = Date.parse(res.headers.Date)
            return d;
        }
    } catch (e) {
        log(e)
    }
}


function tt() {
    var timeDiff = dateDiff(gettime(), new Date().getTime());
    ServerDate3 = +new Date() + timeDiff;
    return ServerDate3
}

/**
 * 时间差
 */
function dateDiff(date1, date2) {
    return (new Date(date2)) - (new Date(date1));
}