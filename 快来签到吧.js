auto();
//群号数组.每天有5次加分机会. 你可以设置5个群号.
var qun = [
"332093831",
"182391644"
];
for (let i = 0; i < qun.length; i++) {
    var c = base64("https://qun.qq.com/qqweb/m/qun/checkin/index.html?gc="+ qun[i] + "&state=1");
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqapi://forward/url?url_prefix=" + c + "&version=1&src_type=web"
    });
    text("发表").waitFor();
    while(!click("发表"));
    //如果提示签到频繁，就把延时改大点
    sleep(2000);
}
function base64(str){
 return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(),2));
}
