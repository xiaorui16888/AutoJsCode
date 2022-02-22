"ui";
importClass(android.graphics.Paint);
importClass(android.graphics.Canvas);
importClass(android.graphics.Bitmap);
importClass(android.content.Intent);
importClass(android.net.Uri);

ui.statusBarColor("#ff000000");
ui.layout(
<frame id="bg" background="#ff0000">
<vertical>
<input id="text" text="源码" size="10" w="*" h="44" bg="#000000" color="#00ff00"/>
<img id="ok"/>
<input id="text2" size="10" w="*" h="100" bg="#000000" color="#ffffff"/>
<button id="转换" text="转换" bg="#ff333333" margin="10 0 0 0"/>
<linear>
<button id="分享" text="分享" bg="#ff333333" margin="1 0 0 0" w="100"/>
<button id="上传" text="上传" bg="#ff333333" margin="1 0 0 1" w="100"/>

</linear>
</vertical>
</frame>
);
var bitmap;
var 控制=0;
var path;
ui.转换.click(() => {
控制=1;
});
ui.上传.click(() => {
threads.start(function(){
存图(bitmap);
setClip(上传图片(path));
    toast("ok");
});
});
threads.start(function(){
while(true){
while(控制==0){sleep(10);}
控制=0;
var str=ui.text.text();
bitmap=字转图(str);
ui.run(function(){
ui.ok.setImageBitmap(bitmap);
});
var str结果=(图转字(bitmap));
ui.run(function(){
ui.text2.text(str结果);
});
}
});


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
function 字转图(str){
str=str+"分割标志";
var bytes1=java.lang.String(str).getBytes();//-128到127       
var 图宽=(Math.ceil(Math.sqrt(Math.ceil(bytes1.length/3))));
var 图长=图宽+1;
var 补充长度=(图宽*图长)*3-bytes1.length;
var bytes2=java.lang.String(new Array(补充长度+1).toString()).getBytes();//-128到127       
var bytes=java.lang.String(java.lang.String(bytes1)+java.lang.String(bytes2)).getBytes();         
var bitmap =Bitmap.createBitmap(图宽,图长,Bitmap.Config.ARGB_8888);
var canvas = new Canvas(bitmap);
canvas.drawARGB(0,0,0,0);//黑色
var paint = new Paint();
paint.setStrokeWidth(1);//边缘宽度 
for(var i=0;i<图长;i++){
for(var j=0;j<图宽;j++){
var 顺序=(i*图宽+j)*3;
paint.setARGB(255,bytes[顺序]+128,bytes[顺序+1]+128,bytes[顺序+2]+128);//青色画笔
canvas.drawPoint(j,i,paint);//绘制点
}}
canvas.save(Canvas.ALL_SAVE_FLAG);
canvas.restore();
return bitmap;
}

ui.分享.click(() => {
shareI(存图(bitmap));
});
    
function shareI(图) {
 var imageUri = Uri.fromFile(new java.io.File(图));
 var shareIntent = new Intent();
  shareIntent.setAction(Intent.ACTION_SEND);
  shareIntent.putExtra(Intent.EXTRA_STREAM, imageUri);
  shareIntent.setType("image/*");
  context.startActivity(Intent.createChooser(shareIntent, "分享到"));
}
function 存图(bitmap){
path="/storage/emulated/0/DCIM/Screenshots/"+new Date().getTime()+".png";
var mFile = new java.io.File(path);          
var mFileOutputStream = new java.io.FileOutputStream(mFile);
bitmap.compress(Bitmap.CompressFormat.PNG,100,mFileOutputStream); 
return path;
}
function 上传图片(path){
var url="http://pic.sogou.com/pic/upload_pic.jsp";
var res=http.postMultipart(url,{
"file": open(path),
});
var t=res.body.string();
return t;
}
    
    
