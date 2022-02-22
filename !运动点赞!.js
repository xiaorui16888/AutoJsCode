//var a=id("b5n").className("android.widget.ImageView").findOne();//这是寻找角上有红点的控件！
/*var 详情=id("bjm").findOnce(1);
 log(详情);
 详情click();*/

//var b=id("aou").findOne();
//b.click();
//sleep(10000);

x = className("ListView").id("com.tencent.mm:id/bjg").findOne();
var bs = id("bif").findOne();
var wdbs = bs.text();
log(wdbs);

for (a = 0; a < 100; a++) {
    sleep(1000);

    var 赞 = id("bjr").find();
    var 个数 = 赞.length;
    var 步数 = id("bif").find();

    for (i = 0; i < 个数; i++) {

        var xzbs = 步数[i].text();
        if (xzbs === wdbs) {
            i++;
            var dj = 赞[i];

            if (dj != null) {

                dj.click();
            } else {
                sleep(100);
            }

        } else {
            var dj = 赞[i];

            dj.click();
        }

    }
    sleep(200);
    if (!x.scrollDown()) {
        toastLog("点赞完毕");
        back();
        exit();
    }
}