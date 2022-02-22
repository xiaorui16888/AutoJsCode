for (;;) {
    var pl = desc("评论").find();
    for (i = 0; i < pl.length; i++) {
        pl[i].click();
        sleep(150);
        var z = text("赞").findOnce()
        if (z) {
            if (z.parent().clickable() == true) {
                z.parent().click();
            }
        }

    }
    sleep(150);
    scrollDown();
    sleep(200);
};