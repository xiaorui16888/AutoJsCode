//屏幕九宫格手势解锁脚本
//第9行自定义你的解锁手势
//第18-21行自定义解锁坐标系数
//此脚本仅用于Android7.0以上，免root
auto();
sleep(1000);
KeyCode("KEYCODE_POWER");
swipe(device.width / 2, device.height * 0.7, device.width / 2, device.height * 0.3, 500);
jieshuo("1793");  //自定义解锁手势
//九宫格自定义手势，如“U”就写为"1793"
// 1  2  3
// 4  5  6
// 7  8  9
exit();

function jieshuo(password) {
    //此系数适用小米6，其它机型或APP解锁需调系数与之适配
	var x1 = device.width * 0.21;  //自定义九宫格"1"的X坐标值，用系数调整。
	var y1 = device.height * 0.50; //自定义九宫格"1"的Y坐标值，用系数调整。
	var x5 = device.width / 2;     //九宫格"5"的X坐标值，无需调整。
	var y5 = device.height * 0.68; //自定义九宫格"5"的Y坐标值，用系数调整。
    
	var dx = x5 - x1;
	var dy = y5 - y1;
    var points = [];
    
	for (var i = 0; i < password.length; i++) {
		sleep(200);
		num = parseInt(password.charAt(i));
        var py = Math.floor((num - 1) / 3);
        var px = num - 3 * py - 1;
        points[i] = [x1 + px * dx, y1 + py * dy];
	}
	sleep(200);
    gesture(1000, points);
}