//一小时以内的计时

//输入间隔时间。
var jg = rawInput("uu");
//开始计时
var d = new Date();
var f1 = d.getMinutes();
var m1 = d.getSeconds();
//间隔事件。
sleep(jg * 1000);
//计时结束
var e = new Date();
var f2 = e.getMinutes();
var m2 = e.getSeconds()
//分秒差
var lf = f2 - f1;
var ls = m2 - m1;
//分判
if (lf < 0) {
    var fj = 60 + lf;
} else if (lf > 0) {
    var fj = lf;
}
//秒判
if (ls < 0) {
    var mj = 60 + ls;
} else if (ls > 0) {
    var mj = ls;
}
//显示结果
alert(fj + "分" + mj + "秒");
//toast(fj + "分" + mj + "秒");