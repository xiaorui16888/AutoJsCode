"auto";//Qq资料回赞吧
/*
技术由“五一脑洞(劳动)节”支持 ~ 这个五一你脑洞了吗
如有问题，联系QQ2261988895 ~ 永火玄冥
我：“我不一定回你，可我誓死捍卫你提问题的权利”
*/
alert("             打开资料卡~\n\n       紫色开启，蓝色停止\n\n             长按2秒关闭");
var window = floaty.window(
    <frame><linear>
        <img id="action" src="http://pics.sc.chinaz.com/Files/pic/icons128/3850/Blue.png" w="80" h="80" />
    </linear> </frame>
);
var GG = 1, G = 0;
var JM = "com.tencent.mobileqq.activity.VisitorsActivity";
var execution = null;
//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.action.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒且偏移很小判断为长按，退出脚本
            if (new Date().getTime() - downTime > 2000 && Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 9) {
                GG = 0;
                exit();
            }else{

            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小且按下时间小于0.5秒则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5 && new Date().getTime() - downTime < 500) {
                if(G == 1){
                    G = 0;
                }else{
                    G =1;
                }
            }
            return true;
    }
    return true;
});

function 赞(){
    try{
        var a = desc("赞").find();
        if(a){
            a.each(function(e){
                for(var i=0; i<10; i++){
                    e.click();
                    sleep(random(80,130));

                }

            });

        }

    }catch(err){
        log("错误名称: " + err.name+" ---> ");
        log("错误信息: " + err.message+" ---> ");
        sleep(600);

    }
    
}

function 下滑(){
    var a = text("显示更多").findOne(10);
    if(text("暂无更多赞过你的人").exists()){
        GG = 0;
        confirm("回赞完成，停止运行");
        exit();

    }else if(a){
        a.parent().click();
        sleep(random(1600,2000));
        scrollDown();

    }else{
        scrollDown();

    }

}

threads.start(function(){
    do{
        if(text("取消").exists()){
            click("取消");

        }
        sleep(random(90,130));

    }while(GG);

});

threads.start(function(){
    do{
        if(currentActivity() == JM && G == 1){
            赞();
            sleep(random(100,300));
        
        }
        if(currentActivity() == JM && G == 1){
            下滑();
            sleep(random(1200,1900));
        }
        sleep(random(90,130));

    }while(GG);

});

setInterval(() => {
    ui.run(function(){
        if(G == 1){
            window.action.setSource("http://pics.sc.chinaz.com/Files/pic/icons128/3850/Purple.png");
        }else{
            window.action.setSource("http://pics.sc.chinaz.com/Files/pic/icons128/3850/Blue.png");
        }
    })
    
}, 300);

























