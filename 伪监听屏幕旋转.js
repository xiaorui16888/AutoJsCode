/**
 * 伪监听屏幕旋转
 * 备注 : 使用定时器监听屏幕的方向改变 囧rz
 */

let isHorizontalScreen = function() {
    let config = context.getResources().getConfiguration();
    let ori = config.orientation;
    if (ori == config.ORIENTATION_LANDSCAPE) {
        //横屏
        return true;
    } else if (ori == config.ORIENTATION_PORTRAIT) {
        //竖屏
        return false;
    }
}

let isHorizontal = isHorizontalScreen();

setInterval(() => {
    if (isHorizontal != isHorizontalScreen()) {
        isHorizontal = isHorizontalScreen();
        toastLog(isHorizontal ? "横屏" : "竖屏");
    }
}, 1000)