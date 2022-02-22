/*

new findImg(img)#

返回 ImgSelector

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





function findImg(template) {
    this.template = template;
    this.options = {
        region: null,
        threshold: null,
        max: null,
        level: null
    };

    this.matchFilter = function() {
        return true;
    };

    //设置值。
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
        let P = images.findImage(captureScreen(), this.template, this.options);
        return this.matchFilter({
            point: P
        }) ? P : null;
    };

    this.matchTemplate = function() {
        let res = images.matchTemplate(captureScreen(), this.template, this.options);
        let matchs = res.matchs;

        for (let i = 0; i < matchs.length;) {
            if (this.matchFilter(matchs[i])) {
                i++;
            } else {
                matchs.splice(i, 1);
            };
        };

        return res;
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