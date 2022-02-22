"auto"
//仔细阅读下面注释，自己修改，点开QQ语音才能触发脚本
b = ["mp3", "m4a"]; //本地音频格式
c = ["Android", "tencent", "MIUI"]; //不需要搜索的文件夹(加快搜索速度,去掉不用的音乐)
b3 = false; //true:分段发送全部音频，false:只发送指定的一段
b5 = 1; //指定的一段(0表示第一段，1表示第二段)


music = ["⭕点我本地搜索", "⭕点我在线搜索"];
mpath = [];
n = 0;
var dir = "/sdcard/";
th = threads.start(function(){findvoice(dir)});
QQ = choiceQQ();
toast("点开qq语音");
th.join();
while (true) {
    id("press_to_speak_iv").findOne();
    i = dialogs.select("本地音乐", music);
    var j = -1;
    if (i == 0) {
        localSearch();
    } else if (i == 1) {
        onlineSong();
    } else if (i != -1) {
        menu(mpath, i);
    }
    if (j != 2)
        sleep(1500);
}

function choiceQQ() {
    var QQ1 = [];
    path = "/sdcard/tencent/MobileQQ/";
    QQ = files.listDir(path, function (name) {
        return parseInt(name) > 10000;
    });

    for (i in QQ)
        QQ1[i] = QQ[i];
    QQ1.sort();
    QQ1[QQ1.length] = "以上都不是";
    
    while (true) {
        i = dialogs.select("选择你的QQ", QQ1);
        if (i == QQ.length) {
            return dialogs.rawInput("输入你的QQ号");
        }
        else if (i != -1) {
            return QQ1[i];
        }
        toast("没有QQ无法使用");
    }
}

function localSearch() {
    a1 = [];
    a2 = [];
    a1[0] = "⭕返回";
    j = -1;
    search = dialogs.rawInput("搜索");
    while (true) {
        for (var i = 2, j = 1; i < music.length; i++) {
            if (music[i].indexOf(search) != -1) {
                a1[j] = music[i];
                a2[j] = mpath[i];
                j++;
            }
        }
        i = dialogs.select("搜索结果", a1);
        if (i == 0) {
            j = 2;
            break;
        }
        j = menu(a2, i);
        if (j != 2)
            sleep(2000);
        id("press_to_speak_iv").findOne();
    }
}


function menu(mpath, i) {
    j = dialogs.select(null, "⭕发送", "⭕播放", "⭕取消");
    if (i == null)
        frompath = mpath;
    else
        frompath = mpath[i];
    if (j == 0) {
        log(frompath);
        changevoice();
    } else if (j == 1) {
        app.viewFile(frompath);
    }
    return j;
}

function findvoice(dir) {
    var a = files.listDir(dir, function (name) {
        for (i in b) {
            if (name.endsWith(b[i]) || files.isDir(files.join(dir, name))) {
                return true
            }
        }
        return false;
    });
    for (j in a) {

        if (files.isFile(dir + a[j])) {
            music[n + 2] = a[j]
            mpath[n + 2] = dir + a[j];
            n++;
            //log(dir + a[j]);
        } else {
            var b1 = false;
            for (i in c) {
                if (a[j] == c[i]) {
                    b1 = true;
                }
            }
            if (!b1)
                findvoice(dir + a[j] + "/");
        }
    }
}

function changevoice() {
    var date1 = (new Date().getYear() + 1900) * 100 + new Date().getMonth() + 1;
    var date2 = new Date().getDate();
    var path = "/sdcard/tencent/MobileQQ/" + QQ + "/ptt/" + date1 + "/" + date2 + "/";
    topath = "/sdcard/aac/2.aac";
    files.createWithDirs(topath);
    files.createWithDirs(path);
    //删除临时文件
    var slk = files.listDir(path, function (name) {
        return name.endsWith(".slk~tmp");
    });
    for (i in slk) {
        files.remove(path + slk[i]);
    }
    id("ivTitleBtnRightImage").findOne();
    //因为语音文件大小不能超过1M，所以较长的音频必须分段发送
    var b4;
    if (b3) {
        cut = 0;
        b4 == null;
    } else {
        cut = b5 * 1000000;
        b4 = cut + 1000000;
    }
    while (cut != b4 && cut != null) {
        //格式转换
        cut = cutvoice(cut, cut + 1000000);
        //录音
        id("press_to_speak_iv").findOne();
        id("name").text("录音").click();
        sleep(200)
        desc("开始录音").click();
        //替换刚生成的临时录音
        th = threads.start(function () {
            sleep(2000);
        });
        d = 0
        while (d++ != 10000) {
            var slk = files.listDir(path, function (name) {
                return name.endsWith(".slk~tmp");
            });
            try {
                if (slk[0] != null) {
                    files.copy(topath, path + "temp.aac"); //复制要发送的音频文件
                    files.rename(path + "temp.aac", slk[0]); //更名，让QQ发送替换后的音频文件                  
                    break;
                }
            } catch (e) {
                log(e);
            }
        }
        if (d == 10001) {
            alert("发送失败", "仔细阅读脚本注释，查看自己QQ是否填写有误");
            toast("脚本已停止");
            exit();
        }
        th.join();
        desc("停止录音").findOne().click();
        sleep(500);
        while (!id("listen_panel_send_tv").find().click());
    }
    sleep(1000);
    back();
}

