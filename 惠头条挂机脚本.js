"auto"
launchApp("惠头条")
//跳过广告暂时不写
waitForActivity("com.cashtoutiao.account.ui.main.MainTabActivity", period = 200)
className("android.widget.TextView").text("热点").findOne().parent().parent().click()
while(true)
{
A()

}



function A(){
setScreenMetrics(1080,1920);
//刷新一次
Swipe(600,450, 600, 1000, 1000)
//点击广告
sleep(2000)
click(0,344,1080,636)
waitForActivity("com.cashtoutiao.news.ui.NewsDetailActivity", period = 200)
sleep(1000)
toast("开始挂机")
        for(var a=0;a<49;a++)
        {
        sleep(2000)
        Swipe(600, 1400, 600, 900, 400)
        }
        //返回
        sleep(2000)
        className("android.widget.TextView").id("iv_back").text("返回").findOne().click()
        sleep(500)
        }







