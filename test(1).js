"ui";

    ui.layout(
        <frame>
              <button id="t1">这是第一个界面,点击切换到第二个界面</button>
        </frame>
    );


var w = null ;
ui.t1.click(()=>{
    threads.start(function(){
        w = floaty.window(
            <frame gravity="center">
                <button id="task" text="自动任务"  style="Widget.AppCompat.Button.Colored"/>
            </frame>
        );
        setTimeout(()=>{}, 2000);
        w.task.click(()=>{
            test();
        });


        var window = floaty.window(
            <frame w="110">
                <vertical >        
                    <button id="action" text="点击拖动" style="Widget.AppCompat.Button.Colored"/>
                    <button id="end" text="结束" />
                </vertical>
            </frame>
        );
       
        //home();
        var x = 0, y = 0;
        var windowX, windowY;
        //    events.observeTouch();
            //注册触摸监听器
        //    events.onTouch(function(p){
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
                        //onClick();
                        engines.execScriptFile("task.js");
                        //engines.stopAllAndToast();
                    }
                    return true;
            }
            sleep(10);
            return true;
        });

        while(true){
            sleep(100);
        }
    });
});
 
function test(){
    log("阿斯蒂芬大师傅大师傅");
}

setInterval(() => {}, 500);
