/**
 *作者QQ: 1811588980
 *完成时间: 2019年6月7日 上午1:58:21
  *API: 27
 *备注: 运行自动精灵生成的脚本文件zjs
 *需要你自己改文件路径。
 简单的写了一个框架，已经实现，点击，滑动，找图的简单功能。
 还只是个框架，大部分功能还没完全实现。
 有兴趣的可以看看完善完善。
 基本思路就在那摆着呢。
**/





console.show();

//zjs_
/*
var j_ = {

    delay: ()=>{},
    press: () => {},
    swipe: ()=>{},
    findImg: () => {},
    base64Img: () => {},
};
*/
auto();

if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
};


let j_ = {
//需要用到的功能函数。
    delay: sleep,
    press: function(p, d){
        log(p, d);
        press(p.x, p.y, d);
    },
    swipe: function(p1, p2, d){
        log(p1, p2, d);
        swipe(p1.x, p1.y, p2.x, p2.y, d);
    },
    findImg: findImg,
    base64Img: function(base64){
        return images.fromBase64(base64);
    },
};

//读取自动精灵zjs源文件。
let step_ary = readFile("./tyu.zjs");




let constData = step_ary.shift();
/*
{
    "repeatCount": -1,
    "pauseOnFail": true,
    "count": 5,
    "description": "sndkdkjd",
    "minVerCode": 1,
    "screenWidth": 1080,
    "screenHeight": 2280,
    "screenDpi": 3
}
*/



constData.repeatCount = constData.repeatCount >= 0 ? constData.repeatCount : 1;

for (let i = 0; i < constData.repeatCount; i++) {

    for (let i = 0; i < step_ary.length; i++) {
        let obj = step_ary[i];

        //每一步的重复问题没搞懂。是延迟完重复执行的动作。还是重复延迟和动作
        switch (obj.type) {
            case "点击":
                zjs_点击(obj);
                break;
            case "滑动":

                zjs_滑动(obj);


                break;
            case "点击图片":
                zjs_点击(obj);


                break;
            case "点击":


                break;
        };
    };

};



//函数部分～～～～～～～～～～～～——————————————————————
//～～～～～～～～～～～～～～～～～～——————————————————————
//～～～～～～～～～～～～～～～～～～——————————————————————
//～～～～～～～～～～～～～～～～～～——————————————————————
//～～～～～～～～～～～～～～～～～～——————————————————————
//～～～～～～～～～～～～～～～～～～——————————————————————
//～～～～～～～～～～～～～～～～～～——————————————————————



function readFile(path) {
    let textFile = open(path, "r");
    let step_ary = textFile.readlines();
    textFile.close();

    return step_ary.map(function(str) {
        return JSON.parse(str);
    });
};



function zjs_repeatCount(rep, fun) {
    rep = rep >= 0 ? rep : 1;
    for (let i = 0; i < rep; i++) {
        fun();
    };
};


function zjs_点击(obj) {
    /*
    
    "type": "点击",
    "duration": 123,
    "delay": 132,
    "delayUnit": 1,
    "posData": {
        "type": "location",
        "x": "59%",
        "y": "63%"
    }
 
    */
    let duration = obj.duration || 100;
    zjs_delay(obj);
    if (!obj.condition || zjs_condition(obj.condition)) {
        let point = zjs_posData(obj.posData);

        j_.press(point, duration);
    };
};

function zjs_滑动(obj) {
    let duration = obj.duration || 100;
    zjs_delay(obj);
    if (!obj.condition || zjs_condition(obj.condition)) {
        let startPoint = zjs_posData(obj.startPos);
        let endPoint = zjs_posData(obj.endPos);

        j_.swipe(startPoint, endPoint, duration);
    };
};



function zjs_delay(obj) {
    //延迟。
    if (obj.delay) {
        let delay = obj.delay;
        switch (obj.delayUnit) {
            case 1:
                delay = delay * 1000;
                break;
            case 2:
                delay = delay * 60 * 1000;
                break;
        };
        j_.delay(delay);
    };
};


function zjs_condition(obj) {
    //条件判断。
    switch (obj.type) {
        case "image":

            return zjs_condition_image(obj);

            break;
        case "textFount":

            return zjs_condition_textFount(obj);


            break;
        case "conditionSet":

            return zjs_condition_conditionSet(obj);

            break;
    };
};

