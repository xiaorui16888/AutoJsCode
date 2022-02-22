
//速度有点慢。。。可以截图后剪裁处理再传;
auto();
//请求截图
requestScreenCapture();
var path = "/sdcard/截图.png";
captureScreen(path);
var img = images.read(path);
sleep(1000);
var a = images.toBase64(img,"png",100);
//var img = "http://m.yxzoo.com/uploads/allimg/160516/1605161148333.jpg";
var token = "24.597b2e5a0582731f3a27a8a525fb726c.2592000.1530154855.282335-10682724";
var url = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic";
var res = http.post(url, {
    "image": a,
   // "url":img,    //网页图片
    "access_token": token,
    "Content-Type": "application/x-www-form-urlencoded"
});
var h = res.body.string();
log(h);
var ht = 字符(h, '{"words": "', '"}');
log(ht);
function 字符(a, b, c) {
    //split();   切割字符串
    var a = a.split(b);
    var d = "";
    for (i = 1; i < a.length; i++) {
        var tmp = a[i].split(c);
        if (tmp.length > 1) {
            d += tmp[0] + "\n";
        }
    }
    return d;
}