importPackage(Packages.net.lingala.zip4j.core);

let 压缩包 = "/sdcard/test.zip";
let 解压目录 = "/sdcard/test";

new ZipFile(压缩包).extractAll(解压目录);