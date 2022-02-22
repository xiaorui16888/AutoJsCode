
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}

sleep(2000);
ar = getcolors(210, 163, 1030, 984, 5);

//获取 (x,y)左上角 到 (x1,y1)右下角 的坐标和颜色,num为密度，num越大，获取的点越多。返回数组，并复制到剪切板，输出到日志
function getcolors(x, y, x1, y1, num) {
    let w = x1 - x;
    let h = y1 - y;
    let wh = Math.sqrt((w * w) + (h * h));
    if (num < 1) {
        toast("密度太小");
        log("密度太小");
        return;
    }
    let w1 = parseInt((wh / num) / wh * w);
    let h1 = parseInt((wh / num) / wh * h);
    if (w1 < 1 || h1 < 1) {
        toast("密度太大");
        log("密度太大");
        return;
    }
    var acolors = new Array();
    let i = 0;
    let x2 = x;
    let y2 = y;
    while (y2 <= y1) {
        let a = images.pixel(captureScreen(), x2, y2)
        acolors[i++] = new Array(x2, y2, colors.toString(a));
        x2 += w1;
        if (x2 > x1) {
            y2 += h1;
            x2 = x;
        }
    }
    
    let acolorstr = "";
    for(i in acolors){
        acolorstr += ",["+acolors[i][0]+","+acolors[i][1]+",\""+acolors[i][2]+"\""+"]";
    }
    acolorstr += "]";
    acolorstr = acolorstr.substr(1);
    acolorstr = "[" + acolorstr;
    setClip(acolorstr);
    log(acolorstr);
    
    return acolors;
}