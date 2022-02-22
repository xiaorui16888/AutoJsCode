//天天爱消除经典模式自动
requestScreenCapture();

//下面4个参数根据自己手机修改
cx1=11;
cx2=925;
cy1=500;
cy2=1410;
/*第一个动物头方格左上角坐标11,500;
最后一个动物头方格左上角坐标925,1410;
*/
ab8=5;//比色误差(1到256之间整数)
cx0=(cx2-cx1)/6;
cy0=(cy2-cy1)/6;
cx="";
cy="";
for(ci=0.5;ci<=6.5;ci++){
cx=cx+parseInt(cx0*ci+cx1)+",";
cy=cy+parseInt(cy0*ci+cy1)+",";
}
b0=cx.split(",");;
b1=cy.split(",");;
function capturescreen() {
  while (true) {
    if (ab = captureScreen()) {
      return ab;
      break;
    }
  }
}


function ab0(ab1, ab2, ab3, ab4) {
  if(ab3>6||ab3<0||ab4>6||ab4<0){
     return false;
     }
  ab6 = d0[ab1][ab2];
  ab7 = d0[ab3][ab4];
  //log(colors.toString(ab6)+":"+colors.toString(ab7));
  if(Math.abs(colors.red(ab6) - colors.red(ab7)) < ab8 && Math.abs(colors.green(ab6) - colors.green(ab7)) < ab8 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < ab8) {
    return true;
  } else {
    return false;
  }
}

e=new Array();
for(e0=0;e0<=6;e0++){
e[e0]=new Array();
for(e1=0;e1<=6;e1++){
e[e0][e1]=new Array();
for(e2=0;e2<=6;e2++){
e[e0][e1][e2]=new Array();
for(e3=0;e3<=6;e3++){
e[e0][e1][e2][e3]=0;
}
}
}
}

function b11(aa1,aa2,aa3,aa4){
t2=(new Date()).getTime();
if(t2-e[aa1][aa2][aa3][aa4]>2000&&t3<2){
log(aa1+","+aa2+"移到"+aa3+","+aa4);
new java.lang.Thread(function() {
swipe(b0[aa1],b1[aa2],b0[aa3],b1[aa4],1);
}).start();
e[aa1][aa2][aa3][aa4]=t2;
t1++;
t3++;
}
}

while(true){
t1=0;
new java.lang.Thread(function() {
packageName("com.stardust.scriptdroid").className("android.widget.EditText").setText("点击确定->");                   
}).start();
console.rawInput("点击确定开始执行60秒\nQQ:787067033","");
t0=(new Date()).getTime();
main();
log("滑动"+t1+"次");
}

function main(){
b5=[1,2,1,2,3,1,2];
b6=[-1,-1,0,0,0,1,1];//右边是初始化坐标
b7=[-1,-2,-1,-2,-3,-1,-2];
d0=new Array();
for(d1=0;d1<=6;d1++){
d0[d1]=new Array();
}
a1000=0;
while(true){
d2= capturescreen();
t3=0;
for(d3=0;d3<=6;d3++){
for(d4=0;d4<=6;d4++){
d0[d3][d4]=images.pixel(d2, b0[d3], b1[d4]);
}
}
for(b3=0;b3<=6;b3++){
for(b4=0;b4<=6;b4++){
for(b8=0;b8<=3;b8++){
if(b8==0){b9=b5;b10=b6;};//右
if(b8==1){b9=b6;b10=b5;};//下
if(b8==2){b9=b7;b10=b6;};//左
if(b8==3){b9=b6;b10=b7;};//上

if(ab0(b3,b4,b3+b9[2],b4+b10[2])){
//相邻一样
if(ab0(b3,b4,b3+b9[1],b4+b10[1])){
//邪上一样
b11(b3+b9[1],b4+b10[1],b3+b9[3],b4+b10[3]);
}
if(ab0(b3,b4,b3+b9[4],b4+b10[4])){
//相相邻一样
b11(b3+b9[4],b4+b10[4],b3+b9[3],b4+b10[3]);
}
if(ab0(b3,b4,b3+b9[6],b4+b10[6])){
//邪下一样
b11(b3+b9[6],b4+b10[6],b3+b9[3],b4+b10[3]);
}
}
if(ab0(b3,b4,b3+b9[3],b4+b10[3])){
//相隔一样
if(ab0(b3,b4,b3+b9[0],b4+b10[0])){
//中上一样
b11(b3+b9[0],b4+b10[0],b3+b9[2],b4+b10[2]);
}
if(ab0(b3,b4,b3+b9[5],b4+b10[5])){
//中下一样
b11(b3+b9[5],b4+b10[5],b3+b9[2],b4+b10[2]);
}
}
}
}
}
if((new Date()).getTime()-t0>62000){
break;
}
}
}
