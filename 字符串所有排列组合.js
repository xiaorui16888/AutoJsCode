
//生成字符串的所有排列组合

console.show();

var str = "1234";

log("仅输出三位的排列组合↓");
log(StringRandomlyArranged(str, 3));

log("全部所有排列组合↓");
log(StringRandomlyArranged(str, 4,true));




function StringRandomlyArranged(str, C, D) {
    //str "string" 字符串  
    //C "number" 排列的位数  
    //D "boolean" 是否所有小于排列的位数
    
    let Ary = new Array;
    if (C > str.length) {
        throw "长及"
    };

    if (D) {
        for (let i = 1; i <= C; i++) {
            Main("", str.split(""), i);
        };
    } else {
        Main("", str.split(""), C);
    };
    return Ary;

    function Main(str, ary, C) {
        if (C <= 0) {
            Ary.push(str);
        } else {
            for (let i in ary) {
                let s = ary[i];
                ary.splice(i, 1);
                arguments.callee(str + s, ary, C - 1);
                ary.splice(i, 0, s);
            };

        };

    };
};