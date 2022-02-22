/*使用方法如下
在聊天界面点击语音红包
将媒体声音开至最大
运行此脚本
手动点击语音按钮
等待语音播放完毕松开按钮
*/
depth(6).drawingOrder(3).className("android.widget.RelativeLayout").id("name").findOne();
var b=depth(7).className("android.widget.TextView").id("name").find();
语音文本=b[1].getText().replace(/“/g,"").replace(/”/g,"");
sleep(900)
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