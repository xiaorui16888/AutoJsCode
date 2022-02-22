//*******************************************************************************************************************
/*for(i=1;i<=5;i++){
qqVoice(i+"")
    sleep(1000)
}*/
qqVoice("8848")
//调用方法：name为要发送语音的名称，QQ是你要用的QQ号，originpath是要发送语音的父文件夹的路径
function qqVoice(name, QQ, originPath) {
  if (QQ == undefined) {
    QQ = "3068758340"
  }
  if (originPath == undefined) {
    originPath = "/storage/emulated/0/QQ测试语音/"
  }
  var date1 = (new Date().getYear() + 1900) * 100 + new Date().getMonth() + 1
  var date2 = new Date().getDate()
  var path = "/storage/emulated/0/tencent/MobileQQ/" + QQ + "/ptt/" + date1 + "/" + date2 + "/"

  files.removeDir(path)
  sleep(200)
  files.ensureDir(path)
  bounds(0, 1809, 154, 1911).find().click()
  sleep(200)
  click("录音")
  sleep(200)
  bounds(379, 1356, 700, 1677).find().click()
  sleep(2000)
  bounds(379, 1356, 700, 1677).find().click()
  toast(path);
  sleep(800)
  var fileName = files.listDir(path);
  files.removeDir(path)
  files.ensureDir(path)
  files.copy(originPath + name, path + name)
  files.rename(path + name, fileName[0])
  sleep(200)
  id("listen_panel_send_tv").find().click()
    sleep(500)
}