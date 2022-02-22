/*
抖音 7.3.0
开发者 QQ364044801


*/


var Name = "#这个bgm最近好火#心如止水 还记得谁让你做了野兽嘛" //标题
var Yc = 3000
var Str;

str = Sc_1()
log(str, "1")
if (str == true) {
    sleep(Yc)
    str = Sc_2()
    log(str, "2")
    if (str == true) {
        sleep(Yc + 2000)
        str = Sc_3()
        log(str, "3")
        if (str == true) {
            sleep(Yc + 2000)
            str = Sc_4()
            log(str, "4")
            if (str == true) {
                sleep(Yc)
                str = Sc_5()
                log(str, "5")
                if (str == true) {
                    sleep(Yc)
                    str = Sc_6(Name)
                    log(str, "6")
                }
            }

        }
    }
}


Sc_1()
function Sc_1() {
    if (depth(5).checked(false).className("android.widget.ImageView").exists()) {
        let view = depth(5).checked(false).className("android.widget.ImageView").findOne(200)
        view.click()
        return true
    } else {
        return false
    }
}

function Sc_2() {
    for (i = 0; i < 10; i++) {
        if (id("android:id/button1").text("允许").className("android.widget.Button").exists()) {
            let view = id("android:id/button1").text("允许").className("android.widget.Button").findOne(200)
            view.click()
        } else if (text("上传").className("android.widget.TextView").exists() && text("拍摄").className("android.widget.TextView").exists()) {
            let view = text("上传").className("android.widget.TextView").findOne(200).bounds()
			click(view.centerX(), view.centerY())
            return true
        }
        sleep(1000)
    }
    return false
}

function Sc_3() {
    //选择视频
    if (text("视频").className("android.widget.TextView").exists() && text("照片").className("android.widget.TextView").exists() && !text("未找到任何视频文件").className("android.widget.TextView").exists()) {
        if (id("ayy").className("android.widget.TextView").exists()) {
            //className = android.widget.ImageView
            let view = id("ayy").className("android.widget.TextView").findOne(200).bounds()
            click(view.centerX(), view.centerY())
        }
        return true
    } else {
        return false
    }
}

function Sc_4() {
    if (text("下一步").className("android.widget.TextView").exists()) {
        let view = text("下一步").className("android.widget.TextView").findOne(200)
        view.click()
        return true
    } else {
        return false
    }
}

function Sc_5() {
    for (i = 0; i < 50; i++) {
        if (text("处理中，请不要退出").className("android.widget.TextView").exists()) {
            log("处理中，请不要退出")
        } else if (text("文字").className("android.widget.TextView").exists() && text("滤镜").className("android.widget.TextView").exists()) {
            click("下一步")
            return true
        }
        sleep(1500)
    }
}


function Sc_6(smg) {
    if (text("添加位置").className("android.widget.TextView").exists() && text("同步至圈子").className("android.widget.TextView").exists()) {
        setText(smg)
        sleep(1000)
        if (text("保存本地").className("android.widget.CheckBox").checked(true).exists()) {
            log("取消本地保存")
            text("保存本地").className("android.widget.CheckBox").checked(true).findOne(200).click()
        }
        click("发布")

        return true
    } else {
        return false
    }
}


