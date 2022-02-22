/**
 * 多个脚本按照顺序执行
 * @param {Array} scriptNames 
 */
 var scriptsPath = "/sdcard/脚本/";
if(!files.exists(scriptsPath)){
    scriptsPath = "/sdcard/Scripts/";
}
var scriptFiles = "网络监视器悬浮窗.js";

var path = files.join(scriptsPath, scriptFiles);
engines.execScriptFile(path);
 
function Observer(scriptNames) {
  this.scriptNames = scriptNames || []
  this.currentScriptContent = null;
  this.addNotice = function (scriptName) {
    var scriptPath = files.join(files.getSdcardPath(), '脚本', scriptName + '.js')
    var scriptContent = files.read(scriptPath)
    var notice = ";(function () {  var args = engines.myEngine().execArgv;  var observer = args.observer;  events.on(\"exit\", function () {    log('exit event!');    observer.next();  });})();;"
    var tempScriptContent = scriptContent + notice
    this.currentScriptContent = tempScriptContent;
  }
  this.next = function () {
    if (scriptNames.length > 0) {
      var scriptName = this.scriptNames.shift()
      this.addNotice(scriptName)
      engines.execScript(scriptName, this.currentScriptContent, {
        arguments: {
          observer: this
        }
      })
    } else {
      return true
    }
  }
}

var scriptNames = ['自动上传视频UI', '切换IP','抖音养号脚本','自动上传视频主文件'];
(new Observer(scriptNames)).next();