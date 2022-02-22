log("原作者：媱枰鴲疄敀渃 我修改了下");
log("有问题联系 QQ:986883511");

var uiwidth=parseInt(0.95*device.width);

sleep(50);
var window=floaty.rawWindow(
    <vertical w="{{uiwidth}}px" alpha="0.7" bg="#404040">
              
        <input id="input" text="把绿色点放在录音按键上，再点发语音按钮"/>
        <horizontal w="*">
            <button id="clear" layout_weight="1" text="清空"/>  
            <button id="paste" layout_weight="1" text="粘贴"/>  
        </horizontal>
        <horizontal w="*">
            <button id="per" layout_weight="1" text="语音(0-05)=04"/>  
            <button id="spd" layout_weight="1" text="语速(0-15)=04"/>  
            <button id="pit" layout_weight="1" text="音调(0-15)=09"/>  
        </horizontal>
        <horizontal w="*" >
            <button id="butY" layout_weight="1" text="移动"/>  
            <button id="but" layout_weight="1" text="发语音"/>  
            <button id="end" layout_weight="1" text="结束"/>  
        </horizontal>
    </vertical>
);
sleep(250);
window.setPosition( parseInt((device.width-window.getWidth())/2),0 );

var pointWindow = floaty.rawWindow(
    <frame >
        <text  text="点" gravity="center" w="50px"h="50px" textColor="#000000" bg="#00FF00"/>
    </frame>
);
sleep(50);
pointWindow.setPosition( parseInt(window.getX()+uiwidth/2,10)-25 , window.getY()+uiwidth-25 );
pointWindow.setTouchable(false);


setInterval(() => {

}, 1000);

window.butY.on("touch",(event)=>{
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            _a1=windowX + (event.getRawX() - x);
            _a2= windowY + (event.getRawY() - y);
            window.setPosition(_a1,_a2);
            pointWindow.setPosition( parseInt(_a1+uiwidth/2,10)-25 , _a2+uiwidth-25 );
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                //onClick();
                try {
                    qqq=window.butY.getWidth();
                    qqq1=window.butY.getX();
                    qqq2=window.butY.getY();
                    log(qqq);
                    log(qqq1);
                    log(qqq2);
                } catch (error) {
                    log(error);
                }
                
            }
            
            return true;
    }
    sleep(10);
    return true;
})


auto();



window.clear.click(function() {
    ui.run(() => {
        window.input.setText("");
    });
});
window.paste.click(function() {
    ui.run(() => {
        window.input.setText(getClip());
    });
});
window.end.click(function() {
    exit();
});
window.per.click(function() {
    temp=parseInt(String(window.per.getText()).substr(-2),10);
    if(temp==5){
        temp=0;
    }else{
        temp++;
    }
    ui.run(() => {
        window.per.setText("语音(0-05)=0"+temp);
    });
});
window.spd.click(function() {
    temp=parseInt(String(window.spd.getText()).substr(-2),10);
    if(temp==15){
        temp=0;
    }else{
        temp++;
    }
    if(temp<10){
        temp="0"+temp;
    }
    ui.run(() => {
        window.spd.setText("语速(0-15)="+temp);
    });
});
window.pit.click(function() {
    temp=parseInt(String(window.pit.getText()).substr(-2),10);
    if(temp==15){
        temp=0;
    }else{
        temp++;
    }
    if(temp<10){
        temp="0"+temp;
    }
    ui.run(() => {
        window.pit.setText("音调(0-15)="+temp);
    });
});

var path = "/sdcard/脚本/asd.mp3";
var 转换线程;kg = false;

window.but.click(function() {
    //threads.start(function() {
        文字转语音();
        //sleep(10);
        转换线程.join(2000);
        转换线程.interrupt();
        window.disableFocus();
        if (kg) {
            threads.start(function(){
                _dian1=pointWindow.getX()+25;
                _dian2=pointWindow.getY()+25;
                press(_dian1,_dian2,media.getMusicDuration()+1000);
            });
            sleep(500);
            media.playMusic(path);
        } else {
            toast("不行");
        };
    //});
});


function 文字转语音() {
    try {
        window.disableFocus();
    if(转换线程&&转换线程.isAlive()){toast("正在转换");return;};
    转换线程=threads.start(function() {
        var text = String(window.input.getText());//str.substr(-5)
        var per = String(window.per.getText());
        var spd = String(window.spd.getText());
        var pit = String(window.pit.getText());
        per = parseInt(per.substr(-2),10);
        spd = parseInt(spd.substr(-2),10);
        pit = parseInt(pit.substr(-2),10);
        per = (0 <= per && per <= 5) ? per : (0 <= per ? 5 : 0);
        spd = (0 <= spd && spd <= 15) ? spd : (0 <= spd ? 15 : 0);
        pit = (0 <= pit && pit <= 15) ? pit : (0 <= pit ? 15 : 0);
        if (!text) {
            toast("不行");
        //转换线程=null;
            return;
        };
        var API_KEY = "t3V9LBZ8R6dFP6x1FubDe3EY";
        var SECRET_KEY = "nmyiWd8KuHG1y6OncV0kCUOyU8vpra5e";
        try {
            var h = http.get("https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + API_KEY + "&client_secret=" + SECRET_KEY);
        } catch (e) {
            toastLog("未联网");
        //转换线程=null;
        log(e);
            return;
        };

        TOKEN = h.body.json().access_token;

        log(TOKEN);
        try {
            h = http.get("http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcd&tok=" + TOKEN + "&tex=" + text + "&vol=15&per=" + per + "&spd=" + spd + "&pit=" + pit + "")

            var file = h.body.bytes();
            //log(file);
            files.writeBytes(path, file);
            kg = true;
            media.playMusic(path);
            media.stopMusic();
            toast("OK");
        } catch (e) {
            toastLog(e);
        };
        //转换线程=null;
    });
    } catch (e) {
        log(e);
    }
}

//申请地址 http://ai.baidu.com/tech/speech/tts
//apikey=t3V9LBZ8R6dFP6x1FubDe3EY
//key=nmyiWd8KuHG1y6OncV0kCUOyU8vpra5e
//识别http://vop.baidu.com/server_api
//合成http://tsn.baidu.com/text2audio