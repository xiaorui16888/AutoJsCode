//导入运行需要的包
importClass(android.content.Intent);
importClass(android.net.Uri);

//申请运行需要的权限
toast("请给予全部运行需要的全新");
auto.waitFor();

//创建运行情况相关变量，及获取初始值
var title = "邮件标题"; //设置邮件的标题
var article = "邮件正文"; //设置邮件正文
var listPath = "/sdcard/脚本/list.txt" //设置邮件文本路径
var sleepTime = 600; //全局基本延时
var password = "wyyxdsmm12345";//所有新建邮箱的密码
var singleNumber = 2//每个邮箱发送的邮件数

//运行内容正文
for(;;){
    logOut();
    registerMail();
    logInFromQQmail();
    sendMails();
}

//一级函数

/**
*退出账号
*
*无传入传出
*/
function logOut() {
    //退出QQ邮箱
    launchApp("QQ邮箱");
    id("f").findOne().click();
    id("u1").text("设置").findOne().parent().click();
    depth(9).textContains("@").findOne().parent().parent().click();
    className("android.widget.Button").text("删除帐户").findOne().click();
    className("android.widget.Button").text("确定删除").findOne().click();
    //退出网易邮箱
    launchApp("网易邮箱大师");
    id("tab_settings").findOne().click();
    id("mine_account_item").findOne().click();
    id("account_email").findOne().parent().click();
    id("layout_delete_account").findOne().click();
    id("alert_dialog_btnOK").findOne().click();
}

/**
*注册账号
*
*返回值：账号<String>
*/
function registerMail() {
    launchApp("火云");
    setClip("占位内容");
    id("dh2").findOne().click();
    id("dh2_project_search").findOne().setText("网易邮箱大师");
    id("dh2_project_search_button").findOne().click();
    id("dh2_project_search_list").findOne().child(0).click();
    while (true) {
        id("dh2_get_number_button").findOne().click();
        while (getClip() == "占位内容");
        launchApp("网易邮箱大师");
        id("button_register").findOne().click();
        className("android.widget.TextView").text("请输入你的手机号").findOne();
        id("editor_email").findOne().setText(getClip());
        id("next_button").findOne().click();
        try {
            id("alert_dialog_btnOK").findOne(sleepTime * 8).click();
            id("alert_dialog_btnOK").text("确定").findOne().click();
        } catch (e) {}
        id("register_button_next").findOne();
        if (textStartsWith("获取验证码(").findOne(sleepTime * 8) != null) {
            break;
        }
        back()
        id("back_text_btn").findOne().click();
        id("alert_dialog_btnOK").findOne().click();
        launchApp("火云");
    }
    ///id("tv_resend_msg_verify_code").findOne().click();
    id("first_password").findOne().setText(password);
    id("second_password").findOne().setText(password);
    launchApp("火云");
    var verificationCode="";
    while(verificationCode.length<3){
        verificationCode=id("dh2_Verification_code").findOne().text();
    }
    launchApp("网易邮箱大师");
    id("et_verify_code").findOne().setText(verificationCode);
    id("next_step").findOne().click();
    id("enter_mail").findOne().click();
}

/**
*从QQ邮箱登录
*
*无传入传出值
*/
function logInFromQQmail(){
    launchApp("QQ邮箱");
    className("android.widget.TextView").text("163邮箱").findOne().parent().click();
    id("s5").findOne().setText(getClip()+"@163.com");
    id("jj").findOne().setText(password);
    id("d").findOne().click();
    while(!click("完成"));
}


/**
*发送邮件
*
*无传入传出值
*/
function sendMails() {
    for (var i = 0; i < singleNumber; i++) {
        send(title,article);
        sleep(sleepTime);
        id("d").findOne().click();
        sleep(sleepTime);
    }
}

//二极andMore函数

/**
*发送单封邮件
*
*传入值：
*/
function send(title,article){
    uri = Uri.parse("mailto:" + getFirstLine());
    intent = new Intent(Intent.ACTION_SENDTO, uri);
    intent.putExtra(Intent.EXTRA_SUBJECT, title);
    intent.putExtra(Intent.EXTRA_TEXT, article);
    context.startActivity(intent);
}

//常用功能

/**
*获取并删除第一行内容
*
*返回值：第一行内容<String>
*/
function getFirstLine(){
    var addressList=open(listPath,"r").readlines();
    var writeMan=open(listPath,"w");
    for(var i=1;i<addressList.length;i++){
        writeMan.writeline(addressList[i]);
    }
    writeMan.flush();
    writeMan.close();
    if(addressList[0]==undefined){
        exit();
    }
    return addressList[0];
}

