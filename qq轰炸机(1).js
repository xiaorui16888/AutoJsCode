"auto";
launchApp("QQ");
toast("打开聊天界面( ͡° ͜ʖ ͡°)✧");

var h = "com.tencent.mobileqq.activity.SplashActivity";
waitForActivity(h);

while(true){
setText("。。。");
sleep(100);
text("发送").click();
}