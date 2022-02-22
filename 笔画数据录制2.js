"ui";
/**
 *作者QQ: 1811588980
 *完成时间: 2019年6月15日
 *测试机型: vivo PD1813D
  *Auto.js版本: 4.1.0 Alpha5
  *Android版本: 8.1.0
  *屏幕: 1080*2280
  *API: 27
 *备注: 录制字符笔画数据。
**/

ui.layout(
    <vertical>
        <horizontal w="*">
            <input id="input" hint="请输入单个字符" layout_weight="1"/>
            <button id="but" text="录笔画"/>
        </horizontal>
        <text id="text" w="*"/>
        <canvas layout_weight="1" id="canvas" />
        <HorizontalScrollView  w="*"h="50" bg="#dddddd">
            <horizontal h="auto">
                <button id="but_A" layout_weight="1" h="auto" text="退笔"/>
                <button id="but_B" layout_weight="1" h="auto" text="清笔"/>
                <button id="but_D" layout_weight="1" h="auto" text="定字"/>
                <button id="but_E" layout_weight="1" h="auto" text="保存"/>
                <button id="but_C" layout_weight="1" h="auto" text="退字"/>
                <button id="but_F" layout_weight="1" h="auto" text="清字"/>
            </horizontal>
        </HorizontalScrollView>
    </vertical>
);




var storage = storages.create("AJ笔画录制");
var currentTxt = storage.get("txt", "");

//已录制的字符数据。
var MainStrokeAry = storage.get("json", new Array); //↓↓↓↓
/*元素
{
   txt:k,
   stroke:[[x,y,x,y,x,y,………],………]
}
*/
uiAddText();

//单个字符的笔画数据。
var strokeAry = new Array; //[[x,y,x,y,x,y,………],………]
//每笔的数据。
var strokePoints = new Array; //[x,y,x,y,x,y,………]

threads.start(function() {
    //console.show();
});


var paint = new Paint;
paint.setTextAlign(Paint.Align.CENTER);
paint.setStrokeWidth(5);
paint.setStyle(Paint.Style.STROKE);
paint.setARGB(255, 255, 0, 0);



var kg = false;
var jishi = 0;
//new android.graphics.RectF
ui.but.click(function() {
    let t = String(ui.input.getText());
    if (t && t.length == 1) {
        currentTxt = t;
        strokeAry = new Array;
    } else {
        toastLog("你输入的不对" + t);
    };
});

function uiAddText(){
    let T="";
    for(let i=0;i<MainStrokeAry.length;i++){
        let obj=MainStrokeAry[MainStrokeAry.length-1-i];
        T=obj.txt+","+T;
        if(i==6){
            T="…"+T;
            break;
        };
    };
    ui.run(()=>{
        ui.text.setText(MainStrokeAry.length+"个: "+T);
    });
};


ui.but_A.click(function() {
    strokeAry.pop();
});

ui.but_B.click(function() {
    strokeAry = new Array;
});
ui.but_C.click(function() {
    MainStrokeAry.pop();
    uiAddText();
});
ui.but_D.click(function() {
    MainStrokeAry.push({
        txt: currentTxt,
        stroke: strokeAry
    });
    uiAddText();
});


ui.but_E.click(function() {
    threads.start(function() {
        var p = dialogs.prompt("保存路径", storage.get("savePath", "/sdcard/脚本/LZ笔画数据.js"));

        if (p) {
            storage.put("savePath", p);
            let json = {};
            for (let obj of MainStrokeAry) {
                json[obj.txt] = obj.stroke;
            };

            files.write(p, JSON.stringify(json));
            //files.write(p, JSON.stringify(json,null,4));
            toastLog("成功");
        };
    });


});

ui.but_F.click(function() {
    MainStrokeAry=new Array;
    uiAddText();
});





events.on("exit", function() {
    
    storage.put("txt", currentTxt);
    storage.put("json", MainStrokeAry);

    //files.write(storage.get("savePath", "/sdcard/脚本/LZ动作.js"), );
});



