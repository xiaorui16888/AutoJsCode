/**
 *作者QQ: 337810364
 *完成时间: 2019年4月10日 20:00
 *测试机型: Mi Note 3
 *Auto.js版本: 4.1.1 Alpha2
 *屏幕: 1080*1920
 *API: 27
 *备注: 暂无备注
 **/
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
};
var thread = threads.start(function() {
    while (true) {}
});
var window = floaty.window(
    <horizontal>
        <vertical>
            <linear>
                <input id="name"hint="X轴"inputType="number"h="40"w="auto"bg="#77ffffff"/>
                <input id="name1"hint="Y轴"inputType="number"h="40"w="auto"bg="#77ffffff"/>
            </linear>
            <linear>
                <input id="name2"text="20"hint="X轴"inputType="number"h="40"w="auto"bg="#77ffffff"/>
                <input id="name3"text="0"hint="Y轴"inputType="number"h="40"w="auto"bg="#77ffffff"/>
            </linear>
        </vertical>
        <button id="ok"text="找色"h="40"w="60"margin="5 20"bg="#77ffffff"/>
    </horizontal>);
var x = 0,
    y = 0;
var windowX, windowY;
var downTime;
window.ok.setOnTouchListener(function(k, l) {
    switch (l.getAction()) {
        case l.ACTION_DOWN:
            x = l.getRawX();
            y = l.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case l.ACTION_MOVE:
            window.setPosition(windowX + (l.getRawX() - x), windowY + (l.getRawY() - y));
            if (new Date().getTime() - downTime > 2000) {
                thread.interrupt();
                exit();
            }
            return true;
        case l.ACTION_UP:
            if (Math.abs(l.getRawY() - y) < 5 && Math.abs(l.getRawX() - x) < 5) {
                threads.start(function() {
                    if (window.name.text() == "" || window.name1.text() == "") {
                        toast("空值");
                        return
                    }
                    var x = parseInt(window.name.text());
                    var y = parseInt(window.name1.text());
                    var a = parseInt(window.name2.text());
                    var b = parseInt(window.name3.text());
                    if (x > device.width || y > device.height) {
                        toast("超过屏幕范围");
                        return
                    }
                    window.name.setText("");
                    window.name1.setText("");
                    var d = x - a;
                    var e = y - b;
                    var f = x + a;
                    var g = y + b;
                    var h = captureScreen();
                    var c = images.pixel(h, x, y);
                    var i = images.pixel(h, d, e);
                    var j = images.pixel(h, f, g);
                    单点 = "findColorEquals(captureScreen(),'" + colors.toString(c) + "')";
                    setClip(单点);
                    多点 = "findMultiColors(captureScreen(),'" + colors.toString(c);
                    多点 += "',[[" + (d - x) + "," + (e - y) + ",'" + colors.toString(i) + "'],[";
                    多点 += (f - x) + "," + (g - y) + ",'" + colors.toString(j) + "']])";
                    setClip(多点);
                    toast("完成");
                });
                window.disableFocus();
            }
            return true
    }
    return true
});
window.name.on("touch_down", () => {
    window.requestFocus();
    window.name.requestFocus()
});
window.name1.on("touch_down", () => {
    window.requestFocus();
    window.name.requestFocus()
});
window.name2.on("touch_down", () => {
    window.requestFocus();
    window.name.requestFocus()
});
window.name3.on("touch_down", () => {
    window.requestFocus();
    window.name.requestFocus()
});;