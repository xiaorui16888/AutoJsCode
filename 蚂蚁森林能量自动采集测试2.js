//悬浮窗
var loging = floaty.window(
    <card cardBackgroundColor="#aa000000" cardCornerRadius="18dp">
        <horizontal w="250" h="35" paddingLeft="10" paddingRight="10">
            <text id="log" size="12dp" color="white" w="180" h="35" layout_gravity="center" gravity="center||left">软件已启动</text>
            <button id="stop" w="auto" textSize="10dp" textColor="black" h="35">关闭程序</button>
        </horizontal>
    </card>
)
ui.run(() => {
    loging.setPosition(170, 1074)
})

_log = log

function log(text) {
    if (loging) {
        ui.run(() => {
            loging.log.text(text)
        })
    }
}
var on = threads.start(function() {
    loging.log.on("click", () => {
        toast("已隐藏日志悬浮窗")
        loging.close()
    })
    loging.stop.on("click", () => {
        engines.stopAll()
    })
})

loging.log.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = loging.getX();
            windowY = loging.getY();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            loging.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
    }
    return true;
});

//定义函数变量
var graph;
var Exists;


//获取自己能量
function My(){
var power = descContains("克").find();
//toast(power);
for(var i = 0;i < power.length;i++){
//点击能量
click(power[i].bounds().centerX(),power[i].bounds().centerY());
log("主人，我现在可是能量满满哟")
sleep(800);
};
};


//截图做对比函数
function Cap(){
    var png = images.read("/sdcard/tmp.png");
    graph =findImage(captureScreen(),png,{
        region:[0,0],
        threshold:0.8
     });
     //toast(graph);
};
//滑动函数
function Swipe(){
    swipe(500,1500,500,300,1000);
};

//找到图后点击进去
function 偷能量(){
click(graph.x-300,graph.y+50);
sleep(2000);
var power = descContains("克").find();
//toast(power);
for(var i = 0;i < power.length;i++){
//点击能量
click(power[i].bounds().centerX(),power[i].bounds().centerY());
log("主人，看我偷的能量，厉害吧");
sleep(800);
};
back();
};


//判断自己能量
function powerOne(){
    var power = descContains("g").depth("15").findOne().desc();
    //console.show();
    //console.log(power);
    log(power)
    return parseInt(power); 
}


auto.waitFor("fast");
requestScreenCapture();
//launchApp("支付宝")
app.openUrl("https://ds.alipay.com/");
sleep(2000);
while(!click("首页"));

if(textContains("蚂蚁森林").findOne(800) == null)
{
    for(var i = 0; i < 3; i++){
        log("请添加蚂蚁森林到首页");
        toast("请添加蚂蚁森林到首页");
        toast("请添加蚂蚁森林到首页");
    }
    exit();
}
while(!click("蚂蚁森林"));
while(!descContains("种树").findOne());

powerOne();
var powerTotal = powerOne();

log("进入蚂蚁森林偷能量，如无异常，请不要关闭软件")
sleep(1000)
My();
descContains("查看更多好友").findOne().click();

sleep(1000)
while(1){
var Exists = descContains("邀请").exists();
//toast(Exists);
if(Exists == false){
    sleep(300);
    Cap();
    while(1){
    if(graph != null){
        偷能量();
        sleep(300)
        Cap();
        }
        else{
            break;
            }
        }
    Swipe();
    }
    else{
        back();
        break;
        };
};
var powerOne = powerOne();
var total = (powerOne - powerTotal);
while(1){
log("本次共获取能量:"+total+"克");
}

