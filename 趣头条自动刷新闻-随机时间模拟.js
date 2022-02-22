app.launchPackage("com.jifen.qukan")
waitForActivity("com.jifen.qkbase.view.activity.MainActivity")
for (let c = 0; c < 3; c++) {
    var list = id("mo").findOne();
    var count = list.childCount()
    toast(count + "")
   click("忽略");
    //text("忽略").findOne().parent().parent().click();
    for (let i = 0; i < count; i++) {
        sleep(2000)
        click("忽略");
        try {
            list.child(i).click();
        } catch (e) {
            back()
            sleep(2000)
            list.scrollForward();
            sleep(Math.random() * 3000)
            swipe(0, 1000, 0, 500, Math.random() * 1000)
            break
        }
        sleep(1000)
        toast(currentActivity())
        if (currentActivity() != "com.jifen.qukan.content.view.activity.NewsDetailActivity") {
            back()
            sleep(2000)
            list.scrollForward();
            sleep(Math.random() * 3000)
            swipe(0, 1000, 0, 500, Math.random() * 1000)
            break
        }
        //waitForActivity("com.jifen.qukan.content.view.activity.NewsDetailActivity")
        var swipeCount = Math.random() * 15 + 5
        for (let x = 0; x < swipeCount; x++) {
            swipe(0, 1000, 0, 500, Math.random() * 3000)
            sleep(Math.random() * 5000)
        }
        sleep(2000)
        back()
        sleep(Math.random() * 5000)
    }
    //scrollDown()
    list.scrollForward();
    sleep(Math.random() * 3000)
    swipe(0, 1000, 0, 500, Math.random() * 1000)
}