ui.canvas.on("draw", (canvas) => {
    canvas.drawARGB(255, 127, 127, 127);
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    var textSize = w;
    paint.setTextSize(textSize);
    var AX = w / 2;
    var AY = h / 2;
    paint.setStyle(Paint.Style.STROKE);

    if (currentTxt) {
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(5);
        paint.setColor(colors.BLACK);
        let rect = new android.graphics.RectF(0, (h - w) / 2, w, (h - w) / 2 + w);
        canvas.drawRect(rect, paint);
        paint.setColor(colors.LTGRAY);
        canvas.drawText(currentTxt, w / 2, h / 2 + paint.getTextSize()*0.365, paint);

/*
        paint.setStyle(Paint.Style.FILL);
        paint.setStrokeWidth(4);
        paint.setColor(colors.RED);
        paint.setTextSize(50);
        canvas.drawText("已录制成功" + MainStrokeAry.length + "个", w / 2, paint.getTextSize() * 1.365, paint);
        canvas.drawLine(0, paint.getTextSize() * 1.365, w, paint.getTextSize() * 1.365, paint);
*/

        paint.setStyle(Paint.Style.STROKE);
        paint.setColor(colors.GREEN);

        for (let points of strokeAry) {
            for (let i = 0; i < points.length - 1; i += 2) {
                let x = points[i] / 1000 * w,
                    y = points[i + 1] / 1000 * w + (h - w) / 2;
                if (i == 0) {
                    canvas.drawCircle(x, y, 10, paint);
                } else {
                    let x1 = points[i - 2] / 1000 * w,
                        y2 = points[i - 1] / 1000 * w + (h - w) / 2;
                    canvas.drawLine(x1, y2, x, y, paint);
                    canvas.drawCircle(x, y, 10, paint);
                };
            };

        };
        for (let i = 0; i < strokePoints.length - 1; i += 2) {
            let x = strokePoints[i] / 1000 * w,
                y = strokePoints[i + 1] / 1000 * w + (h - w) / 2;
            if (i == 0) {
                canvas.drawCircle(x, y, 10, paint);
            } else {
                let x1 = strokePoints[i - 2] / 1000 * w,
                    y2 = strokePoints[i - 1] / 1000 * w + (h - w) / 2;
                canvas.drawLine(x1, y2, x, y, paint);
                canvas.drawCircle(x, y, 10, paint);
            };
        };
    } else {

        paint.setStyle(Paint.Style.FILL);
        paint.setStrokeWidth(5);
        paint.setColor(colors.GREEN);
        paint.setTextSize(60);
        canvas.drawText("请输入一个字符按按钮即可录制", w / 2, h / 2 + paint.getTextSize() * 0.365, paint);

    };

});


var RY;
var isMove = false;

function addPoint(X, Y) {
    X = Math.floor(X);
    Y = Math.floor(Y);
    if (strokePoints.length >= 4) {
        let x1 = strokePoints[strokePoints.length - 4];
        let y1 = strokePoints[strokePoints.length - 3];
        let x2 = strokePoints[strokePoints.length - 2];
        let y2 = strokePoints[strokePoints.length - 1];
        let FR1 = ydfx([x2 - x1, y2 - y1]);
        let FR2 = ydfx([X - x2, Y - y2]);
        if (Math.abs(FR2 - FR1) >= 15 && weiyi([x2 - x1, y2 - y1]) >= 50) {
            strokePoints.push(X, Y);
        } else {
            strokePoints[strokePoints.length - 2] = X;
            strokePoints[strokePoints.length - 1] = Y;
        };
    } else {
        strokePoints.push(X, Y);
    };
};

ui.canvas.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
    try {
        var W = view.getWidth();
        var H = view.getHeight();
        var PC = event.getPointerCount();
        switch (event.getActionMasked()) {
            case event.ACTION_MOVE:
                isMove = true;
                for (let i = 0; i < PC; i++) {
                    let id = event.getPointerId(i);
                    let X = event.getX(i);
                    let Y = event.getY(i);
                    if (i == 0) {
                        addPoint(X / W * 1000, (Y - (H - W) / 2) / W * 1000);
                    };
                };


                break;
            case event.ACTION_CANCEL:
                //log("CANCEL");
                kg = false;
                strokePoints = new Array;

                break;
            case event.ACTION_OUTSIDE:
                //log("OUTSIDE");

                break;
            default:
                var I = Math.floor(event.getAction() / 256);
                var ID = event.getPointerId(I);
                var X = event.getX(I);
                var Y = event.getY(I);
                var RX = event.getRawX();
                var RY = event.getRawY();
                switch (event.getActionMasked()) {
                    case event.ACTION_DOWN:
                        //第一个手指按下。
                        //log("down");
                        //strokePoints = new Array;
                        addPoint(X / W * 1000, (Y - (H - W) / 2) / W * 1000);

                        break;
                    case event.ACTION_UP:
                        //最后一个手指抬起。
                        //log("up");
                        isMove = false;
                        //addPoint(X / W * 1000, (Y - (H - W)) / W * 1000);


                        strokeAry.push(strokePoints);
                        strokePoints = new Array;
                        //MainGesturesAry.push(gesturesAry);
                        //gesturesAry = new Array;



                        break;
                    case event.ACTION_POINTER_DOWN:
                        //log("POINTER_DOWN");


                        break;
                    case event.ACTION_POINTER_UP:
                        //log("POINTER_UP");


                        break;
                };
        };
    } catch (e) {
        log("0: " + e);
    };

    return true;
}));


反色 = function(color) {
    return (-1 - colors.argb(0, colors.red(color), colors.green(color), colors.blue(color)));
};

toJavaArray = function(type, ary) {
    //var Ary = java.lang.reflect.Array.newInstance(		java.lang.Float.TYPE, 4);
    var Ary = util.java.array(type, ary.length);
    for (let i in ary) {
        Ary[i] = ary[i];
    };
    return Ary;
};

