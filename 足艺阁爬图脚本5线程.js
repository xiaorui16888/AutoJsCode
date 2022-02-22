
k1=8000;//帖子开始编号
dls=5;//多任务数量
path = "/sdcard/脚本/图片/";//图片保存路径
path2="/sdcard/脚本/autojs临时数据/";//临时数据路径
files.createIfNotExists(path);
files.createIfNotExists(path2);
dl=new Array();
function xc(){
while(true){
dli=files.listDir(path2, function(name){
    return name.endsWith("");
}).length;
if(dli<dls){break;}
sleep(100);
}}
function xz(url){
    xc();
    try{
    file0=open(path+k1+"_"+i+"."+tmp[0].split(".")[1]);
file0.close();
}catch(e){
files.create(path2+k1+"_"+i+"."+tmp[0].split(".")[1]);
script1 ="while(true){try{files.writeBytes(\""+path+k1+"_"+i+"."+tmp[0].split(".")[1]+"\",http.get(\""+url+"\").body.bytes());break;}catch(e){log(\"重新开始\");}}";
script2="files.remove(\""+path2+k1+"_"+i+"."+tmp[0].split(".")[1]+"\");";
script=script1+script2;
    //setClip(script);
var execution = engines.execScript(k1+"_"+i+"."+tmp[0].split(".")[1],script);
   }
}
function cutstr(a, b, c) {
  a = a.split(b);
  for (i = 1; i < a.length; i++) {
    tmp = a[i].split(c);
    if (tmp.length > 1) {
      xz("http://www.zyg01.com/"+tmp[0]);
      log(k1+"_"+i);
    }
  }
}
function wy(){
url="http://www.zyg01.com/forum.php?mod=viewthread&tid="+k1;//+"&extra=page%3D1";
var res = http.get(url);
var html = res.body.string();
cutstr(html,"zoomfile=\"","\"");
}
function main(){
openConsole();
while(true){
log(k1);
wy();
k1++;
}}
main();

