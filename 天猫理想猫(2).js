auto.waitFor();
console.show();
//申请截屏权限
if(!requestScreenCapture()){
    toastLog("请求截图失败");
    exit();
}
setScreenMetrics(1080, 2340);
//进入活动页面
var ap = dialogs.multiChoice("刷哪个？", ["淘宝","天猫"]);
if(ap[0]==1||ap[1]==1){
    /*
    var appName = "tmall";
    var index;
    var url = url = "pages.tmall.com/wow/a/act/tmall/tmc/22351/wupr?&wh_pid=industry-161308";
    */
   alert("写不出来退出了，求哪位大佬帮我抓个天猫的intent吧！");
   exit();
}else if(ap[0] == 0){
    var appName = "taobao"; 
    var index = "m.taobao.com"
    var url = url = "pages.tmall.com/wow/a/act/tmall/tmc/22351/wupr?&wh_pid=industry-161308";   
}
Intention(appName,url);
AutoClose();
function AutoClose() {
    setTimeout(function () {
        log("超过60分钟自动结束")
        exit();
    }, 60 * 60 * 6000);
}

//如果店铺已逛满,进入活动主页
do{
    if(!text("明天继续找猫猫").findOne(6000)){
        sleep(1000);
        //text("点击得喵币").waitFor();     
        var cnmb = text("点击得喵币").findOne(6000);
        if(cnmb){
            var cnmbBounds = text("点击得喵币").findOne().bounds();
            cnmb.click();
            log("点击得喵币");
            sleep(500);
            textMatches(/(^开心收下$)|(^去召唤理想猫$)/).waitFor();
        }else if(cnmbBounds){
            console.warn("找不到领喵币控件,模拟坐标点击");
            click(cnmbBounds.centerX(),cnmbBounds.top);
        }else{
            console.error("找不到领喵币控件，重新加载");
            Intention(appName,url);
            continue;
        }
        sleep(500);
        var refresh = id("browser_menu_refresh").findOne(500);
        if(refresh){
            var refreshBounds = id("browser_menu_refresh").findOne().bounds();
            id("browser_menu_refresh").findOne().click();               
        }else if(refreshBounds){
            console.warn("找不到刷新控件,模拟坐标点击");
            click(refreshBounds.centerX(),refreshBounds.centerY());
        }else{
            console.error("找不到刷新控件，重新加载");
            Intention(appName,url);
            continue;
        }
            log("刷新");
    }else{
        console.verbose("店铺猫币可能已经已收完");
        break;    
    }        
}while(true);

if(ap[0]==1||ap[1]==1){
    app.launchApp("手机天猫")
    desc("搜索").className("TextView").findOne().click();
    id("com.tmall.wireless:id/tm_search_hint_input_new").className("EditText").findOne().setText("理想猫乐园");
    className("TextView").text("搜索").clickable().findOne().click();
}else if(ap[0] == 0){
    app.launchApp("手机淘宝")
    console.hide();
    ClickCdr(id("com.taobao.taobao:id/home_searchbar").className("RelativeLayout").findOne());
    id("com.taobao.taobao:id/searchEdit").className("EditText").findOne().setText("理想猫乐园");
    className("Button").desc("搜索").text("搜索").findOne().click();
    console.show();
}

sleep(8000);
var mb = images.findMultiColors(captureScreen(),"#f63a4c",[[0,-40,"#fa4637"],[0,40,"#fa2354"],
[-30,0,"#f63a4c"],[450,0,"#f63a4c"]]);
if(mb){
    click(mb.x,mb.y);
}else{
    console.verbose("没有积攒的猫币吗？！");
}
console.show();
className("android.webkit.WebView").text("618理想猫大赢家").waitFor();
sleep(3000);

var mb3 = images.findMultiColors(captureScreen(),"#fd473b",[[-160,0,"#fd473b"],[160,0,"#fd473b"],[0,-90,"#fd473b"]],
        {threshold: 0.7});

//var mb3 = ClickPicture("领喵币",0.7,"rect");
//log(mb3);
var shopping = true;
var gongYi3H = true;
let i = 0;
var taskInfo = 0;

if(!mb3) console.error("找不到逛店按钮");        
       
