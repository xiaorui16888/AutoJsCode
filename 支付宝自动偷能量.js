
var myEnergeType = ["绿色能量", "线下支付", "行走", "共享单车", "地铁购票", "网络购票", "网购火车票", "生活缴费", "ETC缴费", "电子发票", "绿色办公", "咸鱼交易", "预约挂号"];
var morningTime = "7:15"; //自己运动能量生成时间
requestScreenCapture();
unlock("1111");
sleep(1000);
mainEntrence();

//解锁函数
function unlock(password){
    var a;
    var b;
    if (!device.isScreenOn()) {
        device.wakeUpIfNeeded();
        sleep(2000);
        swipe(500,1000,500,100,1000);
        for(var i=0;i<password.length;i++){
            a=password.charAt(i);
            log(a);
            sleep(500);
            b=text(a).findOne().bounds();
            click(b.centerX(),b.centerY());
        }
        //需要点击确定键的可以在下面加上click(x坐标，y坐标);
        toast("解锁成功");
        sleep(500);
    }
}
 
/**
 * 日志输出
 */
function tLog(msg) {
    toast(msg);
    console.log(msg)
}
 
/**
 * 获取权限和设置参数
 */
function prepareThings() {
    setScreenMetrics(1080, 2340);
    //请求截图
    if (!requestScreenCapture()) {
        tLog("请求截图失败");
        exit();
    }
 
}
 
/**
 * 设置按键监听 当脚本执行时候按音量减 退出脚本
 */
function registEvent() {
    //启用按键监听
    events.observeKey();
    //监听音量上键按下
    events.onKeyDown("KEYCODE_VOLUME_DOWN", function(event) {
        tLog("脚本手动退出");
        exit();
    });
}
/**
 * 获取截图
 */
function getCaptureImg() {
    var img0 = captureScreen();
    if (img0 == null || typeof(img0) == "undifined") {
        tLog("截图失败,退出脚本");
        exit();
    } else {
        return img0;
    }
}
/**
 * 默认程序出错提示操作
 */
function defaultException() {
    tLog("程序当前所处状态不合预期,脚本退出");
    exit();
}
/**
 * 等待加载收集能量页面,采用未找到指定组件阻塞的方式,等待页面加载完成
 */
function waitPage(type) {
    // 等待进入自己的能量主页
    if (type == 0) {
        desc("消息").findOne();
    }
    // 等待进入他人的能量主页
    else if (type == 1) {
        desc("浇水").findOne();
    }
    //再次容错处理
    sleep(3000);
}
/**
 * 从支付宝主页进入蚂蚁森林我的主页
 */
function enterMyMainPage() {
    launchApp("支付宝");
    tLog("等待支付宝启动");
    var i = 0;
    sleep(1000);
 
    clickByText("蚂蚁森林", true, "请把蚂蚁森林入口添加到主页我的应用");
    //等待进入自己的主页
    //waitPage(0);//这行代码会导致卡在主页
    sleep(1000)
}
/**
 * 进入排行榜
 */
function enterRank() {
    tLog("进入排行榜");
    sleep(100);
    swipe(520, 1900, 520, 300, 100);
    sleep(100);
    swipe(520, 1900, 520, 300, 100);
    sleep(100);
    toastLog("查看更多好友");
 
    clickByText("查看更多好友", 0, true, "程序未找到排行榜入口,脚本退出");
    var i = 0;
    //等待排行榜主页出现
    sleep(1000);
    while (!textEndsWith("好友排行榜").exists() && i <= 5) {
        sleep(2000);
        i++;
    }
    if (i >= 5) {
        defaultException();
    }
}
/**
 * 从排行榜获取可收集好友的点击位置
 * @returns {*}
 */
function getHasEnergyfriend(type) {
 
    var img = getCaptureImg();
    var p = null;
    if (type == 1) {
        //img 是图片
        //"#30bf6c" 第一个颜色
        //[0, 33, "#30bf6c"] 第二颜色和它的相对坐标
        //[34,45, "#ffffff"] 第三个颜色和他的相对坐标
        //region: [1030, 100, 1, 1700] 第一个颜色的检测区域1030，100为起始坐标，1，1700为区域宽度！！！
        //toastLog("开始定位坐标");
        p = images.findMultiColors(img, "#1da06d", [
            [59, 0, "#1da06d"],
            [46, 44, "#ffffff"]
        ], {
            region: [1018, 200, 1, 1700]
        });
    }
    if (p != null) {
        return p;
    } else {
        return null;
    }
 
 
 
}
/**
 * 判断是否好有排行榜已经结束
 * @returns {boolean}
 */
function isRankEnd() {
    if (descEndsWith("没有更多了").exists()) {
        var b = descEndsWith("没有更多了").findOne();
        var bs = b.bounds();
        if (bs.centerY() < 1920) {
            return true;
        }
    }
    return false;
}
/**
 * 在排行榜页面,循环查找可收集好友
 * @returns {boolean}
 */
