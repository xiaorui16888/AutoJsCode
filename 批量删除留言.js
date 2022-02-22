auto();
//系统7.0以上
//分辨率1080*1920(其他的没试过)
//使用方法：进自己的QQ空间→进留言→返回aj运行脚本→再返回QQ空间(傻瓜式教程)
//有bug别找我 反正我能用
requestScreenCapture();

threads.start(function(){
    for(;;){
        desc("确定按钮").text("确定").click();
    }
});

for(;;){
    检测();
    sleep(500);
}
function 检测(){
    var a = text("趣味").findOne().bounds();
    var YH = findColorInRegion(captureScreen(), "#6D718A", a.centerX()-82, a.centerY()+100, 120, 180);
    if(YH){
        click(YH.x,YH.y);
        click(590,940);
    }
    
}
