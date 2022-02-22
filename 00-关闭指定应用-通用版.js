/*
 **个人收集的〖关于结束指定app的代码〗
 **个人轻微修改部分代码,已增强适用性
 **适用于大部分安卓机型,不代表全部
 **使用方法：killApp("应用名称")
 **测试人员:魚離ヤ吥開氺
 **测试系统:安卓8.1
 */
killApp("QQ");//结束QQ应用测试

function killApp(name) {   
    let forcedStopStr = ["停", "强", "结束"];  
    let packageName = app.getPackageName(name);
    if (packageName) {  
        app.openAppSetting(packageName); 
        text(name).waitFor();  
        for (var i = 0; i < forcedStopStr.length; i++) {    
            if (textContains(forcedStopStr[i]).exists()) {      
                let forcedStop = textContains(forcedStopStr[i]).findOne();      
                if (forcedStop.enabled()) {        
                    forcedStop.click();        
                    text("确定").findOne().click();        
                    toastLog(name + "已结束运行");        
                    sleep(800);
                    back();
                    break;      
                } else {       
                    toastLog(name + "不在后台运行！");        
                    back();
                    break;
                }    
            }  
        }
    } else {

        toastLog("应用不存在");
    }
}