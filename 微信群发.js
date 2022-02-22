auto.waitFor();
alert("没有加页面滑动，如有需要，自行学习解决" + "\n脚本仅供参考，一些数值需自行修改")
//获取发送信息
var message = dialogs.rawInput("请设置群发的内容", "");
//打开微信
app.launchPackage("com.tencent.mm");
while (!bounds(270, 1778, 540, 1920).click()); //点击联系人
sleep(1000);
var p = id("jq").find(); //定义联系人的控件
var q = p.size(); //定义联系人控件的序号
//按照定义好的序号依次点击
for (i = 0; i < q; i++) {
    sleep(2000);
    p.get(i).parent().click();
    sleep(1500);
    id("ana").text("发消息").findOne().click(); //发消息控件
    sleep(1000);
    id("aaa").click(); //输入框控件
    sleep(1000);
    setText(message)
    sleep(300);
    click("发送"); //发送
    var widget = id("hm").findOne(); //返回
    click(widget.bounds().centerX(), widget.bounds().centerY()); //因其不可直接点击，故获取其中心位置，实现坐标点击
    sleep(300);
    while (!bounds(270, 1778, 540, 1920).click()); //联系人
}