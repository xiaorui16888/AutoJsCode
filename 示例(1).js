  var storage = storages.create("ABC");
k=dialogs.rawInput("系数","1.32")
var path = "/sdcard/脚本/游戏/微信，跳一跳/悬浮窗研究/2.js";
if(!files.exists(path)){
    toast("脚本文件不存在: " + path);
    exit();
}
var window = floaty.window(
    <frame>
        <button id="action" text="棋子" w="60" h="60" bg="#000080"/>
    </frame>
);
window.setPosition(500,500);
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
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if(new Date().getTime() - downTime > 9000){
                exit();
            }
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
    var txt=window.action.getText();
    if( txt== '棋子'){
           storage.put("棋子x", window.getX()+29)
           storage.put("棋子y",window.getY()+86);
        window.action.setText('目标');
    };
    if(txt == '目标'){
            storage.put("目标x", window.getX()+29)
           storage.put("目标y",window.getY()+86);
        window.action.setText('跳跃');
    };
    if(txt == '跳跃'){
       qzx=storage.get("棋子x");
       qzy=storage.get("棋子y");
       mbx=storage.get("目标x");
       mby=storage.get("目标y");
      jl=Math.sqrt(Math.pow(Math.abs(mbx-qzx),2)+Math.pow(Math.abs(mby-qzy),2),2);
      log(jl);
                execution = engines.execScriptFile(path);
        window.action.setText('棋子');
        
        toast("继续循环操作");
    }
}


