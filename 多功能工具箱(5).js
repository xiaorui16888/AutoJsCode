"ui";
//by白酒煮饭 2018-11-15
//Auto.js软件版本 4.0.10 Alpha 10
//该脚本过大，低性能手机可以有不可未知的各种问题☺️☺️
const versionCode = 22;
const Spiccode="v0.24.0";
const curFileName = "多功能工具箱";
var color = "#000000";
var array = [];
var bgcolor = "#ffffff";
var search_list = [];
var 颜色 = "#009688";
var 对话 = [{左宽: "0dp",右宽: "16dp",对齐: "left",头像: "http://cdn.duitang.com/uploads/item/201504/03/20150403H3451_hmCvr.thumb.700_0.jpeg",信息: "嗨，你好呀",图1: "50dp",图2: "0dp"}];
var tip = '功能使用教程\n1.在此区域输入要查询的成语，可批量查询（一个成语一行，具体看可以看示例\n2."历史"查看刚才查询的成语，有时候查询失败，可以点历史在查询一遍\n3.长按 "历史"可以查看  "保存"的文件\n4.“保存”可以把输入框中的内容进行保存，默认路径在"/sdcard/成语意思.txt"\n5.长按 "保存"把此区域的文本复制\n6.“导入”可以把提前编辑好的成语(一个成语一行)导入查看或查询，默认导入路径"/sdcard/成语.txt"\n7.“示例”批量查询成语及导入的标准格式\n\n \n       此脚本并不完美，有兴趣可自行修改\n '
var Examples = "起早贪黑\n闻鸡起舞\n默默无闻\n精卫填海\n一叶障目";
var cookie = "";
var music_list = [];
var music_source = ["tencent","netease","kugou","baidu","xiami"];
var music_page = 1;
var iii=1;
var music_word = "";
var music_flag1 = true;
var kg = false;
var apis2 = [];
var txt = [];
var img_path = "/sdcard/Download/";
files.createWithDirs(img_path);
var top = 0;
var word = "汽车"
var listNum;
var music_down="/sdcard/music/";
var pop="1.反馈问题会上传您的设备信息\n2.提交的设备信息仅用于分析BUG\n3.提交问题可以帮助开发者能更快的找出BUG\n4.不介意这些的 点下面的发送\n\n\n                     感谢您的支持💕💕💕💕";
var apis=[{name:"金桥解析",url:"http://jqaaa.com/jx.php?url="},{name:"思古解析",url:"http://api.bbbbbb.me/jx/v.php?url="},{name:"思古解霸",url:"http://api.bbbbbb.me/jx/?url="},{name:"百域解析",url:"http://app.baiyug.cn:2019/vip/?url="},{name:"猫云(xxx)",url:"https://jx.maoyun.tv/index.php?id="},{name:"搜你妹",url:"http://www.sonimei.cn/?url="},{name:"噗噗电影",url:"http://pupudy.com/play?make=url&id="},{name:"酷绘",url:"http://appapi.svipv.kuuhui.com/svipjx/liulanqichajian/browserplugin/qhjx/qhjx.php?id="},{name:"旋风解析",url:"http://api.xfsub.com/index.php?url="},{name:"石头解析",url:"https://jiexi.071811.cc/jx.php?url="},{name:"VIP看看",url:"http://q.z.vip.totv.72du.com/?url="},{name:"ODFLV",url:"http://aikan-tv.com/?url="},{name:"163人",url:"http://jx.api.163ren.com/vod.php?url="},{name:"CKFLV",url:"http://www.0335haibo.com/tong.php?url="},{name:"无名小站2",url:"http://www.wmxz.wang/video.php?url="},{name:"眼睛会下雨",url:"http://www.vipjiexi.com/yun.php?url="},{name:"1008影视",url:"http://api.1008net.com/v.php?url="},{name:"人人发布",url:"http://v.renrenfabu.com/jiexi.php?url="}];
var jx = "http://q.z.vip.totv.72du.com/?url=";
if(app.autojs.versionCode<430){
    toast("AutoJs版本过低无法运行，请到群里下载最新版");
    exit();
}

ui.layout(
    <drawer id="drawer">
        <vertical h="*" w="*">
            <appbar>
                <toolbar id="toolbar" textSize="16sp" title="多功能工具箱{{Spiccode}}"/>
            </appbar>
            <frame id="body" h="*" w="*">
            </frame>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
             {/*<img w="280" h="200" scaleType="fitXY" src="http://bmob-cdn-21628.b0.upaiyun.com/2018/11/14/9de8d9d7406aaf6b8012eb7e2628fd13.jpeg"/>*/}
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
ui.emitter.on("create_options_menu", menu => {    
    menu.add("日志");
    menu.add("问题反馈");
    menu.add("关于");
});
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
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

ui.emitter.on("back_pressed", e => {
    if (!kg) {
        kg = true;
        toastLog("再按一次退出");
        setTimeout(() => {
            kg = false;
        }, 250);
        e.consumed = true;
    } else {
        e.consumed = false;
    };
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
    title: "二维码识别",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => Distinguish.activate()
},{
    title: "图片转链接",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 图片.activate()
},{
    title: "音乐下载",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => 音乐.activate()
},{
    title: "一键AES加/解密",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => AES.activate()
},{
    title: "脚本一键BASE64",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => BASE64.activate()
},{
    title: "进制计算器",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => Binary.activate()
},{
    title: "vip视频解析",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => vip.activate()
},{
    title: "短视频解析(web)",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => duan.activate()
},{
    title: "历史上的今天",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => history.activate()
},{
    title: "百度搜图",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => picss.activate()
},{
    title: "视频搜索",
    icon: "@drawable/ic_android_black_48dp",
    onclick: () => video.activate()
}]);
updata();

