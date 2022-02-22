

var config = require('./bmobConfig.js')
log(config)

var filePath = files.join(files.getSdcardPath(), 'test.js')
var fileContent = files.read(filePath)
log(fileContent)

var filename=files.getName(filePath)
var url = "https://api2.bmob.cn/2/files/"+filename
var appId=config.appId
var restKey=config.restKey

bmob上传文件(url, filePath, appId, restKey)


function bmob上传文件(url, path, appId, restKey) {
  // 注意:url尾部必须带后缀名,后缀名随意
  // 使用例子
  // var url = "https://api2.bmob.cn/2/files/pinyin4j.jar"
  // // var path = "/storage/emulated/0/pinyin4j.jar"
  // var path = files.join(files.getSdcardPath(), "/pinyin4j.jar")
  // log('path=', path)
  // log(files.exists(path))
  // // exit()
  // bomb上传文件Stream(url, path)
  var config = {
    appId: appId,
    restKey: restKey
  }
  importClass("java.io.IOException")
  importClass("java.util.HashMap")
  importClass(java.io.FileInputStream);
  importClass(java.util.zip.GZIPInputStream);
  importClass("java.util.ArrayList")
  importClass("java.io.DataInputStream");
  importClass("java.io.DataOutputStream");
  importClass("java.io.OutputStreamWriter");
  importClass("java.io.BufferedWriter");
  importClass('java.io.BufferedReader');
  importClass('java.io.IOException');
  importClass('java.io.InputStream');
  importClass('java.io.InputStreamReader');
  importClass('java.io.OutputStream');
  importClass('java.io.BufferedOutputStream');
  importClass('java.io.ByteArrayInputStream');
  importClass('java.io.BufferedInputStream');
  importClass('java.io.ByteArrayOutputStream');
  importClass('java.io.PrintWriter');
  importClass('java.io.FileOutputStream');
  importClass('java.lang.StringBuffer');
  importClass('java.io.File');
  importClass('java.net.Socket');
  importClass('java.net.UnknownHostException');
  importClass("java.util.zip.CRC32")
  importClass("java.util.zip.CheckedOutputStream")
  importClass("java.util.zip.ZipEntry")
  importClass("java.util.zip.ZipOutputStream")
  importClass("java.util.zip.ZipFile")
  importClass("java.util.zip.InflaterInputStream")
  importClass("java.util.zip.Inflater")
  importClass("java.net.HttpURLConnection");
  importClass("java.net.URL");
  //创建URL对象,xxx是服务器API
  var url = new URL(url);
  //调用URL对象的openConnection( )来获取HttpURLConnection对象实例
  var conn = url.openConnection();
  //请求方法为GET
  conn.setRequestMethod("POST");
  //设置连接超时为5秒
  conn.setConnectTimeout(5000);
  //允许输入输出
  conn.setDoInput(true);
  conn.setDoOutput(true);
  //不能缓存
  conn.setUseCaches(false);
  //至少要设置的两个请求头
  conn.setRequestProperty("Content-Type", "application/octet-stream");
  conn.setRequestProperty("X-Bmob-Application-Id", config.appId);
  conn.setRequestProperty("X-Bmob-REST-API-Key", config.restKey);
  //输出流包含要发送的数据,要注意数据格式编码
  var op = conn.getOutputStream();
  op.write(文件流(path));
  // op.write(new String("name=zhylioooo").getBytes());
  //服务器返回东西了，先对响应码判断
  //用getInputStream()方法获得服务器返回的输入流
  var info = conn.getInputStream();
  var html = getStreamString(info); //流转换为二进制数组，read()是转换方法
  //  html = new String(data, "UTF-8");
  log(html);
  info.close();
  if (conn.getResponseCode() == 200) {
    return html
  } else {
    return false
  }

  function 文件流(path) {
    // importClass('java.io.FileInputStream');
    var fileForInput = new FileInputStream(path)
    var length = fileForInput.available()
    var bytes = util.java.array('byte', length)
    fileForInput.read(bytes);
    fileForInput.close();
    return bytes
  }

  function getStreamString(tInputStream) {
    if (tInputStream != null) {
      var tBufferedReader = new BufferedReader(new InputStreamReader(tInputStream));
      var tStringBuffer = new StringBuffer();
      var sTempOneLine = new String("");
      while ((sTempOneLine = tBufferedReader.readLine()) != null) {
        tStringBuffer.append(sTempOneLine);
      }
      return tStringBuffer.toString();
    }
    return null;
  }
}

