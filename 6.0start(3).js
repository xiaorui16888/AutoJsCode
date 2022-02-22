/**
*脚本作者@Henry浩然-『❦黎冥❀電茪❁』
*版本:1.0.4
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
function fight(time,ra,lock){
    //计算结束时间
    var nt=new Date();
    log("更新当前时间完成");
    var s=time%60;
    var h=nt.getHours();
    var sec=s+nt.getSeconds();
    var min=(time-s)/60+nt.getMinutes();
    log("基本运算完成");
    if(sec>=60){
        sec=sec-60;
        min++;
        log("秒数超60，已自动进位");
    }
    if(min>=60){
        log("分钟超60，已自动进位");
    }
    console.warn("结束时间计算完成，结束时间"+min+"分"+sec+"秒");
    
    //创建瞄准计数器
    var i=0;
    
    //开始战斗
    while(
        new Dtae.getMinutes()<=min||new Dtae.getSeconds()<=sec
    ){
        if(i%3=0){
            console.warn("第"+i+"次瞄准攻击");
        }
        fire(ra,lock);
        i++;
        if(i>=150){
            log("运行超时，强制结束战斗");
            break;
        }
    }
    console.warn("到达计时，战斗结束");
    
    //返回瞄准次数
    return i;
}

/**
*点击开火键技能键，同步自动瞄准(运行理速4.3秒)
*
*输入值(点击器,线程锁);
*多点同步点击实现对象,防止线程锁死
*/
function fire(ra,lock){
    //点击下技能和攻击
    ra.touchDown(1100, 540,2);
    ra.touchDown(1170, 270,3);
    log("二三号手指点下攻击，技能键");
    
    //自动瞄准
    var ax=xx(lock);
    if(ax!=-1){
        ra.swipe(640,300,ax,380,4000,1);
        log("一号手指已滑动瞄准");
    }else{
        ra.swipe(640,300,940,380,2000,1);
        log("一号手指自动划屏搜索目标");
    }
    
    //放开攻击技能键
    ra.touchUp(1100, 540,2);
    ra.touchUp(1170, 270,3);
    log("二三号手指放开攻击，技能键");
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
function xx(lock){
    //创建找色需要的变量
    var k="#ffff3333";
    var colors=[[0,60,k],[46,0,k],[46,60,k]];
    log("运行需要变量创建完成");
    
    //多点找色获取敌方坐标
   lock.lock();
   var point=images.findMultiColors(captureScreen(), k, colors);
   lock.unlock();
   log("已检测敌方坐标"+point);
   
   //返回坐标
    if(point!=null){
        var ax=point.x+23;
        log("检测到x坐标:"+ax);
    }else{
        var ax=-1;
        log("屏幕中未找到敌方目标");
    }
    return ax;
}

//↓//纯运行函数

/**
*判断当前广告状态(循环20次共需五秒左右)
*
*返回值(整型)
*0:有广告;1:需要战斗;2:未知情况
*/
function gg(){
    //读取运行需要图片
    var nf = images.read("./nf.png");
    var adv = images.read("./adv.png");
    console.warn("读取图片完成");
    
    //循环判断有无广告并返回
    for(var i=0;i<20;i++){
        var now=captureScreen();
        if(findImageInRegion(now,adv,640,0)!=null){
             log("判断有广告");
            return 0;
        }else if(findImageInRegion(now,nf,640,0)!=null){
            log("判断需战斗");
            return 1;
        }
    }
    log("判断其他情况");
    return 2;
}

/**
*判断当前是否在机库界面
*
*返回值:(布尔值)
*true:在机库;false:不在机库
*/
function jk(){
    //读取运行需要图片
    var home = images.read("./home.png");
    console.warn("读取图片完成");
    
    //找图判断
    if(findImageInRegion(captureScreen(),home,700,0)!=null){
        log("判断不在机库");
        return true;
    }else{
        log("判断在机库");
        return false;
    }
}

/**
*等待并关闭广告
*/
function bf(){
    //等待广告播放完成
    for(var i=0;i<32;i++){
        if(desc("免费下载").findOne(1000)!=null){
            break;
        }
    }
    log("广告已播放完");
    
    //关闭广告
    Tap(1230,50);
    back();
    console("已关闭广告)");
}

/**
*从谷歌空间打开WR
*/
function openwr(){
    //读取运行需要图片
    var wr = images.read("./wr.png");
    console.warn("读取图片完成");

    //创建运行需要的全局变量
    var wrp = null;
    
    //打开WR
    launchApp("Google空间");
    log("已打开谷歌空间");
    for (var i = 0;wrp == null; i++) {
        if (i % 20 == 0) {
            log("已寻找" + i + "次，暂未找到WR");
        }
        wrp = findImageInRegion(
            captureScreen(),wr, 0, 500
        );
    }
    log("已找到WR");
    Tap(ggszp.x, ggszp.y);
    log("已点击WR图标");
    console.warn("已打开WR");
    
    //等待打开完成
    for (
        var i = 0;
        findImageInRegion(
            captureScreen(),fight,800,0
        )==null; 
        i++
    ) {
        if (i % 20 == 0) {
            log("已寻找" + i + "次，暂未发现WR打开完成");
        }
    }
    console.warn("打开WR完成");
}

/**
*申请脚本运行需要的所有权限
*/
function qx(){
    //申请权限
    auto.waitFor();
    requestScreenCapture();
    console.warn("申请权限完成");
}

/**
*强制关闭谷歌空间，已关闭WR后台
*/
function closewr(){
    //创建运行需要的全局变量
    var ls=null;

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
    }
    ls = null;
    ls = text("确定").findOne(5000);
    if (ls == null) {
        console.error("未找到确定按钮");
        sleep(10000);
    } else {
        Tap(360, 200);
        log("已点击确定");
    }
    ls = null;
}

