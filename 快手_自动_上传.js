var Name = "缺电灯泡吗" //标题
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

function Sc_1() {
    if (id("right_btn").depth(4).checked(false).className("android.widget.ImageView").exists()) {
        let view = id("right_btn").depth(4).checked(false).className("android.widget.ImageView").findOne(200)
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
        } else if (text("音乐").className("android.widget.TextView").exists() && text("相册").className("android.widget.TextView").exists()) {
            let view = text("相册").className("android.widget.TextView").findOne(200).bounds()
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
        if (id("media_pick_num").className("android.widget.TextView").exists()) {
            //className = android.widget.ImageView
            let view = id("media_pick_num").className("android.widget.TextView").findOne(200).bounds()
            click(view.centerX(), view.centerY())
        }
        return true
    } else {
        return false
    }
}


function Sc_4() {
    if (text("下一步(1)").className("android.widget.Button").exists()) {
        let view = text("下一步(1)").className("android.widget.Button").findOne(200)
        view.click()
        return true
    } else {
        return false
    }
}


function Sc_5() {
    for (i = 0; i < 20; i++) {
        if (text("文字").className("android.widget.TextView").exists() && text("贴纸").className("android.widget.TextView").exists()) {
            click("下一步")
            log("图片上传")
            return true
        } else if (id("change_speed_entry").className("android.widget.ImageView").exists() && id("rotate").className("android.widget.ImageView").exists()) {
            log("视频上传")
            click("下一步")

        }
        sleep(2000)
    }
}


function Sc_6(smg) {
    if (text("好友").className("android.widget.TextView").exists() && text("话题").className("android.widget.TextView").exists()) {
        setText(smg)
        sleep(1000)
        if (id("cb_save_album").className("android.widget.CheckBox").checked(true).exists()) {
            log("取消本地保存")
            id("cb_save_album").className("android.widget.CheckBox").checked(true).findOne(200).click()
        }
        click("发布")

        return true
    } else {
        return false
    }
}