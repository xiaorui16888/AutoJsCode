var a = dialogs.rawInput("二次项系数"),
    b = dialogs.rawInput("一次项系数"),
    c = dialogs.rawInput("常数项")

function 判别式(a, b, c) {
    return b * b - (4 * a * c)
}

function 求根(a, b, 判别式) {
    if (判别式 > 0) {
        //有两个不相同的实数根
        var result = true
        //x1
        var x1 = (0 - b + Math.sqrt(判别式)) / 2 * a
        //x2
        var x2 = (0 - b - Math.sqrt(判别式)) / 2 * a
    }
    if (判别式 == 0) {
        //有两个相同的实数根
        var result = true
        //x1=x2
        var x1 = (0 - b) / 2 * a
        var x2 = x1
    }
    if (判别式 < 0) {
        //没有实数根
        var result = false
    }
    if (result) {
        var result = "x1=" + x1 + "\nx2=" + x2
    } else {
        result = "方程没有实数根"
    }
    return result
}

function 解(a, b, c) {
    b = b || 0
    c = c || 0
    if (a == 0 || !a) {
        return "wrong"
    } else {
        //开始解方程
        return 求根(a, b, 判别式(a, b, c))
    }
}
var 结果 = 解(a, b, c)
if (结果 == "wrong") {
    dialogs.alert("错误", "非二元一次方程（a不能为0）")
} else {
    dialogs.alert("该方程的根为：", 结果)
}