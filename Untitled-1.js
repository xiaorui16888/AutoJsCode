
"ui";
ui.layout(
    <horizontal>

   
    <vertical padding="16">
        <text textSize="16sp" textColor="black" text="请输入话术"/>
        <input id="name" text="加我微信"/>
        <text textSize="16sp" textColor="black" text="请输入播放秒数"/>
        <input id="miao" text="10"/>        
        <button id="ok" text="确定"/>

    </vertical>
    </horizontal>
);
//指定确定按钮点击时要执行的动作
ui.ok.click(function()
{
    threads.start(脚本)
});

function 脚本(){
    var name = ui.name.getText();
    var miao = ui.miao.getText();
    toast(miao + "----------------------!");
    toast(name + "-----------------------");
    launchApp("积目")
    sleep(5000)
    id("ivVoice").findOne().click()
    sleep(1000)
    id("ivVoiceRecordButton2").findOne()
    media.playMusic("/sdcard/1.mp3");
    var kj=id("ivVoiceRecordButton2").findOne().bounds();
    press(kj.centerX(), kj.centerY(),miao*1000);
    sleep(1000)
    media.stopMusic()
    sleep(2000)
    var ltk=text("Aa").findOne()
    while(true){
       if (ltk.setText(name)) {
        break
       }

    }
}
   

