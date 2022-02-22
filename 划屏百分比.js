sleep(5000);
device.wakeUpIfNeeded()
sleep(700);
swipe(device.width / 2, device.height * 0.8, device.width / 2, device.height * 0.2, 600);
jieshuo("246"); //自定义解锁手势
//九宫格自定义手势，如“U”就写为"1793"
// 1  2  3
// 4  5  6
// 7  8  9
exit();

function jieshuo(password) {
    //此系数适用一加5t，其它机型或APP解锁需调系数与之适配
    var x1 = device.width * 0.25; //自定义九宫格"1"的X坐标值，用系数调整。
    var y1 = device.height * 0.6; //自定义九宫格"1"的Y坐标值，用系数调整。
    var x5 = device.width / 2; //九宫格"5"的X坐标值，无需调整。
    var y5 = device.height * 0.7; //自定义九宫格"5"的Y坐标值，用系数调整。   
    var dx = x5 - x1;
    var dy = y5 - y1;
    var points = [];
    for (var i = 0; i < password.length; i++) {
        sleep(100);
        num = parseInt(password.charAt(i));
        var py = Math.floor((num - 1) / 3);
        var px = num - 3 * py - 1;
        points[i] = [x1 + px * dx, y1 + py * dy];
    }
    sleep(300);
    gesture(2000, points);
}