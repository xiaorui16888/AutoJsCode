requestScreenCapture();
var window = floaty.window(
    <frame h="150">
     <img src="http://img03.sogoucdn.com/app/a/100520146/71316125981b3b548da388527ac92f65" />
        <text id="action" text="取色" color="#ffffff" bg="#00000000"/>
           </frame>
);

function capturescreen() {
    while (true) {
        if (ajt = captureScreen()) {
            return ajt;
            break;
        }
    }
}
setInterval(() => {}, 1000);
var execution = null;
aw = 0;
ah = 0;
//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:

            x = event.getRawX();
            y = event.getRawY();
            aw = window.getWidth();
            ah = window.getHeight();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            onchange();
            return true;
        case event.ACTION_UP:
            onchange();
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                //如果按下的时间超过0.2秒判断为长按，退出脚本
                if (new Date().getTime() - downTime > 200) {
                    setClip(window.action.getText());
                    window.action.setText("复制成功");
                } else {
                    onClick();
                }
            }

            return true;
    }
    return true;
});

function onchange() {
    ax = window.getX();
    ay = window.getY();
    bx = ax + (aw / 2);
    by = ay + (ah / 2);
    window.action.setText("点击取色并复制:" + "\nXy:" + bx + "," + by);
}

function onClick() {
    aw = window.getWidth();
    ah = window.getHeight();
    ax = window.getX();
    ay = window.getY();
    bx = ax + (aw / 2);
    by = ay + (ah / 2);
    ys = images.pixel(capturescreen(), bx, by);
    nr = ("Xy:" + bx + "," + by + "\n颜色:" + ys + "\n0x:" + colors.toString(ys) + "\nR:" + colors.red(ys) + " G:" + colors.green(ys) + " B:" + colors.blue(ys));
    window.action.setText(nr);
    setClip(nr);


}