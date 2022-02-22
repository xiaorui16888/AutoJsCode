"ui";
//by白酒煮饭 2018-11-15
//测试通过环境 :OPPO R11 
//Auto.js软件版本 4.0.10 Alpha 10
//该脚本过大，低性能手机可以有不可未知的各种问题☺️☺️
var bgcolor = "#ffffff";
var color = "#000000";
var color = "#009688";
var array = [];
var 颜色 = "#009688";
var 对话 = [{左宽: "0dp",右宽: "16dp",对齐: "left",头像: "http://cdn.duitang.com/uploads/item/201504/03/20150403H3451_hmCvr.thumb.700_0.jpeg",信息: "嗨，你好呀",图1: "50dp",图2: "0dp"}];
var 识别 = [];
var tip = '功能使用教程\n1.在此区域输入要查询的成语，可批量查询（一个成语一行，具体看可以看示例\n2."历史"查看刚才查询的成语，有时候查询失败，可以点历史在查询一遍\n3.长按 "历史"可以查看  "保存"的文件\n4.“保存”可以把输入框中的内容进行保存，默认路径在"/sdcard/成语意思.txt"\n5.长按 "保存"把此区域的文本复制\n6.“导入”可以把提前编辑好的成语(一个成语一行)导入查看或查询，默认导入路径"/sdcard/成语.txt"\n7.“示例”批量查询成语及导入的标准格式\n\n \n       此脚本并不完美，有兴趣可自行修改\n ';
var Examples = "起早贪黑\n闻鸡起舞\n默默无闻\n精卫填海\n一叶障目";
var cookie = "";
var music_list = [];
var music_source = ["tencent","netease","kugou","baidu","xiami"];
var music_page = 1;
var music_word = "";
var music_flag1 = true;
var music_down="/sdcard/music/";
var pop="1.反馈问题会上传您的设备信息\n2.提交的设备信息仅用于分析BUG\n3.提交问题可以帮助开发者能更快的找出BUG\n4.不介意这些的 点下面的发送\n\n                     感谢您的支持💕💕💕💕"

ui.layout(
    <drawer id="drawer">
        <vertical h="*" w="*">
            <appbar>
                <toolbar id="toolbar" title="一个小木函 v0.0.15"/>
            </appbar>
            <frame id="body" h="*" w="*">
            </frame>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
             <img w="280" h="200" scaleType="fitXY" src="http://bmob-cdn-21628.b0.upaiyun.com/2018/11/14/9de8d9d7406aaf6b8012eb7e2628fd13.jpeg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);

activity.setSupportActionBar(ui.toolbar);
ui.toolbar.setupWithDrawer(ui.drawer);
ui.menu.on("item_click", item => {
    if (item.onclick) item.onclick();
       ui.drawer.closeDrawers();
});

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("设置");
    menu.add("日志");
    menu.add("问题反馈");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "设置":
            toast("还没有设置");
            break;
        case "日志":
            app.startActivity('console');
            break;
        case "问题反馈":
            反馈.activate();
            break;    
        case "关于":
            首页.activate();
            break;        
    }
    e.consumed = true;
});

function setContainer(v) {
    ui.body.removeAllViews();
    ui.body.addView(v, new android.widget.FrameLayout.LayoutParams(-1, -1));
}

