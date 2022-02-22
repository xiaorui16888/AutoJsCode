"auto";
//console.show();
//log("开始");
var daxiao = rawInput("请输入图片放大倍数1-20,根据清晰度来设置");
if (!daxiao) {
    daxiao = 5;
}
daxiao = parseInt(daxiao)
//var qinxidu = rawInput("请输入图片清晰度1-5");
//if (!qinxidu) {
 //   qinxidu = 2;
//}
//qinxidu = parseInt(qinxidu)
sleep(1000)
//zuobiao = "1110001111001100000111001000010101110001120000101022210101000011000111100011111100010200011001111121100011111110101011111211110010101000101111110100010100201010101111111100001010"
//zuobiao = getClip() + ""
var file = open( "/sdcard/tupian.txt");
zuobiao = file.read()+""
file.close();
//log(zuobiao)
zishu = zuobiao.length
log(zishu)
zuobiaozhu = [10]


events.observeTouch();
events.onTouch(function(p) {
    log(p.x + ", " + p.y);
    x = p.x
    y = p.y
    x1 = x
    x2 = x
    zt = 0
    for (i = 0; i < zishu; i++) {
        zuobiao1 = zuobiao.substr(i, 1)
        // log(zuobiao1)
        if (zuobiao1 == 0) {
            //   log("跳过")
            if (zt == 1) {
              //  for (z = 0; z < daxiao; z=z+qinxidu) {
                //    swipe(x0, y + z, x2, y + z, 1)
              //  }
               swipe(x0, y, x2, y, 1)
            }
            zt = 0
            x1 = x1 + daxiao
        } else if (zuobiao1 == 8) {
            //  log("开始")
            x1 = x1 + daxiao
            x2 = x1
            if (zt == 0) {
                x0 = x1
            }
            zt = 1
        } else {
            // log("画图")
            if (zt == 1) {
              //  for (z = 0; z < daxiao; z=z+qinxidu) {
                //    swipe(x0, y+z, x2, y+z, 1)
              //  }
               swipe(x0, y, x2, y, 1)
            }
            zt = 0
            x1 = x
            y = y + daxiao
        }

    }
    toast("画图完成")
    stop();
    events.removeAllTouchListeners()


});
//events.loop();
toast("请点击画图左上角的起点")
log("结束")