var colorBoard = depth(11).className("android.widget.AbsListView").findOne()
changeColor(0)
draw(180)
changeColor(2)
draw(140)
changeColor(0)
draw(100)
//draw(140)

function draw(threshold, mode) {
    var img = images.read("/sdcard/games/Mannix/draw/img.jpg")
    img_w = img.getWidth()
    img_h = img.getHeight()
    var img_l = images.fromBase64("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABHNCSVQICAgIfAhkiAAAAAtJREFU\nCJlj+A8EAAn7A/3jVfKcAAAAAElFTkSuQmCC\n")
    var img_l_o = img_l
    var length = 150
    img = images.resize(img, [length - 1, length], "LANCZOS4")
    if (Boolean(mode)) {
        img = images.inRange(img, colors.rgb(0, 0, 0), colors.rgb(threshold, threshold, threshold)) //越大越暗
    } else {
        img = images.inRange(img, colors.rgb(threshold, threshold, threshold), colors.rgb(255, 255, 255)) //越大越暗
    }
    for (var i = 0; i < length - 1; i++) {
        img_l = images.concat(img_l_o, img_l, "TOP")
    }
    img = images.concat(img, img_l)
    images.save(img, "/sdcard/games/Mannix/draw/img1.png")
    sleep(1000)
    board = className("android.view.View").depth(9).findOne()
    rect = board.bounds()
    rect_w = rect.width()
    rect_h = rect.height()
    rect_l = rect.left
    rect_t = rect.top
    var o_x
    var o_y
    var isPaint = false
    for (var y = 0; y < length; y++) {
        for (var x = 0; x < length; x++) {
            color = img.pixel(x, y)
            if (colors.red(color) < 128) {
                if (!isPaint) {
                    ox = x
                    oy = y
                    isPaint = true
                }
            } else {
                if (isPaint) {
                    line((ox + 0.5) / length, oy / length, (x - 0.5) / length, y / length)
                    isPaint = false
                }
            }
        }
        //changeColor(0)
        //line(0, (y + 1.5) / length, 1, (y + 1.5) / length)
        //changeColor(2)
    }
}

function line(ox, oy, x, y) {
    var k = img_h / img_w
    var sizeX = 0.8
    var sizeY = 0.9
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
toast("finish")