setInterval(function gongneng() {
    launchApp("快手");
    sleep(1500)
    text('同城').waitFor();
    while (!click("同城"));
    var _id = id("live_mark").visibleToUser(true).findOne().parent();
    _id.click();
    sleep(4000);
    //var b = id("live_close").findOne();
    var n = id("timer_view").findOne(4000);
    if (n != null) {
        id("background_view_normal").findOne().click();
        text("4分钟后").waitFor();
        var t = setInterval(function() {
        id("live_red_packet_pre_snatch_state_view").findOne(20).click();
		sleep(150);
        if (textContains("手慢了，红包派完了").findOne(1) != null) {
             clearInterval(t);
			 openAppSetting(getPackageName("快手"));
             text("强行停止").findOne().click();
             text("确定").findOne().click();
             sleep(2000);
                                                                      }
		else if(textContains("直播已结束").findOne(1) != null){
			 clearInterval(t);
			 openAppSetting(getPackageName("快手"));
             text("强行停止").findOne().click();
             text("确定").findOne().click();
             sleep(2000);
			                                                     }
                                          }, 500);

                  }else{
        //否则提示没有找到
        toast("没有红包，我走了");
        sleep(1200);
        openAppSetting(getPackageName("快手"));
        text("强行停止").findOne().click();
        text("确定").findOne().click();
        sleep(2000);
    }

}, 5000);