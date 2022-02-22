"ui";

var bgcolor = "#ffffff";
var color = "#000000";
ui.statusBarColor(color);

/***************图片***** */
var img_path = "/storage/emulated/0/00细雨/图片/";
files.createWithDirs(img_path);
/***************音乐*****/
var music_list = [];
var music_source = ["netease","kugou","baidu","xiami","tencent"];
var music_page = 1;
var music_word = "";
var music_flag1 = true;
dialogs.confirm("小哥哥and小姐姐，本软件由晓雨独自编程滴，可能有些不稳定。所以搜索时，多摁几下搜索，懂吗。/n记住了，这个软件叫灵晶哦")
ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar bg={color}>
                <toolbar id="toolbar" h="30" title="" />
                <tabs id="tabs" h="30" />
            </appbar>
            <viewpager id="viewpager">
                <!-- 第一页内容-->
                <frame>
                    <vertical >
                        <horizontal bg={bgcolor} alpha="1" h="45">
                            <input id="input" hint="搜索图片" layout_weight="1" textSize="16sp" marginLeft="16" />
                            <button id="search" text="搜索" w="60" h="40" margin="0,0,0,-50" style="Widget.AppCompat.Button.Borderless.Colored" />
                            <button id="last" text="⬅" w="70" margin="0,0,0,-20" style="Widget.AppCompat.Button.Borderless.Colored" />
                            <button id="rand" text="随机" w="70" margin="0,-10" style="Widget.AppCompat.Button.Borderless.Colored" />
                            <button id="next" text="➡" w="70" margin="0,0" style="Widget.AppCompat.Button.Borderless.Colored" />
                        </horizontal  >
                        <list id="icons" spanCount="1" bg={bgcolor}>
                            <img id="image" src="{{this}}" w="*" h="*" margin="-0,0" tint="#00ffffff" />
                        </list>
                        <text text="请稍等" textSize="30sp" textColor="#000000" />
                    </vertical>
                </frame>
                <!-- 第二页内容-->
                <frame>
                    <vertical bg={bgcolor}>
                        <horizontal>
                            <input id="music_search_input" hint="搜索音乐" layout_weight="1" textSize="16sp" marginLeft="16" />
                            <button id="music_search_button" text="搜索" textSize="20sp" w="100" h="50" margin="-5,0,0,-80" style="Widget.AppCompat.Button.Borderless.Colored" />
                            <spinner id="music_sp1" textSize="20sp" w="100" h="50" margin="-4,-40,0,0" entries="网易音乐|酷狗音乐|百度音乐|虾米音乐|QQ音乐"/>
                        </horizontal>
                        <frame>
                            <list id="music_list">
                                <horizontal>
                                    <linear bg="?selectableItemBackground" w="1000">
                                        <img src="{{pic}}" h="50" w="50" />
                                        <vertical h="50">
                                            <text text="{{name}}" textSize="15sp" textColor="#000000" h="20" w="*" margin="10,0,5,10" />
                                            <text text="{{artist}}" textSize="10sp" h="20" w="*" margin="0,0,0,10" />
                                        </vertical>
                                    </linear>
                                </horizontal>
                            </list>
                        </frame>
                    </vertical>
                </frame>
                <!-- 第三页内容-->
                <frame>
                    <vertical bg={bgcolor}>
                        <horizontal h="45">
                            <input id="search_input" layout_weight="1" hint="搜索视频" textSize="16sp" marginLeft="16" />
                            <button id="search_button" text="搜索" textSize="20sp" w="100" h="50" margin="-5,0,0,-80" style="Widget.AppCompat.Button.Borderless.Colored" />
                        </horizontal>
                        <frame>
                            <list id="list">
                                <horizontal>
                                    <linear bg="?selectableItemBackground" w="1000">
                                        <img src="{{icon}}" h="50" w="50" tint="#000000" />
                                        <text text="{{name}}" textSize="15sp" h="40" w="*" textColor="#000000" margin="10,10" />
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
            toast("还没有设置，哼(*￣m￣)");
            break;
        case "关于":
            alert("关于", "内个 没啥好关于滴，知道我叫啥就行。");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["图片", "音乐", "视频"]);
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
            qq = "3375338014"
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

/***************************百度图片******************************* */
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
/*queryEnc":"%E4%BA%8C%E6%AC%A1%E5%85%83%E5%A3%81%E7%BA%B8",  
  "displayNum":107267,  
    "bdIsClustered" : "1",  
      "listNum":1978,   
       "bdFmtDispNum" : "107267",   
        "bdSearchTime" : "",   
         "isNeedAsyncRequest":0,
         "data":[{"thumbURL":"https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpo*/
var top = 0;
var word = "壁纸"
var listNum;
//开始加载图片
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

ui.icons.on("item_click", function(img3) {
    menu(img3);
    //toast(img3);
    setClip(img3);
});




function loadimg(word, num) {
    newimgs = []
    threads.start(function() {
        //log("\n------------------" + num + "--------------------------\n")
        newimgs1 = getimages(word, num++);
        for (i in newimgs1) {
            newimgs.push(newimgs1[i]);
        }
        //log(newimgs);
    });
    ui.icons.setDataSource(newimgs);
}



