/*
 * Author:TimeOut
 * Date: 2018.12.18
 */

//获取当前所运行的脚本
var list = engines.all();
//双循环比较
for (var i = 0; i < list.length; i++) {
    for (var j = i + 1; j < list.length; j++) {
       //比较是否只有一个运行
        if (list[i].getSource().toString() == list[j].getSource().toString()) {
            //停止二次运行的脚本
            list[j].forceStop();
        }
    }
}