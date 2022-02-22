var url = "http://dav.jianguoyun.com/dav/";
var name = ""; //坚果云账号
var pass = ""; //获取方式 https://writer.drakeet.com/backups
var code = base64(name + ":" + pass);


function 读取(code) {
    //读取目录文件
    var res = http.request("http://dav.jianguoyun.com/dav/", {
        method: "PROPFIND",
        headers: {
            Authorization: "Basic "+code
        }
    })
    log(res.body.string());
}

function 创建目录(name) {
    //用于创建目录
    //vat name = "Writer.txt;
    var res = http.request(url + name, {
        method: "MKCOL",
        headers: {
            "Authorization": "Basic " + code,
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        },

    });
    log(res.body.string());
}

function 删除(path) {
    var res = http.request(url + path, {
        method: "DELETE",
        headers: {
            "Authorization": "Basic " + code,
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        }
    });
    log(res.body.string());
}

function 获取(path) {
    var res = http.get(url + path, {
        headers: {
            "Authorization": "Basic " + code,
            "Content-Type": "text/plain;charset=UTF-8",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        }
    });
    log(res.body.string());
}

function 上传(path, str) {
    var res = http.request(url+path,{
        method: "PUT",
        headers: {
            "Authorization": "Basic " + code,
            "Content-Type": "text/plain;charset=UTF-8",
            "Connection": "Keep-Alive",
            "Accept-Encoding": "gzip",
            "User-Agent": "okhttp/3.12.1"
        },
        //body: "Javascript 面向对象编程—继承和封装"
        body: str
    });
    log(res.body.string());
}

function base64(str) {
    return java.lang.String(android.util.Base64.encode(java.lang.String(str).getBytes(), 2));
}
function JoinFolder(Folder1){
    return Folder1+"/"
}
function run(){
var time=new Date();
var arr=new Array()
var Catalog="auto.js文件/"
arr[0]=time.getFullYear()
arr[1]=time.getMonth()+1
arr[2]=time.getDate()
arr[3]=time.getHours()+"_"+time.getMinutes()

for(let i=0;i<arr.length;i++){
    log(Catalog)
    创建目录(Catalog)
    Catalog+=JoinFolder(arr[i])
}
创建目录(Catalog)
var dir = "/sdcard/脚本/";//脚本存放目录
recursionRun(dir,Catalog)
}
function recursionRun(Dir,Catalog){
    if(files.isEmptyDir(Dir)) return false;
    
    var Files = files.listDir(Dir, function(name){
        return name.endsWith("") && files.isFile(files.join(Dir, name));
    });
    var Folders = files.listDir(Dir, function(name){
        return files.isDir(files.join(Dir, name)) && !files.isEmptyDir(files.join(Dir, name))
    });
    log(Dir)
    for(let temp=0;temp<Files.length && Files.length!=0;temp++){
        上传(Catalog+Files[temp],files.read(Dir+Files[temp]))
        log(Catalog+Files[temp])
    }

    for(let i=0;i<Folders.length && Folders.length!=0;i++){
        创建目录(Catalog+JoinFolder(Folders[i]))
        log(Dir+JoinFolder(Folders[i]))
        recursionRun(Dir+JoinFolder(Folders[i]),Catalog+JoinFolder(Folders[i]))
    }
   
}

run()