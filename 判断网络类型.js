/**
 *Usedfor： Auto.js 通用
 *Author: Hyun Mai  QQ:2668649892
 *Features: 判断是否有网/有网返回网络类型
 *Tips: null
 */

log(isNetType());

function isNetType() {
    var Service = context.getSystemService(context.CONNECTIVITY_SERVICE);
    var Network = Service.getActiveNetworkInfo();

    if (Network != null && Network.isAvailable()) {
        var name = Network.getTypeName();
        return (name == "MOBILE" ? "移动网络" : (name == "WIFI" ? "WIFI" : "未知网络"));
    } else {
        return "没有网络";
    }
}