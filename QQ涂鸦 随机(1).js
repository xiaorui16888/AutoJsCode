var colorBoard = depth(11).className("android.widget.AbsListView").findOne()
/*changeColor(0)
draw(160)
changeColor(2)
draw(120)
changeColor(0)
draw(80)*/
draw(64)

function draw(threshold, mode) {
    var path = "/storage/emulated/0/games/Mannix/draw/file1/"
    var img = images.read(path + files.listDir(path)[0]);

    //var img = images.read("/sdcard/games/Mannix/draw/img.jpg")
    img_w = img.getWidth()
    img_h = img.getHeight()
    var img_l = images.fromBase64("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABHNCSVQICAgIfAhkiAAAAAtJREFU\nCJlj+A8EAAn7A/3jVfKcAAAAAElFTkSuQmCC\n")
    var img_l_o = img_l
    var length = 128
    img = images.resize(img, [length - 1, length - 1], "LANCZOS4")
    if (Boolean(mode)) {
        img = images.inRange(img, colors.rgb(0, 0, 0), colors.rgb(threshold, threshold, threshold)) //越大越暗
    } else {
        img = images.inRange(img, colors.rgb(threshold, threshold, threshold), colors.rgb(255, 255, 255)) //越大越暗
    }
    for (var i = 0; i < length - 2; i++) {
        img_l = images.concat(img_l_o, img_l, "TOP")
    }
    img = images.concat(img, img_l, "RIGHT")
    img_l = img_l_o
    for (var i = 0; i < length; i++) {
        img_l = images.concat(img_l_o, img_l, "RIGHT")
    }
    img = images.concat(img, img_l, "BOTTOM")
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
    for (var n = 0; n < 256; n++) {
        var r1 = Math.random()
        var r2 = Math.random()
        r1 = [r1, r1]
        r2 = [r2, r2]
        r1[Math.floor(Math.random() * 2)] = Math.round(Math.random())
        r2[Math.floor(Math.random() * 2)] = Math.round(Math.random())
        print(r1+";"+r2)
        var length0 = Math.sqrt(Math.pow(r1[0] - r2[0], 2) + Math.pow(r1[1] - r2[1], 2));

        for (var k = 0; k < length0; k += 0.5/(length+0.05)) {
            x = Math.min(Math.max((r1[0] + (r2[0] - r1[0]) * k )*length,0),length-1)
            y = Math.min(Math.max((r1[1] + (r2[1] - r1[1]) * k )*length,0),length-1)
            color = img.pixel(x, y)
            if (colors.red(color) < 128) {
                if (!isPaint) {
                    ox = x
                    oy = y
                    isPaint = true
                }
            } else {
                if (isPaint) {
                    line((ox + 0.0)/length , (oy + 0.0)/length, (x - 0.0)/length , (y/length - 0.0))
                    isPaint = false
                }
                isPaint = false
            }
        }
        //changeColor(0)
        //line(0, (y + 1.5) / length, 1, (y + 1.5) / length)
        //changeColor(2)
    }
}

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
toast("finish")