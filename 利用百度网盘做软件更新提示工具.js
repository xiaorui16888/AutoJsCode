/*
*利用百度网盘作为提示软件更新的服务器
*原理：爬取无提取码的分享链接内部内容，
*     与本地版本比对
*
*注：检测的软件是音乐爬虫软件，自己写的……
*
*作者：十 有 八九
*QQ：3104182180
*/

var res = http.get("pan.baidu.com/share/list?r=0.306654677959159&web=5&app_id=250528&logid=MTU2OTE0NjI1MzUwMDAuMjQ5NDQzOTcwMzg3ODAxNTM%3D&channel=chunlei&clienttype=5&desc=1&showempty=0&page=1&num=20&order=time&shorturl=NZc0urE5lX_oHeVvvZlWkQ&dir=%2F%E6%88%91%E7%9A%84%E8%B5%84%E6%BA%90%2F%E8%87%AA%E5%B7%B1%E7%9A%84%E7%A8%8B%E5%BA%8F%2F%E7%A8%8B%E5%BA%8F")
var txt = res.body.json()["list"]
var a = new Array()
for (i = 0; i < txt.length; i++) {
    var name = txt[i].server_filename
    if (name.slice(name.indexOf("_") - 2, name.indexOf("_")) !== "UI") {
        var d = name.indexOf(".apk")
        var beta = name.slice(d - 5, d)
        a.push(beta)
    }
}
a.sort(function(a, b) {
    return a - b;
});
if (app.versionName !== a[0]) {
    alert("有新版本可以更新", "当前版本：" + app.versionName + "\n\n最新版本：" + a[0])
    if (confirm("是否前去下载更新?")) {
        app.openUrl("https://pan.baidu.com/s/1NZc0urE5lX_oHeVvvZlWkQ")
    } else {
        engines.execScriptFile(engines.myEngine().cwd() + "/main.js")
    }
} else {
    log("暂无新版本")
    alert("暂无新版本")
}