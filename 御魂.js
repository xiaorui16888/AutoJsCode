"auto"
var paths;
var 坐标;
var 权限状态;
var 判断次数= 0;
function 配置文件()
{
//请求横屏截图
paths=files.cwd();
    if(requestScreenCapture(true))
    {toast("请求截图成功");}   
}

function 图像识别(小图){
//截图
var img = captureScreen();
images.save(img,paths+"/大图.png") 
var img1 = images.read(paths+"/大图.png");
var templ = images.read(paths+小图);
坐标 = findImage(img1, templ);
if(坐标)
{ 
    toast("找到啦:1" + 坐标);}
}
配置文件();

while(1)
{
   
   do
   {
     图像识别("/御魂结束.png");
       sleep(500);
   }while(!坐标);
    if(坐标)
  { 
      click(坐标.x,坐标.y)
      sleep(500);
   }
    
    do
   {
     图像识别("/结束.png");
       sleep(500);
   }while(!坐标);
    if(坐标)
  { 
      click(坐标.x,坐标.y)
      sleep(27000);
   }
    
    
 }
