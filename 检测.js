function cutstr(a, b, c, f, e) {
        a = a.split(b);
        var d = ""
        if (e < a.length && e != null) {} else {
            e = a.length;
        }
        if (f == null) {
            f = 1;
        }
        for (i = f; i < e; i++) {
            tmp = a[i].split(c);
            if (tmp.length > 1) {
                d += tmp[0];
            }
        }
        return d;
    }
    while(true){
    var r1 = http.get("https://h5.qzone.qq.com/ugc/share?sid=&sharetag=7A607F53EE245D95204D32502AF5A990&bp7=&bp2=&bp1=&_wv=1&no_topbar=1&res_uin=3411261090&appid=311&cellid=a2b653cbe92d015c3cae0700&subid=&g_ut=3&plg_dev=1&plg_usr=1&plg_auth=1&plg_nld=1&plg_uin=1&from=mp#wechat_qqauth&wechat_redirect");
    var html1 = r1.body.string(); //正则匹配的内容
    html1 = cutstr(html1, '"cell_summary":{"summary":"', '","hasmore"', 1, 20);
    var html1 = html1.replace(/[\\n]+/g, "").replace(/\s/g, '')
toast(html1)
sleep(5000)
}