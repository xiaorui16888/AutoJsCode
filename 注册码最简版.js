'ui';
ui.layout(
    <frame background="#76EEC6">
	    <vertical align="top" paddingTop="5" margin="10">
            <text text="广告词"></text>
		    <input id="cradpassword" bg="#008B00" gravity="left" color="#000000" size="20" marginTop="15" h="100" hint="卡密激活之后无需二次激活，如过期请重新使用卡密激活！"></input>
		    <button id="启动" text="启动" margin="20 0 0 0"/>
            <text text="优雅底色，世界和谐！"></text>
            <button id="无障碍" text= "启动无障碍服务！"/>
	    </vertical>
    </frame>
)
ui.启动.click(()=>{   
    threads.start(    
        function(){
            auto.waitFor()
            toast('权限获取完成！继续运行')
            sleep(1000)
            console.show();
            console.log('主线程')
            cheak()
    });  
})
ui.无障碍.click(()=>{   
    threads.start(    
        function(){
            auto ()
    });  
})
function cheak(){
    toast('卡密校验开始，请稍等')
    cradpassword = ui.cradpassword.text()
    if(cradpassword != null && cradpassword.length ==32){
        //验证卡密长度
        toast('卡密写入本地！')
        sleep(1000)
        if(files.create(files.isDir(files.cwd()+'kami.txt'))){
            console.log('创建本地卡密校验文本！')
        }else{
            console.log('创建失败')
        }
        files.write(files.cwd()+'kami.txt',cradpassword)
        
        yy_login(cradpassword)
    }else if(files.isDir(files.cwd()+'kami.txt')){
        cradpassword = files.read(files.cwd()+'kami.txt')//尝试从本地文件读取卡密
        if(cradpassword.length != 32){
            toast('本地存储卡密校验失败')
            sleep(1000)
        }else{
            toast('本地卡密存在')
            yy_login(cradpassword)
        }
    }else{
        toast('本地卡密不存在，且未输入卡密！2s后结束运行！')
        sleep(2000)
        exit();
    }
}
function yy_login(password){
    var Ver = '1.0.1'
    var login_url = 'http://w.eydata.net/fb55712c60bbfc31172' //易游单码登录地址
    var herat = '' //心跳验证地址
    var code = null //状态码
    var data = null
    code=http.post(login_url,{
        'SingleCode' : password,
        'Ver' : Ver,
        'Mac' : device.getAndroidId() // 设备imei
    })
    if(code.body.string().length != 32){
        //console.log(code.body.string())
        console.log('卡密失效')
        toast('卡密失效！请联系管理员！');
        sleep(2000)
        exit();
        console.log('123')
        toast('123')
    }else{
        toast("验证完成！")
    };
    
}