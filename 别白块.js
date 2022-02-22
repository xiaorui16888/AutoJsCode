auto("fast");
requestScreenCapture();
console.show();
var i = 1;
var kd = device.width;
while (true) {
    sleep(50);
    var p = findColor(captureScreen(),
        "#ff171717", {
            region: [0, 1150, kd, 5],
            threshold: 22
        });
    if (p) {
        var 随机=random(1,50);
        i++;
        log(i);
        press(p.x, p.y,随机);
        sleep(100);
    } else {
        log("没有了");
        break;
    }
}