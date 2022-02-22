//*******************************************************************************************************************
/*for(i=1;i<=5;i++){
qqVoice(i+"")
    sleep(1000)
}*/
qqVoice("wyqz")
//调用方法：name为要发送语音的名称，QQ是你要用的QQ号，originpath是要发送语音的父文件夹的路径
function qqVoice(name, QQ, originPath) {
  if (QQ == undefined) {
    QQ = "3068758340"
  }
  if (originPath == undefined) {
    originPath = "/sdcard/QQ测试语音/"
  }
  var date1 = (new Date().getYear() + 1900) * 100 + new Date().getMonth() + 1
  var date2 = new Date().getDate()
  var path = "/sdcard/tencent/MobileQQ/" + QQ + "/ptt/" + date1 + "/" + date2 + "/"
  sleep(200)
  if(desc("开始录音").find().empty()){
    accessibilityFocused(false).checked(false).className("android.widget.ImageView").clickable(true).column(-1).columnCount(0).column(-1).contextClickable(false).depth(9).dismissable(false).findOne().click();
  }
  sleep(200)
  click("录音")
  sleep(200)
  desc("开始录音").find().click()
  sleep(1650)
  desc("停止录音").find().click()
  toast(path);
  sleep(800)
  var fileName = max(files.listDir(path))
  files.remove(path+fileName)
  files.copy(originPath + name, path + name)
  files.rename(path + name, fileName)
  sleep(200)
  id("listen_panel_send_tv").find().click()
}

function max(array){
	
  var a = 0
  for(i=0;i<array.length;i++){
    re=/\d+/g
    name=array[i].match(re,"g")
    if(name>a){
      a = name
    }
  }
  return "stream_"+a+".slk";
}
