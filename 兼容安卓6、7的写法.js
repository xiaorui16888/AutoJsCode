/**
 * 定义常量
 */
const IS_ANDROID7 = isAndroid7();
const IS_ROOT = isRoot();

/**
 * 根据常量写判断，也可以把Auto.JS安卓7和root的函数封装为自定义函数方便调用
 * 以下只是抛砖引玉
 */
if (IS_ANDROID) {
    //这里写支持安卓7的代码
}
if (IS_ROOT) {
    //这里写安卓root的代码
}
if (!IS_ANDROID7 && !IS_ROOT) {
    toast("当前系统版本不是7+，也末ROOT,不支持坐标点击");
    exit();
}


/**
 * 判断安卓系统7+
 */
function isAndroid7() {
    if (device.sdkInt >= 24) {
        return true;
    }
}

/**
 * 判断安卓系统ROOT
 */
function isRoot() {
    if (files.exists('/su/bin/su') == true || files.exists('/system/bin/su') == true || files.exists('/system/xbin/su') == true) {
        return true;
    }
}
