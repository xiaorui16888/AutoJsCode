auto.waitFor();
console.show()
console.setPosition(400, -100);
launchApp("微信");
var q = waitForActivity("com.tencent.mm.ui.LauncherUI", period = 200);
log("已进入微信")
sleep(200)
for (i = 0; i < 3; i++) {
    className("com.tencent.mm.ui.mogic.WxViewPager").scrollBackward();
}
log("准备就绪 等待消息中...")
while (1) {
    if (id("k2").exists()) {
        var x = id("k2").findOne().bounds().right,
            y = id("k2").findOne().bounds().left
        log("消息坐标:"+y, x)
        click(y, x)
        id("ac_").waitFor()
        log("进入聊天页面")
        id("ac8").click();
        sleep(200)
        setText(笑话());
        id("acd").click();
        sleep(200)
        id("hk").click();
        log("等待消息中...")
    }
}
function 笑话(message) {
    var url = "http://www.tuling123.com/openapi/api";
    var r = http.postJson(url, {
        key: "ae029100ea894edb9436e40d39acbc1e",
        info: "讲个笑话",
    });
    return r.body.json().text;
}