/*
微信 Ok3389888
*/
requestScreenCapture();

id("mBtQuit").waitFor()
sleep(2500)
var hei = device.height / 5;
while (true) {
    img = captureScreen();
    var p = images.findColorEquals(img, "#8fff2b")
    if (p) {
        if (p.x < device.width / 2) {

            yy = 0
            //在左边
            ys = "#0082b8"
            break
        } else {
            //在右边
            yy = device.width / 2
            ys = "#d4004e"
            break
        }
    }
}
while (true) {
    img = captureScreen();
    var a = 3;
    while (a >= 0) {
        if (a > 0) {
            cc = hei * a;
        } else {
            cc = 0;
        }
        var tu = images.clip(img, yy, cc, device.width / 4, hei);
        sleep(5)
        if (images.findColorEquals(tu, ys)) {
            press(device.width / 2 + 50, device.height / 2, 1)
        } else {
            press(50, device.height / 2, 1)
        }
        a--
    }
    img = null
    sleep(600)
}