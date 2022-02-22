"ui";

ui.layout(
    <frame>
        <vertical>
            <appbar>
                <toolbar id="toolbar" title="抖音引流" />
            </appbar>
            <ScrollView>
                <frame>
                    <vertical padding="15 5 15 0">
                        <vertical>
                            <Switch id="autoService" text="无障碍服务" checked="{{auto.service != null}}" padding="8 8 8 8" textSize="15sp" textSize="18sp"/>
                            
                            <linear>
                                <text text="开启功能:" textStyle="bold" textSize="18">
                                </text>
                            </linear>
                            <horizontal>
                                <radiogroup w="*" marginLeft="60px"id="name1" orientation="horizontal">
                                    <radio text="关键词搜索"checked="true"size="50px"/>
                                    <radio text="指定区域作品"checked="false"size="50px"/>
                                </radiogroup>
                            </horizontal>
                            <horizontal>
                                <checkbox id="name2" text="缓存清理"/>
                                <checkbox id="name3" text="多开运行"/>
                            </horizontal>
                        </vertical>
                        <horizontal>
                            <horizontal layout_weight="1">
                                <text text="区域：" textStyle="bold" textSize="18"/>
                                <input w="100" id="name4" maxLength="5" singleLine="true" hint="北京"/>
                            </horizontal>
                            <horizontal layout_weight="1">
                                <text text="行业："/>
                                <input w="100" id="name5" maxLength="5" singleLine="true" hint="化妆品"/>
                            </horizontal>
                        </horizontal>
                        
                        <vertical>
                            <text text="任务：" textStyle="bold" textSize="18"/>
                            <horizontal>
                                <checkbox id="name6" text="点赞"/>
                                <input id="name7" hint="点赞次数" inputType="number" maxLength="3" layout_weight="1"/>
                                <text text="延迟："/>
                                <input id="name8" hint="点赞延迟/秒" inputType="number" maxLength="3" layout_weight="1"/>
                            </horizontal>
                            
                            <horizontal>
                                <checkbox id="name9"  text="评论"/>
                                <input id="name10" hint="评论次数" inputType="number" maxLength="3" layout_weight="1"/>
                                <text text="延迟："/>
                                <input id="name11" hint="评论延迟/秒" inputType="number" maxLength="3" layout_weight="1"/>
                            </horizontal>
                            
                            <horizontal>
                                <checkbox id="name12"  text="关注"/>
                                <input id="name13" hint="关注次数" inputType="number" maxLength="3" layout_weight="1"/>
                                <text text="延迟："/>
                                <input id="name14" hint="关注延迟/秒" inputType="number" maxLength="3" layout_weight="1"/>
                            </horizontal>
                            
                            <horizontal>
                                <checkbox id="name15" text="私信"/>
                                <input id="name16" hint="私信次数" inputType="number" maxLength="3" layout_weight="1"/>
                                <text text="延迟："/>
                                <input id="name17" hint="私信延迟/秒" inputType="number" maxLength="3" layout_weight="1"/>
                            </horizontal>
                        </vertical>
                        
                        <vertical>
                            <text text="对象：" textStyle="bold" textSize="18"/>
                            <radiogroup w="*" marginLeft="60px"id="name18" >
                                <radio text="全部"checked="true"size="50px"/>
                                <input id="name19" w="*" singleLine="true" hint="输入通用话术，中间用|分开"/>
                                <radio text="自定义"checked="false"size="50px"/>
                            </radiogroup>
                            <horizontal>
                                <checkbox id="name20"  text="男粉话术"/>
                                <input id="name21" w="*" singleLine="true" hint="输入男粉话术，中间用|分开"/>
                            </horizontal>
                            
                            <horizontal>
                                <checkbox id="name22"  text="女粉话术"/>
                                <input id="name23" w="*" singleLine="true" hint="输入女粉话术，中间用|分开"/>
                            </horizontal>
                            
                            <horizontal>
                                <checkbox id="name24"  text="无性别话术"/>
                                <input id="name25" w="*" singleLine="true" hint="输入无性别粉话术，中间用|分开"/>
                            </horizontal>
                            <horizontal>
                                <checkbox id="name26"  text="其他话术"/>
                                <input id="name27" w="*" singleLine="true" hint="输入其他话术，中间用|分开"/>
                            </horizontal>
                            
                        </vertical>
                        
                        <horizontal>
                            <text text="私信发送方案：" textStyle="bold" textSize="18"/>
                            <radiogroup w="*" id="name28" orientation="horizontal">
                                <radio text="随机发"/>
                                <radio text="连发"/>
                            </radiogroup>
                        </horizontal>
                        
                        <horizontal>
                            <text text="添加随机字母：" textStyle="bold" textSize="18"/>
                            <input id="name29" hint="插入几个" inputType="number" maxLength="6"/>
                            <checkbox id="name30" text="前面"/>
                            <checkbox id="name31" text="后面"/>
                        </horizontal>
                        <horizontal layout_weight="1">
                            <text text="多开设置：" textStyle="bold" textSize="18"/>
                            <text  text="从"/>
                            <input id="name32" w="40" inputType="number" maxLength="3"/>
                            <text  text="到"/>
                            <input id="name33" w="40" inputType="number" maxLength="3"/>
                        </horizontal>
                        <text text="注意：多开分身的生成的名字必须用阿拉伯数字" marginBottom="30"/>
                    </vertical>
                </frame>
            </ScrollView>
        </vertical>
        <fab id="start" w="auto" h="auto" src="@drawable/ic_play_arrow_black_48dp"
        margin="16" layout_gravity="bottom|right" tint="#ffffff" />
    </frame>
);
var isRun1 = false, //ui启动开关
    isRun2 = false; //悬浮窗启动开关


