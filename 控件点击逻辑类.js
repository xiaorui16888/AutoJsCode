
//采用了子事件集的结构思想。
//当前环境的情况。如果情况符合则开始当前情况可能做的事情。
//每一层都包含了一个环境判断和这个环境所可能要做的事情。
//开始运行的时候会逐步深层遍历所有的情况，如果其中一个情况符合就运行它的操作代码。




var 进入QQ = new sj事件集(function() {
    //判断当前界面是否在QQ。
    return !(packageName("com.tencent.mobileqq").exists())
}, [function() {
    //如果不是就启动QQ。
    launch("com.tencent.mobileqq");
}]);

var 点击头像 = new sj事件集(function() {
    //如果desc为账户和设置的控件出现。
    return desc("帐户及设置").exists();
}, [function() {
    //点击这个空间。
    j点击(desc("帐户及设置").findOne(100));
}]);


var 点击人名 = new sj事件集(function() {
    //如果这个ID出现。
    return id("nickname").exists();
}, [function() {
    //只要点击这个ID。因为这是最后一步了，所以要返回。
    //如果返回成功。则退出循环。如果失败再继续。
    return j点击(id("nickname").findOne(100));
}]);



//实际开始运行。


//第1种方法按顺序。推荐使用第1种方法。

进入QQ.add(点击头像);
点击头像.add(点击人名);

for (var i = 0; i < 100; i++) {
    if (进入QQ.go()) {
        log("ok", i);
        //break;
    };
    sleep(50);
};


/*
//第2种方法不按顺序全部便利。

var 进入个人主页 = new sj事件集(function() {
    return true;
}, [进入QQ,点击头像,点击人名],100);

for (var i = 0; i < 100; i++) {
    if (进入个人主页.go()) {
        log("ok", i);
        break;
    };
    sleep(50);
};

*/





function j点击(UiObject, isXY, D) {
    //点击控件。是否用坐标点击？非坐标点击时向父控件查找可点击控件的层次数。
    D = D || 10;
    if (UiObject) {
        if (!D) {
            return false;
        };
        if (isXY) {
            var rect = UiObject.bounds();
            return click(rect.centerX(), rect.centerY());
        } else {
            if (UiObject.clickable()) {
                return UiObject.click();
            } else {
                return arguments.callee(UiObject.parent(), isXY, D);
            };
        };
    };
    return false;
};


//使用。if来进行判断运行动作
//动作成功则进入子事件集
//动作失败则下一个事件


function sj事件集(fun, ary, ys) {
    this.fun = fun || function() {};
    //判断体
    this.doFunAry = ary || new Array();
    //事件集
    this.ys = ys || 1;
    this.add = function(sj) {
        this.doFunAry.push(sj);
    };
    this.go = function() {
        if (this.fun()) {
           // for (let ic = 0; ic < 20; ic++) {
                for (let i = 0; i < this.doFunAry.length; i++) {
                    if (typeof this.doFunAry[i] == "function") {
                        if (this.doFunAry[i]()) {
                            return true;
                        };
                    } else if (typeof this.doFunAry[i] == "object") {
                        if (this.doFunAry[i].go()) {
                            return true;
                        };
                    };
                    sleep(this.ys);
                };
          //  };
        };
    };
};