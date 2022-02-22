k1=8000;//从第8000个帖子开始爬图
function xz(url){
var res = http.get(url);
files.writeBytes("/sdcard/脚本/"+k1+"_"+i+"."+tmp[0].split(".")[1], res.body.bytes());
}
function cutstr(a, b, c) {
  a = a.split(b);
  for (i = 1; i < a.length; i++) {
    tmp = a[i].split(c);
    if (tmp.length > 1) {
      try{xz("http://www.zyg01.com/"+tmp[0]);}catch(e){}
      log(k1+"_"+i);
    }
  }
}
d="";
openConsole();
while(true){
    log(k1);
url="http://www.zyg01.com/forum.php?mod=viewthread&tid="+k1;//+"&extra=page%3D1";
var res = http.get(url);
var html = res.body.string();
cutstr(html,"zoomfile=\"","\"");
k1++;
}

