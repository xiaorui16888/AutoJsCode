//UI界面不稳定，自己测试   上班没时间
importClass(java.io.File);
importClass(android.media.MediaRecorder);

var f = new File("/sdcard");
myRecAudioFile = File.createTempFile("你bjkkk好", ".amr", f);



mMediaRecorder01 = new MediaRecorder();
/* 设定录音来源为麦克风 */

mMediaRecorder01.setAudioSource(MediaRecorder.AudioSource.MIC);
mMediaRecorder01.setOutputFormat(MediaRecorder.OutputFormat.DEFAULT);
mMediaRecorder01.setAudioEncoder(MediaRecorder.AudioEncoder.DEFAULT);
mMediaRecorder01.setOutputFile(myRecAudioFile.getAbsolutePath());

mMediaRecorder01.prepare();
mMediaRecorder01.start();


sleep(5000);
mMediaRecorder01.stop();

mMediaRecorder01.release();
mMediaRecorder01 = null;