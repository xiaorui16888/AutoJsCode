requestScreenCapture();

function ꙮ() {
  while (true) {
    if (ajt = captureScreen()) {
      return ajt;
      break;
    }
  }
}//截图
function ꕥ() {
    new java.lang.Thread(function() {
        packageName("com.stardust.scriptdroid").className("android.widget.EditText").setText("点击确定->");
    }).start();
    console.rawInput("点击确定开始执行\nQQ:787067033", "");
}
while(true){
ꕥ();
ꕣ=(new Date()).getTime();
images.saveImage(ꙮ(), "/sdcard/测试截图"+ꕣ+".png");
console.info(ꕣ+"截图成功")
}  
    
    