/**
*刷新谷歌广告ID
*/
function id() {
    //读取运行需要图片
    var ggsz = images.read("./ggsz.png");
    console.warn("读取图片完成");

    //创建运行需要的全局变量
    var ggszp = null;
    var ls = null;

    //打开谷歌设置
    launchApp("Google空间");
    log("已打开谷歌空间");
    for (var i = 0; ggszp == null; i++) {
        if (i % 20 == 0) {
            log("已寻找" + i + "次，暂未找到谷歌设置");
        }
        ggszp = findImageInRegion(
            captureScreen(), ggsz, 0, 500
        );
    }
    log("已找到谷歌设置");
    Tap(ggszp.x, ggszp.y);
    log("已点击谷歌设置图标");
    console.warn("打开谷歌设置完成");
    
    //等待谷歌设置打开完成
    text("Google").findOne(10000);
    
    //刷新谷歌ID
    if(text("广告").findOnce()==null){
        log("未发现广告按钮");
        scrollDown();
        log("已自动滑至下页");
    }
    ls = text("广告").findOne(5000);
    if (ls == null) {
        console.error("未找到广告按钮");
        sleep(10000);
    } else {
        Tap(360, 640);
        log("已点击广告");
    }
    ls = null;
    ls = text("重置广告ID").findOne(5000);
    if (ls == null) {
        console.error("未找到重置广告ID按钮");
        sleep(10000);
    } else {
        Tap(360, 200);
        log("已点击重置广告ID");
    }
    ls = null;
    ls = text("确定").findOne(5000);
    if (ls == null) {
        console.error("未找到确定按钮");
        sleep(10000);
    } else {
        Tap(580, 770);
        log("已点击确定");
    }
    ls = null;
    console.warn("重置广告ID完成");
}

//↓//网络接口函数

/**
*识别图片中的文字
*
*返回值(字符串)
*识别的图片中含有的文字
*
*传入值(路径)
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
        log("res:"+res);
        log("str:"+str);
        const json = JSON.parse(str)
        a = json.result.map(val => val.content)
        a = a.join('\n')
        return a;
}

//↓//正文代码
