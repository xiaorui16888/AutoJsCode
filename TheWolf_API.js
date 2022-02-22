var TheWolf_api = "http://api.dk827.com/index.php/";
var TheWolf_Project_ID = "4480"; //TheWolf
var Account_Api;
var PassWord;

//token
var r = http.get(TheWolf_api + "reg/login?username=" + Account_Api + "&password=" + PassWord);
r = r.body.json();
var token = r.ret.token;

var errno = r.errno;
if (errno > 0) {
    toastLog("TheWolf登录失败");
    //     return 0;
} else if (errno == 0) {
    toastLog("TheWolf登录成功！");
    ui.jm_dl.setText("登录成功");
    //      return token
}

// 请求地址：http://api.dk827.com/index.php/reg/login
// 请求方式：POST请求或GET请求
// 请求参数：username=登录帐号&password=登录密码
// 成功：errno为0,返回ret里面的token ；如{"errno":0,"errmsg":"ok","ret":{"token":"f1594cad889ac7d2924fe5b109da8901","leng":"600"}}
// 错误：errno大于0，返回错误提示 errmsg；如{"errno":1,"errmsg":"必填账户名"}

//手机号

var r = http.get(mg_api + "clients/online/setWork?&token=" + LoginToken.blockedGet() + "&pid" + TheWolf_Project_ID + "&t=8&ascription=1");
r = r.body.json();
var sjh = r.ret.number;

// 请求地址：http://api.dk827.com/index.php/clients/online/setWork
// 请求方式：POST请求或GET请求
//   token=登录token&pid=项目ID&t=2&username=指定卡商帐号&gsid=001&ascription=8 
//  成功：手机号码number,端口号com_n ；如{"errno":0,"errmsg":"ok","ret":{"id":"4","username":"ceshi001","com_n":"com6","gsid":"002","number":"13829880004","ascription":"1382988","nteam":"2","locking":"0","uid":null,"inputtime":"1464010492"}}
//  错误：errno大于0，返回错误提示 errmsg



//验证码
var tag;
var k = 0; //一分钟获取
while (tag != 0 && k < 15) {
    toastLog("未获取到短信,等待5秒重试！");
    sleep(5000);
    var r = http.get(TheWolf_api + "clients/sms/getSms?&token=" + Token + "&project=" + TheWolf_Project_ID + "&number=" + phone + "&type=1");
    r = r.body.json();
    tag = r.errno
    if (tag == 0) {
        break;
    }
    k = k + 1;
}
var code = r.ret.tst
code = code.match(/\d+/g);
//  return code;

//   收短信验证码或发短信结果的请求地址：
//   http://api.dk827.com/index.php/clients/sms/getSms
//   请求方式：POST请求或GET请求
//  【收短信验证码】：token=登录token&project=项目ID&number=手机号码&type=1

// 成功：errno为0，errmsg为ok,如有ret返回则tst为获取的短信内容地址 ；如{"errno": 0,"errmsg":"ok", "ret": {"kid": 4931, "type": 3, "project": 136, "number": "13240583367", "tst": "短信内容"}}
// 错误：errno大于0，返回错误提示 errmsg




//释放手机号函数

var r = http.get(TheWolf_api + "clients/online/completeWork?token=" + LoginToken.blockedGet() + "&phone=" + phone);
var r = r.body.json();
var errno = r.errno;
if (errno > 0) {
    toastLog("手机号释放失败");
    //     return 0;
} else if (errno == 0) {
    toastLog("手机号释放成功！");
    //      return token
}
// 请求地址：http://api.dk827.com/index.php/clients/online/completeWork
// 请求方式：POST请求或GET请求
// 请求参数(以下方式任选一种)：
// 1、token=登录token 
// 2、token=登录token&number=手机号码 （强烈推荐传入号码进行释放，否则会影响你取的其他号码接收验证码）
// 成功：errno为0 ；如{"errno":0,"errmsg":"ok"}
// 错误：errno大于0，返回错误提示 errmsg