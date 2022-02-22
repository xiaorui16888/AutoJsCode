auto();
var layout1, layout2;
var show = true;
layout1 = "<frame w='300px' h='400px'  ><ScrollView><vertical><button h='80px' id='show' bg='#77ffffff' text='收缩/展开'></button><button id='tts' bg='#77ffffff'text='文字转语音'></button> <button id='exit' bg='#77ffffff' text='退出'></button>"
layout2 = "</vertical></ScrollView></frame>";
var sounds = new Array();
var path = "/sdcard/sounds/";
files.listDir(path, function(file) {
    sounds.push(file);
    return true;
})
var st = storages.create("QQVOICE");
st.remove("API_KEY")
st.remove("SECRET_KEY");
var MYQQ = st.get("QQ", "undefined");
log(MYQQ)
if (MYQQ == "" || MYQQ == "undefined") {
    MYQQ = dialogs.rawInput("请输入你的QQ")
    st.put("QQ", MYQQ);
}
var running = false;
var API_KEY = st.get("API_KEY", "undefined");
API_KEY = ""; //请使用自己的APIKEY 和SCECRETKEY
log(API_KEY)
var SECRET_KEY = st.get("SECRET_KEY", "undefined");
SECRET_KEY = "";
log(SECRET_KEY);

if (sounds.length == 0) {
    layout1 += layout2;
} else {
    for (var i = 0; i < sounds.length; i++) {
        layout1 += "<button id=\'id" + (i + 1) + "\'  text=\'" + sounds[i] + "\' bg='#77ffffff'></button>"

    }
    layout1 += layout2;
}
log(layout1)
var w = floaty.window(layout1);
toast("长按 收缩/展开 按钮可以调整位置");
for (var i = 0; i < sounds.length; i++) { //为每个按钮绑定事件
    w["id" + (i + 1)].click(
        function() {
            var d = i; //使用局部变量d，因为作用域关系
            return function() {
                threads.start(function() {
                    post_voice(d, null)
                })
            }
        }()
    )
} //使用闭包达到效果，不能直接使用i，此处请勿修改

//log(w)
w.exitOnClose()
w.show.longClick(() => {
    w.setAdjustEnabled(!w.isAdjustEnabled());
    return true;
})

w["show"].click(() => {
    if (show) {
        w.setSize(450, 150)
    } else {
        w.setSize(450, 450)
    }
    show = !show;
})

w["tts"].click(() => {
    alert("目前无法使用。。")
    return;
    //此部分不能用
    //var tts=dialogs.select("选择语音来源","百度语音合成","本机TTS功能(暂未实现)")
    //  log(tts)
    if (API_KEY == "undefined" || API_KEY == "" || SECRET_KEY == "" || SECRET_KEY == "undefined") {
        API_KEY = dialogs.rawInput("请输入API_KEY:")
        st.put("API_KEY", API_KEY);
        SECRET_KEY = dialogs.rawInput("请输入SECRET_KEY:")
        st.put("SECRET_KEY", SECRET_KEY);
    }
    log("tts")
    w.setSize(450, 150) //收缩防止悬浮窗挡住

})
w["exit"].click(() => {
    if (sounds.length == 0) {
        alert("将音频文件放至" + path + "文件夹后即可使用!");
    }
    exit();
})
setInterval(() => {}, 1000) //循环空函数防止退出
function post_voice(id, text) {
    log(id);
    //return;
    if (running) {
        return;
    }
    running = true;
    //alert(s[id]);
    var g = className("android.widget.ImageView").id("name").clickable(true).find();
    //alert(g.size());
    for (var i = 0; i < g.size(); i++) //筛选控件
    {
        if (g.get(i).bounds().left < 10) {
            g.get(i).click();
            //筛选掉一些贴表情的控件
            break;
        }
    }
    sleep(500);
    click("录音");
    sleep(300);
    desc("开始录音").click()
    var press_time = random(2, 5) * 1000 //使用了随机时长，可自定义
    sleep(press_time);
    desc("停止录音").click()
    sleep(500);
    var slk_path = getSlkPath(MYQQ)
    files.remove(slk_path);
    if (id != null) {
        files.copy(path + sounds[id], slk_path);
    } else {
        YuYin(text, slk_path)
    }
    sleep(600);
    click("发送");
    sleep(500);
    running = false;

}

function getSlkPath(QQ) { //取得当前语音文件路径
    var path;
    path = files.getSdcardPath() + "/";
    path += "Tencent/MobileQQ/" + QQ + "/ptt/";
    path += new Date().getFullYear();
    var m = new Date().getMonth() + 1;
    m = m < 10 ? "0" + m : m;
    path += m + "/";
    var d = new Date().getDate()
    //d = d < 10 ? "0" + d : d;
    path += d + "/";
    //log(path);
    files.ensureDir(path);
    var slk = files.listDir(path);
    slk.sort();
    slk.reverse();
    toastLog(path + slk[0])
    return path + slk[0]; //最新文件
}

function YuYin(tex, path_) {


    var TOKEN;

    var h = http.get("https://openapi.baidu.com/oauth/2.0/token?grant_type=client_credentials&client_id=" + API_KEY + "&client_secret=" + SECRET_KEY);

    TOKEN = h.body.json().access_token;

    log(TOKEN);

    h = http.get("http://tsn.baidu.com/text2audio?lan=zh&ctp=1&cuid=abcdxxx&tok=" + TOKEN + "&tex=" + tex + "&vol=12&per=0&spd=5&pit=5")

    var file_ = h.body.bytes();
    log("删除源文件" + path_)
    log(files.remove(path_));
    log("写出文件");
    log(files.writeBytes(path_, file_));

}