//暂停图标  ic_pause_black_48dp
//开始图标  ic_play_arrow_black_48dp

let Parameter_group = Array(
    {
        name1: 0, //0为关键词搜索 1为指定区域作品
        name2: false, //关闭或开启缓存清理
        name3: false //关闭或开启多开运行
    },{
        area: "北京",
        industry: "化妆品"
    },{
        name1: {no_off: false, number: 0, sleep: 1000}, //关闭或开启点赞，点赞个数，点赞延迟（单位毫秒）
        name2: {no_off: false, number: 0, sleep: 1000}, //关闭或开启评论，评论次数，评论延迟（单位毫秒）
        name3: {no_off: false, number: 0, sleep: 1000}, //关闭或开启关注，关注个数，关注延迟（单位毫秒）
        name4: {no_off: false, number: 0, sleep: 1000} //关闭或开启私信，私信个数，私信延迟（单位毫秒）
    },{
        name: 0, //0为全部 1为自定义
        all: {no_off: false, text: []}, //全部的话术用数组存放
        male: {no_off: false, text: []}, //男性的话术用数组存放
        female: {no_off: false, text: []}, //女性的话术用数组存放
        no_gender: {no_off: false, text: []}, //无性别的话术用数组存放
        Other: {no_off: false, text: []} //其他的话术用数组存放
    },{
        name1: 0, //0为随机发送 1为连发
        name2: {Number: 0, Front: false, after: false}, //number为插入几个字母  front为开启或关闭前面  after为开启或关闭后面
        name3: {begin: "", End: ""} //从start到end
    }
);
//缓存清理 true false
ui.name2.on("check", (checked) => {
    Parameter_group[0].name2 = checked;
});
//多开运行 true false
ui.name3.on("check", (checked) => {
    Parameter_group[0].name3 = checked;
});
//点赞 true false
ui.name6.on("check", (checked) => {
    Parameter_group[2].name1.no_off = checked;
});
//评论 true false
ui.name9.on("check", (checked) => {
    Parameter_group[2].name2.no_off = checked;
});
//关注 true false
ui.name12.on("check", (checked) => {
    Parameter_group[2].name3.no_off = checked;
});
//私信 true false
ui.name15.on("check", (checked) => {
    Parameter_group[2].name4.no_off = checked;
});

