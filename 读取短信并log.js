StringBuilder = java.lang.StringBuilder;
Uri = android.net.Uri;
ArrayList = java.util.ArrayList;
List = java.util.List;
Context = android.content.Context;
SimpleDateFormat=java.text.SimpleDateFormat;
Date=java.util.Date;
Long=java.lang.Long;


var MessageInfo;
var list;


console.show();
//log(context.getContentResolver());
var a;
ab=getSmsInPhone()+"";
//ab=ab.substr(0,ab.length-1);
//eval("var a="+ab);
//log(ab);






function getSmsInPhone() {
  var SMS_URI_ALL = "content://sms/";
  var SMS_URI_INBOX = "content://sms/inbox";
  var SMS_URI_SEND = "content://sms/sent";
  var SMS_URI_DRAFT = "content://sms/draft";

  var smsBuilder = new StringBuilder();

  try {
    var cr = context.getContentResolver();
    var projection = [
      "_id",
      "address",
      "person",
      "body",
      "date",
      "type"
    ];
    var uri = Uri.parse(SMS_URI_ALL);
    var cur = cr.query(uri, projection, null, null, "date desc");

    if (cur.moveToFirst()) {
      var name;
      var phoneNumber;
      var smsbody;
      var date;
      var type;

      var nameColumn = cur.getColumnIndex("person");
      var phoneNumberColumn = cur.getColumnIndex("address");
      var smsbodyColumn = cur.getColumnIndex("body");
      var dateColumn = cur.getColumnIndex("date");
      var typeColumn = cur.getColumnIndex("type");

      do {
        name = cur.getString(nameColumn);
        phoneNumber = cur.getString(phoneNumberColumn);
        smsbody = cur.getString(smsbodyColumn);

       var dateFormat = new SimpleDateFormat(
          "yyyy-MM-dd hh:mm:ss");
        var d = new java.util.Date(Long.parseLong(cur.getString(dateColumn)));
        var date= dateFormat.format(d);

        var typeId = cur.getInt(typeColumn);
        if (typeId == 1) {
          type = "接收";
        } else if (typeId == 2) {
          type = "发送";
        } else {
          type = "发送失败";
        }

        smsBuilder.append("[");
        smsBuilder.append(name + ",");
        smsBuilder.append(phoneNumber + ",");
        smsBuilder.append(smsbody + ",");
          console.info(type+" "+phoneNumber+"");
          log(smsbody);
             console.warn( date+"\n\n");
        smsBuilder.append(date + ",");
        smsBuilder.append(type);
          
        smsBuilder.append("]");

        if (smsbody == null) smsbody = "";
      } while (cur.moveToNext());
    } else {
      smsBuilder.append("no result!");
    }

    smsBuilder.append("getSmsInPhone has executed!");
  } catch (e) {
    log("SQLiteException in getSmsInPhone"+e);
  }
  return smsBuilder;
}