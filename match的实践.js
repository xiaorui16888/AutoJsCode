var nr = "W1School W2School W3SchoolW4SchoolW5School W6School W7School";

function 筛选(i){
    var patt = /W\dSchool/g;//筛选的正则表达式
    var YH = i.match(patt);//匹配的字符串集合
    var s = YH.length; //集合元素个数

    log(YH);//返回被匹配的字符串数组
    log("匹配个数为" + s);//返回匹配到的个数

    for(var m=0; m<s; m++) {//遍历出集合里每个元素
        log("第"+(m+1)+"字符为：" + YH[m] + "\n");
    }
}

筛选(nr)

