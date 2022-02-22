var 功能 = ["冻结", "启用", "停止", "卸载"],
    root = true,
    操作 = "",
    toa = toasts("正在启动……", 500);

while (true) {
    var applist = [],
        apklist = "",
        j = "",
        i = "";
    i = dialogs.select("功能", 功能);
    switch (i) {
        case 0:
            apklist = "pm list packages -e -3";
            操作 = "pm disable ";
            break;
        case 1:
            apklist = "pm list packages -d -3";
            操作 = "pm enable ";
            break;
        case 2:
            apklist = "pm list packages -e -3";
            操作 = "am force-stop ";
            break;
        case 3:
            apklist = "pm list packages -3";
            操作 = "pm uninstall ";
            break;
        default:
            exit();
    }
    apklist = shell(apklist).result.split("\n").join("").split("package:");
    apklist.shift();
    apklist.forEach(function(apk) {
        applist.push(app.getAppName(apk))
    });
    try {
        j = dialogs.multiChoice("应用列表", applist);
        var sh = new Shell(root);
        j.forEach(function(n) {
            sh.exec(操作 + apklist[n]);
            log(功能[i] + "：" + applist[n] + "(" + apklist[n] + ")");
        });
        toa("正在处理，请稍候…", 60000);
        sh.exitAndWaitFor();
        toa("处理完成。", 1000);
    } catch (err) {};
}


//————————————提示函数——————————————
function toasts(mes, time) { //mes 是输入的通知内容，time是通知持续时间，单位是 毫秒（默认值是5秒，所以这个参数可以省略）
    var x = device.width / 2, //悬浮窗的宽度
        y = device.height / 16, //悬浮窗的高度
        th = ""; //备用变量

    var flo = floaty.window( //新建一个悬浮窗
        <frame gravity="center">
            <text id="message" bg="#ff000000" textColor="#ffffff" textSize="35px" gravity="center" w="*" padding="1"/>
        </frame>
    );

    doflo(mes, time); //调用函数，设置悬浮窗的文字内容
    return doflo; //返回一个函数，之后的操作都在这个函数中进行。


    function doflo(mes, time) {

        time = time || 5000;
        mes = mes || "";

        //通过截屏图片来区分当前屏幕方向
        requestScreenCapture(); //请求截屏
        var pic = captureScreen(); //截屏
        var X = pic.getWidth(), //当前屏幕宽度
            Y = pic.getHeight(); //当前屏幕高度

        X = (X - x) / 2; //悬浮窗的位置坐标
        Y = Y * 0.75; //悬浮窗的位置坐标

        if (th != "") {
            th.interrupt(); //停止这个线程
            th = "";
        }

        ui.run(function() { //在ui线程中对悬浮窗进行操作
            flo.message.setText(mes); //设置文本
        });

        flo.setPosition(X, Y); //设置悬浮窗的位置
        flo.setSize(x, y); //设置悬浮窗大小

        th = threads.start(function() { //新建一个线程
            sleep(time); //等待time毫秒
            flo.setSize(0, 0); //设置悬浮窗大小为0,0
            th = "";
        });
    }
}