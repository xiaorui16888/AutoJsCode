"auto";
/*
脚本名称 :学习通挂机看视频
脚本版号 :1
脚本版名 :0.0.1
脚本作者 :Louis
完成日期 :2018-4-22
权限环境 :Root环境 OR Android7.+无障碍环境
测试环境 :AutoJs 3.1.0 Beta | Android 7.0系统 | 学习通 3.2.1
执行界面 :学习通->我的课程->选择某个课程进入，脚本便会自动运行了！
脚本描述 :本脚本可以在观看视频时自动对随机出现的答
题界面进行答题，并在播放完视频后自动
播放下一个视频，请在看视频时保持屏幕常亮，
不对章节测验自动答题！
*/
//环境检查
auto.waitFor();
//设置屏幕分辨率环境,以适应不同分辨率设备
setScreenMetrics(1440, 2392);
//正文代码
var rootAutomator;
var isFirstRun = true;
var isPlaying = false;
var isDebug = false; //开发者模式
var btnSubmit = text("提交");
var btnContinue = id("check_right");
//问题选项列表
var answerListView = className("android.widget.ListView");

if (isDebug) {
console.clear(); //清除控制台
console.show();
}
if (hasRoot()) {
rootAutomator = new RootAutomator();
}
//检查当前界面是否是脚本初始运行界面
if (!id("tab_title").text("章节").exists()) {
alert("提示", "学习通->我的课程->选择某个课程进入，脚本便会自动运行了");
}
//脚本退出监听
events.on('exit', function() {
if (rootAutomator != null) rootAutomator.exit();
console.hide(); //隐藏控制台
});
while (true) {
var isFinded = false;
//处理章节列表界面
if (id("tab_title").text("章节").exists()) {
isFinded = true;
if (isFirstRun) {
isFirstRun = false;
toastLog("脚本已经开始运行,期间请勿进行任何不必要操作...");
}
log("已进入章节列表");
//根据id和text进行组合判断
if (id("tv_icon").text("2").exists()) {
var tvIcon = id("tv_icon").text("2").findOne();
//进行三次父类控件查找列表中的选项布局
clickOpt(tvIcon.parent().parent().parent());
} else if (textContains("已经到底啦").exists()) {
toastLog("视频已全部看完,脚本运行完毕！");
break;
} else {
scroll();
}
}
//处理章节详情界面
if (id("chapter_title").exists()) {
isFinded = true;
var chapterName = id("tv_chapter_name").findOne();
log("已进入[" + chapterName.text() + "]章节详情页");
var btnPlay = desc("play").findOne(5000);
if (btnPlay == null) {
log("5秒内没发现播放按钮,滑动一下刷新界面");
scroll();
sleep(2000);
// scrollDown();
} else {
log("发现播放按钮");
sleep(1000);
if (desc("任务点已完成").exists()) {
log("当前章节以前已看完");
backOpt(); //点击返回键
} else if (isPlaying) {
log("当前章节刚已看完,准备进入下一章节");
isPlaying = false;
backOpt(); //点击返回键
} else {
log("已点击播放按钮");
clickOpt(btnPlay);
}
}
}

//处理视频播放界面 if (id("video_sv_show_video").exists()) { isFinded = true; log("已开始播放视频"); isPlaying = true; if (btnSubmit.exists()) { toastLog("开始答题..."); answerListView.findOne().children().forEach(function(child) { log(child.className()); clickOpt(child); if (btnSubmit.exists()) { clickOpt(btnSubmit.findOne()); } if (btnContinue.exists()) { //在答题完成后点击继续按钮,隐藏界面 clickOpt(btnContinue.findOne()); toastLog("答题完成"); } }); } if (btnContinue.exists()) { //在答题完成后点击继续按钮,隐藏界面 clickOpt(btnContinue.findOne()); toastLog("答题完成"); } } //处理4G网络播放时弹出的提示对话框 if (textContains("2G/3G/4G网络，是否允许").exists()) { clickOpt(text("允许").findOne()); } if (isFinded) { sleep(1500); //设置扫描间隔时间,必须添加 } else { sleep(6000); //设置空闲时扫描时间 } 
}
//工具方法
//打印log
function log(msg) {
if (isDebug) console.log(msg);
}
//上滑
function scroll() {
if (device.sdkInt >= 24) {
log("执行Android7.0以上的滑动方法");
//Android7.0以上的滑动
swipe(700, 1200, 700, 600, 500);
} else if (hasRoot()) {
log("有Root权限,执行Root权限下的滑动方法");
rootAutomator.swipe(700, 1200, 700, 600, 500);
} else {
log("执行Android7.0以下的滑动方法，有点问题，有时会滑不到最底端,需手动滑一下");
//AutoJs的滑动,有点问题，有时会滑不到最底端！
scrollable(true).findOnce(1).scrollForward();
//className("android.support.v7.widget.RecyclerView").scrollForward();
}
}
//处理返回点击有时不生效问题
function backOpt() {
for (var i = 0; i < 10; i++) {
sleep(100);
if (back()) break;
}
}
//处理click点击有时候不生效问题
function clickOpt(widgetObj) {
for (var i = 0; i < 10; i++) {
sleep(100);
if (widgetObj.click()) break;
}
}
//检测有无root权限
function hasRoot() {
return files.exists("/system/bin/su") || files.exists("/system/xbin/su");
}