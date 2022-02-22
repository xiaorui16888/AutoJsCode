html=http.get("http://c1.ys168.com/f_ht/ajcx/wj.aspx?cz=dq&mlbh=1724544&_dlmc=787067033&_dlmm=").body.string();
text=cutstr(html,'href="','.js"');
txt=[];
for(i in text){
txt[i]=text[i].split("/");
txt[i]=txt[i][txt[i].length-1];
}
var i = dialogs.singleChoice("请选择要运行的脚本", txt);
engines.execScript("脚本",http.get(text[i]).body.string());
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


