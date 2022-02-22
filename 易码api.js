/*
很久之前做的，不太完美也不想改了
qq号:3446623843
接定制脚本
*/
var a = "";
//平台账号
var b = "";
//密码
var id = 335;
//项目编号
var sh = "170.171.175";
//排除号段
var r = http.get("http://api.fxhyd.cn/UserInterface.aspx?action=login&username=" + a + "&password=" + b);
//登陆网址，已便获取token
var html = r.body.string();
var c = html.substring(0, 8);
log(c)
//提取前面的success|当判断是否登陆成功
var token = html.substring(8);
//提取令牌，从下标第8位开始
if (c == "success|") {
    log("登陆成功");
    var r = http.get("http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token=" + token + "&itemid=" + id + "&excludeno=" + sh + "&timestamp=TIMESTAMP");
    //获取手机号
    var html = r.body.string();
    var e = html.replace(/[^0-9]/ig, "");
    //手机号 ，正则提取数字
    log(e)
    var r = http.get("http://api.fxhyd.cn/UserInterface.aspx?action=getsms&token=" + token + "&itemid=" + id + "&mobile=" + e + "&release=1&timestamp=TIMESTAMP");
    //获取验证码
    sleep(10 * 1000)
    //按平台要求暂停10秒再获取
    for (var h = 1; h <= 10; h++) {
        var r = http.get("http://api.fxhyd.cn/UserInterface.aspx?action=getsms&token=" + token + "&itemid=" + id + "&mobile=" + e + "&release=1&timestamp=TIMESTAMP");
        //获取验证码
        var html = r.body.string();
        var g = html.replace(/[^0-9]/ig, "");
        //验证码按需求进行发送信息删选，这个先提取所有数字
        var k = g.substring(0, 8);
        if (k == "success|") {
            //这里按要求提取验证码
            break;
            //结束循环
        }
        log("第" + h + "次未获取到验证码");
        sleep(3 * 1000)
        //按平台要求暂停3秒再获取
    }
    http.get("http://api.fxhyd.cn/UserInterface.aspx?action=addignore&token=" + token + "&itemid=" + id + "&mobile=" + e);
    //拉黑号码
    log("已拉黑");
} else {
    log("登陆失败");
}