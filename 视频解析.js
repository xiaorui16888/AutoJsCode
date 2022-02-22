"ui";
var toolcolor = "#FFCCBC";
var color = "#BBDEFB";
ui.statusBarColor(color);
ui.layout(
    <vertical padding="20" bg={(color)}>
        <text textSize="16sp" textStyle="bold">视频解析 v0.1</text>
        <horizontal>
            <button id="explain"textSize="16" text="使用说明"/>
            <button id="callMe"textSize="16" text="与我交流"/>
        </horizontal>
        <input id="get" textColor="black" text="我是输入框" layout_weight="1" h="100" gravity="top" bg={(toolcolor)} alpha="1"/>
        <horizontal>
            <button id="ok">开始解析</button>
            <button id="clos">清空</button>
        </horizontal>
        <text textSize="16sp" gravity="right" textStyle="bold" text="by Nice Strange"/>
    </vertical>
);
//说明
ui.explain.on("click", () => {
    dialogs.alert("使用说明", "将需要解析的视频链接复制到输入框，点击解析即可播放")
});
//解析
ui.ok.on("click", () => {
    threads.start(function() {
        u();
    });
});
//清空
ui.clos.on("click", () => {
    ui.get.setText("");
});
//交流
ui.callMe.on("click", () => {
    qq = "2661621351"
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "mqqapi://card/show_pslcard?&uin=" + qq
    });
});

//方法区

function u() {
    let txt = ui.get.text();
    url = "http://jiexi.92fz.cn/player/vip.php?url="
    app.openUrl(url + txt)
    
}