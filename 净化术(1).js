auto();
//跳过所有“跳过”
var ad=[];
ad[0]="0";

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



while(true){
	var i=1;
	var b;
	b=currentActivity();
	log(b);
	ad[i]=b;
	i++;
	

	if(ad[i]==ad[i-1])
	{
		log("咩有广告呢！")

		
		

	}else{
		sleep(700);
		var tg=textContains("跳过").findOne().bounds();
		//log(tg);
		click(tg.centerX(),tg.centerY());
		toast("净化成功！");
		
	}
	sleep(500);
}
