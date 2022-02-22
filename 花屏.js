requestScreenCapture();
var window = floaty.rawWindow(
    <frame alpha="0.7">
  <img id="img"/>
</frame>
);
window.setSize(-1,-1);
window.setTouchable(false);
threads.start(function(){
try{
sleep(1000);
var beishu=0;
    while (true) {
        ui.run(() => {
            window.img.setSource(
                    captureScreen()
            );
        });
    };
    }catch(e){toast("运行失败，请重新尝试");}
});