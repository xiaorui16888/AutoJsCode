"auto";
while(true)
{
if(currentActivity()=="com.tencent.mm.ui.LauncherUI")
{
while(!click(0,1262,1080,1418));

desc("更多").click();

click("删除");

click("删除");
sleep(1000);
className("ImageView").id("gw").desc("返回").untilFind().click();
back();


sleep(1000);
}
} 
//微信自动删好友，全自动