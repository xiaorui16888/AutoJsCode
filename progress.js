importClass(java.io.File);
importClass(java.io.IOException);
importClass(java.io.InputStream);
importClass(java.io.FileOutputStream);
importClass(java.security.MessageDigest);

/**
 * 下载器，可监听下载进度
 *
 * @param {*} url 下载链接
 * @param {*} path 保存地址
 * @param {*} listener 下载监听
 */
function DownloadUtil(url, path, listener) {
  const _path = path,
    _listener = listener,
    _client = new OkHttpClient(),
    _request = new Request.Builder()
      .url(url)
      .get()
      .build();

  let _sum = 0;
  _len = -1;
  (_file = new File(_path)),
    (_total_bytes = null),
    (_input_stream = null),
    (_file_output_stream = new FileOutputStream(_file)),
    (_buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 2048));

  return {
    download: function() {
      _client.newCall(_request).enqueue(
        new Callback({
          onFailure: function(call, err) {
            throw new Error(err);
          },
          onResponse: function(call, res) {
            try {
              _input_stream = res.body().byteStream();
              _total_bytes = res.body().contentLength();
              while ((_len = _input_stream.read(_buffer)) != -1) {
                _file_output_stream.write(_buffer, 0, _len);
                _listener.onDownloading(((_sum += _len) / _total_bytes) * 100);
              }
              _file_output_stream.flush();
              _listener.onDownloadSuccess(_file);
            } catch (err) {
              _listener.onDownloadFailed(err);
            } finally {
              try {
                if (_input_stream != null) _input_stream.close();
              } catch (err) {
                throw new Error(err);
              }
            }
          }
        })
      );
    }
  };
}
(function main() {
  var w = floaty.rawWindow(
    <vertical gravity="center" w="{{device.width}}px" h="{{device.height}}px">
      <horizontal layout_gravity="center" gravity="center" bg="#ffcc00">
        <text textSize="39sp">下载进度</text>
        <text textSize="39sp" id="progress">
          0
        </text>
      </horizontal>
    </vertical>
  );

  var app下载地址 =
    'https://vxbucket.oss-cn-beijing.aliyuncs.com/%E7%BB%88%E7%AB%AF_3.0.2-release.apk';

  let url = app下载地址; // update_list.url
  var filePath = files.join(files.getSdcardPath(), 'myApp.apk');
  let path = filePath; // /sdcard/xxx
  var interval = setInterval(() => {}, 1000);
  new DownloadUtil(url, path, {
    onDownloadSuccess: function(file) {
      toastLog('下载完成');
      w.close();
      log('interval:');
      log(interval);
      clearInterval(interval);
      log('interval:');
      log(interval);
    },
    onDownloading: function(progress) {
      var progress = progress.toString();
      var progress = progress.split('.');
      var head = progress[0];
      var tail = progress[1].substring(0, 2);
      progress = head + '.' + tail;
      ui.run(function() {
        w.progress.setText(progress);
      });
    },
    onDownloadFailed: function(err) {
      throw new Error(err);
    }
  }).download();
})();
