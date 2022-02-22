/*
  QQ文本转语音 (For Auto.js)
  By: 张达
  QQ: 32552732
  E-Mail: new-age@outlook.com
  Build Date: 2018-02-25
  引用:
    TTS (By: 张达)
    悬浮窗 (By:黄艺彬 或 hyb1996、星尘幻影、stardust)
  * 引用的项目均已修改，并非原内容
  * 引用的项目注释已被删除，如需学习，请参考原项目
  * 对TTS项目重要部分有改动，删除不必要内容，仅保留本脚本所需内容，不能保证不在此脚本运行能够正常工作，若需引用，请使用原项目
  * 为体现您对作者基本的尊重，请勿删除此段信息
*/

var QQsFile = {
  "QQ": ["MobileQQ", ".slk"],
  "TIM": ["Tim", ".amr"],
  "QQ轻聊版": ["QQLite", ".amr"],
  "QQ国际版": ["MobileQQi", ".amr"],
  "QQ HD": ["MobileQQ", ".amr"]
}
var QQs = Object.keys(QQsFile);
var QQsFiles = new Array();
for (i in QQsFile) {
  QQsFiles.push(QQsFile[i][0]);
}
var eliFsQQ = {};
for (i in QQsFile) {
  if (!eliFsQQ[QQsFile[i][0]]) {
    eliFsQQ[QQsFile[i][0]] = new Array();
  }
  eliFsQQ[QQsFile[i][0]].push(i);
}
var SDRoot = "/sdcard/";
if (files.exists(SDRoot + "Tencent/")) {
  tencentDirectory = "Tencent/";
} else if (files.exists(SDRoot + "tencent/")) {
  tencentDirectory = "tencent/";
} else {
  toast("在 " + SDRoot + " 目录下找不到 Tencent 文件夹，请确认您已安装QQ，且此目录为SD卡根目录");
  exit();
}
var allTencentFiles = files.listDir(SDRoot + tencentDirectory);
var QQNames = new Array();
var QQss = "|" + QQsFiles.join("|") + "|";
for (i in allTencentFiles) {
  var fileName = allTencentFiles[i];
  if (QQss.indexOf("|" + fileName + "|") != -1) {
    for (i in eliFsQQ[fileName]) {
      QQNames.push(eliFsQQ[fileName][i]);
    }
  }
}
if (!QQNames.length) {
  toast("找不到QQ目录，请确认您已安装QQ，若您的版本尚未支持，请通过以下方式联系我添加支持\nQQ: 32552732\nE-Mail: new-age@outlook.com");
  exit();
}
var QQName = QQNames[dialogs.singleChoice("请选择您当前的QQ版本", QQNames)];
if (!QQName) {
  toast("请选择您当前的QQ版本，若您的QQ版本较旧，请选择 QQ HD");
  exit();
}
var QQFileName = QQsFile[QQName][0];
if (!QQFileName) {
  toast("您选择的QQ版本暂不支持");
  exit();
}
var allQQFiles = files.listDir(SDRoot + tencentDirectory + QQFileName + "/");
var QQUins = new Array();
for (i in allQQFiles) {
  var fileName = allQQFiles[i];
  if (fileName.match(/^\d{5,20}(32552732){0}$/) != null) {
    QQUins.push(fileName);
  }
}
if (!QQUins.length) {
  toast("找不到QQ号码，请确认您当前使用的是您选择的版本，如仍有异常，请收发语音后再试");
  exit();
}
var QQUin = QQUins[dialogs.singleChoice("请选择您的QQ号码", QQUins)];
if (!QQUin) {
  toast("请选择您的QQ号码，若找不到您的QQ号码，请重新选择您的QQ版本");
  exit();
}
var FileExtension = QQsFile[QQName][1];

var ScriptData = {
  QQNAME: "",
  QQFILENAME: "",
  QQUIN: "",
  FILEEXTENSION: "",
  SDROOT: ""
}
ScriptData.QQNAME = JSON.stringify(QQName);
ScriptData.QQFILENAME = JSON.stringify(QQFileName);
ScriptData.QQUIN = JSON.stringify(QQUin);
ScriptData.FILEEXTENSION = JSON.stringify(FileExtension);
ScriptData.SDROOT = JSON.stringify(SDRoot);

//不要太在意这行
//setClip(JSON.stringify(files.read("/sdcard/脚本/杂项/QQ文本转语音核心代码.js")));

