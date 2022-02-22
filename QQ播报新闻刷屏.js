//都是最新新闻
var t = 0;//延迟
var sex;
var website;
toast("打开QQ对话界面");
getnews();
sendnews();
function getnews() {
    url = http.get("http://news.sogou.com/").body.string();
    //log(url);
    a = url.split('href="');
    b = [];
    c = [];
    var n = 0;
    for (i in a) {
        b[i] = a[i].split('</a></li>\n<li>\n<a ');
        for (j = 0; j < [b].length; j++) {
            if (b[i][j].indexOf("http") == 0)
                c[n++] = b[i][j];
        }
    }
    d = [];
    e = [];
    title = [];
    website = [];
    n = -1
    for (i in c) {
        d[i] = c[i].split('" target="_blank"');
        if (d[i][1] != null) {
            d[i][1] = d[i][1].substr((d[i][1]).indexOf('>') + 1);
            d[i][1] = d[i][1].substr(0, (d[i][1]).indexOf('<'));
            if (d[i][1].length > 5)
                e[++n] = d[i];
        }
    }
    for (i = 0; i < e.length - 3; i++) {
        //log(e[i]);
        title[i] = e[i][1];
        website[i] = e[i][0];
    }
    //sex = dialogs.singleChoice("都是最新的新闻！", title);
}
function sendnews() {
    var n = 1;
    notification = "下面开始播报新闻";
    for (i in title) {
        log(notification);
        //    waitForActivity("com.tencent.mobileqq.activity.SplashActivity");
        id("input").depth("2").findOne().setText(notification);
        className("android.widget.Button").text("发送").findOne().click();
        sleep(t);
        notification = n++ +","+title[i] + "\n链接" + website[i];
    }
}
