while(1)
{
var handsome = confirm("继续嘛？");
if(handsome){
     var me=dialogs.rawInput("我要说:");
 var url = "http://www.tuling123.com/openapi/api";
 r = http.postJson(url, { key: "65458a5df537443b89b31f1c03202a80", 
 info: me, userid: "1", }); 
 var str=JSON.stringify(r.body.string());
 
 var res=JSON.parse(str);
 var a=JSON.parse(res).text;
 console.show();
 log("我:      "+me);
 log("沙雕网友: "+a);
}else{
    log("机器人离开了房间");
   exit();
}

 }

 
 