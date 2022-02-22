"ui";

/**
 *作者QQ: 1811588980
 *完成时间: 2019年4月2日 下午11:55:30
 *测试机型: PD1813D
 *Auto.js版本: Pro 7.0.0-4
 *屏幕: 1080*2280
 *API: 27
 *备注: 。
 **/


var FGH = {
    //需要用到的Android类。
    Camera: android.hardware.Camera,
    //AutoFocusCallback: android.hardware.Camera.AutoFocusCallback,
    //PictureCallback: android.hardware.Camera.PictureCallback,
    //ErrorCallback: android.hardware.Camera.ErrorCallback,
    PackageManager: android.content.pm.PackageManager,
    SurfaceView: android.view.SurfaceView,
    SurfaceHolder: android.view.SurfaceHolder,
    //Callback: android.view.SurfaceHolder.Callback,
    Bitmap: android.graphics.Bitmap,
    BitmapFactory: android.graphics.BitmapFactory,
    Matrix: android.graphics.Matrix,
    View: android.view.View,
    //OnClickListener:android.view.View.OnClickListener,
};



ui.layout(
    <vertical>
        <frame>
            <android.view.SurfaceView id="surface"/>
            <button id="pz" w="auto"h="auto" text="拍照" layout_gravity="bottom|center_horizontal"/>
            <progressbar id="search" w="auto" h="auto" layout_gravity="center"/>
        </frame>
    </vertical>
);

ui.run(() => {
    ui.pz.setText("拍照");
    ui.search.setVisibility(8);
});


/** Check if this device has a camera */
function checkCameraHardware(context) {
    if (context.getPackageManager().hasSystemFeature(FGH.PackageManager.FEATURE_CAMERA)) {
        // this device has a camera 
        return true;
    } else {
        // no camera on this device
        return false;
    }
};


if (!checkCameraHardware(context)) {
    throw "没有摄像头权限";
};
toastLog("摄像头数量: " + FGH.Camera.getNumberOfCameras());



var mCamera;
try {
    //打开第1个(默认第1个)摄像头。
    mCamera = FGH.Camera.open();
} catch (e) {
    throw e;
};

//添加错误的回调。
mCamera.setErrorCallback(function(mCamera) {
    toastLog("有错误发生");
});

//toastLog(mCamera.getParameters());

if (parseInt(device.release) >= 9) {
    //摄像头在正面还是反面？(Android9.0以上有效)
    toastLog(FGH.Camera.getCameraInfo());
};

var surface = ui.surface;

var holder = surface.getHolder();

// 已弃用的设置，但在3.0之前的Android版本上需要此设置
holder.setType(FGH.SurfaceHolder.SURFACE_TYPE_PUSH_BUFFERS);

//添加控件的回调事件。回调的意思是。当什么什么情况下，怎么怎么做？
holder.addCallback(new FGH.SurfaceHolder.Callback({
    surfaceCreated: function(holder) {
        //SurfaceView&SurfaceHolder的创建完成回调
        try {
            mCamera.setPreviewDisplay(holder);
            mCamera.setDisplayOrientation(90);
            mCamera.startPreview();
        } catch (e) {
            throw "Error setting camera preview: " + e.getMessage();
        }
    },
    surfaceChanged: function(holder, format, width, height) {
        // 如果允许预览可以更改或旋转，可以在这里处理这些事件
        //mCamera.stopPreview();
        //this.surfaceCreated(holder);
    },
    surfaceDestroyed: function(holder) {
        //结束。
    },
}));


events.on("exit", function() {
    log("结束运行");
    //释放摄像头资源。
    //摄像头是手机所有应用程序的共用设备。
    //需要回收以便其他软件使用。
    mCamera.stopPreview();
    mCamera.release();
});

mCamera.setOneShotPreviewCallback(new FGH.Camera.PreviewCallback({
    onPreviewFrame: function(data, camera) {
        //data为bytes数据;
        //这里可以做一些二维码识别的功能。
        //let bitmap=FGH.BitmapFactory.decodeByteArray(data, 0, data.length);

    },
}));




var mPictureCallback = new FGH.Camera.PictureCallback({
    onPictureTaken: function(data, camera) {
        camera.startPreview();
        //data为bytes数据;
        //toastLog("开始");
        //resource = FGH.BitmapFactory.decodeByteArray(data, 0, data.length);
        //matrix = new FGH.Matrix();
        // 拍出来的照片默认是横向的
        //matrix.setRotate(90);
        // 裁剪
        //bitmap = FGH.Bitmap.createBitmap(resource, startX, startY, newWidth, newHeight, matrix, false); 
        //log(saveimg("./IMG.png", resource));
        //resource.recycle();
        let img = images.fromBytes(data);
        //保存图片用的时间太长了。
        images.save(img, "./myImg.png", "png", 100);
        img.recycle();
        //mCamera.stopPreview();
        toastLog("图片保存成功");
        //camera.startPreview();
        ui.run(() => {
            ui.pz.setText("拍照");
            ui.search.setVisibility(8);
        });

    },
});

//点击拍照按钮。
ui.pz.setOnClickListener(new FGH.View.OnClickListener({
    onClick: function(view) {
        if (view.getText() == "拍照") {
            mCamera.takePicture(null, null, mPictureCallback);
            //mCamera.stopPreview();

            /*
            //这个有拍照声音。
            mCamera.takePicture(new FGH.Camera.ShutterCallback({
                //onShutter: function() {
                //    },
            }), null, mPictureCallback);
            */
            //mCamera.startPreview();
            //toastLog("点击");
            ui.run(() => {
                view.setText("正在保存");
                ui.search.setVisibility(0);
            });
        };
    },
}));


//存画
function saveimg(path, bitmap) {
    path = files.path(path);
    log(path);
    try {
        var file = new java.io.File(path);
        var fileOutput = new java.io.FileOutputStream(file);
        bitmap.compress(android.graphics.Bitmap.CompressFormat.PNG, 100, fileOutput);
        return true;
    } catch (e) {
        return false;
    }
}