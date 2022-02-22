importClass(android.net.Uri);
importClass(android.database.Cursor);
importClass(android.content.ContentResolver);

var SMS_INBOX = Uri.parse( "content://sms/" );
var cr = context.getApplicationContext().getContentResolver();
var projection=new Array("_id" ,  "address" ,  "person" , "body" ,  "date" ,  "type" );
var cur = cr.query(SMS_INBOX, projection,  null ,  null ,  "date desc" );
var i=0;
while (cur.moveToNext()) {
    i=i+1;
    var number = cur.getString(cur.getColumnIndex("address"));//手机号 
    var name = cur.getString(cur.getColumnIndex("person"));//联系人姓名列表 
    var body = cur.getString(cur.getColumnIndex("body"));//短信内容
    toastLog(number);
    toastLog(name);
    toastLog(body);
    if(i>10){break;}
}
