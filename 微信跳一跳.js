var screenWidth = device.width;
var screenHeight = device.height;
var distanceTimeRate = 1.33;
var targetPositionOffset = screenHeight * 0.012;
var ra = null;
var capture = null;

prepare();
main();

function touch(x, y, millsSecond){
    if(device.sdkInt >= 24){
        press(x, y, millsSecond);
    }else {
        ra = ra || (new RootAutomator());
        ra.press(x, y, millsSecond);
    }
}

function main(){
    toast("请在5秒内打开游戏，并点击开始按钮");
    waitForPackage("com.tencent.mm");
    sleep(5000);
    doLoop();
}

function doLoop(){
    device.keepScreenOn(3600 * 1000);
	for(var i = 1;i < 1000; i++){ 
        capture = captureScreen();
		if(!capture || currentPackage() != "com.tencent.mm" 
            || !doJump()){
            break;
        }
		sleep(1000);
    }
    device.cancelKeepingAwake();
}

function doJump(){ 
	var pos = getSelfPosition();
	if(!pos){
        return false;
    }
    var x = pos.x;
    var y = pos.y;
	var endX = screenWidth;
	var endY = screenHeight * 0.7;
	var startX = 0;
	var startY = screenHeight * 0.2;

	if(pos.x < screenWidth / 2){
		startX =  screenWidth / 2
    }else{
		endX = screenWidth / 2
    }
	
    var targetPos = getTargetPosition(startX, startY, endX, endY);
    targetX = targetPos.x;
    targetY = targetPos.y;
	var distance = Math.sqrt( (x - targetX) * (x - targetX) + (y - targetY) * (y - targetY));
	var pressTime = getHoldTime(distance);
	touch(100, 100, pressTime);
	return true;
}

function getSelfPosition(){
    var pos = findColor(capture, "#383653");
    if(!pos){
        return null;
    }
    pos.y += 0.08 * screenHeight;
    return pos;
}

function getTargetPosition(startX, startY, endX, endY){
	var step = 3
	var r, g, b, rr, gg, bb;
	for(var y = startY; y < endY; y += step){
        var color = capture.pixel(1, y);
        var r = colors.red(color);
        var g = colors.green(color);
        var b = colors.blue(color);
		for(var x = startX; x < endX; x += step){
            var c = capture.pixel(x, y);
            if(isColor(color, c, 98)){
                color = c;
            }else{
                return {
                    x: x,
                    y: y + targetPositionOffset
                }
            }
        }
    }
	return null;
}

function isColor(color1, color2, s) {
    var abs = Math.abs;
    s = Math.floor(0xff*(100-s)*0.01);
    var r = colors.red(color1);
    var g = colors.green(color1);
    var b = colors.blue(color1);
    var rr = colors.red(color2);
    var gg = colors.green(color2);
    var bb = colors.blue(color2);
    return abs(r-rr)<s && abs(g-gg)<s && abs(b-bb)<s;
}

function getHoldTime(distance){
    return distance * distanceTimeRate;
}

function prepare(){
    auto();
    requestScreenCapture();
    events.on("exit", function(){
        if(ra){
            ra.exit();
        }
    });
}