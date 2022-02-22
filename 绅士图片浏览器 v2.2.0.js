"ui";
/*
*
*By 纯生 QQ:1571208236
*Date 2018-10-10 12:03:00
*注意：
     不能快速点击下一页 上一页 处理速度跟不上的 会崩溃
     过段时间host可能会失效
     获取新的host方法
     发送任意内容邮件： liumangtu@mail.com  获取最新host
*/
var Update_log = ("更新日志:\n" +
    "2.0\n" +
    "     1.全新UI界面\n" +
    "     2.更多内容更多资源\n" +
    "     3.优化运行流畅度\n" +
    "     4.增加图集下载功能\n" +
    "2.1.1\n" +
    "     1.修复点下一页过快会崩溃问题\n" +
    "     2.增加启动时恢复上次浏览的位置\n" +
    "     3.改善其他一些细节问题\n"+
    "2.2.0\n"+
    "     1.增加host失效提醒\n"+
    "     2.调整翻页按钮位置\n"+
    "     3.提升浏览流畅性\n"+
    "     4.修复页数显示不准确问题\n"
    );


//域名
var host = "https://www.4455nu.com"
//图片
var Pic_List = [];
//列表
var Home_List = [];
//默认页数
var top = 4;
//菜单选项
var ib = 2;
//图片下载路径
var img_path = "/sdcard/DCIM/";
//开关
var stop = 1;
//浏览记录
var storage = storages.create("See_Record");
//storages.remove("See_Record");
var add = storage.get("b");
var bdd = storage.get("a");
if (add && bdd != null) {
    top = add;
    ib = bdd;
    列表(add, bdd);
} else {
    列表(top, ib);
}

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="绅士图片浏览器 v2.2.0"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <!-- 第一页内容-->
                <frame>
                    <vertical>
                        <list id="list" layout_weight="1" h="0" padding="5">
                            <vertical h="30dp">
                                <text text="{{this.title}}" textColor="#000000" textSize="16sp" margin="5 0 5 10" maxLines="1" ellipsize="end"/>
                            </vertical>
                        </list>
                        <horizontal  h="40" gravity="center" bg="#ffffff">
                            <button id="last" text="上一页" textSize="18sp" layout_weight="1"  style="Widget.AppCompat.Button.Borderless.Colored" />
                            <button id="rand" text="随机" layout_weight="1" textSize="18sp"  style="Widget.AppCompat.Button.Borderless.Colored" />
                            <button id="next" text="下一页" layout_weight="1" textSize="18sp"  style="Widget.AppCompat.Button.Borderless.Colored" />
                            <text id="text" textSize="18sp" layout_weight="1" text="第{{top}}页" />
                        </horizontal>
                        
                    </vertical>
                </frame>
                <!-- 第二页内容-->
                <frame>
                    <list id="list2" bg="?selectableItemBackground">
                        <img id="image" src="{{this.url}}" w="*" h="auto" margin="5 5 5 5" tint="#00ffffff" />
                    </list>
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" scaleType="fitXY" src="http://pic2.ooopic.com/11/17/55/15b1OOOPIC45.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="10" src="{{this.icon}}" tint="#009688"/>
                    <text textColor="black" textSize="18sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);

