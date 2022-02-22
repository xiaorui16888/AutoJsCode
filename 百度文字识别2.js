//创建多线程对象，按键监听，按下返回键结束脚本
function overListen() {
    threads.start(function() {
        events.observeKey();
        events.onKeyDown("volume_down", function(event){
        toastLog("脚本已强制退出");
        exit();
        });
    });
}

function reqScreenImg(path,isTestMode){
    var imgPath;
    if(isTestMode == 1){  //测试模式下，把形参path赋值给imgPath,非测试模式时path没用（为调试方便而设）
        imgPath = path;
    }else{
        imgPath = "./cap.png";
        captureScreen(imgPath);
        sleep(100);
    }
    
    var capImg = images.read(imgPath);
    if(capImg == null){
        log(imgPath + "读取游戏截图失败");
        exit();
    }
    return capImg;
}

//img是图片，不是base64格式的图片
function Baidu_OCR(img) {
    var accessUrl = "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=YIKKfQbdpYRRYtqqTPnZ5bCE&client_secret=hBxFiPhOCn6G9GH0sHoL0kTwfrCtndDj";
    var respondstr = http.get(accessUrl).body.string();
    var idx = respondstr.indexOf('access_token');
    var access_token = respondstr.substr(idx+15, 70);
    log(access_token);
    url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic?access_token=" + access_token;
    imag64 = images.toBase64(img);
    res = http.post(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        image: imag64,
        image_type: "BASE64",
    });
    str = JSON.parse(res.body.string()).words_result.map(val => val.words).join('\n');
    return str;
}

function mainEntrence(){ 
    toastLog("按下 音量- 可以强制退出脚本");
    
    overListen();
    
    auto.waitFor();
    
    if(!requestScreenCapture()){
        toastLog("请求截图失败");
        exit();
    }else{
        sleep(100);
    }
    
    var testMode = 0;
    var img = reqScreenImg("",testMode);
    
    var str = Baidu_OCR(img);
    log("百度识图结果：\n"str);
    
    toastLog("退出脚本");
    exit();
    

} mainEntrence();
