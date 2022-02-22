//悬浮音乐播放器:只能播放QQ音乐或酷狗音乐里面下载的歌曲
//当一首歌播放完之后默认为随机播放一首歌
//♢点击:暂停或者播放,拖动:移动大窗口,长按:关闭本脚本。
//↹点击:随机播放一首歌
//◎点击:大小化窗口切换
//▽点击:打开歌单选择歌曲播放
//↑点击:播放上一首歌
//↓点击:播放下一首歌
//««触动:触摸时间越长快退距离越长
//»»触动:触摸时间越长快进距离越长
//△点击:在已有歌曲中搜索


setScreenMetrics(1080, 1920);//设置所适合的屏幕

var window = floaty.window( //小七注：新建一个悬浮窗口。

     <vertical alpha="0.4" bg="file:///storage/emulated/0/tencent/QQ_Images/null7269572719f0eff6.jpg"> 
     //小七注：alpha是设置透明度的，其值是一个0~1之间的小数，0表示完全透明，1表示完全不透明。
     //bg是设置背景，其值可以是一个路径指向的图片，或者RGB格式的颜色。
     //vetical是垂直布局。（垂直布局 1 ）

      <horizontal alpha="1">
      //小七注：horizontal是水平布局。（水平布局 1-1）

       <text id="text0" w="178px" gravity="center" textColor="#000000"/>
       //小七注：text添加一个文本显示控件， w设置控件的宽度。
       //gravity设置显示的文本在文本显示框内的相对位置，center是居中。
       //textColor设置文本颜色。
       //id相当于这个控件的名字，后面的程序需要对这个控件进行操作时，id用来定位这个控件。

       <text id="text1" w="178px" gravity="center" textColor="#000000"/>
       <text id="text2" w="178px" gravity="center" textColor="#000000"/>
       <text id="text3" w="178px" gravity="center" textColor="#000000"/>
       <text id="text4" w="178px" gravity="center" textColor="#000000"/>

      </horizontal> //小七注：水平布局截止。（水平布局 1-1 截止）

      <horizontal alpha="0.5"> //小七注：建立一个水平布局，设置透明度为0.5。（水平布局 1-2）

       <vertical> //小七注：建立一个垂直布局。（垂直布局 1-2-1）

        <button text="◎" id="butA" textSize="50sp" w="178px" h="90"/>
        //小七注：button添加一个按钮控件。

        <button text="B" id="butB" textSize="50sp" w="178px" h="90"/>

       </vertical> //小七注：垂直布局截止。（垂直布局 1-2-1 截止）

       <vertical> //小七注：建立一个垂直布局。（垂直布局 1-2-2）

        <horizontal>//小七注：建立一个水平布局。（水平布局 1-2-2-1）

         <button text="↹" id="but1" textSize="24sp" w="178px" h="178px"/>
         <button text="↑" id="but2" textSize="24sp" w="178px" h="178px"/>
         <button text="▽" id="but3" textSize="24sp" w="178px" h="178px"/>

        </horizontal>  //小七注：水平布局截止。（水平布局 1-2-2-1 截止）

        <horizontal>  //小七注：建立一个水平布局。（水平布局 1-2-2-2）

         <button text="««" id="but4" textSize="24sp" w="178px" h="178px"/>
         <button text="♢" id="but5" textSize="24sp" w="178px" h="178px" textColor="#ff0000"/>
         <button text="»»" id="but6" textSize="24sp" w="178px" h="178px"/>

        </horizontal>  //小七注：水平布局截止。（水平布局 1-2-2-2 截止）

        <horizontal>  //小七注：建立一个水平布局。（水平布局 1-2-2-3）

         <button text="7" id="but7" textSize="24sp" w="178px" h="178px"/>
         <button text="↓" id="but8" textSize="24sp" w="178px" h="178px"/>
         <button text="△" id="but9" textSize="24sp" w="178px" h="178px"/>

        </horizontal>  //小七注：水平布局截止。（水平布局 1-2-2-3 截止）

       </vertical>  //小七注：垂直布局截止。（垂直布局 1-2-2 截止）

       <vertical> //小七注：垂直布局。（垂直布局 1-2-3）

        <button text="◎" id="butC" textSize="50sp" w="178px" h="90"/>
        <button text="D" id="butD" textSize="50sp" w="178px" h="90"/>

       </vertical> //小七注：垂直布局截止。（垂直布局 1-2-3 截止）

      </horizontal>   //小七注：水平布局截止。（水平布局 1-2 截止）

      <text id="text" w="*" lines="1" gravity="center" textColor="#000000"/>

     </vertical> //小七注：垂直布局截止。（垂直布局 1 截止）
);

