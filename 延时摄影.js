"ui";
//获取要拍摄的张数
var count, waittime;
ui.layout(
    <vertical  padding="16">
        <horizontal>
            <text textSize="16sp" textColor="black" text="请输入要拍摄的照片"/>
            <input id="count" inputType="number"/>
        </horizontal>
        <horizontal>
            <text textSize="16sp" textColor="black" text="请输入延时时间"/>
            <input id="waittime" inputType="number"/>
        </horizontal>
        <button id="ok" text="确定"/>
    </vertical>
);
//指定确定按钮点击时要执行

ui.ok.click(function() {
    //通过getText()获取输入的内容
    count = Number(ui.count.getText());
    //通过getText()获取输入的内容
    waittime = Number(ui.waittime.getText());
    //console.show();
    app.launch("com.huawei.camera");
    var loop_time = 0;
    var set_id = setInterval(function() {

        id("shutter_button").findOne().click();
        loop_time++;
        
        if (loop_time +1>count) {
            clearInterval(set_id);
            exit();
        }
        
    }, waittime+3000);

});