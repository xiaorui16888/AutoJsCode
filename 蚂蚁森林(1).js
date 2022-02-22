

//转载请注明来自酷安用户@群主让我注册 
//根据此代码修改，请注明根据酷安@群主让我注册 修改
//注意，脚本随时更新，记得经常来看看脚本是不是又更新了
//脚本下载地址：https://github.com/start201711/autojs?files=1
//软件下载地址：https://github.com/hyb1996/Auto.js/releases
//设备要求：需要root或者安卓7.0以上，以及autojs软件版本3.0版本以上才能使用
//使用方法：
//1.准备工作：只需要一张小图片
//即：可以收取好友能量的时候，好友右上角那个绿色的小手图像，只要能包括绿色小手的图像就行，
//不能使用大的图像，命名为take.png，放在sdcard根目录下
//2.直接运行脚本即可，不用点自己打开支付宝。（一般的话，设置为定时脚本，每天定时执行，无需看护！！）
//3.如果手机没有解锁屏幕，是运行不了的。所以需要自己想办法解锁屏幕。
//  如果会写解锁屏幕代码，请自行编写解锁模块的代码（本文最后有示例）；如果不会写解锁屏幕代码，请勿设置手机锁屏密码；
//4.申请截图的权限时，不需要手动点击"立即开始"，脚本会自行点击"立即开始"。
//5.这里内置两种抓取能量球的方式，可以互换使用。
//6.由于我只有5.1系统的手机，我也不知道在不同版本的手机的press和swipe函数效果如何，这个碰上了再解决吧。
//7.建议第一次使用本脚本的时候，打开开发者模式的显示指针位置和触摸操作，可以直观的看到整个收取能量过程
//8.本脚本可以配合tasker或者exposed edge的定时任务使用。
//  可能在7.0上面滑动没有那么"自然"
//
//最后修改于：2018-02-03
//修改说明：
//	2018-01-11 12:28:29 
//	1.添加一个例外情况（绿色能量）
//	2.修改流程使之更完善，现在基本上没有问题了
//	2018-01-11 23:16:25
//	1.不再需要结束图片
//	2018-01-13 12:45:21
//	1.将click换成press
//	2.如果没有take.png将尝试下载远程的图像
//	3.添加root权限检查
//	4.对于已root设备，将会使用shell命令强制开启autojs的无障碍服务
//	2018-01-13 20:38:14
//	1.添加两种分辨率
//	2.增加默认的按压时间，由50改为100
//	2018-01-14 11:28:32
//	1.添加进森林的兼容方案
//	2.新发现部分人的swipe、press没用，这个我也无能为力了
//	2018-01-23 01:40:57
//	1.添加进入更多好友的代码
//	2.发现更多的问题。。。。
//	2018-02-02 00:00:16
//	1.尝试修复部分手机不点击、不滑动的bug。
//      2.关闭调试
//      3.修复路径问题。
var isAuthor = false; //如果你不是作者，这里务必为false，不然各种报错。
var debug = false; //开启调试，会截图保存到本地
var useShell = false; //使用shell命令执行模拟输入tap、swipe动作。如果你的滑动不了或者点能量球点不了，测试把它改为true
var debug_dir = "/sdcard/debug/take/";
if (debug) {
	files.ensureDir(debug_dir);
}

//检测手机是否已root，如果root，下面的代码会自动开启autojs的无障碍服务！！！
if (isRoot()) {
	var s = shell("settings get secure enabled_accessibility_services", true).result.replace(/\n/, "");
	log(s);
	if (s.indexOf("stardust") == "-1") {
		var stardust = "com.stardust.scriptdroid/com.stardust.scriptdroid.accessibility.AccessibilityService";
		var code = shell("settings put secure enabled_accessibility_services " + s + ":" + stardust, true).code;
		if (code) {
			toastLog("尝试开启无障碍服务异常");
		}
	}
	shell("settings put secure accessibility_enabled 1", true);
}

if (isAuthor) {
	var unlock = require("unlock"); //解锁模块
	unlock();
	shell("pm enable com.eg.android.AlipayGphone", true);
} else {
	//请自己想办法让手机屏幕解锁可以进行操作
	device.wakeUp();
}

sleep(3000);
var temp = images.read("/sdcard/take.png");

if (!temp) {
	toastLog("缺少图片文件，请仔细查看\n使用方法的第一条！！！");
	switch (device.width) {
		case 1080:
		temp = images.load("https://raw.githubusercontent.com/start201711/autojs/master/take.png");
		break;
		case 720:
		temp = images.load("https://raw.githubusercontent.com/start201711/autojs/master/take720p.png");
		break;
		default:
		temp = null;
		break;
	}

	if (!temp) {
		toastLog("尝试下载take.png失败,脚本停止运行");
		exit();
	}
	toastLog("现在将尝试使用别人的图片，分辨率可能不匹配，脚本可能无法正常执行");
}
var r = new Robot();
var dh = 40 * device.height / 720;


//向系统申请截图时，自动确认
new java.lang.Thread(function() {
	classNameContains("Button").textContains("立即开始").click();
}).start();


if (!requestScreenCapture()) {
	toast("请求截图失败，脚本退出");
	exit();
}
toastLog("即将收取蚂蚁森林能量，请勿操作！");

launch("com.eg.android.AlipayGphone");
waitForPackage("com.eg.android.AlipayGphone");

//有人说进不去森林，但是查看布局分析是没问题的
//这里使用一个兼容的办法clickSenlin(); 
//如果你的进不去，你可以把下面的这句换成while (!click("蚂蚁森林"));
//如果还不行，你换成r.press(x,y);//x,y是需要点击的森林的位置。
//如果再不行，那你换成Tap(x,y);//x,y是需要点击的森林的位置。
//如果再再不行，那就shell("input  tap x y");//x,y是需要点击的森林的位置。
//如果再再再不行，去支付宝充把火麒麟就好了（#滑稽）
clickSenlin(); //兼容方法


