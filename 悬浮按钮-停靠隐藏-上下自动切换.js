
/**
 * 作者: 大柒
 * 日期: 20190308
 * QQ: 531310591
 * 功能:悬浮窗靠边时自动隐藏,点击展开等待一定时间无操作时自动收起并隐藏
 *      菜单展开时 拖动悬浮按钮 碰触到上下界限时自动切换 上下菜单栏(不要太贪玩小心AJ崩溃)
 *      长按时有进度条提示 悬浮窗关闭进度
 *      可以自己手动更换菜单栏图标 名称 (注意:要菜单上下要对称)
 */
var window = floaty.rawWindow(
    <frame h="1750px" w="150px" >
        <frame h="875px" w="150px" >
            <frame id="cd_1" layout_gravity="bottom|left" w="285px" h="150px" rotation="-90" >
                <img layout_gravity="center" w="150px" h="285px" src="http://www.dyhywz.com/cd_01.png" rotation="90" />
                <text textSize="16sp" w="32sp" h="20sp" margin="25 15 0 0" textColor="#ffffff" text="首页" rotation="90" alpha="0.6" />
                <img w="100px" h="100px" margin="54 8 0 0" src="@drawable/ic_home_black_48dp" tint="#ffffff" rotation="90" alpha="0.6" />
                <text id="dj1" w="*" h="*" />
            </frame>
            <frame id="cd_2" layout_gravity="bottom|left" w="285px" h="150px" rotation="-90" >
                <img layout_gravity="center" w="150px" h="285px" src="http://www.dyhywz.com/cd_02.png" rotation="90" />
                <text textSize="16sp" w="32sp" h="20sp" margin="25 15 0 0" textColor="#ffffff" text="设置" rotation="90" alpha="0.6" />
                <img w="100px" h="100px" margin="54 8 0 0" src="@drawable/ic_settings_black_48dp" tint="#ffffff" rotation="90" alpha="0.6" />
                <text id="dj2" w="*" h="*" />
            </frame>
            <frame id="cd_3" layout_gravity="bottom|left" w="285px" h="150px" rotation="-90" >
                <img layout_gravity="center" w="150px" h="285px" src="http://www.dyhywz.com/cd_03.png" rotation="90" />
                <text textSize="16sp" w="32sp" h="20sp" margin="25 15 0 0" textColor="#ffffff" text="系统" rotation="90" alpha="0.6" />
                <img w="100px" h="100px" margin="54 8 0 0" src="@drawable/ic_build_black_48dp" tint="#ffffff" rotation="90" alpha="0.6" />
                <text id="dj3" w="*" h="*" />
            </frame>
            <frame id="cd_4" layout_gravity="bottom|left" w="285px" h="150px" rotation="-90" >
                <img layout_gravity="center" w="150px" h="285px" src="http://www.dyhywz.com/cd_04.png" rotation="90" />
                <text textSize="16sp" w="32sp" h="20sp" margin="25 15 0 0" textColor="#ffffff" text="我的" rotation="90" alpha="0.6" />
                <img w="100px" h="100px" margin="54 8 0 0" src="@drawable/ic_person_black_48dp" tint="#ffffff" rotation="90" alpha="0.6" />
                <text id="dj4" w="*" h="*" />
            </frame>
        </frame>
        <frame h="875px" w="150px" marginTop="875px" >
            <frame id="cd_01" layout_gravity="bottom|left" w="285px" h="150px" rotation="-90" >
                <img layout_gravity="center" w="150px" h="285px" src="http://www.dyhywz.com/cd_01.png" rotation="-90" />
                <text textSize="16sp" w="32sp" h="20sp" margin="40 15 0 0" textColor="#ffffff" text="首页" rotation="90" alpha="0.6" />
                <img w="100px" h="100px" margin="8 8 0 0" src="@drawable/ic_home_black_48dp" tint="#ffffff" rotation="90" alpha="0.6" />
                <text id="dj01" w="*" h="*" />
            </frame>
            <frame id="cd_02" layout_gravity="bottom|left" w="285px" h="150px" rotation="-90" >
                <img layout_gravity="center" w="150px" h="285px" src="http://www.dyhywz.com/cd_02.png" rotation="-90" />
                <text textSize="16sp" w="32sp" h="20sp" margin="40 15 0 0" textColor="#ffffff" text="设置" rotation="90" alpha="0.6" />
                <img w="100px" h="100px" margin="8 8 0 0" src="@drawable/ic_settings_black_48dp" tint="#ffffff" rotation="90" alpha="0.6" />
                <text id="dj02" w="*" h="*" />
            </frame>
            <frame id="cd_03" layout_gravity="bottom|left" w="285px" h="150px" rotation="-90" >
                <img layout_gravity="center" w="150px" h="285px" src="http://www.dyhywz.com/cd_03.png" rotation="-90" />
                <text textSize="16sp" w="32sp" h="20sp" margin="40 15 0 0" textColor="#ffffff" text="系统" rotation="90" alpha="0.6" />
                <img w="100px" h="100px" margin="8 8 0 0" src="@drawable/ic_build_black_48dp" tint="#ffffff" rotation="90" alpha="0.6" />
                <text id="dj03" w="*" h="*" />
            </frame>
            <frame id="cd_04" layout_gravity="bottom|left" w="285px" h="150px" rotation="-90" >
                <img layout_gravity="center" w="150px" h="285px" src="http://www.dyhywz.com/cd_04.png" rotation="-90" />
                <text textSize="16sp" w="32sp" h="20sp" margin="40 15 0 0" textColor="#ffffff" text="我的" rotation="90" alpha="0.6" />
                <img w="100px" h="100px" margin="8 8 0 0" src="@drawable/ic_person_black_48dp" tint="#ffffff" rotation="90" alpha="0.6" />
                <text id="dj04" w="*" h="*" />
            </frame>
        </frame>
    </frame>
);
var window1 = floaty.rawWindow(
    <frame h="150px" w="150px" >
        <frame h="auto" w="auto">
            <img id="jia" layout_gravity="right" w="150px" h="150px" src="http://www.dyhywz.com/jia_1.png" />
        </frame>
    </frame>
);
var window0 = floaty.rawWindow(
    <frame h="150px" w="150px" rotation="-90">
        <progressbar id="jdtzt" progress="0" style="@style/Base.Widget.AppCompat.ProgressBar.Horizontal" />
    </frame>
);
window0.setTouchable(false);
window0.jdtzt.setVisibility(8);

