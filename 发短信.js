importClass(android.telephony.gsm.SmsManager);
//轮子地址
//https://blog.csdn.net/BianHuanShiZhe/article/details/73432324
var content ="测试";//短信内容

var phone = "10010";//电话号码

var sm = SmsManager.getDefault();

var sms = sm.divideMessage(content);

//发短信
sm.sendTextMessage(phone,null,sms,null,null);

/*
List<String> sms = sm.divideMessage(content);

for (var smslist :sms){


    sm.sendTextMessage(phone,null,sms,null,null);
}
*/