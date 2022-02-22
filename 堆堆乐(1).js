if (!requestScreenCapture()) {
    toast("请求截图失败，脚本停止运行");
    exit();
}
auto.waitFor();
//setScreenMetrics(1080, 1920);
var wt = device.width;
var ht = device.height;
console.verbose("设备分辨率：" + wt + "×" + ht)
//console.show();
var window = floaty.window(
    <horizontal>
        <button id="terminate" text="停止运行" />
    </horizontal>
);
window.terminate.click(() => {
    console.warn("脚本停止运行");
    exit();
});

var x = 520;
var y = 310;
var h = 10;
var ww = 100;
var xyz= wt/2-h/2;
log("宽度"+wt+":"+"除2,除方框"+wt/2);
log(xyz);

var w = floaty.rawWindow(
    <frame   alpha="1" >
        <frame id="f1" layout_gravity="left" bg="#FFFFFF" w="1" >
        </frame>
        <frame id="f2" layout_gravity="right" bg="#FFFFFF" w="1" >
        </frame>
        <frame id="f3" layout_gravity="top" bg="#FFFFFF"  h="1">
        </frame>
        <frame id="f4" layout_gravity="bottom" bg="#FFFFFF"  h="1">
        </frame>
    </frame>
);

//起点

//设置高宽
//w.setSize(h, ww);
//不能触摸
w.setTouchable(false);
//保持显示
setInterval(() => {}, 1000);
toastLog("请打开堆堆乐乐并点击开始");
app.launchPackage("com.eg.android.AlipayGphone");

sleep(200);
console.info("脚本运行中");
//ACACAE
while (true) {
    var point = findColor(captureScreen(), "#ACACAE", {
        region: [xyz, y, h, ww],
        threshold: 6
    });
    if (point) {
        //跳按钮
        click(wt/2, ht/2);
        h=h+4;
        xyz=wt/2-h/2
        w.setPosition(xyz, y);
        w.setSize(h, ww);
        
        log(point+"|||"+xyz+""+h)
        sleep(10);
    }
}