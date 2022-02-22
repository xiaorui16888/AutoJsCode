/******
0.本脚本需要使用auto.js才可以使用,不清楚的请先了解auto.js后再使用
1.如有任何出现错误请联系QQ450324601修复
2.程序中任何代码不要轻易修改,除非你非常确定
*****/

auto();//开启无障碍模式
toastLog("有需要一键领取其他东西的请联系萌豆子，仅限于支付宝内的东西");
toastLog("如有任何出现错误请联系QQ450324601修复");
toastLog("程序中任何代码不要轻易修改,除非你非常确定");
///var minStepCount = rawInput("请设置超过多少步数才捐,一般默认即可", "18000");
var minStepCount = 18000;

var recordFirendList = new java.util.Vector();//记录已经扫描的好友网名
var gold_egg_position = "/sdcard/金蛋.png";
var step_10000_orange_position = "/sdcard/10000橙色.png";
var step_20000_orange_position = "/sdcard/20000橙色.png";
var coin_jamming_position = "/sdcard/卡币.png";

/**
 * 自动从网络下载所需要的图片
 * 这些图片是用来找图的
 * 只有下载失败的时候，才需要你手动将图片放到指定位置
 */
function downLoadImage(){

    var goldEgg = images.load("http://att.125.la/data/attachment/album/201811/27/125205omjgq30r8bwm061w.png");
    if(goldEgg){
        images.save(goldEgg, gold_egg_position, "png", 100);
    }
    else{
        toastLog("下载 金蛋 图片 出错，请务必手动将该图片存放到相应位置，否则程序将出错");
    }


    var step10000Image = images.load("http://att.125.la/data/attachment/album/201811/29/024221zbpzbopfdnbce1zn.png");
    if(step10000Image){
        images.save(step10000Image, step_10000_orange_position, "png", 100);
    }
    else{
        toastLog("下载 10000橙色 图片 出错，请务必手动将该图片存放到相应位置，否则程序将出错");
    }



    var step20000Image = images.load("http://att.125.la/data/attachment/album/201811/29/024221udro0xnubd808bgu.png");
    if(step20000Image){
        images.save(step20000Image, step_20000_orange_position, "png", 100);
    }
    else{
        toastLog("下载 20000橙色 图片 出错，请务必手动将该图片存放到相应位置，否则程序将出错");
    }
    

    var coinJammingImage = images.load("http://att.125.la/data/attachment/album/201812/01/161638i6f6mnvnxitb5fml.png");
    if(coinJammingImage){
        images.save(coinJammingImage, coin_jamming_position, "png", 100);
    }
    else{
        toastLog("下载 卡币 图片 出错，请务必手动将该图片存放到相应位置，否则程序将出错");
    }

}


/**
 * 判断Vector中是否存在某个元素
 *
 */
function isInVector(list,str){
    for(var i = 0; i < list.size(); i++){
        if( list.get(i) == str){
            return true;
        }
    }

    return false;
}



/**
 * 获取权限和设置参数
 */
function prepareThings(){

    setScreenMetrics(device.width, device.height);
    //请求截图
    if(!requestScreenCapture()){
        toastLog("请求截图失败");
        exit();
    }
}


/**
 * 获取截图
 */
function getCaptureImg(){
    var img0 = captureScreen();
    if(img0==null || typeof(img0)=="undifined"){
        toastLog("截图失败,退出脚本");
        exit();
    }else{
        return img0;
    }
}


/**
 * 判断翻页操作是否结束,该模板通用性强
 */
function isTurnPageDone(type){
    while(true){

        var FrameLayout;
        var TextView;
        var ImageView;
        var Button;
        var RelativeLayout;
        var EditText;
        var WebView;
        var View;
        var LinearLayout;
        var CheckBox;
        var webkit_WebView;
        var data = new Array();;
        
        for(var i = 0; i < 4; i++){
            FrameLayout = className("android.widget.FrameLayout").find().size();
            TextView = className("android.widget.TextView").find().size();
            ImageView = className("android.widget.ImageView").find().size();
            Button = className("android.widget.Button").find().size();
            RelativeLayout = className("android.widget.RelativeLayout").find().size();
            EditText = className("android.widget.EditText").find().size();
            WebView = className("android.webkit.WebView").find().size();
            View = className("android.view.View").find().size();
            LinearLayout = className("android.widget.LinearLayout").find().size();
            CheckBox = className("android.widget.CheckBox").find().size();
            webkit_WebView = className("android.webkit.WebView").find().size();
            data[i] = FrameLayout + TextView + ImageView + Button + RelativeLayout + EditText + WebView + View + LinearLayout + CheckBox + webkit_WebView;
            sleep(100);
        }

        if( (data[0] == data[1]) && (data[1] == data[2]) && (data[2] == data[3]) ){
            sleep(100);
            log("当前页面稳定了!");
            break;
        }
        else{
            log("等待当前页面稳定中……");
        }

    }

}


