"ui";

ui.layout(
    <vertical padding="16">
                  <!-- hint属性用来设置输入框的提示-->
         <text text="带提示的输入框" textColor="black" textSize="16sp" marginTop="16"/>
         <input id="q" hint="请输入一些内容"/>
<button id="ok" text="确定" w="auto" style="Widget.AppCompat.Button.Colored"/>
    </vertical>
);

ui.ok.click(() => {
    var t = ui.q.text();
    //console.log(t);
    var strs = new Array();
    strs = t.split("，");
    threads.start(function() {
        for (var i = 0; i < strs.length; i++) {
            console.show();
            console.setPosition(30, 1100);
            console.log(strs[i]);
            var appname = strs[i];
            launchApp(appname);
            console.show();
            console.log("正在打开：" + appname)
            var img = id("item_video_icon").waitFor();
            console.log("找到视频");
            var time = id("item_video_time").findOne().text();
            console.log("视频时长-->" + time);

            while (time < "03:00") {
                engines.execAutoFile("/sdcard/脚本/滑动.auto");
                toastLog("时长不够，正在刷新");
                sleep(3000);
                time = id("item_video_time").findOne().text();
                console.log("视频时长-->" + time);

            }

            sleep(1000);

            var b = id("video_start_image").findOne().bounds();
            click(b.centerX(), b.centerY());
            console.log("开始播放……");

            sleep(2000);
            while (1) {
                click(200, 400);
                sleep(1000);

                var ctime = id("video_currtime_tv").findOne().text();
                if (ctime != null) break;
                sleep(1000);
            }
            while (ctime < "03:02") {
                sleep(5000);
                click(200, 400);
                ctime = id("video_currtime_tv").findOne().text();
                console.log("当前进度：" + ctime);
            }

            console.log("播放完成");
            Home();
            sleep(2000);

        }




    });

});