className("android.widget.Button").desc("攻略").waitFor();
toastLog("成功进入蚂蚁森林");
sleep(3000);


takeMyself();
toastLog("收取自己的能量完毕");
sleep(2000);

takeInRank()
toastLog("收取更多好友的能量");
sleep(2000);


//通知tasker下一次运行脚本的时间，全天候自动挂机
if (isAuthor) {
	var loop = require("loop");
	loop(); //将等待下一次时间写入文件中给tasker
	sleep(2000);
}

var more = descContains("查看更多好友").findOne();

r.pressCenter(more);

sleep(5000);
takeMore();
toastLog("收取能量完毕");
idContains("h5_tv_nav_back").click();
sleep(2000);
idContains("h5_tv_nav_back").click();


if (isAuthor) {
	shell("pm disable com.eg.android.AlipayGphone", true);
}
exit();

/******************收取能量函数********************/


function takeInRank() {
	takeOthers("爱心捐赠");
}


function takeMore() {
	takeOthers("没有更多了")
}

function takeOthers(end) {
	while (1) {
		for (var p = findImage(captureScreen(), temp); p; p = findImage(captureScreen(), temp)) {
			if (debug) {
				toastLog("进入好友的森林");
			}
			r.press(device.width / 2, p.y + dh, 100);
			takeOther();
			sleep(1000);
			idContains("h5_tv_nav_back").click();
			sleep(2000);
		}
		if (debug) {
			images.captureScreen(debug_dir + new Date().getTime() + ".png");
		}

		if (descContains(end).find().size() > 0) {
			if (descContains(end).findOne().bounds().top < device.height) {
				break;
			}

		}
		r.swipe(device.width / 2, device.height * 2 / 3, device.width / 2, device.height * 1 / 3);

		sleep(2000);
	}

}

function takeMyself() {

	take("攻略");
}

function takeOther() {

	take("浇水");
}

function take(desc) {
	var right_bottom = className("android.widget.Button").desc(desc).findOne();
	log(right_bottom);
	var left_top = descContains("返回").findOne();
	log(left_top);

	var filtes = [];
	var left = 0;
	var right = device.width;
	var top = left_top.bounds().bottom;
	var bottom = right_bottom.bounds().top;

	log(left + "-" + top + "-" + right + "-" + bottom);
	sleep(2000);
	var all = descMatches("^(绿色能量|\\d+g)$").boundsInside(left, top, right, bottom).untilFind();
	toastLog("找到" + (all.size() - 1) + "个能量球");
	all.each(function(x) {
		filtes.push(x);
	});

	filtes.sort(function(o1, o2) {
		return distance(o1) - distance(o2);
	});

	if (filtes.length > 0) {
		filtes.splice(0, 1);
	}
	if (debug) {
		images.captureScreen(debug_dir + new Date().getTime() + ".png");
	}
	for (var i = 0; i < filtes.length; i++) {
		r.pressCenter(filtes[i], 100);
		sleep(1000);
		log("点击->" + filtes[i]);
	}


	function distance(o) {
		return Math.pow((o.bounds().top - top), 2) + Math.pow((o.bounds().right - right), 2);
	}
}

function clickSenlin() {
	var b = text("蚂蚁森林").findOne().bounds();
	var a = idContains("home_app_view").untilFind().filter(o => {
		return o.bounds().contains(b);
	});
	while (!a[0].click());
}

function Robot() {
	var r = null;
	if (device.sdkInt < 24) {
		if (isRoot()) {
			r = new RootAutomator();
		} else {
			toastLog("本脚本需要android7.0以上或者已root才能使用");
			exit();
		}
	}
	var _useShellCmd = useShell;

	this.press = function(x, y, duration) {
		if (duration == undefined) {
			duration = 100;
		}
		if (r == null) {
			press(x, y, duration);
		} else if (_useShellCmd) {
			Swipe(x, y, x, y, duration);
		} else {
			r.press(x, y, duration);
		}
	}

	this.pressCenter = function(obj, duration) {
		this.press(obj.bounds().centerX(), obj.bounds().centerY(), duration);
	}
	this.swipe = function(x1, y1, x2, y2, duration) {
		if (duration == undefined) {
			duration = 200;
		}
		if (r == null) {
			swipe(x1, y1, x2, y2, duration);
		} else if (_useShellCmd) {
			Swipe(x1, y1, x2, y2, duration);
		} else {
			r.swipe(x1, y1, x2, y2, duration);
		}
	}
}



function isRoot() {
	var bool = false;
	try {
		bool = new java.io.File("/system/bin/su").exists() || new java.io.File("/system/xbin/su").exists();
	} catch (e) {
		print(e);
	}
	return bool;
}



/*******************解锁模块代码实例，我把自己的代码乱改***********************/
//下面的代码放另一个文件里面
// function unlock() {
// 	var pm = context.getSystemService(context.POWER_SERVICE);
// 	var b = pm.isScreenOn();
// 	if (!b) {
// 		unlock0();
// 	}
// }

// function unlock0() {
// 	"root";
// 	device.wakeUp();
// 	sleep(3000);
// 	var ra = new Robot();
// 	ra.swipe(760, 1000, 360, 750);
// 	sleep(1000);
// 	ra.press(650, 450);
// 	sleep(1000);
// 	ra.press(650, 350);
// 	sleep(1000);
// 	ra.press(160, 750);
// 	sleep(1000)
// 	ra.press(760, 360);
// 	sleep(2000);
// } 


// module.exports = unlock;
