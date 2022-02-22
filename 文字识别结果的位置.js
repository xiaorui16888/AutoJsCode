requestScreenCapture();

var img = captureScreen();

var words_result = BaiDu_ocr(img, true).words_result;

var window = floaty.window(
    <vertical>
        <canvas id="canvas" layout_weight="1"/>
        <button id="but"w="*"/>
    </vertical>
);




var paint1 = new Paint;
//paint1.setTextAlign(Paint.Align.CENTER);
paint1.setStrokeWidth(2);
paint1.setStyle(Paint.Style.STROKE);
//.paint1.setStyle(Paint.Style.FILL);
paint1.setARGB(255, 255, 0, 0);
paint1.setTextSize(75);
var paint2 = new Paint;
//paint2.setTextAlign(Paint.Align.CENTER);
paint2.setStrokeWidth(2);
//paint2.setStyle(Paint.Style.STROKE);
paint2.setStyle(Paint.Style.FILL);
paint2.setARGB(255, 0, 255, 0);

window.but.click(function() {
    exit()
});


var ASX = new XYToMatrix(null, 2);

window.canvas.on("draw", function(canvas) {
    canvas.drawARGB(255, 127, 127, 127)
    var w = canvas.getWidth();
    var h = canvas.getHeight();
    canvas.setMatrix(ASX.matrix);
    canvas.drawRect(0, 0, device.width, device.height, paint1);
    for (var i = 0; i < words_result.length; i++) {
        var obj = words_result[i];
        var rect = obj.location;
        canvas.drawRect(rect.left, rect.top, rect.left + rect.width, rect.top + rect.height, paint1);
        paint2.setTextSize(rect.height * 0.85);
        canvas.drawText(obj.words, rect.left, rect.top + rect.height - rect.height * 0.15, paint2);
    };
});



window.canvas.setOnTouchListener(new android.view.View.OnTouchListener(function(view, event) {
    try {
        ASX.touchListener(view, event);
    } catch (e) {
        log(e)
    };
    return true;
}));


setInterval(() => {}, 50);



