//作用是个变声器。//理论上可以制作汤姆猫的变声功能。但是算法我不会就没写。
//设定音频数据的采样率方式和字节位数。获得出缓冲区尺寸。
//通过缓冲区尺寸新建播放器和录音器。
//开启播放器和录音器。
//循环从录音器中拿取录音数据。放入播放器中播放。
//也可以对录音数据进行处理，然后再播放。达到变声的效果。(这部分没做)



importClass(android.media.MediaRecorder);
importClass(android.media.AudioRecord);
importClass(android.media.AudioManager);
importClass(android.media.AudioTrack);
importClass(android.media.AudioFormat);




var sampleRateInHz  =  44100; 
var channelConfig  =  AudioFormat.CHANNEL_OUT_STEREO; 
var audioFormat  =  AudioFormat.ENCODING_PCM_8BIT;

 
var bufferSizeInBytes  =  AudioTrack.getMinBufferSize(sampleRateInHz,  channelConfig,  audioFormat); 
var audioTrack  =  new AudioTrack(AudioManager.STREAM_MUSIC,  sampleRateInHz,  channelConfig,  audioFormat,  bufferSizeInBytes,  AudioTrack.MODE_STREAM);
audioTrack.play();

var bufferSizeInBytes_ = AudioRecord.getMinBufferSize(sampleRateInHz,  channelConfig,  audioFormat);
var audioRecord = new  AudioRecord(MediaRecorder.AudioSource.MIC, sampleRateInHz,  channelConfig,  audioFormat, bufferSizeInBytes_); 
try {
    audioRecord.startRecording();
} catch (e) {
    toastLog("无录音权限\n已停止");
    exit();
};
events.on("exit", function() {
    log("结束运行");
    audioTrack.stop();
    audioTrack.release();    
    audioRecord.stop();     
    audioRecord.release(); //释放资源  
});

var audioData = new Mbyte(bufferSizeInBytes_);

while (true) {

    var readSize = audioRecord.read(audioData, 0, audioData.length);             
    if  (AudioRecord.ERROR_INVALID_OPERATION != readSize) { 
        //在这里处理录音数据。audioData byte PCM音频数据。

        audioTrack.write(audioData,  0,  audioData.length);  //play raw audio bytes
    };

};


function Mbyte(length) {
    return util.java.array("byte", length);
};