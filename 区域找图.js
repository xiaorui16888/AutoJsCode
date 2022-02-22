requestScreenCapture();
//截图
var img = captureScreen();
var d = images.load("http://img04.sogoucdn.com/app/a/100520146/764ea4d3491e54d83bd8ba209536c298");
                           //#颜色代码
 //指定在位置区域(x,   y,区域,高宽)。
var point = images.findImage(img,d, {
    region: [300, 727,205,250],
    threshold: 0.8
});
if(point){
    toast("找到了");
    }else{
    toast("没找到");

}