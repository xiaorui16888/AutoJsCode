"auto";
/*
*点按位置需要根据自己手机屏幕再调节
*需要自己根据技能长短调技能发动时间，
*目前就设置了1.2.4三个技能和大招
*可根据需要添加3号技能
*加血用的是三号位的血瓶，需要把血瓶栏点出来才会使用
*/
if(!requestScreenCapture()){
    toast("请求截图失败");
    stop();
}
//setScreenMetrics(1080, 1920);
for(var i=1,j=1;i>0;i++,j++){
//click(1050, 1300);
    click(1771,788);
    sleep(1200);
    if(i==6){
        click(1788,535);
        sleep(1000);
        click(1640,625);
        sleep(1000);
        click(1500,950);
        //sleep(1000);
        i=i-5;
        }
    if(j==10){
        sleep(500);
        click(1800,370);
        sleep(1000);
        swipe(700,850,1270,850,1000);
        j=j-9;
        }
        while(!images.detectsColor(captureScreen(), "#7cdf45", 365, 89)){
            click(999,564);
            sleep(1000);
            }
    }
    