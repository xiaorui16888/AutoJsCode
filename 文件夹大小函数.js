
console.show()
path=//files.getSdcardPath()//路径
exit()

arr=[]
deleteAllEmptyDirs(path);
log((eval(arr.join("+"))/1048579).toFixed(2)+" Mb");

function deleteAllEmptyDirs(dir){
    var list = files.listDir(dir);
    var len = list.length;
    for(let i = 0; i < len; i++){
        var child = files.join(dir, list[i]);
        if(files.isDir(child)){
            deleteAllEmptyDirs(child);
        }else{
            arr.push(new java.io.File(child).length());
            }
    }
}