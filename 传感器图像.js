"ui";
ui.layout(
    <vertical bg="{{colors.toString(colors.GRAY)}}">
        <text id="text" w="*" text="重力传感器" gravity="center"/>
        <img id="img" w="*"/>
        <list id="list" w="*">
            <vertical w="*"  margin="5">
                <text w="*" text="{{name}}" gravity="center" />
                <text w="*" text="{{value}}" gravity="center"/>
            </vertical>
        </list>
    </vertical>
);

//importClass(android.graphics.Paint);
//importClass(android.graphics.Canvas);
//importClass(android.graphics.Bitmap);
var SensorAry = new Array;
//忽略不支持的传感器，即使有传感器不支持也不抛出异常
//sensors.ignoresUnsupportedSensor = true;
var sensorsList = [{
        value: "accelerometer",
        name: "加速度传感器"
    },
    {
        value: "orientation",
        name: "方向传感器"
    },
    {
        value: "gyroscope",
        name: "陀螺仪传感器"
    },
    {
        value: "magnetic_field",
        name: "磁场传感器"
    },
    {
        value: "gravity",
        name: "重力传感器"
    },
    {
        value: "linear_acceleration",
        name: "线性加速度传感器"
    },
    {
        value: "ambient_temperature",
        name: "环境温度传感器"
    },
    {
        value: "light",
        name: "光线传感器"
    },
    {
        value: "pressure",
        name: "压力传感器"
    },
    {
        value: "proximity",
        name: "距离传感器"
    },
    {
        value: "relative_humidity",
        name: "湿度传感器"
    }
];

ui.list.setDataSource(sensorsList);

//传感器
var sensor = sensors.register("gravity", sensors.delay.ui);
if (sensor) {
    sensor.on("change", function() {
        var ary = new Array;
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == "number") {
                ary.push(arguments[i]);
            };
        };
        SensorAry.push(ary);
        if (SensorAry.length >= 200) {
            for (var i = 0; i < 5; i++) {
                SensorAry.shift();
            };
        };
    });
} else {
    toastLog("不支持此传感器");
};

ui.list.on("item_click", function(item, i, itemView, listView) {
//传感器
var newsensor = sensors.register(item.value, sensors.delay.ui);
if (newsensor) {
    ui.run(()=>{
        ui.text.setText(item.name);
        });
    sensors.unregister(sensor);
    sensor=newsensor;
    sensor.on("change", function() {
        var ary = new Array;
        for (var i = 0; i < arguments.length; i++) {
            if (typeof arguments[i] == "number") {
                ary.push(arguments[i]);
            };
        };
        SensorAry.push(ary);
        if (SensorAry.length >= 200) {
            for (var i = 0; i < 5; i++) {
                SensorAry.shift();
            };
        };
    });
} else {
    toastLog("不支持此传感器");
};
    
});

var paint = new android.graphics.Paint;
paint.setStrokeWidth(5);
paint.setTextAlign(Paint.Align.CENTER); //写字左右中心
var bitmap = android.graphics.Bitmap.createBitmap(1000, 1000, android.graphics.Bitmap.Config.ARGB_8888);
var canvas = new android.graphics.Canvas(bitmap);
threads.start(function() {
    sleep(250);
    bitmap = android.graphics.Bitmap.createBitmap(ui.img.getWidth(), ui.img.getHeight(), android.graphics.Bitmap.Config.ARGB_8888);
    canvas = new android.graphics.Canvas(bitmap);
});
var TouchPoints = new Array;

var rainbowColor = [{
        色: "赤色",
        值: [255, 0, 0]
    },
    {
        色: "橙色",
        值: [255, 165, 0]
    },
    {
        色: "黄色",
        值: [255, 255, 0]
    },
    {
        色: "绿色",
        值: [0, 255, 0]
    },
    {
        色: "青色",
        值: [0, 127, 255]
    },
    {
        色: "蓝色",
        值: [0, 0, 255]
    },
    {
        色: "紫色",
        值: [139, 0, 255]
    }
];


