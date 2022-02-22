//*******************************************************************************************************************
console.show();
while(true){
var name="/sdcard/脚本/1.mp3"
var str=console.rawInput("输入要发送的语音内容","");
语音合成(str,name);
console.info(str);
var QQ="787067033"
var date=new Date();
var 年=f(date.getYear()+1900,4);
var 月=f(date.getMonth()+1,2);
var 日=f(date.getDate(),2);
function f(str,leng){
str=str.toString();
return new Array(leng-str.length+1).join("0")+str;
}
var path = "/storage/emulated/0/Tencent/MobileQQ/"+QQ+"/ptt/"+年+月+"/"+日+"/"
//alert(path);
files.removeDir(path)
sleep(200)
files.ensureDir(path)
//toast(arr)
bounds(0,1809,154,1911).findOne().click()
sleep(200)
click("录音")
sleep(200)
bounds(379,1356,700,1677).find().click()
sleep(2000)
bounds(379,1356,700,1677).find().click()
//var arr = files.listDir("/sdcard/");
toast(path);
sleep(1000)
var fileName = files.listDir(path);
files.remove(path+fileName[0])
files.copy(name,path+fileName[0]);
sleep(200)
click("发送")
/*toast(date1)
toast(date2)*/
}




function 语音合成(str,path){
var str=str;
var url="http://www.xfyun.cn/herapi/solution/synthesis?vcn=x_yifeng&vol=7&spd=medium&textType=cn&textPut="+str;
var res=http.get(url).body.string();
eval("res="+res+".data");
var mp3=http.get(res).body.bytes();
files.writeBytes(path,mp3);
}
function f(str,leng){
str=str.toString();
return new Array(leng-str.length+1).join("0")+str;
}
