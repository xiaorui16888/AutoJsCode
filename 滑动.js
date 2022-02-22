auto();
console.show();
var kg = false;
var ji = 0;


function SensorFun() {
    var ary = new Array;
    for (var i = 0; i < arguments.length; i++) {
        if (typeof arguments[i] == 'number') {
            ary.push(arguments[i]);
        };
    };
    if (!kg) {
        var j = 0;
        if (weiyi(ary) >= 1) {
            if (Math.abs(ary[0]) >= Math.abs(ary[1])) {
                if (ary[0] <= 0) {
                    //log(1);
                    j = 1;
                    if (ji == 2) {
                        log("下");
                        scrollDown();
                        //swipe(device.width/2,device.height/2,);
                    };
                } else {
                    //log(2);
                    j = 2;
                    if (ji == 1) {
                        log("上");
                        scrollUp();

                    };
                };
            } else {
                if (ary[1] <= 0) {
                    //log(3);
                    j = 3;
                    if (ji == 4) {
                        log("右");
                        scrollDown();

                    };
                } else {
                    //log(4);
                    j = 4;
                    if (ji == 3) {
                        log("左");
                        scrollUp();
                    };
                };
            };
            if (ji) {
                kg = true;
                setTimeout(() => {
                    kg = false;
                }, 300);
            };
            if (ji != j) {
                ji = j;
            };
            setTimeout(() => {
                ji = 0;
            }, 300);
        };
    };
};

var sensor = sensors.register('gyroscope', sensors.delay.ui);
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