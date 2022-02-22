
function Baidu_OCR(imgdata) {
    access_token = http.get("https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=YIKKfQbdpYRRYtqqTPnZ5bCE&client_secret=hBxFiPhOCn6G9GH0sHoL0kTwfrCtndDj").body.json().access_token;
    url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic" + "?access_token=" + access_token;
    imag64 = images.toBase64(imgdata);
    res = http.post(url, {headers: {'Content-Type': 'application/x-www-form-urlencoded'},image: imag64,image_type: "BASE64",language_type:"JAP"});
    str = JSON.parse(res.body.string()).words_result.map(val => val.words).join('\n');
    return str;
}

auto.waitFor();
//home();
launchApp("中国银河证券");

log("wait trade\n");
var tradeBtn = text("交易").findOne(3000);
if(tradeBtn != null)
    tradeBtn.parent().click();
else
    log("wait tradBtn not found\n");


var loginBtn = id("com.galaxy.stock:id/loginBtn").findOne(1000);
if(loginBtn != null)loginBtn.click();
else
    log("wait loginBtn not found\n");

var closebtn = id("com.galaxy.stock:id/closeBtn").findOne(1000);
if(closebtn != null)closebtn.click();
else
    log("wait closebtn not found\n");

var custno_tv = id("com.galaxy.stock:id/custno_tv").findOne(1000);
if(custno_tv != null)
 {
    custno_tv.setText("211300000389");
} 
else
    log("wait custno_tv not found\n");

var pass_tv = id("com.galaxy.stock:id/pass_tv").findOne(1000);
if(pass_tv != null)
    {
    pass_tv.setText("130109");
} 
else
    log("wait pass_tv not found\n");

var verifyimg = id("com.galaxy.stock:id/verifyImg").findOne(1000);
var verifycode = id("com.galaxy.stock:id/verifycode_tv").findOne(1000);
if(verifyimg != null)
 {   
    // verifyimg.click();
    
     sleep(1000);
     verifycode.click();
}
else
    log("wait verifyimg not found\n");

//请求截图
if(!requestScreenCapture(false)){
    toast("请求截图失败");
    exit();
}

//截图灰度处理\二值化处理
var img = captureScreen();
var imgdata = images.clip(img, 770, 738, 240, 144);
//var imgFilePath = "/storage/emulated/0/autojs/clip.png";
//images.save(imgdata, imgFilePath);
imgdata = images.grayscale(imgdata);

//images.save(imgdata, "/storage/emulated/0/autojs/clip1.png");

imgdata = images.threshold(imgdata, 100, 255, "BINARY");

//images.save(imgdata, "/storage/emulated/0/autojs/clip2.png");

//log("ocr: ");
var veryfyVal = Baidu_OCR(imgdata);

//log("ocr=" + veryfyVal);


if(verifycode != null)
 {   
   // verifycode.click();
    verifycode.setText(veryfyVal);
    click("完成");
    back();
    sleep(3000);
}
else
    log("wait verifycode not found\n");

    var okBtn = id("com.galaxy.stock:id/okBtn").findOne(1000);
    if(okBtn != null)okBtn.click();
