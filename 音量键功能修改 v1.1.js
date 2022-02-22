var arr = engines.all(),
    me = engines.myEngine(),
    stop = false;
for (let i = 0; i < arr.length; i++) {
    if (arr[i].getSource().toString() == me.getSource().toString()) {
        if (arr[i] != me) {
            arr[i].forceStop();
            stop = true;
        }
    }
}
if (stop) {
    exit();
}
auto.waitFor();
//音量功能修改 v1.1
//修复了：截图保存后 媒体库中没有 该图片

events.observeKey();
var max = device.getMusicMaxVolume(),
    toa = toasts();
events.setKeyInterceptionEnabled("volume_down", true);
events.setKeyInterceptionEnabled("volume_up", true);
events.onKeyUp("volume_down", (e) => {
    var time = e.getEventTime() - e.getDownTime();
    switch (true) {

        case time > 300:
            let path = "/sdcard/Pictures/ScreenShots/" + new Date().toLocaleString() + ".png";
            let chengxu = "requestScreenCapture();\n captureScreen(\"" + path + "\");";
            engines.execScript("截屏", chengxu);
            sleep(1000);
            if (files.exists(path)) {
                toa("已截屏保存", 2500);
                media.scanFile(path);
            } else {
                toa("截屏失败", 3000);
            }
            break;

        default:
            let v = device.getMusicVolume();
            if (v > 0) {
                v--;
                device.setMusicVolume(v);
            }
            toa("媒体音量 " + v + "\n最大音量 " + max);
    }
});

events.onKeyUp("volume_up", (e) => {
    var time = e.getEventTime() - e.getDownTime();
    switch (true) {

        case time > 300:
            threads.start(function() {
                recent();
            });
            break;

        default:
            let v = device.getMusicVolume();
            if (v < max) {
                v++;
                device.setMusicVolume(v);
            }
            toa("媒体音量 " + v + "\n最大音量 " + max);
    }
});


//双击多任务键切换应用
function recent() {
    sleep(100);
    recents();
    sleep(300);
    recents();
}

function toasts() { //mes 是输入的通知内容，time是通知持续时间，单位是 毫秒（默认值是5秒，所以这个参数可以省略）
    var th = "", //备用变量
        Y = device.width / 2,
        X = Y * 3 / 4,
        x = Y / 2;

    var flo = floaty.rawWindow( //新建一个悬浮窗
        <frame gravity="center">
            <text id="message" bg="#66000000" textColor="#ffffff" textSize="2mm" gravity="center" w="*" padding="1"/>
        </frame>
    );
    flo.setTouchable(false);
    return doflo; //返回一个函数，之后的操作都在这个函数中进行。


    function doflo(mes, time) {

        time = time || 5000;
        mes = mes || "";

        if (th != "") {
            th.interrupt(); //停止这个线程
            th = "";
        }

        ui.run(function() { //在ui线程中对悬浮窗进行操作
            flo.message.setText(mes); //设置文本
        });

        flo.setPosition(X, Y); //设置悬浮窗的位置
        flo.setSize(x, -2); //设置悬浮窗大小

        th = threads.start(function() { //新建一个线程
            sleep(time); //等待time毫秒
            flo.setSize(0, 0); //设置悬浮窗大小为0,0
            th = "";
        });
    }
}