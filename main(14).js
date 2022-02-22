"ui";
var storage=storages.create("HR-LMDG");
alert("功能暂时未完善，同步功能暂时没用");
var color= "#0096f8";
var flag = true;
ui.layout(
 <frame bg="#ffffffff">
    <button text="开始运行-脚本"layout_gravity="bottom" id="start" style="Widget.AppCompat.Button.Colored"w="*"h="130px"/>
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar"
                 title="❦黎冥❀電茪❁»浩然脚本"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="mod">
                <ScrollView><HorizontalScrollView>
                <frame>
                   <vertical marginTop="10px"w="1080px">
                        <frame w="*"h="1080px"marginBottom="-970px">
                            <img src="file://./obb/png/title/quick.png"/>
                        </frame>
                        <horizontal marginLeft="13px"w="*"h="140px">
                            <button text="默认"id="m1" w="245px"h="140px"size="45px"/>
                            <button text="云速刷"id="m2" w="245px"h="140px"size="45px"/>
                            <button text="自定义"id="m3" w="245px"h="140px"size="45px"/>
                            <button text="云长期挂机"id="m4" w="*"h="140px"size="45px"marginRight="5"/>
                        </horizontal>
                        <horizontal w="*"h="110px" marginTop="160px">
                            <text text="乱斗位置:" size="70px" color="black"marginLeft="25px"/>
                            <frame w="*">
                                <button w="300px"size="50px" text="不会选？"id="help1"marginTop="-10px" style="Widget.AppCompat.Button.Borderless.Colored" layout_gravity="right"/>
                            </frame>
                        </horizontal>
                        <radiogroup w="*"h="270px" marginLeft="60px"id="ldwz">
                            <radio id="ldwzzdjc"text="自动检测"checked="true"size="50px"/>
                            <radio id="ldwzz"text="左"checked="false"size="50px"/>
                            <radio id="ldwzy"text="右"checked="false"size="50px"/>
                        </radiogroup>
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal w="*"h="90px"marginTop="20px">
                            <text text="广告播放:" size="70px" color="black"marginLeft="24px"/>
                            <frame w="*">
                                <button w="300px"size="50px"text="不会选？"marginTop="-30px"id="help2" style="Widget.AppCompat.Button.Borderless.Colored" layout_gravity="right"/>
                            </frame>
                        </horizontal>
                         <radiogroup w="*"h="270px" marginLeft="60px"id="ldwz">
                            <radio text="加速升级"checked="false"size="50px"/>
                            <radio text="青铜宝箱"checked="true"size="50px"/>
                            <radio text="不放广告"checked="false"size="50px"/>
                        </radiogroup>           
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal w="*"h="90px"marginTop="20px">
                            <text text="机甲位置:" size="70px" color="black"marginLeft="25px"/>
                            <frame w="*">
                                <button w="300px" size="50px"text="不会选？"id="help3" marginTop="-30px"style="Widget.AppCompat.Button.Borderless.Colored" layout_gravity="right"/>
                            </frame>
                        </horizontal>
                        <horizontal w="*"h="80px"marginLeft="60px">
                            <spinner textSize="60px"w="320px"h="100px"id="jjwz-jk" entries="当前|一号|二号|三号|四号|五号"/>
                            <text size="60px"text="机库，第"/>
                            <spinner textSize="60px"w="260px"h="100px"id="jjwz-jj" entries="一|二|三|四|五"/>
                            <text size="60px"text="台机甲"/>
                        </horizontal>
                        <text h="40px"size="50px" text=" ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>                                                             
                        <horizontal w="*"h="110px"marginTop="20px"marginBottom="-30px">
                            <text text="刷分机甲:" size="70px" color="black"marginLeft="24px"/>
                            <spinner textSize="60px"w="390px"h="100px"id="sfjj" entries="传统|自爆机|直线型|单一型"/>
                            <frame w="*">
                                <button w="300px"size="50px" text="不会选？"id="help4" style="Widget.AppCompat.Button.Borderless.Colored" layout_gravity="right"marginTop="-20px"/>
                            </frame>
                        </horizontal>
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal w="*"h="110px"marginBottom="-30px"marginTop="20px">
                            <text text="自动开超宝:" size="70px" color="black"marginLeft="24px" />
                            <Switch id="zdkcb"checked="false"/>
                            <frame w="*">
                                <button w="300px" size="50px"text="不会选？"id="help5" style="Widget.AppCompat.Button.Borderless.Colored" layout_gravity="right"marginTop="-20px"/>
                            </frame>
                        </horizontal>
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal w="*"h="110px"marginBottom="-30px"marginTop="20px">
                            <text text="手机已Root:" size="70px" color="black"marginLeft="24px" />
                            <Switch id="zdkcb"checked="false"text=""/>
                            <frame w="*">
                                <button w="300px"size="50px" text="不会选？"id="help6" style="Widget.AppCompat.Button.Borderless.Colored" layout_gravity="right"marginTop="-30px"/>
                            </frame> 
                        </horizontal>
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal w="*"h="120px"marginBottom="-50px"marginTop="10px">
                            <text text="战斗时间:" size="70px" color="black"marginLeft="24px"/>
                            <frame w="*">
                                <button w="300px"size="50px" text="不会选？"id="help7" style="Widget.AppCompat.Button.Borderless.Colored" layout_gravity="right"/>
                            </frame>         
                        </horizontal>
                        <horizontal marginLeft="60px"marginBottom="-30px">
                            <input text="60" id="zdsjxs"color="#333333"textSize="60px"/>
                            <text text=" 秒   "size="60px"color="black"/>
                        </horizontal>
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal w="*"h="120px"marginBottom="-50px"marginTop="10px">
                            <text text="最久匹配时间:" size="70px" color="black"marginLeft="24px"/>
                            <frame w="*">
                                <button w="300px"textSize="50px" text="不会选？"id="help8" style="Widget.AppCompat.Button.Borderless.Colored" layout_gravity="right"/>
                            </frame>
                        </horizontal>
                        <horizontal marginLeft="60px">
                            <input textSize="60px" id="zjppsj" inputType="number" text="666666"h="125px"marginTop="15px"/>
                            <text text="秒" size="60px"/>
                        </horizontal>
                        <frame w="1080px"h="1080px"marginBottom="-350">
                            <img src="file://./obb/png/title/now.png"marginTop="30px"/>                         
                        </frame>
                        <horizontal w="*"h="110px"marginBottom="-30px" marginTop="120px"marginLeft="45px">
                            <Switch id="mtzdlq" checked="false"/>
                            <text text="每" size="60px"marginLeft="24px"/>
                            <spinner id="setmtzdlq"size="60px" entries="8|9|10|11|12"/>
                            <text text="小时自动领取:"size="60px"marginLeft="0"/>
                        </horizontal>
                        <checkbox id="mtzdlqa" size="50px"checked="true" text="生产线"        marginLeft="35"marginTop="8"/>
                        <checkbox id="mtzdlqb" size="50px"checked="true" text="车间币"        marginLeft="35"/>
                        <checkbox id="mtzdlqc" size="50px"checked="true" text="已完成任务"marginLeft="35"/>
                       <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                       <horizontal marginBottom="-30px" marginTop="-10px"marginLeft="45px">
                            <Switch id="mtzdgm"checked="false"/>
                            <text text="每天自动购买" size="60px"marginLeft="24px"/>
                            <input size="60px"id="setmtzdgm" inputType="number" text="1"h="150px"marginTop="0"/>
                            <text text="次车间币"size="60px"marginLeft="0"/>
                        </horizontal>
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal marginBottom="-30px" marginTop="10px"marginLeft="45px">
                            <Switch id="jxsjdqz"checked="false"/>
                            <text text="继续升级当前至" size="60px"marginLeft="24px"/>
                            <spinner id="setjxsjdqz"size="60px" entries="mk1满级|mk2满级"/>
                        </horizontal>
                        <frame w="1080px"h="1080px"marginBottom="-900px">
                            <img src="file://./obb/png/title/high.png"marginTop="60px"/>
                        </frame>
                        <horizontal marginLeft="60px">
                            <text text="搜图频:" size="60px"/>
                            <text text="20"id="stpxs"color="#333333"size="60px"/>
                            <text text=" 毫秒 "size="60px"color="black"/>
                            <text text="0"size="50px"/> 
                            <seekbar id="stp" progress="1" w="450px"marginTop="18px"/>           
                            <text text="2000"size="50px"/> 
                        </horizontal>
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal marginLeft="60px"marginTop="20px">
                            <text text="亮度:" size="60px"/>
                            <text id="tld"text="50%"color="#333333"size="60px"/>
                            <text text="    0%"size="50px"/> 
                            <seekbar id="ld"progress="50" w="570px"marginTop="18px"marginLeft="-30px"marginRight="-30px"/>           
                            <text text="100%"size="50px"/> 
                        </horizontal>
                        <horizontal marginLeft="60px">
                            <text text="声音:" size="60px"/>
                            <text id="syt"text="15"color="#333333"size="60px"/>
                            <text text="         0"size="50px"/> 
                            <seekbar id="sy" progress="50" w="570px"marginTop="18px"marginLeft="-30px"marginRight="-30px"/>           
                            <text text="15"size="50px"/> 
                        </horizontal>
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal marginBottom="-30px" marginTop="-10px"marginLeft="45px">
                            <Switch id="ddlsy"checked="true"/>
                            <text text="当电量少于" size="60px"marginLeft="24px"/>
                            <input id="setddlsy"textSize="60px" inputType="number" text="5"h="150px"marginTop="0"/>
                            <text text="%时，暂停脚本。"size="60px"marginLeft="0"/>
                        </horizontal>
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal marginLeft="45px"marginTop="20px">
                            <Switch id="kzt"checked="true"/>
                            <text text="控制台" size="60px"marginLeft="24px"/>
                        </horizontal>
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal marginTop="-10px"marginLeft="45px"marginBottom="-30px">
                            <Switch id="cbsjsj"/>
                            <text text="超宝数据收集，截图频:" size="60px"marginLeft="24px"/>
                            <input id="setcbsjsj" inputType="number" text="0.05"h="150px"marginTop="0"textSize="60px"/>
                            <text text="秒" size="60px"marginLeft="24px"/>
                        </horizontal>
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal marginLeft="45px"marginTop="20px">
                            <Switch id="yuudkyx" checked="true"/>
                            <text text="用uu打开游戏" size="60px"marginLeft="24px"/>
                        </horizontal>
                        <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                        <horizontal marginTop="20px"marginLeft="45px"marginBottom="-30px">
                            <Switch id="jbfg"checked="true"/>
                            <text text="脚本分工" size="60px"marginLeft="24px"/>
                            <spinner id="setbfg"w="320px" h="100px"size="60px"entries="亚洲|欧美|非洲|播放"/>
                            <frame w="*">
                                <button w="300px"size="50px" text="不会选？"id="help9" style="Widget.AppCompat.Button.Borderless.Colored" layout_gravity="right"marginTop="-15px"/>
                            </frame>                      
                        </horizontal>
                        <text h="50px"size="50px" text=" ============================================================================================================================================================================"/>
                        <horizontal marginBottom="-40px"marginLeft="24px"h="150px"marginTop="10px">
                            <text text="WR坐标:" size="70px"color="black"/>
                            <frame w="*">
                                <button w="300px" size="50px"text="不会选？"id="help10" style="Widget.AppCompat.Button.Borderless.Colored" layout_gravity="right"/>
                            </frame>
                        </horizontal>
                        <checkbox id="wrzba"size="50px" checked="true" text="自动检测" marginLeft="100px"h="60px"/>
                        <horizontal h="160px"marginBottom="-50px">
                           <checkbox id="ggzbb" checked="false" text="坐标打开，x:" marginLeft="105px"size="50px"/>
                            <input id="setggzbx" inputType="number" textSize="50px"/>
                            <text text="y:" color="black"size="50px"/>
                            <input id="setggzby" inputType="number" textSize="50px"/>
                       </horizontal>
                       <text h="40px"size="50px" text=" -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------"/>
                       <horizontal marginBottom="-40px"marginLeft="24px"h="150px"marginTop="20px">
                            <text text="谷歌设置坐标:" size="70px"color="black"/>
                            <frame w="*">
                                <button w="300px" size="50px"text="不会选？"id="help11" style="Widget.AppCompat.Button.Borderless.Colored" layout_gravity="right"/>
                            </frame>
                        </horizontal>
                        <checkbox id="wrzba"size="50px" checked="true" text="自动检测" marginLeft="100px"h="60px"/>
                        <horizontal h="160px"marginBottom="70px">
                           <checkbox id="ggzbb" checked="false" text="坐标打开，x:" marginLeft="105px"size="50px"/>
                            <input id="setggzbx" inputType="number" textSize="50px"/>
                            <text text="y:" color="black"size="50px"/>
                            <input id="setggzby" inputType="number" textSize="50px"/>
                       </horizontal>
                    </vertical> 
                </frame>
            </HorizontalScrollView></ScrollView>
            <ScrollView>
                <frame>
                    <button marginTop="500px" layout_gravity="center_horizontal" size="80px" text="此界面内容正在制作中" h="auto"w="auto"color="black"id="wait"/>
                    <progressbar marginTop="220"/>
                </frame>
            </ScrollView>
            <ScrollView>
                 <frame >                
                     <button marginTop="500px" layout_gravity="center_horizontal" textSize="60px" text="该页面功能正在完善" h="auto"w="auto"color="black"id="waita"/>
                     <progressbar marginTop="220"indeterminate="true" progress="60"style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal"/>
                 </frame>
            </ScrollView>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="840px">
            <img src="file://./obb/png/title/ld.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="150px" h="150px" padding="48px"src="{{this.icon}}" tint="{{color}}"/>
                    <text  textSize="100px" text="{{this.title}}" layout_gravity="center"size="55px"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
 </frame>
);

