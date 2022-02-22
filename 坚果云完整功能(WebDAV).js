/*
 * @Author: 白酒煮饭 
 * @Date: 2019-08-31 21:38:21 
 * @Last Modified by: QQ：1641763174
 * @Last Modified time: 2019-08-31 22:56:08
 * @Info ： 转载请附注来源，谢谢
 */
const JianGuo = (function () {
    function JianGuo(url, UserName, Password) {
        this.baseUrl = url;
        this.UserName = UserName;
        this.Password = Password;
    }
    JianGuo.prototype.makeRequest = function (method, url, body) {
        url = this.baseUrl + url;
        var options = {};
        options.method = method;
        if (body) {
            options.body = body.toString();
        }
        options.headers = {
            "Authorization": "Basic " + java.lang.String(android.util.Base64.encode(java.lang.String(this.UserName + ":" + this.Password).getBytes(), 2))
        }
        return http.request(url, options);
    }
    JianGuo.prototype.查看列表 = function (UrlPath) {
        return xmlFromJson(decodeURI(this.makeRequest("PROPFIND", UrlPath).body.string()));
    }
    JianGuo.prototype.创建目录 = function (UrlPath) {
        return this.makeRequest("MKCOL", UrlPath).body.string();
    }
    JianGuo.prototype.获取数据 = function (UrlPath) {
        return this.makeRequest("GET", UrlPath).body.string();
    }
    JianGuo.prototype.上传数据 = function (UrlPath, data) {
        return this.makeRequest("PUT", UrlPath, data).body.string();
    }
    JianGuo.prototype.删除文件 = function (UrlPath) {
        return this.makeRequest("DELETE", UrlPath).body.string();
    }
    return JianGuo;
})();

/**
 * JianGuo
 * WebDAV 网址
 * WebDAV 账号
 * WebDAV 密码
 * 参见https://writer.drakeet.com/backups
 */

const UserName = null;
const Password = null;

if (!UserName || !Password) {
    alert("需要注册并填入UserName和Password");
    app.openUrl("https://writer.drakeet.com/backups");
    exit();
}

var JG = new JianGuo("https://dav.jianguoyun.com/dav/", UserName, Password);

let 创建目录 = JG.创建目录("000测试");
log("创建目录", 创建目录);


let 查看列表 = JG.查看列表("000测试");
log("查看列表", 查看列表);


let 上传数据 = JG.上传数据("000测试/123.js", "hello work");
log("上传数据", 上传数据);


let 查看列表 = JG.查看列表("000测试");
log("查看列表", 查看列表);


let 获取数据 = JG.获取数据("000测试/123.js");
log("获取数据", 获取数据);


let 删除文件 = JG.删除文件("000测试/");
log("删除文件", 删除文件);


function cutstr(a, b, c, f, e) {
    a = a.split(b);
    var d = "";
    if (e < a.length && e != null) {} else e = a.length;
    if (f == null) f = 1;
    for (i = f; i < e; i++) {
        tmp = a[i].split(c);
        if (tmp.length > 1) {d += tmp[0];}}
    return d;
}
function isDir(Na) {
    let name = Na.split("/");
    return (name[name.length - 1].indexOf(".") != -1) ? false : true;
}
function xmlFromJson(xml) {
    var jsonList = [];
    let xmls = cutstr(xml, "<d:response>", "</d:response>", 2, 100); //文件列表
    let path = cutstr(xmls, "<d:href>", "/d:href>", 2, 100).split("<"); //路径 -1
    let name = cutstr(xmls, "<d:displayname>", "/d:displayname>", 2, 100).split("<"); //文件名 -1
    for (let i = 0; i < path.length - 1; i++) {
        jsonList.push({
            "path": path[i],
            "fileName": name[i],
            "Dir":isDir(name[i]),
            "done": false,
            "isCanLook": "gone"
        });}
    return jsonList;
}