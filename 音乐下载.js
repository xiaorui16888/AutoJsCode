"ui";

var bgcolor = "#ffffff";
var color = "#000000";
ui.statusBarColor(color);
/***************音乐*****/
var music_list = [];
var music_source = ["tencent","netease","kugou","baidu","xiami"];
var music_page = 1;
var music_word = "";
var music_flag1 = true;

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar bg={color}>
                <toolbar id="toolbar" h="30" title="" />
                <tabs id="tabs" h="30" />
            </appbar>
            <viewpager id="viewpager">
                <!-- 第三页内容-->
                                <frame>
                    <vertical bg={bgcolor}>
                        <horizontal>
                            <input id="music_search_input" hint="搜索音乐" layout_weight="1" textSize="16sp" marginLeft="16" />
                            <button id="music_search_button" text="搜索" textSize="20sp" w="100" h="50" margin="-5 0 0 -80" style="Widget.AppCompat.Button.Borderless.Colored" />
                            <spinner id="music_sp1" textSize="20sp" w="100" h="50" margin="-4 -40 0 0" entries="QQ|网易|酷狗|百度|虾米"/>
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
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img src="http://pic1.16pic.com/00/52/10/16pic_5210406_b.jpg" h="200" scaleType="centerCrop" />
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}" />
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
                </horizontal>
            </list>
        </vertical>
    </drawer>
);

/*******************************ui模板******************************** */
//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("设置");
    menu.add("关于");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "设置":
            toast("还没有设置");
            break;
        case "关于":
            alert("关于", "还没有关于");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["音乐"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([{
        title: "图片下载路径",
        icon: "@drawable/ic_android_black_48dp"
    },
    {
        title: "视频搜索说明",
        icon: "@drawable/ic_settings_black_48dp"
    },
    {
        title: "交流",
        icon: "@drawable/ic_favorite_black_48dp"
    },
    {
        title: "退出",
        icon: "@drawable/ic_exit_to_app_black_48dp"
    }
]);

ui.menu.on("item_click", item => {
    switch (item.title) {
        case "图片下载路径":
            alert(null, img_path);
            break;
        case "视频搜索说明":
            alert(null, "视频网页不稳定请耐心等待，\n也有可能出现点击搜索后什么结果也没有，但多试几次就行了");
            break;
        case "交流":
            qq = "1075056431"
            dialogs.confirm(null, "QQ:" + qq, function(i) {
                if (i) {
                    app.startActivity({
                        action: "android.intent.action.VIEW",
                        data: "mqqapi://card/show_pslcard?&uin=" + qq
                    });
                }
            });
            break;
        case "退出":
            ui.finish();
            break;
    }
});


/***************************音乐************************ */

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


/**
 * 获取搜索结果
 * @param {关键字} word 
 * @param {网站源：baidu,tencent,netease,xiami,kugou} source 
 * @param {第几页} page 
 * @param {每页个数} num 
 */
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