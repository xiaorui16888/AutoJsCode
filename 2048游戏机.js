"ui";
ui.statusBarColor("#AA0000");
ui.layout(
    <frame background="#AA0000">
    <vertical align="top" margin="5">
       <img id="img" bg="#ffffff" w="36"/>
       <img id="img2" bg="#ffffff" w="350" margin="1 0 0 0"/>
     <linear>
    <vertical w="170">
   
    </vertical>
    <vertical>
    <linear> 
    <button margin="0 0 0 60" h="60" w="60" id="up" text="上"></button>
    </linear>
          <linear>
    <button h="60" w="60" id="left" text="左"></button>
    <button h="60" w="60" id="ok" text="ok"></button>
    <button h="60" w="60" id="right" text="右"></button>
    </linear>
        <linear>
    <button margin="0 0 0 60" h="60" w="60" id="down" text="下"></button>
    </linear>
          </vertical>
    </linear>
    </vertical>
    </frame>
);

importClass(android.graphics.Paint);
importClass(android.graphics.Canvas);
importClass(android.graphics.Bitmap);
importClass(android.content.Intent);
importClass(android.net.Uri);

threads.start(function(){
var i=0;
var t1=1000,t2=0;
var bitmap =Bitmap.createBitmap(108,108,Bitmap.Config.ARGB_8888);

while(true){
var bitmap =Bitmap.createBitmap(108,108,Bitmap.Config.ARGB_8888);

var canvas = new Canvas(bitmap);
canvas.drawARGB(255,0,222,0);
var paint = new Paint();

paint.setARGB(255,0,0,0);//白色画笔
paint.setStyle(Paint.Style.FILL);//空心样式  
canvas.drawCircle(54,54,53, paint);//绘制圆

paint.setARGB(255,55,55,55);//白色画笔
paint.setStyle(Paint.Style.FILL);//空心样式  
canvas.drawCircle(54,54,2, paint);//绘制圆


paint.setARGB(255,255,255,255);//白色画笔
paint.setStyle(Paint.Style.STROKE);//空心样式  
paint.setStrokeWidth(1);//边缘宽度  
canvas.drawCircle(54,54,50, paint);//绘制圆

for(var 刻度=0;刻度<360;刻度+=30){
var 度数=(Math.PI/180)*(刻度-90);
paint.setARGB(255,0,255,255);//青色画笔
paint.setStrokeWidth(1);//边缘宽度 
canvas.drawLine(40*Math.cos(度数)+54,40*Math.sin(度数)+54,48*Math.cos(度数)+54,48*Math.sin(度数)+54,paint);//绘制直线
}

var 时间=new Date();

刻度=时间.getHours()*30+(时间.getMinutes()/60)*30;
度数=(Math.PI/180)*(刻度-90);
var 针尾度数=(Math.PI/180)*(刻度+90);
paint.setARGB(255,255,0,0);//青色画笔
paint.setStrokeWidth(1);//边缘宽度 
canvas.drawLine(10*Math.cos(针尾度数)+54,10*Math.sin(针尾度数)+54,20*Math.cos(度数)+54,20*Math.sin(度数)+54,paint);//绘制直线

刻度=时间.getMinutes()*6+(时间.getSeconds()/60)*6;
度数=(Math.PI/180)*(刻度-90);
var 针尾度数=(Math.PI/180)*(刻度+90);
paint.setARGB(255,0,255,0);//青色画笔
paint.setStrokeWidth(1);//边缘宽度 
canvas.drawLine(10*Math.cos(针尾度数)+54,10*Math.sin(针尾度数)+54,25*Math.cos(度数)+54,25*Math.sin(度数)+54,paint);//绘制直线

刻度=时间.getSeconds()*6+(时间.getMilliseconds()/1000)*6;
度数=(Math.PI/180)*(刻度-90);
var 针尾度数=(Math.PI/180)*(刻度+90);
paint.setARGB(255,255,255,0);//青色画笔
paint.setStrokeWidth(1);//边缘宽度 
canvas.drawLine(9*Math.cos(针尾度数)+54,9*Math.sin(针尾度数)+54,30*Math.cos(度数)+54,30*Math.sin(度数)+54,paint);//绘制直线

刻度=时间.getMilliseconds()*(360/1000);
度数=(Math.PI/180)*(刻度-90);
var 度数2=(Math.PI/180)*(刻度-180);
var 针尾度数=(Math.PI/180)*(刻度+90);
var 针尾度数2=(Math.PI/180)*(刻度);
paint.setARGB(255,255,0,255);//青色画笔
paint.setStrokeWidth(1);//边缘宽度 
canvas.drawLine(5*Math.cos(针尾度数)+80,5*Math.sin(针尾度数)+54,5*Math.cos(度数)+80,5*Math.sin(度数)+54,paint);//绘制直线
canvas.drawLine(5*Math.cos(针尾度数2)+80,5*Math.sin(针尾度数2)+54,5*Math.cos(度数2)+80,5*Math.sin(度数2)+54,paint);//绘制直线
//

canvas.save(Canvas.ALL_SAVE_FLAG);
canvas.restore();
t1=new Date().getTime();

i=parseInt(1000/(t1-t2));
t2=t1;

ui.run(function(){
ui.img.setImageBitmap(bitmap);
//ui.text.text(i+"");
});
if(分享否==1){
var path="/storage/emulated/0/DCIM/Screenshots/"+new Date().getTime()+".png";
var mFile = new java.io.File(path);          
var mFileOutputStream = new java.io.FileOutputStream(mFile);
bitmap.compress(Bitmap.CompressFormat.PNG,100,mFileOutputStream); 
shareI(path)
分享否=0;
}
}
});
var 分享否=0;
ui.ok.click(() => {
分享否=1;
});
function shareI(图) {
 var imageUri = Uri.fromFile(new java.io.File(图));
 var shareIntent = new Intent();
  shareIntent.setAction(Intent.ACTION_SEND);
  shareIntent.putExtra(Intent.EXTRA_STREAM, imageUri);
  shareIntent.setType("image/*");
  context.startActivity(Intent.createChooser(shareIntent, "分享到"));
}