/**
 * 一键捐步数
 */
function donateRunStepNumber(){

    toastLog("开始捐步");

    //进入运动
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "alipays://platformapi/startApp?appId=20000869",
        packageName: "com.eg.android.AlipayGphone"
    });


    //等待页面稳定
    while( !textContains("我的行走").exists() );
    isTurnPageDone();


    //再等待页面完全加载完毕
    var JAvatar;
    var JNum;
    while(true){
        JAvatar = className("android.view.View").idContains("J-Avatar").find();//头像
        JNum = className("android.view.View").idContains("J-Num").find();//步数
        if( JAvatar.size() > 0 && JNum.size() > 0 ){
            toastLog("运动页面完全加载完毕");
            break;
        }
        log("等待运动页面完全加载完毕");
        sleep(300); 
    }



    //等待步数稳定
    var JNum1;
    var JNum2;
    var JNum3;
    while(true){
        JNum1 = className("android.view.View").idContains("J-Num").find();//步数
        sleep(500);
        JNum2 = className("android.view.View").idContains("J-Num").find();//步数
        sleep(500);
        JNum3 = className("android.view.View").idContains("J-Num").find();//步数
        if( JNum1.size()>0 && JNum2.size()>0 && JNum3.size()>0 && ( JNum1.get(0).desc() == JNum2.get(0).desc() ) && ( JNum2.get(0).desc() == JNum3.get(0).desc() ) ){
            break;
        }
    }



    //检查步数是否符合要求
    var maxNum = Math.max( Number(JNum1.get(0).desc().replace(",","")),Number(JNum2.get(0).desc().replace(",","")),Number(JNum3.get(0).desc().replace(",","")) );
    toastLog( maxNum );
    if( maxNum < Number(minStepCount) ){
        toastLog("步数小于" + minStepCount + ",捐步取消");
        return ;
    }

    
    


    //寻找 立即捐步 这个控件
    maxWaitTime = 0;
    while(true){

        if(maxWaitTime > 6){
            toastLog("找不到 立即捐步 这个按钮");
            break;
            
        }

        var donateStep = descContains("立即捐步").find();
        if(donateStep.size() > 0){

            var donateStepClickable = descContains("立即捐步").clickable(true).find();
            if(donateStepClickable.size() > 0){//立即捐步 控件 存在 并且 可以点击
                sleep(500);
                click(donateStepClickable.get(0).bounds().centerX(), donateStepClickable.get(0).bounds().centerY());
                sleep(300);

                while(true){
                    var sure = descContains("确定").find();
                    if(sure.size() > 0 ){
                        sleep(500);
                        click(sure.get(0).bounds().centerX(), sure.get(0).bounds().centerY());
                        sleep(300);
                        break;
                    }
                }

                while( !textContains("捐步结果").exists() );

                toastLog("捐步成功");

            }
            break;
        }
        else{
            maxWaitTime = maxWaitTime + 1;
            sleep(500);
        }
    }
    
}



/**
 * 一键领取积分
 */
function receiveIntegral(){
    toastLog("开始领取积分");

    //进入蚂蚁会员页面
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "alipays://platformapi/startApp?appId=20000160",
        packageName: "com.eg.android.AlipayGphone"
    });


    //进入积分页面
    while( !textContains("蚂蚁会员").exists() );
    isTurnPageDone();
    toastLog("打开 蚂蚁会员 页面成功");

    while( !descContains("领积分").exists() );
    sleep(800);
    descContains("领积分").click();

    while( !textContains("领积分").exists() );
    isTurnPageDone();
    toastLog("打开 领积分 页面成功");


    sleep(1500);
    while(true){
        if(descContains("点击领取").exists()){
            descContains("点击领取").click();
        }
        else{
            break
        }
        sleep(700);
    }

    toastLog("积分领取完毕");


}



/**
 * 参加行走积分赛
 */