function bianju(){

var A=new Array;  //小七注：新建一个数组。

A.push(daxiao[DX][0]/2-60,daxiao[DX][1]/2-60,device.width-(daxiao[DX][0]/2-60),device.height-(daxiao[DX][1]/2-60)-90);
 //小七注：A.push(元素1，,元素2……)是向数组A的末尾添加新的元素，返回值是数组新的长度（length属性）。
  //daxiao是定义的一个数组，DX是定义的一个变量，在后面的程序中可以看到。
  //device.width获取屏幕的宽度  device.height获取屏幕的高度。

return A;  //小七注：数组A作为这个自定义函数的返回值。
}

function windowGXY(x,y,k){
if(x<k[0]){x=k[0]};
if(k[2]<x){x=k[2]};
if(y<k[1]){y=k[1]};
if(k[3]<y){y=k[3]};
return [x,y];
}

function setontouch(){

var A=arguments;  //小七注：arguments是调用函数时，写入函数括号内的参数组成的数组。（也成为隐式参数）

var K=new Array;

for(var i=0;i<A.length;i++){  //小七注：A.length 获取数组A中元素的数量。

K.push(" window.but"+A[i]+".setOnTouchListener(function(view, event){switch(event.getAction()){case event.ACTION_DOWN: butkg"+A[i]+"=true;return true;case event.ACTION_MOVE:return true;case event.ACTION_UP: butkg"+A[i]+"=false;return true;}return true;});");
}
return K.join("");  //小七注：K.join(分割符) 把数组K中的元素整合为一个字符串，两个元素之间填充分隔符，返回整合后的字符串。
}

function setvar(){
var A=arguments;
var K=new Array;
for(var i=0;i<A.length;i++){
K.push("butkg"+A[i]+"=false");
}
return "var "+K.join(",")+";";
}

function shuzuG(a,b){
var k=new Array;
for(var i=0;i<a.length;i++){

k.push(files.join(b,a[i]));   //小七注：files.join(父路径，子路径)把两个路径连接起来，返回连接后的路径。

}
return k;
}

function souge(A,B){
//在B组里搜含A字
var C=new Array,D=new Array;

A=escape(A).replace(/%/g, "\\");
//小七注：escape() 函数可对字符串进行编码，这样就可以在所有的计算机上读取该字符串。
//该方法不会对 ASCII 字母和数字进行编码，也不会对下面这些 ASCII 标点符号进行编码：
// * @ - _ + . / 。其他所有的字符（包括汉字）都会被转义序列替换。

eval("var re=/"+A+"/;"); //eval(字符串)会把字符串当作一个程序语句来执行。

for(var i=0;i<B.length;i++){

if(re.test(B[i])){
//小七注：test() 方法用于检测一个字符串是否匹配某个模式。如果字符串中有匹配的值返回 true ，否则返回 false。

C.push(i);D.push(B[i]);
}
}
return [C,D];
}

function saoge(dirs){
var Paths=new Array,Files=new Array;
for(var i=0;i<dirs.length;i++){
if(files.isDir(dirs[i])){ //小七注：files.isDir(路径) 判断该路径是否是文件夹。

var File=files.listDir(dirs[i], function(name){ 
	return (name.endsWith(".m4a")||name.endsWith(".mp3")) && files.isFile(files.join(dirs[i], name)); 
});  //小七注：files.listDir(路径[, 筛选函数]) 列出路径下使筛选函数返回值为真的文件夹和文件。

if(File.length>0){

Files=Files.concat(File.join("☆").split("☆"));
//小七注：字符串.split(分割字符) 把一个字符串分割成字符串数组，
//分割位置是字符串中所有的 分割字符所在的位置，同时分隔字符也会被删掉，而不会出现在分割后的数组中。
//数组1.concat(数组2,数组3……) 把多个数组连接起来，返回一个拼凑而成的新数组，而不会影响以前的数组。

Paths=Paths.concat(shuzuG(File,dirs[i]));
}}}
if(Files.length>0){return [Paths,Files];}
}

function yidang(A,B){
var sx=A[2]-A[0],sy=A[3]-A[1];

var sd=weiyi(sx,sy,0)/25;
//小七注：weiyi()是自定义函数，大概位于本脚本五百一十多行。

var X=sx/sd,Y=sy/sd;
var x=0,y=0;
for(var i=0;i<sd;i++){
x+=X;y+=Y;
sleep(5);
B.setPosition(A[0]+x,A[1]+y);//小七注：悬浮窗.setPosition(x,y) 设置悬浮窗位置。
}
B.setPosition(A[2],A[3]);
}




