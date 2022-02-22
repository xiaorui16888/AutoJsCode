/*
功能：使用root自动开启autojs的无障碍服务
使用方法：
let enable = require("enable.js");
enable();
*/

module.exports = function() {
    try {
        var enabled = shell("settings get secure enabled_accessibility_services", true).result.replace(/\n/, "");
        if (enabled.indexOf("stardust") < 0) {
            var stardust = "com.stardust.scriptdroid/com.stardust.scriptdroid.accessibility.AccessibilityService";
            var ret = shell("settings put secure enabled_accessibility_services " + enabled + ":" + stardust, true);
            if (ret.code) {
                throw new java.lang.Exception();
            } else {
                log("检测到无障碍服务被关闭，现在已使用脚本强行开启");
            }
        }
        shell("settings put secure accessibility_enabled 1", true);
    } catch (e) {
        log(e);
        toastLog("尝试开启无障碍服务异常");
    }
}