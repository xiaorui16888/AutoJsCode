"auto";
while(true)
{
if(currentActivity()=="com.yxcorp.gifshow.users.UserListActivity")
{
className("android.widget.LinearLayout").id("follower_layout").findOne().click()

className("android.widget.ToggleButton").id("follow_button").findOne().click();


click("停止关注")
className("ImageButton").id("left_btn").findOne().click();

sleep(500);
}
}
//快手批量取消关注，自行打开关注页，已测试，秒取关;
//本代码需要下载auto软件运行