auto.waitFor();
var a=device.width
var b=device.height*0.6
new java.lang.Thread(function () {
    classNameContains("Button").textContains("立即开始").click();
    }).start();
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}
while(true){
    var img   = captureScreen();
    /*var color1 = images.pixel(img,120,b);
    var color2 = images.pixel(img,400,b);
    var color3 = images.pixel(img,220,b);
    var color4 = images.pixel(img,930,b);*/
    if (images.detectsColor(img,"#000000",a*0.2,b)){
        press(a*0.2,b,1);
    }
    if (images.detectsColor(img,"#000000",a*0.4,b)){
        press(a*0.4,b,1);
    }
    if (images.detectsColor(img,"#000000",a*0.7,b)){
        press(a*0.7,b,1);
    }
    if (images.detectsColor(img,"#000000",a*0.8,b)){
        press(a*0.8,b,1);
    }
    if (images.detectsColor(img,"#ffffb600",a*0.2,b)){
        press(a*0.2,b,1);
    }
    if (images.detectsColor(img,"#ffffb600",a*0.4,b)){
        press(a*0.4,b,1);
    }
    if (images.detectsColor(img,"#ffffb600",a*0.7,b)){
        press(a*0.7,b,1);
    }
    if (images.detectsColor(img,"#ffffb600",a*0.8,b)){
        press(a*0.8,b,1);
    }
}