function walkPointRace(){

    toastLog("开始参加行走积分赛");

    //打开行走积分赛
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "alipays://platformapi/startApp?appId=68687129",
        packageName: "com.eg.android.AlipayGphone"
    });

    while( !textContains("行走积分赛").exists() );
    isTurnPageDone();
    toastLog("打开 行走积分赛 页面成功");

    if( descContains("报名明日比赛").exists() ){
        toastLog("正在报名明日比赛");
        sleep(700);
        descContains("报名明日比赛").click();

        while( !textContains("行走积分赛报名").exists() );
        isTurnPageDone();
        toastLog("打开 行走积分赛报名 页面成功");

        while( !descContains("立即使用积分报名").exists() );
        sleep(700);
        descContains("立即使用积分报名").click();

        while( !textContains("确认报名").exists() );
        sleep(700);
        textContains("确认报名").click();
        
        while( !textContains("报名成功").exists() );
        isTurnPageDone();
        toastLog("行走积分赛报名成功");


    }else{
        toastLog("好像不能报名哦");
    }

}



/**
 * 领能量罩、蚂蚁庄园加速卡
 */
function receiveAntiAndSpeed(){

    toastLog("开始领能量罩和庄园加速卡");

    //打开行走积分赛
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "alipays://platformapi/startApp?appId=68687129",
        packageName: "com.eg.android.AlipayGphone"
    });

    while( !textContains("行走积分赛").exists() );
    isTurnPageDone();
    isTurnPageDone();
    


    toastLog("正在检测是否可领取 能量罩");
    sleep(2000);
    var screenBig1 = getCaptureImg();
    var step20000Find = images.read(step_20000_orange_position);

    //截图并找图,找到20000步位置
    var p1 = findImage(screenBig1, step20000Find, {
        threshold: 0.6
    });
    if(p1){
        toastLog("可领取 能量罩，位置为" + p1);
        sleep(700);
        click(p1.x,p1.y);
        sleep(700);
        toastLog("领取 能量罩 成功");

    }
    else{
        toastLog("暂时不能领取 能量罩");
    }




    toastLog("正在检测是否可领取 庄园加速卡");
    sleep(2000);
    var screenBig = getCaptureImg();
    var step10000Find = images.read(step_10000_orange_position);

    //截图并找图,找到10000步位置
    var p = findImage(screenBig, step10000Find, {
        threshold: 0.6
    });
    if(p){
        toastLog("可领取庄园加速卡，位置为" + p);
        while(true){
            if( descContains("立即领取").exists() ){
                sleep(500);
                descContains("立即领取").click();
                sleep(500);
                break;
            }
            else{
                click(p.x,p.y);
                sleep(500);

            }

        }
        toastLog("领取 蚂蚁庄园加速卡成功");

    }
    else{
        toastLog("暂时不能领取庄园加速卡");
    }
    



}



/**
 * 领取免费医疗金
 */
function freeMedicalfee(){

    toastLog("开始领取免费医疗金");

    //领取免费医疗金
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "alipays://platformapi/startApp?appId=20000067&url=https://render.alipay.com/p/s/scenarioins_site/pay-guarantee/guarantee",
        packageName: "com.eg.android.AlipayGphone"
    });

    while( !textContains("蚂蚁保险").exists() );
    isTurnPageDone();
    toastLog("打开 领取医疗金 页面成功");
    sleep(3000);
    toastLog("若您有到店付款消费，将自动领取免费医疗金");
}


/**
 * 打开健康果页面
 */
function openHealthFruit(){
    //打开好医保,抢健康果
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "alipays://platformapi/startApp?appId=20000067&url=https://render.alipay.com/p/h5/inshealth/www/bean-grab.html",
        packageName: "com.eg.android.AlipayGphone"
    });

    while( !textContains("好友抢果").exists() );
    isTurnPageDone();
    while( !descContains("抢果大作战").exists() );
    while( !descContains("个").exists() );
    while( !descContains("明细").exists() );
    while( className("android.webkit.WebView").find().size() == 0);
    sleep(2000);
    toastLog("打开 好友抢果 页面成功");
}

/**
 * 领取健康果
 */
function receiveHealthFruit(){

    toastLog("开始领取健康果");

    //确保获取到控件
    while(true){
        //打开健康果页面
        openHealthFruit();

        var a = desc("抢").find();
        if(a.size()>0){
            break;
            
        }else if( descContains("被你抢光").exists() ){
            toastLog("今天的健康果被你抢光啦");
            return ;

        }else{
            sleep(500);
            back();
            sleep(500);
            toastLog("获取 好友抢果 控件失败，重新获取中");
        }
    }
    toastLog("获取 好友抢果 控件成功");



    //开始抢果
    while(true){

        var b = desc("抢").find();

        b.forEach(function(each){
            if(each.bounds().top < device.height ){
                var netName = each.parent().parent().child(1).desc();
                if( !isInVector(recordFirendList,netName) ){
                    recordFirendList.add(netName);//记录一下网名
                    click(each.bounds().centerX(), each.bounds().centerY());
                    sleep(1500);
                }
            }
        });

        if( descContains("如何获得更多健康果").exists() ){
            var dataNum = descContains("如何获得更多健康果").findOne().bounds().top;
            if(dataNum < device.height){
                break;
            }
        }

        //滚动屏幕到下一页
        scrollDown();
        //等待屏幕滚动完毕
        isTurnPageDone();



    }
    toastLog("抢果完毕");


}

