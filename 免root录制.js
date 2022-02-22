/*
作者:  A酷安(ღ˘⌣˘ღ)----锦
使用说明: 
①开始运行:
   会出现一个图层仔细看屏幕中间会有“开始”俩字，没事不用管。
   每点击一次都会改变一下，下面会解释！
②开始操作：
   点击不要操作太快，这脚本只是记录按键的。后期最好还是自己处理下。
   对于滑动先在图层上滑动一下，先略微滑一小段距离，然后滑动就可以了。
   滑动结束后要等一会！等脚本自动滑动完成再进行下一步。
③导出录制的脚本:
   把屏幕中间的字调到“开始”，然后按住屏幕滑动一小段距离，
   等待5秒以上。
   图层消失。内容复制到剪贴板了！
   新建个脚本，粘贴进去，手动修改一下就ok了！
④特别说明：
   各种录制还不太完善,有大佬没事可以优化一下！
     ∧_∧::
 　 (´･ω･`)::
  /⌒　　⌒)::
 /へ_＿  / /::
(＿＼＼  ﾐ)/::
　 ｜ `-イ::
　 /ｙ　 )::
　/／  ／::
／　／::
(　く:::
|＼ ヽ:::

*/
var window = floaty.rawWindow(
    <frame>
        <button id="action" text="开始" textColor="#850000ec" gravity="center" bg="#1066ec15"/>
    </frame>
);

setInterval(() => {}, 1000);
window.setTouchable(true);
window.setSize(-1, -1);
var execution = null;
tim = 0
var x = 0,
    y = 0;
var windowX, windowY;
var downTime;
var otim = new Date().getTime();
var arr_z = [];
var arr = [];
var xy = []
var arr_x = [];
var arr_y = [];
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
            if (Math.abs(event.getRawY() - y) > 5 && Math.abs(event.getRawX() - x) > 5) {
                xx = event.getRawX()
                arr_x.push(xx)
                yy = event.getRawY()
                arr_y.push(yy)
                tim = new Date().getTime() - downTime;
            }
            if (new Date().getTime() - downTime > 4000 && window.action.getText() == '开始') {
                setClip(arr_z.join("\n"));
                exit()
            }
            return true;
        case event.ACTION_UP:
            if (Math.abs(event.getRawY() - y) > 5 && Math.abs(event.getRawX() - x) > 5){

                threads.start(function() {
                    sleep(50);
                    log(arr_x.length, arr_y.length);
                    arr = []
                    for (let ii in arr_x) {
                        arr.push("[" + sswr(arr_x[ii], 0, 3) + "," + sswr(arr_y[ii], 0, 3) + "]")
                    }
                    arr_x = []
                    arr_y = []
                    txt = "gesture(" + tim + "," + arr.join(",") + ")";               
                     log("滑动tim=", tim,"ti_d=",ti_d)
                    arr_z.push("sleep(" + (ti_d - 90) + ");\n"+txt )
                    window.setSize(0, 0);
                    ti_d = new Date().getTime() - otim
                    sleep(80)
                    eval(txt)
                    otim = new Date().getTime();
                    sleep(10)
                    window.setSize(-1, -1)
                });
            };
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                onClick();
                xx = event.getRawX()
                yy = event.getRawY()
                threads.start(function() {
                    log("点击tim=", tim)
                    ti_d = new Date().getTime() - otim
                    log("点击ti_d=", ti_d)
                    window.setSize(0, 0);
                    sleep(80);
                    arr_z.push("sleep(" + (ti_d - 100) + ");\npress(" + xx + "," + yy + ",20);")
                    press(xx, yy, 20)
                    otim = new Date().getTime();
                    window.setSize(-1, -1)
                });
            }
            return true;
    }
    return true;
});

function onClick() {
    if (window.action.getText() == '开始') {
        window.action.setText('停止');
    } else {
        if (execution) {}
        window.action.setText('开始');
    }
}

function sswr(a, b, d) {
   let c_o = a * (Math.pow(10, d));
    for (let i = d; i >= b; i--) {
        c_o = Math.round(c_o)
        c_o = (c_o / 10);
    };
    return (c_o / (Math.pow(10, b - 1))).toFixed(b);
};





//