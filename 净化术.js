auto();
//跳过所有“跳过”
var ad=new Array();

ad.push(currentPackage());
//var i=1;
var count=100;//净化次数
var oo="咩有广告呢！";

//console.show();
toastLog("净化术！");
toastLog("按音量加键停止施放！");
threads.start(function () {
        events.observeKey();
        events.onKeyDown("volume_up", function (event) {
            toastLog("净化结束 世界核平！");
            engines.stopAll();
            //sleep(100);
            exit();
        });
    });    




for(var i=1;i<count;){

	ad.push(currentPackage());
	log("ad[0]="+ad[0]);
	
	

	if(ad[0]==ad[1])
	{
		log(oo);
		sleep(500);
		//break;
	}else{
		log("不确定广告！");
		
		for(var i=1;i<5;i++){
			var pp=textContains("跳过").exists();
			if (pp) {
				break;
			}else{
			sleep(500);	
			}
			
		}
		
		log(pp)
			if(pp) {
			log("有广告！");
count--;
			var tg=textContains("跳过").findOne().bounds();
		
			click(tg.centerX(),tg.centerY());
			toast("净化术剩余"+count+"次");
		//	sleep(3000);

					}else{
						log("依然没有广告！")
						}
		}
ad.shift();
	ad.push(currentPackage());
	log("ad[1]="+ad[1]);
	//sleep(700);
	
	
}
 toastLog("净化结束 世界核平！");
 exit();
