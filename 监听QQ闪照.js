//注意本脚本需要在最新版的 pro 版autojs上运行

alert("注意:", "本软件无界面,启动后,请保持本软件的后台活动,否则切后台后会被杀死进程,无法监听,获取到闪照后会保存到: /sdcard/QQ闪照/ 目录下");

var sdcardPath = files.getSdcardPath();

var CACHE_PATH = sdcardPath+"/tencent/MobileQQ/diskcache/";
var RESULT_PATH = sdcardPath+"/QQ闪照/";

if (!files.exists(RESULT_PATH)) {
    files.ensureDir(RESULT_PATH);
}

let watcher = $files.observe(CACHE_PATH);
var oldFile = "";
watcher.on("create", (path) =>{
    if (path.substring(path.length-3) == "_fp") {
        dialogs.confirm("Bingo!!!", "检测到一张QQ闪照,是否打开查看?", (value)=>{
            if (!$files.exists(RESULT_PATH+path+".jpg")) {
                $files.copy(CACHE_PATH+path, RESULT_PATH+path+".jpg");
            }
            if (value) {
                app.viewFile(RESULT_PATH+path+".jpg");
            } else {
                toast("闪照已保存到: "+RESULT_PATH);
            }
        })
    }
});


setInterval(()=>{}, 500);
