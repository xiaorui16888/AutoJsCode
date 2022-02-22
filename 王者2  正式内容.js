"auto"
/*下文中z*均为图片处理，
col*为16进制颜色，


email：474291105＠qq.com
*/
setScreenMetrics(720,1280);
var tGx=1147,tGy=46,tGx2=1233,tGy2=46,tgg1="#ff3689cf",tgg2="#ff3480c9";
    //设置跳过按钮颜色和位置
var ee=rawInput("请输入重复次数","3");
if (ee==0){
    ee=9999
    toastLog("无限模式")
    }
else if(ee>0){
    log("输入内容判断结束")
}
else{
    alert("输入内容有误，程序结束");
    exit();
    }
//运行次数


openConsole();
if(!requestScreenCapture()){
    toast("请授予截图权限");
    exit();
}
var xx=captureScreen();
//检测跳过按钮自动点击，直到跳过。或者是其他按钮比如掉线，组队。
function tiaoGuo(located1x,located1y,Ca,located2x,located2y,Ba){
    zC= images.pixel(xx,located1x,located1y);
    zD= images.pixel(xx,located2x,located2y);
	col1=colors.toString(zC);
	col2=colors.toString(zD);
    
    //颜色...目前只检测2点。
	while(col1==Ca&&col2==Ba){
    click((located1x+located2x)/2,(located1y+located2y)/2);
    }

}


//请求截图权限。
toast("脚本开始");
sleep(3000);
//waitForPackage("com.tencent.tmgp.sgame");
log("一切权限正常");  
//开始游戏
//别忘记调试 检查颜色
while(ee>0){
    tiaoGuo(988,650,"#ffd68b27",1140,650,"#ffc87f25");
    sleep(10000);
    log("进入游戏");
    do{sleep(1000);
        zA=captureScreen()       
        col3=colors.toString(images.pixel(zA,693,679));
        col4=colors.toString(images.pixel(zA,03,03));
    }while(!(col3=="#124567"||col4=="#090909"));//3为自动按钮的蓝，4为跳过的蓝。
	log("wanCheng dowhile xunHuan");
    tiaoGuo(tGx,tGy,tgg1,tGx2,tGy2,tgg2);
    log("进入页面跳")
    click(1194,41);//点击自动按钮
    while(true){
            tiaoGuo(tGx,tGy,tgg1,tGx2,tGy2,tgg2);
    		sleep(1000);
    		log("局内跳过执行");
    		col5=colors.toString(images.pixel(zA,693,679));
        	col6=colors.toString(images.pixel(zA,03,03));
    		if(col5=="#ffe4e7e9"&&col6=="#787878"){
            break;
            }
               //左右一面一个，黑的。据观察，不黑。。
          }
	log("成功跳出循环");
    click(06,06);//点击成功页面任意键继续
	sleep(2500);
	//点击再来一次
	tiaoGuo(07,07,08,08,Y);
	log("完成");
	//待添加计时语句
    
    
    
    
    
	ee--
    
}
toastLog("大功告成！！！");
toast("^－^");
exit();