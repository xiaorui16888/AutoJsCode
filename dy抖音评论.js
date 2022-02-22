//2019-03-06
//孙老师
//----------
auto.waitFor();
setScreenMetrics(480, 800);
launchApp("抖音短视频");
sleep(5000);


var comment1 = "自定义评论内容1";
var comment2 = "自定义评论内容2";
var comment3 = "自定义评论内容3";
var comment4 = "自定义评论内容4";
var comment5 = "自定义评论内容5";
var waitTime = 1000 * 60 * 60;

var date;

var commArr = new Array();
if (comment1.length != 0) {  
    commArr.push(comment1);
}
if (comment2.length != 0) {  
    commArr.push(comment2);
}
if (comment3.length != 0) {  
    commArr.push(comment3);
}
if (comment4.length != 0) {  
    commArr.push(comment4);
}
if (comment5.length != 0) {  
    commArr.push(comment5);
}

// 随机评论前段
var commArr1 = new Array();
commArr1.push("喜欢你的视频");
commArr1.push("看了你的视频,真的很开心");
commArr1.push("这视频厉害了");
commArr1.push("内容过于真实");
commArr1.push("2333");
// 随机评论中段
var commArr2 = new Array();
commArr2.push("");
commArr2.push(" 太逗了");
commArr2.push(" 给你点赞");
commArr2.push(" 酷");
commArr2.push(" 牛批");
commArr2.push(" 加油哦");
// 随机评论后段
var commArr3 = new Array();
commArr3.push("");
commArr3.push(".");
commArr3.push("..");
commArr3.push("...");
commArr3.push("!");
commArr3.push("!!");
commArr3.push("!!!");

var commArr4 = new Array();
commArr4.push("说得好");
commArr4.push("给你赞");
commArr4.push("同意你");

var pinglun = 1; // 1：先发评论, 0：先发私信
var tempInterval;
var i = 0;
var time1;
var time2;

var timePrev;
var timeNow;

