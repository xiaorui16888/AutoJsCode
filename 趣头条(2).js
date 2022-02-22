auto();
function autoRead(){//随机滑动防止被检测
	var i=0
	var x1=500
	var y1=600
	var x2=500
	var y2=1400
	var sx1=x1+random(0,80)
	var sy1=y1+random(0,50)
	var sx2=x2+random(0,80)
	var sy2=y2+random(0,50)
	var rancount=random(3,7)//随机滑动三至七次
	while (i<rancount){
		var rantime=random(750,1250)
		swipe(sx1, sy1, sx2, sy2, rantime)
		var rantime=random(3000,7500)//随机滑动间隔
		sleep(rantime)
		i++
}
}
function autoswipe(){
	var i=0
	var x1=500
	var y1=600
	var x2=500
	var y2=1100
	var sx1=x1+random(0,80)
	var sy1=y1+random(0,50)
	var sx2=x2+random(0,80)
	var sy2=y2+random(0,50)
	var rancount=random(2,5)
	while (i<rancount){
		var rantime=random(750,1250)
		swipe(sx1, sy1, sx2, sy2, rantime)
		var rantime=random(2000,3500)
		sleep(rantime)
		i++
}
}
while(){//通过寻找时间关键词来点新闻
if(click("刚刚")){
	autoRead();
}
if(click("小时")){
	autoRead();
}
if(click("分钟")){
	autoRead();
}
autoswipe();
}