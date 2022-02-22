"auto"
//需要的软件有 OneVPN,E码客户端,有缘网,QQ,Auto.js
//仅供学习参考，请勿用于商业用途。请在下载后24小时内删除。
setScreenMetrics(1080, 2160);
while(true){
    sleep(3000)
launchApp("E码客户端")
className("android.widget.Button").text("快 速 登 录").findOne(2000).click();
sleep(2000);
//while(!click("获取号码"))
sleep(100);
if (className("android.widget.TextView").text("有缘网").findOne(2000)) {
    sleep(1000);
    click("获取号码");
}
sleep(2000);
click("复制号码")
launchApp("OneVPN")
sleep(1000)
while (true) {
    if (className("android.widget.TextView").text("连线中...").findOne()) {
        sleep(2000);
        toast("连线中...")
    
    if (className("android.widget.TextView").id("connection_status_label").  text("连线已中断")) {
       toast("连线已中断");
        id("toggleButton").clickable().findOne().click()
    

    if (className("android.widget.TextView").text("已连线").findOne()) {
        toast("成功")
        break
    }}}
}
var zchdym = "com.app.ui.activity.RegisterActivity"
var home = "com.app.ui.activity.LoginActivity"
launchApp("有缘网");
sleep(1000)
if (currentPackage() == "com.youyuan.yyhl") {
    //   toast("进入有缘网");
    sleep(500);
    while (!click("注册"));
    //sleep(1000);
    var kjid = "btn_women_layout"
    id(kjid).clickable().findOne().click()
    //sleep(500);
    var quedingid = "btn_register"
    id(quedingid).clickable().findOne().click()
}
while(true){
    
sleep(500)
setText(0, getClip());
sleep(500);
while (!click("获取验证码"));
sleep(500);
swipe(155,2159,155,1200,1);
sleep(509);
click("E码客户端")
sleep(15000);
if(click("【有缘网】")){
    sleep(500);
    click("取验证码")
    break;
    } else {
        click("获取号码");
        sleep(2000);
        click("复制号码");
        launchApp("有缘网");
    }
}
swipe(155,2159,155,1200,1);
sleep(500);
click("有缘网");
sleep(500);
setText(1, getClip());
while(!click("注册",0));
while(!click("立即上传"));
sleep(500);
openAppSetting(getPackageName("有缘网"));
while(!click("强行"));
while(!click("确定"));
launchApp("有缘网");
while(!click("我的",0));
while(!click("设置"));
while(!click("用户信息"));
    sleep(500);
while(!click("修改"));
sleep(500);
click(233,483)
sleep(500);
click(166,2055);
    sleep (200);
click(280,1550);
    sleep (209);
click(280,1745);
    sleep(100);
click(280,1872);
    sleep(100);
click(567,2046);
    sleep(100);
click(567,1727);
   sleep(100)
click(567,1928);
    sleep(500);
while(!click("确认保存"));
sleep(100)
var huoqu=className("android.widget.EditText").id("input_account").text()
getClip(huoqu)
swipe(155,2159,155,1200,1);
sleep(500);
click("QQ")
setClip(0,getClip);
while(!click ("发送"));
swipe(155,2159,155,1200,1);
    click("设置")
swipe(155,2159,155,1200,1);
sleep(500);
click("一键加速");
sleep(3000);}