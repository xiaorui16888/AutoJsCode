var window = floaty.window(
    <frame>
        <vertical>
            
            <text id="img" bg="#88000000" size="12" color="#ffffff" text="每秒更新1000次文本测试" w="100" h="60"/>
            
        </vertical>
    </frame>
);

var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.img.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置

            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));

            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                threads.start(function() {
                    onClick();
                });
            }
            return true;
    }
    return true;
});




window.img.post(threads.start(function() {
    threads.start(function() {
        ikl = 1;
        while (true) {
            ikl++;
            window.img.text("每秒更新1000次文本测试\n第" + ikl + "次");
            //sleep(10);
        }
    });
}));



while (true) {
    sleep(1000);
}