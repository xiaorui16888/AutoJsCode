"ui";

let thread;
let date;
MAC();
thread = threads.start(function() {
    dete = new Date();
});

function MAC() {
    ui.layout(
        <vertical>
            <text id="time"></text>
            <horizontal gravity="center">
                <input w="auto" inputType="number" hint="请输入年" id="a"/>
                <input w="auto" inputType="number" hint="请输入月" id="b"/>
                <input w="auto" inputType="number" hint="请输入日" id="c"/>
            </horizontal>
            <horizontal gravity="center">
                <input inputType="number" hint="请输入时" id="d"/>
                <input inputType="number" hint="请输入分" id="e"/>
                <input inputType="number" hint="请输入秒" id="f"/>
            </horizontal>
            <button id="OK">确定</button>
            <button id="now">显示当前时间</button>
            <button id="exit">退出</button>
            <button id="demo">测试</button>
        </vertical>
    );

    ui.OK.on("click", function() {
        let a_ = ui.a.getText();
        let b_ = ui.b.getText();
        let c_ = ui.c.getText();
        let d_ = ui.d.getText();
        let e_ = ui.e.getText();
        let f_ = ui.f.getText();

        nullUI();

        let userTime = a_ + "-" + b_ + "-" + c_ + " " + d_ + ":" + e_ +":" + f_;

        thread = threads.start(function() {
            let theTime;
            while(true) {
                theTime = formatDate(date);
                if(theTime == userTime) {
                    let i = Math.ceil(random()*3);
                    log(i);
                    switch(i) {
                        case 1: media.playMusic("./res/Are you OK.mp3");break;
                        case 2: media.playMusic("./res/Hop.mp3"); break;
                        case 3: media.playMusic("./res/Saints of Rage - Stage.mp3");break; 
                    }
                    sleep(media.getMusicDuration());
                    exit();
                }
            }
        });
    });

    ui.now.on("click", function() {
        thread = threads.start(function() {
            let date0;
            while(true) {
            if(date0 != date) {
                date0 = date;
                ui.time.setText(date);
            }
        }
    });

    ui.exit.on("click", function() {
        exit();
    });

    ui.demo.on("click", function() {
        //nullUI();

        thread = threads.start(function() {
            let i = Math.ceil(random()*3);
            log(i);
            switch(i) {
                case 1: media.playMusic("./res/Are you OK.mp3"); break;
                case 2: media.playMusic("./res/Hop.mp3");break;
                case 3: media.playMusic("./res/Saints of Rage - Stage 1.mp3");break;
            }
            sleep(media.getMusicDuration());
            exit();
        });
    });
}

function nullUI() {
    ui.layout(
        <vertical bg="#000000">
            <text textColor="#ffffff">只许操作一次</text>
            <button id="exit">退出</button>
        </vertical>
    );

    ui.exit.on("click", function() {
        exit();
    });
}

function formatDate(datetime) {
    // 获取年月日时分秒值  slice(-2)过滤掉大于10日期前面的0
    var year = datetime.getFullYear(),
    month = ("0" + (datetime.getMonth() + 1)).slice(-2),
    date = ("0" + datetime.getDate()).slice(-2),
    hour = ("0" + datetime.getHours()).slice(-2),
    minute = ("0" + datetime.getMinutes()).slice(-2),
    second = ("0" + datetime.getSeconds()).slice(-2);
    // 拼接
    var result = year + "-"+ month +"-"+ date +" "+ hour +":"+ minute +":" + second;
    // 返回
    return result;
}