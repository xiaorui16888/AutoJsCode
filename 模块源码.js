var item = [
    "自添加",
    "app",
    "console",
    "device",
    "dialogs",
    "engines",
    "events",
    "floaty",
    "files",
    "globals",
    "http",
    "images",
    "keys",
    "media",
    "modules",
    "sensors",
    "shell",
    "storages",
    "threads",
    "timers",
    "ui"
];

var A = dialogs.select("选择", item);
if (A + 1) {
    if (A == 0) {
        var txt = dialogs.rawInput("请输入");
        if (!txt) {
            exit();
        };
        var B = eval("(" + txt + ")");
    } else {
        var B = eval("(" + item[A] + ")");
    };
    console.show();
    log(B);
    try {
        log(B.toString());
    } catch (e) {};
    for (var i in B) {
        try {
            log(i + "\n" + B[i].toString())
        } catch (e) {}
    }
}