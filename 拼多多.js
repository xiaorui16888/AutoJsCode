auto()
console.show()
importClass("android.content.ClipboardManager")
var config = files.isFile("config.js") ? require("config.js") : {};
if (typeof config !== "object") {
    config = {};
}
var options = Object.assign({
    "timeout": "12000",
    "findtime":"10000"
}, config); // 用户配置合并

var callback = function (){
    log("callback",threads.currentThread())
    var promise = new Promise(
        function(resolve, reject){
            resolve()
    })

    promise.then(function(){
        var done = false;
        log("start",threads.currentThread())
        log("listener",currentActivity())
        log("监听回调事件","addPrimaryClipChangedListener")
        if (manager.hasPrimaryClip() && manager.getPrimaryClip().getItemCount() > 0) {
        var addedText = manager.getPrimaryClip().getItemAt(0).getText();
        if (addedText != null) {
            log("addedText",threads.currentThread())
            //manager.clearPrimaryClip()//清理剪切板
            log("copied:", "copied text: " + addedText)
            let reg_exp = /[\u4e00-\u9fa5！]*.*⇥[A-Za-z0-9]*⇤.*\[[\u4e00-\u9fa5，]*\]\s[\u4e00-\u9fa5：A-Za-z0-9:/.]*/
            var result = reg_exp.test(addedText)
            if(result){
                app.launchPackage("com.xunmeng.pinduoduo")
                log("clip_Sign_in",currentActivity())
                className("android.widget.TextView").text("立即查看").findOne(options.findtime).click()
                //app.startActivity("com.xunmeng.pinduoduo.activity.NewPageActivity")
                //id("tv_title").text("签到领现金").waitFor()
                log(currentActivity())
    
                // if(className("android.view.View").text("签到领微信零钱").exists){
                //     className("android.view.View").text("签到领微信零钱").findOne().parent().click()
                //     log("马上要签到了！")
                // }else if(className("android.view.View").text("领取微信零钱").exists){
                //     log("已经签到了！")
                // }else{
                //     log("没找到！")
                // }
                // log("函数执行完了！")   
                // }
                log("函数执行完了！")
                done=true
            }
        }}
    })
}

//用于验证码签到
// setClip("现金红包派发中！多多祝你财源滚滚⇥dJQC34hJ6uaDM⇤[复制本条信息，下载并打开拼多多领现金] \/n \
// 下载地址：http://pdd.etilev.cn/dJQC34hJ6uaDM")
var manager = context.getSystemService(context.CLIPBOARD_SERVICE);//全局变量，控制监听器
var listener ={onPrimaryClipChanged:callback}


waitForText = function(keyword){
    var timeout = this.options.timeout
    var waitTime=200
    sleep(2000)
    timeout-=2000
    for(var i =0;i<timeout;i+=waitTime){
        if(className("android.widget.TextView").text(keyword).exists()){
            sleep(1000)
            return true
        }
        sleep(waitTime) //加载中
    }
    return false
}

main()
function main(){
    manager.addPrimaryClipChangedListener(listener)
    log("wocaocaocao")
    sleep(20000)
    manager.removePrimaryClipChangedListener(listener)
    if(callback.done == true)
        //manager.removePrimaryClipChangedListener(listener2)
        log("removePrimaryClipChangedListener")
}