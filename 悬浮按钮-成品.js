
/**
 * 作者: 大柒
 * 日期:  20190307
 * 
 */
var window = floaty.rawWindow(
    <frame id="xx1"  h="875px" w="150px" >
            <img id="cd_1" layout_gravity="bottom|left" w="285px" h="150px" src="http://www.dyhywz.com/cd_1.png" rotation="-90" />
            <img id="cd_2" layout_gravity="bottom|left" w="285px" h="150px" src="http://www.dyhywz.com/cd_2.png" rotation="-90" />
            <img id="cd_3" layout_gravity="bottom|left" w="285px" h="150px" src="http://www.dyhywz.com/cd_3.png" rotation="-90" />
            <img id="cd_4" layout_gravity="bottom|left" w="285px" h="150px" src="http://www.dyhywz.com/cd_4.png" rotation="-90" />
    </frame>
);
var window1 = floaty.window(
    <frame  h="150px" w="150px" >
        <img id="jia" layout_gravity="bottom|left" w="150px" h="150px" src="http://www.dyhywz.com/jia_1.png" />
    </frame>
);

//cd1值 菜单的默认加载位置 b,d,e 跟随C值 这个自己摸索
//jiaodu值 加载图标的旋转开始角度 
//sleep0值 动画时间 0为无延迟  数值越小 加载越快 反之则慢
//date0_sj值 按下手指不移动时等待多少毫秒关闭悬浮窗
//move0值 手指移动的距离小于该值 则判断为 未移动
//date1_sj 值 手指触摸时间小于该值 则判断为点击
var cd1 = 180;
var jiaodu = 0;
var sleep0=1;
var date0_sj=1000;
var move0=60;
var date1_sj=200;
var y2 = false, y1 = true;
let cd2 = cd1, cd3 = cd1, cd4 = cd1



window.cd_1.setPivotY(cd1)
window.cd_1.setPivotX(cd1)
window.cd_2.setPivotY(cd2)
window.cd_2.setPivotX(cd2)
window.cd_3.setPivotY(cd3)
window.cd_3.setPivotX(cd3)
window.cd_4.setPivotY(cd4)
window.cd_4.setPivotX(cd4)
window.setTouchable(false);


//两个悬浮窗Y值差值
var Y_cz=725
//两个悬浮窗初始位置 
window.setPosition(device.width - 200, device.height - (400+Y_cz))
window1.setPosition(device.width - 200, device.height - 400)
function jz() {
    threads.start(function () {
        if (y1) {
            y1 = false
            if (y2) {
                y2 = false
                for (let i = 0; i < 100; i++) {
                    if (i % 2) { window1.jia.setRotation(jiaodu += 1) }
                    window.cd_1.setPivotY(cd1 += 4)
                    window.cd_1.setPivotX(cd1)
                    window.cd_2.setPivotY(cd2 += 3)
                    window.cd_2.setPivotX(cd2)
                    window.cd_3.setPivotY(cd3 += 2)
                    window.cd_3.setPivotX(cd3)
                    window.cd_4.setPivotY(cd4 += 1)
                    window.cd_4.setPivotX(cd4)
                    sleep(sleep0)
                }
            } else {
                for (let i = 100; i > 0; i--) {
                    if (i % 2) { window1.jia.setRotation(jiaodu -= 1) }
                    window.cd_1.setPivotY(cd1 -= 4)
                    window.cd_1.setPivotX(cd1)
                    window.cd_2.setPivotY(cd2 -= 3)
                    window.cd_2.setPivotX(cd2)
                    window.cd_3.setPivotY(cd3 -= 2)
                    window.cd_3.setPivotX(cd3)
                    window.cd_4.setPivotY(cd4 -= 1)
                    window.cd_4.setPivotX(cd4)
                    sleep(sleep0)
                }
                y2 = true;
            }
            y1 = true
        }
    })
}

window.cd_1.on("click", () => {
    if (y2) {
        toastLog("首页")
        jz();
        window.setTouchable(false);
    }
})
window.cd_2.on("click", () => {
    if (y2) {
        toastLog("设置")
        jz();
        window.setTouchable(false);
    }
})
window.cd_3.on("click", () => {
    if (y2) {
        toastLog("系统")
        jz();
        window.setTouchable(false);
    }
})
window.cd_4.on("click", () => {
    if (y2) {
        toastLog("我的")
        jz();
        window.setTouchable(false);
    }
})


var fn = () => { }
var id = setInterval(
    fn, 3000
)
//记录按键被按下时的触摸坐标
var x = 0,
    y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;yd=false;

window1.jia.setOnTouchListener(function (view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            if(!yd){//如果移动的距离大于h值 则判断为移动 yd为真
                if (Math.abs(event.getRawY() - y) >move0 || Math.abs(event.getRawX() - x) > move0) {yd=true}
                //如果按下的时间超过g值并且yd值为假判断为长按，退出脚本 
                if (new Date().getTime() - downTime > date0_sj) {
                    log(new Date().getTime() - downTime);
                    exit();

                    //关闭悬浮窗
                    //window.close()
                    //window1.close()
                }
            }else{//移动手指时调整两个悬浮窗位置
                window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
                window1.setPosition(windowX + (event.getRawX() - x),
                windowY + ((event.getRawY() - y)+Y_cz));
                
            }
            return true;
        case event.ACTION_UP:
            //触摸时间小于 200毫秒 则判断为 点击
            if (new Date().getTime() - downTime < date1_sj) {
                jz();
                //根据Y2值 设置悬浮窗是否可以触摸
                if(y2){
                    window.setTouchable(false);
                }else{
                    window.setTouchable(true);
                }
            }
            yd=false
            return true;
    }
    return true;
});