auto.waitFor()
launchApp("QQ")
//先把要拉的人拉进一个群，并顶置该群
for (i = 0; i < 4/*一个时段只能建4个*/; i++) {
    waitForActivity("com.tencent.mobileqq.activity.SplashActivity")
    className("ImageView").click()
    text("创建群聊").findOne().parent().click()
    text("从群聊中选择").click()
    waitForActivity("com.tencent.mobileqq.activity.selectmember.SelectMemberActivity")
    className("AbsListView").findOne().child(1).click()
    className("CheckBox").waitFor()
    className("FrameLayout").untilFind().click()
    textContains("立即创建\(").click()
    textContains("已选择").findOne().parent().click()
    id("input").waitFor()
    sleep(1200)
    if (textContains("取个名字").exists()) {
        id("rlCommenTitle").findOne().child(0).click()
    }
}