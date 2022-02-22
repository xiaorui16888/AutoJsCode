//分享一个学习强国脚本，来自贴吧的大神

auto(); //辅助权限
//console.show();
//学习变量
var 文章任务 = 15 * 60 * 1000;
var 视频任务 = 125 * 60 * 1000;
var 文章计时 = 0;
var 视频计时 = 0;
var 学习任务 = 0;
//var 目标任务 = 2;
//手机挂机设置
var 音量 = device.getMusicVolume();
var 亮度 = device.getBrightness();
device.setMusicVolume(0);
device.setBrightness(0);
//device.keepScreenOn();
//按键监听
events.observeKey();
events.on("key_down", function(keyCode, events) {
//音量键关闭脚本
if (keyCode == keys.volume_up) {
exit();
}
});
toast("音量上键关闭脚本");
events.on("exit", function() {
device.cancelKeepingAwake();
device.setBrightness(亮度);
device.setMusicVolume(音量);
toast("学习结束，" + "文章时长" + 文章计时 + "秒，" + "视频时长" + 视频计时 + "秒");
});
//文章学习
function 文章学习() {
toast("开始文章学习");
desc("学习").findOne().click();
console.log(desc("学习").findOne());
//id("home_bottom_tab_button_work").findOne().click();
sleep(1000);
//打开视频文章
var 列表 = className("ListView").bounds(0, 345, 1080, 1762).depth(19).findOne();
列表.child(2).click();
var 计时 = setInterval(function() {
视频计时 = 视频计时 + 5;
toast("已学习" + 视频计时 + "秒");
var 重新播放 = text("重新播放").findOne(500);
console.log(重新播放);
if (重新播放 != null) {
重新播放.parent().click();
}
}, 5000);
//文章学习时长到时
setTimeout(function() {
clearInterval(计时);
学习任务++;
toast("文章时长完成!");
if (desc("学习").exists() != TURE) {
back();
}
视频学习();
}, 文章任务)
}
//视频学习
function 视频学习() {
toast("开始视频学习");
//打开视频学习
desc("视频学习").findOne().click();
sleep(1000);
//打开视频文章
var 列表 = className("ListView").bounds(0, 345, 1080, 1762).depth(19).findOne();
//console.log(列表);
列表.child(2).click();
//开始学习
var 计时 = setInterval(function() {
视频计时 = 视频计时 + 5;
toast("已学习" + 视频计时 + "秒");
var 重新播放 = text("重新播放").findOne(500);
console.log(重新播放);
if (重新播放 != null) {
重新播放.parent().click();
}
}, 5000);
//设置总学习时长，默认是25分钟
setTimeout(function() {
clearInterval(计时);
学习任务++;
toast("视频时长完成!");
}, 视频任务);
}
//打开学习强国app
app.launchPackage("cn.xuexi.android");
sleep(2000);
switch (学习任务) {
case 0:
文章学习();
break;
case 1:
视频学习();
break;
default:
{
toast("找不到学习任务啊！");
exit();
}
}