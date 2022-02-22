"ui";
//作者 ╰つ゛无名小姐‭‮
//独乐乐不如众乐乐 分享最快乐
//研究了好久 看了网上的许多事例终于把相机做出来了
//本相机为原始版本 只提供了画面的预览
//有兴趣的朋友可以添加一些别的方法;比如拍照,聚光,美颜,录像等

//必须为auto.js最新版(全权限版本); 记得同意权限 否则报错

//本脚本调用的是Camera类 还有个Camera2也可以实现
//Camera这个类好像已经废弃了   有的手机可能不支持
//还有实现预览的布局也是  有的手机不支持
var linear = new android.widget.LinearLayout(activity);
var surface = new android.view.SurfaceView(activity);
linear.addView(surface);
ui.setContentView(linear);

camera = null;
var camera = android.hardware.Camera;
var holder = surface.getHolder();
//说明//
//camera.open(0);//0后置摄像头  1前置摄像头
//重要//退出必须清除Camera资源//否则回发生错误
//
//运行后点击一下手机屏幕就可以了
var mCamera = camera.open(0);
surface.setOnClickListener(new android.view.View.OnClickListener({
    onClick: function(viewarg) {
        mCamera.setPreviewDisplay(holder)
        mCamera.setDisplayOrientation(90);
      //  mCamera.stopPreview();
        mCamera.startPreview();
    }
}));

//还是蛮有成就感的