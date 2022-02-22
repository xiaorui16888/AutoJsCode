function getFilesFromPath(path) {
    /*格式:H.getFilesFromPath(文件夹路径)*/
    /*解释:获取文件夹所有文件和文件夹 递归遍历 返回文件路径数组*/
    var arrDir = new Array();
    var arrFile = new Array();
    try {
        var rp = /^([/][^\/:*?<>|]+[/]?)+$/;
        if (rp.test(path) == false) throw "非法文件路径,H.getFilesFromPath(?);" + path;
    } catch (err) {
        log(err);
        exit();
    }
    /*获取path目录下所有文件夹和文件*/
    var arr = files.listDir(path);
    /*遍历文件和文件夹*/
    for (var i = 0; i < arr.length; i++) {
        /*连接路径*/
        newPath = files.join(path, arr[i]);
        /*判断路径类型*/
        if (files.isDir(newPath)) {
            arrDir.push(newPath);
            /*递归遍历文件夹*/
            var arrF = getFilesFromPath(newPath);
            arrDir = arrDir.concat(arrF);
        } else if (files.isFile(newPath)) {
            arrFile.push(newPath);
        }
    }
    /*按字母升序排序数组*/
    arrDir.sort();
    arrFile.sort();
    /*连接数组并返回*/
    return arrDir.concat(arrFile);
}