function cutvoice(cut, end) {
    while (true) {
        a = files.readBytes(frompath);
        b = [];
        toast("正在剪切第" + (cut / 1000000 + 1) + "段");
        for (var i = cut; i < end && i < a.length; i++) {
            b[i - cut] = a[i];
        }
        if (b3 || b.length > 100000) {
            break;
        }
        cut -= 1000000
    }
    files.writeBytes(topath, b);
    if (i == a.length) {
        toast("剪切到了音乐末尾");
        return null;
    }
    return i;
}

//在线音乐

function onlineSong() {
    path = "/sdcard/aac/music/";
    page = 1; //第几页
    num = 30; //每页个数
    name1 = [];
    name2 = [];
    name3 = [];
    files.createWithDirs(path);
    var i;
    while (true) {
        top500(page);
        name3[0] = "⭕点我搜索更多";
        name3[1] = "⭕返回";
        if (page > 1) {
            name3[33] = "⭕上一页";
        }
        else {
            name3.splice(33);
        }
        name3[32] = "⭕下一页";
        i = dialogs.select("热歌榜（第" + page + "页）", name3);
        if (i != -1) {
            if (i == 0) {
                //搜索
                var word = dialogs.rawInput("搜索");
                while (true) {
                    getsong(word)
                    for (i in name1) {
                        name3[parseInt(i) + 1] = name1[i] + " - " + name2[i] + ".mp3";
                    }
                    log(name3);
                    name3[0] = "⭕返回";
                    var j1 = dialogs.select("搜索" + word, name3);
                    if (j1 == 0) {
                        j1 = 2;
                        break;
                    } else if (j1 != -1) {
                        if (!files.isFile(path + name3[j1])) {
                            if (dialogs.confirm(null, "是否下载到" + path)) {
                                toast("下载中...");
                                files.writeBytes(path + name3[j1], loadsong(key[j1]));
                            } else {
                                j1 = 2;
                            }
                        }
                        j1 = menu(path + name3[j1], null);
                    }

                    if (j1 != 2)
                        sleep(2000);
                    j1 = -1;
                    id("press_to_speak_iv").findOne();

                }
            } else if (i == 32) {
                page++;
                j1 = 2;
            } else if (i == 33) {
                page--;
                j1 = 2;
            } else if (i == 1) {
                j = 2;
                break;
            } else {

                if (!files.isFile(path + name3[i])) {
                    if (dialogs.confirm(null, "是否下载到" + path)) {
                        toast("下载中...");
                        files.writeBytes(path + name3[i], loadsong(key[i]));
                    } else {
                        j1 = 2;
                    }
                }
                if (j1 != 2)
                    j1 = menu(path + name3[i], null);
                //app.openUrl(loadsong(key[i]));
            }
        }
        if (j1 != 2)
            sleep(2000);
        j1 = -1;
        id("press_to_speak_iv").findOne();
    }
}

function getsong(word) {
    key = [];
    name1 = [];
    name2 = [];
    var url1 = "http://mobilecdn.kugou.com/api/v3/search/song?format=json&page=" + page + "&pagesize=" + num + "&showtype=1&keyword=" + word;
    var html = http.get(url1).body.json().data.info;
    for (var i = 0; i < html.length; i++) {
        name1[i] = html[i].songname;
        name2[i] = html[i].singername;
        key[i + 1] = html[i].hash;
    }
}

function top500(page) {
    key = [];
    num = 30;
    var url1 = "http://m.kugou.com/rank/info/?rankid=8888&page=1&json=true&page=" + page + "&num=" + num;
    var html = http.get(url1).body.json().songs.list;
    for (i in html) {
        name3[parseInt(i) + 2] = html[i].filename + ".mp3";
        key[parseInt(i) + 2] = html[i].hash;
    }
}

function loadsong(key) {
    download = http.get("http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=" + key).body.json().url;
    b = http.get(download).body.bytes();
    return b;
}