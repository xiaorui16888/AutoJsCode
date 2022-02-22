"ui";
ui.layout(
    <vertical gravity="center_horizontal"> 
        <horizontal >
            <input id="input" w="800px" h="120px" margin="10px" padding="10px" textSize="15sp" gravity="center" />
            <button id="but" w="*" h="*" text="确定"/>
        </horizontal>
        <frame >
             <text id="text" w="auto" layout_gravity="left"/>      
             <text id="text1" w="auto" layout_gravity="right"/>      
        </frame>
        <VideoView id="video" w="auto" h="auto" />
        <horizontal margin="10px 40px 10px 40px" gravity="center">
            <button id="video_start_pause" text="播放"/>
            <button id="video_stop" text="停止"/>
            <button id="choose" text="选择"/>
        </horizontal>
    </vertical>
);

try {
    var path="/sdcard/Android/data/com.tencent.tmgp.sgame/files/Resources/Splash_move/Splash_test.mp4";
    //var path = "/sdcard/建记/视频/cgy.mp4";
    //var path = "/sdcard/DCIM/Video/V80727-190559.mp4";
    ui.video.setVideoPath(path);
    ui.video.start();
} catch (e) {
    toast("没有原视频，");
    toast("请自行点击选择，");
    toast("选择视频文件播放");
};

threads.start(function() {
    while (true) {
        ui.run(() => {
            ui.text.setText((ui.video.getCurrentPosition()/1000).toString());
            ui.text1.setText((ui.video.getDuration()/1000).toString());       
        });
    };
});


//Details(ui.video,"Seek");
//作者只完成了，播放和暂停，停止，进度跳转，选择文件播放，这些部分功能。(进度跳转功能不精确:不知道啥原因)
//会英语的可以用上面这段代码找一些其他的用法。


ui.video_start_pause.setOnClickListener(function() {
    if (ui.video.isPlaying()) {
        ui.run(() => {
            ui.video.pause();
            ui.video_start_pause.setText("播放");
        });
    } else {
        ui.run(() => {
            ui.video.start();
            ui.video_start_pause.setText("暂停");
        });
    };
});

ui.video_stop.setOnClickListener(function() {
    ui.run(() => {
        ui.video.stopPlayback();
    });
});
var fx, fy, cx, cy;
ui.video.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            fx = event.getRawX();
            fy = event.getRawY();
            return true;

        case event.ACTION_MOVE:
            return true;

        case event.ACTION_UP:
            cx = event.getRawX() - fx;
            cy = event.getRawY() - fy;
            if (Math.sqrt(cx * cx + cy * cy) > 50) {
                ui.run(() => {
                     ui.video.seekTo(ui.video.getCurrentPosition() + Math.round(cx*10));
                });
                //跳转进度。(不精准)
            };
            return true;
    }
    return true;
});


ui.choose.click(() => {
    threads.start(function() {
        var Apath = "/sdcard/DCIM";
        var path = listpath(Apath);
        //toast(path || "");
        if (path) {
            ui.run(function() {
                ui.input.setText(path);
                ui.video.setVideoPath(ui.input.getText().toString());
                ui.video.start();
                ui.video_start_pause.setText("暂停");
            });
        };
    });
});

ui.but.setOnClickListener(function() {
    ui.run(() => {
        ui.video.setVideoPath(ui.input.getText().toString());
        ui.video.start();
        ui.video_start_pause.setText("暂停");
    });
});


function listpath(Apath, Bpath) {
    Bpath = Bpath || "";
    var path = files.join(Apath, Bpath);
    var a = files.listDir(path, function(name) {
        return name.endsWith(".mp4") || files.isDir(files.join(path, name));
    }).sort();
    i = dialogs.select(path, a);
    if (i + 1) {
        path = files.join(path, a[i]);
        if (files.isDir(path)) {
            return listpath(Apath, files.join(Bpath, a[i]));
        } else {
            if (dialogs.confirm("确定文件？", a[i])) {
                //viewFile(path);
                return path;
            } else {
                return listpath(Apath, Bpath);
            }
        }
    } else {
        var ary = Bpath.split("/");
        if (ary.length && Bpath.length) {
            ary.pop();
            return listpath(Apath, ary.join("/"));
        }
    }
};


function Details(A, re) {
    threads.start(function() {
        console.show();
    });
    log(typeof(A));
    log(typeof(re));
    if (typeof(re) == "string") {
        re = eval("/" + re + "/i");
    };
    log(A);
    try {
        //A= A.sort();
        log(A.toString());

    } catch (e) {
        toast(e)
    };
    for (var i in A) {

        try {
            if (!re || re.test(i.toString())) {
                log(typeof(A[i]));
                log(i + "\n" + A[i].toString())
            };
        } catch (e) {
            toast(e)
        }
    };
};