//*******************************************************************************************************************
//在QQ聊天界面点击语音按钮后调用QQVoice命令
//将会自动切换到录音并自动操作
//原作者QQ:3068758340
//经过略微改进
//支持aac音频文件   mp3好像不能
//配合fooview工具剪辑音频可得到aac文件
//发送失败可能是音频太长或者合适不支持
qqVoice("/storage/emulated/0/1.aac", 528235171)
//调用方法：Fpath为要发送的音频文件完整路径，QQ是你要用的QQ号
function qqVoice(Fpath, QQ) {
  if (QQ == undefined) {
    QQ = "3068758340"
  }
  var date1 = (new Date().getYear() + 1900) * 100 + new Date().getMonth() + 1
  var date2 = new Date().getDate()
  var path = "/storage/emulated/0/tencent/MobileQQ/" + QQ + "/ptt/" + date1 + "/" + date2 + "/";
  files.removeDir(path);
  files.ensureDir(path);
  sleep(200)
  click("录音")
  sleep(200)
  //bounds(379, 1356, 700, 1677).find().click()
  desc("开始录音").click();
  sleep(2000) //录音时长，可随意指定，不建议太短
  //bounds(379, 1356, 700, 1677).find().click()
  desc("停止录音").click()
  toastLog(path);
  sleep(500)
  var fileName = files.listDir(path);
  files.removeDir(path) //删除生成录音文件
  files.ensureDir(path) //确保目录存在
  files.copy(Fpath, path + "1.aac") //复制要发送的音频文件
  files.rename(path + "1.aac", fileName[0]) //更名，让QQ发送替换后的音频文件
  sleep(200)
  click("发送")
}