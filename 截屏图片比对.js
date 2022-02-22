var news_icon_down1 = images.load("http://qiniu.zgbiaoxun.com/static/jrbk/news_icon_down1.png");
var news_icon_down2 = images.load("http://qiniu.zgbiaoxun.com/static/jrbk/news_icon_down2.png");
var news_icon_down3 = images.load("http://qiniu.zgbiaoxun.com/static/jrbk/news_icon_down3.png");
let w = device.width;
let h = device.height;

if (!news_icon_down1) {
	news_icon_down1 = images.load("http://qiniu.zgbiaoxun.com/static/jrbk/news_icon_down1.png");
	news_icon_down2 = images.load("http://qiniu.zgbiaoxun.com/static/jrbk/news_icon_down2.png");
	news_icon_down3 = images.load("http://qiniu.zgbiaoxun.com/static/jrbk/news_icon_down3.png");
}else{
	log('开始屏幕截图====');
	
	var tempImage = captureScreen();
	sleep(1000);
	log('tempImage===='+tempImage);
	log('news_icon_down1===='+news_icon_down1);
	log('w===='+w+'====h==='+h);
	log('w*0.3===='+w*0.3+'====h*0.7==='+h*0.7);

	var p1 = findImage(tempImage, new Image(news_icon_down1.getBitmap()), {
		region: [w * 0.3, 16, w * 0.3, h * 0.7],
		threshold: 0.8
	});
	log('p1==========' + p1);
	if (p1) {
		click(p1.x + random(40, 60), p1.y + random(20, 30));
		sleep(2000);
		var falg = true;
		p1.recycle();
	}

	var p2 = findImage(tempImage, new Image(news_icon_down2.getBitmap()), {
		region: [w * 0.3, 16, w * 0.3, h * 0.7],
		threshold: 0.8
	});
	log('p2==========' + p2);
	if (p2) {
		click(p2.x + random(40, 60), p2.y + random(20, 30));
		sleep(2000);
		var falg = true;
		p2.recycle();
	}

	var p3 = findImage(tempImage, new Image(news_icon_down3.getBitmap()), {
		region: [w * 0.3, 16, w * 0.3, h * 0.7],
		threshold: 0.8
	});
	log('p3==========' + p3);

	if (p3) {
		click(p3.x + random(40, 60), p3.y + random(20, 30));
		sleep(2000);
		var falg = true;
		p3.recycle();
	}
}