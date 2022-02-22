/*
ServerChan
https://sc.ftqq.com
autor: suiang
*/
function WeChat(key) {
    this.key = key;
    this._base = "https://sc.ftqq.com/";
}

/*
text：消息标题，最长为256，必填。
desp：消息内容，最长64Kb，可空，支持MarkDown。
返回值: 类型JSON
成功：{"errno":0,"errmsg":"success","dataset":"done"}
失败：{"errno":1024,"errmsg":"bad pushtoken"}
*/
WeChat.prototype.send = function(text, desp) {
    let url = [this._base, this.key, ".send"].join("");
    return http.post(url, {
        "text": text,
        "desp": desp || ""
    });
}

/** 导出类 */
module.exports = WeChat;

/*
调用范例：
首先去 https://sc.ftqq.com/
注册，获取自己的SCKEY 替换下面的 key！

var WeChat = require("WeChat.js")
const key = "SCU38554Tfb6856cfdb5c2*******************";

var text = "测试任务完成";
var desp = "你的测试任务完成了！";

var wx = new WeChat(key);
var res = wx.send(text, desp)

console.info(res.statusCode)
console.info(res.body.json())

console.show()
*/