"auto";

launchApp("QQ");
className("android.widget.ImageView").desc("群资料卡").findOne().click()
className("android.widget.ImageView").desc("更多").findOne().click()
while(true){
    while(!click("退出群聊"));
    while(!click("退出"));
    sleep(300);
}