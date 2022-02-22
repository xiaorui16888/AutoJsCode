var kill = [
    "QQ",
    "微信",
    "哔哩哔哩",
    "动漫之家",
    "抖音短视频",
    "支付宝",
    "东方头条",
    "今日头条",
    "头条来了",
    "惠头条",
    "手机淘宝",
    "百度网盘",
    "趣头条",
    "迅雷",
    "饿了么",
    "酷安",
    "夸克",
    "美团外卖",
    "全民K歌",
    "网易云音乐",
    "下厨房",
    "QQ音乐",
    "搜图神器"
];

for (x = 0; x < kill.length; x++) {
    killApp(kill[x]);
};
home();

function killApp(name) {
    app.openAppSetting(app.getPackageName(name));
    sleep(150);
    //text("强行停止").waitFor();
    var k = text("强行停止").findOne(500);
    if (k.drawingOrder() == 2) {
        k.click();
        text("确定").findOne().click();
    }
}