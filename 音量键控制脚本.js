//本脚本设置的是利用音量减控制脚本运行
function 脚本内容() {

    //这里写需要控制的脚本内容
    toast("试验一下");
    sleep(5000);

}

try {
    auto.waitFor();
    var volume_up_state = false,
        volume_down_state = false,
        q = "",
        t = 脚本内容获取();
    setInterval(() => {}, 10000);
    events.setKeyInterceptionEnabled("volume_down", true);
    events.observeKey();
    events.on("key", function(k, e) {
        let ek = k * 10 + e.getAction();
        switch (ek) {
            case 30:
                log("menu down");
                break

            case 31:
                log("menu up");
                break

            case 40:
                log("back down");
                break

            case 41:
                log("back up");
                break

            case 240:
                //    log("volume_up down");
                volume_up_state = true;
                event.emit("touchable");
                break

            case 241:
                //    log("volume_up up");
                volume_up_state = false;
                break

            case 250:
                //    log("volume_down down");
                volume_down_state = true;
                event.emit("touchable");
                break

            case 251:
                //    log("volume_down up");
                volume_down_state = false;
                break

            case 820:
                log("menu down");
                break

            case 821:
                log("menu up");
                break
        }
        ek = 0;
    });

    var event = events.emitter();
    event.on("touchable", function() {
        if (volume_down_state) {
            //这里用 volume_down_state 就是 用音量减 按下触发。
            //用 volume_up_state 就是用音量加按下触发，
            //用 volume_down_state && volume_up_state 就是用  音量键 都按下触发，
            //用 volume_down_state || volume_up_state 就是用 任意音量键 按下触发
            var all = engines.all();
            all = all.toString();
            all = all.split("1334435449脚本程序");
            if(all.length > 1){
                q.getEngine().forceStop();
                toast("已经停止脚本"); 
            } else {
               q = engines.execScript("1334435449脚本程序", t);
                toast("已经启动脚本");
            }
        }
    });
} catch (e) {
    log(e);
}

function 脚本内容获取() {
    let t = 脚本内容.toString(),
        s = t.indexOf("{"),
        e = t.lastIndexOf("}");
    return t.substring(s + 1, e);
}