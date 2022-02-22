console.show();

path = "/sdcard/ucjt.png";

var json = getimgtext(path);
var arr = json.result
c = arr.pop().content;
b = arr.pop().content;
a = arr.pop().content;
var title = "";
var x;
for (x in arr) {
    title += arr[x].content;
}

var data = { "title": filter(title), "a": filter(a), "b": filter(b), "c": filter(c), }
log(data);

function filter(text) {
    text = text.replace(/([ABC]、)/g, '');
    text = text.replace(/(\d+\.)/g, '');
    text = text.replace(/(\n)/g, '');
    return text;
}

function getimgtext(path) {
/*     var url = "http://pic.sogou.com/pic/upload_pic.jsp";
    var res = http.postMultipart(url, {
        "file": open(path),
    }); 
    var url = res.body.string();*/
    var url = "http://img01.sogoucdn.com/app/a/100520146/c58b3e1590c5af817bd5fdcb4633b973"
    res = http.get("http://pic.sogou.com/pic/ocr/ocrOnline.jsp?query=" + url);
    return res.body.json();
}