//函数分段区
//函数分段区
//函数分段区
//函数分段区
//函数分段区





sleep(100);
window.setPosition((device.width-window.getWidth())/2+1,(device.height-window.getHeight())/2);
var DX=0,daxiao=[ [ 960, 726 ], [ 250, 390 ] ];


var dir = ["/sdcard/qqmusic/song",
"/sdcard/kgmusic/download"];

var PathFile=saoge(dir);
var m4apath=PathFile[0],m4afile=PathFile[1];
if(m4afile.length<=0){toast("没有歌曲");exit();}

ui.run(function() {
var A=m4afile.length;
A=A.toString();
window.text4.setText(A);
});
var gq=0;

var kg=false,kg2=false;
var varkg=setvar("A","B","C","D","1","2","3","4","6","7","8","9");
eval(varkg);

var vartouch=setontouch("B","C","D","1","2","3","4","6","7","8","9");
eval(vartouch);

setInterval(()=>{runTick();}, 50);


//记录按键被按下时的触摸坐标
var x,y,sx,sy,dx,dy;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var Akeep=false,yidong=false,Time=0;

window.but5.setOnTouchListener(function(view, event){
//小七注：悬浮窗控件.setOnTouchListener() 控件触摸监听函数。

switch(event.getAction()){ //小七注：事件.getAction() 获取事件中的动作信息。

case event.ACTION_DOWN: 
x = event.getRawX(); //小七注：event.getRawX() 获取触摸事件中按下位置的x坐标。
y = event.getRawY();
windowX = window.getX(); //小七注：悬浮窗.getX() 获取悬浮窗当前位置的x坐标。
windowY = window.getY();
Akeep=true;//按下,开启计时
return true;

case event.ACTION_MOVE:
sx=event.getRawX() - x;       
sy=event.getRawY() - y;
if(!yidong&&weiyi(sx,sy,0)>=50){yidong=true;dx=sx;dy=sy};
if(yidong){
window.setPosition(windowX +sx-dx,windowY+sy-dy);
}
return true;

case event.ACTION_UP:
if(!yidong&&Time<7){
if(!kg){anjian(1);}else{anjian(5)}
}
Akeep=false;
Time=0;
if(yidong){
var gx=Math.round(windowX +sx-dx),gy=Math.round(windowY+sy-dy);
var xy=windowGXY(gx+window.getWidth()/2,gy+window.getHeight()/2,bianju());
window.setPosition(xy[0]-window.getWidth()/2,xy[1]-window.getHeight()/2);
yidong=false;
};
return true;
}
return true;
});




window.butA.setOnTouchListener(function(view, event){
switch(event.getAction()){
case event.ACTION_DOWN:
x = event.getRawX();
y = event.getRawY();
windowX = window.getX();
windowY = window.getY();
return true;

case event.ACTION_MOVE:
sx=event.getRawX() - x;       
sy=event.getRawY() - y;
if(!yidong&&DX==1&&weiyi(sx,sy,0)>=50){yidong=true;dx=sx;dy=sy};
if(yidong){
window.setPosition(windowX +sx-dx,windowY+sy-dy);
}
return true;

case event.ACTION_UP:
if(!yidong){
butkgA=true;
}
if(yidong&&DX==1){
var gx=Math.round(windowX +sx-dx),gy=Math.round(windowY+sy-dy);
var xy=windowGXY(gx+window.getWidth()/2,gy+window.getHeight()/2,bianju());
window.setPosition(xy[0]-window.getWidth()/2,xy[1]-window.getHeight()/2);
yidong=false;
};
return true;
}
return true;
});



function runTick(){
if(kg){
var jindu=Math.round(media.getMusicCurrentPosition()/media.getMusicDuration()*1000)/10;
var jindu1=Math.round(media.getMusicCurrentPosition()/100)/10;
ui.run(function() {
window.text0.setText(jindu.toString());
window.text1.setText(jindu1.toString());
});
if(media.getMusicCurrentPosition()>=media.getMusicDuration()-100)
{
media.stopMusic();
anjian(1);
}

}

//每秒二十次
if(Akeep){
Time++;//计时
if(!yidong&&Time>20){
//非移动且按下时长超过1秒判断为长按
media.stopMusic();
sleep(100);
window.close();
toast("已停止运行");
exit();
}
}

if(butkg1){
butkg1=false;
anjian(1);
}

if(butkg3){
butkg3=false;
anjian(3);
}

if(butkg2){
butkg2=false;
anjian(2);
}

if(butkg8){
butkg8=false;
anjian(8);
}

if(butkg4){
anjian(4);
}

if(butkg6){
anjian(6);
}

if(butkgA||butkgC){
butkgA=false;
butkgC=false;
tiaohuan();
}

if(butkg9){
butkg9=false;
var name = rawInput("请搜歌曲");
if(name){
var ge=souge(name,m4afile);
var i = dialogs.select("搜索结果", ge[1]); 
if(i >= 0){ 
gq=ge[0][i]; 
kg=false;
kg2=false;
anjian(5);
}

}}

}