//创建选项菜单(右上角)
ui.emitter.on("create_options_menu", menu => {
    menu.add("获取新网站");
    menu.add("加我反馈问题");
    menu.add("更新日志");
});
//监听选项菜单点击
ui.emitter.on("options_item_selected", (e, item) => {
    switch (item.getTitle()) {
        case "获取新网站":
            New_host();
            toastLog("新网站已经复制到剪贴板，请手动把开头host的网址给替换了");
            break;
        case "加我反馈问题":
            qq = "1571208236"
            app.startActivity({
                action: "android.intent.action.VIEW",
                data: "mqqapi://card/show_pslcard?&uin=" + qq
            });
            break;
        case "更新日志":
            alert(Update_log);
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);
//设置滑动页面的标题
ui.viewpager.setTitles(["列表", "图片"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);
//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);
//设置主页内容
ui.list.setDataSource(Home_List);
//设置第二页内容
ui.list2.setDataSource(Pic_List);
Left_List=[{id:"1",title:"卡通动漫",icon:"@drawable/ic_photo_size_select_actual_black_48dp"},{id:"2",title:"亚洲图片",icon:"@drawable/ic_photo_size_select_actual_black_48dp"},{id:"3",title:"欧美图片",icon:"@drawable/ic_photo_size_select_actual_black_48dp"},{id:"4",title:"偷拍自拍",icon:"@drawable/ic_photo_size_select_actual_black_48dp"},{id:"5",title:"乱伦熟女",icon:"@drawable/ic_photo_size_select_actual_black_48dp"},{id:"6",title:"精品套图",icon:"@drawable/ic_photo_size_select_actual_black_48dp"},{id:"7",title:"同性美图",icon:"@drawable/ic_photo_size_select_actual_black_48dp"},{id:"8",title:"美腿丝袜",icon:"@drawable/ic_photo_size_select_actual_black_48dp"}];
//设置左侧列表内容
ui.menu.setDataSource(Left_List);
ui.viewpager.addOnPageChangeListener(new android.support.v4.view.ViewPager.OnPageChangeListener({
    onPageSelected: function(pos) {
        if (pos == "0") {
            列表(top, ib);
        }
    }
}));

//列表点击
ui.list.on("item_click", function(item, itemView, listView) {
    string(1, item.title);
    图片列表(item.url);
});
//图片列表点击
ui.list2.on("item_click", function(item, itemView, listView) {
    Down(item.url);
});
//随机
ui.rand.on("click", function() {
    if (stop){
        t = random(1, 70);
        top=t;
        列表(t, ib);}
});
//下一页    
ui.next.click(() => {
    列表(top + 1, ib);
    if (stop) top++;
});
//上一页
ui.last.click(() => {
    if (top < 2) return;
    列表(top - 1, ib);
    if (stop) top--;
});

//左侧菜单栏点击
ui.menu.on("item_click", item => {
    switch (item.id) {
        case "1":
            ib = 1;
            top = 1;
            列表(top, ib);
            string(0, item.title);
            break;
        case "2":
            ib = 2;
            top = 2;
            列表(top, ib);
            string(0, item.title);
            break;
        case "3":
            ib = 3;
            top = 3;
            列表(top, ib);
            string(0, item.title);
            break;
        case "4":
            ib = 4;
            top = 4;
            列表(top, ib);
            string(0, item.title);
            break;
        case "5":
            ib = 5;
            top = 5;
            列表(top, ib);
            string(0, item.title);
            break;
        case "6":
            ib = 6;
            top = 6;
            列表(top, ib);
            string(0, item.title);
            break;
        case "7":
            ib = 7;
            top = 7
            列表(top, ib);
            string(0, item.title);
            break;
        case "8":
            ib = 8;
            top = 8;
            列表(top, ib);
            string(0, item.title);
            break;
    }
});


function string(id, text) { //设置ui标签
    //标签
    ui.tabs.getTabAt(id).setText(text);
    //跳转
    ui.viewpager.setCurrentItem(id);
    //收缩
    ui.drawer.closeDrawer(3);
}

function 列表(n, id) {
    threads.start(function() {
        if (stop) {
            ui.post(()=>{
            Home_List = [];
            ui.text.setText("第" + top + "页");
            ui.list.setDataSource(Home_List);});
            storage.put("a", id);
            storage.put("b", n);
            str = /\/htm\/pic\d{0,3}\/\d{2,10}\.htm/gi
            let html = host + "/htm/piclist" + id + "/";
            let a = http.get(html + n + ".htm").body.string();
            let b = cutstr(a, "<li", "</li>", 1, 25);
            let url = b.match(str);
            let ee = cutstr(b, "</span", "</a>", 1, 30);
            let ti = ee.split(">");
            if (ti && url == null) {
            toast("网址已经失效!点右上角=>重新获取网址");
            return false;}
            stop=0;
            return 拆解(ti, url);
        }
    });
}

function 图片列表(bb) {
    threads.start(function() {
        ui.post(()=>{
        Pic_List=[];
        ui.list2.setDataSource(Pic_List);});
        let a = http.get(host + bb).body.string();
        let b = a.match(/https?\:\/\/.*?jpg/gi);
        let res = http.get(b[2]);
        if (res.statusCode != 200) {
            toast("图片链接失败,请重新选择一个");
            return false;
        }
        return 拆解2(b);
    });
}

function 拆解(aa, bb) {
    for (let i = 0; i <= aa.length - 2; i++) {
        添加(aa[i + 1], bb[i]);
        sleep(50);
    }  
    stop = 1;
}

function 拆解2(aa) {
    for (let i = 0; i < aa.length; i++) {
        添加2(aa[i]);
    }
}

function 添加(标题, 链接) {
    Home_List.push({
        title: 标题,
        url: 链接
    });
}

function 添加2(链接) {
    Pic_List.push({
        url: 链接
    });
}

function Down(url1) {
    let a = ["单张下载", "图集下载", "取消"];
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
            case 1:
                Download_Array(Pic_List);
                toast("任务已添加，后台开始下载。。");
                break;
        }
    });
}

function Download_Array(D_Array) {
    threads.start(function() {
        for (let o = 0; o < D_Array.length; o++) {
            Download(D_Array[o].url);}
            toast("图集下载完成!");
        function Download(str) {
            var name = str.replace(/\//g, "_");
            dirlist = files.listDir(img_path);
            for (var j = 0; j < dirlist.length; j++) {
                if (dirlist[j] == name) {
                    break;
                }
            }
            if (j == dirlist.length) {
                threads.start(function() {
                    下载(str);                   
                });
            }

            function 下载(u) {
                file = http.get(u).body.bytes();
                files.writeBytes(img_path + name, file);
            }
        }
    });
}

function New_host() {
    threads.start(function() {
    let str = http.get("https://share.weiyun.com/d29d41b4531035b7a2b5759c0f44e0e8").body.string();
    let host = cutstr(str, 'brief":"', '","content_type', 1, 3);
    toastLog(host);
    setClip(host);
    return host;
    });
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