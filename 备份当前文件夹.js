var fromFile = files.cwd();
var toFile = "/sdcard/备份脚本";

copyDir(fromFile, toFile);
toastLog("备份结束");

function copyDir(fromDir, toDir) {
    var fromDirFile = new java.io.File(fromDir);
var toDirFile = new java.io.File(toDir);
    var fun = arguments.callee;
    if (fromDirFile.isDirectory() && toDirFile.isDirectory()) {
        var toDirPath = files.join(toDirFile.getPath(), fromDirFile.getName());
        log(toDirPath);
        if (files.ensureDir(toDirPath)) {
            fromDirFile.listFiles().forEach(function(file) {
                if (file.isDirectory()) {
                    fun(file.getPath(), toDirPath);
                } else {
                    log(files.join(toDirPath, file.getName()));
                    files.copy(file.getPath(), files.join(toDirPath, file.getName()));
                };
            });
        };
    } else {

    };
};

function fileDeeplist2(file, C) {
    var list = file.listFiles().sort();
    list.forEach(function(file) {
        if (file.isDirectory()) {
            if ((!C && C != 0) || C > 0) {
                fileDeeplist2(file, C - 1);
            };
        } else {
            log(file.getName());
        };
    });
};