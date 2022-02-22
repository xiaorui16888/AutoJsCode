//By 酷安@群主让我注册 
//By张达
//代码与版权注释是一对好基友，请您不要狠心拆散他们
const date = new Date();
const info = "最新版本是" + (date.getMonth() + 1) + "月" + date.getDate() + "日"
const notify = new android.app.Notification.Builder(runtime.getApplicationContext())
    .setContentInfo(info)
    .setContentTitle("有新的版本了")
    .setContentText("请及时更新脚本")
    .setTicker("脚本有新的版本了")
    .setSmallIcon(com.stardust.scriptdroid.R.drawable.autojs_material)
    .build();
const manager = context.getSystemService(android.app.Service.NOTIFICATION_SERVICE);
manager.notify(random(0,0xffff), notify);