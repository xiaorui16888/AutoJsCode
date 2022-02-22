"ui";
//by白酒煮饭 
var 颜色 = "#009688";
var 对话 = [{
    左宽: "0dp",
    右宽: "16dp",
    对齐: "left",
    头像: "http://cdn.duitang.com/uploads/item/201504/03/20150403H3451_hmCvr.thumb.700_0.jpeg",
    信息: "嗨，你好呀",
    图1: "50dp",
    图2: "0dp"
}];
var 识别 = [];

function 关于() {
    alert("完善中...", "此版本不完美，还存在诸多问题，有兴趣者自行可修改，后续还会加入更多功能");
}

function 机器(说) {
    //log("她说："+i);
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
    //log("我说："+i);
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
        //toastLog(info);
        var 获取 = http.post(链接, {
            "key": "f48dd9f7a5284994bddcc546ae66cbd4",
            "info": 输入,
            "userid": "80000"
        });
        var 源码 = 获取.body.string();
        eval("b=" + 源码);
        机器(b.text);
    });
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

ui.layout(
    <drawer id="drawer">
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="示例" />
                <tabs id="tabs" />
            </appbar>
            <viewpager id="viewpager">
                <frame>
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
                </frame>
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
                <frame>
                    <text text="第三页内容" textColor="green" textSize="16sp" />
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#ffffff" w="280">
            <img w="280" h="200" alpha="0.7" scaleType="fitXY" src="http://images.shejidaren.com/wp-content/u左宽oads/2014/10/023746fki.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{颜色}}" />
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center" />
                </horizontal>
            </list>
        </vertical>
    </drawer>
);

ui.List.setDataSource(对话);
ui.List2.setDataSource(识别);

//机器人对话
ui.发送.on("click", () => {
    var 输入 = ui.内容.text();
    我(输入);
    机器人(输入);
    ui.内容.setText("");
});
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
            关于();
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["图灵机器人", "文字识别", "正在添加..."]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([{
        title: "选项一",
        icon: "@drawable/ic_android_black_48dp"
    },
    {
        title: "选项二",
        icon: "@drawable/ic_settings_black_48dp"
    },
    {
        title: "选项三",
        icon: "@drawable/ic_favorite_black_48dp"
    },
    {
        title: "退出",
        icon: "@drawable/ic_exit_to_app_black_48dp"
    }
]);

ui.menu.on("item_click", item => {
    switch (item.title) {
        case "退出":
            ui.finish();
            break;
    }
})