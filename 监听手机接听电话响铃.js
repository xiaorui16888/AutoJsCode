importClass(android.telephony.TelephonyManager)
importPackage(android.content);
var telmanager = context.getSystemService(Context.TELEPHONY_SERVICE);
log(telmanager.getCallState())

 /*
    * 电话状态：
    * 1.tm.CALL_STATE_IDLE=0          无活动
    * 2.tm.CALL_STATE_RINGING=1  响铃
    * 3.tm.CALL_STATE_OFFHOOK=2  摘机
    */