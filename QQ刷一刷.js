/**
 * @Author      xzyx
 * @DateTime    2017-10-31
 * @Function 	定时QQ刷一刷 （for QQ刷红包）
 * @description tasker触发时间事件，唤醒并解锁手机，执行此autojs脚本
 */
auto()
setScreenMetrics(1080, 1920)
var sleepTime = 200
var initial = 10 //默认持续时间

screenStatus()
goToQQ()
shua(initial)
exit()


function screenStatus() { //判断设备是否处于锁定状态，如果是则解锁设备，使用默认值，锁定设备；否则直接提示设置参数
	unlock = shell("dumpsys window policy|grep mScreenOnFully", true).result.match(/.*=(.*)/)[1]
	if (unlock == "false") {
		sh = new Shell(true)
		sh.exec("input keyevent 26")
		sleep(sleepTime * 5)
		sh.exec("input swipe 500 1600 500 950")
		sleep(sleepTime * 5)
		sh.exec("input keyevent 29 15 11 11 12 9 12 10")
		sleep(sleepTime * 5)
		sh.exec("input tap 1000 1800")
		sleep(sleepTime * 5)
	} else {
        initial = rawInput("请指定脚本持续时间(秒)", 10)
        if(initial == null){
            exit()
        }
	}
}

function goToQQ() {
	launchApp("QQ")
	sleep(sleepTime)
		//如果有锁则模拟手势解锁
	if (!id("lockPattern").find().empty()) {
		gesture(800, [840, 1000], [538, 1000], [538, 1600], [840, 1600], [840, 1300], [235, 1300], [235, 1600])
		sleep(400)
	}
	//返回QQ主界面
	while (descContains("返回").clickable().exists() || textContains("返回").clickable().exists()) {
		if (descContains("返回").clickable().exists()) {
			descContains("返回").clickable().findOne().click()
			sleep(300)
		}
		if (textContains("返回").clickable().exists()) {
			textContains("返回").clickable().findOne().click()
			sleep(300)
		}
	}
	//进入消息界面并滑动到顶部
	text("消息").scrollable(false).id("name").findOne().parent().click()
	while (scrollable().findOne().scrollBackward()) {

	}
}

function shua(initial) {
	var bottom = id("ivTitleName").findOne().parent().bounds().bottom
	var nowTime = Date.now()    //当前时间戳
	var holdTime = initial * 1000
	var latter = nowTime + holdTime
	while (nowTime <= latter) {
		nowTime = Date.now()
		swipe(540, bottom, 500, bottom + 600, 250)
		click(540, bottom + 1)
		sleep(150)
	}
}