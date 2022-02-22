

importClass(android.content.ContentUris);
importClass(android.icu.util.Calendar);
importClass(android.provider.CalendarContract);
importClass(android.provider.CalendarContract.Calendars);
importClass(android.os.Debug.InstructionCount);
importClass(android.net.Uri);
importClass(android.database.Cursor);
importClass(android.content.ContentValues);

//轮子地址
//http://blog.csdn.net/zhaoshuyu111/article/details/53195142?ref=myread

toast('日历添加提醒')

runtime.requestPermissions([
    "read_calendar",
    "write_calendar"
]);

var titlePath = files.join(files.getSdcardPath(), '脚本/title.js')
var descriptionPath = files.join(files.getSdcardPath(), '脚本/description.js')

for (var i = 0; i < 10; i++) {
    添加日历提醒()
}

function 添加日历提醒() {

    var title = 'this is title'
    var description = 'this is description'
    var CALANDER_EVENT_URL = "content://com.android.calendar/events";
    var CALANDER_REMIDER_URL = "content://com.android.calendar/reminders";
    //url
    var CALANDER_URL = "content://com.android.calendar/calendars/";
    //查询现有账号
    var userCursor = context.getContentResolver().query(Uri.parse(CALANDER_URL), null, null, null, null);
    userCursor.moveToFirst();
    //取id
    var calid = userCursor.getInt(userCursor.getColumnIndex(CalendarContract.Calendars._ID));
    var event = new ContentValues();
    event.put("title", title);
    event.put("description", description);
    // 插入账户的id
    event.put("calendar_id", calid.toString());

    var mCalendar = Calendar.getInstance();
    //mCalendar.setTimeInMillis(reminderTime);//设置开始时间
    var start = mCalendar.getTime().getTime();
    mCalendar.setTimeInMillis(start + (random(1, 200)) * 60 * 1000);//设置终止时间
    var end = mCalendar.getTime().getTime();
    event.put(CalendarContract.Events.DTSTART, start.toString());
    event.put(CalendarContract.Events.DTEND, end.toString());
    event.put(CalendarContract.Events.HAS_ALARM, "1"); //设置有闹钟提醒

    event.put(CalendarContract.Events.EVENT_TIMEZONE, "Asia/Shanghai"); //这个是时区，必须有，
    //添加事件
    //context.getContentResolver().insert(Uri.parse(CALANDER_EVENT_URL), event);
    var newEvent = context.getContentResolver().insert(Uri.parse(CALANDER_EVENT_URL), event);


    var values = new ContentValues();
    values.put(CalendarContract.Reminders.EVENT_ID, ContentUris.parseId(newEvent).toString());
    // 提前10分钟有提醒
    values.put(CalendarContract.Reminders.MINUTES, (random(1, 200)).toString());
    values.put(CalendarContract.Reminders.METHOD, CalendarContract.Reminders.METHOD_ALERT.toString());

    var uri = context.getContentResolver().insert(Uri.parse(CALANDER_REMIDER_URL), values);
    //当他为空时代表未写入成功
    log(uri)

}



