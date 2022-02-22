//小七对本脚本做部分备注，方便大家解读脚本。（我不是作者哦！！！）

var isAuthor = false; //如果你不是作者，这里务必为false，不然各种报错。
var debug = false; //开启调试，会截图保存到本地
var useShell = false; //使用shell命令执行模拟输入tap、swipe动作。如果你的滑动不了或者点能量球点不了，测试把它改为true
var debug_dir = "/sdcard/debug/take/";
if (debug) {
	files.ensureDir(debug_dir);  //小七注：判断 路径debug_dir文件夹 是否存在，不存在则创建该文件夹。
}

//检测手机是否已root，如果root，下面的代码会自动开启autojs的无障碍服务！！！
if (isRoot()) {   //小七注：isRoot()函数 是作者自己建立的函数，在脚本的末尾位置，不嫌累的自己往后捯。

	var s = shell("settings get secure enabled_accessibility_services", true).result.replace(/\n/, "");
	//小七注：上面一句中的shell指令是  获取系统中 已经开启的 无障碍服务 列表，
	// 字符串.replace(正则表达式,文本)  函数功能是：用 文本 替换字符串中满足正则表达式的部分，返回替换后的 完整的字符串。

	log(s);

	if (s.indexOf("stardust") == "-1") {
	//小七注：原字符串.indexOf(目标字符串)  功能是：在原字符串中查找 目标字符串的位置，找不到就返回-1。
	//这个判断在这里目的是 判断 auto.js 是否 没有开启无障碍服务。

		var stardust = "com.stardust.scriptdroid/com.stardust.scriptdroid.accessibility.AccessibilityService";
		var code = shell("settings put secure enabled_accessibility_services " + s + ":" + stardust, true).code;
		//小七注：上面的shell()就是尝试把js的无障碍服务写入已开启列表的。code是返回的信息，如果是0，表示执行成功。非0表示失败。

		if (code) {
			toastLog("尝试开启无障碍服务异常");
		}
	}
	shell("settings put secure accessibility_enabled 1", true);
	//小七注：开启系统的无障碍服务。
}

if (isAuthor) { //小七注：判断变量isAuthor的真假。
	var unlock = require("unlock"); //小七注：加载另一个同文件夹下的unlock.js文件（这是作者自己写的一个文件）

	unlock();

	shell("pm enable com.eg.android.AlipayGphone", true);  //小七注：启用应用 支付宝。

} else {

	device.wakeUp(); //小七注：device.wakeUp() 唤醒屏幕。（本地教程 device模块中有，自行查看）
}

sleep(3000);
var temp = images.read("/sdcard/take.png"); //小七注：读取图片文件。

if (!temp) {  //小七注：判断读取图片 是否没有成功。

	toastLog("缺少图片文件，请仔细查看\n使用方法的第一条！！！");
	switch (device.width) { //小七注：device.width 获取屏幕宽度。

		case 1080: //小七注：依据不同的屏幕宽度 选择不同分辨率的 图片进行下载。
		temp = images.load("https://raw.githubusercontent.com/start201711/autojs/master/take.png");
		break;
		case 720:
		temp = images.load("https://raw.githubusercontent.com/start201711/autojs/master/take720p.png");
		break;
		default:
		temp = null;
		break;
	}

	if (!temp) {  //小七注：判断变量是否为 非空。
		toastLog("尝试下载take.png失败,脚本停止运行");
		exit();
	}
	toastLog("现在将尝试使用别人的图片，分辨率可能不匹配，脚本可能无法正常执行");
}
var r = new Robot(); //小七注： Robot()是一个 对象构造函数，作者自己写的，在后面的程序里，自己往下找。
var dh = 40 * device.height / 720;


//向系统申请截图时，自动确认
new java.lang.Thread(function() {   //小七注： 利用Java.lang.Thread定义一个新的线程（具体的不了解还没学习Java）。
	classNameContains("Button").textContains("立即开始").click();   //小七注： 找到并单击 立即开始 按钮（一般情况下这个没必要）。
}).start();


if (!requestScreenCapture()) {  //小七注： 向系统发出截图请求，判断请求是否 不被允许。
	toast("请求截图失败，脚本退出");
	exit();
}
toastLog("即将收取蚂蚁森林能量，请勿操作！");

launch("com.eg.android.AlipayGphone");  //小七注： 打开 支付宝。
waitForPackage("com.eg.android.AlipayGphone"); //小七注： 等待进入支付宝程序。


clickSenlin();  //小七注： 作者自定义的函数，在后面的脚本中。


className("android.widget.Button").desc("攻略").waitFor(); //小七注： 等待这个蚂蚁森林的标志性控件出现
toastLog("成功进入蚂蚁森林");
sleep(3000);