SolvePos = function(a, b, r, k, c) {
    let a1 = k * k + 1;
    let b1 = 2 * k * (c - b) - 2 * a;
    let c1 = a * a + (c - b) * (c - b) - r * r;
    let delta = b1 * b1 - 4 * a1 * c1;
    let result = [];
    if (delta == 0) {
        let x0 = Math.sqrt(delta);
        let x1 = -b1 / (2 * a1);
        let y1 = k * x1 + c;
        result.push(x1, y1);
    } else if (delta > 0) {
        let x0 = Math.sqrt(delta);
        let x1 = (-b1 - x0) / (2 * a1);
        let y1 = k * x1 + c;
        result.push(x1, y1);
        let x2 = (-b1 + x0) / (2 * a1);
        let y2 = k * x2 + c;
        result.push(x2, y2);
    }
    return result;
};

function RToxy(R) {
    var x = Math.cos(R);
    var y = Math.sin(R);
    return [x, y];
};

function xyToR(x, y) {
    var ary = getsd(1, [x, y]);
    x = ary[0],
        y = ary[1];
    var R = Math.asin(y);
    if (x < 0) {
        R = Math.PI - R;
    };
    return R;
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

function getsd(s, ary) {
    var sum = weiyi(ary);
    var S = s / sum;
    for (var i = 0; i < ary.length; i++) {
        ary[i] = ary[i] * S;
    };
    return ary;
};

function ydfx(ary) {
    var ary = getsd(1, ary);
    var x = ary[0],
        y = ary[1];
    var Y = Math.asin(y) / (2 * Math.PI) * 360;
    if (x < 0) {
        Y = 180 - Y;
    };
    return Y;
};

XYTOAB = function(x, y, x1, y1) {
    var A = (y1 - y) / (x1 - x);
    var B = y - A * x;
    return [A, B];
};




/*
int getPointerCount() //手势操作所包含的点的个数
int findPointerIndex(int pointerId) //根据pointerId找到pointer在MotionEvent中的index
int getPointerId(int pointerIndex) //根据MotionEvent中的index返回pointer的唯一标识
float getX(int pointerIndex) //返回手势操作点的x坐标
float getY(int pointerIndex) //返回手势操作点的y坐标
final int getActionMasked () //获取特殊点的action 
final int getActionIndex()//  用来获取当前按下／抬起的点的标识。如果当前没有任何点抬起／按下，该函数返回0。比如事件类型为ACTION_MOVE时，该值始终为0。

*/


/*
        for (let i = 0; i < TouchPointStart.length; i++) {
            try {
                let X = TouchPointStart[i][0];
                let Y = TouchPointStart[i][1];
                let x = TouchPointCurrent[i][0];
                let y = TouchPointCurrent[i][1];
                X = X || 0;
                Y = Y || 0;
                x = x || 0;
                y = y || 0;
                let a = X - (x - X);
                let b = Y - (y - Y);
                //let rect2 = new android.graphics.RectF(X, Y, a, b);
                //canvas.drawRect(rect2, paint);
                //let rect3 = new android.graphics.RectF(x, y, a, b);
                //canvas.drawRect(rect3, paint);
                //canvas.drawLine(X, Y, x, y, paint);
                //canvas.drawLine(X, Y, a, b, paint);
                canvas.drawText(String("A"), X, Y, paint)
                canvas.drawText(String("B"), x, y, paint);
                canvas.drawCircle(X, Y, 10, paint);
                canvas.drawCircle(x, y, 10, paint);
                //canvas.drawCircle(a, b, 10, paint);
            } catch (e) {};
        };
        for (let ii = 0; ii < TouchPointRecord.length; ii++) {
            let ge = TouchPointRecord[ii];
            canvas.drawText(String("▽"), ge[0]/10*ii+jishi*Ts/25, textSize * (ii + 2), paint)
            for (let i = 2; i < ge.length - 1; i++) {

                let X = ge[i][0] - vrx;
                let Y = ge[i][1] - vry;
                let x = ge[i + 1][0] - vrx;
                let y = ge[i + 1][1] - vry;
                X = X || 0;
                Y = Y || 0;
                x = x || 0;
                y = y || 0;
                //let a = X - (x - X);
                //let b = Y - (y - Y);
                //let rect = new android.graphics.RectF(X, Y, x, y);
                //canvas.drawRect(rect, paint);
                //let rect2 = new android.graphics.RectF(X, Y, a, b);
                //canvas.drawRect(rect2, paint);
                //let rect3 = new android.graphics.RectF(x, y, a, b);
                //canvas.drawRect(rect3, paint);
                canvas.drawLine(X, Y, x, y, paint);
                //canvas.drawLine(X, Y, a, b, paint);
                //canvas.drawText(String("A"), X, Y, paint)
                //canvas.drawText(String("B"), x, y, paint);
                //canvas.drawCircle(X, Y, 10, paint);
                //canvas.drawCircle(x, y, 10, paint);
                //canvas.drawCircle(a, b, 10, paint);
            };

*/