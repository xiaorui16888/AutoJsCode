/*
说明：
      1.更新脚本的脚本放在永硕E盘，上传文件好之后，把脚本的链接放到QQ收藏里
      2.QQ收藏内容如下：版本号|更新脚本下载的链接(版本号没有小点)
      3.直接把内容写到当前运行的脚本文件里，并运行
附：
永硕E盘链接：www.ys168.com
*/

检查更新();

function 检查更新(){
let url = "https://share.weiyun.com/d53410905b3ba6e16e89769f33f0951e";
let str = http.get(url).body.string();
let h = cutstr(str, 'brief":"', '","content_type', 1, 2);
let ho = h.split("|");
if ("210" < ho[0]) 更新(ho[1]);}

function 更新(url) {
    threads.start(function() {
        var a = engines.myEngine().getSource();
        files.write(a, http.get(url).body.string());
        //运行刚才更新好的脚本
        engines.execScriptFile(a);
        toastLog("更新成功，请退出脚本，重新运行!!");
    });
}

function cutstr(a, b, c, f, e) {
    a = a.split(b);
    var d = "";
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