var s = "123457";//密码6位数
for (var i= 0; i < s.length; i++) {
    var c = text(s[i].toString()).findOne();
    if (c) {
        c = c.bounds();
        press(c.centerX(), c.centerY(), 100);
    }
    sleep(40)
}

