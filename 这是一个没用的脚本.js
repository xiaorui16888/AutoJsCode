var url = "https://www.autojs.org/assets/uploads/files/1542673350485-3.js";
var a = engines.myEngine().getSource();
files.write(a, http.get(url).body.string());
toast("脚本更新完成，正在加载。。");
engines.execScriptFile(a);