//swipe(500,1500,500,500,2000)
auto.waitFor()
app.launchApp("QQ空间")
/*
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}else{
    toastLog("请求成功")
    }
*/
try{
    captureScreen()
    }catch(err){
        toastLog(err)
        toastLog(requestScreenCapture())
        }
ztp()

function ztp(){

toastLog(1)
//连续截图10张图片(间隔1秒)并保存到存储卡目录
   
    sleep(3000);
var superMario = images.read("1.png");
toastLog(3)


var result = images.matchTemplate(captureScreen(), superMario, {
    threshold: 0.8
});
toastLog(result);

superMario.recycle();

if(result==""){
    
    toastLog("没有找到")
    swipe(500,1500,500,500,3000)
    ztp()
    }else{
        //var 
       result.matches.forEach(match => {
    log("point = " + match.point + ", similarity = " + match.similarity);
    click(match.point.x,match.point.y)
    input("ffg")
});
      ztp()
        };

};