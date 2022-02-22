/*
//～～～～～～～～～～～～～～～～～～～～～
点击找图结果。
pClick(point)#

point <object> 两种找图方法返回的对象。包括findImage和matchTemplate

可直接点击找图返回的坐标对象。返回是否全部点击成功

//～～～～～～～～～～～～～～～～～～～～～
找图选择器对象。

new findImg(img|obj)#

img <image> 图片对象。

obj <object> 找图数据。需要包含。template 和 options

返回 ImgSelector

ImgSelector.template(img)#

img <image> 图片对象。

返回 ImgSelector 返回选择器自身以便链式调用

为当前选择器覆盖小图为img的筛选条件。

ImgSelector.options(obj)#

obj <object> 找图数据。

返回 ImgSelector 返回选择器自身以便链式调用

为当前选择器覆盖options为obj的筛选条件。

ImgSelector.region(array)#

array <array> 找图区域。

返回 ImgSelector 返回选择器自身以便链式调用

为当前选择器覆盖找图区域为array的筛选条件。

ImgSelector.threshold(float)#

float <floatNumber> 小数。找图的相似度。

返回 ImgSelector 返回选择器自身以便链式调用

为当前选择器覆盖相似度为float的筛选条件。

ImgSelector.level(int)#

int <intNumber> 整数。图像金字塔的参数

返回 ImgSelector 返回选择器自身以便链式调用

为当前选择器覆盖level为int的筛选条件。

ImgSelector.max(int)#

int <intNumber> 整数。matchTemplate找同时的最大数量。

只对matchTemplate找图有用。

返回 ImgSelector 返回选择器自身以便链式调用

为当前选择器覆盖max为int的筛选条件。

//～～～～～～～～～～～～～～～～～～～～～～～～～
下面开始找图。

ImgSelector.findOne()#

返回 point

根据当前的选择器所确定的筛选条件，对屏幕上的小图进行搜索，直到屏幕上出现满足条件的一个小图为止，并返回该小图。如果找不到小图，当屏幕内容发生变化时会重新寻找，直至找到。

需要注意的是，如果屏幕上一直没有出现所描述的小图，则该函数会阻塞，直至所描述的小图出现为止。因此此函数不会返回null。

另外，如果屏幕上有多个满足条件的小图，findOne()采用深度优先搜索(DFS)，会返回该搜索算法找到的第一个小图。注意小图找到的顺序有时会起到作用。

ImgSelector.findOne(timeout)#

timeout <number> 搜索的超时时间，单位毫秒

返回 point

根据当前的选择器所确定的筛选条件，对屏幕上的小图进行搜索，直到屏幕上出现满足条件的一个小图为止，并返回该小图；如果在timeout毫秒的时间内没有找到符合条件的小图，则终止搜索并返回null。

该函数类似于不加参数的findOne()，只不过加上了时间限制。

返回 point

根据当前的选择器所确定的筛选条件，对屏幕上的小图进行搜索，如果找到符合条件的小图则返回该小图；否则返回null。

ImgSelector.findOnce(i)#

i <number> 索引

根据当前的选择器所确定的筛选条件，对屏幕上的小图进行搜索，并返回第 i + 1 个符合条件的小图；如果没有找到符合条件的小图，或者符合条件的小图个数 < i, 则返回null。

注意这里的小图次序，是搜索算法深度优先搜索决定的。

ImgSelector.find()#

返回 MatchingResult

根据当前的选择器所确定的筛选条件，对屏幕上的小图进行搜索，找到所有满足条件的小图集合并返回。这个搜索只进行一次，并不保证一定会找到，因而会出现返回的小图集合为空的情况。

不同于findOne()或者findOnce()只找到一个小图并返回一个小图，find()函数会找出所有满足条件的小图并返回一个小图集合。之后可以对小图集合进行操作。

可以通过length判断找到的是否为空。例如：

ImgSelector.untilFind()#

返回 MatchingResult

根据当前的选择器所确定的筛选条件，对屏幕上的小图进行搜索，直到找到至少一个满足条件的小图为止，并返回所有满足条件的小图集合。

该函数与find()函数的区别在于，该函数永远不会返回空集合；但是，如果屏幕上一直没有出现满足条件的小图，则该函数会保持阻塞。

ImgSelector.exists()#

返回 <Boolean>

判断屏幕上是否存在小图符合选择器所确定的条件。


ImgSelector.waitFor()#

等待屏幕上出现符合条件的小图；在满足该条件的小图出现之前，该函数会一直保持阻塞。


ImgSelector.filter(f)#

f <Function> 过滤函数，参数为match，返回值为boolean

为当前选择器附加自定义的过滤条件。


*/


function pClick(obj) {
    //可直接点击找图返回的对象。包括findImage和matchTemplate
    //返回。是否全部点击成功
    if (typeof(obj.x) == "number" && typeof(obj.y) == "number") {
        return click(obj.x, obj.y);
    } else if (obj.point) {
        return click(obj.point.x, obj.point.y);
    } else if(obj.points){
        return arguments.callee(obj.points);
    } else if (Array.isArray(obj)) {
        let k=true;
        for(let i in obj){
            k=k&&arguments.callee(obj[i]);
        };
        return k;
    };
    return false;
};


function findImg(obj) {
    this.mTemplate = null;
    this.mOptions = {
        region: null,
        threshold: null,
        max: null,
        level: null
    };

    this.matchFilter = function() {
        return true;
    };

    if (typeof(obj) == "object") {
        this.mTemplate = obj.template;
        this.mOptions = obj.options;
    };

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