"ui";
ui.layout(
    <ScrollView>
        <vertical>
            <input id="name" h="50" hint="邀请链接"/>
            <webview id="web" h="530" margin="0 0"/>
            <button id="qd" text="输入号码"/>
            <button id="aa" text="重载网页"/>
            <input id="time"  hint="邀请多少次？" inputType="number" gravity="center"/>
            
            <button id="zd" text="自动化"/>
           
        </vertical>
    </ScrollView>
)

toastLog("使用之前请输入您的邀请链接地址");
var url = ui.name.getText();
var tt=ui.time.getText();
ui.web.loadUrl(url);

ui.zd.click(()=> {
    
    threads.start(function() {
        for(let i=tt;i>0;i--){
        text("重载网页").findOne().click();
        sleep(1000);
        text("输入号码").findOne().click();
        sleep(2000);
        var acd=desc("立即领取").findOne().bounds();
        click(acd.centerX()-20,acd.centerY()+3);
        sleep(4000);
        
    }});
    
  });




ui.qd.click(() => {
    threads.start(function() {
        
        let a = getMoble();
        desc("输入手机号，领红包").findOne().click();
        sleep(200);
        desc("输入手机号，领红包").setText(a);
        //sleep(2000);
       
        
        
        
    });
});
ui.aa.click(() => {
    ui.run(function() {
        ui.web.loadUrl(url);
    });
});

function getMoble() {
    var prefixArray = new Array("139", "138", "137", "136", "135", "134", "159", "158", "157", "150", "151", "152", "188", "187", "182", "183", "184", "178", "130", "131", "132", "156", "155", "186", "185", "176", "133", "153", "189", "180", "181", "177"); //这是目前找到的除了数据卡外的手机卡前三位，类型是字符串数组
    var i = parseInt(10 * Math.random());
    var prefix = prefixArray[i];
    for (var j = 0; j < 8; j++) {
        prefix = prefix + Math.floor(Math.random() * 10);
    }
    return prefix;
}