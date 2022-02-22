/*
"ui";
ui.layout(
    <vertical>
        <button id="start" text="开始" />
    </vertical>
);

*/
importClass(android.media.projection.MediaProjection);
importClass(android.media.MediaRecorder);
//threads.start(function() {
   // requestScreenCapture();
    //setUpMediaRecorder();
    var height = 1080;
    var width = 1920;
    var dpi = 23;
    //creteVirturlDisplay();


    //function setUpMediaRecorder(){

    mRecordFilePath = "/sdcard/你卡减肥呢.mp4";
    // if (mMediaRecorder == null){
    //   log(mMediaRecorder);
    mMediaRecorder = new MediaRecorder();
    // }
    var mRecordHeight = 2180;
    var mRecordWidth = 1920;
    //设置音频来源
    mMediaRecorder.setAudioSource(MediaRecorder.AudioSource.MIC);
    //设置视频来源
    mMediaRecorder.setVideoSource(MediaRecorder.VideoSource.SURFACE);
    //输出的录屏文件格式
    mMediaRecorder.setOutputFormat(MediaRecorder.OutputFormat.MPEG_4);
    //录屏文件路径
    mMediaRecorder.setOutputFile(mRecordFilePath);
    //视频尺寸
    mMediaRecorder.setVideoSize(mRecordWidth, mRecordHeight);
    //音视频编码器
    mMediaRecorder.setVideoEncoder(MediaRecorder.VideoEncoder.H264);
    mMediaRecorder.setAudioEncoder(MediaRecorder.AudioEncoder.AMR_NB);
    //比特率
    mMediaRecorder.setVideoEncodingBitRate(5 * 1024 * 1024);
    //Number(mRecordWidth * mRecordHeight * 3.6));
    //视频帧率
    mMediaRecorder.setVideoFrameRate(30);

    try {
        mMediaRecorder.prepare();
    } catch (e) {
        log(e);
    }
    //}
    //var mediaProjection=new MediaProjection();
    //function creteVirturlDisplay(){
    //   virtualDisplay=mediaProjection.creteVirturlDisplay("mediaProjection",width,height,dpi,DisplayManager.VIRTUAL_DISPLAY_AUTO_MIRROR,mediaRecorder.getSurface(),null,null);

    //  }
//});
/*
ui.start.on("click", () => {
    if (ui.start.text() == "开始") {
        mMediaRecorder.start();
    } else {
        ui.start.setText("结束");
        mMediaRecorder.setOnErrorListener(null);
        mMediaRecorder.stop();
    }
});
*/
mMediaRecorder.start();

/*
setTimeout(function() {
    //try{
        mMediaRecorder.setOnErrorListener(null);
    mMediaRecorder.stop();
   // }catch(e){}
  //  mMediaRecorder.recent();;
}, 4 * 1000);

*/