function onClick(){
try{

}catch(e){toast(e);}
}

function tiaohuan(){
var x=window.getX()+(daxiao[DX][0]/2);
if(DX==0){
DX=1;
var x_y=bianju();
//log(x_y)
ui.run(()=>{
window.setSize(daxiao[DX][0], daxiao[DX][1]);
});
//window.setPosition(device.width/2-daxiao[DX][0]/2,window.getY());
//sleep(500)
if(x<=device.width/2){

yidang([device.width/2+daxiao[0][0]/2-daxiao[1][0],window.getY(),x_y[0]-daxiao[DX][0]/2,window.getY()],window);
//小七注:yidang() 自定义函数，大概位于脚本一百八十多行处。

}else{
yidang([device.width/2-daxiao[0][0]/2,window.getY(),x_y[2]-daxiao[DX][0]/2,window.getY()],window);
};
}else{
DX=0;
ui.run(()=>{//小七注：用UI线程运行（修改悬浮窗的参数需要用ui线程）

window.setSize(daxiao[DX][0], daxiao[DX][1]);//小七注：悬浮窗.setSize()设置悬浮窗的大小。
});
var xay=windowGXY(x,window.getY()+daxiao[DX][1]/2,bianju()); 
//小七注:windowFXY() 自定义函数，大概位于脚本一百行处。

if(x<=device.width/2){
yidang([xay[0]-daxiao[DX][0]/2-daxiao[DX][0],xay[1]-daxiao[DX][1]/2,xay[0]-daxiao[DX][0]/2,xay[1]-daxiao[DX][1]/2],window);
}else{
yidang([xay[0]-daxiao[DX][0]/2+daxiao[DX][0],xay[1]-daxiao[DX][1]/2,xay[0]-daxiao[DX][0]/2,xay[1]-daxiao[DX][1]/2],window);
}
}
}

function anjian(K){
switch(K){
case 5:
if(!kg){ 
media.playMusic(m4apath[gq]);
//media.musicSeekTo(51 * 1000);
ui.run(function() {
var A=Math.round(media.getMusicDuration()/100)/10;
var B=(gq+1).toString();
var C=m4afile[gq];
window.text.setText(C.toString());
window.text2.setText(A.toString());
window.text3.setText(B);
});
kg=true;
kg2=true;
}else{
if(kg2){media.pauseMusic();kg2=false}else{media.resumeMusic();kg2=true}
}
break ;
case 6:
media.musicSeekTo(media.getMusicCurrentPosition()+1000);
break ;
case 4:
media.musicSeekTo(media.getMusicCurrentPosition()-1000);
break ;
case 2:
gq--;
if(gq<0){gq=m4apath.length-1};
kg=false;
kg2=false;
anjian(5);
break ;
case 8:
gq++;
if(gq>m4apath.length-1){gq=0};
kg=false;
kg2=false;
anjian(5);
break ;
case 3:

var i = dialogs.select("请选择一个歌曲", m4afile); 
if(i >= 0){ 
gq=i; 
kg=false;
kg2=false;
anjian(5);
}

break ;
case 1:
kg=false;
kg2=false;
gq=Math.floor(Math.random()*m4afile.length);
anjian(5);
break ;
case "A":

break ;
case "B":

break ;
}
}


function weiyi(a,b,c){var a,b,c;return Math.round(Math.sqrt(a*a+b*b+c*c)*1000)/1000}
//小七注：Math.round(数字) 返回最接近该数字的整数，按照四舍五入的方式。
//Math.sqrt(数字) 返回该数字的平方根。如果该数字是负数，则返回NaN。

function round_A(a,b){return Math.round(b*a)/a}

function jueduizhi(a) {
  var a;
  if (a < 0) {
    return -a;
  } else {
    return a;
  }
}

function dir_abcd(a,b,c,d){
var A=a.split(b);
var K=new Array;
var kg=false;
for(var i=0;i<A.length;i++){
if(i==c||i==A.length+c){kg=true};
if(kg){K.push(A[i])};
if(i==d||i==A.length+d){kg=false};
}
return b+K.join(b);
}