function zjs_condition_image(obj) {
    //找图条件。

    let imageData = obj.imageData;
    let img = j_.base64Img(imageData.data);
    let k = false;
    if (obj.limitArea) {
        let region = obj.limitArea.split(" ");
        region = region.map(function(str) {
            return zjs_pos_p(str);
        });

        region[0] = region[0] * constData.screenWidth;
        region[1] = region[1] * constData.screenHeight;
        region[2] = region[2] * constData.screenWidth;
        region[3] = region[3] * constData.screenHeight;
        region[2] = region[2] - region[0];
        region[3] = region[3] - region[1];
        k = new j_.findImg(img).region(region).exists();
    } else {
        k = new j_.findImg(img).exists();

    };
    img.recycle();

    if (obj.runWhenFalse) {
        k = !k;
    };

    return k;

};

function zjs_condition_textFount(obj) {
    //找文字条件。不会写。
    /*
            {
                "type": "textFount",
                "text": "文字出现。"
            }    
    
        */
    //不会搞。
    var k = false;

    if (obj.runWhenFalse) {
        k = !k;
    };

    return true;

};


function zjs_condition_conditionSet(obj) {
    //多个条件。
    /*
        "type": "conditionSet",
        "conditions": [{
 
    */
    var k = false;
    if (obj.matchMode == "and") {
        for (let ob of obj.condition) {
            let g = zjs_condition(ob);
            if (!g) {
                k = false;
                break;
            } else {
                k = k || g;
            };
        };
    } else if (obj.matchMode == "or") {
        for (let ob of obj.condition) {
            let g = zjs_condition(ob);
            if (g) {
                k = true;
                break;
            };
        };
    };

    if (obj.runWhenFalse) {
        k = !k;
    };

    return k;
};



function zjs_posData(obj) {
    //坐标数据。

    switch (obj.type) {
        case "location":

            return zjs_pos_location(obj);

            break;
        case "image":

            return zjs_pos_image(obj);

            break;
        case "textFount":
        
           return zjs_pos_textFount(obj);


            break;

    };
};

function zjs_pos_p(str) {
    //坐标表达方式转换。
    if (typeof(str) == "string") {
        let num = parseFloat(str);
        if (str.indexOf("%") >= 0) {
            return num / 100;
        } else if (str.indexOf("dp") >= 0) {
            return num * constData.screenDpi;
        };
    };
    return 0;
};


function zjs_pos_location(obj) {
    //坐标位置。
    /*
            "type": "location",
            "xOffset": "12dp",
            "yOffset": "13dp",
            "x": "34%",
            "y": "33%"
    
        */
    let x = zjs_pos_p(obj.x) * constData.screenWidth;
    let y = zjs_pos_p(obj.y) * constData.screenHeight;

    if (obj.xOffset) {
        x += zjs_pos_p(obj.xOffset);
    };
    if (obj.yOffset) {
        y += zjs_pos_p(obj.yOffset);
    };

    return {
        x: x,
        y: y
    };
};


function zjs_pos_image(obj) {
    //找图位置。一直找直到找到。会阻塞。
    /*
    
            "type": "image",
            "xOffset": "12%",
            "yOffset": "2%",
            "imageData": {
                "data": "base64",
                "imageWidth": 237,
                "imageHeight": 127,
                "imageLeft": 423,
                "imageTop": 1073,
                "screenWidth": 1080,
                "screenHeight": 2280,
                "screenDpi": 3
            },
            "limitArea": "25.37037% 28.157896% 81.71296% 54.978073%",
            "searchMode": "COLOR",
            "minSimilarPercent": 70,
            "codeVersion": "V1_7"
    
        */
    let imageData = obj.imageData;
    let img = j_.base64Img(imageData.data);
    let p;
    if (obj.limitArea) {
        let region = obj.limitArea.split(" ");
        region = region.map(function(str) {
            return zjs_pos_p(str);
        });

        region[0] = region[0] * constData.screenWidth;
        region[1] = region[1] * constData.screenHeight;
        region[2] = region[2] * constData.screenWidth;
        region[3] = region[3] * constData.screenHeight;
        region[2] = region[2] - region[0];
        region[3] = region[3] - region[1];
        p = new j_.findImg(img).region(region).findOne();
    } else {
        p = new j_.findImg(img).findOne();

    };

    //只实现了简单的区域找图。
    if (obj.xOffset) {
        p.x += zjs_pos_p(obj.xOffset);
    };
    if (obj.yOffset) {
        p.y += zjs_pos_p(obj.yOffset);
    };
    img.recycle();

    return p;

};

function zjs_pos_textFount(obj){
    //找文字坐标。
    
    
    let p={x:0,y:0};
    
    //运行找文字函数。//没有不会写。
    
    if (obj.xOffset) {
        p.x += zjs_pos_p(obj.xOffset);
    };
    if (obj.yOffset) {
        p.y += zjs_pos_p(obj.yOffset);
    };
    img.recycle();

    return p;

    
};






































