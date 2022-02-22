     st = storages.create("ABC");
var window = floaty.window(
    <frame>
        <button id="action" text="棋子" w="60" h="60" bg="#ffffff"/>
    </frame>
);

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
            if(new Date().getTime() - downTime > 1500){
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
           st.put("棋子x", window.getX()+29)
           st.put("棋子y",window.getY()+86);
        window.action.setText('目标');
    }else if(txt == '目标'){
            st.put("目标x", window.getX()+29)
           st.put("目标y",window.getY()+86);
        window.action.setText('跳跃');
    }else if(txt == '跳跃'){
       var qzx=storage.get("棋子x");
       var qzy=storage.get("棋子y");
       var mbx=storage.get("目标x");
       var mby=storage.get("目标y");
       b=Math.sqrt(Math.pow(Math.abs(mbx-qzx),2)+Math.pow(Math.abs(mby-qzy),2),2);
       log(b);
        window.action.setText('棋子');
        toast("继续循环操作");
    }
}