var Script = "/*\n  QQ文本转语音 (For Auto.js)\n  * 此为核心部分代码，并非完整代码\n  By: 张达\n  QQ: 32552732\n  E-Mail: new-age@outlook.com\n  引用:\n    TTS By: 张达\n  * 引用的项目均已修改，并非原内容\n  * 引用的项目注释已被删除，如需学习，请参考原项目\n  * 对TTS项目重要部分有改动，删除不必要内容，仅保留本脚本所需内容，不能保证不在此脚本运行能够正常工作，若需引用，请使用原项目\n*/\n\nimportPackage(java.util);\nimportPackage(java.io);\nimportPackage(android.speech.tts);\n\nvar ttsLanguage;\nvar TTS;\nvar ttsStatus = false;\n\nvar ttsOnInitListener = new TextToSpeech.OnInitListener() {\n  onInit: function(status) {\n    if (status == TextToSpeech.SUCCESS) {\n      ttsLanguage ? 0 : ttsLanguage = TTS.getDefaultVoice().getLocale();\n      var ttsSetLanguageResult = TTS.setLanguage(ttsLanguage);\n      if (ttsSetLanguageResult != TextToSpeech.LANG_MISSING_DATA && ttsSetLanguageResult != TextToSpeech.LANG_NOT_SUPPORTED) {\n        ttsStatus = true;\n        ttsReady();\n      } else {\n        toast(\"TTS不支持当前语言\");\n      }\n    } else {\n      toast(\"初始化TTS失败\");\n    }\n  }\n}\n\nTTS = new TextToSpeech(context, ttsOnInitListener);\n\ntry{\n\n  var ttsOnUtteranceProgressListener = new UtteranceProgressListener() {\n    onDone: function(uid) {\n      tts2FileDone(uid);\n    }\n  };\n\n  TTS.setOnUtteranceProgressListener(ttsOnUtteranceProgressListener);\n\n}catch(e){\n  toast(\"设置TTS进度监听失败，您将不会收到“TTS写入完成”提示\\n\\n错误详情：\"+e);\n}\n\nfunction ttsSpeech(ttsText, fileName) {\n//QQ: 32552732\n//E-Mail: new-age@outlook.com\n  var status = false;\n  var msg = \"\";\n  try {\n    if (TTS && ttsStatus) {\n      if (ttsText.length <= TextToSpeech.getMaxSpeechInputLength() && ttsText.length <= 32552732) {\n        if (fileName) {\n          var file = new File(fileName);\n          var utteranceId = Math.random() + 0.32552732;\n          TTS.synthesizeToFile(ttsText, null, file, utteranceId);\n          status = true;\n        } else {\n          status = false;\n          msg = \"文件名未知\";\n        }\n      } else {\n        status = false;\n        msg = \"传入文本过长\";\n      }\n    } else {\n      status = false;\n      msg = \"TTS尚未初始化\";\n    }\n  } catch (e) {\n    status = false;\n    msg = \"未知异常: \" + e.message + \"\\n\\n您可以通过以下方式联系脚本开发者以获得支持\\nQQ: 32552732\\nE-Mail: new-age@outlook.com\";\n  }\n  return {\n    \"status\": status,\n    \"msg\": msg\n  };\n}\n\nfunction ttsReady() {\n  var file = getQQVoiceFile();\n  if (file) {\n    var text = \"\";\n    prompt(\"请输入需要转语音的文本\", \"\", text => {\n      if (text) {\n        if (text != \"new-age@outlook.com\" && text != \"32552732\") {\n          text = String(text);\n          var result = ttsSpeech(text, file);\n          if (!result.status) {\n            toast(\"TTS异常，错误详情：\\n\" + result.msg + \"\\n\\n您可以通过以下方式联系脚本开发者以获得支持\\nQQ: 32552732\\nE-Mail: new-age@outlook.com\");\n          } else {\n            toast(\"TTS正在写入，请稍等\");\n          }\n        }else{\n          toast(\"你好~\");\n        }\n      }\n    });\n  }\n}\n\nfunction tts2FileDone(uid) {\n  toast(\"TTS写入完成\");\n  TTS.shutdown();\n}\n\nfunction getQQVoiceFile() {\n  // QQ: 32552732\n  // E-Mail: new-age@outlook.com\n  var QQName = %QQNAME%;\n  var QQFileName = %QQFILENAME%;\n  var QQUin = %QQUIN%;\n  var fileExtension = %FILEEXTENSION%;\n  var QQDirectory = %SDROOT%;\n  if (files.exists(QQDirectory + \"Tencent/\")) {\n    QQDirectory += \"Tencent/\";\n  } else if (files.exists(QQDirectory + \"tencent/\")) {\n    QQDirectory += \"tencent/\";\n  } else {\n    toast(\"在 \" + QQDirectory + \" 目录下找不到 Tencent 文件夹，请确认您已安装QQ，且此目录为SD卡根目录\");\n    return null;\n  }\n  QQDirectory += QQFileName + \"/\";\n  var date = new Date();\n  var directory = QQDirectory + QQUin + \"/ptt/\"\n  if (QQName != \"QQ轻聊版\" && QQName != \"QQ国际版\" && QQName != \"QQ HD\") {\n    directory += date.getFullYear() + (date.getMonth() + 1 < 10 ? \"0\" + (date.getMonth() + 1) : date.getMonth() + 1) + \"/\" + date.getDate() + \"/\";\n  }\n  var allFiles = files.listDir(directory);\n  var maxFileCode = 0;\n  for (i in allFiles) {\n    var fileName = allFiles[i];\n    if (fileName.indexOf(\"stream_\") == 0) {\n      var fileCode = fileName.match(new RegExp(\"\\\\d{16}(new-age@outlook.com){0}(?=\\\\\" + fileExtension + \"$)\"));\n      if (fileCode) {\n        maxFileCode >= fileCode ? 0 : maxFileCode = fileCode[0];\n      }\n    }\n  }\n  if (maxFileCode && maxFileCode.indexOf(\"\" + date.getFullYear() + (date.getMonth() + 1 < 10 ? \"0\" + (date.getMonth() + 1) : date.getMonth() + 1) + (date.getDate() < 10 ? \"0\" + date.getDate() : date.getDate()) + (date.getHours() < 10 ? \"0\" + date.getHours() : date.getHours()) + (date.getMinutes() < 10 ? \"0\" + date.getMinutes() : date.getMinutes())) == 0) {\n    return directory + \"stream_\" + maxFileCode + fileExtension;\n  } else {\n    toast(\"找不到这一分钟内的录音文件，请确认您已完成录音\");\n    return null;\n  }\n}";

