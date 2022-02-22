//获取顶部通知，如果是微信红包，则进行跳转，需要给auto.js可以获取通知的权限
//author 7-81
//date 2017/1/2
//version 1.0

auto();
events.observeNotification();
events.onNotification(function(notification){
    printNotification(notification);
});
toast("监听中，请在日志中查看记录的通知及其内容");
console.show();
function printNotification(n){
    log("收到新通知:\n 标题: %s, 内容: %s, \n包名: %s", n.getTitle(), n.getText(), n.getPackageName());
    if(n.getText()&&n.getPackageName()){
        if(n.getText().match("\\[微信红包\\]")&&n.getPackageName().match("com.tencent.mm"))
        n.click();
    }
    
}