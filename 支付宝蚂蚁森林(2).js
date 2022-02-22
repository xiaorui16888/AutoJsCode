
auto();
//auto.waitFor();

requestScreenCapture();
//解锁
unlock("1111");//里面是你的锁屏密码，仅支持数字解锁，并且需要点击确定键，需要点击确定键的需要自己改一下解锁函数

var friendNumber=87;//这里输入你的好友数，适当输大一点

threads.start(function(){
    toast("按音量下键停止")
    //启动监听
    events.observeKey();
    //监听音量下键
    events.onKeyDown("volume_down",function(event){
        toast("已停止")
        exit();
    })
    
});


//启动app
launchApp("支付宝");
waitForActivity("com.eg.android.AlipayGphone.AlipayLogin");
sleep(5000);
var w=text("蚂蚁森林").className("android.widget.TextView").findOne();
var b=w.bounds();
if(w==null){
    log("null");
}
//点击蚂蚁森林
if(click(b.centerX(),b.centerY())){
    
    log("点击成功");
}else{
    log("点击失败");
}



//收集自己的能量
sleep(5000);
//collectEnergy();

var width=device.width;
var i,j;

//盲点收自己的能量
for(i=450;i<=800;){//y方向点击范围
    threads.start(function(){
        for(j=200;j<width-200;){//x方向点击范围
           click(j,i);
           j=j+150;
        }
    });
    sleep(1000);
    i=i+100;
}

toastLog("收集能量完成");

//偷好友能量
sleep(3000);
stealEnergy(friendNumber);

toastLog("偷能量完成");

sleep(2000);

back();
sleep(2000);
back();
sleep(2000);

//关闭应用，仅有root权限下有用
shell("am force-stop com.eg.android.AlipayGphone",true);

exit();


//解锁函数
function unlock(password){
    var a;
    var b;
    if (!device.isScreenOn()) {
        device.wakeUpIfNeeded();
        sleep(2000);
        swipe(500,1000,500,100,1000);
        for(var i=0;i<password.length;i++){
            a=password.charAt(i);
            log(a);
            sleep(500);
            b=text(a).findOne().bounds();
            click(b.centerX(),b.centerY());
        }
        //需要点击确定键的可以在下面加上click(x坐标，y坐标);
        toast("解锁成功");
        sleep(500);
    }
}

//收能量
function collectEnergy(){
    sleep(2000);
    var i=descContains("收集能量").find().size();
    toast("可以收集"+i+"个能量");
    //descContains("收集能量").exists();
    while(i!=0){
        b=descContains("收集能量").findOne().bounds();
        sleep(1000);
        click(b.centerX(),b.centerY());
        i--;
        sleep(1000);
    }
}

//找好友的能量
function findFriendEnergy(){
    //截图
    var img = captureScreen();
    //toastLog("开始找色");
    //var point = findColor(img, "#1DA06D");
    var point = findColorInRegion(img,"#1DA06D", 0, 0, device.width,400);
    if(point){
       //toastLog("x = " + point.x + ", y = " + point.y);
       //点击进去偷能量
       click(point.x,point.y+50);
       return true;
    }else{
       //toastLog("没有找到");
       return false;
    }
}


//滑动屏幕找到更多好友
function swipeScreenFirst(){
    
    //gesture(1000,[500,1500],[500,500])
    swipe(500,600,500,100,1000);
    var i=5;
    while(true){
        if(desc("查看更多好友").exists()){
           desc("查看更多好友").findOne().click();
           sleep(2000);
           swipe(500,500,500,278,1000);
           break;
        }
        
        if(i==0){
            toastLog("你的好友太少无法偷取");
            sleep(2000)
            back();
            sleep(2000);
            //关闭应用，仅有root权限下有用
            shell("am force-stop com.eg.android.AlipayGphone",true);

            exit();
        }
        
        i--;
    }
    
}


//滑动屏幕
function swipeScreen(){
    //滑动一个好友的距离
    //gesture(1000,[500,1500],[500,500])
    swipe(500,500,500,290,1000);
    
}

//偷好友能量
function stealEnergy(friendNumber){
    //滑动屏幕，找到查看更多好友进入到好友排行榜
    swipeScreenFirst();
    sleep(2000);
    
   //一个一个偷能量
    while(friendNumber!=0){
        if(findFriendEnergy()){
            sleep(2000);
            collectEnergy();
            back();
            sleep(1000);
            swipeScreen();
        }else{
            swipeScreen();
            sleep(1000);
        }
        
        friendNumber--;
        
    }
    
}