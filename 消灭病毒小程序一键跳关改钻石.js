var id = "";
//点击消灭病毒小程序左上角齿轮,里面有你的id
var time = new Date().getTime();
var record = get(id, md5(getsign(id)));

跳关(1060);
//关卡最高1125,设置高了会报错。
改钻石(99999);
//钻石最多99999,多了会报错。

var time = new Date().getTime();
var signn = md5(upsign(id, record));
up(record, id, signn);

function 改钻石(x){
record=JSON.parse(record);
record.zuanShi=x;
record=JSON.stringify(record);}

function 跳关(x){
record=JSON.parse(record);
record.level=x;
record.levelMax=x;
record=JSON.stringify(record);}

function get(openid, sign) {
    var url = "https://wxwyjh.chiji-h5.com/api/archive/get";
    var a = http.postJson(url, data = {
        "plat": "wx",
        "time": time,
        "openid": openid,
        "sign": sign
    });
    json1 = a.body.json();
    if (json1.code == 0) {
        return (json1.data.record);
    }
}

function up(record, openid, sign) {
    var url = "https://wxwyjh.chiji-h5.com/api/archive/upload";
    var a = http.postJson(url, data = {
        "plat": "wx",
        "record": record,
        "time": time,
        "openid": openid,
        "sign": sign,
    });
    jg=a.body.json();
    if(jg.code==0){toastLog("更改成功")}
}


function md5(string) {
    return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5")
        .digest(java.lang.String(string).getBytes())).toString(16);
}

function upsign(openid, record) {
    strtime = time.toString();
    var e = [] 
    var i = ""; 
    var t = {         
        plat: 'wx',
        record: record,
        time: strtime,
        openid: openid,
        wx_appid: 'wxa2c324b63b2a9e5e',
        wx_secret: '8fbd540d0b23197df1d5095f0d6ee46d'
    }
    for (var s in t) { 
        e.push(s); 
    }
    e.sort(function(t, e) {                 
        return t > e ? 1 : t < e ? -1 : 0;         
    });          
    var n;         
    for (n in e) i += (s = e[n]) + "=" + t[s] + "&";        
    var sign1 = i.substring(0, i.length - 1);
    return sign1
}

function getsign(openid) {
    strtime = time.toString();
    var e = [] 
    var i = ""; 
    var t = {         
        plat: 'wx',
        time: strtime,
        openid: openid,
        wx_appid: 'wxa2c324b63b2a9e5e',
        wx_secret: '8fbd540d0b23197df1d5095f0d6ee46d'
    }
    for (var s in t) { 
        e.push(s); 
    }
    e.sort(function(t, e) {                 
        return t > e ? 1 : t < e ? -1 : 0;         
    });          
    var n;         
    for (n in e) i += (s = e[n]) + "=" + t[s] + "&";        
    var sign1 = i.substring(0, i.length - 1);
    return sign1
}