function enterOthers() {
    //tLog("开始检查排行榜");
    var i = 1;
    sleep(1000);
    var ePoint = getHasEnergyfriend(1);
    //确保当前操作是在排行榜界面
    while (ePoint == null && textEndsWith("好友排行榜").exists()) {
        //滑动排行榜 root方式的的点击调用.如无root权限,7.0及其以上可采用无障碍模式的相关函数
        swipe(520, 1800, 520, 300, 500);
        sleep(500);
        ePoint = getHasEnergyfriend(1);
        i++;
        //检测是否排行榜结束了
        if (isRankEnd()) {
            return false;
        }
        //如果连续13次都未检测到可收集好友,无论如何停止查找(由于程序控制了在排行榜界面,且判断了结束标记,基本已经不存在这种情况了)
        else if (i > 12) {
            tLog("程序可能出错,连续" + i + "次未检测到可收集好友");
            back();
            sleep(1000);
            back();
            sleep(1000);
            back();
            sleep(1000);
            exit();
        }
    }
    if (ePoint != null) {
 
        //点击位置相对找图后的修正
        //tLog(ePoint.x,ePoint.y);
        click(ePoint.x, ePoint.y + 20);
        //waitPage(1);
        sleep(1000);
 
        for (var row = 500; row < 900; row += 100)
            for (var col = 100; col < 900; col += 100) {
                click(col, row);
                sleep(10);
                //tLog(row);
            }
        //我把原博客中的收取能量的调用注释掉了，因为原方法并不会收取能量
        //因此我就用了暴力点击法
        //将能量球存在的区域都点一遍，间隔是能量球的半径
        //clickByDesc("可收取",80);
        //进去收集完后,递归调用enterOthers
        back();
        sleep(1000);
        var j = 0;
        //等待返回好友排行榜
        if (!textEndsWith("好友排行榜").exists() && j <= 5) {
            sleep(1000);
            j++;
        }
        if (j >= 5) {
            defaultException();
        }
        enterOthers();
    } else {
        defaultException();
    }
}
/**
 * 根据描述值 点击
 * @param energyType
 * @param noFindExit
 */
function clickByDesc(energyType, paddingY, noFindExit, exceptionMsg) {
    if (descEndsWith(energyType).exists()) {
        descEndsWith(energyType).find().forEach(function(pos) {
            var posb = pos.bounds();
            click(posb.centerX(), posb.centerY() - paddingY);
            sleep(200);
        });
    } else {
        if (noFindExit != null && noFindExit) {
            if (exceptionMsg != null) {
                tLog(exceptionMsg);
                exit();
            } else {
                defaultException();
            }
        }
    }
}
/**
 * 根据text值 点击 * @param energyType * @param noFindExit
 */
function clickByText(energyType, noFindExit, exceptionMsg) {
    if (textEndsWith(energyType).exists()) {
        textEndsWith(energyType).find().forEach(function(pos) {
            var posb = pos.bounds();
            click(posb.centerX(), posb.centerY() - 60);
        });
    } else {
        if (noFindExit != null && noFindExit) {
            if (exceptionMsg != null) {
                tLog(exceptionMsg);
                exit();
            } else {
                defaultException();
            }
        }
    }
}
/**
 * 遍历能量类型,收集自己的能量
 */
function collectionMyEnergy() {
    sleep(2000);
    //如果是早上7点03分左右的话.等待主页能量出现 每隔一秒检测一次
    while (isMorningTime()) {
        for (var row = 500; row < 900; row += 100)
            for (var col = 100; col < 900; col += 100) {
                click(col, row);
                sleep(10);
                //tLog(row);
            }
    }
   
    //我把上面的一些都给注释掉了，因为有些时候并不会收取自己的能量，因此我就用了暴力点击法
    //将能量球存在的区域都点一遍，间隔是能量球的半径
    for (var row = 640; row < 900; row += 100)
        for (var col = 140; col < 800; col += 100) {
            click(col, row);
            sleep(10);
		           //	tLog(row);
        }
    tLog("自己能量收集完成");
    sleep(100);
}
/**
 * 结束后返回主页面
 */
function whenComplete() {
    tLog("结束");
    back();
    sleep(1500);
    back();
    exit();
}

 
function isMorningTime() {
    var now = new Date();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var targetTime = morningTime.split(":");
    if (Number(targetTime[0]) == hour && Math.abs(Number(targetTime[1]) - minu) <= 2) {
        return true;
    } else {
        return false;
    }
}
//程序主入口
function mainEntrence() {
    //前置操作
    prepareThings();
    //注册音量下按下退出脚本监听
    registEvent();
    //从主页进入蚂蚁森林主页
    enterMyMainPage();
    //收集自己的能量
    collectionMyEnergy();
    //进入排行榜
    enterRank();
    //在排行榜检测是否有好有的能量可以收集
    enterOthers();
    //结束后返回主页面
    whenComplete();
}
 