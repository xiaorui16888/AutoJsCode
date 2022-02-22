"auto";
/*这是我大修改过后的慧头条脚本，有问题找我，不定时回复修复问题。
qq：474291105
拒绝骚扰
x_Eric
*/
var ee=rawInput("请输入时间（分钟）,n为无限");
if (ee="n"){
    ee=999999
    toastLog("开始无限刷金币")
    }
if(ee>0&&ee<=0){
    toastLog("输入有误")
    exit();
    }
openConsole();
launchPackage("com.cashtoutiao");
toast("如果应用未自动打开，请手动点击慧头条");
toastLog("时间不是准确无误，等待更新");
//或者大佬自己写
setScreenMetrics(768,1080);
toastLog("中途可按音量上键结束");

 var initial = ee/60 //持续时间
 var nowTime = Date.now() //当前时间戳
 var holdTime = initial * 1000
 var latter = nowTime + holdTime
 nowTime = Date.now()
//以上为时间调整
waitForActivity("com.cashtoutiao.account.ui.main.MainTabActivity");
toastLog("三秒后开始");

sleep(3000);
//以下是移植内容
toastLog("脚本已开始运行");
swipe(460,517,467,811,300);
//刷新页面

var ww=0//kan xin wen ge shu 
while(nowTime <= latter){
      nowTime = Date.now() //当前时间戳

    waitForActivity("com.cashtoutiao.account.ui.main.MainTabActivity");
	aa=random(2,4);
	while(aa>0){
		swipe(400,1000,412,500,500);
		sleep(200);
		aa=aa-1
	 }
    //sui ji xun zhao guang gao 
    
	click(469,653);
	//随机找个新闻看看

	var qq=0//hua dong ci shu
	while(qq<40){//qq为在一个新闻内的时间，按经验调。
   		waitForActivity("com.cashtoutiao.news.ui.NewsDetailActivity");
		var zz=random(500,600)+300;
 		swipe(481+(zz/8),600,482,zz,600);
 		sleep(2000);
 		swipe(482+(zz/8),zz,481,600,603);
		sleep(2000);
		qq=qq+1
        if(qq%5==0){
            log("滑动"+qq+"次")
        if(nowTime > latter){
            toastLog("时间到");
            back();
            back();
            back();
           //退出
            Power();
            exit();
            }
        }
 
 	}
	 //退出新闻
    ww++
    log("已完成"+ww+"个新闻"); 
    back();

}
back();
exit();//tui chu



  
 