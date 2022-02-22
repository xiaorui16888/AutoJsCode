"auto";
var wb = rawInput("请输入验证信息");

if(wb == ""){
    toast("请输入验证信息！")
}
else{
toast("请选择你要打招呼的附近人！")
while(true)
{
if(currentActivity() == "com.tencent.mm.plugin.profile.ui.ContactInfoUI"){
while(!click("打招呼"));
while(!input(wb));
while(!click("发送"));
sleep(1000)
while(!click(0,66,144,210));
}
}
}
//脚本作者QQ:417843676