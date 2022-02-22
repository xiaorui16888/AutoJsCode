"ui";
ui.layout(
    <ScrollView>
        <vertical padding="10 110 10 100" >
            <text text="【万事达】10元话费  by:无羡" maxLines="1" textSize="23sp" textColor="black" gravity="center"/>
            <horizontal>-
                <input id="sjh" h="50" hint="请输入手机号" gravity="center" w="240"/>
                <button id="fyzm" text="发送验证码"/>
            </horizontal>
            <input id="yzm" h="50" hint="请输入验证码" gravity="center"/>
            <button id="zc" text="领取话费"/>
            <button id="lx" text="有问题联系作者" style="Widget.AppCompat.Button.Borderless"/>
            <button id="jq" text="-------------------------------------------------------------------" style="Widget.AppCompat.Button.Borderless"/>
        </vertical>
    </ScrollView>
)
ui.zc.click(function() {
    threads.start(function() {
        register(ui.sjh.getText(), ui.yzm.getText());
    });
});
ui.lx.click(function() {
    var qq号 = "3402345716";
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqq://im/chat?chat_type=wpa&version=1&src_type=web&uin=" + qq号,
        packageName: "com.tencent.mobileqq",
    });
});
ui.fyzm.click(function() {
    threads.start(function() {
        console.show();
        var sjhh = ui.sjh.getText();
        log(sendcode(sjhh));
        log("【" + sjhh + "】发送验证码成功！");
    });
});

function sendcode(sjh) {
    var r = http.get("https://dataroaming.xunliandata.com/charge/user/vcode?phone=" + sjh + "&type=0").body.json();
    return r
}

function register(sjh, yzm) {
    while (true) {
        var regggg = http.postJson("https://dataroaming.xunliandata.com/charge/user/register", {
            phone: sjh,
            vcode: yzm,
            cardNum: "556632441234" + random(1000, 9999),
            fromFlag: "0",
            entryId: "0"
        }, {
            headers: {
                'Host': 'dataroaming.xunliandata.com',
                'Connection': 'keep-alive',
                'Content-Length': '96',
                'Accept': ' application/json, text/plain, */*',
                'Origin': ' https://dataroaming.xunliandata.com',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 8.1.0; INE-TL00 Build/HUAWEIINE-TL00; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/67.0.3396.87 XWEB/480 MMWEBSDK/190102 Mobile Safari/537.36 MMWEBID/7089 MicroMessenger/7.0.3.1400(0x27000336) Process/appbrand0 NetType/4G Language/zh_CN miniProgram',
                'Content-Type': 'application/json;charset=UTF-8',
                'Referer': 'https://dataroaming.xunliandata.com/mastercard/',
                'Accept-Language': 'zh-CN,en-US;q=0.9',
                'X-Requested-With': 'com.tencent.mm'
            }
        });
        var b = regggg.body.json();
        log(b);
        if (b.message == "OK!") {
            toastLog("注册成功");
            log("话费将在3天内到账");
            break;
        }
    }
}