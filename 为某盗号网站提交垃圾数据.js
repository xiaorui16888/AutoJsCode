


var str = 'abcdefghijklmnopqrstuvwxyz';
var STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var num = '0123456789';
var sym = '+=-@#~,.[]()!%^*$';

var text = new Array();
text.push(str);
text.push(STR);
text.push(num);
text.push(sym);


//开启cookie管理
http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(new org.autojs.autojs.network.util.WebkitCookieManagerProxy()))
var cookieManager = android.webkit.CookieManager.getInstance();

http.get("http://kptfhdtx.cn");

while(true) {
    var conn = random(123548, 2584578481);
    var pass = randPassword();
    var ck = cookieManager.getCookie("http://kptfhdtx.cn");
    var save = http.post("http://kptfhdtx.cn/save1.php", {
        u: conn,
        p: pass,
        from_ui: "1",
        dumy: "",
    }, {
        headers : {
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
            "Cache-Control": "max-age=0",
            "Connection": "keep-alive",
            "Content-Type": "application/x-www-form-urlencoded",
            "Cookie": ck,
            "Host": "kptfhdtx.cn",
            "Origin": "http://kptfhdtx.cn",
            "Referer": "http://kptfhdtx.cn/login/nullcode_login.php",
            "Upgrade-Insecure-Requests": "1",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.119 Safari/537.36"
        }
    });
    log(conn, pass);
}


// log(save.body.string());

function randPassword(){
    var pw = '';
    for(i=0; i<random(8,16); i++){
        var strpos = random(0,text.length-1);
        pw += text[strpos].charAt(random(0, text[strpos].length-1));
    }
    return pw; 
}