var video = {
    ui: ui.inflate(
        <vertical>
        <frame>
           <vertical bg={bgcolor}>
               <horizontal h="45">
                   <input id="search_input" layout_weight="1" hint="搜索视频" textSize="16sp" marginLeft="16" />
                      <button id="search_button" text="搜索" textSize="20sp" w="100" h="50" margin="-5 0 0 -80" style="Widget.AppCompat.Button.Borderless.Colored" />
               </horizontal>
                   <frame>
                       <list id="list">
                           <horizontal>
                               <linear bg="?selectableItemBackground" w="1000">
                                   <img src="{{icon}}" h="50" w="50" tint="#000000" />
                                   <text text="{{name}}" textSize="15sp" h="40" w="*" textColor="#000000" margin="10 10" />
                               </linear>
                           </horizontal>
                       </list>
                   </frame>
           </vertical>
       </frame>
   </vertical>
),
initList: function() {
    ui.list.on("item_click", function(athis) {
        if (athis.url == null && athis.name == "返回") {
            ui.list.setDataSource(search_list);
            return;
        }
        if (athis.url.indexOf("http://www.okzy.me/") == -1) {
            app.openUrl(athis.url);
            return;
        }
        let video_list = [{
            icon: "@drawable/ic_keyboard_backspace_black_48dp",
            name: "返回",
            url: null
        }];
        threads.start(function() {
            let temp_arr = videoDetails(athis.url);
            for (i in temp_arr) {
                video_list.push({
                    icon: "@drawable/ic_send_black_48dp",
                    name: temp_arr[i].name,
                    url: temp_arr[i].url
                });
            }
        }).join();
        ui.list.setDataSource(video_list);
    });
    
    ui.search_button.on("click", function() {
        search(ui.search_input.text());
    })
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
var picss = {
    ui: ui.inflate(
        <frame>
        <vertical>
            <horizontal  h="45">
                <input id="input" hint="搜索图片" layout_weight="1" textSize="16sp" marginLeft="16" singleLine="true"/>
                <button id="search" text="搜索" w="70" h="48" margin="0 0 10 5" />
            </horizontal>
            <list id="list" layout_weight="1" background="#ff555555">
                <img id="image" src="{{this}}" w="*" h="*" margin="5 5 5 5" tint="#00ffffff" />
            </list>
            <horizontal  h="40" gravity="center" bg="#ffffff">
                <button id="last" text="上一页" textSize="18sp" layout_weight="1"  style="Widget.AppCompat.Button.Borderless.Colored" />
                <button id="rand" text="随机" layout_weight="1" textSize="18sp"  style="Widget.AppCompat.Button.Borderless.Colored" />
                <button id="next" text="下一页" layout_weight="1" textSize="18sp"  style="Widget.AppCompat.Button.Borderless.Colored" />
            </horizontal>
        </vertical>
    </frame>
),
initList: function() {
    loadimg(word, top++);
    ui.next.click(() => {
        loadimg(word, top++);
    });
    
    ui.rand.on("click", function() {
        top = random(0, parseInt(listNum / 30));
        loadimg(word, top++);
    });
    ui.last.click(() => {
        if (top < 2) {
            return;
        }
        top--;
        loadimg(word, top - 1);
    });
    ui.search.on("click", function() {
        var text = ui.input.text();
        if (text.length == 0) {
            return;
        }
        word = text;
        top = 0;
        loadimg(word, top++);
    });
    
    ui.list.on("item_click", function(img3) {
        menu(img3);
    });
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }

var 反馈 = {
    ui: ui.inflate(
        <vertical padding="16" bg="#aa280800">
        <input id="te" textSize="18sp" h="200" bg="#FFD2D9FF" hint="{{pop}}"/>
        <horizontal gravity="center">
         <button id="next" w="*" text="发送"/>
        </horizontal>
        <text textSize="16sp" textStyle="bold">设备信息:</text>
         <text id="tt" textSize="13sp" h="*" bg="#FFD2D9FF"/>
    </vertical>
),
initList: function() {
    ui.run(() => {
    var sf=Problem_feedback();
    ui.tt.setText(sf);
});
ui.next.on("click", () => {
    threads.start(function(){
        let name=ui.te.text();
        if (name){
            if(iii){iii=0;
        let tt=Problem_feedback();
        let ne = (new Date).getTime();
    http.post("http://ce.ys168.com/f_ht/ajcx/lyd.aspx?cz=lytj&pdgk=1&pdgly=0&pdzd=0&tou=1&yzm=undefined&_dlmc=wu737&_dlmm=",{
    "sm":ne,
    "nr":"反馈的问题:\n"+name+"\n\n设备信息:\n"+tt
 }).body.string();ui.run(function(){ui.te.setText("");})
 toast("感谢您的反馈❤️❤️❤️❤️❤️");}}
    });    
});
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
 var Binary = {
    ui: ui.inflate(
     <frame>
        <vertical h="auto" align="center" margin="50 50 50 10">
            <linear>
                <text textSize="16sp">二 进 制</text>
                <input id="in_bin" w="150" h="40" singleLine="true"  digit="01"/>
                <button id="bin" layout_wweight="1" h="40" text="复制" size="10" style="Widget.AppCompat.Button.Colored"/>
            </linear>
            <linear>
                <text textSize="16sp">八 进 制</text>
                <input id="in_ba" w="150" h="40" singleLine="true" digit="01234567"/>
                <button id="ba" layout_wweight="1" h="40" text="复制" size="10" style="Widget.AppCompat.Button.Colored"/>
            </linear>
            <linear>
                <text textSize="16sp">十 进 制</text>
                <input id="in_ten" w="150" h="40" singleLine="true" digit="0123456789"/>
                <button id="ten" layout_wweight="1" h="40" text="复制" size="10" style="Widget.AppCompat.Button.Colored"/>
            </linear>
            <linear>
                <text textSize="14sp">十六进制</text>
                <input id="in_hex" w="150" h="40" singleLine="true" digit="0123456789ABCDEFabcdef"/>
                <button id="hex" layout_wweight="1" h="40" text="复制" size="10" style="Widget.AppCompat.Button.Colored"/>
            </linear>
            <linear gravity="center">
                <horizontal>
                    <button id="clos" w="250" h="*" text="清空" size="16" style="Widget.AppCompat.Button.Colored"/>
                </horizontal>
            </linear>
        </vertical>
    </frame>
),
initList: function() {
    ui.in_bin.addTextChangedListener(new android.text.TextWatcher({
    afterTextChanged: function(text) {
        if (ui.in_bin.focused) {
            text = String(parseInt(text, 2));
            ui.run(() => {
                ui.in_ba.setText(conversion(text, 8));
                ui.in_ten.setText(conversion(text, 10));
                ui.in_hex.setText(conversion(text, 16));
            });
        };
    }
}));

ui.in_ba.addTextChangedListener(new android.text.TextWatcher({
    afterTextChanged: function(text) {
        if (ui.in_ba.focused) {
            text = String(parseInt(text, 8));
            ui.run(() => {
                ui.in_bin.setText(conversion(text, 2));
                ui.in_ten.setText(conversion(text, 10));
                ui.in_hex.setText(conversion(text, 16));
            });
        };
    }
}));

ui.in_ten.addTextChangedListener(new android.text.TextWatcher({
    afterTextChanged: function(text) {
        if (ui.in_ten.focused) {
            text = String(parseInt(text, 10));
            ui.run(() => {
                ui.in_bin.setText(conversion(text, 2));
                ui.in_ba.setText(conversion(text, 8));
                ui.in_hex.setText(conversion(text, 16));
            });
        };
    }
}));

ui.in_hex.addTextChangedListener(new android.text.TextWatcher({
    afterTextChanged: function(text) {
        if (ui.in_hex.focused) {
            text = String(parseInt(text, 16));
            ui.run(() => {
                ui.in_bin.setText(conversion(text, 2));
                ui.in_ba.setText(conversion(text, 8));
                ui.in_ten.setText(conversion(text, 10));
            });
        };
    }
}));

ui.clos.click(function() {
    ui.run(() => {
        ui.in_bin.setText("");
        ui.in_ba.setText("");
        ui.in_ten.setText("");
        ui.in_hex.setText("");
    });
});
ui.bin.click(function() {
    let binz = ui.in_bin.text();
    if (binz) {
        setClip(binz);
        toast("复制成功");
    }
});

ui.ba.click(function() {
    let baz = ui.in_ba.text();
    if (baz) {
        setClip(baz);
        toast("复制成功");
    }
});

ui.ten.click(function() {
    let tenz = ui.in_ten.text();
    if (tenz) {
        setClip(tenz);
        toast("复制成功");
    }
});

ui.hex.click(function() {
    let hexz = ui.in_hex.text();
    if (hexz) {
        setClip(hexz);
        toast("复制成功");
    }
});
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
 var duan = {
    ui: ui.inflate(
        <ScrollView>
        <vertical>
        <button id="open" text="到浏览器打开"/>
            <webview id="web" margin="10 10 10 10"/>
        </vertical>
    </ScrollView>
),
initList: function() {
    var url = "http://kuaishou.iiilab.com/";
ui.web.loadUrl(url);
ui.open.click(() => {
    threads.start(function() {
        app.openUrl(url);
    });
});
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
 var history = {
    ui: ui.inflate(
    <frame>
        <list id="List" orientation="vertical"  bg="#eeeeee" padding="5">
            <linear orientation="horizontal"  gravity="left" margin="10 5 10 5" padding="5">
                <text text="{{this.title}}" />
            </linear>
        </list>
    </frame>
),
initList: function() {
    lishi();
ui.run(function() {
    ui.List.setDataSource(txt);
});
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
var vip = {
    ui: ui.inflate(
    <frame background="#ff555555">
        <ScrollView>
            <vertical align="top" margin="1">
                <webview w="359" h="260" size="6" id="webview" margin="0 0 1 0"/>
                <input id="text" w="359" h="0" size="10" bg="#ffffff" margin="0 1 1 0" hint="网页代码区"/>
                <linear>
                    <input id="awz" w="242" h="55" size='8' hint="vip视频网址。" bg="#ffcccccc"/>
                    <button h="55" w="60" id="azt" text="粘贴" />
                    <button h="55" w="60" id="aok" text="解析" />
                </linear>
                <linear>
                    <button h="55" w="140" id="adk" text="浏览器打开" />
                    <button h="55" w="120" id="afz" text="复制网址" />
                </linear>
                <text text="一个接口不行,就试试其他的接口"/>
                <grid id="xz" spanCount="4" h="*">
                    <text text="{{name}}" bg="#ffcccccc" margin="1 1"/>
                </grid>
                <text id="url" />
                <text text="由于解析的网站有广告，会严重影响观看体验，所以建议用via，米虾等带有视频嗅探的浏览器，这样还可以用下载工具把视频下载下来。" textSize="17sp" margin="10 1 1 10"/>
                <text text="本脚本由  。0  提供" margin="10 0 0 10"/>
            </vertical>
        </ScrollView>
    </frame>
),
initList: function() {
    ui.awz.text("http://m.iqiyi.com/v_19rr8u75c0.html");

ui.aok.click(() => {
    threads.start(function() {
        let str = ui.awz.text();
        if (str){
        ui.run(function() {
            ui.webview.loadUrl(jx + ui.awz.text());
        });
        str = http.get(jx + ui.awz.text()).body.string();
        ui.run(function() {
            ui.text.text(str);
        });
    }});
});

ui.afz.click(() => {
    threads.start(function() {
        setClip(jx + ui.awz.text());
    });
});

ui.azt.click(() => {
    ui.awz.text(getClip());
});
ui.adk.click(() => {
    threads.start(function() {
        app.openUrl(jx + ui.awz.text());
    });
});

ui.xz.on("item_click", function(j, item, itemView, listView) {
    for (i = 0; i < apis.length; i++) {
        if (i == item) {
            apis2[i].name = "●" + apis[i].name;
        } else {
            apis2[i].name = "○" + apis[i].name;
        }
    }
    ui.xz.setDataSource(apis2);

    jx = j.url;
    ui.url.text(jx);
});

for (i = 0; i < apis.length; i++) {
    apis2[i] = {
        name: apis[i].name,
        url: apis[i].url
    };
    apis2[i].name = "○" + apis[i].name;
}
ui.xz.setDataSource(apis2);
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
var ResultIntent = {
    intentCallback: {},
    init: function() {
        activity.getEventEmitter().on("activity_result", (requestCode, resultCode, data) => {
            this.onActivityResult(requestCode, resultCode, data);
        });
    },
    startActivityForResult: function(intent, callback) {
        var i;
        for (i = 0; i < 65536; i++) {
            if (!(i in this.intentCallback)) break;
        }
        if (i >= 65536) {
            toast("启动Intent失败：同时请求的Intent过多");
            return;
        }
        this.intentCallback[i] = callback;
        activity.startActivityForResult(intent, i);
    },
    onActivityResult: function(requestCode, resultCode, data) {
        var cb = this.intentCallback[requestCode];
        if (!cb) return;
        delete this.intentCallback[requestCode];
        cb(resultCode, data);
    }
};
ResultIntent.init();

function URIUtils_uriToFile(uri) { //Source : https://www.cnblogs.com/panhouye/archive/2017/04/23/6751710.html
    var r = null,
        cursor, column_index, selection = null,
        selectionArgs = null,
        isKitKat = android.os.Build.VERSION.SDK_INT >= 19,
        docs;
    if (uri.getScheme().equalsIgnoreCase("content")) {
        if (isKitKat && android.provider.DocumentsContract.isDocumentUri(activity, uri)) {
            if (String(uri.getAuthority()) == "com.android.externalstorage.documents") {
                docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
                if (docs[0] == "primary") {
                    return android.os.Environment.getExternalStorageDirectory() + "/" + docs[1];
                }
            } else if (String(uri.getAuthority()) == "com.android.providers.downloads.documents") {
                uri = android.content.ContentUris.withAppendedId(
                    android.net.Uri.parse("content://downloads/public_downloads"),
                    parseInt(android.provider.DocumentsContract.getDocumentId(uri))
                );
            } else if (String(uri.getAuthority()) == "com.android.providers.media.documents") {
                docs = String(android.provider.DocumentsContract.getDocumentId(uri)).split(":");
                if (docs[0] == "image") {
                    uri = android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI;
                } else if (docs[0] == "video") {
                    uri = android.provider.MediaStore.Video.Media.EXTERNAL_CONTENT_URI;
                } else if (docs[0] == "audio") {
                    uri = android.provider.MediaStore.Audio.Media.EXTERNAL_CONTENT_URI;
                }
                selection = "_id=?";
                selectionArgs = [docs[1]];
            }
        }
        try {
            cursor = activity.getContentResolver().query(uri, ["_data"], selection, selectionArgs, null);
            if (cursor && cursor.moveToFirst()) {
                r = String(cursor.getString(cursor.getColumnIndexOrThrow("_data")));
            }
        } catch (e) {
            log(e)
        }
        if (cursor) cursor.close();
        return r;
    } else if (uri.getScheme().equalsIgnoreCase("file")) {
        return String(uri.getPath());
    }
    return null;
}
var slowAES = {
        aes: {
            keySize: {
                SIZE_128: 16,
                SIZE_192: 24,
                SIZE_256: 32
            },
            sbox: [
                0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
                0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
                0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
                0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
                0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
                0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
                0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
                0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
                0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
                0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
                0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
                0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
                0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
                0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
                0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
                0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16
            ],
            rsbox: [0x52, 0x09, 0x6a, 0xd5, 0x30, 0x36, 0xa5, 0x38, 0xbf, 0x40, 0xa3, 0x9e, 0x81, 0xf3, 0xd7, 0xfb, 0x7c, 0xe3, 0x39, 0x82, 0x9b, 0x2f, 0xff, 0x87, 0x34, 0x8e, 0x43, 0x44, 0xc4, 0xde, 0xe9, 0xcb, 0x54, 0x7b, 0x94, 0x32, 0xa6, 0xc2, 0x23, 0x3d, 0xee, 0x4c, 0x95, 0x0b, 0x42, 0xfa, 0xc3, 0x4e, 0x08, 0x2e, 0xa1, 0x66, 0x28, 0xd9, 0x24, 0xb2, 0x76, 0x5b, 0xa2, 0x49, 0x6d, 0x8b, 0xd1, 0x25, 0x72, 0xf8, 0xf6, 0x64, 0x86, 0x68, 0x98, 0x16, 0xd4, 0xa4, 0x5c, 0xcc, 0x5d, 0x65, 0xb6, 0x92, 0x6c, 0x70, 0x48, 0x50, 0xfd, 0xed, 0xb9, 0xda, 0x5e, 0x15, 0x46, 0x57, 0xa7, 0x8d, 0x9d, 0x84, 0x90, 0xd8, 0xab, 0x00, 0x8c, 0xbc, 0xd3, 0x0a, 0xf7, 0xe4, 0x58, 0x05, 0xb8, 0xb3, 0x45, 0x06, 0xd0, 0x2c, 0x1e, 0x8f, 0xca, 0x3f, 0x0f, 0x02, 0xc1, 0xaf, 0xbd, 0x03, 0x01, 0x13, 0x8a, 0x6b, 0x3a, 0x91, 0x11, 0x41, 0x4f, 0x67, 0xdc, 0xea, 0x97, 0xf2, 0xcf, 0xce, 0xf0, 0xb4, 0xe6, 0x73, 0x96, 0xac, 0x74, 0x22, 0xe7, 0xad, 0x35, 0x85, 0xe2, 0xf9, 0x37, 0xe8, 0x1c, 0x75, 0xdf, 0x6e, 0x47, 0xf1, 0x1a, 0x71, 0x1d, 0x29, 0xc5, 0x89, 0x6f, 0xb7, 0x62, 0x0e, 0xaa, 0x18, 0xbe, 0x1b, 0xfc, 0x56, 0x3e, 0x4b, 0xc6, 0xd2, 0x79, 0x20, 0x9a, 0xdb, 0xc0, 0xfe, 0x78, 0xcd, 0x5a, 0xf4, 0x1f, 0xdd, 0xa8, 0x33, 0x88, 0x07, 0xc7, 0x31, 0xb1, 0x12, 0x10, 0x59, 0x27, 0x80, 0xec, 0x5f, 0x60, 0x51, 0x7f, 0xa9, 0x19, 0xb5, 0x4a, 0x0d, 0x2d, 0xe5, 0x7a, 0x9f, 0x93, 0xc9, 0x9c, 0xef, 0xa0, 0xe0, 0x3b, 0x4d, 0xae, 0x2a, 0xf5, 0xb0, 0xc8, 0xeb, 0xbb, 0x3c, 0x83, 0x53, 0x99, 0x61, 0x17, 0x2b, 0x04, 0x7e, 0xba, 0x77, 0xd6, 0x26, 0xe1, 0x69, 0x14, 0x63, 0x55, 0x21, 0x0c, 0x7d],
            rotate: function(word) {
                var c = word[0];
                for (var i = 0; i < 3; i++)
                    word[i] = word[i + 1];
                word[3] = c;

                return word;
            },

            Rcon: [
                0x8d, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8,
                0xab, 0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3,
                0x7d, 0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f,
                0x25, 0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d,
                0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab,
                0x4d, 0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d,
                0xfa, 0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25,
                0x4a, 0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01,
                0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d,
                0x9a, 0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa,
                0xef, 0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a,
                0x94, 0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02,
                0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a,
                0x2f, 0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef,
                0xc5, 0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94,
                0x33, 0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb, 0x8d, 0x01, 0x02, 0x04,
                0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36, 0x6c, 0xd8, 0xab, 0x4d, 0x9a, 0x2f,
                0x5e, 0xbc, 0x63, 0xc6, 0x97, 0x35, 0x6a, 0xd4, 0xb3, 0x7d, 0xfa, 0xef, 0xc5,
                0x91, 0x39, 0x72, 0xe4, 0xd3, 0xbd, 0x61, 0xc2, 0x9f, 0x25, 0x4a, 0x94, 0x33,
                0x66, 0xcc, 0x83, 0x1d, 0x3a, 0x74, 0xe8, 0xcb
            ],

            G2X: [
                0x00, 0x02, 0x04, 0x06, 0x08, 0x0a, 0x0c, 0x0e, 0x10, 0x12, 0x14, 0x16,
                0x18, 0x1a, 0x1c, 0x1e, 0x20, 0x22, 0x24, 0x26, 0x28, 0x2a, 0x2c, 0x2e,
                0x30, 0x32, 0x34, 0x36, 0x38, 0x3a, 0x3c, 0x3e, 0x40, 0x42, 0x44, 0x46,
                0x48, 0x4a, 0x4c, 0x4e, 0x50, 0x52, 0x54, 0x56, 0x58, 0x5a, 0x5c, 0x5e,
                0x60, 0x62, 0x64, 0x66, 0x68, 0x6a, 0x6c, 0x6e, 0x70, 0x72, 0x74, 0x76,
                0x78, 0x7a, 0x7c, 0x7e, 0x80, 0x82, 0x84, 0x86, 0x88, 0x8a, 0x8c, 0x8e,
                0x90, 0x92, 0x94, 0x96, 0x98, 0x9a, 0x9c, 0x9e, 0xa0, 0xa2, 0xa4, 0xa6,
                0xa8, 0xaa, 0xac, 0xae, 0xb0, 0xb2, 0xb4, 0xb6, 0xb8, 0xba, 0xbc, 0xbe,
                0xc0, 0xc2, 0xc4, 0xc6, 0xc8, 0xca, 0xcc, 0xce, 0xd0, 0xd2, 0xd4, 0xd6,
                0xd8, 0xda, 0xdc, 0xde, 0xe0, 0xe2, 0xe4, 0xe6, 0xe8, 0xea, 0xec, 0xee,
                0xf0, 0xf2, 0xf4, 0xf6, 0xf8, 0xfa, 0xfc, 0xfe, 0x1b, 0x19, 0x1f, 0x1d,
                0x13, 0x11, 0x17, 0x15, 0x0b, 0x09, 0x0f, 0x0d, 0x03, 0x01, 0x07, 0x05,
                0x3b, 0x39, 0x3f, 0x3d, 0x33, 0x31, 0x37, 0x35, 0x2b, 0x29, 0x2f, 0x2d,
                0x23, 0x21, 0x27, 0x25, 0x5b, 0x59, 0x5f, 0x5d, 0x53, 0x51, 0x57, 0x55,
                0x4b, 0x49, 0x4f, 0x4d, 0x43, 0x41, 0x47, 0x45, 0x7b, 0x79, 0x7f, 0x7d,
                0x73, 0x71, 0x77, 0x75, 0x6b, 0x69, 0x6f, 0x6d, 0x63, 0x61, 0x67, 0x65,
                0x9b, 0x99, 0x9f, 0x9d, 0x93, 0x91, 0x97, 0x95, 0x8b, 0x89, 0x8f, 0x8d,
                0x83, 0x81, 0x87, 0x85, 0xbb, 0xb9, 0xbf, 0xbd, 0xb3, 0xb1, 0xb7, 0xb5,
                0xab, 0xa9, 0xaf, 0xad, 0xa3, 0xa1, 0xa7, 0xa5, 0xdb, 0xd9, 0xdf, 0xdd,
                0xd3, 0xd1, 0xd7, 0xd5, 0xcb, 0xc9, 0xcf, 0xcd, 0xc3, 0xc1, 0xc7, 0xc5,
                0xfb, 0xf9, 0xff, 0xfd, 0xf3, 0xf1, 0xf7, 0xf5, 0xeb, 0xe9, 0xef, 0xed,
                0xe3, 0xe1, 0xe7, 0xe5
            ],

            G3X: [
                0x00, 0x03, 0x06, 0x05, 0x0c, 0x0f, 0x0a, 0x09, 0x18, 0x1b, 0x1e, 0x1d,
                0x14, 0x17, 0x12, 0x11, 0x30, 0x33, 0x36, 0x35, 0x3c, 0x3f, 0x3a, 0x39,
                0x28, 0x2b, 0x2e, 0x2d, 0x24, 0x27, 0x22, 0x21, 0x60, 0x63, 0x66, 0x65,
                0x6c, 0x6f, 0x6a, 0x69, 0x78, 0x7b, 0x7e, 0x7d, 0x74, 0x77, 0x72, 0x71,
                0x50, 0x53, 0x56, 0x55, 0x5c, 0x5f, 0x5a, 0x59, 0x48, 0x4b, 0x4e, 0x4d,
                0x44, 0x47, 0x42, 0x41, 0xc0, 0xc3, 0xc6, 0xc5, 0xcc, 0xcf, 0xca, 0xc9,
                0xd8, 0xdb, 0xde, 0xdd, 0xd4, 0xd7, 0xd2, 0xd1, 0xf0, 0xf3, 0xf6, 0xf5,
                0xfc, 0xff, 0xfa, 0xf9, 0xe8, 0xeb, 0xee, 0xed, 0xe4, 0xe7, 0xe2, 0xe1,
                0xa0, 0xa3, 0xa6, 0xa5, 0xac, 0xaf, 0xaa, 0xa9, 0xb8, 0xbb, 0xbe, 0xbd,
                0xb4, 0xb7, 0xb2, 0xb1, 0x90, 0x93, 0x96, 0x95, 0x9c, 0x9f, 0x9a, 0x99,
                0x88, 0x8b, 0x8e, 0x8d, 0x84, 0x87, 0x82, 0x81, 0x9b, 0x98, 0x9d, 0x9e,
                0x97, 0x94, 0x91, 0x92, 0x83, 0x80, 0x85, 0x86, 0x8f, 0x8c, 0x89, 0x8a,
                0xab, 0xa8, 0xad, 0xae, 0xa7, 0xa4, 0xa1, 0xa2, 0xb3, 0xb0, 0xb5, 0xb6,
                0xbf, 0xbc, 0xb9, 0xba, 0xfb, 0xf8, 0xfd, 0xfe, 0xf7, 0xf4, 0xf1, 0xf2,
                0xe3, 0xe0, 0xe5, 0xe6, 0xef, 0xec, 0xe9, 0xea, 0xcb, 0xc8, 0xcd, 0xce,
                0xc7, 0xc4, 0xc1, 0xc2, 0xd3, 0xd0, 0xd5, 0xd6, 0xdf, 0xdc, 0xd9, 0xda,
                0x5b, 0x58, 0x5d, 0x5e, 0x57, 0x54, 0x51, 0x52, 0x43, 0x40, 0x45, 0x46,
                0x4f, 0x4c, 0x49, 0x4a, 0x6b, 0x68, 0x6d, 0x6e, 0x67, 0x64, 0x61, 0x62,
                0x73, 0x70, 0x75, 0x76, 0x7f, 0x7c, 0x79, 0x7a, 0x3b, 0x38, 0x3d, 0x3e,
                0x37, 0x34, 0x31, 0x32, 0x23, 0x20, 0x25, 0x26, 0x2f, 0x2c, 0x29, 0x2a,
                0x0b, 0x08, 0x0d, 0x0e, 0x07, 0x04, 0x01, 0x02, 0x13, 0x10, 0x15, 0x16,
                0x1f, 0x1c, 0x19, 0x1a
            ],

            G9X: [
                0x00, 0x09, 0x12, 0x1b, 0x24, 0x2d, 0x36, 0x3f, 0x48, 0x41, 0x5a, 0x53,
                0x6c, 0x65, 0x7e, 0x77, 0x90, 0x99, 0x82, 0x8b, 0xb4, 0xbd, 0xa6, 0xaf,
                0xd8, 0xd1, 0xca, 0xc3, 0xfc, 0xf5, 0xee, 0xe7, 0x3b, 0x32, 0x29, 0x20,
                0x1f, 0x16, 0x0d, 0x04, 0x73, 0x7a, 0x61, 0x68, 0x57, 0x5e, 0x45, 0x4c,
                0xab, 0xa2, 0xb9, 0xb0, 0x8f, 0x86, 0x9d, 0x94, 0xe3, 0xea, 0xf1, 0xf8,
                0xc7, 0xce, 0xd5, 0xdc, 0x76, 0x7f, 0x64, 0x6d, 0x52, 0x5b, 0x40, 0x49,
                0x3e, 0x37, 0x2c, 0x25, 0x1a, 0x13, 0x08, 0x01, 0xe6, 0xef, 0xf4, 0xfd,
                0xc2, 0xcb, 0xd0, 0xd9, 0xae, 0xa7, 0xbc, 0xb5, 0x8a, 0x83, 0x98, 0x91,
                0x4d, 0x44, 0x5f, 0x56, 0x69, 0x60, 0x7b, 0x72, 0x05, 0x0c, 0x17, 0x1e,
                0x21, 0x28, 0x33, 0x3a, 0xdd, 0xd4, 0xcf, 0xc6, 0xf9, 0xf0, 0xeb, 0xe2,
                0x95, 0x9c, 0x87, 0x8e, 0xb1, 0xb8, 0xa3, 0xaa, 0xec, 0xe5, 0xfe, 0xf7,
                0xc8, 0xc1, 0xda, 0xd3, 0xa4, 0xad, 0xb6, 0xbf, 0x80, 0x89, 0x92, 0x9b,
                0x7c, 0x75, 0x6e, 0x67, 0x58, 0x51, 0x4a, 0x43, 0x34, 0x3d, 0x26, 0x2f,
                0x10, 0x19, 0x02, 0x0b, 0xd7, 0xde, 0xc5, 0xcc, 0xf3, 0xfa, 0xe1, 0xe8,
                0x9f, 0x96, 0x8d, 0x84, 0xbb, 0xb2, 0xa9, 0xa0, 0x47, 0x4e, 0x55, 0x5c,
                0x63, 0x6a, 0x71, 0x78, 0x0f, 0x06, 0x1d, 0x14, 0x2b, 0x22, 0x39, 0x30,
                0x9a, 0x93, 0x88, 0x81, 0xbe, 0xb7, 0xac, 0xa5, 0xd2, 0xdb, 0xc0, 0xc9,
                0xf6, 0xff, 0xe4, 0xed, 0x0a, 0x03, 0x18, 0x11, 0x2e, 0x27, 0x3c, 0x35,
                0x42, 0x4b, 0x50, 0x59, 0x66, 0x6f, 0x74, 0x7d, 0xa1, 0xa8, 0xb3, 0xba,
                0x85, 0x8c, 0x97, 0x9e, 0xe9, 0xe0, 0xfb, 0xf2, 0xcd, 0xc4, 0xdf, 0xd6,
                0x31, 0x38, 0x23, 0x2a, 0x15, 0x1c, 0x07, 0x0e, 0x79, 0x70, 0x6b, 0x62,
                0x5d, 0x54, 0x4f, 0x46
            ],

            GBX: [
                0x00, 0x0b, 0x16, 0x1d, 0x2c, 0x27, 0x3a, 0x31, 0x58, 0x53, 0x4e, 0x45,
                0x74, 0x7f, 0x62, 0x69, 0xb0, 0xbb, 0xa6, 0xad, 0x9c, 0x97, 0x8a, 0x81,
                0xe8, 0xe3, 0xfe, 0xf5, 0xc4, 0xcf, 0xd2, 0xd9, 0x7b, 0x70, 0x6d, 0x66,
                0x57, 0x5c, 0x41, 0x4a, 0x23, 0x28, 0x35, 0x3e, 0x0f, 0x04, 0x19, 0x12,
                0xcb, 0xc0, 0xdd, 0xd6, 0xe7, 0xec, 0xf1, 0xfa, 0x93, 0x98, 0x85, 0x8e,
                0xbf, 0xb4, 0xa9, 0xa2, 0xf6, 0xfd, 0xe0, 0xeb, 0xda, 0xd1, 0xcc, 0xc7,
                0xae, 0xa5, 0xb8, 0xb3, 0x82, 0x89, 0x94, 0x9f, 0x46, 0x4d, 0x50, 0x5b,
                0x6a, 0x61, 0x7c, 0x77, 0x1e, 0x15, 0x08, 0x03, 0x32, 0x39, 0x24, 0x2f,
                0x8d, 0x86, 0x9b, 0x90, 0xa1, 0xaa, 0xb7, 0xbc, 0xd5, 0xde, 0xc3, 0xc8,
                0xf9, 0xf2, 0xef, 0xe4, 0x3d, 0x36, 0x2b, 0x20, 0x11, 0x1a, 0x07, 0x0c,
                0x65, 0x6e, 0x73, 0x78, 0x49, 0x42, 0x5f, 0x54, 0xf7, 0xfc, 0xe1, 0xea,
                0xdb, 0xd0, 0xcd, 0xc6, 0xaf, 0xa4, 0xb9, 0xb2, 0x83, 0x88, 0x95, 0x9e,
                0x47, 0x4c, 0x51, 0x5a, 0x6b, 0x60, 0x7d, 0x76, 0x1f, 0x14, 0x09, 0x02,
                0x33, 0x38, 0x25, 0x2e, 0x8c, 0x87, 0x9a, 0x91, 0xa0, 0xab, 0xb6, 0xbd,
                0xd4, 0xdf, 0xc2, 0xc9, 0xf8, 0xf3, 0xee, 0xe5, 0x3c, 0x37, 0x2a, 0x21,
                0x10, 0x1b, 0x06, 0x0d, 0x64, 0x6f, 0x72, 0x79, 0x48, 0x43, 0x5e, 0x55,
                0x01, 0x0a, 0x17, 0x1c, 0x2d, 0x26, 0x3b, 0x30, 0x59, 0x52, 0x4f, 0x44,
                0x75, 0x7e, 0x63, 0x68, 0xb1, 0xba, 0xa7, 0xac, 0x9d, 0x96, 0x8b, 0x80,
                0xe9, 0xe2, 0xff, 0xf4, 0xc5, 0xce, 0xd3, 0xd8, 0x7a, 0x71, 0x6c, 0x67,
                0x56, 0x5d, 0x40, 0x4b, 0x22, 0x29, 0x34, 0x3f, 0x0e, 0x05, 0x18, 0x13,
                0xca, 0xc1, 0xdc, 0xd7, 0xe6, 0xed, 0xf0, 0xfb, 0x92, 0x99, 0x84, 0x8f,
                0xbe, 0xb5, 0xa8, 0xa3
            ],

            GDX: [
                0x00, 0x0d, 0x1a, 0x17, 0x34, 0x39, 0x2e, 0x23, 0x68, 0x65, 0x72, 0x7f,
                0x5c, 0x51, 0x46, 0x4b, 0xd0, 0xdd, 0xca, 0xc7, 0xe4, 0xe9, 0xfe, 0xf3,
                0xb8, 0xb5, 0xa2, 0xaf, 0x8c, 0x81, 0x96, 0x9b, 0xbb, 0xb6, 0xa1, 0xac,
                0x8f, 0x82, 0x95, 0x98, 0xd3, 0xde, 0xc9, 0xc4, 0xe7, 0xea, 0xfd, 0xf0,
                0x6b, 0x66, 0x71, 0x7c, 0x5f, 0x52, 0x45, 0x48, 0x03, 0x0e, 0x19, 0x14,
                0x37, 0x3a, 0x2d, 0x20, 0x6d, 0x60, 0x77, 0x7a, 0x59, 0x54, 0x43, 0x4e,
                0x05, 0x08, 0x1f, 0x12, 0x31, 0x3c, 0x2b, 0x26, 0xbd, 0xb0, 0xa7, 0xaa,
                0x89, 0x84, 0x93, 0x9e, 0xd5, 0xd8, 0xcf, 0xc2, 0xe1, 0xec, 0xfb, 0xf6,
                0xd6, 0xdb, 0xcc, 0xc1, 0xe2, 0xef, 0xf8, 0xf5, 0xbe, 0xb3, 0xa4, 0xa9,
                0x8a, 0x87, 0x90, 0x9d, 0x06, 0x0b, 0x1c, 0x11, 0x32, 0x3f, 0x28, 0x25,
                0x6e, 0x63, 0x74, 0x79, 0x5a, 0x57, 0x40, 0x4d, 0xda, 0xd7, 0xc0, 0xcd,
                0xee, 0xe3, 0xf4, 0xf9, 0xb2, 0xbf, 0xa8, 0xa5, 0x86, 0x8b, 0x9c, 0x91,
                0x0a, 0x07, 0x10, 0x1d, 0x3e, 0x33, 0x24, 0x29, 0x62, 0x6f, 0x78, 0x75,
                0x56, 0x5b, 0x4c, 0x41, 0x61, 0x6c, 0x7b, 0x76, 0x55, 0x58, 0x4f, 0x42,
                0x09, 0x04, 0x13, 0x1e, 0x3d, 0x30, 0x27, 0x2a, 0xb1, 0xbc, 0xab, 0xa6,
                0x85, 0x88, 0x9f, 0x92, 0xd9, 0xd4, 0xc3, 0xce, 0xed, 0xe0, 0xf7, 0xfa,
                0xb7, 0xba, 0xad, 0xa0, 0x83, 0x8e, 0x99, 0x94, 0xdf, 0xd2, 0xc5, 0xc8,
                0xeb, 0xe6, 0xf1, 0xfc, 0x67, 0x6a, 0x7d, 0x70, 0x53, 0x5e, 0x49, 0x44,
                0x0f, 0x02, 0x15, 0x18, 0x3b, 0x36, 0x21, 0x2c, 0x0c, 0x01, 0x16, 0x1b,
                0x38, 0x35, 0x22, 0x2f, 0x64, 0x69, 0x7e, 0x73, 0x50, 0x5d, 0x4a, 0x47,
                0xdc, 0xd1, 0xc6, 0xcb, 0xe8, 0xe5, 0xf2, 0xff, 0xb4, 0xb9, 0xae, 0xa3,
                0x80, 0x8d, 0x9a, 0x97
            ],

            GEX: [
                0x00, 0x0e, 0x1c, 0x12, 0x38, 0x36, 0x24, 0x2a, 0x70, 0x7e, 0x6c, 0x62,
                0x48, 0x46, 0x54, 0x5a, 0xe0, 0xee, 0xfc, 0xf2, 0xd8, 0xd6, 0xc4, 0xca,
                0x90, 0x9e, 0x8c, 0x82, 0xa8, 0xa6, 0xb4, 0xba, 0xdb, 0xd5, 0xc7, 0xc9,
                0xe3, 0xed, 0xff, 0xf1, 0xab, 0xa5, 0xb7, 0xb9, 0x93, 0x9d, 0x8f, 0x81,
                0x3b, 0x35, 0x27, 0x29, 0x03, 0x0d, 0x1f, 0x11, 0x4b, 0x45, 0x57, 0x59,
                0x73, 0x7d, 0x6f, 0x61, 0xad, 0xa3, 0xb1, 0xbf, 0x95, 0x9b, 0x89, 0x87,
                0xdd, 0xd3, 0xc1, 0xcf, 0xe5, 0xeb, 0xf9, 0xf7, 0x4d, 0x43, 0x51, 0x5f,
                0x75, 0x7b, 0x69, 0x67, 0x3d, 0x33, 0x21, 0x2f, 0x05, 0x0b, 0x19, 0x17,
                0x76, 0x78, 0x6a, 0x64, 0x4e, 0x40, 0x52, 0x5c, 0x06, 0x08, 0x1a, 0x14,
                0x3e, 0x30, 0x22, 0x2c, 0x96, 0x98, 0x8a, 0x84, 0xae, 0xa0, 0xb2, 0xbc,
                0xe6, 0xe8, 0xfa, 0xf4, 0xde, 0xd0, 0xc2, 0xcc, 0x41, 0x4f, 0x5d, 0x53,
                0x79, 0x77, 0x65, 0x6b, 0x31, 0x3f, 0x2d, 0x23, 0x09, 0x07, 0x15, 0x1b,
                0xa1, 0xaf, 0xbd, 0xb3, 0x99, 0x97, 0x85, 0x8b, 0xd1, 0xdf, 0xcd, 0xc3,
                0xe9, 0xe7, 0xf5, 0xfb, 0x9a, 0x94, 0x86, 0x88, 0xa2, 0xac, 0xbe, 0xb0,
                0xea, 0xe4, 0xf6, 0xf8, 0xd2, 0xdc, 0xce, 0xc0, 0x7a, 0x74, 0x66, 0x68,
                0x42, 0x4c, 0x5e, 0x50, 0x0a, 0x04, 0x16, 0x18, 0x32, 0x3c, 0x2e, 0x20,
                0xec, 0xe2, 0xf0, 0xfe, 0xd4, 0xda, 0xc8, 0xc6, 0x9c, 0x92, 0x80, 0x8e,
                0xa4, 0xaa, 0xb8, 0xb6, 0x0c, 0x02, 0x10, 0x1e, 0x34, 0x3a, 0x28, 0x26,
                0x7c, 0x72, 0x60, 0x6e, 0x44, 0x4a, 0x58, 0x56, 0x37, 0x39, 0x2b, 0x25,
                0x0f, 0x01, 0x13, 0x1d, 0x47, 0x49, 0x5b, 0x55, 0x7f, 0x71, 0x63, 0x6d,
                0xd7, 0xd9, 0xcb, 0xc5, 0xef, 0xe1, 0xf3, 0xfd, 0xa7, 0xa9, 0xbb, 0xb5,
                0x9f, 0x91, 0x83, 0x8d
            ],

            core: function(word, iteration) {
                word = this.rotate(word);
                for (var i = 0; i < 4; ++i)
                    word[i] = this.sbox[word[i]];
                word[0] = word[0] ^ this.Rcon[iteration];
                return word;
            },
            expandKey: function(key, size) {
                var expandedKeySize = (16 * (this.numberOfRounds(size) + 1));
                var currentSize = 0;
                var rconIteration = 1;
                var t = []
                var expandedKey = [];
                for (var i = 0; i < expandedKeySize; i++)
                    expandedKey[i] = 0;
                for (var j = 0; j < size; j++)
                    expandedKey[j] = key[j];
                currentSize += size;

                while (currentSize < expandedKeySize) {
                    for (var k = 0; k < 4; k++)
                        t[k] = expandedKey[(currentSize - 4) + k];

                    if (currentSize % size == 0)
                        t = this.core(t, rconIteration++);

                    if (size == this.keySize.SIZE_256 && ((currentSize % size) == 16))
                        for (var l = 0; l < 4; l++)
                            t[l] = this.sbox[t[l]];
                    for (var m = 0; m < 4; m++) {
                        expandedKey[currentSize] = expandedKey[currentSize - size] ^ t[m];
                        currentSize++;
                    }
                }
                return expandedKey;
            },

            addRoundKey: function(state, roundKey) {
                for (var i = 0; i < 16; i++)
                    state[i] ^= roundKey[i];
                return state;
            },
            createRoundKey: function(expandedKey, roundKeyPointer) {
                var roundKey = [];
                for (var i = 0; i < 4; i++)
                    for (var j = 0; j < 4; j++)
                        roundKey[j * 4 + i] = expandedKey[roundKeyPointer + i * 4 + j];
                return roundKey;
            },

            subBytes: function(state, isInv) {
                for (var i = 0; i < 16; i++)
                    state[i] = isInv ? this.rsbox[state[i]] : this.sbox[state[i]];
                return state;
            },

            shiftRows: function(state, isInv) {
                for (var i = 0; i < 4; i++)
                    state = this.shiftRow(state, i * 4, i, isInv);
                return state;
            },
            shiftRow: function(state, statePointer, nbr, isInv) {
                for (var i = 0; i < nbr; i++) {
                    if (isInv) {
                        var tmp = state[statePointer + 3];
                        for (var j = 3; j > 0; j--)
                            state[statePointer + j] = state[statePointer + j - 1];
                        state[statePointer] = tmp;
                    } else {
                        var tmp = state[statePointer];
                        for (var j = 0; j < 3; j++)
                            state[statePointer + j] = state[statePointer + j + 1];
                        state[statePointer + 3] = tmp;
                    }
                }
                return state;
            },
            galois_multiplication: function(a, b) {
                var p = 0;
                for (var counter = 0; counter < 8; counter++) {
                    if ((b & 1) == 1)
                        p ^= a;
                    if (p > 0x100) p ^= 0x100;
                    var hi_bit_set = (a & 0x80);
                    a <<= 1;
                    if (a > 0x100) a ^= 0x100;
                    if (hi_bit_set == 0x80)
                        a ^= 0x1b;
                    if (a > 0x100) a ^= 0x100;
                    b >>= 1;
                    if (b > 0x100) b ^= 0x100;
                }
                return p;
            },

            mixColumns: function(state, isInv) {
                var column = [];
                for (var i = 0; i < 4; i++) {
                    for (var j = 0; j < 4; j++)
                        column[j] = state[(j * 4) + i];
                    column = this.mixColumn(column, isInv);
                    for (var k = 0; k < 4; k++)
                        state[(k * 4) + i] = column[k];
                }
                return state;
            },
            mixColumn: function(column, isInv) {
                var mult = [];
                if (isInv)
                    mult = [14, 9, 13, 11];
                else
                    mult = [2, 1, 1, 3];
                var cpy = [];
                for (var i = 0; i < 4; i++)
                    cpy[i] = column[i];

                column[0] = this.galois_multiplication(cpy[0], mult[0]) ^
                    this.galois_multiplication(cpy[3], mult[1]) ^
                    this.galois_multiplication(cpy[2], mult[2]) ^
                    this.galois_multiplication(cpy[1], mult[3]);
                column[1] = this.galois_multiplication(cpy[1], mult[0]) ^
                    this.galois_multiplication(cpy[0], mult[1]) ^
                    this.galois_multiplication(cpy[3], mult[2]) ^
                    this.galois_multiplication(cpy[2], mult[3]);
                column[2] = this.galois_multiplication(cpy[2], mult[0]) ^
                    this.galois_multiplication(cpy[1], mult[1]) ^
                    this.galois_multiplication(cpy[0], mult[2]) ^
                    this.galois_multiplication(cpy[3], mult[3]);
                column[3] = this.galois_multiplication(cpy[3], mult[0]) ^
                    this.galois_multiplication(cpy[2], mult[1]) ^
                    this.galois_multiplication(cpy[1], mult[2]) ^
                    this.galois_multiplication(cpy[0], mult[3]);
                return column;
            },
            round: function(state, roundKey) {
                state = this.subBytes(state, false);
                state = this.shiftRows(state, false);
                state = this.mixColumns(state, false);
                state = this.addRoundKey(state, roundKey);
                return state;
            },
            invRound: function(state, roundKey) {
                state = this.shiftRows(state, true);
                state = this.subBytes(state, true);
                state = this.addRoundKey(state, roundKey);
                state = this.mixColumns(state, true);
                return state;
            },
            main: function(state, expandedKey, nbrRounds) {
                state = this.addRoundKey(state, this.createRoundKey(expandedKey, 0));
                for (var i = 1; i < nbrRounds; i++)
                    state = this.round(state, this.createRoundKey(expandedKey, 16 * i));
                state = this.subBytes(state, false);
                state = this.shiftRows(state, false);
                state = this.addRoundKey(state, this.createRoundKey(expandedKey, 16 * nbrRounds));
                return state;
            },
            invMain: function(state, expandedKey, nbrRounds) {
                state = this.addRoundKey(state, this.createRoundKey(expandedKey, 16 * nbrRounds));
                for (var i = nbrRounds - 1; i > 0; i--)
                    state = this.invRound(state, this.createRoundKey(expandedKey, 16 * i));
                state = this.shiftRows(state, true);
                state = this.subBytes(state, true);
                state = this.addRoundKey(state, this.createRoundKey(expandedKey, 0));
                return state;
            },

            numberOfRounds: function(size) {
                var nbrRounds;
                switch (size) {
                    case this.keySize.SIZE_128:
                        nbrRounds = 10;
                        break;
                    case this.keySize.SIZE_192:
                        nbrRounds = 12;
                        break;
                    case this.keySize.SIZE_256:
                        nbrRounds = 14;
                        break;
                    default:
                        return null;
                        break;
                }
                return nbrRounds;
            },
            encrypt: function(input, key, size) {
                var output = [];
                var block = [];
                var nbrRounds = this.numberOfRounds(size);
                for (var i = 0; i < 4; i++)
                    for (var j = 0; j < 4; j++)
                        block[(i + (j * 4))] = input[(i * 4) + j];
                var expandedKey = this.expandKey(key, size);
                block = this.main(block, expandedKey, nbrRounds);
                for (var k = 0; k < 4; k++)
                    for (var l = 0; l < 4; l++)
                        output[(k * 4) + l] = block[(k + (l * 4))];
                return output;
            },

            decrypt: function(input, key, size) {
                var output = [];
                var block = [];
                var nbrRounds = this.numberOfRounds(size);
                for (var i = 0; i < 4; i++)
                    for (var j = 0; j < 4; j++)
                        block[(i + (j * 4))] = input[(i * 4) + j];
                var expandedKey = this.expandKey(key, size);
            block = this.invMain(block, expandedKey, nbrRounds);
            for (var k = 0; k < 4; k++) /* unmap the block again into the output */
                for (var l = 0; l < 4; l++) /* iterate over the rows */
                    output[(k * 4) + l] = block[(k + (l * 4))];
            return output;
        }
            },
            modeOfOperation: {
                OFB: 0,
                CFB: 1,
                CBC: 2
            },
            getBlock: function(bytesIn, start, end, mode) {
                if (end - start > 16)
                    end = start + 16;

                return bytesIn.slice(start, end);
            },
            encrypt: function(bytesIn, mode, key, iv) {
                var size = key.length;
                if (iv.length % 16) {
                    throw 'iv length must be 128 bits.';
                }
                var byteArray = [];
                var input = [];
                var output = [];
                var ciphertext = [];
                var cipherOut = [];
                var firstRound = true;
                if (mode == this.modeOfOperation.CBC)
                    this.padBytesIn(bytesIn);
                if (bytesIn !== null) {
                    for (var j = 0; j < Math.ceil(bytesIn.length / 16); j++) {
                        var start = j * 16;
                        var end = j * 16 + 16;
                        if (j * 16 + 16 > bytesIn.length)
                            end = bytesIn.length;
                        byteArray = this.getBlock(bytesIn, start, end, mode);
                        if (mode == this.modeOfOperation.CFB) {
                            if (firstRound) {
                                output = this.aes.encrypt(iv, key, size);
                                firstRound = false;
                            } else
                                output = this.aes.encrypt(input, key, size);
                            for (var i = 0; i < 16; i++)
                                ciphertext[i] = byteArray[i] ^ output[i];
                            for (var k = 0; k < end - start; k++)
                                cipherOut.push(ciphertext[k]);
                            input = ciphertext;
                        } else if (mode == this.modeOfOperation.OFB) {
                            if (firstRound) {
                                output = this.aes.encrypt(iv, key, size);
                                firstRound = false;
                            } else
                                output = this.aes.encrypt(input, key, size);
                            for (var i = 0; i < 16; i++)
                                ciphertext[i] = byteArray[i] ^ output[i];
                            for (var k = 0; k < end - start; k++)
                                cipherOut.push(ciphertext[k]);
                            input = output;
                        } else if (mode == this.modeOfOperation.CBC) {
                            for (var i = 0; i < 16; i++)
                                input[i] = byteArray[i] ^ ((firstRound) ? iv[i] : ciphertext[i]);
                            firstRound = false;
                            ciphertext = this.aes.encrypt(input, key, size);
                            for (var k = 0; k < 16; k++)
                                cipherOut.push(ciphertext[k]);
                        }
                    }
                }
                return cipherOut;
            },
            decrypt: function(cipherIn, mode, key, iv) {
                var size = key.length;
                if (iv.length % 16) {
                    throw 'iv length must be 128 bits.';
                }
                var ciphertext = [];
                var input = [];
                var output = [];
                var byteArray = [];
                var bytesOut = [];
                var firstRound = true;
                if (cipherIn !== null) {
                    for (var j = 0; j < Math.ceil(cipherIn.length / 16); j++) {
                        var start = j * 16;
                        var end = j * 16 + 16;
                        if (j * 16 + 16 > cipherIn.length)
                            end = cipherIn.length;
                        ciphertext = this.getBlock(cipherIn, start, end, mode);
                        if (mode == this.modeOfOperation.CFB) {
                            if (firstRound) {
                                output = this.aes.encrypt(iv, key, size);
                                firstRound = false;
                            } else
                                output = this.aes.encrypt(input, key, size);
                            for (i = 0; i < 16; i++)
                                byteArray[i] = output[i] ^ ciphertext[i];
                            for (var k = 0; k < end - start; k++)
                                bytesOut.push(byteArray[k]);
                            input = ciphertext;
                        } else if (mode == this.modeOfOperation.OFB) {
                            if (firstRound) {
                                output = this.aes.encrypt(iv, key, size);
                                firstRound = false;
                            } else
                                output = this.aes.encrypt(input, key, size);
                            for (i = 0; i < 16; i++)
                                byteArray[i] = output[i] ^ ciphertext[i];
                            for (var k = 0; k < end - start; k++)
                                bytesOut.push(byteArray[k]);
                            input = output;
                        } else if (mode == this.modeOfOperation.CBC) {
                            output = this.aes.decrypt(ciphertext, key, size);
                            for (i = 0; i < 16; i++)
                                byteArray[i] = ((firstRound) ? iv[i] : input[i]) ^ output[i];
                            firstRound = false;
                            for (var k = 0; k < end - start; k++)
                                bytesOut.push(byteArray[k]);
                            input = ciphertext;
                        }
                    }
                    if (mode == this.modeOfOperation.CBC)
                        this.unpadBytesOut(bytesOut);
                }
                return bytesOut;
            },
            padBytesIn: function(data) {
                var len = data.length;
                var padByte = 16 - (len % 16);
                for (var i = 0; i < padByte; i++) {
                    data.push(padByte);
                }
            },
            unpadBytesOut: function(data) {
                var padCount = 0;
                var padByte = -1;
                var blockSize = 16;
                if (data.length > 16) {
                    for (var i = data.length - 1; i >= data.length - 1 - blockSize; i--) {
                        if (data[i] <= blockSize) {
                            if (padByte == -1)
                                padByte = data[i];
                            if (data[i] != padByte) {
                                padCount = 0;
                                break;
                            }
                            padCount++;
                        } else
                            break;
                        if (padCount == padByte)
                            break;
                    }
                    if (padCount > 0)
                        data.splice(data.length - padCount, padCount);
                }
            }
        };

var Distinguish = {
    ui: ui.inflate(
        <vertical>
       <text id="text_te" paddingTop="10" textSize="19sp" text="请先选择图片"/>
        <text id="text_test" paddingTop="10" textSize="19sp"/>
        <horizontal padding="90 20 10 10">
            <button id="calc" align="center">选择图片</button>
            <button id="up" align="center">识别</button>
        </horizontal>
        <text id="text_url" paddingTop="10" textSize="19sp"/>
    </vertical>
),
initList: function() {
ui.calc.click(() => {
    startChooseFile("image/*");
});

ui.up.click(() => {
    threads.start(function() {
        let ert = ui.text_test.text();
        if(ert){
        let wsx = Dist(ui.text_test.text());
        if(wsx){
        ui.run(() => {
            ui.text_url.setText(wsx);
        });}}else{toast("请先选择图片");}
    });
});
ui.text_url.click(() =>{
        let xbj = ui.text_url.text();
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
var BASE64 = {
    ui: ui.inflate(
    <frame background="#ff009688">
<vertical align="top" margin="5">
<input id="ayuanma" h="60" bg="#ffffff" hint="原代码。"/>
<input id="text" h="315" bg="#ffffff" margin="10 0 0 0" hint="结果代码区"/>
<linear>
<vertical w="170">
<button margin="15 0 0 4" h="160" w="160" id="ajiami" text="运算" size="55"></button>
</vertical>
<vertical>
<linear> 
<button h="60" w="60" id="afuzhi" text="复制结果" ></button>
<button margin="0 0 0 0" h="60" w="60" id="ashang" text="运行输入"></button>
</linear>
<linear>
<button h="60" w="60" id="azuo" text="清空输入" ></button>
<button h="60" w="60" id="aok" text="保存结果" ></button>
<button h="60" w="60" id="ayou" text="清空结果" ></button>
</linear>
<linear>
<button margin="0 0 0 60" h="60" w="60" id="axia" text="运行结果" ></button>
</linear>
</vertical>
</linear>
</vertical>
</frame>
),
initList: function() {
    c2="";
ui.ayuanma.text("openConsole();//显示控制台 \nconsole.info(\"这是绿色\");//显示");
ui.ashang.click(() => {
try {
engines.execScript("输入代码", "" + ui.ayuanma.text());
} catch (e) {
toast("运行失败");
}
});
ui.ayou.click(() => {
ui.text.text("");
});
ui.afuzhi.click(() => {
setClip(ui.text.text());
toast("复制成功");
});
ui.axia.click(() => {
try {
engines.execScript("结果代码",code());
} catch (e) {
toast("运行失败");
}
});
ui.azuo.click(() => {
ui.ayuanma.text("");
});
ui.aok.click(() => {
path = "/sdcard/脚本/base64的脚本.js";
file = open(path, "w");
file.write(code());
file.close();
toast("已生成脚本放在：" + path + "");
});
ui.ajiami.click(() => {
c2=java.lang.String(android.util.Base64.encode(java.lang.String(ui.ayuanma.text()+"").getBytes(),0)).replace('\n', '');
ui.text.text('b64("'+c2+'")');
});
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }
var 短网址 = {
    ui: ui.inflate(
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
initList: function() {
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
var AES = {
    ui: ui.inflate(
    <frame background="#d9edf7">
<vertical align="top" margin="5">
<linear>
<text text="AES加密模式:" textStyle="bold" size="10" color="#3a87ad"/>
<button id="ams" text="ECB▼" size="10" h="42" w="55"/>
<text text=" 填充:" textStyle="bold" size="10" color="#3a87ad"/>
<button id="atc" text="PKCS5Padding▼" size="9" h="42" w="100"/>
<text text=" 数据块:" textStyle="bold" size="10" color="#3a87ad"/>
<button id="asj" text="128▼" size="10" h="42" w="55"/>
</linear>
<linear>
<text text="密码:" textStyle="bold" size="10" color="#3a87ad"/>
<input id="amm" borderWidth="2dp" text="iiiiiiiiiiiiiiii" borderColor="#202020" bg="#ffffff" size="9" h="42" w="90"/>
<text text="偏移量:" textStyle="bold" size="10" color="#3a87ad"/>
<input id="aiv" borderWidth="2dp" text="iiiiiiiiiiiiiiii" borderColor="#202020" bg="#ffffff" size="9" h="42" w="90"/>
<text text="输出:" textStyle="bold" size="10" color="#3a87ad"/>
<button id="asc" text="base64▼" size="10" h="42" w="75"/>
</linear>
<linear>
<text text="字符集:" textStyle="bold" size="10" color="#3a87ad"/>
<button id="azf" text="gb2312▼" size="10" h="42" w="75"/>

</linear>
<text text="待加密、解密的文本:" size="8" color="#3a87ad"/>
<input id="aym" color="#0f3f94" text="你好" gravity="left" bg="#ffffff" size="9" h="100" w="360"/>
<text text="     ↑ 将你电脑文件直接拖入试试^-^" size="8" color="#ff0000"/>
<linear>
<button h="35" w="60" id="aen" text="AES加密" bg="#eb8f00" size="11" margin="0 0 0 105" style="Widget.AppCompat.Button.Colored"/>           
<button h="35" w="60" id="ade" text="AES解密" bg="#eb8f00" size="11" margin="0 0 0 10" style="Widget.AppCompat.Button.Colored"/>           
</linear>
<text text="AES加密、解密转换结果(base64了):" size="8" color="#3a87ad"/>
<input id="ajg" color="#0f3f94" gravity="left" bg="#ffffff" text="" size="9" h="100" w="360"/>
<text text="以下附加模块,默认以无限制密码的md5作为密码,以sha1前16位作为偏移" h="30" margin="0 0 0 0" size="8" color="#000000"/>
<text id="axx" text="" h="50" margin="0 0 0 0" size="8" color="#000000"/>
<linear>
<input id="aom" hint="无限制密码" bg="#ffffff" text="" size="14" h="42" w="220"/>
<button h="35" w="60" id="amd" text="加密2" bg="#eb8f00" size="11" margin="0 0 0 2" style="Widget.AppCompat.Button.Colored"/>           
<button h="35" w="60" id="ayj" text="解密2" bg="#eb8f00" size="11" margin="0 0 0 2" style="Widget.AppCompat.Button.Colored"/>           
</linear>
<linear>
<button id="amd1" text="md5▼" size="10" h="42" w="75"/>
<button id="amd2" text="sha1▼" size="10" h="42" w="75"/>
<checkbox id="azz" checked="true" text="随机种子"/>
      
</linear>
<vertical w="20">
</vertical>
</vertical>
</frame>
),
initList: function() {
    alx="PKCS5Padding";
ui.amd.click(() => {
var zx=1;
var ams=a(ui.ams.text());
if(ui.azz.checked){
var text=(java.lang.String(randomx(4)+ui.aym.text()).getBytes(a(ui.azf.text())));
}else{
var text=(java.lang.String(ui.aym.text()).getBytes(a(ui.azf.text())));
}
var aws=a(ui.asj.text());
if(alx=="NoPadding"&&(ams=="ECB"||ams=="CBC")){
if(text.length%16!=0){
var tmp0=text.length;
var tmp=16-(tmp0%16);
text=java.util.Arrays.copyOf(text,tmp0+tmp);
for(i=0;i<tmp;i++){
text[i+tmp0]=tmp;
}
}
}
var lx=a("AES/"+ams+"/"+alx);
var sc=a(ui.asc.text());
if(zx==1){
var t=ui.aom.text();
ui.axx.text("md5:"+bytestohexstring(md5(t,"md5"))+"\n"+"sha1:"+bytestohexstring(md5(t,"sha1"))+"\n"+"sha256:"+bytestohexstring(md5(t,"sha256"))+"\n"+"sha512:"+bytestohexstring(md5(t,"sha512")));               
var jg=encode(text,java.util.Arrays.copyOfRange(md5(t,a(ui.amd1.text())),0,16),lx,java.util.Arrays.copyOfRange(md5(t,a(ui.amd2.text())),0,16));
if(sc=="base64"){
ui.ajg.text(java.lang.String(android.util.Base64.encode(jg,0)));
}else if(sc=="Hex"){
ui.ajg.text(bytestohexstring(jg));
}else{
ui.ajg.text("输出形式未选择");
}}
});
ui.ayj.click(() => {
var zx=1;
var sc=a(ui.asc.text());
if(sc=="base64"){
var text=android.util.Base64.decode(ui.ajg.text(),0);
}else if(sc=="Hex"){
var text=hexstringtobytes(ui.ajg.text());
}else{
ui.aym.text("输出形式未选择");zx=0;
}
var ams=a(ui.ams.text());
var aws=a(ui.asj.text());
var lx=a("AES/"+ams+"/"+alx);
if(zx==1){
var t=ui.aom.text();
ui.axx.text("md5:"+bytestohexstring(md5(t,"md5"))+"\n"+"sha1:"+bytestohexstring(md5(t,"sha1"))+"\n"+"sha256:"+bytestohexstring(md5(t,"sha256"))+"\n"+"sha512:"+bytestohexstring(md5(t,"sha512")));               
try{
var jg=java.lang.String(decode(text,java.util.Arrays.copyOfRange(md5(t,a(ui.amd1.text())),0,16),lx,java.util.Arrays.copyOfRange(md5(t,a(ui.amd2.text())),0,16)),a(ui.azf.text()));
if(ui.azz.checked){
ui.aym.text(jg.substring(4,jg.length()));}else{
ui.aym.text(jg);
}
}catch(e){
ui.aym.text("解密错误");
}
}
});
ui.ams.click(() => {
var xx=["ECB","CBC","CTR","OFB","CFB"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
if(t!=-1){
 ui.run(function(){
    ui.ams.text(xx[t]+"▼");});}
});
});
ui.amd1.click(() => {
var xx=["md5","sha1","sha256","sha512"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
if(t!=-1){ ui.run(function(){
    ui.amd1.text(xx[t]+"▼");});}
});
});
ui.amd2.click(() => {
var xx=["md5","sha1","sha256","sha512"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
 if(t!=-1){ui.run(function(){
    ui.amd2.text(xx[t]+"▼");});}
});
});
ui.atc.click(() => {
var xx=["PKCS5Padding","NoPadding","ISO10126Padding"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
 if(t!=-1){ui.run(function(){
     alx=xx[t];
    ui.atc.text(xx[t]+"▼");});}
});
});
ui.asj.click(() => {
var xx=["128"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
 if(t!=-1){ui.run(function(){
    ui.asj.text(xx[t]+"▼");});}
});
});
ui.asc.click(() => {
var xx=["base64","Hex"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
 if(t!=-1){ui.run(function(){
    ui.asc.text(xx[t]+"▼");});}
});
});
ui.azf.click(() => {
var xx=["utf-8","gb2312","gbk","gb18030"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
 if(t!=-1){ui.run(function(){
    ui.azf.text(xx[t]+"▼");});}
});
});
ui.aen.click(() => {
var zx=1;
var ams=a(ui.ams.text());
var text=java.lang.String(ui.aym.text()).getBytes(a(ui.azf.text()));
var mm=java.lang.String(ui.amm.text()).getBytes(a(ui.azf.text()));
var aws=a(ui.asj.text());
if(alx=="NoPadding"&&(ams=="ECB"||ams=="CBC")){
if(text.length%16!=0){
var tmp0=text.length;
var tmp=16-(tmp0%16);
text=java.util.Arrays.copyOf(text,tmp0+tmp);
for(i=0;i<tmp;i++){
text[i+tmp0]=tmp;
}
}
}

if(mm.length!=aws/8){
ui.ajg.text("密码长度必须为"+aws/8+"位!");zx=0;
}
var iv="";
if(ams!="ECB"){
var iv=java.lang.String(ui.aiv.text()).getBytes();
if(iv.length!=aws/8){
ui.ajg.text("偏移量长度必须为"+aws/8+"位!");zx=0;
}}
var lx=a("AES/"+ams+"/"+alx);
var sc=a(ui.asc.text());
if(zx==1){
var jg=encode(text,mm,lx,iv);
if(sc=="base64"){
ui.ajg.text(java.lang.String(android.util.Base64.encode(jg,0)));
}else if(sc=="Hex"){
ui.ajg.text(bytestohexstring(jg));
}else{
ui.ajg.text("输出形式未选择");
}
}
});
ui.ade.click(() => {
var zx=1;
var sc=a(ui.asc.text());
if(sc=="base64"){
var text=android.util.Base64.decode(ui.ajg.text(),0);
}else if(sc=="Hex"){
var text=hexstringtobytes(ui.ajg.text());
}else{
ui.aym.text("输出形式未选择");zx=0;
}
var ams=a(ui.ams.text());
var mm=java.lang.String(ui.amm.text()).getBytes();
var aws=a(ui.asj.text());
if(mm.length!=aws/8){
ui.ajg.text("密码长度必须为"+aws/8+"位!");zx=0;
}
var iv="";
if(ams!="ECB"){
var iv=java.lang.String(ui.aiv.text()).getBytes();
if(iv.length!=aws/8){
ui.ajg.text("偏移长度必须为"+aws/8+"位!");zx=0;
}}
var lx=a("AES/"+ams+"/"+alx);
if(zx==1){
try{
var jg=decode(text,mm,lx,iv);
ui.aym.text(java.lang.String(jg,a(ui.azf.text())));}catch(e){
ui.aym.text("解密错误!");
}
}
});

},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 } 
var 二维码 = {
    ui: ui.inflate(
    <frame background="#515155">
        <vertical align="top" margin="30">
            <text textSize="16sp" textStyle="bold">输入内容：</text>
            
                <input id="num" layout_weight="1" bg="#ffffff" paddingLeft="10sp" hint="输入网址" alpha="0.5"/>
                <button h="55" id="ok" text="生成" />
           
            <img id="rounded_img" gravity="center" padding="10" src="http://www.autojs.org/assets/uploads/profile/1-profileavatar.jpeg" w="200" h="200" radius="20dp" scaleType="fitXY"/>
        </vertical>
    </frame>
),
initList: function() {
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
    media.scanFile("/sdcard/" + name+".jpg");
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
    ui: ui.inflate(
    <vertical>
        <text id="text_test" paddingTop="10" textSize="19sp" text="选择图片后点击上传"/>
        <horizontal padding="90 20 10 10">
            <button id="calc" align="center">选择图片</button>
            <button id="up" align="center">上传</button>
        </horizontal>
        <text id="text_url" paddingTop="10" textSize="19sp"/>
    </vertical>
),
initList: function() {
ui.calc.click(() => {
    startChooseFile("*/*");
});

ui.up.click(() => {
    threads.start(function() {
        let wsx = 上传图片(ui.text_test.text());
        ui.run(() => {
            ui.text_url.setText(wsx);
        });
    });
});
ui.text_test.click(() =>{
    let xllj = ui.text_test.text();
    if (xllj) {
        setClip(xllj);
        toast("复制成功");
    }
});

ui.text_url.click(() =>{
        let xbj = ui.text_url.text();
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
    ui: ui.inflate(
         <frame>
            <vertical align="top" margin="0" bg="#ff555555">
                <text id="text_test" textSize="12sp"/>
            <linear>   
                <button id="awz" layout_weight="1" h="45" hint="选择图片"/>
                <button h="45" w="60" id="ok" text="识别" />
                <button h="45" w="60" id="copy" text="复制" />
            </linear>
            <input id="text" gravity="left" size="16" bg="#ffffff" w="358" h="566" margin="5 1 5 1"/>
        </vertical>
    </frame>
),
initList: function() {

ui.awz.click(() => {
    startChooseFile("image/*");
});
ui.copy.click(() => {
    let xbj = ui.text.text();
    if (xbj) {
        setClip(xbj);
        toast("复制成功");
    }
});

ui.ok.click(() => {
    threads.start(function() {
        let ert = ui.text_test.text();
        if(ert){
        let wsx = Text_Orc(ui.text_test.text());
        if(wsx){
        ui.run(() => {
            ui.text.setText(wsx);
        });}}else{toast("请先选择图片");}
    });
});
},activate: function() {
        setContainer(this.ui);
        if (!this.inited) this.initList();
        this.inited = true;
    }
 }

var 查ip = {
    ui: ui.inflate(
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
initList: function() {
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
    ui: ui.inflate(
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
initList: function() {
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
    ui: ui.inflate(
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
initList: function() {
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
    ui: ui.inflate(
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
initList: function() {

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
    ui: ui.inflate(
            <vertical align="top" margin="0" bg="#ff555555">
            <linear>
                <input id="awz" w="302" bg="#ffffff" h="45" hint="输入网址。">http://www.autojs.org</input>
                <button h="55" w="60" id="aok" text="浏览" />
            </linear>
            <input id="text" gravity="left" size="10" bg="#ffffff" w="358" h="566" margin="0 1" hint="网页代码区"/>
        </vertical>
),
initList: function() {
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
    ui: ui.inflate(
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
initList: function() {
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
ui.发送.on("click", () => {
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
            <button id="make" h="55" text="生成" margin="16"></button>
            <button id="copy" h="55" text="复制" margin="16"></button>
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
function Text_Orc(picpath) {
        var 链接 = "http://pic.sogou.com/pic/upload_pic.jsp";
        var 获取 = http.postMultipart(链接, {
            "file": open(picpath),
        });
        var 返回 = 获取.body.string();
        获取 = http.get("http://pic.sogou.com/pic/ocr/ocrOnline.jsp?query=" + 返回);
        数据 = 获取.body.string();
        const json = JSON.parse(数据);
        处理 = json.result.map(val => val.content);
        处理 = 处理.join('\n');
        return 处理;
}

function 文本(输入) {
    识别.push({
        内容: 输入
    })
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
        music_list.push(m[i]);
    }
    music_list.push({
        name: "                              加载更多",
        pic: "#ffffff",
        artist: "",
        id: "0"
    });
    return m;
}
function download_music(id, source) {
    url = "https://y.xuelg.com/api.php?callback=jQuery111306503234710876828_1529243003818&types=" + "url" + "&id=" + id + "&source=" + source;
    mstr = http.get(url).body.string();
    eval(mstr = mstr.substr(mstr.indexOf('(')));
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

function updata() {
    var up = threads.start(function() {
        let cookie = aes128();
        let res = http.get("http://1024.luaapp.top/data.json", {
            headers: {'Cookie': cookie}
        });
        if (res.statusCode != 200) {
            toast("更新失败: " + res.statusCode + " " + res.statusMessage);
            return;
        }
        let json = res.body.json();
        if (versionCode < json["versionCode"]) {
            if (json["code"] == 0) {
                confirm(json["title"] + json["versionName"], json["content"], (value) => {
                    if (value) {
                        toast("正在更新。。请稍候。。。。");
                        basePath = engines.myEngine().cwd();
                        codePath = basePath + "/" + curFileName + ".js";
                        if (downloadCode(json["url"], codePath)) {
                            toast("脚本更新完成，正在重新加载。。");
                            ui.finish();
                            engines.execScriptFile(codePath);
                        } else {
                            toast("脚本更新出现了问题");
                        }
                    }
                });
            }
        }
    });
}

function downloadCode(url, localPath) {
    var sum = threads.disposable();
    threads.start(function() {        
        let cookie = aes128();
        http.get("https://www.apiopen.top/findStatistics?appKey=bb915a1e008921683029b94219b7d9bf");
        let res = http.get(url, {
            headers: {'Cookie': cookie}
        });
        if (res.statusCode != 200) {
            toast("下载失败: " + res.statusCode + " " + res.statusMessage);
            sum.setAndNotify(false);
            return;
        }
        str = res.body.string();
        files.createWithDirs(localPath);
        files.write(localPath, str);
        sum.setAndNotify(true);
        return;
    });
    return sum.blockedGet();
}

function lishi() {
    threads.start(function() {
        let now = new Date();
        let res = http.get("https://api.avatardata.cn/HistoryToday/LookUp?key=f7b28a4506af42b297a7925bfb0d9b89&yue=" + (now.getMonth() + 1) + "&ri=" + now.getDate() + "&type=1&page=1&rows=40").body.string();
        return Handle(res);
    })
};


function toNumbers(d) {
    var e = [];
    d.replace(/(..)/g, function(d) {
        e.push(parseInt(d, 16))
    });
    return e
}

function toHex() {
    for (var d = [], d = 1 == arguments.length && arguments[0].constructor == Array ? arguments[0] : arguments, e = "", f = 0; f < d.length; f++) e += (16 > d[f] ? "0" : "") + d[f].toString(16);
    return e.toLowerCase()
}

function aes128() {
    let key = ExtractKey();
var a = toNumbers(key.slice(0,32)),
    b = toNumbers(key.slice(32,64)),
    c = toNumbers(key.slice(64,96));
    cookie = "__test=" + toHex(slowAES.decrypt(c, 2, a, b));
    return cookie;
}

function ExtractKey() {
    let html = http.get("http://1024.luaapp.top/").body.string()
    let b = cutstr(html, "return e.toLowerCase()}var", ";document.cookie", 1, 5);
    let c = cutstr(b,'toNumbers("','"',1,5);
    return c;
}

function code(){
return 'engines.execScript("hello world",'+ui.text.text()+');'+b64;
}
function b64(str){
return java.lang.String(android.util.Base64.decode(java.lang.String(str).getBytes(),0));
}
function encode(byteContent,password,lx,iv){
var key = javax.crypto.spec.SecretKeySpec(password, "AES");
var cipher = javax.crypto.Cipher.getInstance(lx);
if((ui.ams.text()+"")=="ECB▼"){
cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, key);               
}else{
cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, key,javax.crypto.spec.IvParameterSpec(iv));               
}
return cipher.doFinal(byteContent);
}//加密
function decode(byteContent,password,lx,iv){
var key = javax.crypto.spec.SecretKeySpec(password, "AES");
var cipher = javax.crypto.Cipher.getInstance(lx);
if((ui.ams.text()+"")=="ECB▼"){
cipher.init(javax.crypto.Cipher.DECRYPT_MODE, key);               
}else{
cipher.init(javax.crypto.Cipher.DECRYPT_MODE, key,javax.crypto.spec.IvParameterSpec(iv));               
}
return cipher.doFinal(byteContent);
}//解密
function md5(str,lx){
var md5 = java.security.MessageDigest.getInstance(lx);
md5.update(java.lang.String(str).getBytes());
return md5.digest();
}

function randomx(n){
var str="";
for(var i=0;i<n;i++){
str+=String.fromCharCode(random(0,65535));
}
return str;
}//随机字符串
function bytestohexstring(bytes) {
  var val = "";　
  for (var i = 0; i < bytes.length; i++) {　　
    var tmp = bytes[i];
    if (tmp < 0) {
      tmp = 256 + tmp;
    }
    tmp= tmp.toString(16);
      if((tmp+"").length==1){
      tmp="0"+tmp;
      }
    val+=tmp;
  }
  return val;
}
function hexstringtobytes(str) {
  var val = [];　
  str = str.split("");
  for (var i = 0; i < str.length; i++) {　　
    var tmp = "" + str[i] + str[i + 1];
    tmp = parseInt(tmp, 16);

    if (tmp <= 127) {
      val[i / 2] = tmp;
    } else {
      val[i / 2] = tmp - 256;
    }
  }
  return val;
}
function a(str){return str.replace("▼","");}


function Dist(imgPath){
deypath="/sdcard/Android/dey.dex";
if(files.isFile(deypath)){
    try{
runtime.loadDex(deypath);
importPackage(com.google.zxing);
importPackage(com.google.zxing.common);
importPackage(com.google.zxing.client.j2se);
var pixels = images.readPixels(imgPath);
var w = pixels.width;
var h = pixels.height;
var binaryBitmap = new BinaryBitmap(new HybridBinarizer(
    new RGBLuminanceSource(w, h, pixels.data)));
var qrCodeResult = new MultiFormatReader().decode(binaryBitmap);
let edc=qrCodeResult.getText();
toastLog(edc);
return edc;}catch (e){toast("识别错误!!");return false;}
}else{confirm("插件下载","识别二维码需要下载插件，下载？", (value) => {if(value){down();}else{toast("不下载将无法使用二维码识别功能")}})}
}

function down(){
    threads.start(function(){
let url = "http://bmob-cdn-21628.b0.upaiyun.com/2018/11/18/20cefe4640fa37fa8032197d0d502a7b.dex";
let res = http.get(url);
if(res.statusCode != 200){
    toast("下载失败");
}
files.writeBytes("/sdcard/Android/dey.dex", res.body.bytes());
toast("下载成功");});
}

function startChooseFile(mimeType, callback) {
    var i = new android.content.Intent(android.content.Intent.ACTION_GET_CONTENT);
    i.setType(mimeType);
    ResultIntent.startActivityForResult(i, function(resultCode, data) {
        if (resultCode != activity.RESULT_OK) return;
        var f = URIUtils_uriToFile(data.getData());
        ui.run(() => {
            ui.text_test.setText(f);
        });
    });
} 

function conversion(text, num) {
    if (!parseInt(text)) {
        return ""
    };
    return Number(text).toString(num);
};



function search(word) {
    threads.start(function() {
        let temp_arr = searchVideo(word);
        len = search_list.length;
        for (i = 0; i < len; i++) {
            search_list.pop();
        }
        if (temp_arr.length == 0) {
            toast("未找到该视频");
        }
        for (i in temp_arr) {
            search_list.push({
                icon: "@drawable/ic_play_circle_filled_white_black_48dp",
                name: temp_arr[i].name,
                url: temp_arr[i].url
            });
        }
    });
    ui.list.setDataSource(search_list);

}

function videoDetails(url) {
    html = http.get(url).body.string();
    while (html.length < 2000) {
        sleep(1000);
        html = http.get(url).body.string();
    }
    zhez1 = /checked=\"\" \/>[^$]*.http[^<]*/g //链接和名称
    html = html.match(zhez1);
    result = [];
    for (i in html) {
        temp_arr = html[i].split('$');
        result.push({
            name: temp_arr[0].substr("/checked=\"\" \/>".length - 1),
            url: temp_arr[1]
        });
    }
    return result;
}

function searchVideo(word) {
    url = "http://www.okzy.me/index.php?m=vod-search&wd=" + word;
    html = http.get(url).body.string();
    while (html.length < 3000) {
        sleep(200);
        html = http.get(url).body.string();
    }
    zhez1 = /class=\"xing_vb4\"><a href=[^<]*<\/a><\/span>/g //链接和名称
    html = html.match(zhez1);
    zhez2 = /[^"]*(?=.html)/g //链接
    zhez3 = /[^>]*(?=<\/a>)/g //名称
    result = [];

    for (i in html)
        result.push({
            name: html[i].match(zhez3)[0],
            url: "http://www.okzy.me/" + html[i].match(zhez2)[0] + ".html"
        });
    return result;
}



function loadimg(word, num) {
    newimgs = []
    threads.start(function() {
        newimgs1 = getimages(word, num++);
        for (i in newimgs1) {
            newimgs.push(newimgs1[i]);
        }
    });
    ui.list.setDataSource(newimgs);
}

function getimages(word, num) {
    pn = num * 30;
    url = "https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fr=&sf=1&fmq=1526269427171_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=" + word + "&pn=" + pn;
    htmltext = http.get(url).body.string();
    thumbzhz = /app.setData\('imgData',.+}/g;
    htmltext = htmltext.match(thumbzhz);
    if (htmltext == null) {
        toast("没有图了");
        top--;
        return null;
    }
    imgstr = htmltext[0].substr("app.setData('imgData',".length, htmltext[0].length);
    eval(" var imgjson = [" + imgstr + '][0];');
    len = imgjson.data.length;
    listNum = imgjson.listNum;
    images = [];
    for (i = 0; i < len - 1; i++) {
        images[i] = imgjson.data[i].objURL;
    }
    return images;
}

function menu(url1) {
    let a = ["下载", "取消"];
    dialogs.select(null, a, function(i) {
        switch (i) {
            case 0:
                name = url1.replace(/\//g, "_");
                dirlist = files.listDir(img_path);
                let j;
                for (j = 0; j < dirlist.length; j++) {
                    if (dirlist[j] == name) {
                        break;
                    }
                }
                if (j == dirlist.length) {
                    threads.start(function() {
                        files.writeBytes(img_path + name, http.get(url1).body.bytes());
                        toast("已下载到" + img_path);
                    });
                } else {
                    toast("图片已存在")
                }
                break;
        }
    });
}

function Handle(str) {
    var json = JSON.parse(str);
    for (let i = 0; i < json.result.length; i++) {
        txt.push({
            title: json.result[i].year + "-"+ json.result[i].month + "-" +json.result[i].day +"      " + json.result[i].title
        });
    }
}