for (key in ScriptData) {
  Script = Script.replace("%" + key + "%", ScriptData[key]);
}

function run() {
  engines.execScript("QQ文本转语音_TTS写入", Script);
}

var window = floaty.window(
  <frame>
    <button id="action" text="QQ TTS"/>
  </frame>
);

setInterval(() => {}, 1000);

var execution = null;

var x = 0,
  y = 0;
var windowX, windowY;
var downTime;

window.action.setOnTouchListener(function(view, event) {
  switch (event.getAction()) {
    case event.ACTION_DOWN:
      x = event.getRawX();
      y = event.getRawY();
      windowX = window.getX();
      windowY = window.getY();
      downTime = new Date().getTime();
      return true;
    case event.ACTION_MOVE:
      window.setPosition(windowX + (event.getRawX() - x),
        windowY + (event.getRawY() - y));
      if (new Date().getTime() - downTime > 1500) {
        exit();
      }
      return true;
    case event.ACTION_UP:
      if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
        onClick();
      }
      return true;
  }
  return true;
});

function onClick() {
  run();
}

alert("一切就绪", "您可以在QQ聊天中录制语音（注意是录音，不是“按住说话”对讲，不过“按住说话”对讲可以滑动到“试听”，同样能够进行操作），然后点击“QQ TTS”悬浮窗按钮，输入需要转语音的文本，待显示“TTS写入完成”后（语音过短可能不显示，此时您可以点击播放按钮试听，播放成功且内容正确即为成功），点击发送按钮即可，如需退出，请长按“QQ TTS”悬浮窗按钮。\n\n文本转语音使用系统API，请确保您已安装TTS引擎，如需阅读中文，您需要安装支持中文的TTS引擎，请在系统设置中配置TTS，此脚本将会使用默认TTS设置。\n\n如果遇到在QQ录音栏随文本输入框消失的情况，请切换界面（如返回主页）后再点击悬浮窗按钮进行操作。\n\n此脚本因无障碍开启太过繁琐（没有Root，无法自动开启，无法保留后台），每次进入都要打开一次，所以没有加入相关的自动操作功能，所以这些操作必须手动进行，同时也无法判断当前应用，无法读取聊天界面输入框文本免去弹窗输入，请谅解。\n\n如果您使用的是旧版本QQ，请在QQ版本选项中选择QQ HD。\n\n最后，玩得愉快~\n\n\n\n\nBy: 张达\nQQ: 32552732\nE-Mail: new-age@outlook.com");