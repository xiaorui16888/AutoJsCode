depth(6).drawingOrder(3).className("android.widget.RelativeLayout").id("name").findOne();

threads.start(function(){
depth(6).drawingOrder(3).className("android.widget.RelativeLayout").id("name").findOne();
sleep(900);
var a=depth(7).className("android.view.View").desc("录音按钮 按住录音").id("name").findOne();
x=a.bounds().centerX();
y=a.bounds().centerY();
//engines.execScriptFile("/sdcard/脚本/222实验室/抢红包/语音红包/long2.js");
press(x,y,5000);
});
depth(6).drawingOrder(3).className("android.widget.RelativeLayout").id("name").findOne();
var b=depth(7).className("android.widget.TextView").id("name").find();
语音文本=b[1].getText().replace(/“/g,"").replace(/”/g,"");
sleep(800)
importClass(java.util.Locale);
importClass(java.io.File);
importClass(android.speech.tts.TextToSpeech);
var ttsStatus=false;
var ttsListener=new TextToSpeech.OnInitListener(){
    onInit:function(status){
        if(status==TextToSpeech.SUCCESS){
        	var ttsSetLanguageResult=TTS.setLanguage(TTS.getDefaultVoice().getLocale()/*ttsLanguage*/);
            if(ttsSetLanguageResult!=TextToSpeech.LANG_MISSING_DATA&&ttsSetLanguageResult!=TextToSpeech.LANG_NOT_SUPPORTED){
                	ttsStatus=true;
                	ttsReady();
            }else{
                toast("TTS不支持当前语言");
            }
        }else{
            toast("初始化TTS失败");
        }
    }
}
var TTS=new TextToSpeech(context,ttsListener);


function speech(ttsText,fileName){
    if(TTS&&ttsStatus){
        if(ttsText.length<=TextToSpeech.getMaxSpeechInputLength()){
            if(fileName){
                var file=new File(fileName);
                if(!file.exists()){
                    file.createNewFile();
                }
                TTS.synthesizeToFile(ttsText,null,file,Math.random());
            }else{
                TTS.speak(ttsText,TextToSpeech.QUEUE_FLUSH/*QUEUE_FLUSH插队，QUEUE_ADD排队*/,null);
            }
            return true;
        }else{
            toast("朗读文本过长");
            return false;
        }
    }else{
        toast("TTS未准备好");
        return false;
    }
}


function ttsReady(){
    TTS.stop();
    var text=语音文本;
    var file="/sdcard/ADM/腾讯/TTS_Test.mp3";
    speech(text);
    speech(text,file);
}


toast("okokok")















//
/* new-age@outlook.com */
/* 2018-2-24 */
/* 将近开学 */




//2