var width0 = device.width
var height0 = device.height
/*
*用户设置参数
*/
var cd1 = 180;//cd1值 上级菜单的默认加载位置 cd2,cd3,cd4 跟随cd1值 这个自己摸索
var cdx1 = -326;//cdx1值 下级菜单的默认加载位置 cd2,cd3,cd4 跟随cd1值 这个自己摸索
var jiaodu = 0;//jiaodu值 加载图标的旋转开始角度 
var sleep0 = 1;//sleep0值 动画时间 0为无延迟  数值越小 加载越快 反之则慢
var date0_sj = 1000;//date0_sj值 按下手指不移动时等待多少毫秒关闭悬浮窗
var move0 = 60;//move0值 手指移动的距离小于该值 则判断为 未移动
var date1_sj = 200;//date1_sj 值 手指触摸时间小于该值 则判断为点击
var jia_W = 150;//悬浮按钮的宽度
var Y_cz = 725 + jia_W / 2;//两个悬浮窗Y值差值+window1高的一半
var jia_sqX = 150;//悬浮窗隐藏触发X宽度
var jia_zksj = 2; //悬浮窗菜单展示的时间  [注:只有在悬浮窗隐藏时展示时间才有效] 秒级运算
//window.setPosition(device.width - 200, height0 - (400 + Y_cz))//两个悬浮窗初始位置 
//window1.setPosition(device.width - 200, height0 - 400)//两个悬浮窗初始位置 
window1.setPosition(0, Y_cz)
/*
*c初始化参数
*/
var y2 = false, y1 = true; y3 = true, qhs = false, qhx = false, jia_s = false, jia_x = false
let cd2 = cd1, cd3 = cd1, cd4 = cd1
let cdx2 = cdx1, cdx3 = cdx1, cdx4 = cdx1
window.cd_1.setPivotY(cd1)
window.cd_1.setPivotX(cd1)
window.cd_2.setPivotY(cd2)
window.cd_2.setPivotX(cd2)
window.cd_3.setPivotY(cd3)
window.cd_3.setPivotX(cd3)
window.cd_4.setPivotY(cd4)
window.cd_4.setPivotX(cd4)
window.cd_01.setPivotY(cdx1)
window.cd_01.setPivotX(cdx1)
window.cd_02.setPivotY(cdx2)
window.cd_02.setPivotX(cdx2)
window.cd_03.setPivotY(cdx3)
window.cd_03.setPivotX(cdx3)
window.cd_04.setPivotY(cdx4)
window.cd_04.setPivotX(cdx4)
window.setTouchable(false);

