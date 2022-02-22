/**
 * @author 家
 * @qq 203118908
 * @功能 悬浮窗显示文件下载进度
 */

var app下载地址 =
  'https://jnwork.oss-cn-beijing.aliyuncs.com/app/%E5%BE%AE%E5%8D%9A_9.7.2.1.apk';

let url = app下载地址; // update_list.url
var filePath = files.join(files.getSdcardPath(), 'myApp.apk');
log('url=' + url);
log('filePath=' + filePath);
download(url, filePath);

function download(url, filePath) {
  importClass('java.io.FileOutputStream');
  importClass('java.io.IOException');
  importClass('java.io.InputStream');
  importClass('java.net.MalformedURLException');
  importClass('java.net.URL');
  importClass('java.net.URLConnection');
  importClass('java.util.ArrayList');

  var url = new URL(url);
  var conn = url.openConnection(); //URLConnection
  var inStream = conn.getInputStream(); //InputStream
  var fs = new FileOutputStream(filePath); //FileOutputStream
  var connLength = conn.getContentLength(); //int
  var buffer = util.java.array('byte', 1024); //byte[]
  var byteSum = 0; //总共读取的文件大小
  var byteRead; //每次读取的byte数
  log('要下载的文件大小=');
  log(connLength);
  var threadId = threads.start(function() {
    var w = floaty.rawWindow(
      <vertical gravity="center" w="{{device.width}}px" h="{{device.height}}px">
        <horizontal layout_gravity="center" gravity="center" bg="#ffcc00">
          <text textSize="39sp">下载进度</text>
          <text textSize="39sp" id="progressNum">
            0
          </text>
        </horizontal>
      </vertical>
    );
    while (1) {
      var 当前写入的文件大小 = byteSum;
      var progress = (当前写入的文件大小 / connLength) * 100;
      if (progress > 0.1) {
        var progress = parseInt(progress).toString() + '%';
        ui.run(function() {
          w.progressNum.setText(progress);
        });
        if (当前写入的文件大小 >= connLength) {
          break;
        }
      }
      sleep(1000);
    }
  });
  while ((byteRead = inStream.read(buffer)) != -1) {
    byteSum += byteRead;
    //当前时间
    currentTime = java.lang.System.currentTimeMillis();
    fs.write(buffer, 0, byteRead); //读取
  }
  threadId && threadId.isAlive() && threadId.interrupt();
  toastLog('下载完成');
}
