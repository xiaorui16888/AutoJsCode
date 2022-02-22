auto.waitFor();
var qun = ["群号1", "群号2", "群号3", "群号4", "群号5"];
for (let i = 0; i < qun.length; i++) {
    var c = base64("https://qun.qq.com/qqweb/m/qun/checkin/index.html?gc=" + qun[i] + "&state=1");
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqapi://forward/url?url_prefix=" + c + "&version=1&src_type=web"
    });
    text("发表").waitFor();
    var c = text("要认真签个到").findOne().bounds()
    click(c.centerX(), c.centerY());
    sleep(50)
    setText("橘猫~")
    sleep(300);
    while (!click("发表"));
    id("title").findOne()
    sleep(100);
};

function base64(str) {
    return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(), 2));
};