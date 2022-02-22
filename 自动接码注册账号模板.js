//登陆解码平台
///*
//仅供学习和测试，请勿用于非法途径。

var 账户名称 = "";//输入易码账号
var 账户密码 = "";//输入易码密码
var url ="http://api.fxhyd.cn/UserInterface.aspx?action=login+&username="+账户名称+"&password="+账户密码

r = http.postJson(url, {
    key: "",
    info: "",
    userid: "",
});
log();
var a=r.body.string();
var token=a.substring(a.lastIndexOf('|')+1);
console.log(token); 

//获取手机号
var 项目编码 = "387";
var 排除号段 = "170.171.172.173.174.175.184.";

var 手机号 ="http://api.fxhyd.cn/UserInterface.aspx?action=getmobile&token="+token+"&itemid="+项目编码+"&excludeno="+排除号段+".&timestamp=TIMESTAMP"

手机号 = http.postJson(手机号, {
    key: "",
    info: "",
    userid: "",
});
log();
var a=手机号.body.string();
var 手机号=a.substring(a.lastIndexOf('|')+1);
console.log(手机号); 
setText("0",手机号)
//获取短信接口
var i=0
while(i<12) {
   
 var 短信="http://api.fxhyd.cn/UserInterface.aspx?action=getsms&token="+token+"&itemid="+项目编码+"&mobile="+手机号+"&release=1&timestamp=TIMESTAMP"
验证码 = http.postJson(短信, {
    key: "",
    info: "",
    userid: "",
});
var a=验证码.body.string();

var num= a.replace(/[^0-9]/ig,"");

log(num);//4500

sleep(5000);
if( num==3001){
    sleep(5000);
}else{

    break;
}
i =i+1;

}
log("跳出循环")
setText("1",num)