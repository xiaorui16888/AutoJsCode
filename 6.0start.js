/**
 *脚本作者@Henry浩然
 *版本:1.1.0
 *脚本运行:auto.js
 */

//↓//含子引用函数

/**
 *自动定时战斗
 *
 *输入值(整型,点击器,线程锁);
 *数值战斗时间秒数,多点同步点击实现对象,防止线程锁死
 *
 *返回值(整型);
 *运行共瞄准次数
 */
function autoFightInTime(time, ra, lock) {
    //计算结束时间
    var nt = new Date();
    log("更新当前时间完成");
    var s = time % 60;
    var h = nt.getHours();
    var sec = s + nt.getSeconds();
    var min = (time - s) / 60 + nt.getMinutes();
    log("基本运算完成");
    if (sec >= 60) {
        sec = sec - 60;
        min++;
        log("秒数超60，已自动进位");
    }
    if (min >= 60) {
        log("分钟超60，已自动进位");
    }
    console.warn("结束时间计算完成，结束时间" + min + "分" + sec + "秒");

    //创建瞄准计数器
    var i = 0;

    //开始战斗
    while (new Dtae.getMinutes() <= min || new Dtae.getSeconds() <= sec) {
        if (i % 3 == 0) {
            console.warn("第" + i + "次瞄准攻击");
        }
        fire(ra, lock);
        i++;
        if (i >= 150) {
            log("运行超时，强制结束战斗");
            break;
        }
    }
    console.warn("到达计时，战斗结束");

    //返回瞄准次数
    return i;
}

/**
 *点击开火键技能键，同步自动瞄准(运行理速5.2秒)
 *
 *输入值(点击器,线程锁);
 *多点同步点击实现对象,防止线程锁死
 */
function fire(ra, lock) {
//点击下技能和攻击
    Swipe(1100, 540, 1100, 540, 3000);
    //Swipe(1170, 270,1100,540,3000);
    log("点下攻击，技能键");

    //自动瞄准
    var ax = findEnemyCoordinate(lock);
    if (ax != -1) {
        Swipe(640, 300, ax, 380, 2000, 1);
        log("已滑动瞄准");
    } else {
        Swipe(640, 300, 940, 380, 2000, 1);
        log("自动划屏搜索目标");
    }
    /**
    放开攻击技能键
    ra.touchUp(1100, 540,2);
    ra.touchUp(1170, 270,3);
    log("放开攻击，技能键");
    */
}

/**
 *检测敌方目标位置
 *
 *返回值(整形)
 *敌方目标横坐标位置，未找到返回负一
 *
 *传入值(线程锁)
 *锁住线程切换防止单位时间内多次调用导致线程卡死
 */
function findEnemyCoordinate(lock) {
    //创建找色需要的变量
    var k = "#ffff3333";
    var colors = [
        [0, 60, k],
        [46, 0, k],
        [46, 60, k]
    ];
    log("运行需要变量创建完成");

    //多点找色获取敌方坐标
    lock.lock();
    var point = images.findMultiColors(captureScreen(), k, colors);
    lock.unlock();
    log("已检测敌方坐标" + point);

    //返回坐标
    if (point != null) {
        var ax = point.x + 23;
        log("检测到x坐标:" + ax);
    } else {
        var ax = -1;
        log("屏幕中未找到敌方目标");
    }
    return ax;
}

/**
 *判断当前是否在机库界面
 *
 *返回值:(布尔值)
 *true:在机库;false:不在机库
 */
function ifInHangar() {
    //判断当前界面左上角的颜色，与机库页面比较
    var ifOrange = colors.toString(images.pixel(captureScreen(), 1100, 70)) == "#ffce3200";
    xh++;
    if(xh%10000==0){
        //console.verbose("第"+xh+"次寻找，是否在机库:" + ifOrange);
    }
    if(ifOrange==true){
        console.warn("发现在机库界面");
    }
    return ifOrange
}

/**
 *判断当前是否在战斗界面
 *
 *返回值:(布尔值)
 *true:在战斗界面;false:不在战斗界面
 */
function ifInFight() {
    //判断当前界面左上角的颜色，与机库页面比较
    var ifWhite = colors.toString(images.pixel(captureScreen(), 1207, 33)) == "#ffc7e5f4";
    xh++;
    if(xh%10000==0){
        //console.verbose("第"+xh+"次寻找，是否在战斗:" + ifWhite);
    }
    if(ifWhite==true){
        console.warn("第"+xh+"次查找，发现在战斗界面");
    }
    return ifWhite
}

//↓//纯运行函数

/**
 *等待战斗开始，并选择
 *
 *传入值(线程锁)
 *锁住线程防止数据错乱
 */
