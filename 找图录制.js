if (!requestScreenCapture()) {
    alert("提示", "请开起悬浮窗权限");
}
//获取通知栏高度
var notifHeight = context.getResources().getDimensionPixelSize(context.getResources().getIdentifier("status_bar_height", "dimen", "android"));

var window = floaty.rawWindow(
    <vertical bg="#01579B">
        <canvas margin="5" id="canvas" layout_weight="1"/>
        <relative>
            <horizontal>
                <button id="mClose" layout_weight="1" text="取消找图"/>
                <button layout_weight="1" text="重新截图"/>
                <button layout_weight="1" text="多点取色"/>
                <button layout_weight="1" text="截取图片"/>
                <button layout_weight="1" text="录制完成"/>
            </horizontal>
        </relative>
    </vertical>
);

window.setPosition(0, notifHeight);
setInterval(() => {
    if (context.getResources().getConfiguration().orientation == 1) {
        deviceH = device.height;
        deviceW = device.width;
        window.setSize(deviceW * 0.8, deviceH * 0.8);
    } else {
        deviceH = device.width;
        deviceW = device.height;
        window.setSize(deviceW * 0.5, deviceH * 0.8);
    }
}, 100);
mBitmap = captureScreen().getBitmap();
while (mBitmap == null) {
    mBitmap = captureScreen().getBitmap();
}
mBitWidth = mBitmap.getWidth();
mBitHeight = mBitmap.getHeight();

mPaint = new Paint();
window.canvas.on("draw", function(mCanvas) {    
    mCanvas.translate(0, 0);
    mCanvas.scale(1, 1);
    mCanvas.drawColor(colors.parseColor("#FAFAFA"));
    mCanvas.drawBitmap(mBitmap, 0, 0, mPaint);
});





window.canvas.setOnTouchListener(new android.view.View.OnTouchListener({
    onTouch: function(view, motionEvent) {
        fingerCount = motionEvent.getPointerCount();
        switch (motionEvent.getActionMasked()) {
            case motionEvent.ACTION_DOWN:
            
                break;
                case motionEvent.ACTION_POINTER_DOWN:
                break;
            case motionEvent.ACTION_MOVE:
            
                break;
            case motionEvent.ACTION_UP:

                break;
        }
        return true;
    }
}));


window.mClose.on("click", () => {
    window.close();
    mBitmap.recycle();
    exit();
});