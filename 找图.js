/**
	找图。
	如何使用?
	var img = readImage("/sdcard/xxx.jpg");
	toast(findImage(captureScreen(), img));
**/


function readImage(path){
	return android.graphics.BitmapFactory.decodeFile(path);
}

function fastCompare(mainImage, x, y, img){
	if(images.pixel(mainImage, x, y) != images.pixel(img, 0, 0)){
		return false;
	}
	var w = img.getWidth();
	var h = img.getHeight();
	var samples = [[w - 1, 0], [0, h - 1], [w - 1, h - 1], [w / 2, h / 2]];
	var len = samples.length;
	for(let i = 0; i < len; i++){
		if(images.pixel(mainImage, x + samples[i][0], y + samples[i][1]) 
			!= images.pixel(img, samples[i][0], samples[i][1])){
			return false;
		}
	}
	return true;
}

function compare(mainImage, x, y, img){
	var w = img.getWidth();
	var h = img.getHeight();
	for(var i = 0; i < w; i++){
		for(var j = 0; j < h; j++){
			if(images.pixel(mainImage, x + i, y + j) != images.pixel(img, i, j)){
				return false;
			}
		}
	}
	return true;
}

function findImage(mainImage, img, x0, y0){
	if(typeof(img) === "string"){
		img = readImage(img);
	}
	x0 = x0 || 0;
	y0 = y0 || 0;
	var w = mainImage.getWidth() - img.getWidth();
	var h = mainImage.getHeight() - img.getHeight();
	for(var x = x0; x < w; x++){
		for(var y = x0; y < h; y++){
			if(fastCompare(mainImage, x, y, img) && compare(mainImage, x, y, img)){
				return {
					"x": x,
					"y": y
				};
			}
		}
	}
	return null;
}

if(!requestScreenCapture()){
  stop();
}
var img = readImage("/storage/emulated/0/IMG_20170718_183729.jpg");
sleep(4000);
toastLog("开始");
toastLog(findImage(captureScreen(), img));