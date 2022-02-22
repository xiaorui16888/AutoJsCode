"ui";
var SeekBarLayout = (function() {
util.extend(SeekBarLayout, ui.Widget);
function SeekBarLayout() {
ui.Widget.call(this);
this.defineAttr("text", (view, attr, value, defineSetter) => {
view._text.setText(String(value));
});
this.defineAttr("sum", (view, attr, value, defineSetter) => {
view._CurrentDuration.setText(String(value));
view._Duration_seekbar.setProgress(parseInt(value));
});
this.defineAttr("max", function(view, attr, value, defineSetter) {
view._Duration.setText(String(value));
view._Duration_seekbar.setMax(parseInt(value));
});
this.defineAttr("onClick", function(view, attr, value, defineSetter) {
view._Duration_seekbar.setOnSeekBarChangeListener({
onProgressChanged: function(seekBar, progress, fromUser) {
view._CurrentDuration.setText(String(progress));
if (fromUser) {
eval(value + "()");
}
},
onStartTrackingTouch: function(seekBar) {},
onStopTrackingTouch: function(seekBar) {
eval(value + "()");
}
});
});
};
SeekBarLayout.prototype.render = function() {
return (
<vertical margin="5" >
<text id="_text" text="A"/>
<horizontal>
<text id="_CurrentDuration" w="25" text="0" gravity="center" layout_gravity="left"/>
<seekbar id="_Duration_seekbar" layout_weight="1"/>
<text id="_Duration" w="25" text="0" gravity="center" layout_gravity="right"/>
</horizontal>
</vertical>
);
};
SeekBarLayout.prototype.getSum = function() {
return this.view._Duration_seekbar.getProgress();
};
ui.registerWidget("seekbar-layout", SeekBarLayout);
return SeekBarLayout;
})();
function 图片查看(canvasView, img) {
this.setImg = (IMG) => {
img = IMG.clone();
this.data = this.autoCenter();
};
this.getImg = function() {
return img.clone();
};
this.getCenter = function() {
return this.点色;
};
this.点色;
this.paint = new Paint;
this.paint.setTextAlign(Paint.Align.CENTER);
this.paint.setStrokeWidth(5);
this.paint.setStyle(Paint.Style.STROKE);
this.autoCenter = function() {
var vw = canvasView.getWidth(),
vh = canvasView.getHeight(),
iw = img.getWidth(),
ih = img.getHeight();
var scale = vw / vh < iw / ih ? vw / iw : vh / ih;
var x = vw / vh < iw / ih ? 0 : vw / 2 - iw / 2 * scale;
var y = vw / vh < iw / ih ? vh / 2 - ih / 2 * scale : 0;
return {
translate: {
x: x,
y: y
},
scale: scale,
rotate: 0
};
};
threads.start(new java.lang.Runnable(() => {
sleep(100);
this.data = this.autoCenter();
}));
this.data = {
translate: {
x: 0,
y: 0
},
scale: 1,
rotate: 0
};
canvasView.on("draw", (canvas) => {
canvas.drawARGB(255, 127, 127, 127);
var w = canvas.getWidth();
var h = canvas.getHeight();
this.paint.setStrokeWidth(5);
this.paint.setStyle(Paint.Style.STROKE);
var matrix = new android.graphics.Matrix();
matrix.postRotate(this.data.rotate);
matrix.postScale(this.data.scale, this.data.scale);
matrix.postTranslate(this.data.translate.x, this.data.translate.y);
this.paint.setARGB(255, 0, 0, 0);
canvas.drawImage(img, matrix, this.paint);
this.paint.setStrokeWidth(2);
this.paint.setStyle(Paint.Style.FILL);
var size = 50;
this.paint.setTextSize(size);
this.paint.setARGB(255, 255, 0, 0);
canvas.drawText(String(Math.floor(device.width / this.data.scale)), w / 2, h * 0.1 + 0.365 * size, this.paint);
var matrix = new android.graphics.Matrix();
matrix.postRotate(this.data.rotate, w / 2, h / 2);
canvas.setMatrix(matrix);
this.paint.setStrokeWidth(5);
this.paint.setARGB(255, 255, 255, 0);
canvas.drawLine(w / 2 - 50, h / 2, w / 2 - 100, h / 2, this.paint);
this.paint.setARGB(255, 255, 0, 255);
canvas.drawLine(w / 2, h / 2 - 50, w / 2, h / 2 - 100, this.paint);
this.paint.setARGB(255, 255, 0, 0);
canvas.drawLine(w / 2 + 50, h / 2, w / 2 + 100, h / 2, this.paint);
this.paint.setARGB(255, 0, 0, 255);
canvas.drawLine(w / 2, h / 2 + 50, w / 2, h / 2 + 100, this.paint);
canvas.setMatrix(new android.graphics.Matrix());
var S = this.算坐标(w / 2, h / 2, this.data, img);
this.点色 = S;
this.paint.setStyle(Paint.Style.STROKE);
this.paint.setColor(S.color);
this.paint.setStrokeWidth(15);
canvas.drawCircle(w / 2, h / 2, 41, this.paint);
this.paint.setColor(this.反色(S.color));
this.paint.setStrokeWidth(5);
canvas.drawCircle(w / 2, h / 2, 50, this.paint);
var S1 = this.算坐标(w / 2, h / 2 - 100, this.data, img);
var S2 = this.算坐标(w / 2, h / 2 + 100 - 12.5, this.data, img);
var S3 = this.算坐标(w / 2, h / 2 + 100 + 12.5, this.data, img);
this.paint.setStrokeWidth(1);
this.paint.setStyle(Paint.Style.FILL);
var size = 40;
this.paint.setTextSize(size);
this.paint.setColor(this.反色(S1.color));
canvas.drawText(S.x + "," + S.y, w / 2, h / 2 - 100 + 0.365 * size, this.paint);
this.paint.setColor(this.反色(S2.color));
canvas.drawText(S.color, w / 2, h / 2 + 100 - 12.5 + 0.365 * size, this.paint);
this.paint.setColor(this.反色(S3.color));
canvas.drawText(S.colorString, w / 2, h / 2 + 100 + 20 + 0.365 * size, this.paint);
});
this.算坐标 = (X, Y, data, img) => {
try {
var X = X - data.translate.x,
Y = Y - data.translate.y;
var WE = this.weiyi([X, Y]);
var YY = this.ydfx([X, Y]);
var KY = YY - data.rotate;
var KK = this.kdfx(KY);
var SS = this.getsd(WE / data.scale, KK);
var x = Math.floor((0 <= SS[0] && SS[0] < img.getWidth()) ? SS[0] : (0 <= SS[0] ? img.getWidth() - 1 : 0));
var y = Math.floor((0 <= SS[1] && SS[1] < img.getHeight()) ? SS[1] : (0 <= SS[1] ? img.getHeight() - 1 : 0));
var color = images.pixel(img, x, y);
var colorString = colors.toString(color);
return {
x: x,
y: y,
color: color,
colorString: String(colorString)
};
} catch (e) {
return this.点色;
};
};
this.反色 = function(color) {
return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};
this.Touch = new Array;
this.TouchData = new Array;
canvasView.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
try {
switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
case event.ACTION_DOWN:
var i = Math.floor(event.getAction() / 256);
var id = event.getPointerId(i);
var X = event.getX(i);
var Y = event.getY(i);
var PC = event.getPointerCount();
if (PC >= 3) {
this.data = this.autoCenter();
};
this.Touch[id] = {
X: X - this.data.translate.x,
Y: Y - this.data.translate.y
};
this.TouchData = this.deepCopy(this.data);
break;
case event.ACTION_MOVE:
var PC = event.getPointerCount();
if (PC == 1) {
var id = event.getPointerId(0);
var X = event.getX(0);
var Y = event.getY(0);
this.data.translate.x = X - this.Touch[id].X;
this.data.translate.y = Y - this.Touch[id].Y;
} else if (PC == 2) {
var id = event.getPointerId(0);
var X = event.getX(0);
var Y = event.getY(0);
var id1 = event.getPointerId(1);
var X1 = event.getX(1);
var Y1 = event.getY(1);
var YY = this.ydfx([this.Touch[id1].X - this.Touch[id].X, this.Touch[id1].Y - this.Touch[id].Y]);
var YY1 = this.ydfx([X1 - X, Y1 - Y]);
var kY = YY1 - YY;
this.data.rotate = this.TouchData.rotate + kY;
var SS = this.weiyi([this.Touch[id1].X - this.Touch[id].X, this.Touch[id1].Y - this.Touch[id].Y]);
var SS1 = this.weiyi([X1 - X, Y1 - Y]);
var kS = SS1 / SS;
this.data.scale = this.TouchData.scale * kS;
var TY = this.ydfx([-this.Touch[id].X, -this.Touch[id].Y]);
var YC = TY - YY;
var TS = this.weiyi([this.Touch[id].X, this.Touch[id].Y]);
var TY1 = YY1 + YC;
var KKK = this.kdfx(TY1);
var SD = this.getsd(TS * kS, KKK);
this.data.translate.x = X + SD[0];
this.data.translate.y = Y + SD[1];
} else {
this.data = this.autoCenter();
};
break;
case event.ACTION_UP:
var i = Math.floor(event.getAction() / 256);
var id = event.getPointerId(i);
this.Touch[id] = undefined;
var PC = event.getPointerCount();
for (var i = 0; i < PC; i++) {
var id1 = event.getPointerId(i)
var X = event.getX(i);
var Y = event.getY(i);
if (id1 != id) {
this.Touch[id1] = {
X: X - this.data.translate.x,
Y: Y - this.data.translate.y
};
};
};
break;
};
return true;
} catch (e) {
toastLog("Touch: " + e);
return true;
};
}));
this.getsd = (s, ary) => {
var sum = this.weiyi(ary);
var S = (s / sum) || 0;
for (var i = 0; i < ary.length; i++) {
ary[i] = ary[i] * S;
};
return ary;
};
this.weiyi = function(ary) {
var sum = 0;
for (var i = 0; i < ary.length; i++) {
sum += Math.pow(ary[i], 2);
};
return Math.sqrt(sum);
};
this.kdfx = function(Y) {
var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
return [x, y];
};
this.ydfx = (ary) => {
var ary = this.getsd(1, ary);
var x = ary[0],
y = ary[1];
var Y = Math.asin(y) / (2 * Math.PI) * 360;
if (x < 0) {
Y = 180 - Y;
};
return Y;
};
this.windowGXY = function(x, y, k) {
x = (k[0][0] < x && x < k[1][0]) ? x : (k[0][0] < x ? k[1][0] : k[0][0]);
y = (k[0][1] < y && y < k[1][1]) ? y : (k[0][1] < y ? k[1][1] : k[0][1]);
return {
x: x,
y: y
};
};
this.deepCopy = (obj) => {
if (typeof obj != 'object') {
return obj;
}
var newobj = {};
for (var attr in obj) {
newobj[attr] = this.deepCopy(obj[attr]);
}
return newobj;
};
};
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
ui.layout(
<drawer id="drawer">
<vertical>
<canvas id="canvas" margin="5" layout_weight="1"/>
<viewpager id="viewpager" w="*"h="140" bg="#dddddd">
<vertical>
<button id="imgSave" text="记载图片(记载当前显示图片)" w="*" margin="5" layout_weight="1"/>
<button id="imageSave" text="保存当前图片为文件" w="*" margin="5" layout_weight="1"/>
</vertical>
<scroll>
<vertical bg="#a0a0a0" margin="5">
<text id="text" text="二值化" textSize="25sp" margin="5"/>
<seekbar-layout id="s1" w="*" h="auto" text="参数一" max="200" sum="30" onClick="onClicks"/>
<seekbar-layout id="s2" w="*" h="auto" text="参数二" max="200" sum="200" onClick="onClicks"/>
</vertical>
</scroll>
</viewpager>
</vertical>
<vertical layout_gravity="left" bg="#ffffff" w="280">
<text text="操作已记载的图片" textSize="25sp" margin="5" gravity="center"/>
<list id="list" w="*" h="*" bg="#346489" layout_gravity="right">
<text w="*" h="50" text="{{text}}" textSize="16sp" bg="#dddddd" margin="5" gravity="center"/>
</list>
</vertical>
</drawer>
);
var listAry = [{
text: "灰度化"
}, {
text: "二值化"
}, {
text: "自适应二值化"
}, {
text: "RGB转HSV"
}, {
text: "模糊"
}, {
text: "中值滤波"
}, {
text: "高斯模糊"
}, {
text: "原图"
}, {
text: "选图"
}];
ui.list.setDataSource(listAry);
ui.list.on("item_click", function(item, i) {
switch (item.text) {
case "灰度化":
var img = images.grayscale(CurrentImg);
canvasAD.setImg(img);
img.recycle();
break;
case "二值化":
var g = images.grayscale(CurrentImg);
var img = images.threshold(g, 30, 200);
g.recycle();
canvasAD.setImg(img);
img.recycle();
break;
case "自适应二值化":
var g = images.grayscale(CurrentImg);
var img = images.adaptiveThreshold(g, 200, "MEAN_C", "BINARY", 25, 10);
g.recycle();
canvasAD.setImg(img);
img.recycle();
break;
case "RGB转HSV":
var img = images.cvtColor(CurrentImg, "RGB2HSV");
canvasAD.setImg(img);
img.recycle();
break;
case "模糊":
var img = images.blur(CurrentImg, [15, 15]);
canvasAD.setImg(img);
img.recycle();
break;
case "中值滤波":
var img = images.medianBlur(CurrentImg, 5);
canvasAD.setImg(img);
img.recycle();
break;
case "高斯模糊":
var img = images.gaussianBlur(CurrentImg, [5, 5]);
canvasAD.setImg(img);
img.recycle();
break;
case "原图":
var img = MainImg.clone();
canvasAD.setImg(img);
img.recycle();
break;
case "选图":
选择图片(function(path) {
var img = MainImg;
var IMG = CurrentImg;
MainImg = 加载图片(path);
CurrentImg = MainImg.clone();
canvasAD.setImg(CurrentImg);
img.recycle();
IMG.recycle();
});
break;
};
});
var storage = storages.create("图片处理");
var imagePath = storage.get("imagePath");
events.on("exit", function() {
storage.put("imagePath", imagePath);
});
var MainImg = 加载图片(imagePath);
var canvasAD = new 图片查看(ui.canvas, MainImg);
var CurrentImg = MainImg.clone();
ui.imgSave.click(function() {
var img = CurrentImg;
CurrentImg = canvasAD.getImg();
img.recycle();
toastLog("记载");
});
ui.imageSave.click(function() {
images.save(canvasAD.getImg(), "/sdcard/脚本/" + (new Date().getTime()) + ".png", "png", 50);
toastLog("保存");
});
function onClicks() {
var A = parseInt(ui.s1.widget.getSum());
var B = parseInt(ui.s2.widget.getSum());
var img = images.threshold(CurrentImg, A, B);
canvasAD.setImg(img);
img.recycle();
};
function 加载图片(A) {
if (files.isFile(A)) {
imagePath = A;
return images.read(A);
};
var dir = "/storage/emulated/0/DCIM";
var jsFiles = files.listDir(dir, function(name) {
return (name.endsWith(".jpg") || name.endsWith(".png")) && files.isFile(files.join(dir, name));
});
if (jsFiles.length) {
return images.read(files.join(dir, jsFiles[jsFiles.length - 1]));
} else {
toastLog("没有图片可以查看");
toastLog("请自己修改路径");
toastLog("后使用");
exit();
};
};
function 选择图片(fun) {
ui.run(() => {
importPackage(org.autojs.autojs.ui.explorer);
importPackage(org.autojs.autojs.model.explorer);
var explorerView = new ExplorerView(new android.view.ContextThemeWrapper(context, org.autojs.autojs.R.style.AppTheme));
explorerView.setExplorer(Explorers.workspace(), ExplorerDirPage.createRoot("/sdcard"));
explorerView.setDirectorySpanSize(2);
var dialog = new org.autojs.autojs.theme.dialog.ThemeColorMaterialDialogBuilder(context)
.title("选择图片文件")
.customView(explorerView, false)
.positiveText("取消")
.build();
explorerView.setOnItemClickListener(function(view, item) {
if (nameToType(String(item.toScriptFile())) == "图片") {
fun(String(item.toScriptFile()));
dialog.dismiss();
} else {
toastLog("不是图片");
};
});
com.stardust.app.DialogUtils.showDialog(dialog);
});
};