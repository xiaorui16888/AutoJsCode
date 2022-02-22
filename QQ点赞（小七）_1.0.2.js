//————QQ名片点赞[只点特定的一位好友]脚本——————
//   直接运行，然后输入需要点赞的好友的QQ号、昵称或者备
//注。以前没有考虑过脚本分享给群友的时候可能存在的更新问
//题，所以没有考虑过版本号之类的。那就从这一次开始吧！
//版本号：1.0.2 （为啥不是 1.0.1 ？？？ 因为上午发了一个）
//更新内容：
// 1. 修复了满足条件好友不唯一脚本出错的问题；
// 2. 修复了部分因为系统或者AutoJS的设置不同导致在QQ某些
//界面无法识别出目标控件导致脚本运行出错的问题；


var qqhao1 = "";
if (files.exists("/sdcard/qqhao")) {
  qqhao1 = files.read("/sdcard/qqhao");
}
for (var qqhao = dialogs.rawInput("输入需要自动点赞的QQ号码", qqhao1); qqhao == ""; qqhao = dialogs.rawInput("输入需要自动点赞的QQ号码", qqhao1));
// log(qqhao);

app.startActivity({
  action: "android.intent.action.SEND",
  type: "text/*",
  extras: {
    "android.intent.extra.TEXT": ""
  },
  packageName: "com.tencent.mobileqq",
  className: "com.tencent.mobileqq.activity.JumpActivity"
});

//———————————————————修改控制台锚点位置———————————————————————
var 屏幕宽度 = device.width , 屏幕高度 = device.height;
//log("(" + 屏幕宽度  + "，" + 屏幕高度 + ")");
console.setPosition( 屏幕宽度/8 , 屏幕高度/3*2);


//—————————————————————进行搜索—————————————————————————————
sleep(1000);
while (!desc("搜索").click());
// log("已点击 搜索");
sleep(300);
while (!text("搜索").setText(qqhao));
// log("已输入需要查找的信息");
sleep(300);

var jihe = id("title").find();
var nicheng = "";
switch (jihe.size()) {

  case 0:
    log("未找到满足条件的好友");
    停止运行();
    break;

  case 1:
    nicheng = jihe.get(0).text();
    // log("找到该联系人的昵称为：" + nicheng);
    while (!click(nicheng));
    // log("已点击该联系人");
    while (!click("发送"));
    // log("已点击 发送");
    break;

  default:
    console.show();
    log("目标好友不唯一，请自行选择");
    waitForActivity("com.tencent.mobileqq.activity.SplashActivity");
    nicheng = id("title").findOne().text();
}

//——————————————打开名片界面————————————————\\
id("ivTitleBtnRightImage").desc("聊天设置").click();
waitForActivity("com.tencent.mobileqq.activity.ChatSettingActivity");
// log("已单击进入聊天设置");
sleep(300);
var xxx = text(nicheng).find();
// log("找到该控件" + xxx.size() + "个");
if (xxx.size() == 1) {
  while (!xxx.get(0).parent().parent().click());
} else {
    console.show();
    log("未找到进入QQ名片的控件，请自行点击进入");
    waitForActivity("com.tencent.mobileqq.activity.FriendProfileCardActivity");
}
// log("已单击进入名片");


//——————————————开始点赞————————————————\\
sleep(300);
swipe(400, 200, 30, 230, 300);
descStartsWith("当前有").waitFor();
var zan = descStartsWith("当前有").find();
// log("找到点赞图标" + zan.size() + "个");
if (zan.size() == 1) {
  for (var i = 1; i < 12; i++) {
    zan.click();
    sleep(100);
  }
  // log("点赞10次");
  Back();
  Back();
  Back();
} else {
  log("未找到点赞图标");
  停止运行();
}
  files.write("/sdcard/qqhao", qqhao);
  // log("写入文件");
console.hide();

