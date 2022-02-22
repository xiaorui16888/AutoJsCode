if (!requestScreenCapture(false)) {
    alert("请求截图权限失败！");
    exit();
}
if (!confirm("请认真阅读!!","此脚本有一定几率点错!\n请在游戏中设置主题为黑色再打开脚本！\n选择了模式以后尽量将开始方块下面的黑块移动到屏幕外避免干扰。\n点击确定继续运行脚本，点击取消退出脚本。"))
    exit()
sleep(3000);
var img, t_img, pc, lpc, rpc, x, y;
var top = 40,
    bottom = 0; //底部去除高度
var pre = false; //是否提前 适用于极速模式
var prey = 0; //提前量
var w = device.width,
    h = device.height,
    rh = h - bottom - top; //设备宽高
var col = 4; //方块列数
files.ensureDir("/sdcard/WhiteBlock/");
var bre = false;
while (true) {
    log("开始时间:" + new Date().getTime());
    img = captureScreen();
    img = images.clip(img, 0, top, w, rh);
    for (var i = 3; i >= 0; i--) {
        t_img = images.clip(img, 0, rh / 4 * i, w, rh / 4); //划分图片
        for (var j = 0; j < col; j++) {
            pc = t_img.pixel((w / col / 2) * (j * 2 + 1), 0);
            if (colors.red(pc) == 32 && colors.green(pc) == 32 && colors.blue(pc) == 32) {
                x = w / col / 2 * (j * 2 + 1);
                x += 10;
                y = rh / 4 * i + h / 8;
                if (pre) {
                    prey += 5;
                }
                y += prey;
                press(x, y, 1)
                log("结束时间" + new Date().getTime());
                t_img.saveTo("/sdcard/WhiteBlock/" + new Date().getTime() + ".png");
                //sleep(80)
                log(x, y);
                bre = true;
                break;
            }
        }
        if (bre) {
            bre = false;
            break;
        }
    }
}