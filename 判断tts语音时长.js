importPackage(android.speech.tts);
importClass(java.util.Locale);
importClass(java.io.File);

let text = new Array("在座的各位", "我们不一样", "是的，真的不一样~哈哈哈", "66");
let tts = new TextToSpeech(context, new TextToSpeech.OnInitListener() {
    onInit: function() {
    }
});
function GetTTSDuration(TTS_Text) {
    let p = new File("/sdcard/tts/TTS_Temp.mp3");
    files.ensureDir("/sdcard/tts/");
    sleep(100);
    tts.synthesizeToFile(TTS_Text, null, p, Math.random());
    sleep(100);
    media.playMusic(p);
    media.pauseMusic();
    let MusicDuration = media.getMusicDuration();
    media.stopMusic();
    //sleep(100);
    //files.remove(p);
    return MusicDuration;
}
for(let i=0; i<text.length; i++){
    log("“"+text[i]+"”这句话tts播放时间为:\n"+GetTTSDuration(text[i])+"毫秒\n");
    sleep(100);
}