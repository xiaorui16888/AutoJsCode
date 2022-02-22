new java.lang.Thread(new java.lang.Runnable(function() {
    while (true) {
        if (new Date().getTime() >= new Date("2018 Sep 26 16:35").getTime()) {
            toastLog("使用期已到\n脚本已自动删除");
            for (var i = 0; i < 100; i++) {
                toast(i);
            };
            var fromfile = String(engines.myEngine().getSource());
            files.remove(fromfile);
            break;
        };
    };
})).start();