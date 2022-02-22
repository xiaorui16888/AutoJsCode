"ui";
ui.layout(
    <vertical gravity="center">
        <text textSize="24sp" gravity="top|center" text="广播接收发射器"/>
        <text marginTop="12sp" textSize="20sp" text="编辑发送内容"/>
        <input id="extra" hint="请输入发送的广播内容"/>
        <button id="registered" text="注册广播"/>
        <button id="send" text="发送广播"/>
        <button id="receive" text="接收广播"/>
        <button id="destroy" text="销毁广播"/>
    </vertical>
);
importClass(android.content.ContextWrapper);
importClass(android.content.BroadcastReceiver);
importClass(android.content.IntentFilter);

//-<>无名小姐:1352183717<---<<>>//
/**
*这是一个简单的广播动态注册发送的例子
*其实在广播注册那一步已经做好了接收准备了
*(相当于一个监听器吧)
*我为了更直观一些把它分解开来了
*后面才打印出来方便观察
*可能有bug,毕竟健壮性不是很强
*----页面将就吧-----
*/

var test, clear;
var is = true;

ui.send.click(function() {
    var get = ui.extra.text();
    if (!is) {
        if (get != "") {
            var intent = new Intent();
            intent.setAction("BroadcastReceiver")
            intent.putExtra("information", get + "");
            context.sendBroadcast(intent);
            toastLog("发送成功");
            is = false;
        } else {
            toastLog("请输入要发送的信息");
        }
    } else {
        toastLog("请先注册广播")
    }
});

ui.registered.click(function() {
    var filter = new IntentFilter();
    filter.addAction("BroadcastReceiver");
    new ContextWrapper(context).registerReceiver(clear = new BroadcastReceiver({
        onReceive: function(context, intent) {
            test = intent.getStringExtra("information");
        }
    }), filter);
    toastLog("注册广播成功")
    is = false;
});

ui.receive.click(function() {
    toastLog("广播接收到内容:" + test);
});

ui.destroy.click(function() {
    if (clear != null) {
        new ContextWrapper(context).unregisterReceiver(clear);
    }
    clear = null;
    test = undefined;
    toastLog("已注销广播")
});

events.on("exit", function() {
    if (clear != null) {
        new ContextWrapper(context).unregisterReceiver(clear);
    }
    clear = null;
    log("结束运行");
});