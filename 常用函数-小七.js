var 小七 = new Object();

//如果是把本脚本文件作为一个模块加载，
//把下面一行的双斜线去掉
//module.exports = 小七;

//在另一个脚本中写入下面的一个常数定义：
//const xq = require("常用函数-小七.js")
//注意：如果另一个脚本和本脚本不在同一个目录下，
//require("文件路径")函数里面需要写本脚本的路径。
//使用的时候如下：
// var button = text("运行").findOne(1000)
// xq.clicks( button )


//针对控件的常用功能

小七.clicks = function (控件) {
    //单击目标控件或者控件集，
    //控件单击成功返回true，不成功返回false。
    //控件集所有的控件都成功返回true，否则返回false。
    switch (this.控件判断(控件)) {
        case true:
            return this.点击(控件);
            break

        case false:
            var f = true;
            for (var i = 0; i < 控件.length; i++) {
                f = f && this.点击(控件[i]);
            }
            return f;
            break

            defult:
                return false;
    }
}

小七.点击 = function (UiO) {
    //从输入的控件开始一直向父控件找
    //直到找到可以单击的父控件，
    //然后单击，单击成功 返回 true
    //否则返回 false。
    //该函数是clicks()函数的辅助函数，直接使用clicks函数即可。
    if(arguments == []){
        return false;
      }
     if(!this.控件判断(arguments[0])){
         return false;
         }
    while (!UiO.clickable()) {
        if (UiO.depth() > 1) {
            UiO = UiO.parent();
        } else {
            return false;
        }
    }
    return UiO.click();
}

小七.控件判断 = function (输入) {
    //判断输入的是否为控件，
    //是控件，返回 true；
    //是控件集(非空)，返回 false；
    //否则返回 undefined。
    if (typeof 输入 != "object") {
        return undefined;
    }
    if (typeof 输入.get == "function") {
    	if(输入.length > 0) {
    		return false;
    	} else {
    		return undefined;
    	}
    } else if (typeof 输入.text == "function") {
        return true;
    } else {
        return undefined;
    }
}

小七.clickables = function (控件) {
	//从给定控件开始，向其父控件迭代查找，
    //找到并返回可以单击的控件，找不到则返回null。
    if(arguments == []){
        return null;
      }
     if(!this.控件判断(arguments[0])){
         return null;
         }
    while (!控件.clickable()) {
        if (控件.depth() > 1) {
            控件 = 控件.parent();
        } else {
            return null;
        }
    }
    return 控件;
}

小七.scrollables = function (控件) {
    //从控件向父控件找
    //直到找到并返回可以滑动的控件，
    //找不到则返回null。
    if(arguments == []){
        return null;
      }
     if(!this.控件判断(arguments[0])){
         return null;
         }
    while (!控件.scrollable()) {
        if (控件.depth() > 1) {
            控件 = 控件.parent();
        } else {
            return null;
        }
    }
    return 控件;
}


小七.parents = function (控件, n) {
    //返回控件的上n级控件，上n级控件如果不存在，则输出null。
    if(arguments == []){
        return null;
      }
     if(!this.控件判断(arguments[0])){
         return null;
         }
     if(! n + 0 >= 0){
         return null;
         }
    for (; n > 0; n--) {
        if (控件.depth() > 1) {
            控件 = 控件.parent();
        } else {
            return null;
        }
    }
    return 控件;
}


小七.texts = function (控件集, 输出控制, 文本分隔符) {
    //如果参数错误则返回 null。
    //获取控件集合的文本信息，
    //输出控制，默认字符串输出，
    //为字符串输出时，文本分隔符才起作用，默认为 "" (空)。
    //输出控制 也可以设置为 1，表示输出数组。
    if (arguments == [] || this.控件判断(控件集) != false) {
        return null;
    }
    var t = new Array();
    for (var i = 0; i < 控件集.length; i++) {
        t[i] = 控件集.get(i).text();
    }
    if (输出控制 == 1) {
        return t;
    } else {
        if (文本分隔符 == undefined) {
            return t.join("");
        } else {
            return t.join(文本分隔符);
        }
    }
}


//针对文本的常用函数
小七.mimi = function (文本, 密码, 操作) {
    // 如果输入文本为""，则返回null；
    //如果密码为空，将采用默认密码；
    //操作 为"1"，执行解密，否则为加密。
    //返回 加密/解密 后的文本。
    if (arguments[0] == "" || arguments[0] == undefined) {
        return null;
    } else {
        var t = String(arguments[0]);
        var s = new Array();
        for (let i = 0; i < t.length; i++) {
            s[i] = t.charCodeAt(i);
        }
    }
    if (arguments[1] == "" || arguments[1] == undefined) {
        var n = [31455, 28982, 19981, 36755, 20837, 23494, 30721, 65292, 30475, 25105, 25171, 19981, 27515, 20320, 20011, 30340];
    } else {
        var m = String(arguments[1]);
        var n = new Array();
        for (let i = 0; i < m.length; i++) {
            n[i] = m.charCodeAt(i);
        }
    }
    if (arguments[2] != 1) {
        var z = "s[i] = s[i] + n[j];if (s[i] > 65535) {s[i] = s[i] - 65535;};"
    } else {
        var z = "s[i] = s[i] - n[j];if (s[i] < 0) {s[i] = s[i] + 65535;};"
    }

    var j = 0;
    for (let i = 0; i < s.length; i++) {
        eval(z);
        j++;
        if (j >= n.length) {
            j = 0;
        }
    }
    var k = s.join(",");
    return eval("String.fromCharCode(" + k + ")");
}

