

console.show();
//device.cancelKeepingAwake();
/*for(var i=0;i<30;i++){

    sleep(1000);
    if(!device.isScreenOn()){
        device.keepScreenDim();
    }
}
*/
//device.wakeUp()

var window;
var threadTime;
var currTimer;

function ShowFrame(){
    //setScreenMetrics(1080, 1920);//设置所适合的屏幕
    window = floaty.window(
        <frame alpha="0.8" id="action">
            <vertical h="*">  --垂直        
                <button id="btnclose" gravity="left" w="35" h="40"  text="X"/>      
                <horizontal  w="*" h="24" bg="#F08080"> --水平
                    <text textColor="#F0FFFF">任务进度:</text>
                    <text id="textjd" textColor="#F0FFFF">xxxx</text>                   
                    <text id="text" textColor="#F0FFFF" gravity="right"  w = "*" ></text>                    
                </horizontal>
                
                <ScrollView w="*" h="*" bg="#EDEDED" id="sv" >
                    <text bg="#EDEDED" h="*" id="message" w = "*" scrollbars = "vertical">准备开始</text>           
                </ScrollView>
            </vertical>
        </frame>
    );
    window.exitOnClose();
    window.action.longClick(function(){
        window.setAdjustEnabled(!window.isAdjustEnabled());
        return true;
    })
    window.setSize(device.width+100,device.height/3);
    window.btnclose.click(function(){
        threadTime = null;
    });
    window.setPosition(1,(device.height-window.getHeight())/2);

    var startDate = new Date();
    threadTime = threads.start(function(){
        currTimer = setInterval(function(){
                if(threadTime==null){
                    if(currTimer!=null) {
                        window.close();
                        clearInterval(currTimer);
                    }
                } 
                if(!device.isScreenOn()){//如果正在运行，屏幕黑屏，立马亮屏
                    device.keepScreenDim();
                }                               
                ui.run(function(){
                    var currentDate = new Date();
                    var t = currentDate.getTime()-startDate.getTime();
                    var h=Math.floor(t/1000/60/60%24);
                    var m=Math.floor(t/1000/60%60);
                    var s=Math.floor(t/1000%60);                
                    var tstr = util.format("运行: %d:%d:%d",h,m,s);
                    window.text.setText(tstr);
                    
                })
        },1000)
    });
}

ShowFrame();