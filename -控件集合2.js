//"ui";
storage = storages.create("ABC");
//uiu.layout(
    var uiu = floaty.window(
    //var ui = floaty.ui(
     
    <frame background="#ffa1887f">
  
    <vertical padding="0" background="#fFA1887F" id="bj"  >
         
        <horizontal background="#55AACD6E">
            <vertical>
                <button id="bh"    w="60" h="40"  textSize="12sp" textStyle="bold" background="#7700ff0F">展开</button>
            </vertical>
        <radiogroup id="ab" >
            <radio id="a6" text=".find()"/>
            <radio id="a7" text=".findOne()"/>
            <radio id="a8" text=".waitFor()"/>
        </radiogroup>
        <radiogroup id="aa" >
            <radio id="a0" text=".click()"/>
            <radio id="a1" text=".getText()"/>
            <radio id="a2" text=".scrollForward()"/>
            <radio id="a3" text=".scrollBackward()"/>
            <radio id="a4" text=".bounds()"/>
            <radio id="a5" text=".desc()"/>
        </radiogroup>    
        <radiogroup>
            <input id="abo"  inputType="number" h="60" margin="6"  textSize="15sp" background="#FFAACD6E" hint="输入按的时间(仅数字),默认100"/>
            <button  id="ok2" margin="6" textSize="30sp" textStyle="bold" background="#7711aa1F">处理</button>]

            <text textSize="20sp" text="bounds坐标处理"/>
        </radiogroup>
        </horizontal>        
                <button id="fw" margin="6" textSize="30sp" textStyle="bold" background="#7700000F">重置单选区</button>
        <horizontal background="#FF0ACD6E" marginLeft="0" marginTop="3">
            <text marginLeft="50" w="60" background="#ffcba6c3" textSize="20sp" >父控件</text>
            <spinner marginLeft="30" background="#FFEE7785" id="b8" entries="否|╰╭1╮╯|╰╭2╮╯|╰╭3╮╯|╰╭4╮╯|╰╭5╮╯|╰╭6╮╯" />
            <text marginLeft="50"  background="#00cba6c3" textSize="20sp" >返回父控件层数</text>

        </horizontal>
            <checkbox id="chi" w="320" marginTop="3" marginLeft="50" textSize="20sp" textStyle="bold" background="#FFAACD6E" text="子控件？(选择后请在下方输入)"/>
       
            <input id="b10" margin="6"  background="#FFAACD6E" hint="不用的话，空着就行，举个栗子:输入: 1,0 结果:child(1),child(0)"/>
       
            <button  id="ok" margin="6" textSize="30sp" textStyle="bold" background="#7711aa1F">生成</button>]
        
            <text text="显示" id="xs" textSize="20sp" />
        
        </vertical>
    </frame>
);
    
srtc(uiu,uiu.b10)
setInterval(()=>{}, 1000);
//uiu.exitOnClose();
uiu.setPosition(0, 0);
var xx=0
var yy=0
uiu.setSize(200,150)
uiu.fw.click(() => {
    device.vibrate(20);
    for (i = 0; i <= 8; i++) {
        log(i);
        var k = "a" + i;
        eval("uiu." + k + ".setChecked(false)");
    };
});


var execution = null;

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;

uiu.bh.setOnTouchListener(function(view, event){
    switch(event.getAction()){
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = uiu.getX();
            windowY = uiu.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            uiu.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            if(new Date().getTime() - downTime < 130&&Math.abs(event.getRawY() - y) >480){
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
     if (uiu.bh.getText() == "缩小") {
uiu.setPosition(xx, yy);
  uiu.setSize(200, 150);
  uiu.bh.setText("展开");
} else if (uiu.bh.getText() == "展开") {
    xx=uiu.getX();
    yy=uiu.getY();
uiu.setPosition(0, 0);
    uiu.setSize(1140, 2340);
    uiu.bh.setText("缩小");
  }
  
};









//

uiu.ok2.click(() => {
    bo=uiu.abo.getText().toString();
    
    if(bo==""){
       // uiu.abo.setText("没有输入bounds坐标，你处理个毛线");
        bo=100;
        device.vibrate(20);
        };
     bnm=bou(bo);
    uiu.xs.setText(bnm);
    setClip(bnm);
   
   
    });
uiu.ok.click(() => {
    var sx = storage.get("a"); //getClip();
    //var sx="qqqq"
    var 子 = "";
    var 父 = pa(uiu.b8.getSelectedItemPosition());
    if (uiu.chi.isChecked() == true) {
        var 子 = uiu.b10.getText().toString().split(",");
        // var 子=dialogs.rawInput("输入1,2,3,,,").split(",");
        var 子 = ch(子);
    };
    var 选1 = pd(6, 8);
    var 选2 = pd(0, 5);
    if (选1 == undefined) {
        选1 = "";
    };
    if (选2 == undefined) {
        选2 = "";
    };

    var 生成 = sx + 选1 + 父 + 子 + 选2 + ";\n";
    if (选2 == ".bounds()") {
        var 生成 = "var 属性=" + sx + 选1 + 父 + 子 + 选2 + "\npress(属性.centerX(),属性.centerY(),100);\n";
    };
    uiu.xs.setText(生成);
    setClip(生成)
    device.vibrate(20);

});

//判断选中？
function pd(j, l) {
    for (i = j; i <= l; i++) {
        var k = "a" + i;
        if (eval("uiu." + k + ".isChecked()") == true) {
            var txt = eval("uiu." + k + ".getText()");
            return txt;
        };
    };
};
//父
function pa(t) {
    var a6 = new Array();
    for (i = 0; i < t; i++) {
        a6[i] = "parent()"
    }
    var a7 = "." + a6.join(".");
    if (t == 0) {
        var a7 = "";
    };

    return a7;
}
//子
function ch(t) {
    var a8 = new Array();
    for (i = 0; i < t.length; i++) {
        a8[i] = "child(" + t[i] + ")"
    }
    var a9 = "." + a8.join(".");
    log(t[0], typeof(t[0] * 1));
    if (t[0] == "") {
        var a9 = "";
    };
    return a9;
}
//bounds
function bou(s) {
    m = storage.get("b");//a.split("= ")[1];
    eval("n=js" + m);
    n=k+","+s+");\nsleep("+(s*1+10)+");";
    //setClip(n);
    return n;
};

function js(l, t, r, b) {
    x = Math.floor((l + r) / 2);
    y = Math.floor((t + b) / 2);
    k = "press(" + x + "," + y;// + ",20)";
    return k;
};
//输入

function srtc(window, view) {
    view.on(
        "touch_down",
        function() {
            window.requestFocus();
            view.requestFocus();
        }
    )
    view.on(
        "key",
        function(keyCode, event) {
            if (event.getAction() == event.ACTION_DOWN && keyCode == keys.back) {
                window.disableFocus()
                event.consumed = true
            }
            window.requestFocus();
            view.requestFocus();
        }
    )

}



