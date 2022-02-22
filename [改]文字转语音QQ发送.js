//******************************************************************************************************************
var QQ = dialogs.rawInput("输入QQ号","");

var window = floaty.window(
    <frame><linear>
        <button id="action" text="运行" w="40" h="40" color="#ffffff" bg="#66000000"/>
   </linear> </frame>
);

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
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            //if(new Date().getTime() - downTime > 1500){
                //exit();
            //}
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                onClick();
            }
            return true;
    }
    return true;
});

function onClick(){
    threads.start(function(){
        run(1);
    });}
 
function run(r){
    var r=r;
while (r) {
  var name = "/sdcard/脚本/1.mp3"
  var str = dialogs.rawInput("输入要发送的语音内容", "");
  语音合成(str, name);
  alert(str);
  var date = new Date();
  var 年 = f(date.getYear() + 1900, 4);
  var 月 = f(date.getMonth() + 1, 2);
  var 日 = f(date.getDate(), 2);


  var path = "/storage/emulated/0/Tencent/MobileQQ/" + QQ + "/ptt/" + 年 + 月 + "/" + 日 + "/"
  //alert(path);
  files.removeDir(path)
  sleep(200)
  files.ensureDir(path)
  sleep(200)
  if(desc("群资料卡").exists()){
      bounds(0,1809,154,1911).findOne().click()
  }else{
      bounds(0,1809,135,1911).findOne().click()
  }
  sleep(200)
  click("录音")
  sleep(200)
  bounds(379, 1396, 700, 1717).find().click()
  sleep(2000)
  bounds(379, 1396, 700, 1717).find().click()
  //var arr = files.listDir("/sdcard/");
  toast(path);
  sleep(1000)
  var fileName = files.listDir(path);
  files.remove(path + fileName[0])
  files.copy(name, path + fileName[0]);
  sleep(200)
  click("发送")
  r=0;
}}

function 语音合成(str, path) {
  var str = str;
  var url = "http://www.xfyun.cn/herapi/solution/synthesis?vcn=x_yifeng&vol=7&spd=medium&textType=cn&textPut=" + str;
  var res = http.get(url).body.string();
  eval("res=" + res + ".data");
  var mp3 = http.get(res).body.bytes();
  files.writeBytes(path, mp3);
}

function f(str, leng) {
  str = str.toString();
  return new Array(leng - str.length + 1).join("0") + str;
}

setInterval(()=>{}, 1000);