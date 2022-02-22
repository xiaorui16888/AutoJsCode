"ui";
var path = "/sdcard/" + files.cwd().split("/").slice(4).join("/");
var fangshi = ["去(//)注释", "去(/\*\*/)注释", "去空行", "去换行"];
var fileType = {
文本: {
img: "format_text.png",
ends: ["js", "txt", "json"]
},
图片: {
img: "format_picture.png",
ends: ["png", "jpg"]
},
音乐: {
img: "format_music.png",
ends: ["mp3", "m4a"]
},
视频: {
img: "format_media.png",
ends: ["mp4"]
},
安装包: {
img: "format_apk.png",
ends: ["apk"]
},
压缩包: {
img: "format_zip.png",
ends: ["zip"]
},
数据: {
img: "format_unkown.png",
ends: ["abc"]
}
};
ui.layout(
<vertical>
<text id="text" w="*"/>
<list id="list" w="*">
<horizontal w="*">
<frame w="{{Math.round(device.width/6)}}px" h="{{Math.round(device.width/6)}}px">
<text w="*" h="*" text="{{type}}" margin="10px" textSize="10sp" line="1" gravity="center"/>
<img w="{{Math.round(device.width/7)}}px" margin="6" scaleType="fitXY" src="file://{{imgPath}}"/>
</frame>
<vertical w="*" h="*">
<text w="*" h="{{nameH}}px" margin="{{nameM}}px" text="{{name}}" textSize="20sp" line="1" gravity="center_vertical"/>
<text w="*" h="{{sizeH}}px" margin="{{sizeM}}px" text="{{size}}" textSize="15sp" gravity="center_vertical"/>
</vertical>
</horizontal>
</list>
</vertical>
);
ui.text.setText(String(path));
ui.list.setDataSource(dirlist(path));
setTimeout(() => {
开始(activity);
}, 100);
function 开始(ctx) {
ctx.runOnUiThread(new java.lang.Runnable(function() {
var window = new android.widget.PopupWindow();
var button = new android.widget.Button(ctx);
button.setTextSize(10);
button.setText("上一级");
button.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.GREEN));
button.setOnClickListener(new android.view.View.OnClickListener(function() {
threads.start(function() {
var pathAry = path.split("/");
if (pathAry.length > 2) {
pathAry.pop();
path = pathAry.join("/");
ui.run(() => {
ui.text.setText(String(path));
ui.list.setDataSource(dirlist(path));
});
};
});
}));
window.setContentView(button);
window.setWidth(150);
window.setHeight(150);
window.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, device.width - 170, device.height * 0.7);
}));
};
ui.list.on("item_click", function(item, i, itemView, listView) {
var fromPath = files.join(path, item.name);
if (files.isFile(fromPath)) {
threads.start(function() {
var i = dialogs.singleChoice(item.name, ["浏览", "操作"]);
if (i + 1) {
if (i == 0) {
openFile(fromPath);
};
if (i == 1) {
if (item.name.endsWith(".js") || item.name.endsWith(".txt") || item.name.endsWith(".json")) {
var i = dialogs.multiChoice("选择方式", fangshi, [0, 1, 2]);
if (i.length) {
var txt = xiugai(fromPath, i);
var toPath = files.join(path, files.getNameWithoutExtension(fromPath) + "(去注释)." + files.getExtension(fromPath));
files.write(toPath, txt);
ui.run(() => {
ui.text.setText(String(path));
ui.list.setDataSource(dirlist(path));
});
toastLog(toPath);
};
} else {
toast("不支持");
};
};
};
});
};
if (files.isDir(fromPath)) {
path = fromPath;
ui.run(() => {
ui.text.setText(String(fromPath));
ui.list.setDataSource(dirlist(fromPath));
});
};
});
function dirlist(dir) {
device.vibrate(80);
var Ary = new Array;
var dirlistAry = files.listDir(dir, function(name) {
return !new java.io.File(files.join(dir, name)).isHidden() && files.isDir(files.join(dir, name));
}).sort();
dirlistAry = dirlistAry.map(function(A) {
var obj = {
type: "文件夹",
imgPath: "format_folder.png",
name: A,
size: "",
nameH: String(Math.round(device.width / 7)),
sizeH: "0",
nameM: "18",
sizeM: "0",
};
return obj;
});
var filelistAry = files.listDir(dir, function(name) {
return !new java.io.File(files.join(dir, name)).isHidden() && files.isFile(files.join(dir, name));
}).sort(function(A, B) {
var AExtension = A.split(".").pop();
var BExtension = B.split(".").pop();
f1: for (var i in fileType) {
for (var a = 0; a < fileType[i].ends.length; a++) {
if (AExtension == fileType[i].ends[a]) {
break f1;
};
if (BExtension == fileType[i].ends[a]) {
return true;
};
};
};
return false;
});
filelistAry = filelistAry.map(function(A) {
var obj = {
type: nameToType(A),
imgPath: nameToImg(A),
name: A,
size: sizeToString(new java.io.File(files.join(dir, A)).length()),
nameH: String(Math.round(device.width / 14)),
sizeH: String(Math.round(device.width / 14)),
nameM: "9",
sizeM: "9",
};
return obj;
});
return Ary.concat(dirlistAry, filelistAry);
};
function sizeToString(size) {
var asize;
switch (true) {
case 1 <= Math.round(size / 1073741824):
asize = Math.floor(size / 1073741824 * 100) / 100 + "MB";
break;
case 1 <= Math.round(size / 1048576):
asize = Math.floor(size / 1048576 * 100) / 100 + "MB";
break;
case 1 <= Math.round(size / 1024):
asize = Math.floor(size / 1024 * 100) / 100 + "KB";
break;
default:
asize = size + "B";
};
return asize;
};
function nameToImg(name) {
var Extension = name.split(".").pop();
for (var i in fileType) {
for (var a = 0; a < fileType[i].ends.length; a++) {
if (Extension == fileType[i].ends[a]) {
return fileType[i].img;
};
};
};
return "format_unkown.png";
};
function nameToType(name) {
var Extension = name.split(".").pop();
for (var i in fileType) {
for (var a = 0; a < fileType[i].ends.length; a++) {
if (Extension == fileType[i].ends[a]) {
return i;
};
}
};
return "unkown";
};
function openFile(path) {
device.vibrate(80);
var file = new java.io.File(path);
if (file.isFile()) {
var mainView, height = device.height * 0.9,
ctx = activity;;
switch (nameToType(file.getName())) {
case "文本":
mainView = new android.widget.ScrollView(ctx);
textview = new android.widget.TextView(ctx);
textview.setTextColor(android.graphics.Color.rgb(0, 0, 250));
var txt = String(files.read(path));
textview.setText(txt);
textview.setGravity(android.view.Gravity.LEFT);
mainView.addView(textview);
break;
case "图片":
mainView = new android.widget.ImageView(ctx);
var bitmap = images.read(path).getBitmap();
height = device.width * 0.9 * bitmap.getHeight() / bitmap.getWidth();
mainView.setImageBitmap(bitmap);
mainView.setScaleType(android.widget.ImageView.ScaleType.FIT_CENTER);
break;
case "音乐":
break;
case "视频":
break;
case "数据":
break;
default:
break;
};
if (mainView) {
ctx.runOnUiThread(new java.lang.Runnable(function() {
try {
var window = new android.widget.PopupWindow();
window.setContentView(mainView);
window.setWidth(device.width * 0.9);
window.setHeight(height);
window.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.GRAY));
window.setFocusable(true);
window.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.LEFT | android.view.Gravity.TOP, device.width * 0.05, (device.height - height) / 2);
} catch (e) {
toastLog(e);
};
}));
};
} else {
throw path + "不是文件";
};
};
function xiugai(dir, moshi) {
var txt = files.read(dir);
var txt1 = new Array;
for (var i = 0; i < moshi.length; i++) {
switch (moshi[i]) {
case 0:
re = /(\/\/[^\n\'\"]*([^\n\'\"]*(\'|\")[^\n\'\"]*(\'|\")[^\n\'\"]*)*(\n|$))/g;
txt = txt.replace(re, "\n");
txt1 = txt1.concat(txt.match(re));
break;
case 1:
re = /(\/\*([^\*\/])*\*\/)/g;
txt = txt.replace(re, "\n");
txt1 = txt1.concat(txt.match(re));
break;
case 2:
re = /\n+\s*/g;
txt = txt.replace(re, "\n");
txt1 = txt1.concat(txt.match(re));
break;
case 3:
re = /\s+/g;
txt = txt.replace(re, " ");
txt1 = txt1.concat(txt.match(re));
break;
};
};
return txt;
};