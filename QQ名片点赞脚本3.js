"auto";

function 下滑() {
  className("AbsListView").scrollable().scrollForward();
}

function 赞() {
  className("ImageView").desc("赞").click();
}


function 取消金豆() {
  while (true) {
    if (currentActivity() == "com.tencent.mobileqq.activity.VisitorsActivity") {
      click("取消");
      click("显示更多");
    }
  }
}
unlock();
toast("开始点赞");
threads.start(取消金豆);
解锁();
sleep(1000);
点赞页面();
n = 0;
while(n++!=8){//8线程
    threads.start(赞);
}
while (notStopped()) {
  for (let i = 0; i < 15; i++) {
    赞();
  }
  下滑();
  if (click("暂无更多赞过你的人")) {
    sleep(3000);
      toast("脚本已停止");
    exit();
  }
}


function 点赞页面(){
    
    waitForPackage("com.tencent.mobileqq");
while(!id("conversation_head").exists()){
    back();
sleep(350);
}
    if(!id("nickname").exists())
click(79,126);
    sleep(100);
id("nickname").findOne().click();
click(331,397);
id("ivTitleBtnRightImage").findOne();
click (1014,547); 
    }

function 解锁(){
       /* app.startActivity({
			action:"android.intent.action.VIEW",
			data:"mqqapi://card/show_pslcard?&uin="+qq
		});*/
    launchApp("QQ");
sleep(500);
if(id("lockPattern").exists())
gesture(1000,[826,984],[530,1311],[812,1630],[815,1300],[526,1660]);
    }

unlock();
function unlock() {
  device.wakeUp();
  if (id("com.android.keyguard:id/camera_shortcut_id").exists()) {
    sleep(500);
    swipe(530, 1300, 530, 300, 50);
    sleep(500);
    click(860, 1700);
    sleep(150);
    click(860, 1150);
    sleep(150);
    click(220, 1150);
    sleep(150);
    click(860, 940);
    sleep(150);
    click(220, 940);
    device.wakeUp();
  }
}
