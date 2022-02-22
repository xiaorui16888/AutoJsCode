"ui";
var tc="#111111"
var ts="50px"

var all=[[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],];
var r=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var w=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <frame>
                    <toolbar id="toolbar" title="计分器"/>
                    <button id="fz"text="一键复制当前信息"marginLeft="500px"w="400px"h="150px"/>
                </frame>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame bg="#fffbfb">
                    <button id="sr"text="---输入至该玩家---"layout_gravity="bottom"h="120px"style="Widget.AppCompat.Button.Colored"/>
                    <vertical margin="50px">
                        <horizontal>
                            <text text="输入至玩家："textSize="40px"textColor="#111111"/>
                            <spinner id="ws"entries="1|2|3|4|5|6|7|8|9|10|11|12|13|14|15|16|17|18|19|20|21|22|23|24|25|26|27|28|29|30"/>
                            <text id="wt"text="0W"textSize="40px"textColor="#111111"marginRight="50px"/>
                            <text id="wr"text="0R"textSize="40px"textColor="#111111"/>
                        </horizontal>
                        <horizontal>
                            <checkbox id="chwq"text="武器"/>
                            <input id="inwq"w="200px"marginRight="100px"/>
                            <checkbox id="chfj"text="防具"/>
                            <input id="infj"w="200px"/>
                        </horizontal>
                        <horizontal>
                            <checkbox id="chd"text="    大"/>
                            <input id="ind"w="200px"marginRight="100px"/>
                            <checkbox id="chx"text="    小"/>
                            <input id="inx"w="200px"/>
                        </horizontal>
                        <horizontal>
                            <checkbox id="cha"text="    单"/>
                            <input id="ina"w="200px"marginRight="100px"/>
                            <checkbox id="chs"text="    双"/>
                            <input id="ins"w="200px"/>
                        </horizontal>
                        <horizontal>
                            <checkbox id="chdd"text="大单"/>
                            <input id="indd"w="200px"marginRight="100px"/>
                            <checkbox id="chxd"text="小单"/>
                            <input id="inxd"w="200px"/>
                        </horizontal>
                        <horizontal>
                            <checkbox id="chds"text="大双"/>
                            <input id="inds"w="200px"marginRight="100px"/>
                            <checkbox id="chxs"text="小双"/>
                            <input id="inxs"w="200px"/>
                        </horizontal>
                        <horizontal>
                            <checkbox id="chbz"text="豹子"/>
                            <input id="inbz"w="200px"marginRight="100px"/>
                            <checkbox id="chz"text="    紫"/>
                            <input id="inz"w="200px"/>
                        </horizontal>
                    </vertical>
                </frame>
                <frame>
                    <button id="kj"text="---开奖---"layout_gravity="bottom"h="120px"style="Widget.AppCompat.Button.Colored"/>
                    <vertical margin="100px">
                        <horizontal>
                            <text text="类型：  "textSize="40px"textColor="#111111"/>
                            <spinner id="kl"entries="武器|防具|紫装"/>
                        </horizontal>
                        <horizontal>
                            <text text="数据：  "textSize="40px"textColor="#111111"/>
                            <input id="ks"w="200px"/>
                        </horizontal>
                    </vertical>
                </frame>
                <frame><ScrollView><frame>
                    <text text="玩家1"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="50px"/>
                    <text id="r1"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="50px"/>
                    <text id="w1"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="50px"/>
                    <text text="玩家2"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="150px"/>
                    <text id="r2"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="150px"/>
                    <text id="w2"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="150px"/>
                    <text text="玩家3"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="250px"/>
                    <text id="r3"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="250px"/>
                    <text id="w3"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="250px"/>
                    <text text="玩家4"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="350px"/>
                    <text id="r4"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="350px"/>
                    <text id="w4"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="350px"/>
                    <text text="玩家5"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="450px"/>
                    <text id="r5"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="450px"/>
                    <text id="w5"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="450px"/>
                    <text text="玩家6"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="550px"/>
                    <text id="r6"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="550px"/>
                    <text id="w6"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="550px"/>
                    <text text="玩家7"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="650px"/>
                    <text id="r7"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="650px"/>
                    <text id="w7"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="650px"/>
                    <text text="玩家8"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="750px"/>
                    <text id="r8"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="750px"/>
                    <text id="w8"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="750px"/>
                    <text text="玩家9"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="850px"/>
                    <text id="r9"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="850px"/>
                    <text id="w9"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="850px"/>
                    <text text="玩家10"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="950px"/>
                    <text id="r10"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="950px"/>
                    <text id="w10"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="950px"/>
                    <text text="玩家11"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="1050px"/>
                    <text id="r11"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="1050px"/>
                    <text id="w11"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="1050px"/>
                    <text text="玩家12"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="1150px"/>
                    <text id="r12"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="1150px"/>
                    <text id="w12"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="1150px"/>
                    <text text="玩家13"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="1250px"/>
                    <text id="r13"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="1250px"/>
                    <text id="w13"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="1250px"/>
                    <text text="玩家14"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="1350px"/>
                    <text id="r14"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="1350px"/>
                    <text id="w14"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="1350px"/>
                    <text text="玩家15"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="1450px"/>
                    <text id="r15"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="1450px"/>
                    <text id="w15"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="1450px"/>
                    <text text="玩家16"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="1550px"/>
                    <text id="r16"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="1550px"/>
                    <text id="w16"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="1550px"/>
                    <text text="玩家17"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="1650px"/>
                    <text id="r17"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="1650px"/>
                    <text id="w17"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="1650px"/>
                    <text text="玩家18"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="1750px"/>
                    <text id="r18"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="1750px"/>
                    <text id="w18"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="1750px"/>
                    <text text="玩家19"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="1850px"/>
                    <text id="r19"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="1850px"/>
                    <text id="w19"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="1850px"/>
                    <text text="玩家20"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="1950px"/>
                    <text id="r20"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="1950px"/>
                    <text id="w20"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="1950px"/>
                    <text text="玩家21"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="2050px"/>
                    <text id="r21"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="2050px"/>
                    <text id="w21"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="2050px"/>
                    <text text="玩家22"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="2150px"/>
                    <text id="r22"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="2150px"/>
                    <text id="w22"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="2150px"/>
                    <text text="玩家23"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="2250px"/>
                    <text id="r23"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="2250px"/>
                    <text id="w23"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="2250px"/>
                    <text text="玩家24"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="2350px"/>
                    <text id="r24"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="2350px"/>
                    <text id="w24"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="2350px"/>
                    <text text="玩家25"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="2450px"/>
                    <text id="r25"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="2450px"/>
                    <text id="w25"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="2450px"/>
                    <text text="玩家26"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="2550px"/>
                    <text id="r26"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="2550px"/>
                    <text id="w26"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="2550px"/>
                    <text text="玩家27"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="2650px"/>
                    <text id="r27"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="2650px"/>
                    <text id="w27"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="2650px"/>
                    <text text="玩家28"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="2750px"/>
                    <text id="r28"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="2750px"/>
                    <text id="w28"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="2750px"/>
                    <text text="玩家29"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="2850px"/>
                    <text id="r29"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="2850px"/>
                    <text id="w29"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="2850px"/>
                    <text text="玩家30"textColor="{{tc}}"textSize="{{ts}}"marginLeft="50px"             marginTop="2950px"/>
                    <text id="r30"text="0R"textColor="{{tc}}"textSize="{{ts}}"marginLeft="330px"marginTop="2950px"/>
                    <text id="w30"text="0W"textColor="{{tc}}"textSize="{{ts}}"marginLeft="610px"marginTop="2950px"/>
                </frame></ScrollView></frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/uploads/2014/10/023746fki.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "设置":
            toast("还没有设置");
            break;
        case "关于":
            alert("关于软件", "计分器\n版本号：1.0.0");
            break;
    }
    e.consumed = true;
});

