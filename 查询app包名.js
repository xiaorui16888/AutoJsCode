var appName = rawInput("输入应用名称");
var a = app.getPackageName(appName);
if (a == null) {
    toast("没有" + appName + "这个应用")
} else {
    toast(appName + "包名为" + a + " 已复制到剪切板");
    setClip(a);
}