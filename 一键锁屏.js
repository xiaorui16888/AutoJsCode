importClass(android.app.admin.DevicePolicyManager);
importClass(android.content.ComponentName);

var mDPM = context.getSystemService(context.DEVICE_POLICY_SERVICE); // 获取设备策略服务
var mDeviceAdminSample = new ComponentName(context, "org.autojs.autojs.ui.edit.EditActivity_");


activeAdmin();
lockScreen();


/** 激活设备管理器 */
function activeAdmin() {
    var intent = new Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN);
    intent.putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, mDeviceAdminSample);
    intent.putExtra(DevicePolicyManager.EXTRA_ADD_EXPLANATION, "我们有了超级设备管理器，好NB");
    app.startActivity(intent);
}
/** 一键锁屏 */
function lockScreen() {
    if (mDPM.isAdminActive(mDeviceAdminSample)) {
        //判断设备管理器是否已经激活
        mDPM.lockNow(); //立即锁屏
        //mDPM.resetPassword("123456", 0); //设置密码
    } else {
        toastLog("必须先激活设备管理器!");
    }
}

//var vibrator = context.getSystemService(context.VIBRATOR_SERVICE);
//vibrator.vibrate(10000);