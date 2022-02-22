requestScreenCapture();
var window = floaty.rawWindow(
    <frame alpha="0.5">
  <img id="img" w="640" scaleType="fitStart"/>
</frame>
);
window.setTouchable(false);
threads.start(function(){
try{
sleep(1000);
var beishu=10;
    while (true) {
        ui.run(() => {
            window.img.setSource(
                images.clip(
                    captureScreen(),
                     beishu, beishu,  device.width- beishu * 2, device.height- beishu * 2
                )
            );
        });
    };
    }catch(e){toast("运行失败，请重新尝试");}
});