activity.setSupportActionBar(ui.toolbar);
//设置滑动页面的标题
ui.viewpager.setTitles(["玩家界面", "开奖界面","浏览界面"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);
//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);
ui.menu.setDataSource([
  {
      title: "全选",
      icon: "@drawable/ic_android_black_48dp"
  },{
      title: "退出",
      icon: "@drawable/ic_exit_to_app_black_48dp"
  }
]);
ui.menu.on("item_click", item => {
    switch(item.title){
        case "退出":
            ui.finish();
            break;
    }
});

setInterval(function(){
    ui.wt.setText(w[ui.ws.getSelectedItemPosition()]+"W");
    ui.wr.setText(r[ui.ws.getSelectedItemPosition()]+"R");
},200);

ui.fz.on("click",()=>{
    var cnr="";
    
});
ui.sr.on("click",()=>{
    var dwz=ui.ws.getSelectedItemPosition();
    var n=new Array();
    if(ui.chwq.isChecked()){
        n[n.length]="wq|"+ui.inwq.getText();
    }
    if(ui.chfj.isChecked()){
        n[n.length]="fj|"+ui.infj.getText();
    }
    if(ui.chd.isChecked()){
        n[n.length]="d|"+ui.ind.getText();
    }
    if(ui.chx.isChecked()){
        n[n.length]="x|"+ui.inx.getText();
    }
    if(ui.cha.isChecked()){
        n[n.length]="a|"+ui.ina.getText();
    }
    if(ui.chs.isChecked()){
        n[n.length]="s|"+ui.ins.getText();
    }
    if(ui.chdd.isChecked()){
        n[n.length]="dd|"+ui.indd.getText();
    }
    if(ui.chxd.isChecked()){
        n[n.length]="xd|"+ui.inxd.getText();
    }
    if(ui.chds.isChecked()){
        n[n.length]="ds|"+ui.inds.getText();
    }
    if(ui.chxs.isChecked()){
        n[n.length]="xs|"+ui.inxs.getText();
    }
    if(ui.chbz.isChecked()){
        n[n.length]="bz|"+ui.inbz.getText();
    }
    if(ui.chz.isChecked()){
        n[n.length]="z|"+ui.inz.getText();
    }
    all[dwz]=n;
    toast(dwz+1+":"+all[dwz]);
    ui.ws.setSelection(ui.ws.getSelectedItemPosition()+1);
    ui.chwq.setChecked(false);
    ui.inwq.setText("");
    ui.chfj.setChecked(false);
    ui.infj.setText("");
    ui.chz.setChecked(false);
    ui.inz.setText("");
    ui.chbz.setChecked(false);
    ui.inbz.setText("");
    ui.chd.setChecked(false);
    ui.ind.setText("");
    ui.chx.setChecked(false);
    ui.inx.setText("");
    ui.cha.setChecked(false);
    ui.ina.setText("");
    ui.chs.setChecked(false);
    ui.ins.setText("");
    ui.chdd.setChecked(false);
    ui.indd.setText("");
    ui.chxd.setChecked(false);
    ui.inxd.setText("");
    ui.chds.setChecked(false);
    ui.inds.setText("");
    ui.chxs.setChecked(false);
    ui.inxs.setText("");
});
ui.kj.on("click",()=>{
    var lj=ui.kl.getSelectedItemPosition();
    var sj=parseInt(ui.ks.getText());
    if(sj>=51){
        var hj=true;
    }else{
        var hj=false;
    }
    if(sj%2==0){
        var tj=true;
    }else{
        var tj=false;
    }
    for(var i=0;i<30;i++){
        for(var l=0;l<all[i].length;l++){
            var t=all[i][l].split("|");
            //获得投注内容
            if(t[0]=="wq"){
                //获得投注数量
                var z=t[1].split("");log("z="+z);
                //获取投注单位
                var b=z[z.length-1];log("b="+b);
                //创建数据重组
                var n="";
                for(var j=0;j<z.length-1;j++){
                    n=n+z[j];
                }log(n);
                n=parseInt(n);log(n);
                if(b=="W"){
                    if(lj==0){
                        w[i]=w[i]+(n*1.95);
                    }else{
                        w[i]=w[i]-n;
                    }
                }else if(b="R"){
                    if(lj==0){
                        r[i]=r[i]+(n*1.95);
                    }else{
                        r[i]=r[i]-n;
                    }
                }
            }else if(t[0]=="fj"){
                //获得投注数量
                var z=t[1].split("");log("z="+z);
                //获取投注单位
                var b=z[z.length-1];log("b="+b);
                //创建数据重组
                var n="";
                for(var j=0;j<z.length-1;j++){
                    n=n+z[j];
                }log(n);
                n=parseInt(n);log(n);
                if(b=="W"){
                    if(lj==1){
                        w[i]=w[i]+(n*2);
                    }else{
                        w[i]=w[i]-n;
                    }
                }else if(b="R"){
                    if(lj==1){
                        r[i]=r[i]+(n*2);
                    }else{
                        r[i]=r[i]-n;
                    }
                }
            }else if(t[0]=="z"){
                //获得投注数量
                var z=t[1].split("");log("z="+z);
                //获取投注单位
                var b=z[z.length-1];log("b="+b);
                //创建数据重组
                var n="";
                for(var j=0;j<z.length-1;j++){
                    n=n+z[j];
                }log(n);
                n=parseInt(n);log(n);
                if(b=="W"){
                    if(lj==2){
                        w[i]=w[i]+(n*10);
                    }else{
                        w[i]=w[i]-n;
                    }
                }else if(b="R"){
                    if(lj==2){
                        r[i]=r[i]+(n*10);
                    }else{
                        r[i]=r[i]-n;
                    }
                }
            }else if(t[0]=="bz"){
                //获得投注数量
                var z=t[1].split("");log("z="+z);
                //获取投注单位
                var b=z[z.length-1];log("b="+b);
                //创建数据重组
                var n="";
                for(var j=0;j<z.length-1;j++){
                    n=n+z[j];
                }log(n);
                n=parseInt(n);log(n);
                if(b=="W"){
                    if(sj==0||sj==11||sj==22||sj==33||sj==44||sj==55||sj=66||sj==77||sj==88||sj==99){
                        w[i]=w[i]+(n*10);
                    }else{
                        w[i]=w[i]-n;
                    }
                }else if(b="R"){
                    if(sj==0||sj==11||sj==22||sj==33||sj==44||sj==55||sj=66||sj==77||sj==88||sj==99){
                        r[i]=r[i]+(n*10);
                    }else{
                        r[i]=r[i]-n;
                    }
                }
            }else if(t[0]=="d"){
                var z=t[1].split("");log("z="+z);
                var b=z[z.length-1];log("b="+b);
                var n="";for(var j=0;j<z.length-1;j++){n=n+z[j];}n=parseInt(n);log(n);
                if(b=="W"){
                    if(sj){w[i]=w[i]+(n*2);}else{w[i]=w[i]-n;}
                }else if(b="R"){
                    if(sj){r[i]=r[i]+(n*2);}else{r[i]=r[i]-n;}
                }
            }else if(t[0]=="x"){
                var z=t[1].split("");log("z="+z);
                var b=z[z.length-1];log("b="+b);
                var n="";for(var j=0;j<z.length-1;j++){n=n+z[j];}n=parseInt(n);log(n);
                if(b=="W"){
                    if(!sj){w[i]=w[i]+(n*2);}else{w[i]=w[i]-n;}
                }else if(b="R"){
                    if(!sj){r[i]=r[i]+(n*2);}else{r[i]=r[i]-n;}
                }
            }else if(t[0]=="a"){
                var z=t[1].split("");log("z="+z);
                var b=z[z.length-1];log("b="+b);
                var n="";for(var j=0;j<z.length-1;j++){n=n+z[j];}n=parseInt(n);log(n);
                if(b=="W"){
                    if(!tj){w[i]=w[i]+(n*2);}else{w[i]=w[i]-n;}
                }else if(b="R"){
                    if(!tj){r[i]=r[i]+(n*2);}else{r[i]=r[i]-n;}
                }
            }else if(t[0]=="s"){
                var z=t[1].split("");log("z="+z);
                var b=z[z.length-1];log("b="+b);
                var n="";for(var j=0;j<z.length-1;j++){n=n+z[j];}n=parseInt(n);log(n);
                if(b=="W"){
                    if(tj){w[i]=w[i]+(n*2);}else{w[i]=w[i]-n;}
                }else if(b="R"){
                    if(tj){r[i]=r[i]+(n*2);}else{r[i]=r[i]-n;}
                }
            }else if(t[0]=="dd"){
                var z=t[1].split("");log("z="+z);
                var b=z[z.length-1];log("b="+b);
                var n="";for(var j=0;j<z.length-1;j++){n=n+z[j];}n=parseInt(n);log(n);
                if(b=="W"){
                    if(tj&&!sj){w[i]=w[i]+(n*4);}else{w[i]=w[i]-n;}
                }else if(b="R"){
                    if(tj&&!sj){r[i]=r[i]+(n*4);}else{r[i]=r[i]-n;}
                }
            }else if(t[0]=="xd"){
                var z=t[1].split("");log("z="+z);
                var b=z[z.length-1];log("b="+b);
                var n="";for(var j=0;j<z.length-1;j++){n=n+z[j];}n=parseInt(n);log(n);
                if(b=="W"){
                    if(!tj&&!sj){w[i]=w[i]+(n*4);}else{w[i]=w[i]-n;}
                }else if(b="R"){
                    if(!tj&&!sj){r[i]=r[i]+(n*4);}else{r[i]=r[i]-n;}
                }
            }else if(t[0]=="ds"){
                var z=t[1].split("");log("z="+z);
                var b=z[z.length-1];log("b="+b);
                var n="";for(var j=0;j<z.length-1;j++){n=n+z[j];}n=parseInt(n);log(n);
                if(b=="W"){
                    if(tj&&sj){w[i]=w[i]+(n*4);}else{w[i]=w[i]-n;}
                }else if(b="R"){
                    if(tj&&sj){r[i]=r[i]+(n*4);}else{r[i]=r[i]-n;}
                }
            }else if(t[0]=="xs"){
                var z=t[1].split("");log("z="+z);
                var b=z[z.length-1];log("b="+b);
                var n="";for(var j=0;j<z.length-1;j++){n=n+z[j];}n=parseInt(n);log(n);
                if(b=="W"){
                    if(!tj&&sj){w[i]=w[i]+(n*4);}else{w[i]=w[i]-n;}
                }else if(b="R"){
                    if(!tj&&sj){r[i]=r[i]+(n*4);}else{r[i]=r[i]-n;}
                }
            }
        }
    }
    refresh();
});

function refresh(){
    for(var i=1;i<=30;i++){
        if(w[i-1]==null){w[i-1]="0"}
        if(r[i-1]==null){r[i-1]="0"}
        var strw="ui.w"+i+".setText('"+w[i-1]+"'+'W');";
        eval(strw);
        var strr="ui.r"+i+".setText('"+r[i-1]+"'+'R');";
        eval(strr);
    }
}

