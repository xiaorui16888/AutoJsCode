"ui";

var bgcolor = "#666666";
var color = "#009688";
ui.statusBarColor(color);

/***************图片***** */
var img_path = "/sdcard/Download/img2/";
files.createWithDirs(img_path);
/***************文件浏览 *****/
var file_path = "/sdcard/";
var file_delay = 0;
var lastpath = [];
lastpath.push(file_path);



ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar >
                <toolbar id="toolbar" h="20" title="" />
                <tabs id="tabs" h="20" />
            </appbar>
            <viewpager id="viewpager">
                <!-- 第一页内容-->
                <frame>
                    <vertical >
                        <horizontal bg={color} alpha="1" h="45">
                            <input id="input" hint="壁纸" layout_weight="1" textColor="#ffffff" textSize="16sp" marginLeft="16" />
                            <button id="search" text="搜索" textColor="#ffffff" w="60" h="40" margin="0,0,0,-50" style="Widget.AppCompat.Button.Borderless.Colored" />
                            <button id="last" text="⬅" w="70" textColor="#ffffff" margin="0,0,0,-20" style="Widget.AppCompat.Button.Borderless.Colored" />
                            <button id="rand" text="随机" w="70" textColor="#ffffff" margin="0,-10" style="Widget.AppCompat.Button.Borderless.Colored" />
                            <button id="next" text="➡" w="70" textColor="#ffffff" margin="0,0" style="Widget.AppCompat.Button.Borderless.Colored" />
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
                        <horizontal bg={color} h="45">
                            <input id="search_input" layout_weight="1" hint="输入视频关键字" hintColor="#ffffff" textColor="#ffffff" textSize="16sp" marginLeft="16" />
                            <button id="search_button" text="搜索" textColor="#ffffff" textSize="20sp" w="100" h="50" margin="-5,0,0,-80" style="Widget.AppCompat.Button.Borderless.Colored" />
                        </horizontal>
                        <frame>
                            <list id="list">
                                <horizontal>
                                    <img src="{{icon}}" h="50" w="50" tint="#00ffff" />
                                    <text text="{{name}}" textSize="20sp" h="40" w="*" textColor="#ffffff" margin="10,10" />
                                </horizontal>
                            </list>
                        </frame>
                    </vertical>
                </frame>
                <!-- 第三页内容-->
                <frame>
                    <vertical bg={bgcolor}>
                        <list id="file_list">
                            <frame>
                                <horizontal>
                                    <img src="{{icon}}" w="50" h="50" bg="?selectableItemBackgroundBorderless" tint="#00ffff" />
                                    <text text="{{name}}" h="60" w="360" textColor="#ffffff" textSize="20sp" />
                                </horizontal>
                            </frame>
                        </list>
                    </vertical>
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img src="http://ws4.sinaimg.cn/large/0060lm7Tly1fpx1skrabaj31hc0u01kx.jpg" h="200" scaleType="centerCrop"/>
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
            toast("还没有设置，右上角有帮助");
            break;
        case "关于":
            alert("关于", "继续完善中。。。，\n右上角有帮助");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["壁纸", "视频", "文件浏览"]);
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
/***************************文件浏览器************************ */
showpath(file_path);
ui.file_list.on("item_click", function(file) {
    //toast(file.name);
    if (file.name == "返回上一级") {
        if (lastpath.length > 1) {
            file_path = lastpath.pop();
        }
    } else {
        lastpath.push(file_path);
        file_path += file.name + '/'
    }
    if (files.isFile(file_path)) {
        app.viewFile(file_path);
        file_path = lastpath.pop();
    } else {
        showpath(file_path);
    }
});

function showpath(path) {
    let filelist = [{
        icon: "@drawable/ic_arrow_back_black_48dp",
        name: "返回上一级"
    }];
    templist = files.listDir(path);
    templist.sort();
    for (i in templist) {
        if (files.isDir(path + templist[i])) {
            filelist.push({
                icon: "ic_folder_black_48dp",
                name: templist[i]
            });
        }
    }
    for (i in templist) {
        if (files.isFile(path + templist[i])) {
            filelist.push({
                icon: "ic_insert_drive_file_black_48dp",
                name: templist[i]
            });
        }
    }
    sleep(file_delay);
    ui.file_list.setDataSource(filelist);
}