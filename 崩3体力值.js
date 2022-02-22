const span = 6 * 60 * 1000;
var sets = storages.create("honkaiimpact3rd");
var stm = sets.get("startTime");
var sp = sets.get("startPoint");
var t = dialogs.select("请选择功能", "设定", "消耗", "恢复显示", "关闭显示", "创建快捷方式");
switch (t) {
	case 0:
	t = dialogs.rawInput("当前剩余体力");
	sp = parseInt(t);
	t = dialogs.rawInput("当前剩余时间");
	alert("按下确定开始计时\n体力；" + sp + "\n剩余时间：" + t);
	t = t.split(":");
	stm = Date.now() + parseInt(t[0]) * 60000 + parseInt(t[1]) * 1000 - span;
	sets.put("startTime", stm);
	sets.put("startPoint", sp);
	break;
	case 1:
	t = dialogs.rawInput("消耗体力");
	sp -= parseInt(t);
	sets.put("startPoint", sp);
	break;
	case 2:
	break;
	case 3:
	context.getSystemService(context.NOTIFICATION_SERVICE).cancel(1);
	engines.stopAll();
	break;
	case 4:
	var sc = new android.content.Intent(android.content.Intent.ACTION_VIEW);
	sc.setClassName("com.stardust.scriptdroid", "com.stardust.scriptdroid.external.open.RunIntentActivity");
	sc.setData(android.net.Uri.parse("file:///sdcard/ModPE/Misc/崩3体力值.js"));
	var i = new android.content.Intent("com.android.launcher.action.INSTALL_SHORTCUT");
	i.putExtra(android.content.Intent.EXTRA_SHORTCUT_NAME, "崩3体力计");
	i.putExtra("duplicate", false);
	i.putExtra(android.content.Intent.EXTRA_SHORTCUT_INTENT, sc);
	i.putExtra(android.content.Intent.EXTRA_SHORTCUT_ICON_RESOURCE, android.content.Intent.ShortcutIconResource.fromContext(context, com.stardust.scriptdroid.R.drawable.autojs_material));
	context.sendBroadcast(i);
	default:
	exit();
}
var diff;
var svc = context.getSystemService(context.NOTIFICATION_SERVICE);
var nof = new android.app.Notification.Builder(context);
nof.setContentTitle("崩坏3体力计");
nof.setSmallIcon(com.stardust.scriptdroid.R.drawable.autojs_material);
nof.setLargeIcon(android.graphics.BitmapFactory.decodeResource(context.getResources(), com.stardust.scriptdroid.R.drawable.autojs_material));
nof.setContentIntent(android.app.PendingIntent.getActivity(context, 0, context.getPackageManager().getLaunchIntentForPackage("com.stardust.scriptdroid"), android.app.PendingIntent.FLAG_UPDATE_CURRENT));
nof.setOngoing(true);
while (notStopped()) {
	diff = Math.abs(Date.now() - stm);
	nof.setContentText("体力：" + Math.floor(sp + diff / span) + "（" + Math.floor(6 - (diff % span) / 60000) + ":" + fixZero(Math.floor(60 - (diff % 60000) / 1000).toString(), 2) + "）");
	svc.notify(1, nof.build());
	sleep(1000);
}

function fixZero(s, n) {
	return s.length < n ? "0" + fixZero(s, n - 1) : s;
}