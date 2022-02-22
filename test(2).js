auto();
setScreenMetrics(480, 800);
// 点开微信群成员界面，启动脚本，自动加群里的人

// setScreenMetrics(480, 800);
// launchApp("微信");
var roomActivity = "com.tencent.mm.plugin.chatroom.ui.ChatroomInfoUI";
var contactActivity = "com.tencent.mm.plugin.profile.ui.ContactInfoUI";
var sendActivity = "com.tencent.mm.plugin.profile.ui.SayHiWithSnsPermissionUI"

var roomUsrX = 50;
var roomUsrY = 120;
for(var i=0;i<500;i++){
    if((i+1)%6==0){
        roomUsrX = 50;
        roomUsrY = 50+(i*75);
    }
    roomUsrX = 50+(i*75);
    if(currentActivity()==roomActivity){
        Tap(roomUsrX,roomUsrY); 
        while(currentActivity() != contactActivity){
            Tap(roomUsrX,roomUsrY);
            sleep(5000);
        }
        id("ap0").findOne().click();    // 点击：添加到通讯录
        sleep(2000);
        // txtid = "d4h"
        while(currentActivity() != sendActivity){
            id("ap0").findOne().click();
            sleep(4000);
        }
        Tap(451,50);                    // 点击：发送好友申请
        waitForActivity(contactActivity, period = 600);
        sleep(300);
        if(currentActivity() == contactActivity){
            id("hs").findOne().click();
        }
    }
}
 