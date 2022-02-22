path = "/sdcard/";
listpath(path);
function listpath(path) {
    var a = files.listDir(path);
    var b = [];
    a.sort();
    b[0] = "返回上一级";
    for (var i = 1; i <= a.length; i++) {
        b[i] = a[i - 1];
    }
    i = dialogs.select(path, b);
    if (i == 0) {
        fpath = path.substr(0,path.substr(0,path.length-2).lastIndexOf("/"))+"/";
        if(fpath=="/"){
            listpath(path);
        }
        else{
            listpath(fpath);
        }
    }
    else {
        if (files.isDir(path + b[i])) {
            fpath = path;
            listpath(path + b[i] + "/");
        }
        else if(i!=-1){
            if(dialogs.confirm("打开文件？",path+b[i])){
            app.viewFile(path+b[i])
            }
            else{
            listpath(path);
            }
        }
    }
}