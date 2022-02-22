/*
**aj版本4.0.0Beta
**功能:打开本代码，然后打开测试软件，就能读出所有控件ID  Text  class  desc  其余的可以自己加。
**提供给所需之人，大鸟略过
**by  不可不黑 QQ864165204
*/
console.show();
sleep(20000);

// js递归遍历数组获取所有的叶子节点
var arr=[];
function queryList(json,arr) {
    for (var i = 0; i < json.childCount(); i++) {
        var sonList = json.child(i);
        if (sonList.childCount() == 0) {
            arr.push(json.child(i));
        } else {
            queryList(sonList, arr);
        }
    }
    return arr;
}

sleep(3000);
//var list = className("ListView").findOne();
var list = className("FrameLayout").findOne();

queryList(list,arr);

for(var k=0;k<arr.length;k++){
    log("第"+k+"个子控件");
    log("text="+arr[k].text()+"\n" +"ID="+arr[k].id()+"\n"+"classname="+arr[k].className());
    log("desc="+arr[k].desc()+"\n");
    }

