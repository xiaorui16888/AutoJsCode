if (confirm("该操作会删除SD卡目录及其子目录下所有空文件夹(是指其子孙文件夹都没有文件,不会删除有隐藏文件的文件夹)，是否继续？")) {
    toast("请点击右上角打开日志");
    deleteAllEmptyDirs("/sdcard");//files.getSdcardPath()
    toast("全部完成！");
}

function deleteAllEmptyDirs(dir,C) {
    var list = files.listDir(dir);
    var len = list.length;
    if (len == 0) {
        //log("删除目录 " + dir + " " + (files.remove(dir) ? "成功" : "失败"));
        return true;
    };
    for (let i = 0; i < len; i++) {
        var child = files.join(dir, list[i]);
        if (files.isDir(child)&& ((!C && C != 0) || C > 0)) {
            if (deleteAllEmptyDirs(child,C-1)) {
                log("删除目录 " +child+ (files.remove(child) ? "成功" : "失败"));
            };
        }
    };
    var list = files.listDir(dir);
    var len = list.length;
    if (len == 0) {
        //log("删除目录 " + dir + " " + (files.remove(dir) ? "成功" : "失败"));
        return true;
    };
}