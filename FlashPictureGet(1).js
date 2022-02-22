/**
 *QQ闪照拦截器
 *在运行本脚本状态下，所有查看过的QQ闪照，都会拦截并且保存到
 * /sdcard/HrAppS/Flash/LessPicture/ 目录下。
 *音量下切换监听状态，音量上键停止运行
 *
 *作者：浩然
 *QQ：2125764918
 *Autojs官方群号：564718187
 *
 *适配安卓版本：安卓4.1及以上
 *适配分辨率：无分辨率要求
 *
 *免责申明：禁止非法使用，非法使用本脚本与开发者无关
 *版权申明：开发者保留程序全部版权，商业用途请先联系
 */
 
 
//获取运行权限
console.show();

//运行初始化设置
var lastList = files.listDir("/sdcard/tencent/MobileQQ/diskcache/");
for (var i = 0; i < lastList.length; i++) {
    lastList[i] = lastList[i].split("_")[1];
}
var sleepTime=false;
//检查创建保存路径
files.createWithDirs("/sdcard/tencent/MobileQQ/disk/");
files.createWithDirs("/sdcard/HrAppS/Flash/LessPicture/");
console.log("Programe initialize complete.\n");

//按键监听线程
threads.start(function() {
    events.observeKey();
    events.onKeyDown("volume_down", function(event) {
        sleepTime=!sleepTime;
        if(sleepTime){
            toast("暂停运行");
            console.warn("STOP RUN");
        }else{
            toast("继续运行");
            console.warn("CONTINUE RUN");
        }
    });
    events.onKeyDown("volume_up", function(event) {
        toast("结束运行");
        console.warn("EXIT RUN");
        console.hide();
        exit();
    });
});

//开始检测
for (var l = 1; true; l++) {
    console.log("The " + l + " times. ");
    var nowList = files.listDir("/sdcard/tencent/MobileQQ/diskcache/");
    for (var i = 0; i < nowList.length; i++) {
        nowList[i] = nowList[i].split("_")[1];
    }
    var hadList = files.listDir("/sdcard/tencent/MobileQQ/disk/")
    for (var i = 0; i < hadList.length; i++) {
        hadList[i] = hadList[i].split(".jpg")[0];
    }
    //log("当前列表：" + nowList.join("|"));
    //log("本地列表：" + hadList.join("|"));

    var newList = arr_dive(nowList, hadList);
    //console.verbose("新建列表：" + newList.length);
    for (var i = 0; i < newList.length; i++) {
        //log(newList[i])
        if (copyPicture("/sdcard/tencent/MobileQQ/diskcache/Cache_" + newList[i], "/sdcard/tencent/MobileQQ/disk/" + newList[i] + ".jpg")) {
            console.info("ADD ImagesCopySuccessful: " + newList[i] + ".jpg");
        } else {
            //console.verbose("ADD ImagesCopyError: "+newList[i]+".jpg");
        }
    }

    var lessList = arr_dive(lastList, nowList);
    //log("减少列表：" + lessList.join("|"));
    if (lessList.length > 0) {
        console.info("减少列表：" + lessList.join("|"));
        //toast("获取到减少图片：" + lessList.length)
        for (var i = 0; i < lessList.length; i++) {
            //log(lessList[i])
            if (copyPicture("/sdcard/tencent/MobileQQ/disk/" + lessList[i] + ".jpg", "/sdcard/HrAppS/Flash/LessPicture/" + lessList[i] + ".jpg")) {
                console.info("GET ImagesCopySuccessful: " + lessList[i] + ".jpg");
                toast("拦截到一张闪照\n" + lessList[i] + ".jpg");
            } else {
                console.error("GET ImagesCopyError: " + lessList[i] + ".jpg");
            }
        }
    }
    lastList = nowList; 
    
    while(sleepTime);
      
    if (hadList.length < 10) {
        toastLog("\n|*******************|\n|首次使用配置完成|\n|*******************|\n");
        sleep(2000);
    }
}

function arr_dive(aArr, bArr) {　　
    if (bArr.length == 0) {
        return aArr
    }　　
    var diff = [];　　
    var str = bArr.join("&quot;&quot;");　　
    for (var e in aArr) {　　
        if (str.indexOf(aArr[e]) == -1) {　　　　
            diff.push(aArr[e]);　　　　
        }　　
    }　　
    return diff;
}

function copyPicture(source, dest) {
    try {
        images.save(images.read(source), dest, "jpg");
        //console.info("ImagesCopySuccessful:"+dest.split("/")[5]);
        return true;
    } catch (e) {
        //console.verbose("ImagesCopyError:"+dest.split("/")[5]);
        return false;
    }
}