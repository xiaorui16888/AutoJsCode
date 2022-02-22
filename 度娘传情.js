"ui";

var color = "#03A9F4";
var toolcolor = "#FFFFCD";
ui.statusBarColor(color);
ui.layout(
    <drawer id="drawer" bg="#FAFAFA">
        <vertical>
            <appbar bg="#03A9F4"> 
                <toolbar id="toolbar"title="度娘传情"/>
                <tabs id="tabs"/>
            </appbar>
            <viewpager id="viewpager">
                <frame>
                   <vertical bg={color} >
                    <input id="text1_input" layout_weight="1" hint="请填写情书内容" hintColor="#ffffff" margin="30" textColor="#F44336" textSize="16sp" marginTop="30" bg="#FFFFFF" />
                    <input id="accepter_input" layout_weight="1" hint="请填写收件人" hintColor="#ffffff" margin="30" textColor="#F44336" textSize="16sp" marginTop="30" bg="#FFFFFF"/>
                    <input id="sender_input" layout_weight="1" hint="请填写发件人" hintColor="#ffffff" margin="30"  textColor="#F44336" textSize="16sp" marginTop="30"  bg="#FFFFFF"/>
                    <button id="print" layout_weight="1" text="写好了生成密码" textColor="#F44336" marginTop="30"  margin="30" bg="#FAFAFA"/>
                    </vertical>
                </frame>
            </viewpager>
        </vertical>
        <vertical layout_gravity="left" bg="#FAFAFA" w="280">
            <img id="myHead" src="file://../my.jpg"/>
            <list id="menu">
                <horizontal bg="?selectableItemBackground" w="*">
                    <img w="50" h="50" padding="16" src="{{this.icon}}" tint="{{color}}"/>
                    <text textColor="black" textSize="15sp" text="{{this.title}}" layout_gravity="center"/>
                </horizontal>
            </list>
        </vertical>
    </drawer>
);


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
            alert("关于", "百度传情 v1.0.0");
            break;
    }
    e.consumed = true;
});
activity.setSupportActionBar(ui.toolbar);

//设置滑动页面的标题
ui.viewpager.setTitles(["百度传情"]);
//让滑动页面和标签栏联动
ui.tabs.setupWithViewPager(ui.viewpager);

//让工具栏左上角可以打开侧拉菜单
ui.toolbar.setupWithDrawer(ui.drawer);

ui.menu.setDataSource([{
        title: "作者简介",
        icon: "@drawable/ic_android_black_48dp"
    },
    {
        title: "使用说明",
        icon: "@drawable/ic_settings_black_48dp"
    },
    {
        title: "联系作者",
        icon: "@drawable/ic_favorite_black_48dp"
    },
    {
        title: "退出软件",
        icon: "@drawable/ic_exit_to_app_black_48dp"
    }
]);


ui.menu.on("item_click", item => {
    switch (item.title) {
        case "作者简介":
            alert("本人精通CSS、JavaScript、PHP、ASP、C、C＋＋、C#、Java、Ruby、Perl、Lisp、python、Objective-C、ActionScript、Pascal等单词的拼写 ，及Windows、Linux、Andriod、OS X等环境的开关机。如有疑问请与我联系")
            break;
        case "使用说明":
            alert(null, "还用我教吗？。。");
            break;
        case "联系作者":
            qq = "2661621351"
            app.startActivity({
                action: "android.intent.action.VIEW",
                data: "mqqapi://card/show_pslcard?&uin=" + qq
            });
            break;
        case "退出软件":
            ui.finish();
            break;
    }
});
ui.print.on("click", () => {
    threads.start(function() {
        var 内容 = ui.text1_input.text();
        var 发送者 = ui.sender_input.text();
        var 接受者 = ui.accepter_input.text();
        var a = http.get("https://sp0.baidu.com/9_Q4sjW91Qh3otqbppnN2DJv/pae/common/api/Writeletter?appid=4064&content=" + 内容 + "&sender=" + 发送者 + "&receiver=" + 接受者 + "&extratext=4064&cover=99&cb=jsonp_1514089623240_27300")
        //console.show()
        var b=a.body.string().match(/\\u89e3\\u871c\d+/g).toString().match(/\d+/g)
        log(b[3])


        /*******
        寻求帮助
        寻求帮助
        寻求帮助
        寻求帮助
        */ ////
       
        setClip("解蜜"+(b[3]))
        toast("密码为：" + "解密"+(b[3])+ "\n已复制到剪贴板")
    });
});
/*ui.exit.on("click", () => {
    threads.start(function() {
        toast("结束")
    });
});
ui.myHead.on("click", () => {
    threads.start(function() {
        toast("是我")
    });
});*/