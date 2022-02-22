auto.waitFor();


function main(){
    toast("请打开公众号捞钱阁!");
    while(!click("阅读赚钱"));
    waitForActivity("com.tencent.mm.plugin.webview.ui.tools.WebviewMpUI");
    isInNewWeb()
    click("阅读原文");
    isInNewWeb()
    s=text("确定").findOne(1000);
    if(s){
        s.click();
    }
    sleep(2000);
    while(!click("账号检测"));
    isInNewWeb()
    sleep(7000);
    back();
    isInNewWeb()
    while(!click("开始阅读"));
}


//是否正确进入页面
function isInNewWeb(){
    className("android.widget.ProgressBar").findOne();
    var state=true;
    var count=0;
    var startTime=new Date().getTime();
    while(state){
        var c=className("android.widget.ProgressBar").findOne(100);
        if(c==null){
            //无网，页面无法找到
            sleep(500);
            if(desc("无法打开网页").findOne(200)){
                if(count>5){;
                    toast("刷新失败大于5次");
                    return false;
                }else{
                    count++;
                }
            }else{
                state=false
            }
        }
        if(new Date().getTime()-startTime>25000){
            toast("时间超过25秒");
            return false;
        }
    }
    return true;
    
}

main()