/*
**脚本作用：关闭当前应用
**测试QQ:631206885
**代码编写:魚離ヤ吥開氺
**时间:2019.03.26
**代码建议者：依和乐
**测试系统:安卓8.1
**Auto.js版本: 4.1.1
**自适配目前主流安卓手机,如有其他请自行加入修改即可
使用方法：调用  关闭应用()  封装函数即可;
*/
//测试关闭QQ应用
launchApp("QQ");
sleep(1500);
关闭应用();

function 关闭应用() {
    let packageName = currentPackage();
    app.openAppSetting(packageName);
    text(app.getAppName(packageName)).waitFor();  
    let is_sure = textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne();
    if (is_sure.enabled()) {
        textMatches(/(.*强.*|.*停.*|.*结.*|.*行.*)/).findOne().click();
        textMatches(/(.*确.*|.*定.*)/).findOne().click();
        log(app.getAppName(packageName) + "应用已被关闭");
        sleep(1000);
        back();
    } else {
        log(app.getAppName(packageName) + "应用不能被正常关闭或不在后台运行");
        back();
    }
}