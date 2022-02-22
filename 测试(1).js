try {
    jcgx()
} catch (err) {
    toastLog(err)
}

function jcgx() {
       var r=http.get("http://fyfyfy.my91.club/版本1.php", {}, function(res, err) {
        if (res.body.string().toString()=="1.1.3") {
           toastLog("已是最新版本")
        }else{
           var t= http.get("http://fyfyfy.my91.club/更新公告.txt").body.string()
            
            dialogs.build({
    //对话框标题 
    title: "更新公告",
    //对话框内容 
    content: t,
    //确定键内容 
    positive: "在线更新",
    //取消键内容 
    negative: "浏览器下载",
    //中性键内容 
    neutral: "暂不更新",
    //勾选框内容 
    canceledOnTouchOutside: false,
}).on("positive", () => { //监听确定键 
 http.get("http://fyfyfy.my91.club/apk/最新版.apk", {}, function(res, err) {
       var b=res.body.bytes()
       files.writeBytes(files.getSdcardPath()+"/New era/我的下载/最新版.apk",b)
       app.viewFile(files.getSdcardPath()+"/New era/我的下载/最新版.apk")
       })
}).on("neutral", () => { //监听中性键 
    app.openUrl("http://fyfyfy.my91.club/apk/最新版.apk")
}).on("negative", () => {
    toastLog("欢迎使用【New era】app");
   
}).show();
            }
               
                    })
                 
                    }