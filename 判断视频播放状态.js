console.show();
requestScreenCapture()
var image = captureScreen();
sleep(500)
var color = images.pixel(image, device.width / 2, device.height / 2);
a=(colors.toString(color));
log(a)
if (colors.toString(images.pixel(image, device.width / 2, device.height / 2)) ==a){
    log("视频已暂停")
};