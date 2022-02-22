var list;
var zanr = [];
var zan;
var name;
var more;
toast("请打开赞自己的列表");
waitForActivity("com.tencent.mobileqq.activity.VisitorsActivity");
Array.prototype.add = function(item) {
    //防止重复加入
    for (var i = 0; i < this.length; i++) {
        if (this[i] == item)
            return false;
    }
    this.push(item);
    //return (true);
    log(item);
    return (true);
}
while (true) {
    list = className("android.widget.AbsListView").findOne();
    list.children().forEach(function(child1) {
        if (child1 == null)
            return;
        if (child1.childCount() != 2)
            return;
        try {
            zan = child1.child(1).children().find(className("android.widget.ImageView")).get(0)
            name = child1.child(1).child(0).child(0).child(0).text();
        } catch (e) {
            //log(e)
        }
        //log(name);
        if (name) {
            if (zanr.add(name)) {
                if (zan) {
                    try {
                        zan = child1.child(1).child(4);
                        if (!zan || zan.className() != "android.widget.ImageView") {
                            zan = child1.child(1).child(5);
                            if (!zan || zan.className() != "android.widget.ImageView")
                                zan = null;
                        }
                    } catch (e) {
                        log(e)
                    }
                    for (var i = 0; i < 12; i++) {
                        zan.click();
                        sleep(30);
                    }
                }
            }
        }

    })
    if (!list.scrollForward()) {
        more = text("显示更多").findOne(3000)
        if (more) {
            more.parent().click();
            sleep(2000);
        }
        if (!list.scrollForward())
            break;
    }
    sleep(1000);
}