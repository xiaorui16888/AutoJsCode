
//本脚本仅供学习交流,切勿频繁使用,丧失游戏乐趣.

// 本脚本是快手小游戏的脚本,
// 包含游戏:消砖块,大圣来了
// 作者qq:203118908
// 更新日期:2018.6.22

// 使用本脚本需满足以下条件
// 1手机分辨率1920x1080
// 2安卓必安卓7以上(包括安卓7)，免root使用
// 3需要下载群须文件中的快手小游戏截图解压至/sdcard
// 在桌面启动本脚本即可,会自动打开快手小游戏

//消砖块100连胜无压力(可以自己调节速度)
//大圣来了 玩10局胜7局

//本脚本仅供学习交流,切勿频繁使用,丧失游戏乐趣.

//除了消砖块界面外,其他界面都是用控件来识别界面的.


auto.waitFor();
setScreenMetrics(1080, 1920);


//请求截图
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}


let 消砖块按下时长=1
//如果手机反应迟钝,这个2可以适当增大
let 消砖块两个砖块间隔时长=50
// 砖块个数=2


//==================脚本主控制区======================================

// gameName = "连连看"
// gameName = "拯救萌宠"
// gameName = "圈圈消除"
//gameName = "消砖块"



gameName = "大圣来了"
let isMonkeyExist=false


packageName = "com.kwai.sogame";
imgPath="/sdcard/快手小游戏截图/";
files.ensureDir(imgPath);



// gamePlay(gameName)
// exit()



while(1){
    let rndNumAd=r=Math.floor(Math.random()*(1000+1));
    广告="快手小游戏Q群470614178，进群当最强王者"
    是否发送广告=rndNumAd
    errorTime=1
    let page=whichPage();
    log("\n当前界面=",page)
    // exit()
    // ---------------游戏测试的地方---------------------------------------
    switch (page)
    {
    case "某游戏":
        gamePlay(gameName)
        // gameInterface()
        break;
    case "主页":
        gameOpen(gameName)
        break;
    case "pk结果":
        gameResult()
        break;
    case "聊天":
        chatInterface()
        break;
    case "个人信息":
        back()
        sleep(2000)
        break;
    case "别人信息":
        back()
        sleep(2000)
        break;
    default:
        if(currentPackage()==packageName){
            sleep(300);
            errorTime=errorTime+1
            if(errorTime>100){
                appOpen(packageName)
                errorTime=1
            }
            break;
        }else{

            toastLog("当前包名不是快手小游戏\n当前包名是","="+currentPackage()+"=","包名长度=",currentPackage().length)
            sleep(2000)
            appOpen(packageName)
        }
    }
}


function gamePlay(gameName){
    switch (gameName)
    {
    case "消砖块":
        log("消砖块")
        xiaoZhuanKuai()
        break;
    case "大圣来了":
        log("大圣来了")
        daShengLaiLe()
        break;
    default:
        log(gameName,"游戏名字你写错了,没有这个游戏的脚本")
        alert()
    }
}

function gameResult(){
    //在pk页,按两次back返回主页
    //按一次是聊天
    //按二次是主页
    back()
    sleep(2000)
    for (let i = 0; i < 10; i++) {
        if(whichPage()=="聊天"){
            toastLog("从pk页返回到了聊天页")
            back()
            sleep(2000)
        }else if(whichPage()=="主页"){
            toastLog("从pk页返回到了聊天页又返回到了主页")
            sleep(2000)
            return true;
        }else if(whichPage()=="某游戏"){
            return;
        }else{
            sleep(1000);
        }

    }
    toastLog("从pk页返回主页异常")
    alert()
    return false;
}
function chatInterface(){
    //在聊天页,按一次back返回主页
    back()
    sleep(2000)
    for (let i = 0; i < 10; i++) {
        if(whichPage()=="聊天"){
            toastLog("从聊天页返回到了主页失败,准备点击下一次back键")
            back()
            sleep(2000)
        }else if(whichPage()=="主页"){
            toastLog("从聊天页返回到了主页")

            return true;
        }else if(whichPage()=="某游戏"){
            return;
        }else{
            sleep(1000)
        }
    }
    toastLog("从聊天页返回主页异常")
    alert()
    return false;
}
function appOpen(packageName){
    toast("启动快手小游戏")
    sleep(2000)
    if(currentPackage()==packageName){

    }else{
        launch(packageName);
        sleep(1000);
    }
    for (let i = 0; i < 15; i++) {

        if(whichPage()=="主页" ||whichPage()=="某游戏" ||whichPage()=="聊天" ||whichPage()=="pk结果"){
            return true;
        }else{
            sleep(1000);
        }
    }


    toastLog("快手小游戏启动异常")
    alert()
    return false;
}


