let thread1;
sleep(1000);
g = id("relative").find().length;
for (;;) {
    toastLog("本页共有" + g + "个签到项目。");
    for (i = 0;i<g; i++) {
        id("relative").findOne();
        id("relative").findOnce(i).longClick();
        text("执行当前").findOne();
        while (!click("执行当前"));
        id("relative").findOne();
        g = id("relative").find().length;
        sleep(2000);
        thread1 = threads.start(function () {
        events.observeToast();
events.onToast(function(toast){
    for(;;)
    {
    if((toast.getText()=="签到任务已完成！")&&(toast.getPackageName()=="com.moyan.dailytask"))
    {
        toastLog("签到任务已完成！");
        break;
    }
    sleep(500);
    }
});
});
    }
    if(text("QQ空间小游戏每日任务").findOne(500))
    {
        alert("已全部签到完成");
        exit();
    }
    swipe(540,1910,540,442,500);
}