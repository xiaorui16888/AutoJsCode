
语音文本=depth(9).className("android.widget.EditText").id("input").findOne().getText();
var 数组图=className("android.widget.ImageView").id("name").clickable(true).depth(9).find();
数组图[0].click();
depth(10).id("name").text("录音").findOne().click();
sleep(50);
depth(11).desc("开始录音").id("name").findOne().click();
sleep(3000);
depth(11).desc("停止录音").id("name").findOne().click();

//语音文本="哎呦！不错哦～"
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

sleep(500);
var path="/sdcard/ADM/腾讯/TTS_Test.mp3";

var myDate = new Date();
  var 年 = myDate.getFullYear(); //
  var 月 = myDate.getMonth() + 1; //
  if (月 < 10) {
    月 = "0" + 月
  }
  var 日 = myDate.getDate(); //
  if (日 < 10) {
    日 = "0" + 日
  };
  var 前路径 = "/sdcard/tencent/MobileQQ/";
  var qq = "2508385778";
  var 后路径 = "/ptt/" + 年 + 月 + "/" + 日 + "/";
  var 路径 = 前路径 + qq + 后路径;

  if (!files.exists(路径)) {
    exit();
  }
  var 文件数组 = files.listDir(路径, function(name) {
    return name.endsWith("");
  });
  var 文件名 = 文件数组[文件数组.length - 1];
  var slk路径 = files.join(路径, 文件名);
log(slk路径)
files.move(path, slk路径)
  device.vibrate(30)
















//
/* new-age@outlook.com */
/* 2018-2-24 */
/* 将近开学 */