importPackage(android.speech.tts);
importClass(java.util.Locale);

auto();

var tts = new TextToSpeech(context, function(status){
    if(status != tts.SUCCESS){
        toast("初始化TTS识别: " + status);
        exit();
    }
    var r = tts.setLanguage(Locale.CHINA);
    if(r < 0){
        toast("不支持该语言: " + r);
        exit();
    }
    toast("TTS初始化成功");
});
tts.setOnUtteranceProgressListener(new UtteranceProgressListener({
    onDone: function(id){
        //stopWXVoiceRecord();
        //voiceConverting = false;
    }
}));

function textToWXVoice(text){
    startWXVoiceRecord();
    sleep(1000);
    speak(text);
    voiceConverting = false;
}

var pressThread = threads.start(function(){
   setInterval(()=>{}, 1000);
});
function startWXVoiceRecord(){
    desc("切换到按住说话").find().click();
    var s = desc("按住说话").className("Button").findOne();
    pressThread.setTimeout(()=>{
       press(s.bounds().centerX(), s.bounds().centerY(), 60*1000);
    }, 0);
}

function stopWXVoiceRecord(){
    
}


function speak(text){
    tts.speak(text, tts.QUEUE_ADD, null);
}

events.on("exit", function(){
    if(tts){
        tts.shutdown();
        tts = null;
    }
});


//var storage = storages.create("stardust.tts");
//var WX = dialogs.rawInput("输入当前登陆WX号", storage.get("WX", "946994919"));
//storage.put("WX", WX);

var window = floaty.window(
    <frame>
        <linear>
            <button id="action" text="TTS" w="40" h="40" color="#ffffff" bg="#66000000" />
        </linear>
    </frame>
);

var voiceConverting = null;

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.action.setOnTouchListener(function (view, event) {
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
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 1500) {
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                onClick();
            }
            return true;
    }
    return true;
});

var thread = threads.currentThread();

function onClick() {
    log("onClick");
    if (currentPackage() == "com.tencent.mm") {
        thread.setTimeout(qqMessageToVoice, 0);
    } else {
        alert("请打开WX聊天窗口")
    }
}

function qqMessageToVoice(){
    if(voiceConverting){
       return;
    }
    voiceConverting = true;
    var input = className("EditText").findOne();
    log("开始转换: ", input.text());
    textToWXVoice(input.text());
    input.setText("");
}

setInterval(()=>{}, 1000);