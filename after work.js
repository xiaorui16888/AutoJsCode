"auto.waitfor()";
//var w=device.width;
//log(w);
//var h= device.height;
//log(h);
device.wakeUp();
swipe(700,2550,700,1500,900);
var myapp=app.getPackageName("钉钉")
var isopen=false;
while(!isopen){
   isopen=app.launchPackage(myapp);
   if(isopen){
        toast("钉钉启动了");
        break;
        }
  }
var mpath="/storage/0698-5B87/music/刘珂矣-风筝误.flac"
media.playMusic(mpath);
sleep(1500);
while(idContains("btn_next").text("登录").exists())
  {
  idContains("et_pwd").findOne().setText("123456");  
  //text("请输入密码").findOne().setText("123456");
  sleep(1000);
  idContains("btn_next").text("登录").findOne().click();
  sleep(5000);
  var iswork=idContains("work").desc("工作").exists();
  if(iswork){
      break;
      }
   }
//setScreenMetricsscreen(1440,2408);
idContains("work").desc("工作").findOne().click();
//click(750,2300);
sleep(3000);
desc("考勤打卡").findOne().click();
//click(200,1380);
sleep(10000);
while(!descContains("好好休息").exists){
    desc("下班打卡").findOne().click();
    sleep(2000);
    if(descContains("好好休息").exists){   
       toast("打卡成功｡◕‿◕｡");
       break;
       }
    }




//click(720,1540);
