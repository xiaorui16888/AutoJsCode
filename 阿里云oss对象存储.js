
importClass(javax.crypto.spec.SecretKeySpec);
importClass(javax.crypto.Mac);
importClass(java.lang.StringBuilder);
importClass(java.lang.Integer);

var AccessKeySecret = "pXupyOt9iaR16tG1lB"
var AccessKeyId = "LTAIJ11sKfa"


var VERB = "PUT"
var Content_MD5 = ""
var Content_Type = ""
var ossDate = new Date()
var CanonicalizedOSSHeaders = ""
var BucketName = 'vxbucket'
var ObjectName = 'uploadTest888888999999.txt'
var CanonicalizedResource = "/" + BucketName + "/" + ObjectName

log("VERB=" + VERB)
log("ossDate=" + ossDate)
log("CanonicalizedResource=" + CanonicalizedResource)

var hamcsha1Result=hamcsha1(AccessKeySecret,
  VERB + "\n" +
  Content_MD5 + "\n" +
  Content_Type + "\n" +
  ossDate + "\n" +
  CanonicalizedOSSHeaders +
  CanonicalizedResource)

  log('hamcsha1Result=')
  log(hamcsha1Result)
var Signature = base64Encode(hamcsha1Result).trim()

log('Signature='+Signature + '666666=======');


var SignatureValue = "OSS " + AccessKeyId + ":" + Signature;

log("SignatureValue=" + SignatureValue + '666666=======');

var headers = {
  Host: "vxbucket.oss-cn-beijing.aliyuncs.com",
  Date: getGMT(),
  Authorization: SignatureValue
};
log(headers)

var options = {
  headers: headers,
  method: "PUT",
  contentType: "text/plain",
  body: "6666666666666666668888888888888888888888"
};
log(options)

url = "http://vxbucket.oss-cn-beijing.aliyuncs.com"
r = http.request(url, options);
log(r.body.string())

function getGMT() {
  var r=new Date().toGMTString()
  return r
}

// byte[] data, byte[] key
function hamcsha1(data, key) {

  var data = java.lang.String(data);
  var key = java.lang.String(key);

  data = data.getBytes();
  key = key.getBytes();

  signingKey = new SecretKeySpec(key, "HmacSHA1"); // SecretKeySpec
  mac = Mac.getInstance("HmacSHA1"); // Mac
  mac.init(signingKey);
  return mac.doFinal(data);
  // return byte2hex(mac.doFinal(data));
}

//二行制转字符串     static String byte2hex(byte[] b)
function byte2hex(b) {
  hs = new StringBuilder(); // StringBuilder
  var stmp; // String
  for (var n = 0; b != null && n < b.length; n++) {
    stmp = Integer.toHexString(b[n] & 0xff);
    if (new java.lang.String(stmp).length() == 1) hs.append("0");
    hs.append(stmp);
  }
  return hs
  // return hs.toString().toUpperCase().getBytes();
}

function base64Encode(r) {
  log('base64Encode r=' + r)
  var r = android.util.Base64.encodeToString(r, 0);
  return r
}

