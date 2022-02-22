"auto"
sleep(2000)
if (!device.isScreenOn()) {
    device.wakeUp()
    swipe(500, 1500, 500, 500, 1000);
    sleep(2000)
    click("9", 0)
    click("8", 0)
    click("7", 0)
    click("6", 0)
}
sleep(1000)
app.launchPackage("com.alibaba.android.rimet")
sleep(2000)
//waitForActivity("com.alibaba.android.rimet.biz.SplashActivity", [period = 200])
desc("工作").findOne().click()
var list = text("考勤打卡").find()
if (!list.empty()) {
    list[list.length - 1].parent().parent().click()
}
sleep(2000)
back()
sleep(500)
back()
//click("下班打卡",0)