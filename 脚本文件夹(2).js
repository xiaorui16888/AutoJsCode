"ui";
ui.layout(
    <frame>
        <list id="list">
            <vertical>
                <text id="name" textSize="16sp" textColor="#000000" text="{{name}}"/>
            </vertical>
        </list>
    </frame>
);
var dir = "/sdcard/脚本";
var items = files.listDir(dir, function(name) {
    return name.endsWith(".js") && files.isFile(files.join(dir, name));
});
items=items.map(function(name) {
    return {
        name: name
    }

});

ui.list.setDataSource(items);

ui.list.on("item_click", function(item, i, itemView, listView) {
//    toast("被点击的名字为: " + item.name + "，年龄为: " + item.age);
});