//by Mannix QQ 3068758340
//date 6-14-2019
//下面这行的文件路径自己写

var json = Object.assign(j("cn"),j("en"));
toast("读取完成");
var window = floaty.rawWindow(
    <frame gravity="center">
        <button id="button" h="*" w="*" />
    </frame>
);
window.exitOnClose();
window.button.click(() => {
    threads.start(function() {
        onClick();
    })
});
window.button.setBackgroundColor(colors.argb(0, 255, 255, 255))
setInterval(() => {
    ui.run(function() {
        var send = depth(10).text("发送").packageName("com.tencent.mobileqq").find()
        if (!send.empty()) {
            var rect = send[0].bounds();
            window.setPosition(rect.left, rect.top);
            window.setSize(rect.width(), rect.height());
        } else {
            window.setPosition(0, 0);
            window.setSize(0, 0);
        }
    });
}, 100);

function onClick() {
    var send = depth(10).text("发送").packageName("com.tencent.mobileqq").find()[0]
    accessibilityFocused(false).className("android.widget.ImageView").clickable(true).column(-1).columnCount(0).columnSpan(-1).contextClickable(false).depth(9).dismissable(false).drawingOrder(6).editable(false).enabled(true).focusable(true).indexInParent(5).findOne().click();
    var doodling = desc("涂鸦按钮").find();
    while (doodling.empty()) {
        var rect = clickable(false).depth(8).scrollable(true).findOne().bounds();
        swipe((rect.right + rect.centerX()) / 2, rect.centerY(), (rect.left + rect.centerX()) / 2, rect.centerY(), 10);
        doodling = desc("涂鸦按钮").find();
    }
    doodling.click();
    var input = className("android.widget.EditText").depth(9).findOne();
    input.setText("");
    paint(input.text());
}

function paint(str) {
    threads.shutDownAll();
    var thread = threads.start(function() {
        str = str.split("");
        var sizeY = Math.ceil(Math.sqrt(str.length));
        var sizeX = 0;
        while (sizeX * sizeY < str.length) {
            sizeX++;
        }
        print(sizeX + ";" + sizeY)
        for (var ty = 0; ty < sizeY; ty++) {
            for (var tx = 0; tx < sizeX; tx++) {
                var word = str.shift();
                if (json[word]) {                    
                    board = className("android.view.View").depth(9).accessibilityFocused(false).indexInParent(0).longClickable(false).editable(false).enabled(true).focusable(false).drawingOrder(2).findOne();
                    rect = board.bounds();
                    rect_w = rect.width() * 0.8;
                    rect_h = rect.height();
                    rect_l = rect.left + rect_w * 0.1;
                    rect_t = rect.top;
                    var date = json[word];
                    for (var m = 0; m < date.length; m++) {
                        for (var n = 0; n < date[m].length - 2; n += 2) {
                            try {
                                className("android.view.View").depth(9).accessibilityFocused(false).indexInParent(0).longClickable(false).editable(false).focusable(false).drawingOrder(2).findOne();
                                swipe(rect_l + (rect_w / sizeX) * (tx + date[m][n] / 1000), rect_t + (rect_h / sizeY) * (ty + date[m][n + 1] / 1000), rect_l + (rect_w / sizeX) * (tx + date[m][n + 2] / 1000), rect_t + (rect_h / sizeY) * (ty + date[m][n + 3] / 1000), 10);
                            } catch (e) {
                                print(e + "；" + m + "；" + n + "；");
                            }
                        }
                    }
                }
            }
        }
        text("发送").longClickable(false).indexInParent(1).editable(false).drawingOrder(2).dismissable(false).depth(10).contextClickable(false).clickable(true).className("android.widget.Button").findOne().click();
    });
}
function j(name){
    return JSON.parse(files.read("/sdcard/脚本/笔画库/"+name+".json"));
    }