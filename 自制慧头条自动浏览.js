"auto";
/*这是我做的自动浏览惠头条新闻的脚本，
做的不太好，也凑合用，分享一下。
qq:474291105
*/
//总时间min
var ee=rawInput("请输入个数,n为无限");
if (ee="n"){
    ee=9999
    toastLog("开始无限刷金币")
    }



launchApp("惠头条");
waitForActivity("com.cashtoutiao.account.ui.main.MainTabActivity");
openConsole();
sleep(5000);
toastLog("脚本已开始运行");
swipe(460,517,467,811,300);
//刷新页面

var ww=ee
while(ww>0){
    waitForActivity("com.cashtoutiao.account.ui.main.MainTabActivity");
	aa=random(2,4);
	while(aa>0){
		swipe(400,1000,412,500,500);
		sleep(200);
		aa=aa-1
	 }
	click(469,653);
	//随机找个新闻看看

	var qq=0
	while(qq<40){
   		waitForActivity("com.cashtoutiao.news.ui.NewsDetailActivity");
		var zz=random(500,600)+200;
 		swipe(481+(zz/8),600,482,zz,600);
 		sleep(2000);
 		swipe(482+(zz/8),zz,481,600,603);
		sleep(2000);
		qq=qq+1
        if(qq%5==0){
            log(qq)
        }
 
 	}
	 //退出新闻
    ww=ww-1
    log("还剩"+ww+"个新闻"); 
    back();

}

//退出
toastLog("已完成\n"+"预计用时："+ee+"分钟,\n"+"实际用时：");
exit();