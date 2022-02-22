
importClass(android.content.ContentValues);
importClass(android.provider.CallLog.Calls);

runtime.requestPermissions(["read_contacts", "write_contacts","read_call_log","write_call_log"]);

toast('insertCall  start')

var mContext=context
var name='aabb'
var number='13812345678'
insertCall(mContext, name, number)

toast('insertCall  end')

function insertCall(mContext, name, number) {
  values = new ContentValues();
  values.put("name", name);
  values.put("number", number);
  values.put("type", java.lang.Integer.valueOf(1));
  values.put("date", java.lang.Long.valueOf(36));
  values.put(
    "duration",
    java.lang.Integer.valueOf(30)
  );
  values.put("new", "0");
  mContext.getContentResolver().insert(android.provider.CallLog.Calls.CONTENT_URI, values);
}
