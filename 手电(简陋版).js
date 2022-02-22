"ui";
ui.layout(
<vertical gravity="center">
 <button id="button" text="开" w="auto"/>
</vertical>
)
//相机是做不出来了，所以只好做个手电了
//可能不稳定，原因可能是太快了 自己测试
var Camera=android.hardware.Camera;
var camera = Camera.open();
var mParameters = camera.getParameters();
ui.button.on("click", ()=>{
    if(ui.button.text()=="开"){
	mParameters.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);        
camera.setParameters(mParameters);
ui.button.setText("关");
on=true;
}else{
			mParameters.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);
			camera.setParameters(mParameters);
ui.button.setText("开");
    }
});
/*
ui.button.on("long_click",()=>{
    for(var i=0;i<10;i++){
    camera.setParameters(mParameters);
}
ui.button.setText("关");
});
*/