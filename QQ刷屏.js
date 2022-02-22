/*
无聊做了个QQ刷屏
请打开一个指定的群/联系人输入界面
否则毫无响应
*/
auto();


toast("请在本应用界面等待输入框出现否则会停止运行")
threads.start(function(){
    //在子线程中调用observeKey()从而使按键事件处理在子线程执行
    events.observeKey();
    events.on("key_down", function(keyCode, events){
        //音量键关闭脚本
        if(keyCode == keys.volume_up){
           console.hide()
            exit();
        }
    });
});
var name = rawInput("请输入想要刷屏的文字");
toast("音量上键关闭脚本，请在五秒内打开一个你想刷屏的指定的群/联系人输入界面");
events.on("exit", function(){
    toast("脚本已结束");
    })
launchApp("QQ")
sleep(4500)

var a = 0;
sleep(500)
setInterval(function () {
    a = a + 1;
   input(""+name)//要发送的文字
    sleep(95)
    click("发送")
    if(a == 666666){//1000=发送1000次
        exit();
    }
   
}, 0);//循环间隔
toast("如果你已错误返回qq主界面，请立即停止该脚本，否则可能刷屏其他重要群/联系人，虽然大部分都是毫无响应……")


    
    