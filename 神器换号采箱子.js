var window = floaty.window(
    <vertical>
        <linear>
            <text id="action" text="采" w="40" h="40" color="#ffffff"  margin="0" bg="#99000000"/>
            <text id="tui" text="退" w="40" h="40" color="#ffffff"  margin="0 0 0 1" bg="#99000000"/>
        </linear>
        <linear  margin="1 0 0 0" bg="#99000000">
            <text id="hao" w="81" h="40" size="6sp" text="..." color="#ffffff"/>
        </linear>
    </vertical>

);
path="/storage/emulated/0/Screenshot/huanhao.txt";
if(files.createWithDirs(path)){files.write(path,"1:0");}else{}
haoksi=files.read(path);
xxxxx=haoksi.split(":");
hao =parseInt(xxxxx[0]); //从第hao个号开始登录刷
ksi=parseInt(xxxxx[1]);//从第ksi个角色登陆

var execution = null;

//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
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
            //移动手指时调整悬浮窗位置

            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));

            // if(xs==1){ 
            //   window2.setPosition(windowX + (event.getRawX() - x),
            //    windowY + (event.getRawY() - y)+82);
            // }
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                if ((new Date().getTime()) - downTime > 500) {
                    threads.start(function() {
                        //  exit();
                    });
                } else {

                    onClick();

                }
            }

            return true;
    }
    return true;
});
window.tui.on("touch_down", () => {
    threads.start(function() {
        exit();
    });
});


function qlhh(bm) {
    home();
    while (true) {
        sleep(100);
        zma = id("k6").find();
        if (zma.empty()) {
            log("没找到");
        } else {
            log("找到了");
            break;
        }
    }
    recents();
    var qlan = bounds(312, 1259, 408, 1370).findOne();
    toast("清理");
    sleep(500);
    qlan.click();
    console.show();
    console.setPosition(100, 800);
    var 登录地址 = "http://192.168.31.1/cgi-bin/luci/api/xqsystem/login";
    var stok = http.post(登录地址, {
        "username": "admin",
        "password": "937531217"
    }).body.json().token;

    function unlink() {
        var url = "http://192.168.31.1/cgi-bin/luci/;stok=" + stok + "/api/xqnetwork/pppoe_stop";
        var a = http.get(url);
    }

    function link() {
        var url = "http://192.168.31.1/cgi-bin/luci/;stok=" + stok + "/api/xqnetwork/pppoe_start";
        var a = http.get(url).body.string();
    }

    function xx() {
        var url = "http://192.168.31.1/cgi-bin/luci/;stok=" + stok + "/api/xqnetwork/pppoe_status";
        var a = http.get(url).body.json();
        return a.ip.address;
    }
    log(xx());
    unlink();
    log("重联中");
    link();
    while (true) {
        sleep(100);
        zma = id("k6").find();
        if (zma.empty()) {
            log("没找到");
        } else {
            zma[0].child(3).child(bm).click();
            log("找到了");
            break;
        }
    }
    while (true) {
        if (xx() == "") {
            sleep(100);
        } else {
            break;
        }
    }
    log(xx());
    sleep(1000);
    console.hide();
    while (true) {
        tu = jt();
        xs(colors.toString(tu.pixel(697, 389)));
        if (colors.toString(tu.pixel(697, 389)) == "#ff8db800") { //到了登录界面
            press(802, 387, 10);
            break;
        }
    } //登陆账号按钮
    while (true) {
        tu = jt();
        xs(colors.toString(tu.pixel(575, 538)) + "  " + colors.toString(tu.pixel(1206, 315)) + "\n" + colors.toString(tu.pixel(1186, 623)));
        if (colors.toString(tu.pixel(575, 538)) == "#ff8db800") { //到了登录界面
            press(939, 166, 10);
        } //绑定手机跳过
        if (colors.toString(tu.pixel(1206, 315)) == "#ff3c617b") { //到了登录界面
            press(1150, 133, 10);
        } //公告跳过
        if (colors.toString(tu.pixel(1206, 315)) == "#fff0d5c0") { //到了登录界面
            press(712, 556, 10);
        } //开始游戏按钮
        if (colors.toString(tu.pixel(1186, 623)) == "#fff1d87d") { //到了登录界面
            break;
        } //已经进入区服

    } //进入区服


}

