//alert("提示：", "10秒后开始线程，请手动打开app(兼容)，脚本可能不完全兼容各类机型，作者测试机型HUAWEI INE-TL00");
var sis = dialogs.input("此处填看视频次数", "");
if (sis == null) {
    exit();
}
sleep(10 * 1000);
for (var i = 1; i <= sis; i++) {
    id("tv_tab_title").text("首页").findOne().parent().click();
    toastLog("30秒一循环");
    sleep(30*1000);
    toast("已观看" + i + 1 + "次");
}