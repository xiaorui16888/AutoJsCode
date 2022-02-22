auto();
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}
var i=0;
threads.start(function(){
    sleep(500);
    i=i+1;
});
while(true){
var img=captureScreen();
var point1 = findColor(img, "#000000", {
     region: [90,1000, 5, 20],
     threshold: 0
 });
 var point2 = findColor(img, "#000000", {
     region: [360, 1000, 5, 20],
     threshold: 0
 });
  var point3 = findColor(img, "#000000", {
     region: [660, 1000, 5, 20],
     threshold: 0
 });
  var point4 = findColor(img, "#000000", {
     region: [900, 1000, 5, 20],
     threshold: 0
 });
 
 if(point1){click(90,1050+i)};
 if(point2){click(360,1050+i)};
 if(point3){click(660,1050+i)};
 if(point4){click(900,1050+i)};
 sleep(5);

}