"ui";
var items = [];
var items2 = [];
var host = "https://www.4455mk.com";
var top = 1; //初始页
var img_path = "/sdcard/脚本/";
HOME(1);
//写脚本也伤身  写不下去了
//这个脚本还存在很多问题，等待大神完善。。。
function HOME(i) {
    列表(i);
    ui.layout(
        <vertical>
            <horizontal h="45" paddingLeft="20">
                <button id="last" text="上一页"  w="70"/>
                <button id="next" text="下一页" w="70" />
                <button id="ra" text="跳转" w="70" />
                <text id="text" textSize="16sp" text="当前处于第{{top}}页"/>
            </horizontal>
            <list id="list">
                <text id="asd" text="{{this.name}}" textSize="18sp"/>
            </list>
        </vertical>
    );
    ui.run(function() {
        ui.list.setDataSource(items);
    });
    //ui.list.setDataSource(items);
    ui.list.on("item_click", function(item, itemView, listView) {
        看图(item.url, item.name);
    });
    //刷新
    ui.ra.on("click", () => {
        HOME(i);
    });
    //下一页    
    ui.next.click(() => {
        HOME(top++);
        ui.text.setText("当前处于第" + top + "页");
    });
    //上一页
    ui.last.click(() => {
        if (top < 2) {
            return;
        }
        top--;
        HOME(top - 1);
        ui.text.setText("当前处于第" + top + "页");
    });
}

function 看图(bb, tip) {
    图片列表(bb);
    ui.layout(
        <vertical>
            <text id="text2" text="" />
            <horizontal h="45" paddingLeft="20">
                <button id="fanhui" text="返回"  w="70"/>
            </horizontal>
            <list id="list" spanCount="1">
                <img id="image" src="{{this.url}}" w="*" h="*" margin="-0,0" tint="#00ffffff" />
            </list>
            
        </vertical>
    );
    ui.text2.setText(tip);
    ui.list.setDataSource(items2);
    ui.list.on("item_click", function(item, itemView, listView) {
        Down(item.url);
    });
    //返回
    ui.fanhui.on("click", () => {
        items2 = [];
        HOME(top);
    });
}

function Down(url1) {
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


function 列表(n) {
    threads.start(function() {
        var url, a, b, c, d, e, f
        链 = /\/htm\/pic\d{0,3}\/\d{2,10}\.htm/gi
        url = "https://www.4455mk.com/htm/piclist2/";
        a = http.get(url + n + ".htm").body.string();
        b = cutstr(a, "<li", "</li>", 1, 25);
        链接 = b.match(链);
        ee = cutstr(b, "</span", "</a>", 1, 20);
        标题 = ee.split(">");
        return 拆解(标题, 链接)
    });
}

function 图片列表(bb) {
    threads.start(function() {
        var a = http.get(bb).body.string();
        var b = cutstr(a, 'img src="', '><br><', 1, 150);
        var b = b.split('"');
        return 拆解2(b);
    });
}

function 拆解(aa, bb) {
    items = [];
    for (let i = 1; i < aa.length; i++) {
        添加(aa[i], bb[i - 1]);
    }
}

function 添加(标题, 链接) {
    items.push({
        name: 标题,
        url: host + 链接
    });
}

function 拆解2(aa) {
    threads.start(function() {
        for (let i = 0; i < aa.length - 1; i++) {
            添加2(aa[i]);
        }
    });
}

function 添加2(链接) {
    items2.push({
        url: 链接
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