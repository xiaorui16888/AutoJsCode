
app.startActivity({
    packageName: "com.android.settings",
    className: "com.android.settings.Settings$DevelopmentSettingsActivity"
});
id("list").scrollForward()//可能需优化
id("list").scrollForward()
id("list").scrollForward()
id("list").scrollForward()
text("指针位置").findOne().parent().click()
back()
toast("已打开")