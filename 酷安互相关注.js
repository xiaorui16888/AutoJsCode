"auto";

//酷安互相关注
//需要酷安客户端支持

toast("正在启动酷安");
launch("com.coolapk.market");
sleep(2000);
while(!click("酷市场"));
while(!click("我"));
while(!click("关注我的人"));
toast("五秒后将开始互相关注，请确认！")
sleep(5000);
while(true){
for(var i=0;i<11;i++){
click("未关注");}
id("recycler_view").scrollable().scrollForward();}