
console.show();

jsxx();//接收其他脚本消息服务开启

fsxx("你好喽");//向其他脚本发送字符串

while(true){sleep(1000);}//循环等待，不结束脚本
//默认可以接受 炫酷流量网速悬浮窗.apk 的消息
//可以运行此脚本后运行 炫酷流量网速悬浮窗.apk







function jsxx() { //其他脚本消息接收服务模块
    BroadcastReceiver = android.content.BroadcastReceiver;
    IntentFilter = android.content.IntentFilter;
    var MsgReceiver;
    var receive_show;
    MsgReceiver = new BroadcastReceiver() {
        onReceive(context, intent) {
            string = intent.getStringExtra(receive_show);
            log(string+"");
        }
    }
    intentFilter = new IntentFilter();
    intentFilter.addAction("ghhghhhggggstijb");
    context.registerReceiver(MsgReceiver, intentFilter);
    log("等待消息");
}

function fsxx(str){//给其他脚本发送消息代码模块
Intent=android.content.Intent;
intent_Receiver = new Intent("ghhghhhggggstijb");
intent_Receiver.putExtra(this.receive_show, str);
context.sendBroadcast(intent_Receiver);
}





