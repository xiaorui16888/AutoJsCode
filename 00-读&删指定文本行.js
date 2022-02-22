/*
**脚本作用:读取指定路径txt文本,读取有效的一行并删除该行
**脚本源码:Hyun Mai
**代码优化及测试:魚離ヤ吥開氺
**时间:2019.03.28
**测试系统:安卓8.1
**Auto.js版本: 4.1.1
优化内容:
正则匹配去除不规范行
如删除空白行,去除行内容前后空格等
正确读取有效行,并删除改行
*/
//测试读&&删/去空白行,去字符串前后空格

toastLog(read_delete());


function read_delete() {
    var path = "/sdcard/1/1.txt"; //txt文本路径
    var  reg  =  /^\s+|\s+$/g; //匹配无效空白行
    var txt = files.read(path).replace(reg, "").split("\n");
    let ret_text = txt[0];
    log(ret_text.length);
    if (txt != "") {
        txt.splice(0, 1);
        files.write(path, txt.join("\n"));
        if (ret_text.length > 0) {
            return ret_text.trim();
        }
    } else {
        return "没有号了";
    }

}