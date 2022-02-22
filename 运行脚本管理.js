var engine1 = {
        all: engines.all(),
        num: [],
        filePath: []
    },
    sdcardPath = files.getSdcardPath(),
    yxrz = false;
for (let i = 0; i < engine1.all.length;) {
    let a = engine1.all[i].getSource();
    if (a) {
        engine1.filePath.push(a.toString().replace(/^\/sdcard/, sdcardPath));
        engine1.num.push(engine1.all[i].toString().substr(13, 7));
        i++;
    } else {
        engine1.all.splice(i, 1);
    }
}

setInterval(mains, 800);

function mains() {

    //  数据准备
    let engine2 = {
        all: engines.all(),
        num: [],
        filePath: []
    };
    for (let i = 0; i < engine2.all.length;) {
        let a = engine2.all[i].getSource();
        if (a) {
            engine2.filePath.push(a.toString().replace(/^\/sdcard/, sdcardPath));
            engine2.num.push(engine2.all[i].toString().substr(13, 7));
            i++;
        } else {
            engine2.all.splice(i, 1);
        }
    }

    //  脚本文件重复执行判断
    for (let i = 0; i < engine2.num.length; i++) {
        let a = engine1.num.indexOf(engine2.num[i]);
        if (a == -1) {
            a = engine1.filePath.indexOf(engine2.filePath[i]);
            if (a != -1) {
                engine1.all[a].forceStop();
                if (yxrz) {
                    log("48  " + engine1.all[a]);
                    log("49  " + engine2.all[i]);
                }
            }
        }
    }

    //  数据准备
    sleep(200);
    engine2.all = engines.all();
    engine2.filePath = [];
    for (let i = 0; i < engine2.all.length;) {
        let a = engine2.all[i].getSource();
        if (a) {
            engine2.filePath.push(a.toString().replace(/^\/sdcard/, sdcardPath));
            i++;
        } else {
            engine2.all.splice(i, 1);
        }
    }

    //  剩余脚本重复判断
    for (let i = engine2.filePath.length - 1; i >= 0; i--) {
        for (let a = i - 1; a >= 0; a--) {
            if (engine2.filePath[a] == engine2.filePath[i]) {
                engine2.all[i].forceStop();
                if (yxrz) {
                    log("74  " + engine2.all[i]);
                }
                break
            }
        }
    }

    // 下次数据准备
    sleep(200);
    engine1.all = engines.all();
    engine1.num = [];
    engine1.filePath = [];
    for (let i = 0; i < engine1.all.length;) {
        let a = engine1.all[i].getSource();
        if (a) {
            engine1.filePath.push(a.toString().replace(/^\/sdcard/, sdcardPath));
            engine1.num.push(engine1.all[i].toString().substr(13, 7));
            i++;
        } else {
            engine1.all.splice(i, 1);
        }
    }
}