//男粉 true false
ui.name20.on("check", (checked) => {
    Parameter_group[3].male.no_off = checked;
    Parameter_group[3].male.text = ui.name21.text().split("|");
    log(Parameter_group[3].male.no_off + "/" + Parameter_group[3].male.text);
});
//女粉 true false
ui.name22.on("check", (checked) => {
    Parameter_group[3].female.no_off = checked;
    Parameter_group[3].female.text = ui.name23.text().split("|");
    log(Parameter_group[3].female.no_off + "/" + Parameter_group[3].female.text);
});
//无性别 true false
ui.name24.on("check", (checked) => {
    Parameter_group[3].no_gender.no_off = checked;
    Parameter_group[3].no_gender.text = ui.name25.text().split("|");
    log(Parameter_group[3].no_gender.no_off + "/" + Parameter_group[3].no_gender.text);
});
//其他话术 true false
ui.name26.on("check", (checked) => {
    Parameter_group[3].Other.no_off = checked;
    Parameter_group[3].Other.text = ui.name27.text().split("|");
    log(Parameter_group[3].Other.no_off + "/" + Parameter_group[3].Other.text)
});

//前面 true false
ui.name30.on("check", (checked) => {
    Parameter_group[4].name2.Front = checked;
});
//后面 true false
ui.name31.on("check", (checked) => {
    Parameter_group[4].name2.after = checked;
});
ui.autoService.on("check", function(checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function() {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

ui.start.click(() => {
    if (auto.service == null) {
        toast("请先开启无障碍服务！");
        return;
    }
    初始化参数();//初始化参数
    start(); //打开悬浮窗
   
});

function 初始化参数(){
    Parameter_group[0].name1 = selectedIndex(ui.name1);//任务 返回选择的是第几个 
    Parameter_group[1].area = ui.name4.text();//区域
    Parameter_group[1].industry = ui.name5.text();//关键词

    Parameter_group[2].name1.number = ui.name7.text();////点赞次数
    Parameter_group[2].name1.sleep = ui.name8.text();//点赞延迟
    Parameter_group[2].name2.number = ui.name10.text();//评论次数
    Parameter_group[2].name2.sleep = ui.name11.text();//评论时间
    Parameter_group[2].name3.number = ui.name13.text();//关注次数
    Parameter_group[2].name3.sleep = ui.name14.text();//关注延迟
    Parameter_group[2].name4.number = ui.name16.text();//私信次数
    Parameter_group[2].name4.sleep = ui.name17.text();//私信延迟

    Parameter_group[3].name = selectedIndex(ui.name18);//返回选择的是第几个 话术  自定义
    if(Parameter_group[3].name == 0){
        Parameter_group[3].male.no_off = true;
        Parameter_group[3].male.text = ui.name19.text().split("|");//通用话术
        log(Parameter_group[3].male.no_off + "/" + Parameter_group[3].male.text);
    }

    Parameter_group[4].name1 = selectedIndex(ui.name28);//返回选择的是第几个 私信发送方案
    Parameter_group[4].name2.Number = ui.name29.text();//随机字母个数
    Parameter_group[4].name3.begin = ui.name32.text();//多开起
    Parameter_group[4].name3.End = ui.name33.text();//多开终点

    log(Parameter_group);
}


///
function main() { //
    toastLog("流程控制");
};

function stop() {
    if (isRun1) {
        isRun1.interrupt();
        threads.shutDownAll();
        setTimeout(function() {
            if (isRun1.isAlive()) {
                toast("停止失败");
                return;
            }
            floaty.closeAll();
            toast("已停止");
            isRun1 = false;
            ui.run(function() {
                ui.start.attr("src", "@drawable/ic_play_arrow_black_48dp");
            });
        }, 300);
    }
}

function start() {
    if (isRun1) {
        stop();
        return;
    }
    isRun1 = threads.start(floa); //打开悬浮窗
    ui.run(function() {
        ui.start.attr("src", "@drawable/ic_pause_black_48dp");
    });
}

//返回radio控件第几个被选择
function selectedIndex(rg) {  
    let id = rg.getCheckedRadioButtonId();  
    for (let i = 0; i < rg.getChildCount(); i++) {    
        if (id == rg.getChildAt(i).getId()) {      
            return i;    
        }  
    }  
    return -1;
}


function floa() {
    var window = floaty.window(
        <frame>
            <linear>
                <button id="action" text="开始" w="40" h="40" color="#ffffff" bg="#66000000" />
                </linear> </frame>
    );

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
                //如果按下的时间超过1.5秒判断为长按，退出脚本
                if (new Date().getTime() - downTime > 1500) {
                    exit();
                }
                return true;
            case event.ACTION_UP:
                //手指弹起时如果偏移很小则判断为点击
                if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
                    if (!isRun2) {
                        toast("开始运行");
                        str2(); //
                    } else {
                        sto2();
                        toast("停止");
                    }
                }
                return true;
        }
        return true;
    });

    function sto2() {
        if (isRun2) {
            isRun2.interrupt();
            threads.shutDownAll();
            setTimeout(function() {
                if (isRun2.isAlive()) {
                    toast("停止失败");
                    return;
                }
                toast("已停止");
                floaty.closeAll();
                isRun2 = false;
                ui.run(function() {
                    window.action.setText("开始");
                });
            }, 300);
        }
    }

    function str2() {
        if (isRun2) {
            sto2();
            return;
        }
        isRun2 = threads.start(main); ///开始运行函数
        ui.run(function() {
            window.action.setText("停止");
        });
    }
}


