requestScreenCapture();
var window = floaty.window(
    <frame>
        <button id="action" text="记起点" w="90" h="40" bg="#77000000"/>
    </frame>
);
console.show();
setInterval(()=>{
awc = 10; 
function capturescreen() {
while (true) {
if (ajt = captureScreen()) {
return ajt;
break;
}
}
} 
function qs(a, b, c) {
return images.pixel(a, b, c);
} 
function abs(a7, a8) {
if (Math.abs(colors.red(a7) - colors.red(a8)) < awc && Math.abs(colors.green(a7) - colors.green(a8)) < awc && Math.abs(colors.blue(a7) - colors.blue(a8)) < awc) {
return true;
} else {
return false;
}
} 
var vid=1.23;
function akzt() {
new java.lang.Thread(function() {
packageName("com.stardust.scriptdroid").className("android.widget.EditText").setText("1.13");
}).start();
vid=console.rawInput("点击确定开始执行\nQQ:787067033,拖到左下角,自己写系数,系数越大飞得越远", "");
} 
function akzt2() {
new java.lang.Thread(function() {
packageName("com.stardust.scriptdroid").className("android.widget.EditText").setText("暂停");
kz=console.rawInput("点击确定暂停脚本", "");
}).start();
} 
function zrw(a) {
var pos = findColor(a, "#383653",{
region: [100,510,979,1090],
threshold: 4
});
if (!pos) {
return null;
}
pos.x+=-3;
pos.y+=185;
return pos;
} 
function zdd0(tp,tmp) {
var y1=0;
    var pxt1=100;
    var pxt2=510;
    //log(tmp);
    if(tmp<540){pxt1=570;pxt2=980;}
for (var y0 = 510; y0 < 980; y0 +=10) {
var  ys = qs(tp, 1, y0);
for (var x0=pxt1; x0<pxt2; x0 +=10) {
if (abs(ys, qs(tp, x0, y0))) {
} else {
y1=y0;
y0 = 1090;
x0 = pxt2;
}
}
}
if(y1==0){return false;}
var as3=0;
var as4=0;
for(y0=y1;y0>510;y0--){
var as1 = 0;
var as2 = 0;
var ok=0;
for (x0 = pxt1; x0 < pxt2; x0++) {
if (abs(ys, qs(tp, x0, y0))) {
if (as1 != 0 && as2 == 0) {
as2 = x0;
}
ok++;
} else {
if (as1 == 0) {
as1 = x0;
}
}
}
if(ok==410){y0=510;}else{
as3=as1;as4=as2;}
}
var as = parseInt((as3 + as4-1) / 2);
return as;
} 
kz=1;
while (true) {
x=0;xk=0;if(kz!=0){akzt();kz=0;
                   akzt2();
                  }
while(true){
sleep(100);
tp = capturescreen();
rwzb=zrw(tp);
if(rwzb!=null){if(x!=rwzb.x){
x=rwzb.x;
}else{
xk++;
if(xk>2){break;}
}}
}
    rwzb.y+=3;
//log(rwzb.x+","+rwzb.y);
    window.setPosition(rwzb.x-37, rwzb.y-37);
ddzb=zdd0(tp,rwzb.x)+5;
dcx=563;
dcy=981;
qx=ddzb;
qy=parseInt(dcy-Math.abs((qx-dcx)/1.725));
//console.info(qx+","+qy);
    window.setPosition(qx-37, qy-37)
x=Math.abs(qx-rwzb.x);
y=parseInt((rwzb.y-qy)*(1.725));
//log(Math.abs(x-y));//x+","+y);
time=Math.sqrt((x*x)+(y*y))*vid;
    //log(parseInt(Math.sqrt((x*x)+(y*y))));
time2=x*1.66;
    //akzt();
press(963,1588,time);
sleep(500);window.setPosition(0,0);
}
    },1000);