/*
*菜单点击参数
*/
window.dj1.on("click", () => {
    log("点1")
    if (y2) {
        toastLog("首页")
        window.setTouchable(false);
        jz();
    }
})
window.dj01.on("click", () => {
    log("点1")
    if (y2) {
        toastLog("首页")
        window.setTouchable(false);
        jz();
    }
})
window.dj2.on("click", () => {
    if (y2) {
        toastLog("设置")
        window.setTouchable(false);
        jz();
    }
})
window.dj02.on("click", () => {
    if (y2) {
        toastLog("设置")
        window.setTouchable(false);
        jz();
    }
})
window.dj3.on("click", () => {
    if (y2) {
        toastLog("系统")
        window.setTouchable(false);
        jz();
    }
})
window.dj03.on("click", () => {
    if (y2) {
        toastLog("系统")
        window.setTouchable(false);
        jz();
    }
})
window.dj4.on("click", () => {
    if (y2) {
        toastLog("我的")
        window.setTouchable(false);
        jz();
    }
})
window.dj04.on("click", () => {
    if (y2) {
        toastLog("我的")
        window.setTouchable(false);
        jz();
    }
})




function jz() {
    threads.start(function () {
        if (qhs || qhx) { while (!y1) { sleep(100) } }
        if (y1) {
            y1 = false
            if (qhs) {
                y3 = true
                log("自动切换到上")
                for (let i = 0; i < 100; i++) {//切换到上
                    window.cd_01.setPivotY(cdx1 -= 4)
                    window.cd_01.setPivotX(cdx1)
                    window.cd_02.setPivotY(cdx2 -= 3)
                    window.cd_02.setPivotX(cdx2)
                    window.cd_03.setPivotY(cdx3 -= 2)
                    window.cd_03.setPivotX(cdx3)
                    window.cd_04.setPivotY(cdx4 -= 1)
                    window.cd_04.setPivotX(cdx4)
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
                y1 = true
                qhs = false
                jia_s = true
                jia_x = false
                return
            } else if (qhx) {
                y3 = false
                log("自动切换到下")
                for (let i = 0; i < 100; i++) {//切换到下
                    window.cd_1.setPivotY(cd1 += 4)
                    window.cd_1.setPivotX(cd1)
                    window.cd_2.setPivotY(cd2 += 3)
                    window.cd_2.setPivotX(cd2)
                    window.cd_3.setPivotY(cd3 += 2)
                    window.cd_3.setPivotX(cd3)
                    window.cd_4.setPivotY(cd4 += 1)
                    window.cd_4.setPivotX(cd4)
                    window.cd_01.setPivotY(cdx1 += 4)
                    window.cd_01.setPivotX(cdx1)
                    window.cd_02.setPivotY(cdx2 += 3)
                    window.cd_02.setPivotX(cdx2)
                    window.cd_03.setPivotY(cdx3 += 2)
                    window.cd_03.setPivotX(cdx3)
                    window.cd_04.setPivotY(cdx4 += 1)
                    window.cd_04.setPivotX(cdx4)
                    sleep(sleep0)
                }
                y2 = true;
                y1 = true
                qhx = false
                jia_x = true
                jia_s = false
                return
            }
            if (y3) {
                //log("进入上")
                if (jia_s) {
                    y2 = false
                    for (let i = 0; i < 100; i++) {
                        if (i % 2) { window1.jia.setRotation(jiaodu += 1) }//+号图片旋转
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
                    y2 = false;
                    jia_s = false
                    if (jia_zt1) { jia_sq(jia_fx) }
                    //log("收起上")
                } else {
                    for (let i = 100; i > 0; i--) {
                        if (i % 2) { window1.jia.setRotation(jiaodu -= 1) }//+号图片旋转
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
                    //log("上加载")
                    y2 = true;
                    jia_s = true

                }
                y1 = true
            } else {
                //log("进入下")
                if (jia_x) {
                    for (let i = 100; i > 0; i--) {
                        if (i % 2) { window1.jia.setRotation(jiaodu += 1) }//+号图片旋转
                        window.cd_01.setPivotY(cdx1 -= 4)
                        window.cd_01.setPivotX(cdx1)
                        window.cd_02.setPivotY(cdx2 -= 3)
                        window.cd_02.setPivotX(cdx2)
                        window.cd_03.setPivotY(cdx3 -= 2)
                        window.cd_03.setPivotX(cdx3)
                        window.cd_04.setPivotY(cdx4 -= 1)
                        window.cd_04.setPivotX(cdx4)
                        sleep(sleep0)
                    }
                    y2 = false;
                    jia_x = false
                    //log("下收起")
                    if (jia_zt1) { jia_sq(jia_fx) }
                } else {
                    for (let i = 0; i < 100; i++) {
                        if (i % 2) { window1.jia.setRotation(jiaodu -= 1) }//+号图片旋转
                        window.cd_01.setPivotY(cdx1 += 4)
                        window.cd_01.setPivotX(cdx1)
                        window.cd_02.setPivotY(cdx2 += 3)
                        window.cd_02.setPivotX(cdx2)
                        window.cd_03.setPivotY(cdx3 += 2)
                        window.cd_03.setPivotX(cdx3)
                        window.cd_04.setPivotY(cdx4 += 1)
                        window.cd_04.setPivotX(cdx4)
                        sleep(sleep0)
                    }
                    //log("下加载")
                    y2 = true;
                    jia_x = true
                }
                y1 = true
            }
            zk_zy = false
        }
    })
}
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
var downTime; yd = false;
//记录悬浮窗是收起
var jia_zt = false, jia_zt1 = false, jia_fx = false, jdt_0 = false;
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
            if (!yd) {//如果移动的距离大于h值 则判断为移动 yd为真
                if (!jdt_0) {
                    if (new Date().getTime() - downTime > 200) {
                        jdt_0 = true
                        window0.setPosition(windowX - 100, windowY + Y_cz)
                        window0.jdtzt.setVisibility(0);
                        jdt();
                    }
                }
                if (Math.abs(event.getRawY() - y) > move0 || Math.abs(event.getRawX() - x) > move0) {
                    yd = true; jia_zt = false; jia_zt1 = false;
                    if (jdt_0) {
                        jdt_0 = false
                        clearInterval(down);
                        window0.jdtzt.setVisibility(8);
                    }
                }
                //如果按下的时间超过g值并且yd值为假判断为长按，退出脚本 
                //if (new Date().getTime() - downTime > date0_sj) {
                if (jia_tc) {
                    exit();
                    //关闭悬浮窗
                    //window.close()
                    //window0.close()
                    //window1.close()
                }
            } else {//移动手指时调整两个悬浮窗位置
                if (y2) {
                    if (y3) {
                        if (window.getY() < 0) {
                            qhx = true;
                            y3 = false;
                            jz();
                        }
                    } else {
                        if (window.getY() > height0 - 1750) {
                            qhs = true;
                            y3 = true;
                            jz();
                        }
                    }
                }
                window.setPosition(windowX + (event.getRawX() - x),
                    windowY + (event.getRawY() - y));
                window1.setPosition(windowX + (event.getRawX() - x),
                    windowY + ((event.getRawY() - y) + Y_cz));
            }
            return true;
        case event.ACTION_UP:                //手指弹起
            if (jdt_0) {
                jdt_0 = false
                window0.jdtzt.setVisibility(8);
                clearInterval(down);
            }
            //触摸时间小于 200毫秒 则判断为 点击
            if (new Date().getTime() - downTime < date1_sj) {
                if (!zk_zy) {//如果 隐藏时展开收起正在进行中则不进行动作
                    if (jia_zt) {
                        log("隐藏_展开")
                        jia_zk();
                        window.setTouchable(true);
                    } else if (y2 || jia_zt1) {//根据Y2值 设置悬浮窗是否可以触摸
                        window.setTouchable(false);
                        if (jia_s) {
                            y3 = true
                        } else {
                            y3 = false
                        }
                        log("普通_收起")
                        jz();
                    } else {
                        window.setTouchable(true);
                        if (window.getY() < 0) {
                            y3 = false
                        } else {
                            y3 = true;
                        }
                        log("普通展开")
                        jz();
                    }
                }
            } else {
                windowX = window.getX();
                windowY = window.getY();
                if (window.getX() + jia_W + jia_sqX > width0) {//收起悬浮窗
                    jia_sq(true);
                } else if (windowX < jia_sqX) {
                    jia_sq(false);
                }
            }
            yd = false
            return true;
    }
    return true;
});
var zk_zy = false
function jia_zk() {//悬浮窗展开 隐藏时生效
    threads.start(function () {
        log("展开开始占用")
        zk_zy = true
        jia_zt1 = true
        while (!jia_zt1 && !y1) { sleep(100); }
        let X = windowX, Y = windowY, E = false
        y1 = false;
        if (X > 0) {//右边展开
            for (X; X > width0 - jia_W; X--) {
                window1.setPosition(X, Y + Y_cz)
                window.setPosition(X, Y)
                sleep(sleep0)
            }
            E = true
        } else {
            for (X -= jia_W; X < 0; X++) {
                window1.setPosition(X, Y + Y_cz)
                window.setPosition(X, Y)
                sleep(sleep0)
            }
            E = false
        }
        if (window.getY() < 0) {
            log("隐藏_向下展开")
            y3 = false
            for (let i = 0; i < 100; i++) {
                if (i % 2) { window1.jia.setRotation(jiaodu -= 1) }//+号图片旋转
                window.cd_01.setPivotY(cdx1 += 4)
                window.cd_01.setPivotX(cdx1)
                window.cd_02.setPivotY(cdx2 += 3)
                window.cd_02.setPivotX(cdx2)
                window.cd_03.setPivotY(cdx3 += 2)
                window.cd_03.setPivotX(cdx3)
                window.cd_04.setPivotY(cdx4 += 1)
                window.cd_04.setPivotX(cdx4)
                sleep(sleep0)
            }
            jia_x = true
        } else {
            log("隐藏_向上展开")
            y3 = true;
            for (let i = 100; i > 0; i--) {
                if (i % 2) { window1.jia.setRotation(jiaodu -= 1) }//+号图片旋转
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
            jia_s = true
        }
        jia_fx = E
        y2 = true
        y1 = true
        jia_zt = false
        log("展开解除占用")
        zk_zy = false
        for (let i = 0; i < jia_zksj * 10; i++) {
            if (!jia_zt1) { return }
            sleep(100)
        }
        if (!y1) { return }
        jia_sq(E)

    })
}
function jia_sq(E) {//E 为真右边收起 假左边收起
    threads.start(function () {//悬浮窗隐藏
        zk_zy = true
        jia_zt1 = false
        log("收起开始占用")
        jia_zt = true
        let X = window.getX(), Y = window.getY();
        while (!y1) { sleep(100) }
        y1 = false;
        if (jia_s) {
            for (let i = 0; i < 100; i++) {
                if (i % 2) { window1.jia.setRotation(jiaodu += 1) }//+号图片旋转
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
            jia_s = false
        } else if (jia_x) {
            for (let i = 100; i > 0; i--) {
                if (i % 2) { window1.jia.setRotation(jiaodu += 1) }//+号图片旋转
                window.cd_01.setPivotY(cdx1 -= 4)
                window.cd_01.setPivotX(cdx1)
                window.cd_02.setPivotY(cdx2 -= 3)
                window.cd_02.setPivotX(cdx2)
                window.cd_03.setPivotY(cdx3 -= 2)
                window.cd_03.setPivotX(cdx3)
                window.cd_04.setPivotY(cdx4 -= 1)
                window.cd_04.setPivotX(cdx4)
                sleep(sleep0)
            }
            jia_x = false
        }
        y2 = false;

        if (E) {
            for (X; X < width0 - jia_W / 2 + 10; X++) {
                window1.setPosition(X, Y + Y_cz)
                window.setPosition(X, Y)
                sleep(sleep0)
            }
        } else {
            for (let i = X + jia_W / 2 + 10; i > 0; i--) {
                window1.setPosition(X -= 1, Y + Y_cz)
                window.setPosition(X, Y)
                sleep(sleep0)
            }
        }
        y1 = true
        jia_zt1 = true
        log("收起解除占用")
        zk_zy = false
    })
}
var down = ""
var jia_tc = false;
var hhhh = date0_sj / 100
function jdt() {//进度条提示
    window0.jdtzt.setProgress(0);
    down = setInterval(() => {
        var p = window0.jdtzt.getProgress();
        p++
        if (p > 100) {
            jia_tc = true;
            return;
        } else if (!jdt_0) {
            jia_tc = fasle;
            return;
        }
        window0.jdtzt.setProgress(p);
    }, hhhh)
}