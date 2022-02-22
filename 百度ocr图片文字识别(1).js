requestScreenCapture();
openConsole();
access_token = "24.597b2e5a0582731f3a27a8a525fb726c.2592000.1530154855.282335-10682724";
//access_token=console.rawInput("输入access_token");

while(true){
path=console.rawInput("随便输入什么点击确定识别当前屏幕文字");
console.clear();
path = "/sdcard/6oba.png";
while(true){try{captureScreen(path);break}catch(e){sleep(100);}}
str=getimgtext(path,access_token);
log(str);
}








function getimgtext(path,access_token){
url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic" + "?access_token=" + access_token;
var img = getbase64(path);
var res = http.post(url, {
  image: img
}, {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
img = "null";
var html = res.body.string();
var ht=cutstr(html,'{"words": "','"}');
return ht;
}
function getbase64(path) {
  var oin = null;
  oin = new java.io.FileInputStream(path);
  var lt = oin.available();
  var data = a(new Array(lt + 1) + "");
  lt = oin.read(data);
  return c(android.util.Base64.encode(data, 0));

}

function a(b) {
  return c(b).getBytes();
}
function c(a) {
  return java.lang.String(a);
}
function cutstr(a, b, c) {
a = a.split(b);var d="";
for (i = 1; i < a.length; i++) {
var tmp = a[i].split(c);
if (tmp.length > 1) {
d+=tmp[0]+"\n";
}
}return d;
}