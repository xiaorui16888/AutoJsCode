let str;
while(true) {
    str = getStr(dialogs.rawInput("你要说？"));
    alert(str);
}
function getStr(myText) {
    if(! myText)
        exit();
    let res = myText;
    if(res.indexOf("？") != -1)
        res = res.replace("？", "！");
    if(res.indexOf("吗") != -1)
        res = res.replace("吗", "");
    if(res.indexOf("你是") != -1)
        res = res.replace("你是", "你才是");
    return res;
}