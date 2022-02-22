toast("使用方法:运行脚本后开始游戏即可");
do {
    var s = descMatches(/\d+/).find();
} while (s.size() != 25)
desc("1").waitFor()
for (var i = 1; i <= 25; i++) {
    var c = desc(i.toString()).findOne();
    //log(c)
    if (c) {
        c = c.bounds();
        press(c.centerX(), c.centerY(), 100);
    }
    sleep(40)
}