function XYToMatrix(matrix, maxPoints) {
    this.matrix = matrix || new android.graphics.Matrix;
    this.invertMatrix = new android.graphics.Matrix;
    this.matrix.invert(this.invertMatrix);
    this.maxPoints = maxPoints || 2;
    this.maxPointsListener = () => {};
    this.Touch = {
        Matrix: this.matrix,
        PointStart: new Array,
        PointCurrent: new Array,

    };
    this.touchListener = function(view, event) {
        try {
            var W = view.getWidth();
            var H = view.getHeight();
            var PC = event.getPointerCount();
            switch (event.getActionMasked()) {
                case event.ACTION_MOVE:
                    try {
                        for (let i = 0; i < PC; i++) {
                            let id = event.getPointerId(i);
                            let x = event.getX(i);
                            let y = event.getY(i);
                            this.Touch.PointCurrent[i * 2] = x;
                            this.Touch.PointCurrent[i * 2 + 1] = y;
                        };

                        //记录当前各手指坐标信息。
                        if (PC > this.maxPoints) { //手指数大于4个虽然记录坐标信息，但是不进行矩阵操作。
                            this.maxPointsListener(view, event);
                            break;
                        };

                        var Matrix = new android.graphics.Matrix();
                        Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                        this.matrix = new android.graphics.Matrix();
                        this.matrix.setConcat(Matrix, this.Touch.Matrix);
                        //进行矩阵运算并刷新矩阵。
                        this.matrix.invert(this.invertMatrix);
                        //反矩阵
                    } catch (e) {
                        throw "MOVE " + e;
                    };


                    break;
                case event.ACTION_CANCEL:
                    //log("CANCEL");
                    this.Touch.PointStart = new Array;
                    this.Touch.PointCurrent = new Array;

                    break;
                case event.ACTION_OUTSIDE:
                    //log("OUTSIDE");

                    break;
                default:
                    var I = Math.floor(event.getAction() / 256);
                    var ID = event.getPointerId(I);
                    var X = event.getX(I);
                    var Y = event.getY(I);
                    switch (event.getActionMasked()) {
                        case event.ACTION_DOWN:
                            try {
                                log("down");
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                this.Touch.Matrix = this.matrix;
                                //log(this.Touch.Matrix);
                            } catch (e) {
                                throw "DOWN " + e;
                            };
                            break;
                        case event.ACTION_UP:
                            //最后一个手指抬起。
                            log("up");
                            this.Touch.PointStart = new Array;
                            this.Touch.PointCurrent = new Array;

                            break;
                        case event.ACTION_POINTER_DOWN:
                            log("POINTER_DOWN");
                            try {
                                //当有新的手指按下时使坐标差为零。//开始新的多指矩阵运算方式
                                this.Touch.PointStart.splice(I * 2, 0, X, Y);
                                this.Touch.PointCurrent.splice(I * 2, 0, X, Y);
                                //获取点的总数量。
                                this.Touch.Matrix = this.matrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                //保存坐标的数组。
                                if (PC > this.maxPoints) { //手指数大于4个化为原始矩阵虽然记录坐标信息，但是不进行矩阵操作。
                                    this.maxPointsListener(view, event);
                                    break;
                                };

                                var Matrix = new android.graphics.Matrix();
                                Matrix.setPolyToPoly(this.Touch.PointStart, 0, this.Touch.PointCurrent, 0, PC > 4 ? 4 : PC);
                                this.matrix = new android.graphics.Matrix();
                                this.matrix.setConcat(Matrix, this.Touch.Matrix);
                                //进行矩阵运算并刷新矩阵。
                                this.matrix.invert(this.invertMatrix);
                                //反矩阵
                            } catch (e) {
                                throw "P_DOWN " + e;
                            };

                            break;
                        case event.ACTION_POINTER_UP:
                            log("POINTER_UP");
                            try {
                                this.Touch.Matrix = this.matrix;
                                for (let i = 0; i < PC; i++) {
                                    this.Touch.PointStart[i * 2] = this.Touch.PointCurrent[i * 2];
                                    this.Touch.PointStart[i * 2 + 1] = this.Touch.PointCurrent[i * 2 + 1];
                                };
                                this.Touch.PointStart.splice(I * 2, 2);
                                this.Touch.PointCurrent.splice(I * 2, 2);

                            } catch (e) {
                                throw "P_UP " + e;
                            };
                            break;
                    };
            };
        } catch (e) {
            throw "aimgTouch: " + e;
        };

        return true;

    };
};



function BaiDu_ocr(img, is位置) {

    var imag64 = images.toBase64(img, "png", 100);
    //本代码。key值，属于，大维万，所有。每天可用1000次。
    var API_Key = "IMi7uTlPbISgrYCkBnUZxREn";
    var Secret_Key = "NRE9cT0SA9qeEyadk7e0wzHH2LHiQTeS";

    var getTokenUrl = "https://aip.baidubce.com/oauth/2.0/token";
    //token获取地址。
    var token_Res = http.post(getTokenUrl, {
        grant_type: "client_credentials",
        client_id: API_Key,
        client_secret: Secret_Key,
    });

    var token = token_Res.body.json().access_token;
    //log(token);
    var ocrUrl1 = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic"; //每天可用5000次。
    //文字识别。
    var ocrUrl2 = "https://aip.baidubce.com/rest/2.0/ocr/v1/general"; //每天可用500次。
    //含位置信息。
    var ocrUrl = ocrUrl1;
    if (is位置) {
        ocrUrl = ocrUrl2;
    };
    var ocr_Res = http.post(ocrUrl, {
        headers: {
            "Content - Type": "application/x-www-form-urlencoded"
        },
        access_token: token,
        image: imag64,
    });

    var json = ocr_Res.body.json();
    //log(json);
    return json;
};