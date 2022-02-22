/**
 * 可以运行在 具有读取短信权限的 免费版autojs
 * 可以运行在 autojsPro版的7.0.4-0 以下的版本
 * 权限: <uses-permission android:name="android.permission.RECEIVE_SMS" />
 */
importPackage(android.content);
importClass(android.telephony.SmsMessage);

var filter=new IntentFilter();

filter.addAction("android.provider.Telephony.SMS_RECEIVED");

var receiver = new JavaAdapter(android.content.BroadcastReceiver, {
  onReceive : function(context, intent) {
    var sender = null;
    var bundle = intent.getExtras();
    var format = intent.getStringExtra("format");

    if (bundle != null) {
        var pdus = bundle.get("pdus");
        for (object in pdus) {
          var message=SmsMessage.createFromPdu(pdus[object],format);
          sender = message.getOriginatingAddress();
          messageBody = (message.getMessageBody());
          log("发信人: " + replacepos(sender, 6, 9, "****"));
          log("短信内容: " + messageBody);
        }
    }
  }
});

context.registerReceiver(receiver,filter);

setInterval(()=>{},1000);

//为什么不生效??? WHF
events.on("eixt", function () {
  context.unregisterReceiver(receiver);
})

function replacepos(text,start,stop,replacetext) {
  mystr = text.substring(0,start)+replacetext+text.substring(stop+1);
  return mystr;
}