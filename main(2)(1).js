//var src = "file://./zm.png";
var img = images.read("./zm.png");
var w = img.getWidth();
var h = img.getHeight();
var width = device.width;
var height = device.height;
log("width:" + width * 0.8);
log("height:" + height * 0.8);


importClass('java.io.BufferedReader');
importClass('java.io.IOException');
importClass('java.io.InputStream');
importClass('java.io.InputStreamReader');
importClass('java.io.OutputStream');
importClass('java.io.PrintWriter');
importClass('java.net.Socket');
importClass('java.net.ServerSocket');

var SERVERIP = "192.168.1.10";
files.createWithDirs("/sdcard/clip/")
var socket = new Socket(SERVERIP,62701);
//var serversocket=new ServerSocket(9999);
log('服务端已经启动,正在等待客户端连接...');
//var socket = serversocket.accept();
var inputStream = socket.getInputStream();
var inputStreamReader = new InputStreamReader(inputStream);
var bufferedReader = new BufferedReader(inputStreamReader);
var outputStream = socket.getOutputStream();
var printWriter = new PrintWriter(outputStream);

//printWriter.println("//服务器已连接");
//printWriter.flush();
p("//服务器已连接");
p("setScreenMetrics(" + width * 0.8 + "," + height * 0.8 + ")");


var window = floaty.rawWindow(
    <frame>
        <horizontal>
            <button h="40" layout_weight="1" text="▂" id="reduce"/>
            <button h="40" layout_weight="1" text="⇩" id="notif"/>
            <text marqueeRepeatLimit="marquee_forever" ellipsize="marquee" h="40" layout_weight="1" text="手机控制端" textColor="red" id="text"/>
            <button h="40" layout_weight="1" text="⊙" id="power"/>
            <button h="40" layout_weight="1" layout_gravity="right" text="✘" id="closes"/>
        </horizontal>
        <horizontal marginTop="40" marginBottom="40">
            <img id="auto"/>
        </horizontal>
        <horizontal id="menu" gravity="bottom">
            <button layout_weight="1" h="40" id="recent" text="□"/>
            <button layout_weight="1" h="40" id="home" text="◎"/>
            <button layout_weight="1" h="40" id="back" text="⊃"/>
            <button layout_weight="0.8" h="40" id="xxx" text="x"/>
        </horizontal>
        
    </frame>
);
window.setSize(width * 0.7, height * 0.7)
window.setPosition(width * 0.1, height * 0.1);

setInterval(() => {}, 1000);

var wm = (device.width * 0.7 - img.getWidth() / (img.getHeight() / (device.height * 0.7 - 80))) / 2
log("wm:" + wm);

ui.run(function() {
    window.text.setHorizontallyScrolling(true);
    window.text.setSelected(true);
});

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

window.auto.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:

            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if (new Date().getTime() - downTime > 1200 && Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                //长按
                longClick(x, y, new Date().getTime() - downTime);
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 8 && Math.abs(event.getRawX() - x) < 8 && new Date().getTime() - downTime < 1200) {
                //点击
                onClick(event.getX(), event.getY());
            } else {
                move(x, y, event.getRawX(), event.getRawY());
            }
            return true;
    }
    return true;
});

window.auto.post(function() {
    ui.run(function() {
        log(window.auto.getMeasuredWidth());
        log(window.auto.getMeasuredHeight());
    })
});


//layout = (MetroLayout) findViewById(R.id.layout); 
vto = window.auto.getViewTreeObserver();
var hasMeasured = false;
vto.addOnPreDrawListener(new android.view.ViewTreeObserver.OnPreDrawListener({
    onPreDraw: function() {
        if (hasMeasured == false) {
            height1 = window.auto.getMeasuredHeight();
            width1 = window.auto.getMeasuredWidth();
            //获取到宽度和高度后，可用于计算 
            log("height::" + height1);
            log("width::" + width1);
            hasMeasured = true;

        }
        return true;
    }
}));

threads.start(function() {
    var temp = null;
    while (true) {
        temp=bufferedReader.readLine()
        if(temp!=null){
            toastLog("接收图片");
            var img=images.fromBase64(temp)
         //   var name=random(0,888888888888888888);
            ui.run(function(){
                window.auto.setSource(img);
            });
            //images.save(img,"/sdcard/clip/"+name+".jpg");
        }
    }
});

function onClick(x, y) {
    windowX = window.getX();
    windowY = window.getY();

    toastLog("悬浮窗坐标:" + windowX + ":" + windowY);
    if (x > wm) {
        x = x - wm;
        toastLog("点击了:" + x + ":" + y)
        p("click(" + x + "," + y + ");")
    }
}

function longClick(x, y, time) {
    toastLog("长按无效")
}

function move(x, y, x1, y1) {
    toastLog("滑动无效");
}

window.reduce.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();

            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));

            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                if (window.reduce.text() == "▂") {
                    window.reduce.setText("◇");
                    window.notif.setVisibility(8);
                    window.text.setVisibility(8);
                    window.power.setVisibility(8);
                    window.closes.setVisibility(8);
                    window.auto.setVisibility(8);
                    window.menu.setVisibility(8);
                    window.setSize(150, 100);
                } else {
                    window.reduce.setText("▂");
                    window.notif.setVisibility(0);
                    window.text.setVisibility(0);
                    window.power.setVisibility(0);
                    window.closes.setVisibility(0);
                    window.auto.setVisibility(0);
                    window.menu.setVisibility(0);
                    window.setSize(width * 0.8, height * 0.8)
                    window.setPosition(width * 0.1, height * 0.1);
                }
            }
            return true;
    }
    return true;
});


window.closes.click(function() {

    //socket.shutdownOutput();
    printWriter.close();
    outputStream.close();
    bufferedReader.close();
    inputStream.close();
    //serversocket.close();

    toast("退出");
    window.close();
    exit();
});

window.notif.click(function() {
    //notifications();
});

window.power.click(function() {

});

window.recent.click(() => {
    p("recents();");
});
window.home.click(() => {
    p("home();")

});
window.back.click(() => {
    p("back();")
});
window.xxx.click(() => {
    p("x")
});


function p(str) {
    threads.start(function() {
        printWriter.println(str);
        printWriter.flush();
    });
}