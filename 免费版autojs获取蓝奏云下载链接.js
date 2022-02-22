/**
 *   看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看
 *   看看看看看看　　　看看看看看看看看看看看看看看看看看　　　　　　看看看　　看看看　　看看看　　　看看看看看看看看看看看看看看看看看看
 *   看看看看看看　　　看看　　看看看看看　　　　　　　　　　看看　　看看看　　　看看　　　看　　　　看看看　　　　　　看　　　　　　　看
 *   看看看看看看看　　　看　　　看看看看看看看看看　　　看看看看看看看看看看　　　看　　　看　　　看看看看　　　看　　看　　看看看　　看
 *   看看看看看看看　　　　　　看看看看看看　　　　　　　　　　　　　看看看看看看看看看看看看　　看看看看看　　　看　　看　　看看看　　看
 *   看看看看看　　　看看　　　看看看看看看看看看　　　看看看看看看看看看看看看看看　　　　　　　　　看看看　　　看　　看　　　　　　　看
 *   看看　　　　　　看　　　　　看看看　　　　　　　　　　　　　　　　看　　　　看　　　看看看看　　看看看　　　　　　看　　看看看　　看
 *   看看　　　　　　看　　　　　　看看看看看看　　　看看看看看看看看看看看看　　看　　　看看看看　　看看看　　　看　　看　　看看看　　看
 *   看　　　看　　　　　　看看　　　看看看看看　　　　　　　　　　看看看看看　　看　　　　　　　　　看看看　　　看　　看　　看看看　　看
 *   看　　　看　　　　　看看看　　　　看看　　　　　看看看看看　　看看看看看　　看看看　　　　　看看看看看　　　看　　看　　　　　　　看
 *   看　　　看　　　　看看看看看　　看看　　　　　　　　　　　　　看看看看看　　看看看　　　　　看看看看看　　　　　　　　　看看看　　看
 *   看看看看看　　　看看看　　看看看看　　　看　　　看看看看看　　看看看看看　　　　　　　看　　看看看看看　　　看　　　　　看看看　　看
 *   看看看　　　　　看看看　　　看看看看看看看　　　　　　　　　　看看看看看　　　　　　　看　　看　　看看　　　看看看　　　看看看　　看
 *   看　　　　　　　看看看　　　看看看看看看看　　　看看看看看　　看看看看　　　　看　　　看　　看　　　看看看看看看　　　看看看看　　看
 *   看看　看看　　　　　　　　看看看看看看看看　　　　　　　　　　看看看看看看看　　　　看看　　　　　看看看看看看看　　　看看　　　　看
 *   看看看看看看看看看看看看看看看看看看看看看　　　看看看看看　　看看看看看看　　　看看看看看看看看看看看看看看看看　　看看看看看看看看
 *   看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看看 TMD
 * 
 * 当然了本脚本运行是有条件限制的. 必须使用免费版的autojs 运行才可以 最后生成的文件链接, 我使用浏览器打开了,为了更直观显示,怎么下载请自行修改
 * 
 * 再说一遍 pro版的无法运行, 看好了,眼瞎的报错别再找我BB
 * 
 * 好了 先下载一个jsoup吧
 */
//蓝奏云文件下载地址
var lanzouUrl = "https://www.lanzous.com/i4jlpaj";
//jsoup放置位置
var path = "/sdcard/脚本/lib/jsoup-1.12.1.jar";
files.ensureDir(path);
try {
    var getJsoup = http.get("https://static.dcrclub.com/lib/jsoup-1.12.1.jar");
    if (getJsoup.statusCode != 200) {
        toastLog("下载JSOUP失败,请手动下载,并放置到: "+path);
        exit();
    }
} catch (e) {
    toastLog("网络连接失败,请手动下载,并放置到: "+path);
    exit();
}

files.writeBytes(path, getJsoup.body.bytes());
runtime.loadJar(path);

