auto.waitFor(); // 如果没开启无障碍服务就一直等待开启再执行下面的代码
setScreenMetrics(1080, 1920); // 适配分辨率

app.launch("com.jifen.qukan"); // 打开app(包名)
waitHome();
clickButtonOnce('头条', '刷新'); // 确保进入文章界面
sleep(3000);
//exit();

let swipeHomeFailures = 0;
while(true) {
    const paper = textMatches("\\d+评").findOne(1000);
    // parent为空说明找到的时候刷新到窗口外了
    if (paper != null && paper.parent() != null) {
        swipeHomeFailures = 0;
        if (paper.parent().find(text("视频")).empty() && paper.parent().find(text("置顶")).empty()) {
            // 进入新闻开始阅读
            clickEx(paper.parent().parent().parent().bounds(), "查看新闻:" + paper.parent().parent().parent().child(0).text());
            if (text("我来说两句...").findOne(6000) != null) {
                for (var i = 0; i < random(3, 6); i++) {
                    sleep(random(4000, 6000));
                    swipePaper();
                }
                back();
                waitHome();
            };
        }
        swipeHome();
    } else {
        swipeHomeFailures++;
        if (swipeHomeFailures >= 5) {
            swipeHomeFailures = 0;
            text('刷新').findOne().click();
            sleep(random(3000, 5000));
        } else {
            swipeHome();
        }
    }
}


// 等待主页
function waitHome() {
    className("android.widget.Button").text("我的").waitFor(); // 等待按钮文本为"我的"Button出现
}

// 点击按钮列表，成功一次就返回
function clickButtonOnce() {
    for (let button of arguments) {
        const success = click(button);
        if (success) return;
    }
}

// 随机位置点击
function clickEx(pos, msg) {
	const x = pos.left;
	const y = pos.top;
	const width = pos.right - pos.left;
	const height = pos.bottom - pos.top;
	const tapX = x + random(10, width - 10);
	const tapY = y + random(10, height - 10);
	click(tapX, tapY);
	log(msg);
}

// 滑动主页
function swipeHome() {
    var width = device.width;
    var height = device.height;
    var startX = random(200, width - 200);
    var startY = random(height / 2 - 300, height / 2 + 300);
    var endX = startX + random(-20, 20);
    var endY = startY - random(500, 700);
    var swipeTime = random(300, 1500);
    swipe(startX, startY, endX, endY, swipeTime);
    sleep(random(1000, 3000));
}

// 滑动文章页
function swipePaper() {
    var width = device.width;
    var height = device.height;
    var startX = random(200, width - 200);
    var startY = random(height / 2 - 100, height / 2 + 500);
    var endX = startX + random(-20, 20);
    var endY = startY - random(500, 700);
    var swipeTime = random(300, 1000);
    swipe(startX, startY, endX, endY, swipeTime);
}
