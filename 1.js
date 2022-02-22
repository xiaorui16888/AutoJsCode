"ui";

ui.layout(
    <vertical padding="16">
        <input id="a" hint="内容"/>
        <button id="b" text="写入" w="*"/>
    </vertical>
);

ui.b.on("click", () => {
    var a = ui.a.text()
    var path = ("/sdcard/文件1.txt");
    var file = open(path, "w")
    //写入文件
    file.write(a);
    file.close()
    toast("写入   " + files.read("/sdcard/文件1.txt"))
});