var totalTime;
var beginTime;
var vorTime;
var jbRunTime = 0;
var jbRunTime2 = 0;
var count = 0;
var commentCount = 0;
var vol = 0;
var decition = 0;
var customInterval = 15000;
var mainActivity = "com.ss.android.ugc.aweme.main.MainActivity";
if (currentActivity() == mainActivity) { // 如果没在抖音的主页面，则退出
      
    toast(">>>>>>>>>>>>脚本启动<<<<<<<<<<<<");  
    sleep(3000);

      
    date = new Date();  
    time1 = date.getTime();  
    beginTime = time1;  
    vorTime = time1;  
    timeNow = time1;  
    log("启动时间：" + time1);  
    tempInterval = waitTime;  
    toast("程序启动!");  

      
    for (;;) { // 循环开始

                
        i++;    
        sleep(1000);

            
        time2 = new Date().getTime();    
        timePrev = timeNow;    
        timeNow = time2;

            
        var oneround = timeNow - timePrev;    
        totalTime = timeNow - beginTime;

            
        log("for循环耗时:" + oneround     + " 评论数=" + count + " 私信数=" + commentCount);    
        sleep(10);

            
        log("总运行时间:" + Math.floor(totalTime / 60000) + "分钟");    
        sleep(10);

            
        jbRunTime += oneround;    
        jbRunTime2 += oneround;    
        log("评论周期:" + Math.floor(jbRunTime / 60000) + "分钟");    
        sleep(10);

            
        if (pinglun == 0 && jbRunTime >= tempInterval) {

                  
            pinglun = 1;      
            jbRunTime = 0;      
            log("时间到了" + Math.floor(tempInterval / 60000)         + "分钟，开始评论，评论周期归零");    
        }

            
        log("是否评论发言:" + pinglun);    
        sleep(10);

            
        if (pinglun == 1) { // 进入评论操作

                  
            customInterval = 1000 * 10 + Math.floor((Math.random() * 1000 * 5));      
            toastLog(Math.floor(customInterval / 1000) + "秒后评论");      
            sleep(customInterval);


                  
            toastLog("点赞");      
            Tap(447, 469);      
            sleep(1000);

                  
            Tap(447, 548);      
            sleep(2000);

                  
            Tap(215, 770);      
            sleep(1500);


                  
            var index1 = Math.floor((Math.random() * commArr1.length));      
            var index2 = Math.floor((Math.random() * commArr2.length));      
            var index3 = Math.floor((Math.random() * commArr3.length));      
            var randomComm = commArr1[index1] + commArr2[index2] + commArr3[index3];      
            if (randomComm == undefined || randomComm.length < 4) {        
                randomComm = "good";      
            }      
            var index = Math.floor((Math.random() * commArr.length));      
            log("评论内容:" + index1 + "," + index2 + "," + index3 + "," + index);      
            var ran = Math.floor((Math.random() * 1000));      
            var finalComm = randomComm + " " + ran + " " + commArr[index];

                   //id("wl").findOne().
            setText(0, finalComm);
            sleep(800)
            id("a8p").findOne().click();
            sleep(500)
            id("a8q").findOne().click();

                  
            var inputInterval = 250 * finalComm.length;      
            if (inputInterval < 4000) {        
                inputInterval = 4000;      
            }      
            log("输入耗时:" + inputInterval + ", len=" + finalComm.length);      
            sleep(inputInterval); // 模拟用户输入时间，输入速度不能太快

                  
            id("wo").findOne().click(); // 点击“提交”

                  
            count++;

                  
            var date1 = new Date();      
            var currTime = date1.getTime();      
            var oneDiff = (currTime - vorTime) / 1000;      
            var diffTime = (currTime - beginTime) / 1000;      
            vol = diffTime / count;      
            vorTime = currTime;


                  
            log("评论轮次:" + count         + "\n   评论:" + finalComm         + "\n   距上次" + oneDiff + "秒"         + "\n   平均速度=" + vol + "秒/条");

                  
            if (count % 20 == 0) { // 每20条评论后，进入“私信”操作

                        
                pinglun = 0; // 切换“私信”模式
                                
                tempInterval = waitTime;        
                if (count % 100 == 0) {          
                    tempInterval = 1000 * 60 * 60 * 20;

                            
                }

                        
                log("waitTime=" + (tempInterval / 60000) + "分钟, 进入休息区.");

                      
            }


                  
            var mins = diffTime / 60;

                  
            toast("已评论" + count + "条, 已运行了" + Math.ceil(mins) + "分钟");

                  
            sleep(2000);      
            Tap(230, 135); // close comment
                  
            sleep(1000);


                
        } else { //pinglun == 0 “私信操作”
                  

                  
            var index4 = Math.floor((Math.random() * commArr4.length));      
            var index = Math.floor((Math.random() * commArr.length));      
            var messageComm = commArr4[index4] + " " + commArr[index];

                  
            customInterval = 1000 * 10 + Math.floor((Math.random() * 1000 * 2));      
            toast(Math.floor(customInterval / 1000) + "秒后私信");      
            log("准备私信:" + customInterval / 1000);      
            sleep(customInterval);

                   //toastLog("点赞");
                   //Tap(447, 469);
                  
            sleep(1000);

                  
            Tap(447, 548);      
            sleep(2000);
            // 查看一下评论数是否为0
                  
            var num2 = id("bc").findOne().text();      
            if (num2 != "") {        
                log("内部评论数:" + num2);

                        
                Tap(90, 367);         //log("点击别人评论");

                        
                sleep(1000);        
                log("点击别人评论之后 " + currentActivity());        
                Tap(91, 391); // click reply message回复私信
                        
                log("点击回复私信之后 " + currentActivity());        
                sleep(2000);        
                log("setText(messageComm)之前 " + currentActivity());                
                if (currentActivity() == mainActivity) {

                              
                    id("ze").findOne().setText(messageComm)           sleep(1000);          
                    Tap(336, 529); // send message
                                
                    commentCount++;            
                    log("已私信" + commentCount + "条:" + messageComm);          
                    toast("已私信" + commentCount);        
                } else { // not in the Page
                              
                    toastLog("跳进了广告 " + currentActivity());          
                    sleep(4000);           // go back
                              
                    back(); // 用返回键，退出当前广告
                              
                    log("back");        
                }

                      
            } else {        
                log("这里没有评论,直接关闭窗口");      
            }      

                  
            sleep(2000);      
            Tap(230, 135); // close comment
                  
            sleep(1000);

                
        }    
        log("------------" + i + "-向上滑动-翻页-------------");    
        Swipe(245, 700, 245, 150, 666);    
        sleep(1000);  
    } //for
} //if MainActivity