function gameOpen(gameName){
    log(gameName)
    if(whichPage()=="主页"){
        for(let i=0;i<10;i++){
            if(text(gameName).exists()){
                toastLog("在主页找到了游戏")
                log(gameName,"开始点击它")
                text(gameName).findOnce().parent().click()
                sleep(2000)
                return true;
            }else{
                上滑()
                log("在主页的当前页面没找到游戏",gameName,"上滑页面");
            }
        }
        log("在主页没找到游戏",gameName,"脚本停止运行");
        alert()
        exit()
    }else{
        toastLog("现在不在主页,不能打开任何游戏")
        sleep(2000)
    }
    return false;
}


function alert(){
    device.vibrate(2000);
    sleep(1000);
    device.vibrate(2000);
    exit();
}



function whichPage(){
    let w1=null,w2=null,w3=null,w4=null;
    //某游戏
    let featurePointCount=0
    let interfaceFeaturePoint=[[403,44,"#FFEC00"],[507,31,"#FFEC00"],[679,57,"#FFEC00"]]
    for(let i=0;i<interfaceFeaturePoint.length;i++){
        let x=interfaceFeaturePoint[i][0]
        let y=interfaceFeaturePoint[i][1]
        let img=captureScreen()
        let color=images.pixel(img, x, y)
        let color1=colors.toString(color)
        let color2=interfaceFeaturePoint[i][2]
        // log("\n当前点",x,y,"的实际颜色=",color,"\n和其比较的颜色=",color2)
        let result=colors.isSimilar(color1, color2)
        if(result){
            featurePointCount++;
        }else{
            break;
        }
    }

    if(featurePointCount == interfaceFeaturePoint.length ){
        return "某游戏"
    }

    w2 = text("换个游戏").findOnce();
    w3 = id("msg_container").findOnce();
    if(w1 != null && w2!=null && w3!=null){
        return "pk结果"
    }

    //pk结果
    w1 = text("换个对手").findOnce();
    w2 = text("换个游戏").findOnce();
    w3 = id("msg_container").findOnce();
    if(w1 != null && w2!=null && w3!=null){
        return "pk结果"
    }
    w1 = text("回到首页").findOnce();
    w2 = text("对方已离开房间").findOnce();
    w3 = id("msg_container").findOnce();
    if(w1 != null && w2!=null && w3!=null){
        return "pk结果"
    }
    //聊天
    w1 = text("再来一局").findOnce();
    w2 = text("发送").findOnce();
    w3 = text("戳这里打字").findOnce();
    w4 = text("换个对手").findOnce();
    if(w1 != null && w2!=null && w3!=null && w4==null){
        return "聊天"
    }
    //主页
    w1 = text("找好友对战").findOnce();
    w2 = text("最近对战").findOnce();
    w3 = id("slide_tab").findOnce();
    if(w1 != null && w2!=null && w3!=null){
        return "主页"
    }
    //个人信息
    w1 = textContains("快游号").findOnce();
    w2 = text("常玩的游戏").findOnce();
    w3 = id("carousel_view").findOnce();
    if(w1 != null && w2!=null && w3!=null){
        return "个人信息"
    }
    //别人信息
    w1 = id("tv_gender").findOnce();
    w2 = id("tv_id_or_online_time").findOnce();
    w3 = id("carousel_view").findOnce();
    if(w1 != null && w2!=null && w3!=null){
        return "别人信息"
    }

    let gameNameList=["消砖块","连连看","吃鸡游戏","高尔夫","跳一跳","斗兽棋","你画我猜","拯救萌宠","六角拼拼","宠物足球","摩天汉堡","蚂蚁夫妇","谁是卧底","象棋","方块消除","过马路","飞猪小奇","火力全开","大圣来了","心动魔方","圈圈消除","娃娃机","跳冰箱","两点之间","翻转棋","一起跳舞","互怼小霸王","吹泡泡","动物塔","双人拼图","蛋糕塔","五子棋","2048","手势告白","数来钱","容嬷嬷来了","奔向傻白甜","表情大战","男左女右","火锅侠","咆哮二驴","女神来了","跳舞机","扫雷","翻翻乐"]

    let gameNameCount=0
    for(let i=0;i<gameNameList.length;i++){
        let w = text(gameNameList[i]).findOnce();
        if(w != null){
            gameNameCount++;
        }
        if(gameNameCount>6){
        return "主页"
        }
    }
    log("gameNameCount=",gameNameCount)



    // w = textContains("换个游戏").findOnce();

    return "脚本不认识这个界面";

}

