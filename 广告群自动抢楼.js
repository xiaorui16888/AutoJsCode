"auto"
//再指定群界面挂机(检测关键词自动发送广告)
//日入百群，只需2-5元
//利用红包插件一天回本
var a="自行输入广告词"


while(true)
{
sleep(1000)
if(currentActivity()=="com.tencent.mobileqq.activity.SplashActivity")
{
if(text("楼下").exists())
{
//抢占机会
setText("1⃣"+"\n"+"🇨🇳占领🇨🇳"+"🇨🇳占领🇨🇳")
click("发送")
//发送广告内容
setText(a)
className("android.widget.ImageView").drawingOrder(2).longClickable(false).findOne().click()
className("android.widget.CheckBox").findOne().click()
className("android.widget.ImageView").drawingOrder(2).longClickable(false).findOne().click()
click("发送")
setText("有请下面大佬发言")
click("发送")
}

}

}