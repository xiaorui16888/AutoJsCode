//下面的两个参数用户自己赋值。
var 名字 = "这里输入名字" //"这里写名字";
var 通话类型 = "视频通话"; //还可以设置为 "语音通话"。


//不用版本的微信，下面的四个参数可能会有变动，需要用户自行修改。
var 搜索框id = "ht";
var 搜索结果id = "kr";
var 视频通话id = "p4"
var 通话id = "ga";


//全局全局变量。
var t = "";
var i = 0;
var n = 0;

try {
    打开微信();
    sleep(500);
    for (let i = 0; !desc("搜索").exists(); i++) {
        if (i > 10) {
            打开微信();
            i = 0;
        }
        sleep(500);
    };
    t += "\n[1]打开微信成功";
    t = t + "\n[2]进入搜索界面" + 单击直到("desc(\"搜索\").findOne(1000)", "currentActivity() == \"com.tencent.mm.plugin.search.ui.FTSMainUI\"");

    sleep(500);
    setText(名字);
    for (; id(搜索框id).className("android.widget.EditText").findOne(500).text() != 名字; i++) {
        if (i > 10) {
            if (n > 3) {
                throw "\n[3]名字输入失败";
            }
            setText(名字);
            i = 0;
            n++;
        }
        sleep(300);
    }
    i = 0;
    n = 0;
    t = t + "\n[3]名字输入成功：" + 名字;
    for (; !id(搜索结果id).text(名字).exists(); i++) {
        if (i > 10) {
            throw "\n[4]未找到联系人：" + 名字;
        }
        sleep(300);
    }
    i = 0;
    t = t + "\n[4]找到并点击联系人" + 单击直到("id(搜索结果id).text(名字).findOne(2000)", "currentActivity() == \"com.tencent.mm.ui.chatting.ChattingUI\"");
    t = t + "\n[5]找到并单击更多功能" + 单击直到("descStartsWith(\"更多功能\").findOne(2000)", "id(视频通话id).text(\"视频通话\").exists()", 3);
    t = t + "\n[6]找到并单击视频通话" + 单击直到("id(视频通话id).text(\"视频通话\").findOne(2000)", "id(通话id).text(通话类型).exists()", 3);
    t = t + "\n[7]单击通话" + clicks(id(通话id).text(通话类型).findOne(2000));
    throw "完毕";
} catch (err) {
    var e = err;
    var r = "\n\n";
    if(e != "完毕"){
        console.show();
        r = "\n\n错误：";
    }
    t = t + r + err;
    结束();
}


function 结束() {
    log(t);
    t = t + "\n\n" + new Date().toLocaleString();
    输出日志(t);
}

function 输出日志(日志) {
    files.write("/sdcard/微信通话运行日志.txt", 日志);
    return true;
}

function 打开微信() {
    launchApp("微信");
    sleep(500);
    waitForPackage("com.tencent.mm", 500);
    while (currentPackage() == "com.tencent.mm") {
        back();
        sleep(500);
    }
    launchApp("微信");
    waitForActivity("com.tencent.mm.ui.LauncherUI", 500);
}

function clicks(控件) {
    switch (控件判断(控件)) {
        case true:
            return 点击(控件);
            break

        case false:
            var f = true;
            for (var i = 0; i < 控件.length; i++) {
                f = f && 点击(控件[i]);
            }
            return f;
            break

            defult:
                return false;
    }
}

function 点击(UiO) {
    while (!UiO.clickable()) {
        if (UiO.depth() > 1) {
            UiO = UiO.parent();
        } else {
            return false;
        }
    }
    return UiO.click();
}

function 控件判断(输入) {
    if (输入 == null || typeof 输入 != "object") {
        throw "[61行]该参数不是控件";
        return undefined;
    }
    if (typeof 输入.get == "function" && 输入.length > 0) {
        t = t + "\n[65]行 输入参数为控件集";
        return false;
    } else if (typeof 输入.text == "function") {
        return true;
    }
    throw "[70行]输入参数不是控件"
    return undefined;

}

function 单击直到(控件, 条件, 次数) {
    if (!控件判断(eval(String(控件)))) {
        throw "未找到：" + String(控件);
        return false;
    }
    点击(eval(String(控件)));
    for (let i = 0; !eval(String(条件)); i++) {
        if (i > 4) {
            点击(eval(String(控件)));
            i = 0;
            次数--;
            if (次数 == 0) {
                return false;
                break
            }
        }
        sleep(300);
    }
    return true;
}