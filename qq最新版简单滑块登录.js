// qq验证码极为简单，
// 可用循环 过验证码 
// 省钱省力 经测试 比联众打码网页返码都快
// 作者qq：2438343940
//        2769735417
//        大佬看看就好O(∩_∩)O哈哈~

var 账号错误计数 = 0
var 卡在主界面计数 = 0
滑块验证码()

function 滑块验证码() {
    for (var i = 1; i < 99; i++) {
        //登录账号//登录账号//登录账号
        

        launchApp("QQ");

        if (text("允许").findOne(5000)) {
            text("允许").findOne(5000).click()
            sleep(500)
            text("允许").findOne(5000).click()
        }
        className("android.widget.Button").text("登录").waitFor();

        if (className("android.widget.Button").text("登录").findOne(5000)) {
            className("android.widget.Button").text("登录").findOne(5000).click()
            log("开始分割账号")
            toast("开始分割账号")
        }
        file = open("/sdcard/脚本/腾讯账号.txt", "r")
        //读取一行并打印
        var 内容 = file.readline();
        log(内容)
        toast(内容)
        file.close();
        var 登陆分割后的数据 = 内容.split("----");
        log(登陆分割后的数据);
        var 账号 = 登陆分割后的数据[0];
        log(账号);
        var 密码 = 登陆分割后的数据[1];
        log(密码)
        setText([0], 账号)//把“你好”输入到下标为1的输入框里
        setText([1], 密码)//把“你好”输入到下标为1的输入框里
        className("android.widget.ImageView").desc("登 录").findOne(5000).click()
        
        toastLog(read_delete());//删除账号

        for (var ii = 1; ii < 99; ii++) {
            //判断账号状况
            for (var iii = 1; iii < 99; iii++) {
                //滑块
                //如果觉得效率低可以选择打码平台，或者自己去买本地滑块库
                
                if (className("android.view.View").text("拖动下方滑块完成拼图").findOne(5000)) {
                    swipe(232, 1040, 817, 1038, 1500)//滑块点自己取
                    sleep(2500)
                    if (className("android.view.View").text("拖动下方滑块完成拼图").findOne(3000)) {
                        click(995, 1157)//滑块不成功刷新滑块/不同分辨率自己取
                        sleep(1000)

                    }
                } else {
                    toast("滑动完成")
                    log("滑动完成")
                    
                    break;
                }
            }
            if (className("android.widget.TextView").text("消息").findOne(2000)){
              log("登录成功")
              toast("登录成功")
              break;
            }else if(className("android.widget.TextView").text("绑定手机号码").findOne(2000)) {
                log("登录成功")
                toast("登录成功")   
                break;
            }

            //判断是否登录成功
            if (className("android.widget.TextView").text("登录失败").findOne(5000)) {
                账号错误计数++

                log("密码错误，重新登录")
                toast("密码错误，重新登录")
                click("确定")
                sleep(500)
                log("登录失败" + 账号错误计数 + "次")
                toast("登录失败" + 账号错误计数 + "次")

                sleep(2000)

                if (账号错误计数 >= 3) {
                    log("重复登录没有成功，换号")
                    toast("重复登录没有成功，换号")
                    toastLog(read_delete());
                    账号错误计数 = 0;
                    break;
                }
                className("android.widget.ImageView").desc("登 录").findOne(5000).click()

            } else if (text("去安全中心").findOne(3000)) {
                log("冻结，重新登录")
                toast("冻结，重新登录")
                text("取消").findOne(5000).click()
                toastLog(read_delete())
                break;
            } else if (className("android.widget.Button").text("用户注册").findOne()) {
                卡在主界面计数++
                log("卡在主界面重新登录")
                toast("卡在主界面重新登录")
                if (卡在主界面计数 >= 3) {
                    log("重复登录没有成功，换号")
                    toast("重复登录没有成功，换号")
                    toastLog(read_delete());
                    卡在主界面计数 = 0;
                    break;
                }
             
                className("android.widget.ImageView").desc("登 录").findOne(5000).click()
                sleep(5000)
            

            }
        }
        //登录成功
        if(className("android.widget.TextView").text("绑定手机号码").findOne(2000)) {
            log("登录成功")
            toast("登录成功")   
            break;

        }else if(className("android.widget.TextView").text("消息").findOne(2000)){
            log("登录成功")
            toast("登录成功")   
            break;

        }
        

    }
}

function read_delete() {
    //删除第一行
    var path = "/sdcard/脚本/腾讯账号.txt";//txt文本路径
    var reg = /^\s+|s+$/g; //匹配无效空白行
    var txt = files.read(path).replace(reg, "").split("\n");
    let ret_text = txt[0];
    log(ret_text.length);
    if (txt != "") {
        txt.splice(0, 1);
        files.write(path, txt.join("\n"));
        if (ret_text.length > 0) {
            return ret_text.trim();

        }
    } else {
        return "没有号了"
    }

    file.close();
}


