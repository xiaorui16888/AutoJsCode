//引入相关Android 类
importClass(android.provider.Settings);

//记录屏幕方向是否锁定，0：锁定，1：未锁定
var accelerometerRotation = null;
//记录屏幕方向，取值范围：0、1、2、3，0为正常竖屏
var userRotation = null;

//检查是否有修改系统设置权限
var writeSettingsPermission = Settings.System.canWrite(context);
log("修改设置权限:" + writeSettingsPermission);
//弹框申请权限，在权限被设置为询问时会弹框，设置为拒绝时直接抛异常，不建议直接使用这种方式处理权限获取，用APK编辑器解包自身应用，将权限写入Manifest后可用这种方式动态申请
// runtime.requestPermissions(["WRITE_SETTINGS"]);
//没有权限时跳转到打开修改系统设置权限页面
if (!writeSettingsPermission) {
    toast("请打开修改系统权限设置");
    //脚本打包成APP时将Auto.js替换成自己应用名称，或直接将自己应用包名以字符串赋值给currentAppPackageName
    var currentAppPackageName = app.getPackageName("Auto.js");
    var settingIntent = app.intent({
        action: "android.settings.action.MANAGE_WRITE_SETTINGS",
        data: app.parseUri("package:" + currentAppPackageName),
        flags: ["activity_new_task"]
    });
    context.startActivity(settingIntent);
} else {
    //记录原先的系统屏幕方向，关闭后恢复
    accelerometerRotation = Settings.System.getInt(context.getContentResolver(), Settings.System.ACCELEROMETER_ROTATION);
    userRotation = Settings.System.getInt(context.getContentResolver(), Settings.System.USER_ROTATION);
    log("是否锁定方向：" + accelerometerRotation);
    log("屏幕方向：" + userRotation);
    //参数0：锁定方向
    Settings.System.putInt(context.getContentResolver(), Settings.System.ACCELEROMETER_ROTATION, 0);
	//参数1：横屏
    Settings.System.putInt(context.getContentResolver(), Settings.System.USER_ROTATION, 1);
}

/**
 * 监听exit()退出事件，退出时恢复原有屏幕方向
 */
events.on('exit', function () {
    //判断是否需要恢复屏幕方向设置
    if (accelerometerRotation != null && userRotation != null) {
        if (Settings.System.canWrite(context)) {
            log("恢复方向，是否锁定方向：" + accelerometerRotation + "，屏幕方向：" + userRotation);
            //恢复屏幕方向
            Settings.System.putInt(context.getContentResolver(), Settings.System.ACCELEROMETER_ROTATION, accelerometerRotation);
            Settings.System.putInt(context.getContentResolver(), Settings.System.USER_ROTATION, userRotation);
        }
    }
});

setInterval(() => { }, 1000);