function 下滑() {
    swipe(400, 500, 400, 1000, 600);
}

function 上下滑动() {
    swipe(400, 500, 400, 1000, 600);
    sleep(400);
    swipe(400, 1000, 400, 500, 600);
}

function 推荐中控件y坐标() {
    temp_con = text("推荐中").findOnce(); //推荐中这个控件看不到，但存在，可以通过边界是否变化了来控制
    temp_conY = temp_con.bounds().centerY();
    return temp_conY
}



function 点击() {
    click_bounds = text("刚刚").findOne().bounds()
    click(click_bounds.centerX(), click_bounds.centerY());
}

auto.waitFor();
app.launchPackage("com.news.tutoutiao");
waitForActivity("com.news.tutoutiao.MainActivity");

while (1) {

    //每500毫秒检查一遍是否刷新完毕,
    tem_conY1 = 推荐中控件y坐标();
    sleep(500);
    下滑();
    do {
        sleep(50);
        tem_conY2 = 推荐中控件y坐标();
    }
    while (tem_conY1 != tem_conY2)
    toastLog("刷新完毕")


    sleep(50);
    点击();
    sleep(500);

    do {
        sleep(10)
        tem_con = text("加载中...").findOnce();
    } while (tem_con)

    toastLog("加载完毕")

    var time_swip = 0;
    //通过上下滑动模拟人在操作
    do {
        上下滑动()
        sleep(500);
        time_swip++
        if (time_swip > 7) {
            break;
        }
    }while(1)

    //set_id=setInterval(下滑(),500);

    //   clearInterval(set_id)
    back();
    sleep(500);
}