function qlhh2(bm) {
    home();
    while (true) {
        sleep(100);
        zma = id("k6").find();
        if (zma.empty()) {
            log("没找到");
        } else {
            log("找到了");
            break;
        }
    }
    recents();
    var qlan = bounds(312, 1259, 408, 1370).findOne();
    toast("清理");
    sleep(500);
    qlan.click();
    console.show();
    console.setPosition(100, 800);
    var 登录地址 = "http://192.168.31.1/cgi-bin/luci/api/xqsystem/login";
    var stok = http.post(登录地址, {
        "username": "admin",
        "password": "937531217"
    }).body.json().token;

    function unlink() {
        var url = "http://192.168.31.1/cgi-bin/luci/;stok=" + stok + "/api/xqnetwork/pppoe_stop";
        var a = http.get(url);
    }

    function link() {
        var url = "http://192.168.31.1/cgi-bin/luci/;stok=" + stok + "/api/xqnetwork/pppoe_start";
        var a = http.get(url).body.string();
    }

    function xx() {
        var url = "http://192.168.31.1/cgi-bin/luci/;stok=" + stok + "/api/xqnetwork/pppoe_status";
        var a = http.get(url).body.json();
        return a.ip.address;
    }
    log(xx());
    //unlink();log("重联中");link();
    while (true) {
        sleep(100);
        zma = id("k6").find();
        if (zma.empty()) {
            log("没找到");
        } else {
            zma[0].child(3).child(bm).click();
            log("找到了");
            break;
        }
    }
    while (true) {
        if (xx() == "") {
            sleep(100);
        } else {
            break;
        }
    }
    log(xx());
    sleep(1000);
    console.hide();
    while (true) {
        tu = jt();
        xs(colors.toString(tu.pixel(697, 389)));
        if (colors.toString(tu.pixel(697, 389)) == "#ff8db800") { //到了登录界面
            press(802, 387, 10);
            break;
        }
    } //登陆账号按钮
    while (true) {
        tu = jt();
        xs(colors.toString(tu.pixel(575, 538)) + "  " + colors.toString(tu.pixel(1206, 315)) + "\n" + colors.toString(tu.pixel(1186, 623)));
        if (colors.toString(tu.pixel(575, 538)) == "#ff8db800") { //到了登录界面
            press(939, 166, 10);
        } //绑定手机跳过
        if (colors.toString(tu.pixel(1206, 315)) == "#ff3c617b") { //到了登录界面
            press(1150, 133, 10);
        } //公告跳过
        if (colors.toString(tu.pixel(1206, 315)) == "#fff0d5c0") { //到了登录界面
            press(712, 556, 10);
        } //开始游戏按钮
        if (colors.toString(tu.pixel(1186, 623)) == "#fff1d87d") { //到了登录界面
            break;
        } //已经进入区服

    } //进入区服


}

function xs(str) {
    ui.run(function() {
        window.hao.text(str + "");
    });
}

requestScreenCapture(true);

pms0=0;pms1=1;
pmt0=0;pmt1=1;

jsjn=-1;
jst0=0;jst1=1;

ccck2=0;

function jt() {
ccck2=0;//有过截图
    while (true) {
        if (tu = captureScreen()) {
            
            pms1=tu.pixel(720,360);
            pmt1=new Date().getTime();
            if(pms0==pms1){//屏幕没变
                }else{//屏幕变了
                    pms0=pms1;
                    pmt0=pmt1;
                    }
            
            return tu;
            break;
        }
    }
}

function jsjj(){
 if(ksi<2){ksi++;}else{ksi=0;
 if(hao<10){hao++;}else{hao=1;}
 }  

}

