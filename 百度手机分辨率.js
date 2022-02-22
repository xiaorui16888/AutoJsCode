log("脚本有时测得分辨率不对 导致用户无法使用 可以用此方法");
log("有问题联系qq 986883511");
var 正确的分辨率高=百度手机分辨率();


function 百度手机分辨率(){
    var fblheight;
    var mmm2="https://www.so.com/s?q="+device.device+"+分辨率";
    thread1=threads.start(function(){  
        log("百度手机分辨率 开始");
        try {
            var res = http.get(mmm2);
            if(res.statusCode == 200){
                log("网页打开成功...");
                var httpstr = res.body.string();
                var sousuostr="x"+device.width;
                var index = httpstr.indexOf(sousuostr);
                if(index>0){
                    fblheight = parseInt(httpstr.substring(index-4,index));
                    log("百度成功 分辨率高为："+fblheight);
                }else{
                    fblheight="百度失败";
                    log("没有检索到分辨率信息");
                }
            }
        } catch (error) {
            log("百度手机分辨率 异常!!!");
            fblheight="查找异常";
        }
        log("百度手机分辨率 结束");
    });
    thread1.join(2000);
    thread1.interrupt();
    return fblheight;
}

log("正确的分辨率高:"+正确的分辨率高);
log("脚本测得分辨率高:"+device.height);

