"auto";
//console.show();
log("开始");
var qinxidu = rawInput("请输入读取图片清晰度，1-20的数字，数字越小越清晰但读取速度越慢，建议设置5以上");
if (!qinxidu) {
    qinxidu = 6;
}
qinxidu = parseInt(qinxidu)
log(qinxidu)
var mingan = rawInput("请输入图片明暗差值1-10之间")
if (!mingan) {
    mingan = 3;
}
mingan = parseInt(mingan)
sleep(1000)


if (!requestScreenCapture()) {
    toast("请求截图失败");
    stop();
}
  var img = captureScreen();

tupian = ""
zt = 0
da = 0
xiao = 0
events.observeTouch();
events.onTouch(function(p) {
    log(p.x + ", " + p.y);
    x = p.x
    y = p.y
    if (zt == 0) {
        x1 = x;
        y1 = y;
        zt = 1
        toast("请点击图片右下角")
    } else if (zt == 1) {
        x2 = x;
        y2 = y;
        zt = 2;
      //  sleep(1000)
       // var img = captureScreen();
        toast("正在读取图片请稍等……")
        for (i = -16777216; i < -1; i = i + 5) {
            var point = findColor(img, i, {
                algorithm: "diff",
                //指定r, b, b分别都在范围ff±20内
                threshold: 0x202020,
                region: [x1, y1, x2 - x1, y2 - y1],
                threads: 8
            });
            if (point) {
                xiao = i
                log(i)
                //toastLog("x = " + point.x + ", y = " + point.y);
                i = 1;
            } else {
                // toastLog("没有找到");
            }

        }
        for (i = -1; i > -16777216; i = i - 5) {
            var point = findColor(img, i, {
                algorithm: "diff",
                //指定r, b, b分别都在范围ff±20内
                threshold: 0x202020,
                region: [x1, y1, x2 - x1, y2 - y1],
                threads: 8
            });
            if (point) {
                da = i
                log(i)
                //  toastLog("x = " + point.x + ", y = " + point.y);
                i = -9999999999991;
            } else {
                //  toastLog("没有找到");
            }

        }
        yanse = (da + xiao) / mingan
        yanse = parseInt(yanse, 10)
        log(yanse);
        for (i = y1; i < y2; i = i + qinxidu) {
            for (j = x1; j < x2; j = j + qinxidu) {
                aa = images.pixel(img, j, i);
                // log(aa)
                //  setClip(aa)
                //  stop()
                if (aa < yanse) {
                    tupian = tupian + "8";
                } else {
                    tupian = tupian + "0";
                }
            }
            tupian = tupian + "2";
        }
        // log(tupian);
        // setClip(tupian)
        var file = open("/sdcard/tupian.txt", "w")
        file.write(tupian);
        file.close();
        //  toast("图片读取完成")
        alert("图片读取完成")
        stop();
    } else {
        events.removeAllTouchListeners()
    }
});
//events.loop();
toast("请点击图片左上角")
log("结束")