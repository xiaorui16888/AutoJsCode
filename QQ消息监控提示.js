"auto";
console.show();
var k = "";
var l = "";
var kk = "未刷新";
var kk1 = "未刷新";
var stop_vib = false;
launchApp("QQ");
threads.start(function() {
  while (true) {
    toast("监听中，误动！");
    sleep(5000);
  }
});
console.show();
var n = console.rawInput("如果已经进入到监测的群组里，在这里随意输入一些内容,点击确认!");
var way_name = rawInput("请输入提示方式:振动或铃声，默认铃声的提示方式", "铃声");
console.hide();
var name_task = rawInput("键入您想监听的QQ发言人的昵称，输入完成后，程序界面不要来回切换！", "Jason");

while (!text("发送").exists());
console.show();
while (1) {
  lcl1 = text(name_task).find();
  if (lcl1.length == 0) {
    sleep(2000);
    log("get!");
    continue;

  }
  //console.log(lcl1[lcl1.length - 1].parent().parent());
  if (lcl1[lcl1.length - 1].parent().childCount() == 4) {
    //log("A" + lcl1[lcl1.length - 1].parent());
    //log(lcl1[lcl1.length - 1].parent().chidlCount());
    kk1 = lcl1[lcl1.length - 1].parent().child(3).text();
  } else {
    //log("B" + lcl1[lcl1.length - 1].parent().parent());
    //log(lcl1[lcl1.length - 1].parent().parent().childCount());
    if (lcl1[lcl1.length - 1].parent().parent().childCount() == 4)
      kk1 = lcl1[lcl1.length - 1].parent().parent().child(3).text();
    if (lcl1[lcl1.length - 1].parent().parent().childCount() == 5)
      kk1 = lcl1[lcl1.length - 1].parent().parent().child(4).text();

  }
  sleep(1500);
  console.log(kk1);
  k = kk1;
  while (1) {
    lcl = text(name_task).find();
    //qqw = lcl[lcl.length - 1];
    // console.log(qqw);
    if (lcl.length > 0)
      if (lcl[lcl.length - 1].parent().childCount() == 4)
        kk = lcl[lcl.length - 1].parent().child(3).text();
      else {
        if (lcl[lcl.length - 1].parent().parent().childCount() == 4)
          kk = lcl[lcl.length - 1].parent().parent().child(3).text();
        if (lcl[lcl.length - 1].parent().parent().childCount() == 5)
          kk = lcl[lcl.length - 1].parent().parent().child(4).text();



      }
    sleep(1500);
    console.log(kk);
    l = kk;
    if (l != k) {
      log("有新消息");
      switch (way_name) {
        case "铃声":
          {
            lxz_music();
            break;
          }
        case "振动":
          {
            threads.start(function() {
              while (true) {
                if (stop_vib) {
                  stop_vib = false;
                  break;
                }
                device.vibrate(500);
                sleep(1500);
              }
            });
            alert("是否停止振动？");
            stop_vib = true;
            break;
          }
      }

      break;
    }
  }
}

function lxz_music() {
  importClass(android.media.MediaPlayer);
  var player = new MediaPlayer();
  //player.setDataSource("/sdcard/1.mp3");
  player.setDataSource(files.path("./1.mp3"));
  player.setVolume(100, 100);
  player.prepare();
  player.start();
  alert("jason说话了！!!请谨慎操作！！是否关闭音乐提示？");
  player.stop();
  player.release();
}