function 上滑() {
    var x1=700,y1=1600,x2=1000,y2=630,duration=1000;
    swipe(x1, y1, x2, y2, duration)
    sleep(1000)
}

function 下滑() {
    //快速下滑
    var x1=700,y1=800,x2=500,y2=1630,duration=300;
    swipe(x1, y1, x2, y2, duration)
    sleep(1000)
}








//==================以下是游戏运行是的脚本===========================================
function xiaoZhuanKuai(){
    let intervalTime1 = 消砖块按下时长;
    let intervalTime2 = 消砖块两个砖块间隔时长;
    press(132, 1552, intervalTime1);
    sleep(intervalTime2)
    press(391, 1587, intervalTime1);
    sleep(intervalTime2)
    press(665, 1599, intervalTime1);
    sleep(intervalTime2)
    press(962, 1552, intervalTime1);
    sleep(intervalTime2)
}
function gameInterface(){
    toastLog("现在是游戏界面")
    sleep(2000)
}










function daShengLaiLe(){
    imgMonkey = captureScreen();
    // isMonkeyExist=true
    if(!isMonkeyExist){
        sleep(3000);
        let x=148
        //截图  大圣短裙

        for(let i=0;i<10;i++){
            let clip=images.clip(imgMonkey, x,1302, 16, 8)
            images.save(clip, imgPath+"大圣短裙.png");
            //如果上下左右四个角颜色相似,说明是背景,网左边走在截图,
            let color1=images.pixel(imgMonkey, x+1,1303)
            let color2=images.pixel(imgMonkey, x+12,1303)
            let color3=images.pixel(imgMonkey, x+1,1309)
            let color4=images.pixel(imgMonkey, x+12,1309)
            // if(colors.isSimilar(color1, color2) && colors.isSimilar(color1, color3) && colors.isSimilar(color1, color4)){
            if(colors.isSimilar(color2, color4)){
                x=x-30
            }else{
                break;
            }
        }




        //如果x小于30,那么报错
        if(x<30){
            log("截取大圣短裙是发生了错误,已到达左边界.")
            alert()
        }


        log("已经截图了,大圣短裙.")
        isMonkeyExist=true
    }
    let monkey=monkeyGetPositon()
    //log("monkey=",monkey)
    if(monkey){
        let pillar=pillarGetPositon(monkey)
        //log("pillar=",pillar)
        if(pillar){

            //log("pillar=",pillar,"\nmonkey=",monkey)
            let dis=pillar[0]-monkey.x
            //log("3117行dis=",dis)
            jump([dis,pillar[1]])
            // exit()
            sleep(2500)

        }
    }


}
function jump(distance){
    log("jump收到的参数distance=",distance)
    // pillar
    if(distance[1]=="pillar"){
        //log("pillar的棒棒")
        let tolerance=0.8
        let t=(distance[0])*tolerance
        sleep(100)
        press(500,500,t);
        return;
    }


    //log("手指的棒棒")
// 大于617 增加跳跃系数
// 超过一点
// 小于483降低跳跃系数
    let tolerance=0.72
    //log("distance[0]=",distance[0],"\ntolerance=",tolerance)

    if(distance[0]>350 && distance[0]<390){
        tolerance=0.71
    }

    else if(distance[0]>400 && distance[0]<480){
        tolerance=0.71
    }
    else if(distance[0]>200 && distance[0]<270){
        tolerance=0.68
    }
    else if(distance[0]>560 && distance[0]<700){
        tolerance=0.731
    }





    // else if(distance[0]<483){
    //     tolerance=0.67
    // }
    let t=(distance[0])*tolerance
    press(500,500,t);
}





// 148,1302
// 164,1310

