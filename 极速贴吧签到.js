"auto";
//贴吧签到改进版
sleep(200)
//console.show();
log("开始");
sleep(500);
setScreenMetrics(1080, 1920);
launchApp("百度贴吧");
sleep(200);
yyzt();
//splitScreen()
var l = 0;
while (l < 10) {
  if (text("进吧").exists()) {
    log("进吧");
    click("进吧")
    l = 20;
  } else {
    back();
    sleep(500);
  };
  l++;
};

yjqd = 0
for (i = 0; i < 20; i++) {
  if (yjqd == 0) {
    click("签到", 0)
    sleep(500)
    if (text("一键签到").exists()) {
      log("一键签到")
      click(468, 439)
      if (text("签到完成").exists() || text("无法签到").exists()) {
        log("签到完成")
        back()
        yjqd = 1
        i = 100
        sleep(500)
      } else {
        sleep(1000)
      }
      if (text("零点到一点为签到高峰期，一键签到失败机率较大，请错开高峰期再来签到！").exists()) {
        log("一键签到失败")
          back();
          i=100;
      }
    }
  }
  sleep(500)
}

var j = 0;
while (j < 20) {
  yyzt();
  toast("正在签到请稍等！！！");
  jb = id("name").find()
  log(jb.size())
  jb.each(function(o) {
    yyzt();
    log("28" + o.text());
    if (text(o.text()).exists()) {
      if (o.parent().childCount() != 3) {
        a = 0
        var c = textContains(o.text()).find();
        c.each(function(p) {
          log(p.text());
          if (p.text() == o.text()) {
            click(o.text(), a);
            log("个数" + a);
          };
          a++;
        });
        // click(o.text());
        sleep(300);
        var i = 0;
        while (i < 10) {
          if (text("签到").exists()) {
            log("点击签到");
            click("签到")
            sleep(500);
            i = i + 4;
            if (i > 8) {
              toast("点了签到但没反应");
            };
          } else if (textStartsWith("漏签").exists()) {
            log("已经签到");
            i = 20;
          } else if (textStartsWith("抱歉，根据相关法律法规和").exists()) {
            log("本吧不开放");
            i = 500;
          } else if (descContains("连续签到").exists()) {
            log("连续签到");
            i = 500;
          } else {
            sleep(500);
            i++
          }
        }
        back()
        sleep(300);
      } else {
        log("签到了")
      };
    };
    var k = 0;
    while (k < 10) {
      if (text("进吧").exists()) {
        log("进吧");
        click("进吧")
        k = 20;
      } else {
        back();
        sleep(500);
      };
      k++;
    };
  });
  if (textContains("探索更多有趣的吧").exists()) {
    log("签到完了");
    j = 500;
    toast("签到完了");

    sleep(2000)
    var result = shell("am force-stop com.baidu.tieba", true);

  }
  swipe(501, 1720, 503, 330, 500);
  sleep(500);
  j++
}
log("结束");

function yyzt() {
  while (!packageName("com.baidu.tieba").exists()) {
    log("函数应用不在前台");
    launchApp("百度贴吧");
    sleep(200);
  }
  var k = 0;
  while (k < 10) {
    if (text("进吧").exists()) {
      log("进吧状态");
      click("进吧")
      k = 20;
    } else {
      back();
      sleep(500);
    };
    k++;
  };
}