function doregister(phone, pwd, invite, ua) {
    var temp = http.postJson('http://face.dajiazhuanqian.com/Home/Register', {
        "appVersion": 29,
        "password": pwd,
        "devicetype": "androidyubo",
        "account": phone,
        "recommendcode": invite
    }, {
        "headers": {
            "Accept-Language": "zh-CN,zh;q=0.8",
            "User-Agent": ua,
            "Content-Type": "application/json;charset=utf-8",
            "Content-Length": "117",
            "Host": "face.dajiazhuanqian.com",
            "Connection": "Keep-Alive"
        },
        "contentType": "application/json"
    }).body.json();
    log(temp);


}
for (;;) {
    doregister(getMoble(), "wx6666666", "44045053")
    sleep(2000)
}
log(getMoble())

function getMoble() {
    var QArray = new Array("130", "131", "132", "133", "135", "137", "138", "176", "187", "189");
    var Qi = parseInt(10 * Math.random());
    var Q = QArray[Qi];
    for (let i = 0; i < 8; i++) {
        Q = Q + Math.floor(Math.random() * 10);
    }
    return Q;
}