stopApp(getPackageName("拼多多"));

function stopApp(pkg) {
    openAppSetting(pkg);
    sleep(200);
    packageName("com.android.settings").id("right_button").findOne().click();
    packageName("com.android.settings").id("positive").findOne().parent().click();
    sleep(200);
    back();
}