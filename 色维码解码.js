"ui";
importClass(android.graphics.Bitmap);
ui.statusBarColor("#ff000000");
ui.layout(
<frame id="bg" background="#ff0000">
<vertical>
<img id="ok"/>
<input id="text2" size="10" w="*" h="100" bg="#000000" color="#ffffff"/>
<button id="转换" text="输入图片地址转换" bg="#ff333333" margin="10 0 0 0"/>
<button id="分享" text="分享" bg="#ff333333" margin="10 0 0 0" w="100"/>
</vertical>
<vertical>
<input id="text" hide="图片网址" size="10" w="*" h="44" bg="#66000000" color="#00ff00"/>
</vertical>
</frame>
);
var path="/sdcard/1.png";
var 控制=0;
ui.转换.click(() => {
控制=1;
});
threads.start(function(){
while(true){
while(控制==0){}
下载图片();
 ui.run(function(){
 ui.ok.setSource("file://"+path);
 });
var img=android.graphics.BitmapFactory.decodeFile(path);
var str=图转字(img);
ui.run(function(){
ui.text2.text(str);
});
控制=0;
}
});
ui.text.text("http://img01.sogoucdn.com/app/a/100520146/d9e29ae0434703a44521ac9067afa4d6");
function 下载图片(){
var 地址=ui.text.text()+"";
if(地址.indexOf("http://")>=0){
var res = http.get(地址);
files.writeBytes(path, res.body.bytes());
}else{
files.copy(地址,path);
}
}
function 图转字(bitmap){
var byte=java.lang.String(new Array(bitmap.height*bitmap.width*3+1).toString()).getBytes();//-128到127       
for(var i=0;i<bitmap.height;i++){
for(var j=0;j<bitmap.width;j++){
var 像素=bitmap.getPixel(j,i);
byte[(i*bitmap.width+j)*3+0]=colors.red(像素)-128;
byte[(i*bitmap.width+j)*3+1]=colors.green(像素)-128;
byte[(i*bitmap.width+j)*3+2]=colors.blue(像素)-128;
}}
var str结果=java.lang.String(byte);
var str结果长度=str结果.length();
var str数组=str结果.split("分割标志");
var 截取=str结果长度-str数组[str数组.length-1].length-4;
var str最终结果=str结果.slice(0,截取)
return (str最终结果);
}