"auto";
// version:2017/5/11 23:20
/*
写上对方的QQ号，多个QQ号请用逗号隔开
*/
var qq = ["10001", "10002"]
var msg = "续";
for (var i = 0; i < qq.length; i++) {
    toast(qq[i]);
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqwpa://im/chat?chat_type=wpa&uin=" + qq[i],
    });
    sleep(2000); //这个时间自己看手机性能决定，运行快的可以减少
    input(msg);
    click("发送");
    sleep(1000);
}
toast("发送完毕");