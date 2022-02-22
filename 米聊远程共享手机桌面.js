// 用米聊远程共享手机桌面
// 请将对方设为星标好友⭐
var username = "Mi4";

launchPackage("com.xiaomi.channel");
clickCenter(textMatches("允许"), 1000);
textMatches("消息|联系人|广播|更多").waitFor();
clickCenter(idContains("close").findOne(1000));
clickCenter(text("联系人"));
clickCenter(textMatches(username).visibleToUser());
sleep(2000); 
clickCenter(textContains("视频"));
sleep(2000);
clickCenter(textContains("视频"));
idContains("screen_share_btn").waitFor();
clickCenter(visibleToUser().textContains("共享"));
sleep(1000);
e=textContains("共享").findOne(10000);
toastLog(e);
clickCenter(textContains("共享"));
sleep(2000);
clickCenter(textMatches("继续").findOne(5000));
sleep(2000);
clickCenter(textMatches("立即开始").findOne(5000));
toastLog("sharing");



function clickCenter(UiSelectorOrUiObject, timeout) {
    timeout = timeout || 2000; //2000ms
    if (!UiSelectorOrUiObject)
        return false;
    try {
        if (UiSelectorOrUiObject.toString().indexOf("UiObject") >= 0)
            wid = UiSelectorOrUiObject;
        else wid = UiSelectorOrUiObject.findOne(timeout);
        // m.click(); // not work
        if (wid) {
            
            let x = Math.max(0, Math.min(device.width, wid.bounds().centerX()));
            let y = Math.max(0, Math.min(device.height, wid.bounds().centerY()));
            //toastLog(wid, x,y);
            let p = press(x, y, 50);
            sleep(50);
            return p;
        }
    } catch (ex) {
        toastLog("Error: clickCenter()");
        console.error(ex);
        return false;
    }
}


