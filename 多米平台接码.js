var apiname = "";//api账号 多米app可查看
var password = "";//密码
var id = 10000;//项目id 先收藏项目
var digit = 6;//默认6位数字验证码
var token = ""; //初始化数据不必填写
var apilg = httpget("http://api.duomi01.com/api?action=loginIn&name=" + apiname + "&password=" + password);

function httpget(url) {
    var res = http.get(url);
    if (res.statusCode == 200) {
        return res.body.string();
    } else {
        return false;
    }
}
//获取后拉黑 http://api.duomi01.com/api?action=addBlacklist&sid=项目id&phone=要加入黑名单的手机号&token=登录时返回的令牌
function getphone(id, token) {
    if (apilg == false) {} else {
        return httpget("http://api.duomi01.com/api?action=getPhone&sid=" + id + "&vno=0&token=" + token);
    }
}

function getmessege(id, phone, token) {
    if (apilg == false) {} else {
        return httpget("http://api.duomi01.com/api?action=getMessage&sid=" + id + "&phone=" + phone + "&token=" + token)
    }
}
try{
if (apilg == false) {} else {
    token = apilg.split("|")[1];
}
var phone = getphone(id, token).split("|")[1];
log(phone);
var mes = 0;
while (mes == 0) {
    var getmes = getmessege(id, phone, token);
    mes = getmes.slice(0, 1);
    var yzm = getmes.split("|")[1].replace(/[^0-9]/ig, "").slice(0, digit);
    sleep(3000);//官方指定3秒间隔，获取成功自动释放号码
}
}catch(e){
    log("网络异常");
    exit();
    }
log(yzm);