media.playMusic("./obb/mp3/background.mp3",0.7,true);
media.musicSeekTo(11800);
//音量声音文字循环控制
setInterval(()=>{
    ui.tld.setText(parseInt(ui.ld.getProgress())+"%");
    ui.syt.setText(""+parseInt(ui.sy.getProgress()*15/100));
    storage.put("brightness",parseInt(ui.tld.getText()*255/100));
    storage.put("voice",parseInt(ui.syt.getText()));
},100);
//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu=>{
    menu.add("设置 基础");
    menu.add("关于 脚本");
    menu.add("加浩然的 派系");
    menu.add("反馈脚本问题");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item)=>{
    switch(item.getTitle()){
        case "设置 基础":
            ui.layout(
                <frame>
                    <text text="页面正在制作中"layout_gravity="center"/>
                </frame>
            );
            break;
        case "关于 脚本":
            toast("");
            break;
        case"加浩然的 派系":
            app.startActivity({  
            data: "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=143177410&card_type=group&source=qrcode&jump_from="
            });
            break;
        case"反馈脚本问题":
           		app.startActivity({
	                		action:"android.intent.action.VIEW",
                			data:"mqqapi://card/show_pslcard?&uin=2125764918"
          		});
            break;
    }
     
e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.mod.setTitles(["刷广告", "出售物品", "卡超宝"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.mod);
//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([
  {
      title: "建云手机指导",
      icon: "@drawable/ic_phone_android_black_48dp"
  },{
      title: "启动当页脚本",
      icon: "@drawable/ic_android_black_48dp"
  }, {
      title: "加入黎冥電茪",
      icon: "@drawable/ic_exit_to_app_black_48dp"
  }, {
      title: "脚本运行原理",
      icon: "@drawable/ic_translate_black_48dp"
  }
]);
ui.menu.on("item_click", item => {
    switch(item.title){
        case "自动创建云手机":
            
            break;
        case"启动当页脚本":
           
            break;
        case"加入 黎冥電茪":
            app.startActivity({  
                data: "mqqapi://card/show_pslcard?src_type=internal&version=1&uin=143177410&card_type=group&source=qrcode&jump_from="
            });
            break;
        case"脚本说明":
        
            break;
    }
});
ui.wait.on("click", ()=>{
    toast("你点我，我也没办法呀");
});
ui.help1.on("click", ()=>{
    alert("乱斗位置 选择指导","原因:脚本自动打乱斗模式容易快速死亡，而导致可能还没造成输出就已经被打死。所以:脚本需要经量避开乱斗模式，故乱斗模式在哪边，就打另一边，可以把碰到乱斗模式的几率降为0             选择:说的简单点就是，随机模式是乱斗就选右，不是就选左");
});
ui.help2.on("click", ()=>{
    alert("广告播放 选择指导","每打一把后可以播放广告。这个选项用于设置广告的作用，比如选择青铜宝箱就播放黑市界面的免费宝箱，可以用来刷超宝，选择加速升级，就可以播放减升级时间的广告。选择不放广告，就是只战斗，加降分，不放广告，但是还是会刷新id(顺便重启游戏，最多消耗两秒)连续在线过多时间可能被查到");
});
ui.help3.on("click", ()=>{
    alert("机甲位置 选择指导","脚本运行需要使用固定的机甲，并选择该机甲进行战斗。但是由于种类多种多样，很难用自动识别来选择，所以需要用户自己填写机甲的位置，方便脚本填写。另注:如果该机甲死亡但战斗时间没到，会自动选择改机甲后面的机甲，第五个死亡再用第一个，继续朝后，全部死亡会提前自动退出。一般只需要配两台即可。");
});
ui.help4.on("click", ()=>{
    alert("刷分机甲 选择指导","刷分机甲，就是战斗使用的机甲，一般全使用传统型，适合大部分地图，乱斗以外的所有模式，价格便宜，该配置需要装备九头蛇，激光，礼花至少这三种，大中小随意。  第二种，自爆机，最佳刷分机甲,适合所有地图，所有模式，自爆机随意装什么武器，战斗时间达到一分钟，绝对不会进黑屋。  第三种，直线型，要装备持续型远程武器，刷分时机甲自动原地旋转，攻击全方位目标，该配置只适合乱斗，一般不常用。第四种，单一型，一个机库只有一个机甲时可使用，一般用小跳，出去送死完成即可退出，但是送死路径可能不对，所以该选项比较少用。");
});
ui.help6.on("click", ()=>{
    alert("手机已Root 选择指导","该脚本有两种运行模式，一种为Root权限运行，一种为无Root权限运行，两种速度几乎一样，但是安卓版本7.0以下的手机，无法使用无Root权限运行。所以，如果选择了已root，脚本会判断手机安卓版本，给你启动对应的脚本。不选，择默认无root权限运行，如果安卓版本小于7.0，脚本则无法开始运行。");
});
ui.help5.on("click", ()=>{
    alert("自动开超宝 选择指导","脚本大致快的，一天就可以刷好一个超宝(多开情况)，然而刷好一个超宝后，如果不打开，就不可继续刷下一个超宝，广告次数全会用于加速升级，加速生产线(按照这两个的填写比例，如果都为0，则只战斗)，但这种方法的好处在于，有些人想自己开超宝，一个卡出三四个之类的情况。但如果想长期挂机，还是打开比较好。");
});
ui.help7.on("click", ()=>{
    alert("战斗时间 填写指导","这个时间是脚本每打一把，战斗的时间(不包括开始的倒计时)，一般建议60秒，少了容易进黑屋，多了，脚本运行效率慢。但具体还是要用户您自己决定。");
});
ui.help8.on("click", ()=>{
    alert("最久匹配时间 填写指导","该功能主要用于，当匹配时间超过某个值时，会自动重新退出，再匹配一遍。一般不需要，默认无限。");
});
ui.help9.on("click", ()=>{
    alert("脚本分工 选择指导","脚本分工即为不同手机上的不同脚本对一个账号做不同的事，当前版本必须多开，至少两个手机。亚非洲，欧美澳洲，都是用各自的区域的网络纯战斗，不放广告。播放为只放广告不战斗。所以两个手机刷，至少有一个选播放。要是使用三个手机刷，分别选三个不同的。这样两个战斗的才不会顶撞。");
});
ui.help10.on("click", ()=>{
    alert("WR坐标 填写指导","如果在谷歌空间运行wr，那的话，wr不能用代码直接启动，则需要图形识别，再自动点击打开。输入坐标可以节省时间，推荐输入。看到坐标的方法为:打开设置，开发者选项，指针位置，，手指放到wr图标上，上方会显示出坐标。但自动检测也不消耗多少时间。");
});
ui.help11.on("click", ()=>{
    alert("谷歌设置坐标 填写指导","同上");
});
