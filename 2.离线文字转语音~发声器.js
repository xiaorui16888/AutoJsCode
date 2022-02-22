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
        //stopQQVoiceRecord();
        //voiceConverting = false;
    }
}));

function 文本记录(text){
    开始录音();
    sleep(1000);
    说(text);
    voiceConverting = false;
}

function 开始录音(){
     toast("请开始录音!");
     sleep(2000);
}

function 说(text){
    tts.speak(text, tts.QUEUE_ADD, null);
}

events.on("exit", function(){
    if(tts){
        tts.shutdown();
        tts = null;
    }
});



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
                点击();
            }
            return true;
    }
    return true;
});





var thread = threads.currentThread();

function 点击() {
    log("点击");
    thread.setTimeout(qqMessageToVoice, 0);
}

function qqMessageToVoice(){
    if(voiceConverting){
       return;
    }
    voiceConverting = true;
    var input = rawInput("请输入一段话");//id("input").className("EditText").findOne();
    log("开始转换: ", input);
    文本记录(input);
    //input.setText("");
}

setInterval(()=>{}, 1000);








