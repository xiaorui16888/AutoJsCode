var dc = text("动态").desc("返回动态 按钮").id("ivTitleBtnLeft");
//开始
app.launchPackage("com.tencent.mobileqq");
toast("请打开空间")
waitForActivity("cooperation.qzone.QzoneFeedsPluginProxyActivity", [period = 200]);
if (dc.exists() == true) {
toast("当前页面为空间页面，即将开始点赞")
}

threads.start(function() {
//在新线程执行的代码
while (true) {
if (className("android.widget.ImageView").id("name").depth("4").drawingOrder("1").exists()) {
className("android.widget.ImageView").id("name").depth("4").drawingOrder("1").click();
}
sleep(1000);
swipe(500,1500,500,500,1500);
sleep(1000);
}
});