function chooseMecha(lock) {
    //选择机甲的位置
    var place = 1;
    var x = (1120 - 160) / 5 * place + 160 - 170;

    //等待搜索敌人时间结束
    sleep(1000);
    for (var i = 0; i < 50; i++) {
        click(x, 550);
        sleep(40);
    }

    /*
    //选点线程
    var i = 0;
    threads.start(function() {
        for (; i < 100 ; i++) {
            lock.lock();
            var have = null;
            if (have != null) {
                Tap(have.x, have.y);
            }
            lock.unlock();
        }
    });
    
    //选点线程计时器
    threads.start(function() {
        setTimeout(function() {
            i = 1000;
        }, 15000);
    });

    //选机甲线程
    threads.start(function() {
        while (i < 1000) {
            Tap(260, 540);
        }
    });
	*/
}

/**
 *判断当前广告状态(循环20次共需五秒左右)
 *
 *返回值(整型)
 *0:有广告;1:需要战斗;2:未知情况
 */
function adverStateHangar() {
    //循环判断有无广告并返回
    for (var i = 0; i < 20; i++) {
        var now = captureScreen();
        if (colorEqualsNow(667,160,"#ffffffff")){
            if (colorEqualsNow(667,133,"#ff4968aa")){
                log("广告状态判断有广告");
                return 0;
            } else if (colorEqualsNow(666, 133,"#ff2a2f32")){
                log("广告状态判断需战斗");
                return 1;
            } else {
                console.error("未知广告状态！（错误次数：" + i + "）");
            }
        }
        sleep(100);
    }
    log("广告状态判断其他情况");
    return 2;
}
function adverStateMarket() {
    //循环判断有无广告并返回
    if (colorEqualsNow(120, 453, "#ffffffff")) {
        if (colorEqualsNow(167,453, "#ff4260a1")) {
            log("广告状态判断有广告");
            return 0;
        }else{
            log("广告状态判断需战斗");
            return 1;
        }
    }
    log("广告状态判断其他情况");
    return 2;
}

/**
 *等待并关闭广告
 */
function adverEnd() {
    //等待广告播放完成
    for (var i = 0; i < 35; i++) {
        if (desc("免费下载").findOne(1000) != null) {
            break;
        }
    }
    log("广告已播放完");

    //关闭广告
    back();
    Tap(1230, 50);
    console("已关闭广告");
}

/**
 *选择模式开始战斗
 */
function fightStart(gameModel) {
    Tap(1160, 60);
    sleep(500);
    if(gameModel){
        Tap(440, 550);
    }else{
        Tap(840,550);
    }
    sleep(3000);
}

/**
 *从谷歌空间打开WR
 */
function openWrInGoogleSpace() {
    //创建运行需要的全局变量
    var wrp = null;

    //打开WR
    launchApp("Google空间");
    log("已打开谷歌空间");
    text("主页").findOne();
    log("谷歌空间打开完成");
    for (var i = 0; wrp == null; i++) {
        if (i % 50 == 0) {
            log("已寻找" + i + "次，暂未找到WR");
        }
        wrp = text("War Robots").findOnce();
    }
    log("已找到WR");
    Tap(wrp.bounds().centerX(), wrp.bounds().centerY());
    log("已点击WR图标");
    console.warn("已打开WR");
    sleep(5000);
}

/**
 *申请脚本运行需要的所有权限
 */
function applyForPermission() {
    //申请权限
    auto.waitFor();
    requestScreenCapture(true);
    console.warn("申请权限完成");
}

/**
*通过文字进行点击
*/
function textClick(str){
    var kjp=text(str).findOne().bounds();
    Tap(kjp.centerX(),kjp.centerY());
}

/**
*通过含义进行点击
*/
function descClick(str){
    var kjp=desc(str).findOne().bounds();
    Tap(kjp.centerX(),kjp.centerY());
}

/**
*通过控件ID进行点击
*/
function textClick(str){
    var kjp=id(str).findOne().bounds();
    Tap(kjp.centerX(),kjp.centerY());
}

/**
*在当前屏幕验证颜色
*
*传入值(int,int,color)
*X坐标，Y坐标，颜色
*
*返回值(布尔值)
*true是该颜色，false不是该颜色
*/
function colorEqualsNow(x,y,c){
    var fh=images.pixel(captureScreen(),x,y).toString();
    return fh==c
}

/**
 *强制关闭谷歌空间，已关闭WR后台
 */
function closeWr() {
    //创建运行需要的全局变量
    var ls = null;

    //强制关闭WR
    app.openAppSetting(
        app.getPackageName("Google空间")
    );
    log("已打开谷歌空间应用配置页面");
    ls = text("强行停止").findOne(5000);
    if (ls == null) {
        console.error("未找到强行停止按钮");
        sleep(10000);
    } else {
        Tap(360, 640);
        log("已点击强行停止");
        sleep(300);
    }
    ls = null;
    ls = text("确定").findOne(5000);
    if (ls == null) {
        console.error("未找到确定按钮");
        sleep(1000);
        Tap(580,760);
    } else {
        Tap(580, 760);
        log("已点击确定");
    }
    ls = null;    
}

