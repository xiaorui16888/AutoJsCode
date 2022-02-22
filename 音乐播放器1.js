"ui";
var dir = "/sdcard/";
b = ["mp3", ".m4a"]; //音频格式
c = ["Android", "tencent", "MIUI"]; //不需要搜索的文件夹  
mpath = [];
music = [];
n = 0;
var apath;
loading();

threads.start(function() {
    findvoice(dir);
    loading();
    toast("搜索完成");
    apath = mpath[parseInt(random(0, mpath.length - 1))];
    media.playMusic(apath);
    song();
});

//播放器
function song() {
    ui.layout(
        <vertical >
            <horizontal>
                <button text="在线音乐" w="100" id="onlinesong" />
                <button text="本地音乐" w="100" id="localsong" />
            </horizontal>
            <button text="| |" id="pause" style="Widget.AppCompat.Button.Borderless" textColor="black" w="50" h="50" textSize="16sp" margin="450,0,0,153" />
            <seekbar id="jingdu" max="100" />
            <horizontal>
                <text text="1" id="text1" margin="0,0,0,10" ems="2" />
                <button text="" clickable="false" grarity="center" id="name" margin="0,0,0,30" w="195" h="37" ellipsize="end" lines="1" style="Widget.AppCompat.Button.Borderless" />
                <text text="1" id="text2" margin="0,0,0,50" ems="2" />
            </horizontal>
        </vertical>
    );
    var time1;
    log(files.getNameWithoutExtension(apath));
    threads.start(function() {
        while (true) {
            ui.run(function() {
                ui.text2.setText(parseInt(media.getMusicDuration() / 1000 / 60) + ":" + parseInt(media.getMusicDuration() / 1000 % 60));
                ui.name.setText(files.getNameWithoutExtension(apath));
                ui.jingdu.setProgress((media.getMusicCurrentPosition() / media.getMusicDuration() * 100).toString());
                time1 = (parseInt(media.getMusicCurrentPosition() / 1000 / 60) + ":" + parseInt(media.getMusicCurrentPosition() / 1000 % 60)).toString();
                ui.text1.setText(time1 + "");
            });
            sleep(990);
        }
    });
    ui.pause.click(() => {
        if (ui.pause.getText() == "▶") {
            media.resumeMusic();
            ui.pause.setText("| |");

        } else {
            media.pauseMusic();
            ui.pause.setText("▶");
        }
    });

    ui.onlinesong.click(() => {
        threads.start(function() {
            onlineSong();
        });
    });

    ui.localsong.click(() => {
        threads.start(function() {
            i1 = dialogs.select("本地音乐 （共" + music.length + "首）", music);
            if (i1 != -1) {
                apath = mpath[i1];
                sleep(500);
                try {
                    media.playMusic(apath);
                } catch (e) {
                    log(e);
                    toast("动作慢一点");
                }
                ui.run(function() {
                    ui.name.setText(files.getNameWithoutExtension(apath));
                });
            }
        });
    });

    ui.jingdu.setOnSeekBarChangeListener({
        onProgressChanged: function(seekbar, p, fromUser) {
            if (fromUser) {
                ui.text1.setText(time1 + "");
                media.musicSeekTo(media.getMusicDuration() / 100 * p);
            }
        }
    });
}

function loading(a) {
    ui.layout(
        <vertical margin="230,0,0,0">
            <button clickable="false" text="音乐搜索中" gavity="center" style="Widget.AppCompat.Button.Borderless"/>
            <progressbar id="find" />
        </vertical>
    );
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
    var j;
    while (i != -1) {
        top500(page);
        name3[0] = "⭕点击这里搜索更多";
        if (page > 1) {
            name3[32] = "⭕上一页";
        } else {
            name3.splice(32);
        }
        name3[31] = "⭕下一页";
        i = dialogs.select("热歌榜（第" + page + "页）", name3);
        if (i != -1) {
            if (i == 0) {
                var word = dialogs.rawInput("搜索");
                while (j != -1) {
                    getsong(word)
                    for (i in name1) {
                        name3[parseInt(i) + 1] = name1[i] + " - " + name2[i] + ".mp3";
                    }
                    name3[0] = "返回";
                    j = dialogs.select("搜索" + word, name3);
                    if (j == 0) {
                        break;
                    } else if (j != -1) {
                        if (isdown(name3, j) == 2) {
                            break;
                        }
                    }
                }
            } else if (i == 31) {
                page++;
            } else if (i == 32) {
                page--;
            } else {
                if (isdown(name3, i) == 2) {
                    break;
                }
            }
        }
    }
}

function isdown(name3, i) {
    if (!files.isFile(path + name3[i])) {
        if (dialogs.confirm(null, "是否下载到" + path)) {
            toast("下载中...");
            files.writeBytes(path + name3[i], loadsong(key[i]));
        } else {
            var j1 = 2;
        }
    }
    if (j1 != 2) {
        media.stopMusic();
        apath = path + name3[i];
        ui.run(function() {
            ui.name.setText(files.getNameWithoutExtension(apath));
        });
        log(path + name3[i]);
        sleep(500);
        try {
            media.playMusic(path + name3[i]);
        } catch (e) {
            log(e);
            toast("动作慢一点");
        }
        return 2;
    }
    return -1;
}

function getsong(word) {
    key = [];
    name1 = [];
    name2 = [];
    var url1 = "http://mobilecdn.kugou.com/api/v3/search/song?format=json&page=" + page + "&pagesize=" + num + "&showtype=1&keyword=" + word;
    var html = http.get(url1).body.json().data.info;
    for (i in html) {
        name1[i] = html[i].songname;
        name2[i] = html[i].singername;
        key[i] = html[i].hash;
    }
}

function top500(page) {
    key = [];
    num = 30;
    var url1 = "http://m.kugou.com/rank/info/?rankid=8888&page=1&json=true&page=" + page + "&num=" + num;
    var html = http.get(url1).body.json().songs.list;
    for (i in html) {
        name3[parseInt(i) + 1] = html[i].filename + ".mp3";
        key[parseInt(i) + 1] = html[i].hash;
    }
}

function loadsong(key) {
    download = http.get("http://m.kugou.com/app/i/getSongInfo.php?cmd=playInfo&hash=" + key).body.json().url;
    b = http.get(download).body.bytes();
    return b;
}

//本地音乐
function findvoice(dir) {
    var a = files.listDir(dir, function(name) {
        for (i in b) {
            if (name.endsWith(b[i]) || files.isDir(files.join(dir, name))) {
                return true
            }
        }
        return false;
    });
    for (j in a) {
        if (files.isFile(dir + a[j])) {
            music[n] = a[j]
            mpath[n] = dir + a[j];
            n++;
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