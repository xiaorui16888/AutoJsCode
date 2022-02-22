Camera=android.hardware.Camera;
importClass(android.graphics.SurfaceTexture);
importClass(android.content.pm.PackageManager);
checkFlashlight();//检测有没有闪光灯
console.show();
while(true){
log("闪");
 sleep(100);
openFlashlight();//开灯
 sleep(100);
closeFlashlight();//关灯
}




// 检测当前设备是否配置闪光灯
function checkFlashlight(view){
	if (!context.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_FLASH)) {
		toast("当前设备没有闪光灯");
		return false;
	}
    toast("有闪光灯");
	return true;
}
// 打开闪光灯
function openFlashlight() {
 //try {
  mCamera = Camera.open();
  var textureId = 0;
    mCamera.setPreviewTexture(new SurfaceTexture(textureId));
    mCamera.startPreview();
    mParameters = mCamera.getParameters();
    mParameters.setFlashMode(Camera.Parameters.FLASH_MODE_TORCH);
    mCamera.setParameters(mParameters);
}

// 关闭闪光灯
function closeFlashlight() {
  if (mCamera != null) {
    mParameters = mCamera.getParameters();
    mParameters.setFlashMode(Camera.Parameters.FLASH_MODE_OFF);
    mCamera.setParameters(mParameters);
    mCamera.stopPreview();
    mCamera.release();
    mCamera = null;
  }
}