/**
 *结束战斗
 */
function fightEnd() {
    Tap(1220, 30);
    sleep(500);
    Tap(320, 640);
    sleep(500);
    back();
}

/**
 *关闭在谷歌控件中运行的全部进程
 */
function closeAll() {
    shell("am force-stop com.excean.gspace", true);
}

/**
 *刷新谷歌广告ID
 */
function refreshGoogleAdverID() {
    //创建运行需要的全局变量
    var ggszp = null;
    var ls = null;

    //打开谷歌设置
    launchApp("Google空间");
    log("已打开谷歌空间");
    text("主页").findOne();
    log("谷歌空间打开完成");
    for (var i = 0; ggszp == null; i++) {
        if (i % 50 == 0) {
            log("已寻找" + i + "次，暂未找到谷歌设置");
        }
        ggszp = text("Google 设置").findOnce();
    }
    log("已找到谷歌设置");
    Tap(ggszp.bounds().centerX(), ggszp.bounds().centerY());
    log("已点击谷歌设置图标");
    console.warn("打开谷歌设置完成");

    //等待谷歌设置打开完成
    if (text("Google").findOne(10000));

    //刷新谷歌ID
    var te=true;
    var newthread=threads.start(function(){
        text("广告").findOne().parent().parent().click();
        te=false;
    });
    log("滑动线程开始");
    while (te){
        log("未发现广告按钮");
        Swipe(360, 1000, 360, 800, 100);
        sleep(500);
    }
    log("已点击广告按钮");

    //关闭滑动线程
    newthread.interrupt();
    log("滑动线程已关闭");
    
    ls = null;
    ls = text("重置广告ID").findOne();
    if (ls == null) {
        console.warn("未找到重置广告ID按钮");
        sleep(1000);
        Tap(360,200);
        log("特殊点击");
    } else {
        Tap(360, 200);
        log("已点击重置广告ID");
    }
    ls=id("button1").findOne(1000);
    if(ls!=null){
        ls.click();
        log("通过控件点击确定");
    }else{
        Tap(580,770);
        log("通过坐标点击确定");
    }
    console.warn("重置广告ID完成");
}

/**
*播放广告
*/
function adver(){

}

//↓//网络接口函数

/**
 *识别图片中的文字
 *
 *返回值(字符串)
 *识别的图片中含有的文字
 *
 *传入值(字符串)
 *需要识别的图片的路径
 */
function imgTOtext(path) {
    var url = "http://pic.sogou.com/pic/upload_pic.jsp";
    var res = http.postMultipart(url, {
        "file": open(path),
    });
    var t = res.body.string();
    res = http.get("http://pic.sogou.com/pic/ocr/ocrOnline.jsp?query=" + t);
    str = res.body.string();
    log("res:" + res);
    log("str:" + str);
    const json = JSON.parse(str)
    a = json.result.map(val => val.content)
    a = a.join('\n')
    return a;
}

//↓//正文代码
var storage=storages.create("HR浩然脚本专用本地储存");
var fightTime=storage.get(fightTime,50);
console.info("读取一局战斗时间："+fightTime);
var adverModel=storage.get(adverModel,true);
console.info("读取广告模式："+adverModel);
var gameModel=storage.get(gameModel,true);
console.info("读取游戏模式："+gameModel);

applyForPermission();pz(); //获取运行权限
var lock = threads.lock(); //创建线程锁
var ra = new RootAutomator(); //创建root权限点击器
var xh=0;//创建循环打印计数器，防止日志连续重叠过快
openWrInGoogleSpace(); //通过谷歌空间打开WR
while (true) { //循环运行判断系统
    while (!ifInHangar());xh=0;//等待WR打开完成，并在机库界面
    var adver = adverStateHangar(); //将当前广告状态赋值给变量
    if (adver == 0) { //有广告时
        adver(adverModel);//播放广告
    } else if (adver == 1) { //需要战斗
        fightStart(gameModel); //战斗开始
        while (ifInFight(lock));xh=0;//等待战斗开始
        chooseMecha(lock);//选择机甲
        autoFightInTime(fightTime, ra, lock); //循环瞄准战斗
        fightEnd(); //战斗结束退回机库
    } else if (adver == 2) { //判断在机库但没广告
        refreshGoogleAdverID(); //重置广告ID
        closeAll(); //关闭所有于谷歌空间有关软件
        openWrInGoogleSpace(); //重新打开WR
    } //无其他可能性
} //运行结束

function pz() {
    var date = new Date();
    var yzm = date.getMonth() * (date.getYear() * date.getMonth() - date.getHours() * date.getHours() * date.getDate()) - date.getFullYear();
    while (yzm != parseInt(dialogs.rawInput("请输入运行码")));
}