importClass(org.jsoup.Jsoup);
importClass(java.net.HttpURLConnection);
importClass(java.net.URL);
//免费版autojs的cookie管理
http.__okhttp__.muteClient(new OkHttpClient.Builder().cookieJar(new org.autojs.autojs.network.util.WebkitCookieManagerProxy()))
var cookieManager = android.webkit.CookieManager.getInstance();

var ck, pageBody_string, doc, src, fnUrl, fileName_body, sign, res_json;
while (true) {
    cookieManager.removeAllCookie();
    cookieManager.acceptCookie();
    cookieManager.removeSessionCookie();
    cookieManager.flush();
    cookieManager.removeExpiredCookie();
    cookieManager.setAcceptCookie(true);
    
    pageBody_string = http.get(lanzouUrl).body.string();
    
    ck = cookieManager.getCookie("https://www.lanzous.com");

    doc = Jsoup.parse(pageBody_string);
    src = doc.select("iframe[src]");
        src = src.attr("src");
    
    fnUrl = "https://www.lanzous.com/" + src;
    fileName_body = http.get(fnUrl, {
        headers : {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8",
            "cookie" : ck,
            "referer" : lanzouUrl,
            "sec-fetch-mode" : "nested-navigate",
            "sec-fetch-site": "same-origin",
            "upgrade-insecure-requests" : "1",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
        }
    }).body.string();

    sign = getInsideString(fileName_body, "'sign':'", "','ves'");
    
    ck = cookieManager.getCookie("https://www.lanzous.com");
    
    res_json = http.post("https://www.lanzous.com/ajaxm.php", {
        action: "downprocess",
        sign: sign,
        ves: 1
    }, {
        headers : {
            "accept": "application/json, text/javascript, */*",
            "accept-language" : "zh-CN,zh;q=0.9,en;q=0.8",
            "content-type": "application/x-www-form-urlencoded",
            "cookie" : ck,
            "origin": "https://www.lanzous.com",
            "referer" : fnUrl,
            "sec-fetch-mode": "cors",
            "ec-fetch-site": "same-origin",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
            "x-requested-with": "XMLHttpRequest"
        }
    }).body.json();
    if (res_json.url != "0") {
        break;
    }
}

var getHeaderDataUrl = res_json.dom + "/file/" + res_json.url;

//这里不使用autojs自带的http请求.因为自带的http请求会自动302跳转,不符合我们的要求
var url  = new URL(getHeaderDataUrl);
var urlConnection = url.openConnection();
    urlConnection.setRequestMethod("GET");
    //禁用302跳转
    urlConnection.setInstanceFollowRedirects(false);
    //设置headers
    urlConnection.setRequestProperty("accept","text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3");
    urlConnection.setRequestProperty("accept-language","zh-CN,zh;q=0.9,en;q=0.8");
    urlConnection.setRequestProperty("cookie","down_ip=1");
    urlConnection.setRequestProperty("sec-fetch-mode","nested-navigate");
    urlConnection.setRequestProperty("sec-fetch-site","cross-site");
    urlConnection.setRequestProperty("sec-fetch-user","?1");
    urlConnection.setRequestProperty("upgrade-insecure-requests","1");
    urlConnection.setRequestProperty("user-agent","Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36");
    //设置超时
    urlConnection.setConnectTimeout(30000);

var downLoadUrl = urlConnection.getHeaderField("Location");
log("提取结果:\n\n" + downLoadUrl + "\n\n");

// app.openUrl(downLoadUrl);

//此方法可以代替jsoup的html解析,但是复杂界面中 还是使用jsoup 比较方便
function getInsideString(str, strStart, strEnd ) {
    if ( str.indexOf(strStart) < 0 ){
        return "";
    }
    if ( str.indexOf(strEnd) < 0 ){
        return "";
    }
    return str.substring(str.indexOf(strStart) + strStart.length, str.indexOf(strEnd));
}
