"auto";

toast("开启开发者选项-指针位置或者在画画软件才能查看效果");

setScreenMetrics(1080, 1920);

var points = [10000];
var interval = 0.1;
var x0 = device.width / 2;
var y0 = device.height / 2;

for (var t = -3; t <= 3; t = t + 0.001) {
    //坐标系的 x,y
    var x = 16 * Math.pow(Math.sin(t), 3);
    var y = 13 * Math.cos(t) - 5 * Math.cos(t * 2) - 2 * Math.cos(t * 3) - Math.cos(t * 4);
    //增大心  
    x = x * 16;
    y = y * 16;
    //算出对于手机机的坐标 手机左上角是0,0
    x = x0 + x;
    y = y0 - y;
    //存入数组
    if (x < x0) {
        points.push([parseInt(x), parseInt(y)]);
    }
    if (x > x0) {
        points.push([parseInt(x), parseInt(y)]);
    }
}
gesture.apply(null, points);