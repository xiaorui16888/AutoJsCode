var Base_64,图片验证码
requestScreenCapture()
function 截验证码图片(){
    
    var 路径 = "/sdcard/js截图/1.png"
    
    var img = captureScreen();
    var aa = images.clip(img, 388, 387, 303, 110)
    images.saveImage(aa, 路径);
    sleep(500)
    toastLog("截图保存在:\n" + 路径);
    var img = images.read(路径);
    Base_64=images.toBase64(img,"png", 100)
}
function 若快获取图片验证码(){
    var url="http://api.ruokuai.com/create.xml"
    var headers = {
        'Accept': '*/*',
        'Accept-Language': 'zh-cn',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Host': 'api.ruokuai.com'
    }
    var data={
        "username":"用户名",
        "password":"密码",
        "typeid":"类型",
        "timeout":"60",
        "softid":"软件ID",
        "softkey":"软件KEY",
        "image":Base_64 //base64内容 注意:图片的base64编码不包含图片头 如(data:image/jpg;base64,)

    }

    var res=http.postJson(url,data,headers)
    
    res=res.body.string()
    log(res)
    图片验证码=res.substring(res.indexOf("<Result>")+8,res.indexOf("<Result>")+12)
    console.info(图片验证码)


}
截验证码图片()
若快获取图片验证码()