// 159,1341
function monkeyGetPositon(){
    let position=false
    //屏幕中间,返回小猪身体中心
    let 猴子的寻找区域=[16,1256,180,1320]
    let objectName="大圣短裙"
    let imgSmall= images.read(imgPath+objectName+".png");
    let p = findImage(imgMonkey, imgSmall, {
    region: [猴子的寻找区域[0], 猴子的寻找区域[1], 猴子的寻找区域[2]-猴子的寻找区域[0], 猴子的寻找区域[3]-猴子的寻找区域[1]],
    threshold: 0.9
    });

    // //猴子的眼睛
    // 128,1233
    // //柱子
    // 163,1338


    if(p){
        //log("\n找到了",objectName,"它的坐标是",p)
        position={x:p.x,y:p.y+40}
    }else{
        //log("\n没找到",objectName);
    }
    return position
}


function pillarGetPositon(monkey){
    //log("调用78行pillarGetPositon")


    let pPillar=0
    let position=false
    //屏幕中间,返回小猪身体中心
    let 柱子的寻找区域=[monkey.x+100,monkey.y,monkey.x+910,monkey.y+10]
    //log("柱子的寻找区域=",柱子的寻找区域)
    let objectName="柱子"
    let colorList=[]
    for(let i=0;i<6;i++){
        let color=images.pixel(imgMonkey, monkey.x, monkey.y-i)
        colorList.push(color)
    }
    //log(colorList)
    let p=false
    let pList=[]
    for(let i=0;i<colorList.length;i++){
        p = images.findColor(imgMonkey, colorList[i], {
            region: [柱子的寻找区域[0], 柱子的寻找区域[1], 柱子的寻找区域[2]-柱子的寻找区域[0], 柱子的寻找区域[3]-柱子的寻找区域[1]],
            threshold: 0.8
        });
        if(p){
            pList.push(p.x)
        }
    }
    // //log("100行pList=",pList)
    if(p==false){
        //log("103行没找到柱子")
        return position;
    }else{
        if(pList.length==0){
            //log("pList是一个空列表")
            return;
        }
        //log("109行pList=",pList)
        p=Math.min.apply(null, pList)
        //log("111行p=",p)
        pPillar=p
        //在坐标里面找最左值
        //如果有黄色手指,那么返回黄色手指的坐标,黄色手指下面是红色
        //439,1305,759,1347
        let redPoint=redPointGetPositon()
        if(redPoint){
            log("3220行有手指","从柱子函数中跳出")
            return redPoint
        }
    }
    //log("p=",p)


    // //log([柱子的寻找区域[0], 柱子的寻找区域[1], 柱子的寻找区域[2]-柱子的寻找区域[0], 柱子的寻找区域[3]-柱子的寻找区域[1]])


    if(p){
        //log("\n找到了",objectName,"它的坐标是",p)
        position=p
    }else{
        //log("\n没找到",objectName);
        return position
    }
    //log("pillarGetPositon(monkey)返回的结果是",position)
    // if(p>634){
    //     return position+180

    // }
    //log("柱子返回的值=",[position,"pillar"])
    return [pPillar,"pillar"]
}



function redPointGetPositon(){
    let line=[160,1065,900,1085]
    // 667,1075
    // 686,1075
    //至少15个是黄色的点
    let yellow="#FFF23A"
    let objectName="拈花指"

    let position=false
    // imgMonkey
    let sameColor=[]
    for(let j=0;j<line[3]-line[1];j++){
        for(let k=0;k<line[2]-line[0];k++){
            // //log("比较的点的坐标=",line[0]+k, line[1])
            let color=images.pixel(imgMonkey, line[0]+k, line[1]+j)
            k++;
            color=colors.toString(color)
            // //log(yellow, color)
            let result=colors.isSimilar(yellow, color)
            if(result){
                sameColor.push([line[0]+k])
            }
        }
        j++;
    }
    if(sameColor.length<20){
        //log("\n没找到",objectName);
        return position
    }else{
        let minP=Math.min.apply(null, sameColor)
        let maxP=Math.max.apply(null, sameColor)
        removeByValue(sameColor,minP)
        removeByValue(sameColor,maxP)
        minP=Math.min.apply(null, sameColor)
        maxP=Math.max.apply(null, sameColor)
        removeByValue(sameColor,minP)
        removeByValue(sameColor,maxP)
        minP=Math.min.apply(null, sameColor)
        maxP=Math.max.apply(null, sameColor)
        position=Math.round((maxP-minP)/2)+minP
        //log("\n找到了",objectName,"它的坐标是",position)
        //log("手指返回的值=",[position,"redPoint"])

        return [position,"redPoint"]
    }
}


function removeByValue(arr, val) {
    for(var i=0; i<arr.length; i++) {
      if(arr[i] == val) {
        arr.splice(i, 1);
        break;
      }
    }
  }
