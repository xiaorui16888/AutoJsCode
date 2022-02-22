"ui";
acs();
ui.statusBarColor("#AA0000");
ui.layout(
    <frame background="#AA0000">
    <vertical align="top" margin="5">
		
       <text id="text" bg="#ffffff" h="430" gravity="center" color="#111111" size="16"></text>
     <linear>
    <vertical w="170">
   
    </vertical>
    <vertical>
    <linear> 
    <button margin="0 0 0 60" h="60" w="60" id="ashang" text="上"></button>
    </linear>
          <linear>
    <button h="60" w="60" id="azuo" text="左"></button>
    <button h="60" w="60" id="aok" text="ok"></button>
    <button h="60" w="60" id="ayou" text="右"></button>
    </linear>
        <linear>
    <button margin="0 0 0 60" h="60" w="60" id="axia" text="下"></button>
    </linear>
          </vertical>
    </linear>
    </vertical>
    </frame>
);
ui.text.text(ahz());
ui.ashang.click(() => {bcz(2);ui.text.text(ahz());});
ui.ayou.click(() => {bcz(6);ui.text.text(ahz());});
ui.axia.click(() => {bcz(8);ui.text.text(ahz());});
ui.azuo.click(() => {bcz(4);ui.text.text(ahz());});
ui.aok.click(() => {bcz(1);ui.text.text(ahz());});
function acs(){
a0=new Array();
a1=20;
a2=21;
b1=10;
b2=10;
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
for(i1=0;i1<=a1;i1++){
a3=a3+a0[i1][i0];
}
a3=a3+"\n";
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
if(b1!=b10||b2!=b20){a0[b10][b20]=ab;ab=a0[b1][b2];a0[b1][b2]="◎";}          
if(b0==5){
if(ab=="┼"){a0[b1][b2]="◌";ab="○";}
}
if(b0==1){
if(ab=="┼"){a0[b1][b2]="◉";ab="●";}
}
if(b0==3){
setClip(ahz());
}
}//操作