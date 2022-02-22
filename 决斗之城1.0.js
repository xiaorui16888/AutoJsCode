/*
决斗之城脚本1.0
作者：wuxincoc
脚本类型:Auto.js
支持设备：安卓手机安装Auto.js 3.0并开启无障碍模式,需要开启root权限或者安卓7.0以上才能运行本脚本
支持分辨率：目前1.0版本只支持分辨率为720*1280

*/
requestScreenCapture(true);

var scene = 0;//0 不知道 1首页 2决斗之城 3战场未自动 4战场已自动 5胜利 6失败 7升级
var im=0;
var timeout = false;
var t=null;

//获得手机的分辨率
const w= device.width;//720
const h= device.height;//1280
	
/*
while(true){
	
	im = captureScreen();
	
	//如果没在决斗之城，就去看是否在首页，是首页就进入决斗之城，是决斗之城就进入战场并点击自动
	if(!skip_dfdu()){
		is_home() ? click(888, 300):log("没找到-游戏首页");
		sleep(2000);
		continue;
	}else{
		//判断游戏是否结束，若结束就点击返回重新进入决斗之城
		is_game_finish() ? click(400, 666):log("没找到-战斗收获页面");
	}
	//break;
	sleep(3200);
	a++;
}
*/

main();

//-------------
function main(){
	
	requestScreenCapture(true);
	device.keepScreenOn(1000 * 3600 * 5);
	
	while(true){
		//每次循环都会判断当前运行的软件是不是决斗之城
		waitForPackage("com.leocool.yugioh.ay");
		
		switch(scene){
			case 0:
			  im = captureScreen();//未标识的场景时先进行截屏
			  prepare();
			  break;
			case 1:
			  click(888, 300)//进入决斗之城
			  log("进入决斗之城...");
			  scene = 2;
			  sleep(3000);
			  break;
			case 2:
			  click(666, 555);//进入战斗页面
			  log("进入战斗页面...");
			  sleep(6000);
			  scene = 3;
			  break;
			case 3:
			  click(45, 160);//点击自动战斗
			  log("开始自动战斗...");
			  sleep(3000);
			  scene = 4;
			  break;
			case 4:
			  //监控战场 截图 
			  dfdu();
			  break;
			case 5:
			  log("战斗胜利.");
			  click(400, 666)
			  scene = 0;
			  break;
			case 6:
			  log("战斗失败.");
			  click(400, 666)
			  scene = 0;
			  break;
			case 7:
			  log("等级提升+1");
			  click(600, 510)
			  sleep(100);
			  click(400, 666);
			  scene = 0;
			  break;
		}
		
		sleep(1200);

	}
}

function prepare(){
	log("脚本初始化中...");
	if(is_home()){
		scene = 1;
	}else if(isDfdu()){
		scene = 2;
	}else if(isFight()){
		//在战斗场景中判断，没有自动战斗就开启自动战斗模式
		if(is_auto_battle()){
			click(45, 160);
			sleep(200);
			scene = 4;
			return;
		}
		scene = 3;//设置为自动
	}else if(isVictory()){
		scene = 5;
	}else if(isFail()){
		scene = 6;
	}else if(isLevelUp()){
		scene = 7;
	}else{
		
	}
}

//1首页   2决斗之城 3战场未自动    4战场已自动    5胜利      6失败   7升级
//isHome  isDfdu	is_auto_battle  isFight		  isVictory   isFail  isLevelUp

//战斗
function dfdu(){
	if(scene == 4 && !timeout){
		//log("开启定时器...");
		//t = setInterval(monitor,3200);
		
		monitor();
		sleep(3200);
	}
}

//监控战斗
function monitor(){
	im = captureScreen();
	//log("定时器运行中");
	//timeout = true;
	if(isFight()){
		log("战斗进行中...");
		return;
	}
	if(isBackOut()){
		log("出现返回按钮");
		if(isVictory())//胜
			scene = 5;
		if(isFail())//负
			scene = 6;
		//timeout = false;
		//log("关闭定时器...");
		
	}else if(isLevelUp()){
	  scene = 7;
	  //timeout = false;
	  //log("关闭定时器...");
	  
	}
						
}
//---------------------------------------判断位置
//判断是否是首页，是就返回true
function is_home(){
	
	var result = muchDotIsPiece([
		[0, 0, 200, 100, "#bdc2ce"],
		[0, 0, 200, 100, "#000000",],
		[0, 0, 200, 100, "#3179e6"],
	]);
	
	return result ? true:false;
}

//判断是否是决斗之城，是就返回true
function isDfdu(){
	var result = muchDotIsPiece([
		[600, 520, 200, 100, "#f7c25a"],
		[600, 520, 200, 100, "#ffff00"],
		[600, 520, 200, 100, "#080408"],
	]);
	
	return result ? true:false;
}

//是否自动战斗，是就返回false
function is_auto_battle(){
	
	var piece_top = oneDotIsPiece([25, 160, 30, 15,"#000000"]);

	return piece_top ? false : true;
}

//是否在战斗页面
function isFight(){
	
	var result = muchDotIsPiece([
		[5, 145, 70, 70, "#ffffff"],
		[5, 145, 70, 70, "#083173"],
	]);
	
	return result ? true:false;
}

//判断游戏是否存在返回按钮，存在就返回true
function isBackOut(){
	
	var result = muchDotIsPiece([
		[333, 620, 100, 50, "#5a9608"],
		[333, 620, 100, 50, "#081000"],
		[333, 620, 100, 50, "#fffbef"],
	]);

	return result ? true:false;
}


//是否胜利
function isVictory(){ 
	var result = oneDotIsPiece([0, 300, 100,100, "#ff9600"]);
	return result ? true:false;
}

//是否和局
function ishe(){
	//var result = oneDotIsPiece([0, 300, 100,100, "#426184"]);
	//return result ? true:false;
}


//是否失败
function isFail(){
	var result = oneDotIsPiece([0, 300, 100,100, "#426184"]);
	return result ? true:false;
}

//是否升级
function isLevelUp(){
	var result = muchDotIsPiece([
		[500,450, 100,90, "#088ede"],
		[500,450, 100,90, "#84c631"],
		[500,450, 100,90, "#efebde"],
	]);
	return result ? true:false;
}

//----------------------------判断位置 end-----------------------
//是否在决斗之城并点击进入，如果没有点击自动战斗就点击自动战斗

//判断在图片某个区域中存在某点
function oneDotIsPiece(arr){
	
	var x;
	var myArray=new Array()
	for (x in arr)
	{
		myArray[x]=arr[x];
	}
	var piece_one = findColor(im, myArray[4], {
		region: [myArray[0], myArray[1], myArray[2], myArray[3]],
        threshold: 2
    });
	if(piece_one)return true;
	return false;
}


//判断在图片某个区域中存在多个点
function muchDotIsPiece(arr){
	var x;
	var myArray=new Array()
	
	//保证传递的参数是一个二维数组
	if(arr[0] instanceof Array)
		len = arr.length;
	
	for (x in arr)
	{
		if(!oneDotIsPiece(arr[x]))
			return false;
	}

	return true;
}