//by Mannix QQ 3068758340
//date 6-14-2019

var text = "" + getClip();
text = text.split("");
var sizeY = Math.floor(Math.sqrt(text.length));
var sizeX = 0;
var json = JSON.parse(files.read("/sdcard/脚本/中文笔画数据.json"));
while (sizeX * sizeY <= text.length) {
    sizeX++;
}
print(sizeX+";"+sizeY)
for (var ty = 0; ty < sizeY; ty++) {
    for (var tx = 0; tx < sizeX; tx++) {
        var word = text.shift();
        if (json[word]) {
            print(word)
            board = className("android.view.View").depth(9).bounds(0,1000,1080,1953).findOne();
            rect = board.bounds();
            rect_w = rect.width()*0.8;
            rect_h = rect.height();
            rect_l = rect.left+rect_w*0.1;
            rect_t = rect.top;
            var date = json[word];
            print(date)
            for (var m = 0; m < date.length; m++) {
                for (var n = 0; n < date[m].length-2; n += 2) {
                    try{
                    swipe(rect_l + (rect_w / sizeX) * (tx + date[m][n] / 1000), rect_t + (rect_h / sizeY) * (ty + date[m][n + 1] / 1000), rect_l + (rect_w / sizeX) * (tx + date[m][n + 2] / 1000), rect_t + (rect_h / sizeY) * (ty + date[m][n + 3] / 1000), 10)
                    }catch(e){print(e+"；"+m+"；"+n+"；")}
                }
            }
        }
    }
}
toast("finish")