/*
比如你有几个控件要找控件如下:

----------
var A1 = text("新的朋友").findOne();
var B1 = text("新的朋友").findOne();
var C1 = text("新的朋友").findOne();
var C2 = text("新的朋友").findOne();
var D1 = text("新的朋友").findOne();
var D2 = text("新的朋友").findOne();
var D3 = text("新的朋友").findOne();

----------
你要点击控件A1,则
ddd(A1);

你要点击控件B1,则
ddd(B1)

你要点控件D3,点击10次,每次间隔1秒
ddd(D3,10,1000);

……
以此类推

*/

function ddd(butt_, for_time, interval) {
    //3个参数自带坐标偏移
    //1.找到的控件 2.点击该控件次数 3.点击延迟
    if (!for_time) {
        for_time = 1; //没输入则默认为点击1次
    }
    if (!interval) {
        interval = 200; //没输入则默认为点击后延迟200ms
    }
    let bb = butt_.bounds();
    while (for_time--) {
        click(bb.centerX() + random(-10, 10), bb.centerY() + random(-10, 10));
        sleep(interval);
    }
}