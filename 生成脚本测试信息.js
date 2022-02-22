var timeAry=new Date().toLocaleString().split(" ");
var str = "/**";
str += "\n*作者QQ: " + dialogs.prompt("作者QQ","1");
str += "\n*完成时间: " +timeAry[0]+" "+timeAry[2] ;
str += "\n*测试机型: " + device.product;
str += "\n *Auto.js版本: " + app.autojs.versionName;
str += "\n *屏幕: " + device.width+"*"+device.height;
str += "\n *API: " + device.sdkInt;
str += "\n*备注: " +  dialogs.prompt("脚本备注","暂无备注");;
str += "\n**/";

toastLog(str);

setClip(str);