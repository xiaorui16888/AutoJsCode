/**
 * QQ消息悬浮显示
 * 确保手机QQ开启了“通知”和“显示通知内容预览”
 * 确保QQ只有一个联系人说话（最好是使用只有一个群的QQ）
 */
console.show();
events.observeNotification();
events.on("notification", function (n) {
    if (n.getPackageName() == "com.tencent.mobileqq") {
        log("%s", n.getText());
    }

});