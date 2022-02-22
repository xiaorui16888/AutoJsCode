auto();
setScreenMetrics(1080, 2160);//分辨率可以自定义
//获取点赞次数
var a=rawInput("请输入你要点多少赞", "10");
//打开QQ
launchApp("QQ");
toast("请点击动态");
sleep(1000);
desc("点击进入好友动态").click();//好友动态
//等待控件页面
waitForActivity("cooperation.qzone.QzoneFeedsPluginProxyActivity",[ period = 200]);
    //开始循环点赞
    sleep(2000);
    for (i = 0; i <a; i++) {
        swipe(500, 1780, 500, 1000, 700);
        className("android.widget.ImageView").
        depth("4").drawingOrder("1").row("-1").
        findOne().click();
    }