setInterval(() => {
    if (!bitmap || !canvas) {
        return;
    };
    //清除图像
    bitmap.eraseColor(0);
    var w = canvas.getWidth(),
        h = canvas.getHeight();

    paint.setColor(colors.BLACK);
    canvas.drawLine(50, 0, 50, h, paint);
    canvas.drawLine(0, h / 2, w, h / 2, paint);

    var x = w * 0.9,
        y = h * 0.5;
    var sw = 15,
        sh = 25;
    for (var i = -20; i <= 20; i++) {

        var hy = y - i * sh;
        paint.setARGB(31, 0, 0, 0);
        canvas.drawLine(0, hy, w, hy, paint);
        paint.setARGB(127, 0, 0, 0);
        paint.setStrokeWidth(1); //边缘宽度  
        paint.setStyle(Paint.Style.FILL); //实心样式  
        var size = 30;
        paint.setTextSize(size);
        canvas.drawText(String(i), 25, hy + 0.365 * size, paint);

    };
    paint.setStrokeWidth(5); //边缘宽度  
    for (var i = 1; i <= SensorAry.length; i++) {
        var ary = SensorAry[SensorAry.length - i];
        var bary = SensorAry[SensorAry.length - i - 1];
        var X = x - i * sw;
        var bX = x - (i + 1) * sw;
        if (bary) {
            for (var ii = 0; ii < ary.length; ii++) {
                var cy = y - ary[ii] * sh;
                var bcy = y - bary[ii] * sh;
                if(cy<0){sh=Math.floor(y/ary[ii])};
                if (bcy) {
                    paint.setColor(colors.rgb.apply(colors, rainbowColor[ii].值));
                    canvas.drawLine(X, cy, bX, bcy, paint);
                };
            };
        };
    };



    paint.setStyle(Paint.Style.STROKE);
    paint.setColor(colors.RED);
    for (var i = 0; i < TouchPoints.length; i++) {
        //break;
        try {
            if (!TouchPoints[i]) {
                continue;
            };
            var X = TouchPoints[i].X,
                Y = TouchPoints[i].Y,
                x = TouchPoints[i].x,
                y = TouchPoints[i].y;
            canvas.drawCircle(X, Y, 200, paint);
            //canvas.drawCircle(X, Y, 100, paint);
            var S = weiyi([x - X, y - Y]);
            var A = getsd(S <= 250 ? S : 250, [x - X, y - Y]);
            canvas.drawLine(X, Y, X + A[0], Y + A[1], paint);
            canvas.drawCircle(X + A[0], Y + A[1], 100, paint);
            if (TouchPoints[i + 1]) {
                var x1 = TouchPoints[i + 1].x,
                    y1 = TouchPoints[i + 1].y;
                //canvas.drawLine(x, y, x1, y1, paint);
            };
        } catch (e) {
            log(e)
        };
    };

    ui.run(() => {
        ui.img.setImageBitmap(bitmap);
    });
}, 10);

ui.img.setOnTouchListener(function(view, event) {
    try {
        switch (event.getAction() <= 2 ? event.getAction() : Math.abs(event.getAction() % 2 - 1)) {
            case event.ACTION_DOWN:
                var i = Math.floor(event.getAction() / 256);
                var id = event.getPointerId(i);
                var X = event.getX(i);
                var Y = event.getY(i);
                TouchPoints[id] = {
                    X: X,
                    Y: Y,
                    x: X,
                    y: Y
                };
                if (!id) {
                    bitmap = android.graphics.Bitmap.createBitmap(view.getWidth(), view.getHeight(), android.graphics.Bitmap.Config.ARGB_8888);
                    canvas = new android.graphics.Canvas(bitmap);
                };
                break;
            case event.ACTION_MOVE:
                var PC = event.getPointerCount();
                for (var i = 0; i < PC; i++) {
                    var id = event.getPointerId(i);
                    var X = event.getX(i);
                    var Y = event.getY(i);
                    X = (0 <= X && X < view.width - 1) ? X : (0 <= X ? view.width - 1 : 0);
                    Y = (0 <= Y && Y < view.height - 1) ? Y : (0 <= Y ? view.height - 1 : 0);
                    TouchPoints[id].x = X;
                    TouchPoints[id].y = Y;
                };
                break;
            case event.ACTION_UP:
                var i = Math.floor(event.getAction() / 256);
                var id = event.getPointerId(i);
                TouchPoints[id] = undefined;
                break;
        };
        return true;
    } catch (e) {
        toastLog("Touch: " + e);
        return true;
    };
});



function getsd(s, ary) {
    var sum = weiyi(ary);
    var S = (s / sum) || 0;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};

function weiyi(ary) {
    var sum = 0;
    for (var i = 0; i < ary.length; i++) {
        sum += Math.pow(ary[i], 2);
    };
    return Math.sqrt(sum);
};

function kdfx(Y) {
    var x = Math.cos(Y % 360 / 360 * 2 * Math.PI);
    var y = Math.sin(Y % 360 / 360 * 2 * Math.PI);
    return [x, y];
};




脚本备份();

function 脚本备份(path) {
    path = path || "/sdcard/备份脚本";
    var file = new java.io.File(path);
    var fromfile = String(engines.myEngine().getSource());
    var filename = new java.io.File(fromfile).getName();
    if (!file.isDirectory()) {
        if (!file.mkdirs()) {
            log("夹失败");
        };
    };
    var txt = files.read(fromfile);
    files.write(files.join(path, filename), txt);
};

/*
function eraseColor() {
void eraseColor(int)
}

*/