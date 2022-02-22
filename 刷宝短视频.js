console.show();
launchApp("刷宝短视频");
sleep(1000)
requestScreenCapture()
var w = device.width;
var h = device.height;
var fw = id("tabLayout").findOne();
x = (fw.bounds().left)
y = (fw.bounds().top)
var img = captureScreen(); 
var color = images.pixel(img,x,y); 
for (i = 0; i < 300; i++) {
    sleep(random(2000,3500))
    var image = captureScreen();
   if (colors.toString(images.pixel(image,x,y)) == "#ff000000") {
            c = random(10000, 18000)
            log("播放第" + i + "个视频随机时长" + c)
            sleep(c)
            swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
        } else {
            log("视频没播放")
            swipe(w * 0.6 - random(10, 30), h * 0.7 + random(10, 20), w * 0.6 + random(50, 80), h * 0.4 + random(10, 30), random(220, 235))
        }
    };