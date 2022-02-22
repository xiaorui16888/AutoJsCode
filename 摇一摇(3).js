console.show();

var sx;
//记录加速度值。
var f;
//记录左或右的方向。
var sAry = new Array;
//声明一个数组记录左右加速度。
function SensorFun(e,x,y,z) {
    var sa=sx;
    //记录上次值
    sx=x;
    //记录本次值
    if (sa) {
        //如果上次有值
        var a = f;
        //记录上次方向
        var s = sx-sa;
        //计算差值
        if (s > 0) {
            //差值大于0则为加速度增大
            f = 1;
            //记录方向为右
        } else {
            f = 2;
            //记录方向为左
        };
        if (a&&sAry.length) {
            //如果上次有方向且有加速度值。
            if (a != f) {
                sAry.push(s);
                //方向改变时添加(转向和加速度变化值)。
            } else {
                sAry[sAry.length - 1] += s;
                //没有转向叠加加速度变化值。
            };
        } else {
            sAry.push(s);
            //没有值添加值
        };
    };
    
    if (sAry.length >= 100) {
        for (var i = 0; i < 5; i++) {
            sAry.shift();
        };
    };
    //数组过长时清除一些值
    if (sAry.length >= 6) {
        //左右动作量超过6，开始判断动作是否为摇一摇。
        //摇一摇的动作为。右左右左右左。且每次加速度大于15。
        var  kg = true;
        for (let i = sAry.length - 5; i <sAry.length ; i++) {
            //循环判断每个值。
            if (Math.abs(sAry[i]) < 15) {
                //每次的加速度变化总量小于15。代表手机移动速度过小，这不是摇一摇的动作。
                kg = false;
                break;
            };
        };
        if (kg) {
            //每个动作都判断完了，确定是摇一摇的动作。
            toastLog("摇一摇");
            sAry=new Array;
            //清空已载入的所有动作。为下次判断做铺垫。
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