ui.menu.setDataSource([{
    title: "文字翻译",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 文字翻译.activate()
},{
    title: "文字识别",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 文字识别.activate()
},{
    title: "成语词典",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 成语词典.activate()
},{
    title: "号码归属地查询",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 号码.activate()
},{
    title: "IP地址查询",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 查ip.activate()
},{
    title: "身份证查询",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 身份证.activate()
},{
    title: "聊天机器人",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 聊天机器人.activate()
},{
    title: "密码生成器",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 密码生成器.activate()
},{
    title: "网页源码浏览",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 网页源码.activate()
},{
    title: "调色板",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 调色板.activate()
},{
    title: "每日一句(英文励志)",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 每日一句.activate()
},{
    title: "短网址生成",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 短网址.activate()
},{
    title: "二维码生成",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 二维码.activate()
},{
    title: "图片转链接",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 图片.activate()
},{
    title: "音乐下载",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 音乐.activate()
}]);
Check_the_update();
var 反馈 = {
    ui: ui.inflate(//布局
        <vertical padding="16" bg="#aa280800">
        <input id="te" textSize="18sp" h="200" bg="#FFD2D9FF" hint="{{pop}}"/>
        <horizontal gravity="center">
         <button id="next" w="*" text="发送"/>
        </horizontal>
        <text textSize="16sp" textStyle="bold">设备信息:</text>
         <text id="tt" textSize="13sp" h="*" bg="#FFD2D9FF"/>
    </vertical>
),
initList: function() {//流程操作
    ui.run(() => {
    var sf=Problem_feedback();
    ui.tt.setText(sf);
});
ui.next.on("click", () => {
    threads.start(function(){
        let name=ui.te.text();
        if (name){
        let tt=Problem_feedback();
        let ne = (new Date).getTime();
    http.post("http://ce.ys168.com/f_ht/ajcx/lyd.aspx?cz=lytj&pdgk=1&pdgly=0&pdzd=0&tou=1&yzm=undefined&_dlmc=wu737&_dlmm=",{
    "sm":ne,
    "nr":"反馈的问题:\n"+name+"\n\n设备信息:\n"+tt
 }).body.string();
 toast("感谢您的反馈❤️❤️❤️❤️❤️");}
    });    
});
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
var 短网址 = {
    ui: ui.inflate(//布局
        <frame background="#515155">
        <vertical align="top" margin="30">
            <text textSize="26sp" textStyle="bold">在下面输入网址：</text>
            <linear>
                <input id="num" layout_weight="1" bg="#ffffff" h="45" paddingLeft="10sp" maxLines="1" hint="输入网址" alpha="0.5"/>
                <button h="55" w="70" id="ok" text="生成" />
            </linear>
            <linear>
                <text id="xkh" h="30" w="auto"  textSize="18sp"/>
            </linear>
            <linear>
                <horizontal>
                    <text id="xb" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
        </vertical>
    </frame>
),
initList: function() {//流程操作
ui.ok.click(function() {
    threads.start(function() {
        let sd = ui.num.text();
        if (sd) {
            var sum = dwz(sd);
            if (sum) {
                ui.run(() => {
                    ui.xb.setText(sum);
                });
            }
        }
    });
});
ui.ok.on("long_click", () => {
    ui.num.setText("");
});

ui.xb.click(function() {
    let xbj = ui.xb.text();
    if (xbj) {
        setClip(xbj);
        toast("复制成功");
    }
});
    
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
var 二维码 = {
    ui: ui.inflate(//布局
    <frame background="#515155">
        <vertical align="top" margin="30">
            <text textSize="16sp" textStyle="bold">输入内容：</text>
            
                <input id="num" layout_weight="1" bg="#ffffff" paddingLeft="10sp" hint="输入网址" alpha="0.5"/>
                <button h="55" id="ok" text="生成" />
           
            <img id="rounded_img" gravity="center" padding="10" src="http://www.autojs.org/assets/uploads/profile/1-profileavatar.jpeg" w="200" h="200" radius="20dp" scaleType="fitXY"/>
        </vertical>
    </frame>
),
initList: function() {//流程操作
var aad;
ui.ok.click(function() {
    threads.start(function() {
        let sd = ui.num.text();
        if (sd) {
            ui.run(() => {
                aad=("http://mobile.qq.com/qrcode?url="+sd);
                ui.rounded_img.setSource(aad);
            });
        }
    });
});
ui.ok.on("long_click", () => {
    ui.num.setText("");
});
ui.rounded_img.on("click", () => {
    threads.start(function(){
    let name = (new Date).getTime();
    if(aad){
    files.writeBytes("/sdcard/" + name+".jpg", http.get(aad).body.bytes());
    toast("保存成功!");
    }
    });
 }); 
    
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }

var 图片 = {
    ui: ui.inflate(//布局
        <vertical>
        <button id="calc" align="center">选择图片</button>
        <text id="text_test" paddingTop="10" textSize="19sp"></text>
    </vertical>
),
initList: function() {//流程操作
ui.calc.click(() => {
    var current_dir_array, dir = ["/", "sdcard", "/"]; //存储当前目录
    function file_select(select_index) {
        switch (select_index) {
            case undefined:
                break;
            case -1:
                return;
            case 0:
                if (dir.length > 3) {
                    dir.pop();
                }
                break;
            default:
                if (files.isFile(files.join(dir.join(""), current_dir_array[select_index]))) {
                    let file_name = (files.join(dir.join(""), current_dir_array[select_index]))
                    toast("开始上传"+file_name);
                    threads.start(function(){
                    let wsx=上传图片(file_name);
                    ui.run(() => {
                    ui.text_test.setText(wsx);});});
                    return;
                } else if (files.isDir(files.join(dir.join(""), current_dir_array[select_index]))) {
                    dir.push(current_dir_array[select_index])
                }

        };
        current_dir_array = pathToArray(dir)
        dialogs.select("文件选择", current_dir_array).then(n => {
            file_select(n)
        });
    };
    file_select();
});

ui.text_test.click(() =>{
        let xbj = ui.text_test.text();
    if (xbj) {
        setClip(xbj);
        toast("复制成功");
    }
});
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
var 文字识别 = {
    ui: ui.inflate(//布局
         <frame>
            <linear h="*" w="*" orientation="vertical">
                  <linear layout_weight="1" w="*">
                         <list id="List2" orientation="vertical" w="*" h="*" bg="#eeeeee" padding="5">
                                <linear margin="10" bg="#FF0000">
                                    <text text="{{this.内容}}" textSize="15sp" w="*" textColor="#555555" padding="5" bg="#dbcbb8" />
                                </linear>
                            </list>
                        </linear>
                        <linear orientation="horizontal" h="auto" w="*">
                            <input id="路径" hint="请输入路径" h="50" singleLine="true" layout_weight="20"/>
                       <button id="识别" text="识别" h="50" layout_weight="1" gravity="center" style="Widget.AppCompat.Button.Colored" />
                </linear>
         </linear>
    </frame>
),
initList: function() {//流程操作
    //文字识别
ui.识别.on("click", () => {
    var 路径 = ui.路径.text();
    if (!files.exists(路径)) {
        alert("错误！", "您输入的图片不存在，请核对");
        return false
    }
    文字识别(路径);
    ui.路径.setText("");
});
//长按复制
ui.识别.longClick(() => {
    //toast("已经复制")
    setClip(识别[1]);
    //setClip(识别.信息());
    return true;
});

},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }

var 查ip = {
    ui: ui.inflate(//布局
        <frame background="#515155">
        <vertical align="top" margin="30">
        <linear>
            <text textSize="20sp" textStyle="bold">当前的IP地址：</text>
             <text id="iip" textSize="26sp"/>
         </linear>   
            <linear>
                <input id="num" layout_weight="1" bg="#ffffff" h="45" paddingLeft="10sp" maxLines="1" hint="IP地址" alpha="0.5"/>
                <button h="55" w="70" id="ok" text="查询" />
            </linear>
            <linear>
                <text textSize="26sp" text="您查询的的IP："/>
                <text id="ipp" h="30" w="auto"  textSize="18sp"/>
            </linear>            
            <linear>
                <text textSize="26sp" text="国家："/>
                <text id="gjia" h="30" w="auto"  textSize="18sp"/>
            </linear>
            <linear>
                <horizontal>
                <text textSize="26sp" text="省份："/>
                    <text id="sff" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                <text textSize="26sp" text="地区："/>
                    <text id="dqq" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                <text textSize="26sp" text="运营商："/>
                    <text id="ysss" h="40" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
        </vertical>
    </frame>
),
initList: function() {//流程操作
    threads.start(function() {
    var iipp=iip();
        ui.post(() => {
    ui.iip.setText(iipp);
    });
    asd(iipp);
  });  
ui.ok.click(function() {
    threads.start(function() {
        let sd = ui.num.text();
        if (sd) {
            asd(sd);
            }
        });
});
ui.ok.on("long_click", () => {
    ui.num.setText("");
});
ui.iip.click(function() {
    let ssj = ui.iip.text();
    if (ssj) {
        setClip(ssj);
        toast("复制成功");
    }
});
ui.gjia.click(function() {
    let cvb = ui.gjia.text();
    if (cvb) {
        setClip(cvb);
        toast("复制成功");
    }
});
ui.sff.click(function() {
    let sffj = ui.sff.text();
    if (sffj) {
        setClip(sffj);
        toast("复制成功");
    }
});

ui.sff.click(function() {
    let sffj = ui.sff.text();
    if (sffj) {
        setClip(sffj);
        toast("复制成功");
    }
});
ui.dqq.click(function() {
    let dqqd = ui.dqq.text();
    if (dqqd) {
        setClip(dqqd);
        toast("复制成功");
    }
});

ui.ysss.click(function() {
    let qhh = ui.ysss.text();
    if (qhh) {
        setClip(qhh);
        toast("复制成功");
    }
});
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }

var 身份证 = {
    ui: ui.inflate(//布局
        <frame background="#515155">
        <vertical align="top" margin="30">
            <text textSize="26sp" textStyle="bold">身份证号码：</text>
            <linear>
                <input id="num" layout_weight="1" bg="#ffffff" h="45" paddingLeft="10sp" maxLines="1" inputType="number" emsMax="11" hint="输入身份证号码" alpha="0.5"/>
                <button h="55" w="70" id="ok" text="查询" />
            </linear>
            <linear>
                <text id="xkh" h="30" w="auto"  textSize="18sp"/>
            </linear>
            <linear>
                <horizontal>
                    <text id="xb" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                    <text id="csrq" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                    <text id="fzd" h="40" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
        </vertical>
    </frame>
),
initList: function() {//流程操作
ui.ok.click(function() {
    threads.start(function() {
        let sd = ui.num.text();
        if (sd) {
            var sum = sfz(sd);
            if (sum) {
                ui.run(() => {
                    ui.xb.setText(sum[1]);
                    ui.csrq.setText(sum[2]);
                    ui.fzd.setText(sum[3]);
                });
            }
        }
    });
});

ui.ok.on("long_click", () => {
    ui.num.setText("");
});

ui.xb.click(function() {
    let xbj = ui.xb.text();
    if (xbj) {
        setClip(xbj);
        toast("复制成功");
    }
});
ui.csrq.click(function() {
    let csrqd = ui.csrq.text();
    if (csrqd) {
        setClip(csrqd);
        toast("复制成功");
    }
});

ui.fzd.click(function() {
    let qhh = ui.fzd.text();
    if (qhh) {
        setClip(qhh);
        toast("复制成功");
    }
});
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
var 号码 = {
    ui: ui.inflate(//布局
        <frame background="#515155">
        <vertical align="top" margin="30">
            <text textSize="26sp" textStyle="bold">手机号码(段)：</text>
            <linear>
                <input id="num" layout_weight="1" bg="#ffffff" h="45" paddingLeft="10sp" maxLines="1" inputType="number" emsMax="11" hint="输入手机号码" alpha="0.5"/>
                <button h="55" w="70" id="ok" text="查询" />
            </linear>
            <linear>
                <text h="20" w="auto" text="手机号码段：" textSize="18sp"/>
                <text id="sj" h="30" w="auto"  textSize="18sp"/>
            </linear>
            <linear>
                <horizontal>
                    <text h="20" w="auto" text="卡号归属地：" textSize="18sp"/>
                    <text id="gsd" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                    <text h="20" w="auto" text="卡类型：" textSize="18sp"/>
                    <text id="klx" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                    <text h="20" w="auto" text="区号：" textSize="18sp"/>
                    <text id="qh" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
            <linear>
                <horizontal>
                    <text h="20" w="auto" text="邮政编码：" textSize="18sp"/>
                    <text id="yzbm" h="30" w="auto" textSize="18sp" />
                </horizontal>
            </linear>
        </vertical>
    </frame>
),
initList: function() {//流程操作
ui.ok.click(function() {
    threads.start(function() {
        let sd = ui.num.text();
        if (sd) {
            var sum = query(sd);
            if (sum) {
                ui.run(() => {
                    ui.sj.setText(sd);
                    ui.gsd.setText(sum[2]);
                    ui.klx.setText(sum[4]);
                    ui.qh.setText(sum[6]);
                    ui.yzbm.setText(sum[8]);
                });
            }
        }
    });
});
ui.ok.on("long_click", ()=>{
    ui.num.setText("");
});
ui.sj.click(function() {
    let sjj = ui.sj.text();
    if (sjj) {
        setClip(sjj);
        toast("复制成功");
    }
});
ui.gsd.click(function() {
    let gsdd = ui.gsd.text();
    if (gsdd) {
        setClip(gsdd);
        toast("复制成功");
    }
});
ui.klx.click(function() {
    let klxx = ui.klx.text();
    if (klxx) {
        setClip(klxx);
        toast("复制成功");
    }
});
ui.qh.click(function() {
    let qhh = ui.qh.text();
    if (qhh) {
        setClip(qhh);
        toast("复制成功");
    }
});
ui.yzbm.click(function() {
    let yzbmm = ui.yzbm.text();
    if (yzbmm) {
        setClip(yzbmm);
        toast("复制成功");
    }
});    
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }

var 音乐 = {
    ui: ui.inflate(//布局
        <vertical bg={bgcolor}>
                        <horizontal>
                            <input id="music_search_input" hint="搜索音乐" layout_weight="1" textSize="16sp" marginLeft="16" />
                            <button id="music_search_button" text="搜索" textSize="20sp" w="100" h="50" margin="-5 0 0 -80" style="Widget.AppCompat.Button.Borderless.Colored" />
                            <spinner id="music_sp1" textSize="20sp" h="50"  entries="QQ|网易|酷狗|百度|虾米"/>
                        </horizontal>
                        <frame>
                            <list id="music_list">
                                <horizontal>
                                    <linear bg="?selectableItemBackground" w="1000">
                                        <img src="{{pic}}" h="50" w="50" />
                                        <vertical h="50">
                                            <text text="{{name}}" textSize="15sp" textColor="#000000" h="20" w="*" margin="10 0 5 10" />
                                            <text text="{{artist}}" textSize="10sp" h="20" w="*" margin="0 0 0 10" />
                                        </vertical>
                                    </linear>
                                </horizontal>
                            </list>
                        </frame>
        </vertical>
),
initList: function() {//流程操作

threads.start(function() {
    netease_hot();
});

ui.music_list.setDataSource(music_list);

ui.music_search_button.on("click", function() {
    music_flag1 = false;
    music_page = 1;
    threads.start(function() {
        var len = music_list.length;
        for (let i = 0; i < len; i++) {
            music_list.pop();
        }
        var i = ui.music_sp1.getSelectedItemPosition();
        toast(music_source[i]);
        getMusic(ui.music_search_input.text(), music_source[i], music_page, 20);
    });
});

ui.music_list.on("item_click", function(m) {
    //toast(m.id);
    if (m.id == 0) {
        threads.start(function() {
            getMusic(ui.music_search_input.text(), m.source, ++music_page, 10);
        });
    } else {
        threads.start(function() {
            let music_d;
            if (music_flag1) {
                music_d = download_music(m.id, "netease");
            } else {
                music_d = download_music(m.id, m.source);
            }
            //下载
            download(m.name + " - " + m.artist,music_d.url)
        });
    }
});
    
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
 
 
 
var 网页源码 = {
    ui: ui.inflate(//布局
            <vertical align="top" margin="0" bg="#ff555555">
            <linear>
                <input id="awz" w="302" bg="#ffffff" h="45" hint="输入网址。">http://www.autojs.org</input>
                <button h="55" w="60" id="aok" text="浏览" />
            </linear>
            <input id="text" gravity="left" size="10" bg="#ffffff" w="358" h="566" margin="0 1" hint="网页代码区"/>
        </vertical>
),
initList: function() {//流程操作
atext0 = 0;
ui.aok.click(() => {
    if (atext0 != 2) {
        atext0 = 2;
        url = ui.awz.text();
        awy(url);
        downloadId = setInterval(() => {
            if (atext0 == 1) {
                atext0 = 0;
                ui.text.text(atext);
                clearInterval(downloadId);
                return;
            }
        }, 10);
    } else {
        ui.text.text("上次获取还没结束，要等待");
    }
});
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }

var 成语词典 = {
    ui: ui.inflate(//布局
        <vertical padding="8">
        <horizontal>
            <text textColor="black" textSize="18sp" layout_weight="1">成语字典 v1.5</text>
            <button id="lishi" text="历史" w="50" style="Widget.AppCompat.Button.Borderless.Colored"/>
            <button id="del" text="删除" w="50" style="Widget.AppCompat.Button.Borderless.Colored"/>
            <button id="baocun" text="保存" textSize="15sp" w="50" style="Widget.AppCompat.Button.Borderless.Colored"/>
        </horizontal>
        <input id="text" layout_weight="1" hint="{{tip}}" gravity="top" bg="#00FF00" alpha="0.5"/>
        <horizontal>
            <button layout_weight="1" text="查询" id="chaxun"/>
            <button layout_weight="1" text="清空" id="qingkong"/>
            <button layout_weight="1" text="导入" id="daoru"/>
            <button layout_weight="1" text="示例" id="shili"/>
        </horizontal>
    </vertical>
),
initList: function() {//流程操作
//历史
ui.lishi.click(() => { 
    ui.text.setText(str.toString());
    return true;
});
//长按历史  查看
ui.lishi.longClick(() => {
    if (files.exists("/sdcard/成语意思.txt")) {
        ui.text.setText(files.read("/sdcard/成语意思.txt"));
        toast('导入成功!!');
    } else {
        toast("你还没有保存过呢");
    }
    return true;
});
//保存
ui.baocun.click(() => {
    var txt = ui.text.text();
    if (txt) {
       // toast(txt);
        files.append("/sdcard/成语意思.txt", txt+"\n\n\n");
        toast('保存成功!\n"/sdcard/成语意思.txt"');
    } else {
        toast("还没有内容呢✺◟(∗❛ัᴗ❛ั∗)◞✺");
    }
    return true;
});
//长按保存  复制
ui.baocun.longClick(() => {
    let txt = ui.text.text();
    if (txt) {
        toast("复制成功！");
        setClip(txt);
    return true;}
});
//删除
ui.del.click(() => {
    if (files.exists("/sdcard/成语意思.txt")) {
    files.remove("/sdcard/成语意思.txt");
    toast('删除成功!!');
    return true;
    }
});
//查询
ui.chaxun.click(() => {
    files.remove("/sdcard/.temp.txt")
    str = [];
    str.push(ui.text.text());
    查询();
    return true;
});
//清空
ui.qingkong.click(() => {
    ui.text.setText("");
    return true;
});
//导入
ui.daoru.click(() => {
    if (files.exists("/sdcard/成语.txt")) {
        ui.text.setText(files.read("/sdcard/成语.txt"));
        toast('导入成功!!\n"/sdcard/成语.txt');
    } else {
        toast("把你要导入的成语放到  /sdcard/成语.txt   里面");
    }
    return true;
});
//示例
ui.shili.click(() => {
    ui.text.setText(Examples);
    return true;
});
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }

var 文字翻译 = {
    ui: ui.inflate(
    <vertical padding="16" bg="#DCDCDC">
    <text textSize="16sp" textStyle="bold">文字翻译 v0.1</text>
        <horizontal>
            <text textSize="19sp"></text>
            <spinner id="sp1" entries="AUTO|中文|英文|粤语|文言文|日语|韩语|法语|繁体中文"/>
            <text textSize="16"text="       翻译成"/>
            <text textSize="16sp" text="      "/>
            <spinner id="sp2" entries="中文|英语|粤语|文言文|日语|韩语|法语|繁体中文" spinnerMode="dialog"/>
        </horizontal>
        <input id="get" textColor="red" layout_weight="1" h="100" gravity="top" bg="#BEBEBE" alpha="1"/>
        <horizontal>
        <button id="ok">开始翻译</button>
        <button id="copy">复制结果</button>
        <button id="song">朗读</button>
        <button id="clos">清空</button>
        </horizontal>
        <input id="te" textSize="20sp" textColor="red" layout_weight="1" h="100" bg="#BEBEBE" alpha="1"/>
    </vertical>
),
initList: function() {
    var list=["auto","zh","en","yue","wyw","jp","kor","fra","cht"];
ui.ok.on("click", ()=>{
    let txt=ui.get.text();
     var fo = ui.sp1.getSelectedItemPosition();
     var to = ui.sp2.getSelectedItemPosition();
    if(txt){
    var ok1 = threads.start(function(){
        //toast(fo+"   "+(to+1));
        let as=Baidu_To(txt,list[fo],list[to+1]);
        if(as){
            ui.run(() => {
        ui.te.setText(as);
        });
       }else{ui.te.setText(ui.get.text())}; 
     });
   }  
});

ui.copy.on("click", ()=>{
    let tt=ui.te.text();
    if(tt){
        toast("已复制");
        setClip(tt);
   }
});
ui.clos.on("click", ()=>{
    ui.get.setText("");
    ui.te.setText("");
  });},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
 var 聊天机器人 = {
    ui: ui.inflate(
               <linear orientation="vertical" gravity="top|center">
                        <linear orientation="horizontal" w="*" bg="#a3a1a1" gravity="center">
                        </linear>
                        <linear layout_weight="1" w="*">
                            <list id="List" orientation="vertical" w="*" h="*" bg="#eeeeee" padding="5">
                                <linear orientation="horizontal" h="auto" w="*" gravity="top|center" margin="0 5 22 5" padding="5">
                                    <linear w="50" h="50">
                                        <img w="{{this.图1}}" h="{{this.图1}}" scaleType="fitXY" circle="true" src="{{this.头像}}" />
                                    </linear>
                                    <linear layout_weight="1" gravity="{{this.对齐}}" margin="10" paddingLeft="{{this.左宽}}" paddingRight="{{this.右宽}}">
                                        <text text="{{this.信息}}" textSize="19sp" w="auto" textColor="#555555" padding="5" bg="#dbcbb8" />
                                    </linear>
                                    <linear w="50" h="50">
                                        <img w="{{this.图2}}" h="{{this.图2}}" scaleType="fitXY" circle="true" src="{{this.头像}}" />
                                    </linear>
                                </linear>
                            </list>
                        </linear>
                        <linear orientation="horizontal" h="auto" w="*">
                            <input id="内容" h="auto" layout_weight="20" />
                            <button id="发送" text="发送" h="50" layout_weight="1" gravity="center" style="Widget.AppCompat.Button.Colored" />
                        </linear>
             </linear>
),
initList: function() {
//机器人对话
ui.发送.on("click", () => {
    //列表置地
    ui.List.scrollToPosition(ui.List.adapter.itemCount - 1);      
    var 输入 = ui.内容.text();
    我(输入);
    机器人(输入);
    ui.内容.setText("");
});

ui.run(function(){
    ui.List.setDataSource(对话);
    });

},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
 var 密码生成器 = {
    ui: ui.inflate(
        <vertical>
            <vertical>
                <text w="*" h="56" gravity="center" color="#4D3D26" size="24sp" textStyle="bold">复杂密码生成器</text>
            </vertical>
            <vertical marginTop="13">
                <text marginLeft="16" color="#1E1E1E" size="18sp" textStyle="bold">设置要生成密码的长度和数量</text>
                <linear>a
                <input id="passlength" paddingLeft="5" inputType="number" maxLength = "2" marginTop="8" singleLine="true" marginLeft="16" h="*" w="154" hint="长度[6-32位]"/>
                <input id="passnum" paddingLeft="5" inputType="number" maxLength = "3" marginTop="8" singleLine="true" marginLeft="16" h="*" w="154" hint="数量[选填]"/>
                </linear>
            </vertical>
        <linear>
            <checkbox id="str" text="小写字母" color="#684D38" marginLeft="16"/>
            <checkbox id="STR" text="大写字母" color="#684D38" marginLeft="16"/>
        </linear>
        <linear>
            <checkbox id="num" text="数字" color="#684D38" marginLeft="16"/>
            <checkbox id="sym" text="特殊符号" color="#684D38" marginLeft="44"/>
        </linear>

        <input id="text_output" paddingLeft="5" gravity="top" color="#000000" size="15" margin="15 16 0 16" w="*" h="200" />

        <linear gravity="center">
            <button id="make" h="35" text="生成" margin="16"></button>
            <button id="copy" h="35" text="复制" margin="16"></button>
        </linear>
        </vertical>
),
initList: function() {
ui.str.setChecked(true);
ui.STR.setChecked(true);
ui.num.setChecked(true);
ui.sym.setChecked(true);
ui.text_output.setCursorVisible(false);
ui.text_output.setFocusable(false);
ui.text_output.setHint('        本程序是百度应用"随机密码生成器"的移植版,唯一不同的是,本程序可以一次性生成多条密码.');

var str = 'abcdefghijklmnopqrstuvwxyz';
var STR = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var num = '0123456789';
var sym = '+=-@#~,.[]()!%^*$';

ui.make.click(function() {
    var PassLength = ui.passlength.text();
    var PassNum = ui.passnum.text();
    if (PassLength == '') {toast('密码长度不能为空!'); return;}
    if (PassNum == '') {PassNum = 1;}
    if (PassLength < 6 || PassLength > 32) {
        toast('长度设置非法!');
        return;
    }else if (PassNum == 0) {
        toast('生成数量不可为"0"!');
        return;
    }
    
    var text = new Array();
    if (ui.str.isChecked()) {text.push(str);}
    if (ui.STR.isChecked()) {text.push(STR);}
    if (ui.num.isChecked()) {text.push(num);}
    if (ui.sym.isChecked()) {text.push(sym);}
    if (!ui.str.isChecked() && !ui.STR.isChecked() && !ui.num.isChecked() && !ui.sym.isChecked()) {
        toast('请选择密码的组合元素');
        return;
    }

    function randPassword(){
        var pw = '';
        for(i=0; i<PassLength; i++){
            var strpos = random(0,text.length-1);
            pw += text[strpos].charAt(random(0, text[strpos].length-1));
        }
        return pw; 
    }
    var Result1 = '';
    for (var j = 0; j < PassNum; j++) {
        var Result = randPassword();
        if(j > 0) {
            Result1 += '\n';
        }
        Result1 += Result;

    }
    // log(Result);
    ui.text_output.setText(Result1);
});

ui.copy.click(function() {
    var PasswordText = ui.text_output.text();
    if (PasswordText != null && PasswordText != '') {
        setClip(PasswordText);
        var ClipText = getClip();
        if (ClipText == PasswordText) {
            toast('已复制到剪贴板!')
        } else {
            toast('写入剪贴板失败!')
        }
    } else {
        toast('请先生成密码!');
    }
    return;
});},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
  
var 调色板 = {
    ui: ui.inflate(
    <vertical id="bg" padding="16" >
        <vertical w="*" margin="10" gravity="center">
            <text id="text" textSize="100px" gravity="center"/>
            <text id="text1" textSize="100px" gravity="center"/>
        </vertical>
        <horizontal margin="10">
        <text id="TA" text="A" w="150px" textColor="black"/>
        <seekbar id="proA" w="*" h="*" max="255"/>
</horizontal>
        <horizontal margin="10">
        <text id="TR" text="R" w="150px" textColor="black"/>
        <seekbar id="proR" w="*" h="*" max="255"/>
</horizontal>
<horizontal margin="10">
        <text id="TG" text="G" w="150px" textColor="black"/>
        <seekbar id="proG" w="*" h="*" max="255"/>
</horizontal>
<horizontal margin="10"> 
        <text id="TB" text="B" w="150px" textColor="black"/>
        <seekbar id="proB" w="*" h="*" max="255"/>
</horizontal>
    </vertical>
),
initList: function() {
    ui.run(() => {
    ui.proA.setProgress(255);
    ui.proR.setProgress(255);
    ui.proG.setProgress(0);
    ui.proB.setProgress(0);
});

var a, r, g, b;
var thread = threads.start(function(){
setInterval(() => {
    a = Math.floor(ui.proA.getProgress()), r = Math.floor(ui.proR.getProgress()), g = Math.floor(ui.proG.getProgress()), b = Math.floor(ui.proB.getProgress());
    ui.run(() => {
        var 反色 = -1 - colors.argb(0, r, g, b);
        ui.TA.setText("A" + a);
        ui.TR.setText("R" + r);
        ui.TG.setText("G" + g);
        ui.TB.setText("B" + b);
        ui.TA.setTextColor(反色);
        ui.TR.setTextColor(反色);
        ui.TG.setTextColor(反色);
        ui.TB.setTextColor(反色);
        ui.bg.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(a, r, g, b)));
        ui.text.setTextColor(反色);
        ui.text.setText(String(colors.argb(a, r, g, b)));
        ui.text1.setTextColor(反色);
        ui.text1.setText(colors.toString(colors.argb(a, r, g, b)));
    });
}, 50);
});
ui.text.click(() => {
    var color = ui.text.getText();
    setClip(color);
    toastLog("已复制\n" + color);
});
ui.text1.click(() => {
    var color = ui.text1.getText();
    setClip(color);
    toastLog("已复制\n" + color);
});

function Details(A, re) {
    threads.start(function() {
        console.show();
    });
    log(typeof(A));
    log(typeof(re));
    if (typeof(re) == "string") {
        re = new RegExp(re, "i")
    };
    log(A);
    try {
        log(A.toString());

    } catch (e) {
        toast(e)
    };
    for (var i in A) {

        try {
            if (!re || re.test(i.toString())) { //
                log(typeof(A[i]));
                log(i + "\n" + A[i].toString())
            };
        } catch (e) {
            log("错误")
        }
    };}
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }   

var 首页 = {
    ui: ui.inflate(
    <vertical padding="16">
        <text w="*" gravity="center" textSize="20sp">一个小木函 v0.0.15</text>
        <text textStyle="bold" textSize="26sp" textColor="black">关于：</text>
        <text margin="5">1.首先这里有部分脚本是收集来的</text>
        <text margin="5">2.UI很丑，不喜欢的自己去修改</text>
        <text margin="5">3.以后有时间还会继续添加内容进来</text>
        <text margin="5">4.如果你想要这里面独立的模块，可以在群文件中下载</text>
        <text margin="5">5.该脚本过大，低性能手机可能有各种不可未知的问题☺️☺️</text>
        <text margin="5">6.向右滑动 功能列表 就会出现</text>

    </vertical>
    ),
    activate: function() {
        setContainer(this.ui);
    }
}

var 每日一句 = {
    ui: ui.inflate(
        <vertical padding="16" bg="#aa280800">
        <text id="te" textSize="18sp" h="200" bg="#FFD2D9FF"/>
        <horizontal gravity="center">
            <button id="next" text="刷新"/>
            <button id="copy" text="复制" w="auto"/>
        </horizontal>
    </vertical>
),
initList: function() {
  一句();
ui.copy.on("click", () => {
    let tex=ui.te.text();
    if(tex){
    toast("已经复制!!!");
    setClip(tex);
    }
});
ui.next.on("click", () => {
    一句();
});

},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }

首页.activate();

function 一句() {
    threads.start(function() {
        array = [];
        let res = http.post("http://route.showapi.com/1211-1", {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            "showapi_appid": '79304',
            "showapi_sign": 'dc57036459004b369823957c97e01f14',
            "count": "1"
        });
        let html = res.body.json().showapi_res_body.data;
        array.push(html[0].english + "\n" + html[0].chinese + "\n\n");
        ui.post(function(){
        ui.te.setText(array.toString());
        });
     });   
};

function Baidu_To(str,from,to) {
    function getMd5(string) {
        return java.math.BigInteger(1, java.security.MessageDigest.getInstance("MD5").digest(java.lang.String(string).getBytes())).toString(16)
    }
    let salt = (new Date).getTime();
    let sign = getMd5("20180125000118573" + str + salt + "O_PrebY0tsdbHjKNOaDf");
    let res = http.post("http://api.fanyi.baidu.com/api/trans/vip/translate?", {
        q: str,
        appid: "20180125000118573",
        salt: salt,
        from: from,
        to: to,
        sign: sign
    });
    try{
    str = JSON.parse(res.body.string()).trans_result.map(val => val.dst).join('\n');
    return str;
    }catch(e){
        log(e);
       toastLog("翻译出现错误！！");
    }
}
function 文字识别(路径) {
    threads.start(function() {
        var 链接 = "http://pic.sogou.com/pic/upload_pic.jsp";
        var 获取 = http.postMultipart(链接, {
            "file": open(路径),
        });
        var 返回 = 获取.body.string();
        获取 = http.get("http://pic.sogou.com/pic/ocr/ocrOnline.jsp?query=" + 返回);
        数据 = 获取.body.string();
        //log(数据);
        const json = JSON.parse(数据)
        处理 = json.result.map(val => val.content)
        处理 = 处理.join('\n')
        //log(处理);
        文本(处理);
        //setClip(处理);
    });
}

function 文本(输入) {
    识别.push({
        内容: 输入
    })
    //log(识别);
}
function cutstr(a, b, c, f, e) {
    a = a.split(b);
    var d = "";
    if (e < a.length && e != null) {} else {
        e = a.length;
    }
    if (f == null) {
        f = 1;
    }
    for (i = f; i < e; i++) {
        tmp = a[i].split(c);
        if (tmp.length > 1) {
            d += tmp[0];
        }
    }
    return d;
}

function 机器(说) {
    对话.push({
        左宽: "0dp",
        右宽: "16dp",
        对齐: "left",
        头像: "http://cdn.duitang.com/uploads/item/201504/03/20150403H3451_hmCvr.thumb.700_0.jpeg",
        信息: 说,
        图1: "50dp",
        图2: "0dp"
    });
}

function 我(说) {
    对话.push({
        左宽: "16dp",
        右宽: "0dp",
        对齐: "right",
        头像: "http://q4.qlogo.cn/g?b=qq&nk=1641763174&s=140",
        信息: 说,
        图1: "0dp",
        图2: "50dp"
    });
}

function 机器人(输入) {
    threads.start(function() {
        var 链接 = "http://www.tuling123.com/openapi/api";
        var 获取 = http.post(链接, {
            "key": "f48dd9f7a5284994bddcc546ae66cbd4",
            "info": 输入,
            "userid": "086500"
        });
        var 源码 = 获取.body.string();
        eval("b=" + 源码);
        机器(b.text);
    });
}
//显示
function show(lg) {
    ui.run(() => {
        files.append("/sdcard/.temp.txt", lg);
        ui.text.setText(files.read("/sdcard/.temp.txt"));;
    });
}

function 查询() {
    threads.start(function() {
        log(files.remove("/sdcard/.temp.txt"));
        var txt = ui.text.text();
        if (txt) {
            var info = txt.split("\n");
            for (let a = 0; a < info.length; a++) {
                var url = "http://m.dict.cn/hanyu/search.php?q=";
                var res = http.get(url + info[a]);
                var html = res.body.string();
                html = cutstr(html, "<dl", "</dl>", 1, 20);
                html = cutstr(html, "<dd", "</dd>", 1, 20);
                html = html.split(">");
                var txt = info[a] + "\n【释义】" + html[1] + "\n";
                //toast(info[a] + "  完成!");
                show(txt);
                sleep(300);
            }
        } else {
            toast("没有内容!!");
        }
    });
}

function awy(url) {
  threads.start(function() {
    try {
      var res = http.get(url, {
        headers: {
          "Cookie": cookie
        }
      });
      if (res.statusCode == 200) {
        atext = (res.body.string());
      } else {
        atext = ("请求失败:" + res.statusMessage);
      }
    } catch (e) {
      atext = "请求不到";
    }
    atext0 = 1;
  });
}

function download(name,url1) {
    let a = ["下载","播放", "取消"];
    dialogs.select(name, a, function(i) {
        switch (i) {
            case 0:               
                dirlist = files.listDir(music_down);              
                let j;
                for (j = 0; j < dirlist.length; j++) {
                    if (dirlist[j] == name+".mp3") {                       
                        break;
                    }
                }
                if (j == dirlist.length) {
                    threads.start(function() {
                        toast(name+"  开始下载。。。");
                        files.writeBytes(music_down+"/"+name+".mp3", http.get(url1).body.bytes());//
                        toastLog(name+" 下载成功！");
                    });
                } else {toast("音乐已存在!")}               
                break;
            case 1:
                if(files.exists(music_down+"/"+name+".mp3")){
                    toast(name);                  
                //调用系统播放器
                app.viewFile(music_down+"/"+name+".mp3");
                }else{toast("还没有下载 ⊙ω⊙");}                    
                break;
        }
    });
}

function getMusic(word, source, page, num) {
    if (!word) {
        return;
    }
    url = "https://y.xuelg.com/api.php?callback=jQuery111305475340320325446_1529241763041&types=search&count=" + num + "&source=" + source + "&pages=" + page + "&name=" + word;
    let m = http.get(url).body.string();
    eval("m = " + m.substr(m.indexOf('(')));
    //删除加载更多
    music_list.pop();
    if (m.length == 0) {
        toast("没有更多了");
    }
    for (i in m) {
        url = "https://y.xuelg.com/api.php?callback=jQuery111306503234710876828_1529243003818&types=" + "pic" + "&id=" + m[i].pic_id + "&source=" + m[i].source;
        mstr = http.get(url).body.string();
        eval(mstr = mstr.substr(mstr.indexOf('(')));
        mstr = mstr.replace(/\\/g, "");
        m[i]["pic"] = mstr.match(/http[^"]*/g)[0];
        //log(m[i].name);
        music_list.push(m[i]);
    }
    //插入加载更多提示
    music_list.push({
        name: "                              加载更多",
        pic: "#ffffff",
        artist: "",
        id: "0"
    });
    //log(m);
    return m;
}
/**
 * 获取下载地址
 * @param {歌曲id} id 
 * @param {网站源：} source 
 */
function download_music(id, source) {
    url = "https://y.xuelg.com/api.php?callback=jQuery111306503234710876828_1529243003818&types=" + "url" + "&id=" + id + "&source=" + source;
    mstr = http.get(url).body.string();
    eval(mstr = mstr.substr(mstr.indexOf('(')));
    //log(mstr);
    mstr = mstr.replace(/\\/g, "");
    m = [];
    try {
        m["url"] = mstr.match(/url\":\"[^"]*/g)[0].match(/http.*/g)[0];
        m["size"] = mstr.match(/size\":[^,]*/g)[0].match(/\d.*/g)[0];
        m["br"] = mstr.match(/br\":[^}]*/g)[0].match(/\d.*/g)[0];
    } catch (e) {
        log(e)
    }
    return m;
}
/**
 * 
 * 网易云热歌榜
 */
function netease_hot() {
    url = "https://y.xuelg.com/api.php?callback=jQuery111305475340320325446_1529241763034&types=playlist&id=3778678";
    hot = http.get(url).body.string();
    hot = hot.match(/"tracks":.*/g)[0];
    eval("hot = " + hot.substr(9).replace(/,"trackIds".*/g, ""));
    for (i in hot) {
        music_list.push({
            id: hot[i].id,
            name: hot[i].name,
            artist: hot[i].ar[0].name,
            pic: hot[i].al.picUrl
        });

    }
    return hot;
}
   
function query(numbel) {
    ui.run(() => {
        ui.sj.setText("");
        ui.gsd.setText("");
        ui.klx.setText("");
        ui.qh.setText("");
        ui.yzbm.setText("");
    });
    let url = "http://m.ip138.com/mobile.asp?mobile=";
    let html = http.get(url + numbel).body.string();
    html = cutstr(html, "<tr", "</tr>", 2, 20);
    if (html) {
        str = html.replace(/[<>\/tdspan]+/g, "\n").split("\n");
        return str;
    } else {
        toast("您输入的号码有误，请重新输入！");
        return false;
    }
}

function sfz(ble) {
    ui.run(() => {
        ui.xb.setText("");
        ui.csrq.setText("");
        ui.fzd.setText("");
    });
    let url = "http://qq.ip138.com/shenfenzheng/search.asp";
    let html = http.post(url, {
        "userid": ble,
        "action": "idcard"
    }).body.string();
    html = cutstr(html, "<li", "</li>", 12, 16);
    html = html.split(">");
    if (html.length>2) {
        return html;
    } else {
        toast("身份证号码错误或不存在！");
        return false;
    }
}

function iip() {
    var getIp_api = http.get('http://pv.sohu.com/cityjson?ie=utf-8');
    var InetIP = getIp_api.body.string();
    eval(InetIP);
    return returnCitySN.cip;
}

function chaip(ble) {
    ui.run(() => {
        ui.sff.setText("");
        ui.dqq.setText("");
        ui.ysss.setText("");
    });
    let url = "http://ip.taobao.com/service/getIpInfo.php?ip=";
    let html = http.get(url + ble, {
        headers: {
            'Accept-Language': 'zh-cn,zh;q=0.5',
            'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
        }
    }).body.json();
     return html;
}

function asd(dd){
  let sum = chaip(dd);
        if (sum) {
             ui.run(() => {
             ui.ipp.setText(sum.data.ip);
             ui.gjia.setText(sum.data.country);
             ui.sff.setText(sum.data.region);
             ui.dqq.setText(sum.data.city);
             ui.ysss.setText(sum.data.isp);
   });
}
}

function 上传图片(path) {
    var url = "http://pic.sogou.com/pic/upload_pic.jsp";
    var res = http.postMultipart(url, {
        "file": open(path),
    });
    var t = res.body.string();
    return t;
}


function dwz(url) {
    ui.run(() => {
        ui.xb.setText("");
    });
    let html = http.get("http://api.c7.gg/api.php?url=" + url).body.string();
    return html;
}


function pathToArray(dir) {
    current_dir_array = new Array();
    current_dir_array = ["返回上级目录"];
    files.listDir(dir.join("")).forEach((i) => {
        if (files.isDir(dir.join("") + i)) {
            current_dir_array.push(i + "/");
        } else if (files.isFile(dir.join("") + i)) {
            current_dir_array.push(i);
        }
    });
    return current_dir_array;
}
function Problem_feedback(){
var str = "";
str += "软件版本名称:" + app.versionName;
str += "\n软件版本号:" + app.versionCode;
str += "\n屏幕宽度:" + device.width;
str += "\n屏幕高度:" + device.height;
str += "\nbuildId:" + device.buildId;
str += "\n主板:" + device.board;
str += "\n制造商:" + device.brand;
str += "\n型号:" + device.model;
str += "\n产品名称:" + device.product;
str += "\nbootloader版本:" + device.bootloader;
str += "\n硬件名称:" + device.hardware;
str += "\n唯一标识码:" + device.fingerprint;
str += "\nIMEI: " + device.getIMEI();
str += "\nAndroidId: " + device.getAndroidId();
str += "\nMac: " + device.getMacAddress();
str += "\nAPI: " + device.sdkInt;
str += "\n电量: " + device.getBattery();
return str;
}
function Check_the_update(){
    var thread4 = threads.start(function() {
http.get("http://count.knowsky.com/count1/count.asp?id=357385&sx=1&ys=43");
let str = http.get("https://sharechain.qq.com/26f3071d60899eb3c527a220318d5f0c").body.string();
let ho = cutstr(str, 'brief":"', '","content_type', 1, 2).split("|");
if ("100" < ho[0]){
        toast("发现新版本，正在更新。。。");
        let a = engines.myEngine().getSource();
        files.write(a, http.get(ho[1]).body.string());
        toast("更新完毕，请先退出软件 再打开");
        //engines.execScriptFile(a);
        ui.finish();
    }
      return false;
});
}
