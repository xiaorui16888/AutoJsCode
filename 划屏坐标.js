sleep(1000);
device.wakeUp();
sleep(700);
swipe(device.width / 2, device.height * 0.8, device.width / 2, device.height * 0.2, 500);
jieshuo("1425397"); //自定义解锁手势
//九宫格自定义手势，如“U”就写为"1793"
// 1  2  3
// 4  5  6
// 7  8  9
exit();

function jieshuo(password) {
    var zuobiao = [];
    zuobiao[1] = [240, 850];
    zuobiao[2] = [540, 850];
    zuobiao[3] = [840, 850];
    zuobiao[4] = [240, 1150];
    zuobiao[5] = [540, 1150];
    zuobiao[6] = [840, 1150];
    zuobiao[7] = [240, 1450];
    zuobiao[8] = [540, 1450];
    zuobiao[9] = [840, 1450];
    var points = [];

    for (var i = 0; i < password.length; i++) {
        sleep(100);
        num = parseInt(password.charAt(i));
        points[i] = zuobiao[num];
    }
    sleep(100);
    gesture(3000, points);
}