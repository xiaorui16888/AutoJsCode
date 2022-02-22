"auto"
var w = rawInput("请输入回复的信息！");
var j = 0;

if(w == ""){
toast("请输入回复的信息！");  
}
    else
{
toast("请打我的瓶子界面!")
if(currentActivity() == "com.tencent.mm.plugin.bottle.ui.BottleConversationUI"){
var i =  id("r0").className("android.view.ViewGroup").untilFind();

while(j < i.size()){
i.get(i.size() - 1).click();
while(!input(w));
while(!click("发送"));
sleep(1000);
back();
sleep(500)
j = j + 1;
}
toast("发送完成！");
}
}
