auto.waitFor();

var name =app.getPackageName("微鲤看看")
if(name){
 toastLog("检测到手机里已安装该应用");
 sleep(1500);
 app.launchApp("微鲤看看")
 sleep(15000);
 toastLog("打开微鲤看看成功");

    function 循环() {
      swipe(366, 1134, 366, 600, 2000);
      sleep(4800);
      if (text("收下啦").exists()) {
        click("收下啦");
  
      } else
        sleep(500);
      click("我知道了");
      sleep(300);
    }

    function 签到前阅读(){
      sleep(300);
          click(450,400);
          sleep(600);
          toastLog("等待加载");
          sleep(4000);
          if (id("iv_coin").exists()) {
            toastLog("有奖励，可继续阅读");
            swipe(366, 1134, 366, 100, 2000);
            sleep(2000);
  
            click("展开查看全文");
            toastLog("已点击展开全文");
            sleep(1000);
            for (let i = 0; i < 10; i++) {
              循环();
            }
            sleep(1000);
            //toastLog("阅读完成，不评论，返回主页面");
            sleep(1000);
            click("知道了");
            back();
            sleep(2000);
            if (text("收下啦").exists()) {
              click("收下啦");
  
            } else
              sleep(500);
  
            swipe(350, 1200, 350, 400, 2000);
            sleep(2000);
  
  
          } else
            toastLog("没有奖励，返回主页面");
          back();
          sleep(2000);
          if (text("收下啦").exists()) {
            click("收下啦");
  
          } else
            sleep(500);
  
          swipe(350, 1200, 350, 400, 2000);
          sleep(2000);
  
    }
  
    function 微鲤看看签到() {
      //签到
    
      //签到前阅读一篇文章先
      sleep(2000);
    
      click(350, 340);
      sleep(600);
      toastLog("等待加载");
      sleep(4000);
      if (id("iv_coin").exists()) {
        toastLog("有奖励，可继续阅读");
        swipe(366, 1134, 366, 100, 2000);
        sleep(3000);
    
        click("展开查看全文");
        toastLog("已点击展开全文");
        sleep(1000);
        for (let i = 0; i < 10; i++) {
          swipe(366, 1134, 366, 600, 2000);
          sleep(3000);
        }
    
        sleep(1000);
        click("知道了");
        //toastLog("阅读完成，不评论，返回主页面");
        sleep(1000);
        back();
        sleep(2000);
        if (text("收下啦").exists()) {
          click("收下啦");
    
        } else
          sleep(500);
    
        swipe(350, 1200, 350, 400, 2000);
        sleep(2000);
    
    
      } else
        toastLog("没有奖励，返回主页面");
      back();
      sleep(2000);
      swipe(350, 1200, 350, 400, 2000);
      sleep(2000);
    
      sleep(2000);
      if (text("签到").exists()) {
        toastLog("今天还未签到")
        sleep(2500);
        sendButton = id("rl_head_line").findOne();
        sleep(3000);
        sendButton.click();
        sleep(6500);
        var sendButton = text("立即签到").findOne();
        sendButton.click();
        sleep(4000);
        toastLog("签到成功");
        sleep(3000);
        back();
        sleep(3000);
        if (text("+50").bounds(36, 110, 63, 129).exists()) {
          toastLog("有时段奖励可以领取");
          click(60, 88);
          sleep(2000);
          back();
          sleep(2000);
        } else
          toastLog("还没有时段奖励可以领取");
      } else
        toastLog("今天已签到，无需重复签到");
      sleep(2000);
    
    }
  
    function 阅读类型() {
  
      function 红包() {
        sleep(1000);
        if (text("领金币").exists()) {
          sleep(1000);
          click("领金币");
          toastLog("领取奖励");
          sleep(2000);
          click("知道了");
          back();
          sleep(1500);
  
        } else
          toastLog("界面没有发现金币红包");
  
      }
  
      function 时段奖励() {
        if (text("+50").bounds(36, 110, 63, 129).exists()) {
          toastLog("有奖励可以领取");
          click(60, 88);
          sleep(3000);
          back();
          sleep(3000);
        } else
          toastLog("还没有时段奖励可以领取");
  
      }
  
  
      var m = random(1, 3);
  
      switch (m) {
  
        case 1:
        签到前阅读();
          sleep(2000);
          时段奖励();
          sleep(200);
          红包();
          sleep(300);
  
          click(350,400);
          sleep(600);
          toastLog("等待加载");
          sleep(4000);
          if (id("iv_coin").exists()) {
            toastLog("有奖励，可继续阅读");
            swipe(366, 1134, 366, 100, 2000);
            sleep(3000);
  
            click("展开查看全文");
            toastLog("已点击展开全文");
            sleep(1000);
            for (let i = 0; i < 10; i++) {
              循环();
            }
  
            sleep(1000);
            click("知道了");
            //toastLog("阅读完成，不评论，返回主页面");
            sleep(1000);
            back();
            sleep(2000);
            if (text("收下啦").exists()) {
              click("收下啦");
  
            } else
              sleep(500);
  
            swipe(350, 1200, 350, 400, 2000);
            sleep(2000);
  
  
          } else
            toastLog("没有奖励，返回主页面");
          back();
          sleep(2000);
          swipe(350, 1200, 350, 400, 2000);
          sleep(2000);
  
          break;
  
  
        case 2:
        签到前阅读();
          sleep(2000);
          时段奖励();
          sleep(200);
          红包();
          sleep(300);
          click(360,430);
          sleep(600);
          toastLog("等待加载");
          sleep(4000);
          if (id("iv_coin").exists()) {
            toastLog("有奖励，可继续阅读");
            swipe(366, 1134, 366, 100, 2000);
            sleep(2000);
  
            click("展开查看全文");
            toastLog("已点击展开全文");
            sleep(1000);
            for (let i = 0; i < 10; i++) {
              循环();
            }
            sleep(1000);
  
            sleep(1000);
            toastLog("返回主页面");
            sleep(1000);
            click("知道了");
            back();
            sleep(2000);
            if (text("收下啦").exists()) {
              click("收下啦");
  
            } else
              sleep(500);
  
            swipe(350, 1200, 350, 400, 2000);
            sleep(2000);
  
  
          } else
            toastLog("没有奖励，返回主页面");
          back();
          sleep(2000);
          swipe(350, 1200, 350, 400, 2000);
          sleep(2000);
  
  
          break;
  
  
  
  
        case 3:
        签到前阅读();
          sleep(2000);
          时段奖励();
          sleep(200);
          红包();
          sleep(300);
          click(450,400);
          sleep(600);
          toastLog("等待加载");
          sleep(4000);
          if (id("iv_coin").exists()) {
            toastLog("有奖励，可继续阅读");
            swipe(366, 1134, 366, 100, 2000);
            sleep(2000);
  
            click("展开查看全文");
            toastLog("已点击展开全文");
            sleep(1000);
            for (let i = 0; i < 10; i++) {
              循环();
            }
            sleep(1000);
            //toastLog("阅读完成，不评论，返回主页面");
            sleep(1000);
            click("知道了");
            back();
            sleep(2000);
            if (text("收下啦").exists()) {
              click("收下啦");
  
            } else
              sleep(500);
  
            swipe(350, 1200, 350, 400, 2000);
            sleep(2000);
  
  
          } else
            toastLog("没有奖励，返回主页面");
          back();
          sleep(2000);
          if (text("收下啦").exists()) {
            click("收下啦");
  
          } else
            sleep(500);
  
          swipe(350, 1200, 350, 400, 2000);
          sleep(2000);
  
  
          break;
  
      }
  
    }
  
  
    for (let i = 0; i < 5; i++) {
      阅读类型();
  
    }
  
  
    sleep(2000);
    click("热点");
    sleep(2000);
    toastLog("开始阅读热点新闻");
    sleep(1000);
  
    for (let i = 0; i < 5; i++) {
      阅读类型();
  
    }
  
  
  
    click("情感");
    sleep(2000);
    toastLog("开始阅读热点新闻");
    sleep(1000);
  
    for (let i = 0; i < 5; i++) {
      阅读类型();
  
    }
  
   }
 else
 {
     toastLog("该应用不存在或者未安装该应用");
     }

  