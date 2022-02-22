sleep(200)

_log = log
log = function() {
    try {
        l
    } catch (e) {
        let a = e.stack
        a = a.replace(/\t.+:/ig, "")
        // _log("\n", a)
        a = a.split("\n")
        let 内容 = util.format.apply(util, arguments)
        _log("第" + a[1] + "行:", 内容)
        /*
        if (日志显示.split("\n").length > 3) {
            日志显示 = 日志显示.split("\n")
            日志显示 = 日志显示.slice(日志显示.length - 7, 日志显示.length - 1)
            日志显示.shift()
            日志显示 = 日志显示.join("\n")
        }
        日志显示 += "\n" + 内容
        ui.run(function() {
            w.日志.setText("" + 日志显示);
        });
        */
    }
}
b = 0
时间 = new Date().getTime()

log("用时", new Date().getTime() - 时间)
a = text("保存").findOnce()
log(a.id())
控件集合 = visibleToUser().find()

var uc = 控件集合.filter(function(w) {
    return w.text() == "保存" && w.id() == "org.autojs.autojs:id/text"
});
log(uc[0].text())

c = 控件1(text("保存").id("text"))
log(c)

log(c.text())



function 控件1(a) {
    a = ("" + a).replace(/\)/gi, "")
    a = a.split(".")
    var k = []
    var uc = 控件集合.filter(function(w) {
        for (let z = 0; z < a.length; z++) {
            let b = a[z].split("(")
            k.push("w." + b[0] + "()==" + b[1])
            return eval(k.join("&&"))
        }
    });
    //  log(uc)
    return uc[0]
}