// by Mannix
// date 6-13-2019
var path = "/sdcard/脚本/中文笔画数据.json";
var json = JSON.parse(files.read(path));
files.write(path+".json",JSON.stringify(json, null, 4))
