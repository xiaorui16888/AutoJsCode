log("开始运行");
//创建exit事件,脚本异常或正常结束(包括音量键up直接结束脚本)前执行。
events.on("exit", function() {
    log("脚本结束前采访,你帅吗？");
    var ha233 = confirm("脚本结束前采访,你帅吗？");
    if (ha233) {
        alert("真不要脸！有我帅吗？");
    } else {
        toastLog("嗯,你没我帅 ⊙ω⊙");
    }
    //打开日志板面
    app.startActivity("console");
    log("虽然脚本停止了,但我还想调教你一下╭(￣▽￣)╮");

});
var a_name = rawInput("请输入想结束的应用名称");
var p_name = app.getPackageName(a_name);
if (!p_name) {

    toastLog("输入为空或应用不存在,直接结束脚本");
    exit();

}
toastLog(p_name);
openAppSetting(p_name);
waitForActivity("com.android.settings.applications.InstalledAppDetailsTop")
var a_stop = textContains("停止").findOne(2000);
if (a_stop) {
    a_stop.click();
    var a_sure = textContains("确定").findOne(2000);
    if (a_sure) {
        a_sure.click();
        toastLog("已结束应用:" + a_name);
    }
}