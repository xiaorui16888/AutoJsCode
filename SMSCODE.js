var patt = /(?=[是|为|码|code])[^0-9a-zA-Z]*?([0-9a-zA-Z]{4,6})[^0-9a-zA-Z]*.|([0-9a-zA-Z]{4,6})[^0-9a-zA-Z]+(?=[是|为|码|code])/;
var str = global("%SMSRB");
var result = patt.test(str);
var code = "非验证码短信";
if (result) {
    var arr = patt.exec(str)
    if (arr.length >= 3 && arr[1] != undefined) {
        code = arr[1];
    }else{
        code = arr[2];
    }
}
console.log(code);
setGlobal("%SMSCODE",code);