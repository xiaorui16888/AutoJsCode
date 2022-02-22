/*
 *作者：无羡
 *QQ:3402345716
 *测试机型：HUAWEI INE-TL00
 *转载请注明出处
 */

var appName = ["种子视频"]//分身名字
for (let i in appName) {
    console.show();
    console.setPosition(10, 1100);
    log("正在打开：" + appName[i]);
    launchApp(appName[i]);
    while (1) {
        id("mainHallTab").findOne().click();
        toastLog("刷新...");
        sleep(5000)
        var time = idEndsWith("item_video_time").findOne().text();
        var timeout = time.match(/\d+/g)[0];
        //判断视频长度(其实5分钟我也感觉好长了，下面的判断可以自由删减)
        if (timeout == 03 || timeout == 04 || timeout == 05) {
            log("开始播放");
            var A=id("item_video_rl").findOnce();
            A.click();
            sleep(500);
            text("继续播放").click();
            log("将播放至视频结束");
            break;
        } else {
            log("时间不够三分钟或超过！");
            var B = idEndsWith("main_tab_bar_tv").findOne().bounds();
            click(B.centerX(), B.centerY());
        }
    }
    idEndsWith("video_finish_tv").waitFor();
    log("任务完成");
}