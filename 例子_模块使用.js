/*
==============================
使用方法：
    把下面拆分为3个js文件，放在同一个目录中，执行主程序。
适用版本：
    在 Android 7.0 + Auto.JS v4.0.3 Alpha2 环境中测试通过。
制作：
    by 学徒小徐 in 2018-09-27
==============================
*/
/*
==============================
 以下是主程序（文件名modtest.js）的内容
==============================
*/
//定义引入的模块文件modtest1.js为modTest1对象
const modTest1 = require('modtest1.js');

console.show();
console.clear();
console.log("本例子展示了模块文件的调用方法");

//在主程序里面直接调用模块文件内的f1函数
modTest1.f1();
//在主程序里面直接显示模块文件内的i1变量
console.log("模块文件1中的i1变量=" + modTest1.i1);
//在主程序里面通过调用模块文件内的f2函数，达到复合嵌套的方法。
modTest1.f2();

sleep(10000);
console.hide();
exit();


/*
==============================
 以下是模块1（文件名为modtest1.js）的内容
==============================
*/
//在模块文件1中引入模块文件2，达到复合嵌套的用途。
const modTest2 = require('modtest2.js');

//模块1中定义了变量i1，因为在module.exports中引出，所以i1可以被主程序引用。
var i1 = 5;
//定义了变量i2，但是没有在module.exports中引出，所以i2为模块内变量，无法被主程序引用。
var i2 = 10;
//函数f1，同样需要在module.exports中引出，才能被主程序引用。
function f1(){
    console.log("modTest1文件 - f1函数输出正常");
    return;
    };
//函数f2，在这里引用了模块文件2的函数，达到复合。
function f2(){
    modTest2.f1();
    return;
    };
//模块文件必须具有module.exports
module.exports = { 
    i1: i1,
    f1: f1,
    f2: f2,
    };
//文件末加上exit()是个人习惯
exit();


/*
==============================
 以下是模块2（文件名为modtest2.js）的内容
==============================
*/
//模块2中的函数f1
function f1(){
    console.log("modTest2文件 - f1函数输出正常");
    return;
    };
//模块文件必须具有module.exports
module.exports = { 
    f1: f1,
    };
//文件末加上exit()是个人习惯
exit();
