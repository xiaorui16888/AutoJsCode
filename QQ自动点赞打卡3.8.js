auto();

threads.start(function() {
  //在子线程中调用observeKey()从而使按键事件处理在子线程执行
  events.observeKey();
  events.on("key_down", function(keyCode, events) {
    //音量键关闭脚本
    if (keyCode == keys.volume_up) {
      exit();
    }
  });
});

toast("音量上键关闭脚本");

events.on("exit", function() {
  toast("脚本已结束，由于软件问题，请手动关闭控制台");
});

//显示控制台
console.show();
setScreenMetrics(720, 1280)
console.setPosition(-22, 455)
sleep(100)
console.setSize(565, 800)
console.error("使用注意！")
console.verbose("安卓7.0以上或ROOT可用！否则群文件下载旧版")
console.verbose("QQ只能在消息，联系人，动态三个界面，或者未打开QQ。")
console.verbose("该脚本有五个地方跟屏幕分辨率有关，如果出现问题，请联系作者。。如果想要删除本提示，请编辑本文件，删掉1至10行即可。");
console.verbose("当出现‘今日免费赞数已达某个上限(LV某特权)，继续点赞送出不一样的赞’时。这是点赞附近的人过多导致的。如果重复出现过多，请停止该脚本吧。由于技术限制，需要手动点击取消，剩下的点赞则不需要")
console.verbose("更新日志：增加稳定性。修复bug。QQ群：261153229。QQ：3465344901")
//控制台完成，如果想删掉该提示，请把上面至这里删掉

toast("正在准备…");
launchApp("QQ");
sleep(200);

desc("帐户及设置").click();
sleep(1500)
click(250, 250)
sleep(4000)
click(665, 908)
sleep(4000)
console.info("当出现‘今日免费赞数已达某个上限(LV某特权)，继续点赞送出不一样的赞’时。这是点赞附近的人过多导致的。由于技术限制，需要手动点击取消，剩下的点赞则不需要。如果重复出现过多，请停止该脚本吧。或许添加他(她)为好友解决问题")
console.info("脚本未点赞所有人自动返回，是看见了‘暂无更多你点赞过的人’请手动滑动不要让它看见！")
var i = 10;

text("谁赞过我").findOne().parent().click();

var down = className("android.widget.AbsListView");

while (true) {

  for (var i = 0; i <= 10; i++) {
    desc("赞").find().click();

  }

  down.scrollForward();
  sleep(200);

  if (text("显示更多").exists()) {
    text("显示更多").findOne().parent().click();
  }
  if (text("暂无更多赞过你的人").exists()) {
    sleep(2000)
    back()
    sleep(1000)
    back()
    sleep(1000)
    back()
    console.hide()
    toast("已自动结束互赞脚本…");
    toast("正在进行打卡")
    //正在QQ打卡
    click(700, 650)
    sleep(500)
    desc("帐户及设置").click();
    sleep(500)
    click(105, 105)
    sleep(3000)
    //准备开始打卡
    className("android.widget.Button").desc("立即打卡 ").findOne().click()
    toast("如果你已经完成日签卡。晚安送歌无法完成打卡！")
    sleep(500)
    //开始晚上打卡
    scrollDown()
    className("android.widget.Button").desc("打卡送歌 ").findOne().click()
    sleep(1000)
    click(60, 100)
    sleep(2000)
    click(650, 650)
    toast("自动结束脚本")
    break;
  }
}