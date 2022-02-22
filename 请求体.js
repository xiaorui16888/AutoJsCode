
var headers = {
  "User-Agent": "Apache-HttpClient/UNAVAILABLE (java 1.4)",
  "Accept-Encoding": "identity",
  "Content-Type": "application/x-www-form-urlencoded",
  "Host": "passport.kuman.com",
  "Connection": "Keep-Alive",
  "Content-Length": "312",
}
var body = 'app_id=km_app&platform=android&channel=android&channel_shop=android_common&version=1.9.99.1115&version_code=122&device_version=5.1.1&device_brand=OPPO _OPPO R11&device_id=a5852d1612299c32ab7ce6f1303f34ac&mac_addr=1C:B7:2C:AE:02:2C&uid=&token=&mobile=13581630884&sign=d2dfc1475e98026e908e1bcffa4dccdc&t=1552884783'
par2Json = function (string, overwrite) {
  var obj = {},
    pairs = string.split('&'),
    d = decodeURIComponent,
    name, value;
  pairs.map(
    (pair) => {
      pair = pair.split('=');
      name = d(pair[0]);
      value = d(pair[1]);
      obj[name] = value;
    }
  )
  log(obj)
  log(obj.sign)
  return obj;
};
body = par2Json(body)
var url = 'http://passport.kuman.com/api/Verify/getVerifyCode'
r = http.post(
  url, body, {
    headers: headers
  }
)
log(r.body.string())
