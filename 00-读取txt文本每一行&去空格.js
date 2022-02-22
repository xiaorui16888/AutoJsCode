
var txtpath = "/sdcard/1/1.txt";
//读取指定文件每一行
//arr为数组,储存1.txt里的每一行arr[0]表示第一行内容
var arr = readFile(txtpath);

arr.forEach(vv => {
    toastLog(Trim(vv));
    sleep(1000);
})


function readFile(txtpath) {
    let txt = open(txtpath, mode = "r", encoding = "utf-8");
    let arr = txt.readlines();
    txt.close();
    return arr;
}

//去除前后空格
function Trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}