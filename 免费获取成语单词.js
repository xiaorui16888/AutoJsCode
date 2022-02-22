/*
 *     Author:TimeOut
 *     Date: 2019.8.15
 *     Script: 免费获取成语单词
 */

var w = floaty.window(
    <frame>
        <card>
            <vertical>
                <appbar bg="#2894FF" h="40" id="appbar">
                    <linear>
                        <input id="name" layout_weight="1"/>
                        <button id="scan" w="50" h="30" textSize="8" text="查询"/>
                    </linear>
                    
                </appbar>
                <list id="list" h="100" w="200">
                    <linear margin="5 0" w="*">
                        <text layout_weight="1" text="{{name}}"/>
                        <button h="35" w="50" textSize="10" text="发送" id="ok"/>
                    </linear>
                </list>
            </vertical>
        </card>
    </frame>);
setInterval(() => {}, 3000);
w.exitOnClose();
//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
ui.run(() => {
    w.appbar.setOnTouchListener(function(view, event) {
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
                    windowY + (event.getRawY() - y));
                return true;
            case event.ACTION_UP:
                // onchange();
                //手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    //如果按下的时间超过0.2秒判断为长按，退出脚本
                    if (new Date().getTime() - downTime < 200) {
                        w.close();
                    }
                }
                return true;
        }
        return true;
    });
});
var dd = [];
ui.run(() => {
    w.list.setDataSource(dd);
});
w.name.on("touch_down", () => {
    w.requestFocus();
    w.name.requestFocus();

});
w.scan.click(() => {
        w.disableFocus();
    log(w.name.text());
    if (w.name.text()=="") {
        toastLog("内容为空")
    } else {
        dd.splice(0,dd.length);
        threads.start(main);
    }
})

w.list.on("item_bind", function(itemView, itemHolder) {
    //绑定按钮事件
    itemView.ok.on("click", function(v) {
        
        
    });
});
w.list.on("item_click", function(e, item, i, itemView, listView) {
    threads.start(function(){
        id("input").findOne().setText(dd[item].name);
        sleep(200);
        click("发送");
        });
});
function main() {
    //成语开头单词
    let name = w.name.text();
    let p = 0;
    let dataSource = [];
    while (1) {
        let data = getDate(name, p);
        p++;
        let d = data.match(/>\S{4}<\/a>/g);
        try {
            for (let i = 0; i < d.length; i++) {
                let n = d[i].split(">")[1].split("<")[0];
                if (dataSource.indexOf(n) == -1) {
                    dataSource.push(n);
                }
            }
        } catch (e) {}
        if (d == null) break;
    }

    log("获取结果", dataSource);
    log("获取", name, "成语个数 :" + dataSource.length)
    for (i in dataSource) {
        dd.push({
            name: dataSource[i]
        })
    }
}


function getDate(name, p) {
    var temp = http.get("http://m.t086.com/index.php?c=chengyu&m=chaxun&q=" + encodeURI(name) + "&t=ChengYu&&inajax=1&p=" + p, {
        "headers": {
            "Host": "m.t086.com",
            "Connection": "keep-alive",
            "Accept": "*/*",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Dalvik/2.1.0 (Linux; U; Android " + device.release + "; " + device.model + " Build/" + device.buildId + ")",
            "Referer": "http://m.t086.com/index.php?c=chengyu&m=chaxun&q=" + encodeURI(name),
            "Accept-Language": "zh-CN,en-US;q=0.9",
        }
    }).body.string();
    return temp;
}