"ui";
ui.layout(
    <ScrollView>
        <vertical>
            <webview id="web" h="530" margin="0 0"/>
            <button id="qd" text="输入号码"/>
            <button id="aa" text="重载网页"/>
        </vertical>
    </ScrollView>
)

toastLog("使用之前请输入您的邀请链接地址");
var url = "http://render.baqo77.com/p/f/jfxb4alj/pages/receive-redpacket/index.html?__webview_options__=ttb%253Dauto&sceneCode=C2C_APP_NEW&shareChannel=WeChat&shareUserId=2088312249260524&sharedUserId=&sign=Q1EXF2%2FBagn6I6OMvpRJ3AtiUfJBTa6FJvYYQ3%2B6Z78%3D";
ui.web.loadUrl(url);

ui.qd.click(() => {
    threads.start(function() {
        let a = getMoble();
        className("android.widget.EditText").setText(a);
    });
});
ui.aa.click(() => {
    ui.run(function() {
        ui.web.loadUrl(url);
    });
});

function getMoble() {
    var prefixArray = new Array("139", "138", "137", "136", "135", "134", "159", "158", "157", "150", "151", "152", "188", "187", "182", "183", "184", "178", "130", "131", "132", "156", "155", "186", "185", "176", "133", "153", "189", "180", "181", "177"); //这是目前找到的除了数据卡外的手机卡前三位，类型是字符串数组
    var i = parseInt(10 * Math.random());
    var prefix = prefixArray[i];
    for (var j = 0; j < 8; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
    }
    return prefix;
}