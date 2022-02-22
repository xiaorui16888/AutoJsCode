console.show()

截图用时=20//20-100之间手机性能越好越低

console.setPosition(200, 500)
var w = floaty.rawWindow(
    <frame gravity="center">
        <vertical>
            <text id="text" textColor="#000000">悬浮文字</text>
            <horizontal>
                <button id="左" text="左"/>
                <button id="右" text="右"/>
            </horizontal>
            <button id="退出" text="退出"/>
        </vertical>
    </frame>
);
w.setPosition(0, 400)

w.左.click(() => {
    位置 -= 5
});
w.右.click(() => {
    位置 += 5
});
w.退出.click(() => {
    exit()
});
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
sleep(1000)
var 方向
var 位置 = 510
threads.start(function() { //在新线程执行的代码 
    var i = 0
    while (true) {
        i++
        ui.run(function() {
            w.text.setText(i + "下落位置" + 位置);
        });
        sleep(16)
    }
});
events.on("exit", function() {
    img.recycle
    log("结束运行");
});
var x0 = 0
var sj0 = 0
var x = 0
左边界 = 1000
左时间 = 0
右边界 = 0
右时间 = 0
var p;
if (!packageName("com.eg.android.AlipayGphone").findOnce()) {
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https://qr.alipay.com/s7x01029enkqgrobuxxe989"
    });
    sleep(5000)
}
while (true) {
    sleep(16)
    sj = new Date().getTime()
    img = captureScreen();
    sj1 = new Date().getTime() - sj
    if (sj1 > 截图用时) {
        log(sj1)
        方向 = "右"
        continue
    }
    // img = images.interval(img, "#ff720520", 16)
    p = findColorInRegion(img, "#ffacacae", 280, 320, 500, 2, 15)
    if (p) {
        if (p.x < 位置) {
            方向 = "左"
        } else if (p.x > 位置 + 截图用时) {
            方向 = "右"
        } else {
            log("位置", 方向, p.x)
            if (方向 == "左") {
                log("点击", p.x)
                click(p.x, 1850)
                sleep(2000)
                方向 = "右"
            }
        }
        jl = p.x - x0
        ys = sj - sj0
        if (方向 == "左") {
            if (左边界 > p.x) {
                左边界 = p.x
                左时间 = sj
            }
        } else if (方向 == "右") {
            if (右边界 < p.x) {
                右边界 = p.x
                右时间 = sj
            }
        }
        if (方向 == "左" && ys < 50 && x0 < p.x) {
            // log("位置",p.x,"距离",jl,"用时",ys,"速度",(jl/ys))
        }
        x0 = p.x
        sj0 = sj
    } else {
        sleep(55)
        方向 = "右"
    }

}
