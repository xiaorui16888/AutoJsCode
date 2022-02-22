events.observeKey();
events.onKeyDown("volume_down", function(event) {
    toast("开始");
    var UiObject = boundsInside(0, 0, device.width, device.height).visibleToUser().find();
    var data = null;
    for (let i = 0; i < UiObject.length; i++) {
        var className = UiObject[i].className();
        var bounds = UiObject[i].bounds();
        var id = UiObject[i].id();
        var text = UiObject[i].text();
        data += "——————————————————————————\n类名称: " + className + "\n界限: " + bounds + "\nID: " + id + "\n文本: " + text + "\n";
    }
    files.write("./界面控件.txt", data);
});