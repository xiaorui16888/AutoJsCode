
//王者荣耀保存回放文件分享给别人(并且可以通过此脚本导入王者荣耀可在王者里边观看此对局)。或者回放忘记保存(对局结束后会自动保存，但是，并没有加入到可观看的界面)。




if (!dialogs.confirm("简介", "本程序主要用于\n王者荣耀保存回放分享给别人的问题")) {
    exit();
}

//app.startActivity("console");
var path = "/sdcard/Android/data/com.tencent.tmgp.sgame/files/Replay";
var Apath = "/sdcard/Android/data/com.tencent.tmgp.sgame/files/Replay/AutoSave"
var Bpath = files.path("./王者回放");
var Cpath = "/storage/emulated/0/tencent/QQfile_recv";

var frompath, topath, txt, moshi = ["导出", "导入(可在王者荣耀保存回放里边找到)", "分享"];

var motoL = dialogs.select("选择方式", moshi);
if (motoL + 1) {
    if (moshi[motoL] == "导出") {
        txt = moshi[motoL];
        frompath = Apath;
        topath = Cpath;
    };
    if (moshi[motoL] == "导入") {
        var i=dialogs.singleChoice("从哪导入",["王者自动保存(对局结束后，会自动保存)","QQ文件"]);
        if(i+1){
            if(!i){
        txt = moshi[motoL];
        frompath = Apath;
        topath = path;
        }else{
        txt = moshi[motoL];
        frompath = Cpath;
        topath = path;            
            };
        };
    };
    if (moshi[motoL] == "分享") {
        txt = moshi[motoL];
        frompath = Apath;
        topath = Apath;
    };
    //    console.show();
    log(txt);
    log(frompath);
    log(topath);
    var filenames = files.listDir(frompath, function(name) {
        return name.endsWith(".abc");
    });
    if (motoL < 2) {
        var fileL = new Array;
        try {
            fileL = dialogs.multiChoice("选择" + txt, filenames);
        } catch (e) {}
        if (fileL.length) {
            log(fileL);
            for (var i in fileL) {
                log(fileL[i]);
                var name = filenames[fileL[i]];
                log(name);
                var istrue = files.copy(files.join(frompath, name), files.join(topath, name));
                log(istrue);
                toast(name);
                //files.move(fromPath, toPath);
            }
        }
    } else {
        var L = dialogs.singleChoice(moshi[motoL], filenames);
        if (L + 1) {
            var path = files.join(frompath, filenames[L]);
            log(path);
            shareFile(path);
        }
    }
}

function shareFile(uri) {
    var intent = new android.content.Intent(Intent.ACTION_SEND);
    intent.putExtra(Intent.EXTRA_STREAM, uri);
    intent.setType("application/octet-stream");
    context.startActivity(intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)); 
}