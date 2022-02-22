function akzt0() {
  new java.lang.Thread(function() {
    while (packageName("com.stardust.scriptdroid").id("input").findOne().getText() == null);
    while (!packageName("com.stardust.scriptdroid").id("submit").findOne().click());

  }).start();
}
function acs(){
a0=new Array();
a1=11;
a2=10;
b1=5;
b2=5;
for(i0=0;i0<=a1;i0++){
a0[i0]=new Array();
for(i1=0;i1<=a2;i1++){
a0[i0][i1]="┼";
}
}
a0[b1][b2]="◎";
ab="┼";
}//初始化棋盘
function ahz(){
a3="";
for(i0=0;i0<=a2;i0++){
a3=a3+"\n";
for(i1=0;i1<=a1;i1++){
a3=a3+a0[i1][i0];
}
}
return a3;
}//返回整张棋盘数据
function bcz(b0){
b20=b2;
b10=b1;
if(b0==2){
if(b2>0){b2--;}
}
if(b0==6){
if(b1<a1){b1++;}
}
if(b0==8){
if(b2<a2){b2++;}
}
if(b0==4){
if(b1>0){b1--;}
    }
if(b1!=b10||b2!=b20){a0[b10][b20]=ab;ab=a0[b1][b2];a0[b1][b2]="◎";ah();}          
if(b0==5){
if(ab="┼"){a0[b1][b2]="○";ab="○";ah();}
}
if(b0==1){
if(ab="┼"){a0[b1][b2]="●";ab="●";ah();}
}
if(b0==3){
setClip(ahz());
}
}//操作
function c0(){
c1=0;
for(i0=0;i0<=a1;i0++){
for(i1=0;i1<=a2;i1++){
if(a0[i0][i1]=="┼"){c1++;};
}
}
c2=random(1,c1);
c1=0;
for(i0=0;i0<=a1;i0++){
for(i1=0;i1<=a2;i1++){
if(a0[i0][i1]=="┼"){c1++;if(c1==c2){a0[i0][i1]="●"}};
}
}
ah();
setClip(ahz());
}//系统操作
function ah(){
b3=ahz();
clearConsole();
log(b3);}//刷新显示
openConsole();
acs();
log(ahz());
while(true){
akzt0();
bcz(console.rawInput());

}

//log("┼┼┼┼┼\n┼┼┼┼┼┼\n○◌◎●○◌◎●○◌◎●○◌◎●○◌◎●○◌◎●")