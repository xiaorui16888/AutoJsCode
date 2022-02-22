//请求截图 
requestScreenCapture(false); 
//截图 
var im = captureScreen(); 
//以时间为参考命名截图
var path = "/sdcard/"+load_Time()+".png"; 
//保存图片 
im.saveTo(path); 
//把图片加入相册 
media.scanFile(path);

function load_Time() {
    return new java.text.SimpleDateFormat("yyyy-MM-dd-HH-mm-ss").format(new Date());
}