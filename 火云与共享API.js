//感谢QQ34023457无羡ﻬ.提供Thewolf源码
//如果bug请告之1665205190


var hy_api = "http://huoyun888.cn/api/do.php?";//共享换一下API地址就可以使用

var Account_Api="";
var PassWord="";
//function 火云登录及获取手机号(){
for(var i = 8; i > 0; i--){
//token
var r = http.get(hy_api +"action="+ "loginIn&name=" + Account_Api + "&password=" + PassWord);
//log(r);
var rr = r.body.string();
log(rr);


var 登陆分割后的数据 = rr.split("|");
     log(登陆分割后的数据);
    var 登陆状态=登陆分割后的数据[0];
    log(登陆状态);
   var 口令 = 登陆分割后的数据[1];
   log(口令);
//var token = r.ret.token;

if (登陆状态 =1) {
   toastLog("登录成功");
   sleep(1000)
} else  {
   toastLog("登录不成功！");
  
   


}
var 项目id="2111"
var s = http.get(hy_api +"action="+ "getPhone" +"&sid="+ 项目id+ "&token=" + 口令+ "&vno=" + 0);
//log(s)
var ss= s.body.string();
log(ss)
var 获取手机号分割后的数据 = ss.split("|");
       var 获取手机号状态=获取手机号分割后的数据[0];
        var 手机号 = 获取手机号分割后的数据[1];
log(获取手机号状态)
log(手机号)
if(获取手机号状态 =1) {
   手机号1=手机号.substring(2,0);
   log(手机号1);
   手机号2=parseInt(手机号1);
   log(手机号2);
   if(手机号2==17||手机号2==19||手机号2==14||手机号2==16){
      for(var u = 5; u > 0; u--){
      var w= http.get(hy_api +"action="+ "gaddBlacklist" +"&sid="+ 项目id+ "&token=" + 口令+ "&phone=" + 手机号);
      log(w)
      var ww= w.body.string();
      log(ww) 
      var 分割拉黑号码 = ww.split ("|")
      var 拉黑状态= 分割拉黑号码[0]
      if(拉黑状态=1){
         sleep(1000)
         log("拉黑")
         break
       } }
   }else{input(手机号);
   break}
}else{
log("获取手机号")}
if(i==1){exit()}
}
//}
//获取验证码
for(var ii = 15; ii > 0; ii--){
   log(ii)
   sleep(3000);
var p = http.get(hy_api +"action="+ "getMessage" +"&sid="+ 项目id+ "&token=" + 口令+ "&phone=" + 手机号);
log(p)
var pp= p.body.string();
log(pp)
        
        var 分割验证码 = pp.split ("|")
        var 验证码结果 =  分割验证码[0]
        var 验证码结果1 =  分割验证码[1]
        log(验证码结果1)
        if(验证码结果==1){
         //var code = r.ret.tst
         //log(code)
         code = 验证码结果1.match(/\d+/g)  
         log(code)
         code1=code[0]//自己查看一下验证码在数组的第几位
         log(code1)
         input(code1)
         break
        }

       if(ii==1){for(var u = 5; u > 0; u--){
          w= http.get(hy_api +"action="+ "gaddBlacklist" +"&sid="+ 项目id+ "&token=" + 口令+ "&phone=" + 手机号);
         log(w)
          ww= w.body.string();
         log(ww) 
          分割拉黑号码 = ww.split ("|")
          拉黑状态= 分割拉黑号码[0]
         if(拉黑状态=1){
            sleep(1000)
            log("拉黑")
            break
        } }
       }

}