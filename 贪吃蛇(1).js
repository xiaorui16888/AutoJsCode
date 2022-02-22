"ui";shu="◌";
ui.statusBarColor("#555555");
ui.layout(
    <frame background="#555555">
    <vertical align="top" margin="5">
		
       <text id="text" gravity="center" bg="#ffffff" h="430"color="#111111" size="8"></text>
     <linear>
    <vertical w="170">
    <text id="scor" color="#000000" size="30"></text>
     
    </vertical>
    <vertical>
    <linear> 
    <button margin="0 0 0 60" h="60" w="60" id="ashang" text="上"></button>
    </linear>
          <linear>
    <button h="60" w="60" id="azuo" text="左"></button>
    <button h="60" w="60" id="aok" text="新"></button>
    <button h="60" w="60" id="ayou" text="右"></button>
    </linear>
        <linear>
    <button margin="0 0 0 60" h="60" w="60" id="axia" text="下"></button>
    </linear>
          </vertical>
    </linear>
    </vertical>
     <vertical bg="#00000000">
    <text id="textp" gravity="center"  h="430"color="#111111" size="100"/>
    </vertical>
    </frame>
);aacs();
ui.text.text(aahz());
setInterval(()=>{
    if((x!=0||y!=0)&&aa0[aasx[xt]][aasy[yt]]!=shu){
if(aasx[xt]+x<0||aasx[xt]+x>aa1||aasy[yt]+y<0||aasy[yt]+y>aa2){
    ui.textp.text("你输了");x=0;y=0;aa0[aasx[xt]][aasy[yt]]=shu;
}else{
    if(aa0[aasx[xt]+x][aasy[yt]+y]=="●"){ui.textp.text("你输了");x=0;y=0;aa0[aasx[xt]][aasy[yt]]=shu;}else if(aa0[aasx[xt]+x][aasy[yt]+y]=="☯"){
    aa0[aasx[xt]+x][aasy[yt]+y]="●";
  aasx[xt+1]=aasx[xt]+x;
  aasy[yt+1]=aasy[yt]+y;
    xt++;yt++;b0ai();
        scor+=1;ui.scor.text(scor+"分");
}else{
aa0[aasx[xt]+x][aasy[yt]+y]="●";
  aasx[xt+1]=aasx[xt]+x;
  aasy[yt+1]=aasy[yt]+y;
aa0[aasx[xw]][aasy[yw]]="┼";
    aasx[xw]=null;
    aasy[yw]=null;
    xt++;yt++;xw++;yw++;
 }}
    }
ui.text.text(aahz());
   // clearInterval(c0);return;
    }, 100); 
ui.ashang.click(() => {x=0;y=-1;});
ui.ayou.click(() => {x=1;y=0;});
ui.axia.click(() => {x=0;y=1;});
ui.azuo.click(() => {x=-1;y=0;});
ui.aok.click(() => {
  aacs();
});
function aacs(){
    scor=0;
ui.scor.text(scor+"分");
ui.textp.text("");
x=0;y=0;
aa0=new Array();
aasx=new Array();aasy=new Array();
aa1=40;
aa2=40;
 xt=0;yt=0;
 xw=0;yw=0;
i=0;
for(i0=0;i0<=aa1;i0++){
aa0[i0]=new Array();
for(i1=0;i1<=aa2;i1++){
aa0[i0][i1]="┼";
}
}
    aasx[0]=15;
    aasy[0]=15;
 aa0[aasx[0]][aasy[0]]="●";
    b0ai();
}//初始化棋盘
function aahz(){
aa3="";
for(i0=0;i0<=aa2;i0++){
for(i1=0;i1<=aa1;i1++){
aa3+=aa0[i1][i0];
}
aa3=aa3+"\n";
}
return aa3;
}//返回整张棋盘数据



function b0ai(){
while(true){
d0=random(0,aa1);d1=random(0,aa2);
if(aa0[d0][d1]=="┼"){aa0[d0][d1]="☯";break;}}
}









