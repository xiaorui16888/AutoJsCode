app.launchPackage("com.tencent.mm")
var widget = text("附近的人").findOne();
click(widget.bounds().centerX(), widget.bounds().centerY());
waitForActivity("com.tencent.mm.plugin.nearby.ui.NearbyFriendsUI",[period = 200])
text("附近的人").waitFor();
console.show();
log("当前页为附近的人")
while (true) {
    id("b3i").waitFor();
    sleep(2000);
    var p = id("b3i").find();
    var q = p.size();
    sleep(1000)
    for (i = 0; i < q; i++) {
        p.get(i).parent().click()
        var name = id("sm").findOne().text();
        var sex = id("as4").findOne().desc();
        var distance = id("art").findOne().text();
        log("\n姓名：" + name + "\n性别：" + sex + "\n距离：" + distance)
        sleep(1000);
        text("打招呼").findOne().click();
        sleep(1000);
        setText("hello")
        click("发送")
        sleep(1500);
        id("j7").findOne().click();
        sleep(1000);
    }
    sleep(1000);
    id("cjc").findOne().scrollForward()
    sleep(1000);
}