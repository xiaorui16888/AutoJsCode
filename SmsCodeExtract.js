/*
   判断短信中是否含有验证码并提取
   20151019.1444
   by firefly
   
   @基本思路：
             1.是否私人号码？
             2.是否中文/英文验证短信？（不同的关键词）
             3.验证码匹配
   参考： https://github.com/drakeet/SmsCodeHelper/blob/master/app/src/main/java/me/drakeet/inmessage/utils/SmsUtils.java
*/

//定义关键词全局变量数组
var CPATCHAS_KEYWORD_CN = new Array("激活码","动态码","校验码","验证码","确认码","检验码","验证代码","激活代码","校验代码","动态代码","检验代码","确认代码","短信口令","动态密码","交易码","驗證碼","激活碼","動態碼","校驗碼","檢驗碼","驗證代碼","激活代碼","校驗代碼","確認代碼","動態代碼","檢驗代碼","上网密码","随机密码","短信密码");
var CPATCHAS_KEYWORD_EN = new Array("CODE","code");


// 判断字符串中时否包含中文
function isContainsChinese(str) {
    var regEx = new RegExp("[\u4e00-\u9fa5]");
    var flg = regEx.test(str);
    return (flg || (str.indexOf("【")>=0) || (str.indexOf("】")>=0) || (str.indexOf("。")>=0) );
}

// 判断是否是私人手机号码
function isPersonalMoblieNO(mobiles) {
    if(mobiles != null) {
        var regEx = new RegExp("^((13[0-9])|(15[^4,\\D])|(18[0,5-9]))\\d{8}$");
        var found = regEx.test(mobiles);
        return found;
    }
    return false;
}

//只有字母相似级别为0， 只有字母和数字可能级别为1, 只有数字可能级别为2.
function getLikelyLevel(str) {
    if(RegExp("^[0-9]*$").test(str)) {
        return 2;
    } else if(RegExp("^[a-zA-Z]*$").test(str)) {
        return 0;
    } else {
        return 1;
    }
}

// 根据验证码特征获取验证码字符串
function tryToGetCaptchas(str,isChinese) {
    var matches = new Array();
    if (isChinese){
        matches = str.match(/[a-zA-Z0-9\.]+/g);
    }
    else
    {
        matches = str.match(/[0-9\.]+/g);
    }
    var mostLikelyCaptchas = "";
    var currentLevel = -1; 
    for (var i=0;i<matches.length;i++){
        if(matches[i].length>3 && matches[i].length<8 && matches[i].indexOf(".")==-1){
            if(isNearToKeyWord(matches[i], str, isChinese)) {
                if(isChinese) {
                    if(currentLevel == -1) {
                        mostLikelyCaptchas = matches[i];
                    }
                    var level = getLikelyLevel(matches[i]);
                    if(level > currentLevel) {
                        mostLikelyCaptchas = matches[i];
                    }
                    currentLevel = level;
                } else {
                    return matches[i];
                }
            }
        }
    }
    return mostLikelyCaptchas;
}

//判断是否靠近关键词
function isNearToKeyWord(currentStr, content, isChinese) {
    var startPosition = 0;
    var endPosition = content.length - 1;
    var magicNumber = 14; //魔数 ^_^
    if (content.indexOf(currentStr) > magicNumber) {
        startPosition = content.indexOf(currentStr) - magicNumber;
    }
    if (content.indexOf(currentStr)  + currentStr.length + magicNumber < content.length - 1) {
        endPosition = content.indexOf(currentStr) + currentStr.length + magicNumber;
    }
    var isNearToKeyWord = false;
    var keywords = new Array();
    if (isChinese){
        keywords = CPATCHAS_KEYWORD_CN;
    }
    else{
        keywords = CPATCHAS_KEYWORD_EN;
    }
    for (var i = 0; i < keywords.length; i++) {
        if (content.substring(startPosition, endPosition).indexOf(keywords[i])>=0) {
            isNearToKeyWord = true;
            break;
        }
    }
    return isNearToKeyWord;
}

// 根据关键词判断是否是验证短信
function isCaptchasMessage(content, isChinese) {
    var exp_arr = new Array();
    if (isChinese){
        exp_arr = CPATCHAS_KEYWORD_CN;
    }
    else{
        exp_arr = CPATCHAS_KEYWORD_EN;
    }
    for(var i=0; i<exp_arr.length; i++){
        var regEx = new RegExp(exp_arr[i]);
        var isCaptchasMessage = regEx.test(content);
        if(isCaptchasMessage){
            return true;
        }
    }
    return false;
}

//分析发送者公司名称
function analyseCompanyName(sender, content, captchas) {
    var regarr = new Array(/【(.*?)】/g, /\[(.*?)]/g, /\((.*?)\)/g);
    var companyName ="";
    for (var i=0; i<regarr.length; i++){
        var matches = content.match(regarr[i]);
        if(matches!=null){
            for (var j=0;j<matches.length;j++){
                companyName = matches[j].substr(1,matches[j].length-2);
                if (companyName != "" && companyName.length < 10) {
                    if (companyName=="掌淘科技") {
                        var index = content.indexOf("的验证码");
                        companyName = content.substring(0, index);
                        companyName = companyName.replace("【掌淘科技】", "").trim();
                    } else {
                        if (content.indexOf("贝壳单词的验证码")>=0) {
                            companyName = "贝壳单词";
                        }
                    }
                    if (sender=="10010") {
                        companyName = "中国联通";
                    }
                    if (sender=="10086") {
                        companyName = "中国移动";
                    }
                    if (sender=="10000") {
                        companyName = "中国电信";
                    }
                    if(companyName==captchas){
                        companyName="";
                        continue;
                    }
                    if(companyName!=""){
                        return companyName;
                    }
                }
            }
        }
    }
    return "";
}

// 完整的验证码判断提取函数
function smsCodeExtract(sender, content) {
    if (! isPersonalMoblieNO(sender)) {
        captchas = "";
        var isCpatchasMessage = false;
        var isChinese = isContainsChinese(content);
        if (isCaptchasMessage(content,isChinese)) {
            captchas = tryToGetCaptchas(content, isChinese);
            if(captchas !=""){
                isCpatchasMessage = true;
            }
        }
    }
    return captchas;
}

//---for Tasker---
var code = smsCodeExtract(global('%SMS_number'),global('%SMS_body'));
var companyname = analyseCompanyName(global('%SMS_number'),global('%SMS_body'),code);
if(code!=""){
    setClip(code,false);
    if(companyname==""){
        companyname = global('%SMS_number');
    }
    flashLong("来自"+companyname+"的验证码：\n"+code+"\n已复制到剪贴板！");
}else {
    flashLong(global('%SMS_number')+"\n"+global('%SMS_body'));
}