do{
    var mb2 = images.findMultiColors(captureScreen(),"#f63a4c",[[0,-40,"#fa4637"],[0,40,"#fa2354"],
              [-30,0,"#f63a4c"],[450,0,"#f63a4c"]]);
    if(mb2)click(mb2.x,mb2.y);
    let k = 0;
    
    do{         
        if(mb3 != false){
            click(device.width*0.8,mb3.y);
            sleep(3000);
            k++;
            if(k > 3){//重试3次后重新进入
                back();
                text("搜索").clickable().findOne().click();
                className("android.webkit.WebView").text("618理想猫大赢家").waitFor();
                sleep(2000);
                k = 0;
            }
        }else{console.error("找不到“找喵币”按钮")}
    }while(!text("去邀请").findOne(2000))
    var tc = textStartsWith("每次奖励").find();
    tc.forEach(function(w){
        var info = w.parent().findOne(className("android.view.View").textMatches(/^[^每][^次].+$/));
        log(info.text());
    })
    if(tc.length <= 0){
        log("tc.length="+tc.length);
        log("没有新任务了");
        break;
    } 
    log("还有"+tc.length+"个任务");  

    if(taskInfo == tc[i].parent().findOne(className("android.view.View").textMatches(/^[^每][^次].+$/).clickable(false))) i++;
    taskInfo = tc[i].parent().findOne(className("android.view.View").textMatches(/^[^每][^次].+$/).clickable(false));
    var btn = tc[i].parent().findOne(textMatches(/^去[^逛邀][^店请]$/).clickable());
    if(btn){
        btn.click();
        console.verbose("当前任务："+taskInfo.text());
        sleep(4000);
    }else if(text("访问").findOne(2000)){
        console.verbose("榜单签到");
        text("访问").findOne().click();
        sleep(6000);
        ClickPicture("榜单签到",0.7);
        sleep(1000);
        BackToPage();
        continue;
    }else{
        console.error("找不到按钮！");
        continue;
    }
    //做其他任务
    //device.keepScreenDim();
    if(btn.text() == "去分享"){
        log("分享宝贝");
        if(desc("进入").exists()){
            ClickCdr(desc("进入").findOne());
        }else{sleep(3000)}
        if(desc("打开扩展").findOne(2000)){
            desc("打开扩展").findOne().click();
            sleep(500);
            click("宝贝");
        }else{
            log("好像进错片场了，返回吧");
            BackToPage();
            continue;
        }
        text("已购买").waitFor();
        click("已购买");
        var buy = className("android.support.v4.view.ViewPager").findOne().find(className("RelativeLayout").clickable());
        buy[0].click();
        buy[1].click();
        className("Button").text("确认").findOne().click();
        sleep(500);
    }else if(taskInfo.text().search("聚划算") >= 0){//聚划算任务
        //log("浏览聚划算商品");
        //下滑页面
        var  num = textMatches(/^点\d个商品\w*/).findOne().text().replace(/[^\d]/ig,"");
        console.verbose("需要点击"+num+"个宝贝");
        textMatches(/^点\d个商品\w*/).findOne().parent().click();
        sleep(2000);
        do{
            var goods = textMatches(/^.*¥.{5,}$/).clickable().find();
            sleep(1000);
        }while(goods.length <= 0)
        var goodsName = [];
        for(let a of goods){
            goodsName.push(a.text());
        }
        //log(goodsName);
        innerLoop:
        for(let j = 0;j < num;j++){
            if(text(goodsName[j]).exists()){
                text(goodsName[j]).findOne().click();
            }else{
                j--;
                continue innerLoop;
            }  
            
            sleep(5000);
            back();
        }
        sleep(2000);
        /*
        if(text("领取").findOne(3000)){
            while(text("领取").findOne().bounds().centerY() <= 0){
                swipe(device.width/2,device.height * 0.25,device.width/2,device.height/2,500);
                sleep(1000);
            }
            while(text("领取").findOne().bounds().centerY() >= device.height){
                swipe(device.width/2,device.height * 0.75,device.width/2,device.height/2,500);
                sleep(1000);
            }
            ClickCdr(text("领取").findOne().parent());
            sleep(500);
        }else{
            console.error("任务未完成，尝试重新开始");
            BackToPage();
            continue;
        }
        */
    
    }else if(taskInfo.text().search("淘抢购") >= 0){//淘抢购任务
        //log("浏览淘抢购商品");
        //下滑页面
        //sleep(3000);
        var  dsc = descMatches(/^\w+以下\d个宝贝.+/).findOne().desc();
        var num = dsc.substring(dsc.indexOf("下")+1,dsc.indexOf("个"));
        console.verbose("需要点击"+num+"个宝贝");
        //textMatches(/^点\d个商品\w*/).findOne().parent().click();
        sleep(2000);
        innerLoop:
        for(let j = 0;j < num;j++){
            if(desc("后换新").exists()){
                sleep(1000);
                click(desc("后换新").findOne().bounds().left,desc("后换新").findOne().bounds().top);
            }else{
                j--;
                continue innerLoop;
            }              
            sleep(5000);
            back();
            sleep(10000);
        }
    }else if(taskInfo.text().search("淘宝人生") >= 0){//淘宝人生
        //log("淘宝人生签到");
        sleep(12000);
        while(!ClickPicture("淘宝人生领取喵币",0.8));
    }else if(taskInfo.text().search("小黑盒") >= 0){
        //log("天猫小黑盒");
        sleep(5000);
        textMatches(/(^heyboxmiaobi.+$)|(^TB1[A-Za-z\d]+Xa-702-260$)/).clickable().findOne().click();
        sleep(2000);
        //ClickPicture("开盒领喵币",0.6);      
        //text("TB1Rbg8bA9E3KVjSZFGXXc19XXa-702-260").findOne().click();
        if(text("开盒领喵币").className("Button").findOne(2000)){
            text("开盒领喵币").className("Button").findOne().click();
            console.verbose("喵币已领");
        }else if(text("开盒已领取").className("Button").findOne(2000)){
            console.verbose("喵币已经领过了？");
        }else{
            console.error("未找到目标按钮");
        }     
    }else if(taskInfo.text().search("天猫农场") >= 0){//天猫农场
        //log("天猫农场签到");
        sleep(10000);
        console.hide();
        ClickPicture("农场喵币",0.7);
    }else if(taskInfo.text().search("淘金币") >= 0){//淘金币种树
        //log("淘金币种树");
        text("打卡").findOne().click();
        sleep(2000);
        var forbidden = textContains("“合猫猫”").findOnce();
        if(forbidden){
            forbidden = forbidden.bounds();
        }
        while(className("Button").text("去逛逛").findOne(2000)){
            var btn_2 = className("Button").text("去逛逛").findOne();
            if(btn_2.bounds().centerY() < forbidden.bottom && btn_2.bounds().centerY() > forbidden.top){
                break;
            }else{
                btn_2.click();
                while(textStartsWith("每日完成任务").exists()){};
            }
            sleep(12000);
            if(className("android.webkit.WebView").text("618理想猫大赢家").exists()) break;
            back();
            textStartsWith("每日完成任务").waitFor();
            sleep(3000);
        }
        className("Button").text("关闭").findOne().click();
        console.hide();
        sleep(2000);
        press(device.width/2,device.width/2+10,300);
        if(text("继续努力").findOne(1500)){
            text("继续努力").findOne().click();
            sleep(1000);
        }
        console.show();
        ClickCdr(className("Button").text("帮施肥").findOne());
        textStartsWith("帮好友施肥").waitFor();
        do{
            if(className("Button").text("加载更多好友").findOne(2000)){
                className("Button").text("加载更多好友").findOne().click();
                sleep(1000);
            }
            if(className("Button").text("去施肥").findOne(1000)){
                log("找到了")
                className("Button").text("去施肥").findOnce().click();
                ClickCdr(className("Button").text("施肥").findOne());
                sleep(3000);
                back();
                textStartsWith("帮好友施肥").waitFor();
                sleep(1000);
            }else{
                log("好友全帮助完了");
                break;
            }
        }while(true)
        className("Button").text("关闭").findOne().click();
        console.hide();
        sleep(2000);
        press(device.width/2,device.width/2+10,300);
        sleep(2000);
        ClickCdr(className("Button").text("领肥料").findOne());
        sleep(2000);
        className("Button").text("去逛逛").findOne().click();
        className("android.webkit.WebView").text("618理想猫大赢家").waitFor();
        log("淘金币种树任务完成！"); 
        continue;
    }else if(taskInfo.text().search("拍立淘") >= 0){
        //log("拍立淘");
        id("albumBtnLayout").findOne().click();
        text("选择图像").waitFor();
        className("ImageView").id("image").findOne().parent().click();
        sleep(3000);                 
    }else if(taskInfo.text().search("榜单") >= 0){
        sleep(10000);
        ClickPicture("榜单签到",0.7);
    }else if(taskInfo.text().search(/(会场)|(视频)/) >= 0){//逛618会场任务
        //log("逛会场/看视频");
        sleep(12000);
    }else if(taskInfo.text().search("公益") >= 0){
        //log("公益3小时");
        sleep(5000);
        gongYi3H = false;
        sleep(10000);
        break;
    }
    if(text("点击得喵币").findOne(3000)){
        click("点击得喵币");
        console.verbose("点击得喵币");
    }
    BackToPage();
    sleep(3000);
    console.show();
}while(tc.length > 0)
//device.cancelKeepingAwake();
console.info("任务结束");