//～～～～～～～～～～～～～～～～～～——————————————————————
//～～～～～～～～～～～～～～～～～～——————————————————————
//～～～～～～～～～～～～～～～～～～——————————————————————
//～～～～～～～～～～～～～～～～～～——————————————————————
//～～～～～～～～～～～～～～～～～～——————————————————————
//～～～～～～～～～～～～～～～～～～——————————————————————
//～～～～～～～～～～～～～～～～～～——————————————————————


function pClick(obj) {
    //可直接点击找图返回的对象。包括findImage和matchTemplate
    //返回。是否全部点击成功
    if (typeof(obj.x) == "number" && typeof(obj.y) == "number") {
        return click(obj.x, obj.y);
    } else if (obj.point) {
        return click(obj.point.x, obj.point.y);
    } else if (obj.points) {
        return arguments.callee(obj.points);
    } else if (Array.isArray(obj)) {
        let k = true;
        for (let i in obj) {
            k = k && arguments.callee(obj[i]);
        };
        return k;
    };
    return false;
};


function findImg(img) {
    this.mTemplate = img;
    this.mOptions = {
        region: null,
        threshold: null,
        max: null,
        level: null
    };

    this.matchFilter = function() {
        return true;
    };
/*
    if (typeof(obj) == "object") {
        this.mTemplate = obj.template;
        this.mOptions = obj.options;
    }else{
        this.mTemplate=obj;
    };
*/
    //设置值。
    this.template = function(img) {
        if (img) {
            this.mTemplate = img;
        } else {
            throw "不是图片" + img;
        };
        return this;
    };

    this.options = function(options) {
        if (typeof(options) == "object") {
            this.mOptions = options;
        } else {
            throw "不是对象" + options;
        };
        return this;
    };

    this.region = function(array) {
        if (Array.isArray(array)) {
            this.options.region = array;
        } else {
            throw "不是数组" + array;
        };
        return this;
    };

    this.threshold = function(threshold) {
        threshold = parseFloat(threshold);
        if (typeof(threshold) == "number") {
            this.options.threshold = threshold;
        } else {
            throw "不是数字" + threshold;
        };
        return this;
    };

    this.level = function(level) {
        level = parseInt(level);
        if (typeof(level) == "number") {
            this.options.level = level;
        } else {
            throw "不是数字" + level;
        };
        return this;
    };

    this.max = function(max) {
        //4.1.1以上可用。
        max = parseInt(max);
        if (typeof(max) == "number") {
            this.options.max = max;
        } else {
            throw "不是数字" + max;
        };
        return this;
    };

    //找图方法。

    this.findImage = function() {
        let P = images.findImage(captureScreen(), this.mTemplate, this.mOptions);
        return this.matchFilter({
            point: P
        }) ? P : null;
        //返回。point
    };

    this.matchTemplate = function() {
        let res = images.matchTemplate(captureScreen(), this.mTemplate, this.mOptions);
        let matchs = res.matchs;

        for (let i = 0; i < matchs.length;) {
            if (this.matchFilter(matchs[i])) {
                i++;
            } else {
                matchs.splice(i, 1);
            };
        };

        return res;
        //返回结果对象。
    };


    this.find = function() {
        return this.matchTemplate();
    };

    this.findOne = function(timeout) {
        timeout = parseInt(timeout);
        let time = new Date().getTime();
        let P;
        while (!(P = this.findImage())) {
            if (timeout && new Date().getTime() - time >= timeout) {
                return null;
            };
            sleep(200);
        };
        return P;
    };

    this.findOnce = function(i) {
        i = parseInt(i);
        if (typeof(i) == "number") {
            let res = this.matchTemplate();
            if (res.matchs.length > i) {
                return res.matchs[i];
            };
        } else {
            return this.findImage();
        };
        return null;
    };

    this.untilFind = function() {
        let res;
        while (!(res = this.matchTemplate()).matchs.length) {
            sleep(200);
        };
        return res;
    };

    this.exists = function() {
        if (this.findImage()) {
            return true;
        };
        return false;
    };

    this.waitFor = function() {
        let P;
        while (!(P = this.findImage())) {
            sleep(200);
        };
        return P;
    };

    this.filter = function(fun) {
        if (typeof(fun) == "function") {
            this.matchFilter = fun;
        } else {
            throw "不是函数" + fun;
        };
        return this;
    };
};