function Go(){
    switch(Parameter_group[0].name1){//判断
        case 0: //关键词搜索
            关键字搜索(Parameter_group[1].area);
            break;
        case 1: //指定区域作品
            切换(Parameter_group[1].area);
            //附近作品浏览()
            break;
    }
}
function 关键字搜索(t) {
    function 搜索() {
        let b = className("android.widget.Button").desc("搜索").findOne(1000);
        if (b) {
            b.click();
            log("ok");
            return true;
        }
    }
    function 关键词(t) {
        let e = className("android.widget.EditText").findOne(1000);
        if (e) {
            let b = e.bounds();
            click(b.centerX(), b.centerY());
            sleep(1200);
            e.setText(t);
            log("输入: " + t);
            return true;
        }
    }
    function 搜索2() {
        let tb = className("android.widget.TextView").text("搜索").findOne(1000);
        if (tb) {
            let b = tb.bounds();
            click(b.centerX(), b.centerY());
            return true;
        }
    }
    let s;
    do {
        s = 搜索();
        sleep(1000);
    } while (!s);
    do {
        s = 关键词(t);
        sleep(1000);
    } while (!s);
    搜索2();
}

function 切换(t) {
    let tv = className("android.widget.TextView").text("切换").findOne(1000);
    if (tv) {
        tv.click();
        sleep(1200);
        let tv2 = className("android.widget.TextView").text(t).findOne(1000);
        if (tv2) {
            tv2.parent().click();
            sleep(2000);
        } else {
            toast("没找到！请手动切换！！！");
        }
    }
}
//////////////////////附近附近附近附近///////////////////////////
//用于获取附近作品的列表，然后一一打开
function 附近作品浏览() {
    let list = className("android.support.v7.widget.RecyclerView").findOne(10000);
    if (list) {
        try {
            for (let i = 0; i < list.childCount(); i++) {
                if (list.child(i).className() != "android.widget.FrameLayout") {
                    let id = list.child(i).findOne(textMatches(/((电商)|(直播)|(游戏))/));
                    if (!id) {
                        list.child(i).click();
                        作品页面();
                    }
                }
            }
        } catch (e) {
            toastLog(e);
         }
    }
}


function 作品页面(){
    // 这个是在作品界面，首先打开评论
    // 然后判断点赞开关有没有开启
    //     是  先点赞，获取点赞数量
}