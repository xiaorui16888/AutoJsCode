TrafficStats=android.net.TrafficStats;

var window = floaty.window(
    <frame>
        <vertical>
            <linear>
                <text id="action" text="换" gravity="left" size="10" w="auto" h="auto" color="#00ff00" bg="#77000000"/>
            </linear>
            
        </vertical>
    </frame>
);

var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.action.setOnTouchListener(function(view, event) {
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
           
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                threads.start(function() {
                    onClick();
                });
            }
            return true;
    }
    return true;
});
str="";
zss=ozs();
zxs=ozx();

swsl=0;
swxl=0;
zwss=0;
zwxs=0;
threads.start(function(){
    swsl=ozs();
    swxl=ozx();
    while(true){
        sleep(1000);
        xwsl=ozs();
        xwxl=ozx();
        zwss=xwsl-swsl;
        zwxs=xwxl-swxl;
        swsl=xwsl;
        swxl=xwxl;
        }
    
});
//log(Object.keys(TrafficStats));

threads.start(function(){
    while(true){
        
str="流量↑:"+sz(lzs())+
"\n流量↓:"+sz(lzx())+
"\n网速↑:"+sz(zwss)+"\/s"+
"\n网速↓:"+sz(zwxs)+"\/s";
ui.run(function(){
window.action.text(str);
});


}
});

function ozs(){return TrafficStats.getTotalTxBytes();}
function ozx(){return TrafficStats.getTotalRxBytes();}

function lzs(){return ozs()-zss;}
function lzx(){return ozx()-zxs;}

function sz(num){
if(num<1024){return num.toFixed(2)+"by";}else{num/=1024}
if(num<1024){return num.toFixed(2)+"Kb";}else{num/=1024}
if(num<1024){return num.toFixed(2)+"Mb";}else{num/=1024}
if(num<1024){return num.toFixed(2)+"Gb";}else{num/=1024}
if(num<1024){return num.toFixed(2)+"Tb";}else{num/=1024}
if(num<1024){return num.toFixed(2)+"Pb";}else{num/=1024}
return num.toFixed(2)+"Eb";
}






log(TrafficStats.getTotalRxBytes());

while(true){sleep(1000);}