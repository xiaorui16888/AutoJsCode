



var token=Get_Token(账号,密码)
var 手机号=Get_Phone(token,项目编号)
log(手机号);


var 验证码=Get_Sms(token,项目编号,手机号)
log(验证码)




function Get_Token(zh, mm) {
    var BendiToken = storages.create(zh);
    if (BendiToken.contains("token")) {
        return BendiToken.get("token")
    } else {
        var TokenUrl = "http://api.fxhyd.cn/UserInterface.aspx?action=login&username=" + zh + "&password=" + mm;
        var GetToken = http.get(TokenUrl).body.string();
        if (GetToken.split("|")[0] == "success") {
            var token = GetToken.split("|")[1];
            BendiToken.put("token", token);
            return token;
        } else {
            toastLog("获取token错误！错误代码为" + GetToken.split("|")[0]);
            exit();
        }
    }
}

function Get_Phone(token, xmbh) {
    var GetphoneUrl = "http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token=" + token + "&itemid=" + xmbh;
    var GetPhone = http.get(GetphoneUrl).body.string();
    if (GetPhone.split("|")[0] == "success") {
        var phone = GetPhone.split("|")[1];
        return phone;
    } else {
        toastLog("获取手机号错误！错误代码为" + GetPhone.split("|")[0]);
        exit();
    }
}

function Get_Sms(token, xmbh, sjh) {
    var GetsmsUrl = "http://api.fxhyd.cn/UserInterface.aspx?action=getsms&token=" + token + "&itemid=" + xmbh + "&mobile=" + sjh + "&release=1" //release=1 自动释放此手机号
    var GetSms = http.get(GetsmsUrl).body.string();log(GetSms)
    if (GetSms.split("|")[0] == "success") {
        var sms = GetSms.split("|")[1];
        return sms;
    }
}