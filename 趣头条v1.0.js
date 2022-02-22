"auto";
//打开趣头条
app.launch("com.jifen.qukan");
//每隔1秒检测趣头条是否打开
waitForActivity("com.jifen.qkbase.main.MainActivity", 1000);
//获取任务按钮的位置
var renwu = id("com.jifen.qukan:id/jz").findOne().bounds();
//点击任务按钮
huqb_click(renwu, "点击任务按钮签到");
//点击头条按钮回到首页
var shouye = id("com.jifen.qukan:id/jv").findOne().bounds();
huqb_click(shouye, "点击首页按钮回到主页面");
for(var index=0;index<100;index++){
	//如果时段奖励存在则领取时段奖励
	if (className("android.widget.TextView").text("60").exists()) {
		var lingqu = className("android.widget.TextView").text("60").findOne().bounds();
		huqb_click(lingqu, "领取时段奖励");
	}
	//查找新闻位置
	if (id("com.jifen.qukan:id/z0").findOne(6000) != null) {
		var xinwen = id("com.jifen.qukan:id/z0").findOne(6000);
		huqb_click(xinwen.bounds(), "查看新闻:" + xinwen.text());
		sleep(random(1000, 3000));
		//进入新闻开始阅读
		if (id("com.jifen.qukan:id/fh").findOne(6000) != null) {
			//阅读文章
			for (var i = 0; i < 20; i++) {
				var width = device.width;
				var height = device.height;
				var startX = random(100, width - 100);
				var startY = random(height - 300, height - 100);
				var endX = startX + random(-20, 20);
				var endY = startY - random(500, 1000);
				var swipeTime = random(1000, 3000);
				swipe(startX, startY, endX, endY, swipeTime);
			}
			//返回首页	
			for (var i = 0; i < 10; i++) {
				back();
				sleep(1000);
				if (id("com.jifen.qukan:id/jv").findOne(6000) != null) {
					log("阅读文章完毕，返回到首页");
					break;
				}
			}
			waitForActivity("com.jifen.qkbase.main.MainActivity", 1000);
			shouye = id("com.jifen.qukan:id/jv").findOne().bounds();
			huqb_click(shouye, "点击刷新按钮刷新新闻");
		};
	} else {
		//没有找到则刷新新闻
		var shouye = id("com.jifen.qukan:id/jv").findOne().bounds();
		huqb_click(shouye, "点击刷新按钮刷新新闻");
	}
}

//自定义点击事件
function huqb_click(pos, msg) {
	var x = pos.left;
	var y = pos.top;
	var width = pos.right - pos.left;
	var height = pos.bottom - pos.top;
	var tapX = x + random(10, width - 10);
	var tapY = y + random(10, height - 10);
	click(tapX, tapY);
	sleep(random(1000, 3000));
	log(msg);
}