xzx=[856,977,858,722];
xzy=[260,322,385,322];
xzn=0;
function csj() {
wkz=0;
    while (wkz==0) {
        for(xzi=xzn;xzi<4;xzi++){
        tu = jt();
        if (colors.toString(tu.pixel(162, 394)) == "#fff0dfae" || colors.toString(tu.pixel(162, 394)) == "#ffeddcab") {} else {
            wkz=1;xzi=4;
        } //光明金顶内部
        if(wkz==0){
        xdt(xzx[xzi],xzy[xzi], 5000); //第i个水晶位置
        xzn++;}
        }
        xzn=0;
    }

    function xdt(xdtx, xdty, xdts) {
        press(1400, 204, 10); //展开
        sleep(1000);
        press(1346, 67, 10); //小地图
        sleep(800);
        swipe(504, 141, 1036, 499, 10); //固定地图
        sleep(500);
        press(xdtx, xdty, 10); //第一个水晶位置
        sleep(100);
        press(1305, 63, 10); //关闭小地图
        sleep(xdts);
        press(732, 415, 10);
        sleep(10);
        press(732, 415, 10);
        sleep(17000); //采箱子用时
    }
} //采神器

juese = [176, 344, 530];

function onClick() {
    if (window.action.text() == "采") {
        threads.start(function() {
            ui.run(function() {
                window.action.text("■");
            });
            while (true) {
               
                qlhh(hao);
                sleep(1000);
                for (i = ksi; i < 3; i++) {
        
                    press(246, juese[i], 10);
                    press(1238, 624, 10);

                    while (true) {
                        tu = jt();
                        xs(colors.toString(tu.pixel(1359, 629)) + "游戏界面  " + colors.toString(tu.pixel(940, 34)));
                        if (colors.toString(tu.pixel(1359, 629)) == "#ff95a6b7") {
                            break;
                        } //到了游戏界面

                    }
                    sleep(10000);
                    press(854, 547, 10);
                    sleep(500);
                    while (true) {
                        tu = jt();
                        xs(colors.toString(tu.pixel(940, 34))+"bos图标");
                        if (colors.toString(tu.pixel(940, 34)) == "#ffffffff") {
                            break;
                        } //bos图标已出现

                    }
                    ccs = 0;
                    for (ccs = 0; ccs < 2; ccs++) {
                        press(946, 42, 10); //bos图标
                        sleep(1000);
                        press(1197, 543, 10); //光明顶
                        sleep(500);
                        press(1032, 641, 10); //进入
                        sleep(500);
                        press(714, 485, 10); //确定进入
                        t1 = new Date().getTime();
                        while (true) {
                            if (new Date().getTime() - t1 > 10000) {
                                ccs = 2;
                                break;
                            }
                            tu = jt();
                            xs(colors.toString(tu.pixel(162, 394)));
                            if (colors.toString(tu.pixel(162, 394)) == "#fff0dfae" || colors.toString(tu.pixel(162, 394)) == "#ffeddcab") {
                                break;
                            } //光明金顶内部

                        }
                        if (ccs != 2) {
                            csj();
                        }
                    }
                    if (i < 2) {
                        qlhh2(hao);
                    }
                    ksi++;
                    files.write(path,hao+":"+ksi);
                
                }
                ksi=0;
                if (hao < 10) {
                    hao++;
                } else {
                    hao = 1;
                }
                //break;
            }
            ui.run(function() {
                window.action.text("采");
            });
        });
    } else {
        threads.shutDownAll();
        ui.run(function() {
            window.action.text("采");
        });
    }
}


while (true) {
    
sleep(1000);ccck2++;
    
if(ccck2>100){//100秒没有截图
ccck2=0;onClick();sleep(1000);onClick();//重启功能 旧号重启
}

if(pmt1-pmt0>100000){//屏幕100秒不动
pmt0=pmt1;jsjj();onClick();sleep(1000);onClick();//重启功能
}

if(jst1-jst0>1200000){//20分钟不换号和角色
jst0=jst1;jsjj();onClick();sleep(1000);onClick();//重启功能
}


if(jsjn==ksi){//角色没变
jst1=new Date().getTime();
}else{//角色变了
   jst0=new Date().getTime();
   jst1=jst0;
   jsjn=ksi;
}

    xs("没截图"+ccck2+"屏幕不动"+(pmt1-pmt0)+"不换角色"+(jst1-jst0));
    
}






