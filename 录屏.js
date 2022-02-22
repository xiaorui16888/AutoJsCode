
function xuanfuchuang() {
    w = floaty.window(
        <frame id="action" gravity="center" w="auto" h="auto" bg="#00999999">
        <vertical>
          <linear >
            <button id="yunxin" text="录屏" size="15" h="40" w="60"/>
            <button id="清晰度" text="高清" size="15" h="40" w="60"/>
            <input bg="#88ffffff" id="时间" text="10" textSize="15sp" focusable="true"h="40" w="40"/>
            <button id="tuichu" text="退出" size="15" h="40" w="60" />
            <button id="yidong" text="移动" size="15" h="40" w="55" />
   
          </linear>
                <text id="控制台" textSize="12sp" h="40" w="*"textColor="#ffff0000" margin="-1 0">第1局</text>
         </vertical>
    </frame>
    );

    //setInterval(() => {}, 1000);
    w.setPosition(50, 50)

    w.yunxin.click(() => {
        toast("开始录制屏幕");
        w.setSize(0, 0)
        状态 = 1
    });
    w.清晰度.click(() => {
        if (w.清晰度.text() == "高清") {
            w.清晰度.setText("标准");
            清晰度 = 5000000
        } else if (w.清晰度.text() == "标准") {
            w.清晰度.setText("流畅");
            清晰度 = 3000000
        } else {
            w.清晰度.setText("高清");
            清晰度 = 10000000
        }

    });
    w.时间.on("key", function(keyCode, event) {
        if (event.getAction() == event.ACTION_DOWN && keyCode == keys.back) {
            w.disableFocus();
            event.consumed = true;
        }
    });

    w.时间.on("touch_down", () => {
        w.requestFocus();
        w.时间.requestFocus();
    });
    w.tuichu.click(() => {
        toast("退出");
        状态 = 2
        // activity.finish();
        // w.close();
        //exit()
    });

    w.yidong.setOnTouchListener(function(view, event) {
        switch (event.getAction()) {
            case event.ACTION_DOWN:
                x = event.getRawX();
                y = event.getRawY();
                aw = w.getWidth();
                ah = w.getHeight();
                windowX = w.getX();
                windowY = w.getY();
                downTime = new Date().getTime();
                return true;
            case event.ACTION_MOVE:
                //移动手指时调整悬浮窗位置
                w.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y))
            case event.ACTION_UP:
        }
        return true;
    })
    悬浮窗 = []
    悬浮窗[0] = w.getWidth()
    悬浮窗[1] = w.getHeight()
}

xuanfuchuang()
log(悬浮窗)
内容 = ""
次数 = 0
时间 = 60
清晰度 = 8000000
var sh = new Shell(true);
//sh.exec("su");
sh.setCallback({
    onOutput: function(str) {
        log(str)
        内容 = str
        if (str.indexOf("sagit:/ #") > -1) {
            次数++
            if (次数 > 1) {
                toast("录屏完成")
                w.setSize(悬浮窗[0], 悬浮窗[1])
                //w.setSize(900, 600);
                次数 = 0
            }
        }
        ui.run(function() {
            w.控制台.setText(内容 + "");
        });
    }
})
状态 = 0
while (true) {
    if (状态 == 0) {
        sleep(200)
    } else if (状态 == 2) {
        sh.exit();
        //exit()
        break
    } else if (状态 == 1) {
        sleep(1000)
        时间 = w.时间.text()
        状态 = 0
        内容 = ""
        文件名 = new Date().toLocaleString().replace(/年|月|日/g, "-").replace("- GMT+08:00 ", "")
        代码 = "screenrecord --bit-rate " + 清晰度 + " --time-limit " + 时间 + " /sdcard/录屏/" + 文件名 + ".mp4"
        // log(文件名)
        sh.exec(代码);
    }
}