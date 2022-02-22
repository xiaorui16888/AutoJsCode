   var P="/sdcard/脚本/生成文件/";
html=http.get("http://ca.ys168.com//f_ht/ajcx/wj.aspx?cz=dq&mlbh=1724544&_dlmc=787067033&_dlmm=").body.string();

text=cutstr(html,'href="','.js"');
txt=[];
for(i in text){
txt[i]=text[i].split("/");
txt[i]=txt[i][txt[i].length-1];
}
var i = dialogs.select("请选择脚本", txt);
 if(i+1){
  var a = dialogs.select("对\n"+txt[i]+"\n进行", ["运行","保存"]);
if(a+1){
engines.execScript(txt[i],http.get(text[i]).body.string());
var B=files.join(P,txt[i]);
while(true){
try{
files.write(B, http.get(text[i]).body.string());
sleep(250);
toast(B);
break;
}catch(e){}
}
}
}
function cutstr(a, b, c) {
  a = a.split(b);var d=[];var p=0;
  for (i = 1; i < a.length; i++) {
  var tmp = a[i].split(c);
    if (tmp.length > 1) {
     d[p]=tmp[0]+".js";
     p++;
    }
  }return d;
}