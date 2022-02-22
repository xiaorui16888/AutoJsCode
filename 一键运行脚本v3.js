var folder = "/sdcard/脚本/签到/";//脚本文件夹
var cancelsign = "##";//取消运行标志
var checktime = 5;//每5秒检查一次脚本状态，结束了就运行下一个
var timeout = 90;//90秒超时，超过后强制停止、运行下一个

//浅叶制作
Alljs = files.listDir(folder,function(name){
    if (name.indexOf(cancelsign) != -1){
        return false;
        }
    return name.endsWith(".js");
});

for (x in Alljs){
    var egn;var egm;
    egn = engines.execScriptFile(folder + Alljs[x]);
    sleep(500);
    egm = egn.getEngine();
    
    for (var i=0;i < timeout;i = i + checktime){
    if (egm.isDestroyed ()){
        break;
    }
        toastLog("已等待"+i+"秒")
        sleep(checktime * 1000)
    }
    
    sleep(1000);
    egm.forceStop();
}

toast("已完成所有脚本");