takeMyself(); //小七注： 自定义函数，脚本后面自己找。
toastLog("收取自己的能量完毕");
sleep(2000);

takeInRank();//小七注： 自定义函数，脚本后面自己找。
toastLog("收取更多好友的能量");
sleep(2000);


//通知tasker下一次运行脚本的时间，全天候自动挂机

if (isAuthor) {  //小七注： 判断变量是否为真。

	var loop = require("loop"); //小七注： 加载同目录下的loop.js脚本模块（作者自己写的）。

	loop(); //将等待下一次时间写入文件中给tasker
	sleep(2000);
}

var more = descContains("查看更多好友").findOne();

r.pressCenter(more);
 //小七注： r是上面（大概在73行）利用对象构造函数定义的一个 对象。
 //小七注： pressCenter()是这个对象中定义的一个 方法。

sleep(5000);
takeMore(); //小七注： 自定义函数，脚本后面自己找。
toastLog("收取能量完毕");
idContains("h5_tv_nav_back").click();
sleep(2000);
idContains("h5_tv_nav_back").click();


if (isAuthor) { //小七注： 判断变量是否为真。
	shell("pm disable com.eg.android.AlipayGphone", true);
	//小七注： 冻结应用程序 支付宝
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
			//小七注：findImage(大图, 小图) 在大图中 查找小图的 位置，找到返回位置坐标，找不到返回null。
			//temp 是在脚本前部分定义的，内容是一个图片。

			if (debug) {  //小七注：debug 脚本开始时定义的一个变量
				toastLog("进入好友的森林");
			}
			r.press(device.width / 2, p.y + dh, 100); //小七注：r是作者在前面定义的一个对象。
			takeOther();
			sleep(1000);
			idContains("h5_tv_nav_back").click();
			sleep(2000);
		}
		if (debug) { //小七注：debug 脚本开始时定义的一个变量
			images.captureScreen(debug_dir + new Date().getTime() + ".png");
			//小七注：images.captureScreen(路径)是截图并保存的指定路径。
			//debug_dir是作者在脚本开始位置定义的一个文件夹路径。
			//new Date() 是获取当前系统的时间。
			//Date对象.getTime()是获取从 1970年1月1日 到 Date对象指定时间 的毫秒数。
		}

		if (descContains(end).find().size() > 0) {
		//小七注：descContains(字符串) 是筛选控件中desc属性包含 指定字符串 的控件
		//控件集.size() 是获取控件集合中控件的数量，也可以用 控件集.length 
		// size()是一个函数，length是一个属性。

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
		//小七注：Math.pow(x,y)是计算 x的y次幂 返回值就是计算的结果
	}
}

function clickSenlin() {
	var b = text("蚂蚁森林").findOne().bounds();
	var a = idContains("home_app_view").untilFind().filter(o => {
		//小七注：控件集.filter(function) 筛选控件集中使function函数返回值为真的控件，最终的返回值依旧是一个控件集合。
		return o.bounds().contains(b);
		//小七注：contain(b)是判断前面的 矩形区域 是否包含 b区域。
	});
	while (!a[0].click());
}

function Robot() {
	var r = null;
	if (device.sdkInt < 24) {
		if (isRoot()) {
			r = new RootAutomator(); //小七注：新建一个RootAutomator对象，用来模拟触摸操作。详细注释自己查看本地教程 基于坐标的触控操作。
		} else {
			toastLog("本脚本需要android7.0以上或者已root才能使用");
			exit();
		}
	}
	var _useShellCmd = useShell;  //小七注：useShell变量是脚本开始位置定义的一个变量。

	this.press = function(x, y, duration) { //小七注：新建一个方法。

		if (duration == undefined) {
			duration = 100;
		}
		if (r == null) {

			press(x, y, duration); //小七注：press(x,y,time)按压坐标点(x,y)持续 time毫秒。

		} else if (_useShellCmd) {

			Swipe(x, y, x, y, duration);
			//小七注：Swipe(x1,y1,x2,y2,time)从点(x1,y1)滑动到点(x2,y2)，过程持续time毫秒（需要root权限）

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
		//小七注：java.io.File(路径).exists() 判断指定的文件是否存在（Java的内容，我还没学）。
		//a || b 是对两个逻辑值进行或运算（返回逻辑值 a或b的运算结果），
		//还经常见到  变量s = 变量a || 字符串b; 这种形式，
		//如果 a 为 null（空）、undefined （未定义）、false（假）、NaN（非数字量）、""（空文本）则变量s就会被赋值为 字符串b。
	} catch (e) {
		print(e);
	}
	return bool;
}
//小七注：try {} catch (error){} 是 如果try中的程序发生错误（或者遇到exit()函数），则执行catch 中的程序。
//这两个是成对出现的，catch 就是用来 捕捉 try 中的错误的。错误的内容会被赋值到 变量error 中。



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
