auto();


var 笔画数据 = JSON.parse(files.read("./中文笔画数据.json"));

toastLog("导入笔画数据");
//drawTxt("有人吗",0,500);
//exit();

launchApp("QQ");

sleep(1000);

var colorBoard = depth(11).className("android.widget.AbsListView").findOne()
/*changeColor(0)
draw(160)
changeColor(2)
draw(120)
changeColor(0)
draw(80)*/
board = className("android.view.View").depth(9).findOne()
rect = board.bounds()
rect_w = rect.width()
rect_h = rect.height()
rect_l = rect.left
rect_t = rect.top
toastLog("找到画板");

click(device.width / 2, device.height / 2);

drawTxt("有人吗",rect_l,rect_t+rect_h/3);

toast("画完了");

function drawTxt(str, x, y, size, speed) {
    size = size || 300;
    speed = speed || Math.ceil(size);
    for (let it in str) {
        let T = str[it];
        let Ary = 笔画数据[T];
        for (let ii = 0; ii < Ary.length; ii++) {
            let ary = Ary[ii];
            let ry = [speed];
            for (let i = 0; i < ary.length - 1; i += 2) {
                ry.push([Math.floor(x + ary[i] / 1000 * size + size * it), Math.floor(y + ary[i + 1] / 1000 * size)]);
            };
            gesture.apply(null, ry);
        };
    };
};

function line(ox, oy, x, y) {
    var k = img_h / img_w
    var sizeX = 0.9
    var sizeY = 1
    if (k > 1) {
        sizeX = sizeX / k
    } else {
        sizeY = sizeY * k
    }
    ox = (ox - 0.5) * sizeX + 0.5
    oy = (oy - 0.5) * sizeY + 0.5
    x = (x - 0.5) * sizeX + 0.5
    y = (y - 0.5) * sizeY + 0.5
    swipe(ox * rect_w + rect_l, oy * rect_h + rect_t, x * rect_w + rect_l, y * rect_h + rect_t, 1)
}

function changeColor(n) {
    colorBoard.child(n).click()
}