/**
 * 砸金蛋
 */
function smashGoldEgg(){
    toastLog("打开 砸金蛋 页面中");

    //打开每日必抢
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "alipays://platformapi/startApp?appId=2018030502317859&page=home/pages/home/home",
        packageName: "com.eg.android.AlipayGphone"
    });
    
    while( !descContains("每日必抢").exists() );
    while( !textContains("首页").exists() );
    while( !textContains("拼团").exists() );
    while( !textContains("砸金蛋").exists() );
    while( !textContains("购物车").exists() );
    while( !textContains("订单").exists() );
    

    toastLog("正在打开 砸金蛋 页面");
    var b = text("砸金蛋").find();
    if(b.size()){
        sleep(500);
        click(b.get(0).bounds().centerX(), b.get(0).bounds().centerY());
        sleep(500);
    }
    
    while( !descContains("返回").exists() );
    while( !descContains("更多").exists() );
    while( !descContains("关闭").exists() );
    while( text("砸金蛋").find().size() < 2 );
    isTurnPageDone();
    toastLog("打开 砸金蛋 页面成功");


    sleep(2000);
    var screenBig = getCaptureImg();
    var goldEggSmall = images.read(gold_egg_position);

    //截图并找图,找到金蛋位置
    var p = findImage(screenBig, goldEggSmall, {
        threshold: 0.6
    });
    if(p){
        toastLog("找到金蛋位置: " + p);
        click(p.x, p.y);
        sleep(800);
        click(p.x, p.y);
        sleep(800);
        click(p.x, p.y);
        sleep(800);
        click(p.x, p.y);
        sleep(800);
        toastLog("成功 砸金蛋");

    }
    else{
        toastLog("没找到 金蛋位置哦");
    }
}


/**
 * 天天红包赛
 * 还没做好，暂时不公开
 */
function getUpPunchCard(){
    toastLog("打开 天天行走红包赛 页面中");

    //打开
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "alipays://platformapi/startApp?appId=20000067&url=https://activity-alisports.taobao.com/p/alipay/activity/daily_running/m_home.html?game_type=1",
        packageName: "com.eg.android.AlipayGphone"
    });

    while( !textContains("天天红包赛").exists() );
    while( !descContains("钱包余额").exists() );
    while( !descContains("今日步数").exists() );
    isTurnPageDone(); //等待页面稳定
    sleep(800); //稍微延迟下
    toastLog("打开 天天行走红包赛 页面成功");

    if( descContains("立即报名 瓜分红包").exists() ){
        sleep(500);
        descContains("立即报名 瓜分红包").click();
        sleep(500);
    }


}


/**
 * 阿里体育 领卡币
 */
function receiveCoinJamming(){
    toastLog("打开 领卡币 页面中");

    //打开 阿里体育 卡币 页面
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: "alipays://platformapi/startApp?appId=20000988&url=https://market.m.taobao.com/app/alisports/mbappe/pages/index",
        packageName: "com.eg.android.AlipayGphone"
    });

    while( !textContains("体育服务").exists() );
    isTurnPageDone(); //等待页面稳定
    isTurnPageDone(); //再等待页面稳定
    sleep(500); //稍微延迟下
    toastLog("打开 领卡币 页面成功");



    while(true){
        //截图并找图,找到卡币位置
        var p = findImage(getCaptureImg(), images.read(coin_jamming_position), {
            threshold: 0.6
        });
        if(p){
            toastLog("找到卡币位置: " + p);
            sleep(500);
            click( p.x + 2, p.y + 2 );
            sleep(500);
        }
        else{
            break;
        }
    }


    toastLog("领取 卡币 完毕");
}






downLoadImage();//下载一些找图所用到的图片
prepareThings();//获取截屏权限


donateRunStepNumber();//捐步数
walkPointRace();//参加行走积分赛
receiveAntiAndSpeed();//领取能量罩和蚂蚁庄园加速卡
receiveIntegral();//一键领取积分
receiveCoinJamming();//领卡币
receiveHealthFruit();//领取健康果
freeMedicalfee();//领取免费医疗金
smashGoldEgg();//砸金蛋
