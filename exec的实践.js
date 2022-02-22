var nr = "W1School W2School W3SchoolW4SchoolW5School W6School W7School";

function 筛选(i){
    var patt = /W\dSchool/g;//筛选的正则表达式
    var result;
    var YH = 0;

    while ((result = patt.exec(i)) != null)  {
        //log(result)
        var a = result.index ;//这个匹配字符串的前一位位置
        var b = patt.lastIndex ;//这个匹配字符串的最后一个字符位置
        var c = result.input.substring(result.index,patt.lastIndex);//从字符串里提取一段字符
        
        log("字符串 开头：" + a + " 结尾：" + b + "\n" + "其字符为：" + c + "\n");
        
        YH++;//重复多少次就知道有多少个
    }
    log("匹配个数为" + YH);
    log(patt.exec(i).input);//返回被匹配的字符串数组
    log("字符个数为" + patt.exec(i).input.length + "\n");//返回被匹配的字符串数组
}

筛选(nr)

