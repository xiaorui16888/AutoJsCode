/* 
* @Author:攀登
* @Last Modified by:   sqzhang 
* @Last Modified time: 2019-03-04 02:23:31 
* @Description:蚂蚁森林自动收
* @Auto.js Version: 4.1.0 Alpha5 
* @Android Version: 安卓7及以上 
*/
var screen_password = "9821";
//九宫格锁屏密码
var app_password = "9821";
//应用锁密码没有可以忽略
var local_set = storages.create("蚂蚁森林");//本地配置
//local_set.clear()//清空本地配置 取消注释可以不判断时间直接执行
if (local_set.get("蚂蚁森林") > new Date().getTime()){
    exit() 
}
//获取屏幕方向类型 1表示portrait(竖屏),2表示landscape(横屏)
if (context.getResources().getConfiguration().orientation == 2){
    toastLog("支付宝有能量可以收取");
	exit() 
}
//停止除自身之外的其他auto.js脚本
stop_other_script()
//解锁手机 锁屏为九宫格
//若手机无锁屏密码 可注释本行代码
 while (unlock());
//申请截图权限
 if (!requestScreenCapture()) {
     toastLog("请求截图失败,请重新运行");
	 exit(); 
}
var energy_now = 0;//当前能量 
var lock_flag = 0;//锁屏标志
var friend_name;//好友名字对象
var swpe_phone;//滑动手机对象
var have_shielding = JSON.parse(local_set.get(" 有保护罩")||"{}");//保护罩名单
var shortest_time = 99;//最短时间
//启动检测最短时间线程
threads.start(function() {
    events.observeToast();//监听toast消息    
	events.onToast(function(toast) {
	     var pkg = toast.getPackageName();
		 if (pkg == "com.eg.android.AlipayGphone") { //监听到支付宝发来的toast            
		     let str = toast.getText()
			 if (str = str.match(/00:(\d+)后/ )) {
			     if (str[1] < shortest_time) {
				     shortest_time = str[1]
					 log("๋Ꭸ෸ᳵԅ", shortest_time)
				}            
			}        
		}    
	});
})
//开始收取能量
while (1) {    
     sleep(200)    
	 var img = captureScreen();    
	 if ((images.findColorInRegion(img, "#108ee9", 40, 100, 100, 100, threshold = 25) && images.detectsColor(img, "#ffffffff", 10, 100, threshold = 66, algorithm = "diff")) || text("好友排行榜".idEndsWith("h5_tv_title").findOnce()) 
{        
            //log("好友排行榜")
			let a = 460
			for (a = 460; a < 1000; a += random(10, 50)) {
                 if (!images.detectsColor(img, "#ffffffff", 170, a, threshold = 66,
algorithm = "diff")) {
                a = 460
                break            
			}        
		}        
		if (a > 900) {
		     toastLog("好友列表载入中")
			 if (desc("ٚ再试一次").findOnce()) back()
			 sleep(3000)            
			 continue        
		}        
		find_more().open()
        let status = 0
        let hand = find_hand()
        for (let a = 0; a < hand.length; a++) {
		     find_more().close()
		     let name = (control_first([240, hand[a].y, 1008, hand[a].y + 200], depth(13)))
			 if (name) {
			     name = name.desc().replace(/\s/gi, "")
			}            
			log(name, have_shielding[name + "的蚂蚁森林"])
            if (!have_shielding[name + "的蚂蚁森林"] || have_shielding[name + "的蚂蚁森林"] - (-1000 * 60 * 60) < new Date().getTime()) {                
			     local_set.remove(name + "的蚂蚁森林")                
				 click(hand[0].x - 100, hand[0].y + 50)                
				 sleep(1000)                
				 status = 1                
				 break            
			} else {                
			     toastLog(name + " 有保护罩" ) 
			}        
		}       
		if (status) continue;
        var img = captureScreen();
        if (images.findColorInRegion(img, "#30bf6c", 842, 600, 10, 600, threshold = 25)) {            
		log("没有了")
		let last_energy = descEndsWith("’").find()
		for (let a = 0; a < last_energy.length; a++) {
  		     let b = last_energy[a].desc().match(/\d+/)
			 if (b && shortest_time > b[0]) {
			     shortest_time = b[0]
			}
		}            
		back()            
		if (shortest_time == 1) {
		toastLog("还剩"+ shortest_time + "分钟有能量")          
		local_set.put("蚂蚁森林", 5 * 60 * 1000 + new Date().getTime())            
	} else {
	         sleep(1000)                
			 let energy_g = depth(15).descEndsWith("g").findOnce()                
			 if (energy_g) energy_g = energy_g.desc().match(/\d+/)[0] - energy_now
             toastLog(" + "本次共收取到" + energy_g + "g能量\n等待" + shortest_time )+ "分钟会有能量" 			 
			 toastLog(" + "本次共收取到" + energy_g + "g能量\n等待" + shortest_time )+ "分钟会有能量"                
			 toastLog(" + "本次共收取到" + energy_g + "g能量\n等待" + shortest_time )+ "分钟会有能量"                
			 local_set.put("蚂蚁森林", shortest_time * 60 * 1000 + new Date().getTime())                
             if (lock_flag) Power()
			 exit()            
		}
		shortest_time = 99
		sleep(1000)        
	} else {
     	swipe(500, 1688, 565, 248, 100)        
		}        
		sleep(20)
        continue 
	} else {        
	     find_more().close()
	}    
	if (friend_name = textEndsWith("蚂蚁森林").findOnce()) {
	     log("进入", friend_name.text()) 
         if (control_first([], desc("地图"))) {
		     var energy_shielding = images.findColorInRegion(img, "#ffc3fb58", 429, 345, 651 - 429, 23, threshold = 20)            
			 if (energy_shielding) {
			     have_shielding[friend_name.text().replace(/\s/gi, "")] = new Date().getTime()
             local_set.put("蚂蚁森林",JSON.stringify(have_shielding))                
			 toastLog(friend_name.text() + "有保护罩啊你")                
			 back()                
			 sleep(500)            
		} else {                
		     collect_energy()
			 collect_energy(1)
		}        
	}        
	sleep(1000)    
} else if (text("蚂蚁森林").idEndsWith("h5_tv_title").findOnce()) {        
    if (control_first([627, 166, 1080, 1001], desc("地图"))) {            
	     if (!energy_now) {     
	         energy_now = depth(15).descEndsWith("g").findOnce()
		     if (energy_now) energy_now = energy_now.desc().match(/\d+/)[0]
	     }            
	     collect_energy()            
	     collect_energy()            
	     if (control_first(desc("查看更多好友"), 1)) {
	         sleep(1000)                
		     continue            
	     }            
	     swpe_phone = scrollable(true).findOnce()            
	     if (swpe_phone) {                
	         swpe_phone.scrollForward()                
		     sleep(300)                
		     swpe_phone.scrollForward()                
		     sleep(300)                
		     swpe_phone.scrollForward()                
		     sleep(300)                
		     swpe_phone.scrollForward()                
		     sleep(300)                
		     swpe_phone.scrollForward()            
	    }            
	    control_first([], desc("查看更多好友"), 2)            
	    sleep(1000)        
    } else {            
	    swpe_phone = scrollable(true).findOnce()
	    if (swpe_phone) {                
	         swpe_phone.scrollBackward() //下滑()
		     sleep(300)                
		     swpe_phone.scrollBackward()
		     sleep(300)                
		     swpe_phone.scrollBackward()
	    }        
    }    
} else if (unlock()) {
     sleep(100)
} else {
        star_alipay()
        sleep(1000)
	} 
}
//停止其他脚本
 function stop_other_script() {
     var now_script = engines.myEngine()    
	 log(now_script + "")    
	 var runing_script = engines.all();    
	 log("正在运行的脚本有", runing_script.length, "个")    
	 for (var i = 0; i < runing_script.length; i++) {
	     if (runing_script[i].toString() != now_script.toString()) {
		     log("停止脚本", runing_script[i].toString());
			 runing_script[i].forceStop();
		}    
	} 
}
//解锁 
function unlock() {    
     if (!context.getSystemService(context.POWER_SERVICE).isInteractive()) {        
	     log("屏幕没亮")        
	     device.wakeUp()        
	     lock_flag = 1        
	     sleep(1000)        
	     swipe(500, 1800, 600, 700, 200)        
	     sleep(2000)        
	     squared_unlock(screen_password)       
	     sleep(2000)    
    } else if (packageName("com.android.systemui").exists() || packageName("com.android.keyguard").exists()) {        
	     log("锁屏了")        
		 lock_flag = 1        
		 Swipe(500, 1800, 600, 700, 500)        
		 sleep(2000)        
		 squared_unlock(screen_password)        
		 sleep(2000)    
	} else if (packageName("com.miui.securitycenter").findOnce()) {        
	     squared_unlock(app_password)        
	     star_alipay()        
	     sleep(2000)    
	} else {        
	     return 0    
	}   
	return 1 
}
//寻找小手不同手机可能不通用 最好自己获取一下小手的颜色
function find_hand() {    
     var numbers = []    
	 var img = captureScreen();    
	 for (let a = 190; a < 1500; a += 380) {        
	     var p = images.findMultiColors(img, "#25a472", [            
		     [59, 15, "#1da06d"],            
			 [65, 14, "#1da06d"],            
			 [64, 64, "#26a473"]        
		], {            
		     region: [1000, a, 20, 380],            
			 threshold: 25        
		});        
		if (!p) p = findColor(img, "#f99137", {		
			 region: [1000, a, 20, 380],            
			 threshold: 25        
		});        
		if (p) numbers.push(p)
	}    
	if (numbers[0]) log("ํ", numbers.length)   
	return numbers 
}
//好友排行榜 载入更多好友
function find_more() {    
     var status = 0;    
	 var more;    
	 var thread_more = threads.start(function() {        
	     while (1) {            
		     sleep(200)            
			 if (status == 1) {               
   			     more = idContains("J_rank_list_more").findOnce()
				 if (more) {                    
				     for (let j = 0; j < 50; j++) {                       
					 if (status != 1) break                        
					 try {                           
  					     more.click()                            
						 sleep(100)                       
					} catch (e) {
					     log(e, "错误")
					     break                        
					}                    
				}                
			}                
			if (desc("没有更多了").findOnce()) { 
 			     status = 2                    
				 toastLog("载入完成")
            } else {                    
			     log("未知")                
			}            
		}        
	}    
})    
return {        
    open: function() {            
	     if (status == 0) status = 1        
	},        
	close: function() {
	     status = 0
	},        
	stop: function() {
	     thread_more.interrupt()}    
	} 
}
//九宫格解锁 
function squared_unlock(password) { 
    //密码为九宫格1-9的数字顺序
	var location = [238, 1024, 840, 1625]    
	var x1 = (location[2] - location[0]) / 2    
	var y1 = (location[3] - location[1]) / 2    
	var gesture = [password.length * 110]    
	for (let a = 0; a < password.length; a++) {        
	     let b = password[a] - 1        
		 if (b < 3) gesture.push([x1 * b + location[0], location[1]]);        
		 else if (b < 6) gesture.push([x1 * (b - 3) + location[0], y1 + location[1]]);        
		 else gesture.push([x1 * (b - 6) + location[0], y1 * 2 + location[1]]);   
    }    
	gesture.apply(null, gesture);   
	sleep(1000) 
}
//运行支付宝
 function star_alipay() {
     var i = app.intent({        
         action: "VIEW",        
         data: "alipayqr://platformapi/startapp?saId=60000002"    
     });    
     app.startActivity(i);    
	 sleep(1000)    
	 if (!packageName("com.eg.android.AlipayGphone").exists()) {        
	     toastLog("支付宝启动失败，尝试使用root权限打开")
         var aa = shell("am start -n
com.eg.android.AlipayGphone/com.eg.android.AlipayGphone.AlipayLogin", true);        
         sleep(2000)    
	} 
}    
//收能量
function collect_energy(back_flag) {
    var energy_ball = boundsInside(0, 300, 1040, 1217).className("android.widget.Button").find()    
	//log("有"+"能量球".length+"能量球")
    for (let a = 0; a < energy_ball.length; a++) {        
	     let c = energy_ball[a].bounds()        
		 if (c.height() > c.width()) control_click(energy_ball[a], 2)    
	}    
	if (back_flag) back() 
}
//控件点击 
function control_click(a, b) {
    try {        
	     if (b == 2) {            
		     let fw = a.bounds()            
			 log("坐标点击", fw.centerX(), fw.centerY())            
			 return click(fw.centerX(), fw.centerY())        
	    } else if (a) {            
		     log("控件点击", a.text() || a.desc())
		     for (let i = 0; i < 5; i++) {
		         if (a.clickable() == true) {                    
			         return a.click()                
			     } else {                    
			         a = a.parent()                
			     }            
		     }        
	     } else {            
	         log("控件不存在", a)
	         return 0        
		}    
	} catch (e) {        
	    log("点击失败" a, b, e)    
	}   return 0 
}
//控件1
function control_first() {    
     var a = arguments    
	 var kj, kj1    
	 if (a[0] instanceof Array) {         
	     var ws = device.width / 1080        
		 var hs = device.height / 1920        
		 kj = a[1].find()        
		 if (kj.empty() && ("" + a[1]).match(/(text|desc)/)) {            
		     if (("" + a[1]).indexOf("text") > -1) {                
			     a[1] = eval((a[1] + "").replace(/text/g, "desc"))            
			} else if (("" + a[1]).indexOf("desc") > -1) {                
			     a[1] = eval(("" + a[1]).replace(/desc/g, "text"))            
			}            
			kj = a[1].find()       
		}        
		for (let b = 0; b < kj.size(); b++) {            
		     var c = kj[b].bounds()           
			 if (a[0].length == 4) {                
			     let w1 = c.right - c.left                
				 let h1 = c.bottom - c.top                
				 if (c.height() > 0 && c.width() > 0 && a[0][0] * ws <= c.left && a[0][1] * hs <= c.top && a[0][2] * ws >= c.right && a[0][3] * hs >= c.bottom) {                   
				 kj1 = kj[b]                    
				 break                
			}            
		} else if (a[0].length == 2) {                
		     if (Math.abs(c.width() - a[0][0] * ws) < 20 && Math.abs(c.height() - a[0][1] * hs) < 20) {                   
 			     kj1 = kj[b]                    
				 break                
			}            
		} else {                
		     if (c.height() > 0 && c.width() > 0) {                    
			     kj1 = kj[b]                    
				 break                
			}            
		}       
	}        
	if (a[2] && kj1) {            
	     control_click(kj1, a[2])        
	}        
	return kj1    
} else {        
     kj1 = a[0].findOnce()        
	 if (!kj1 && ("" + a[0]).match(/(text|desc)/)) {            
	    if (("" + a[0]).indexOf("text") > -1) {                
		     a[0] = eval((a[0] + "").replace(/text/g, "desc"))            
		} else if (("" + a[0]).indexOf("desc") > -1) {
             a[0] = eval(("" + a[0]).replace(/desc/g, "text"))            
		}            
		kj1 = a[0].findOnce()        
	}        
	if (a[1] && kj1) {
      	 control_click(kj1, a[1])        
	}        
	return kj1    
  } 
}
