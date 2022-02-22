
var kind=dialogs.select("选择模式",["单独图片/单独文件","图片及文件"]);
var times=dialogs.rawInput("转发次数");
launchApp("QQ");
sleep(3000);
toast("即将开始 请发送 Start 至对话好友");
id("chat_item_content_layout").text("Start").waitFor();
switch(kind){
  case 0:
   var finish=0;
   var file=1;
var swi=0;
var swip=0;
var clicka=0;
var sn=0;
var number=id("chat_item_content_layout").find().size();  
var num=number;//位置
   while(finish<times){
       if(id("chat_item_content_layout").exists()){
          var nu=id("chat_item_content_layout").find().size();
          //alert(nu);
          var nnn=nu-2;
var chat_id=id("chat_item_content_layout").find().get(nnn);
var cenx=chat_id.bounds().centerX();
var ceny=chat_id.bounds().centerY();
longClick(cenx,ceny);
sleep(300);
desc("转发").findOne().click();
//var objects=files.read("/sdcard/QQqun/No." + file+".txt");
sleep(500);
text("选择群聊").waitFor();
id("name").text("选择群聊").findOne().click();
sleep(500);
var nm=id("text1").find().size();
if(clicka==nm){
    clicka=0;
    swip=swip+1;
    swi=swi+1;}
    sleep(200);
    while(sn<swip){
           
    swipe(450,1910,450,230,200);
    sn++}
        sn=0;
var areaa=id("text1").find().get(clicka).bounds();
var cenxd=areaa.centerX();
var cenyd=areaa.centerY();
click(cenxd,cenyd);
sleep(300);
if(textContains("发送给 ").exists()){
id("dialogRightBtn").desc("发送").findOne().click();}
sleep(500);
clicka=clicka+1;
file=file+1;}
finish++}

break;
case 1:
   var finish=0;
   var file=1;
   var swi=0;
var swip=0;
var clicka=0;
var sn=0;
   while(finish<times){
if(id("chat_item_content_layout").exists()){
          var nu=id("chat_item_content_layout").find().size();
          //alert(nu);
          var num=nu-3;
          var nnn=nu-2;
var chat_id=id("chat_item_content_layout").find().get(nnn);
var cenx=chat_id.bounds().centerX();
var ceny=chat_id.bounds().centerY();
longClick(cenx,ceny);
sleep(300);
desc("转发").findOne().click();
//var objects=files.read("/sdcard/QQqun/No." + file+".txt");
sleep(300);
text("选择群聊").waitFor();
id("name").text("选择群聊").findOne().click();
sleep(500);
var nm=id("text1").find().size();
if(clicka==nm){
    clicka=0;
    swip=swip+1;}
    sleep(300);
    while(sn<swip){
           
    swipe(450,1910,450,230,200);
    sn++}
        sn=0;
var areaa=id("text1").find().get(clicka).bounds();
var cenxd=areaa.centerX();
var cenyd=areaa.centerY();
click(cenxd,cenyd);
sleep(500);
if(textContains("发送给 ").exists()){
id("dialogRightBtn").desc("发送").findOne().click();}
sleep(300);
/////
var chat_idb=id("chat_item_content_layout").find().get(num);
var cenxb=chat_idb.bounds().centerX();
var cenyb=chat_idb.bounds().centerY();
longClick(cenxb,cenyb);
sleep(300);
desc("转发").findOne().click();
//var objects=files.read("/sdcard/QQqun/No." + file+".txt");
sleep(300);
text("选择群聊").waitFor();
id("name").text("选择群聊").findOne().click();
sleep(500);
sleep(300);
var areaab=id("text1").find().get(clicka).bounds();
var cenxdb=areaab.centerX();
var cenydb=areaab.centerY();
click(cenxdb,cenydb);
sleep(500);
if(textContains("发送给 ").exists()){
id("dialogRightBtn").desc("发送").findOne().click();}
sleep(500);
clicka=clicka+1;
file=file+1;}
finish++}
break;}