function getimages(word, num) {
    pn = num * 30;
    url = "https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fr=&sf=1&fmq=1526269427171_R&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word=" + word + "&pn=" + pn;
    htmltext = http.get(url).body.string();
    //htmltext = "sdg,kpsgffsd4,;,565;fsd45app.setData('imgData',{a:1,b:2,c:3});fas.;dffsd"
    //log(htmltext);
    //图库的正则表达式
    /*app.setData('imgData',*/
    thumbzhz = /app.setData\('imgData',.+}/g;
    //log(thumbzhz);
    htmltext = htmltext.match(thumbzhz);
    if (htmltext == null) {
        toast("没有图了");
        top--;
        return null;
    }
    imgstr = htmltext[0].substr("app.setData('imgData',".length, htmltext[0].length);
    //log(" var imgjson = ["+imgstr+'];');
    eval(" var imgjson = [" + imgstr + '][0];');
    //log(imgjson);
    len = imgjson.data.length; //数量
    listNum = imgjson.listNum;
    images = [];
    for (i = 0; i < len - 1; i++) {
        images[i] = imgjson.data[i].objURL;
    }
    return images;
}

/***************************视频**************************** */
search_list = [];

ui.list.on("item_click", function(athis) {
    //log(athis)
    if (athis.url == null && athis.name == "返回") {
        ui.list.setDataSource(search_list);
        return;
    }
    if (athis.url.indexOf("http://okzyzy.cc/") == -1) {
        app.openUrl(athis.url);
        setClip(athis.url);
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
        } //log(video_list)
    }).join();
    ui.list.setDataSource(video_list);
});

ui.search_button.on("click", function() {
    search(ui.search_input.text());
})

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

        //log(search_list);
    });
    ui.list.setDataSource(search_list);

}
//


function videoDetails(url) {
    html = http.get(url).body.string();
    while (html.length < 2000) {
        sleep(1000);
        html = http.get(url).body.string();
    }
    //html = "<li><input type=\"checkbox\" name=\"copy_sel\" value=\"http://youku.cdn-iqiyi.com/20180425/9984_5e777e33/index.m3u8\" checked=\"\" />第01464654集$http://youku.cdn-iqiyi.com/20180425/9984_5e777e33/index.m3u8</li> <li><input type=\"checkbox\" name=\"copy_sel\" value=\"http://youku.cdn-iqiyi.com/20180425/9984_5e777e33/index.m3u8\" checked=\"\" />第01集$http://youku.cdn-iqiyi.com/20180425/9984_5e777e33/index.m3u8</li> ";
    zhez1 = /checked=\"\" \/>[^$]*.http[^<]*/g //链接和名称
    //log(html.length)
    html = html.match(zhez1);
    //log(html);
    result = [];
    for (i in html) {
        temp_arr = html[i].split('$');
        result.push({
            name: temp_arr[0].substr("/checked=\"\" \/>".length - 1),
            url: temp_arr[1]
        });
    }
    //log(result);
    return result;
}

function searchVideo(word) {
    url = "http://okzyzy.cc/index.php?m=vod-search&wd=" + word;
    html = http.get(url).body.string();
    while (html.length < 3000) {
        sleep(200);
        html = http.get(url).body.string();
    }
    //log(html.length)
    //html = "<li><span class=\"tt\"></span><span class=\"xing_vb4\"><a href=\"/?m=vod-detail-id-10653.html\" target=\"_blank\">环太平洋：雷霆再起BD</a></span> <span class=\"xing_vb5\">科幻片</span> <span class=\"xing_vb6\">2018-06-10</span></li></ul> <li><span class=\"tt\"></span><span class=\"xing_vb4\"><a href=\"/?m=vod-detail-id-10653.html\" target=\"_blank\">环太平洋：雷霆再起BD</a></span> <span class=\"xing_vb5\">科幻片</span> <span class=\"xing_vb6\">2018-06-10</span></li></ul> <li><span class=\"tt\"></span><span class=\"xing_vb4\"><a href=\"/?m=vod-detail-id-10653.html\" target=\"_blank\">环太平洋：雷霆再起BD</a></span> <span class=\"xing_vb5\">科幻片</span> <span class=\"xing_vb6\">2018-06-10</span></li></ul> "
    zhez1 = /class=\"xing_vb4\"><a href=[^<]*<\/a><\/span>/g //链接和名称
    //log(html)
    html = html.match(zhez1);
    //log(html)
    zhez2 = /[^"]*(?=.html)/g //链接
    zhez3 = /[^>]*(?=<\/a>)/g //名称
    result = [];
    //log(html)
    for (i in html)
        result.push({
            name: html[i].match(zhez3)[0],
            url: "http://okzyzy.cc/" + html[i].match(zhez2)[0] + ".html"
        });

    //log(result);
    return result;
}
/***************************音乐************************ */



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
            setClip(m.name + " - " + m.artist);
            app.openUrl(music_d.url);

        });
    }
});

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

        
    