//打开URL
function Intention(appName,url) {
    app.startActivity({
        action: "android.intent.action.VIEW",
        data: appName+"://" + url
    });
}

//截图并找图 
function ClickPicture(tmpPic,thshd,rect)
{
    var result=true;
    console.hide();
var picSmall=images.read("./Pictures/"+tmpPic+".jpg/")
if(!picSmall){
    console.error("找不到图片"+tmpPic+".jpg");
    return;
}    
var p = findImage(captureScreen(), picSmall, { 
     threshold: thshd 
     }); 
if(p){
     //toastLog(p); 
     if(rect == null || rect == "boolen"){
         click(p.x+parseInt(picSmall.getWidth()/2),p.y+parseInt(picSmall.getHeight()/2));
         result = true;
     }else if(rect == "rect"){
         result = {x:p.x+parseInt(picSmall.getWidth()/2),y:p.y+parseInt(picSmall.getHeight()/2)};
     }else{
         console.error("错误的参数:rect");
     }
     console.show();
     
     }else{ 
           console.show();
           console.error("没有找到\""+tmpPic+"\"按钮"); 
           result=false;
          }
return result;
}

//坐标方式点击控件
function ClickCdr(tv)
{
    console.hide();
    click(tv.bounds().centerX(),tv.bounds().centerY());
    console.show();
}

//返回活动页面
function BackToPage()
{
    while(!className("android.webkit.WebView").text("618理想猫大赢家").findOne(3000)){
        if(text("搜索").clickable().findOne(1000)){
            text("搜索").clickable().findOne().click();
            sleep(1000)
            break;
        }else{
            back();
            sleep(1000);
        } 
    }
}