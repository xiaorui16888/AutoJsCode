importClass(android.content.ContentResolver);
importClass(android.database.Cursor);
importClass(android.net.Uri);

//uri
var smsUri = "content://sms/inbox";
function xxxx( body ,date){
var cursor=context.getContentResolver().query(Uri.parse(smsUri), ["body"], "body like ? and date > ?",
["%"+body+"%",date], "date desc");
if (cursor != null) {
while(cursor.moveToNext()){
var sms_content = cursor.getString(cursor.getColumnIndex("body")); 
console.log("joe "+ sms_content);

}
}
}

xxxx("移动",0);