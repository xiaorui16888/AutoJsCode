"ui";
var sh;
var f;
threads.start(function() {
    sh = new Shell();
    f = open(files.path("./out.txt"), "w");
    sh.setCallback({
        onOutput: function(str) {
            f.write(str);
        }
    })
    sh.exec("su");
    sh.exec("getevent -t -l");
    toast("请不断双指捏合");
});

setTimeout(() => {
    sh.exit();
    f.close();
    dialogs.alert("请停止触摸")
        .then(() => {
            setTimeout(() => {
                app.viewFile(files.path("./out.txt"));
                finish();
            }, 2000);
        });;
}, 5000)