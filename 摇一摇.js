auto();
console.show();
var array = new Array;
var f;
var sAry = new Array;

function SensorFun() {
    var ary = new Array;
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'number') {
            ary.push(arguments[i]);
        };
    };
    // log(parseInt(ary[0]));
    array.push(ary[0]);
    if (array.length >= 2) {
        var a = f;
        var s = array[array.length - 1] - array[array.length - 2];
        if (s > 0) {
            f = 1;
            //上
        } else {
            f = 2;
            //下
        };
        if (a&&sAry.length) {
            if (a != f) {
                sAry.push(s);
                //图像转向时添加转向距离。
                //log(sAry[sAry.length - 1]);
            } else {
                sAry[sAry.length - 1] += s;
                //没有转向叠加距离。
            };
        } else {
            sAry.push(s);
        };
    };
    if (sAry.length >= 100) {
        for (var i = 0; i < 5; i++) {
            sAry.shift();
        };
    };
    if (array.length >= 100) {
        for (var i = 0; i < 5; i++) {
            array.shift();
        };
    };
    if (sAry.length >= 6) {
        var g;
        var  kg = true;
        for (let i = sAry.length - 5; i <sAry.length ; i++) {
            var h=g;
            if (Math.abs(sAry[i]) >= 15) {
                if (sAry[i] < 0) {
                    g = 2;
                    //下
                } else {
                    g = 1;
                };
                if (h) {
                    if (h == g) {
                        kg = false;
                        break;
                    };
                };
            } else {
                kg = false;
                break;
            };
        };
        if (kg) {
            toastLog("摇一摇");
            sAry=new Array;
        };
    };
};

var sensor = sensors.register('linear_acceleration', sensors.delay.ui);
if (sensor) {
    sensor.on('change', SensorFun);
} else {
    toastLog('不支持此传感器');
    exit();
};

function weiyi(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};