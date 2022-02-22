/*
采用暴力遍历获取的方法。(有些图标错误或错位或者没有,原因不晓得)
保存路径。"/sdcard/装备图标/"
作者找到了一些装备图标的链接的一些规律。
开头为1。
从攻击到辅助分别是1~7。
从初级到高级分别是1~3。
假设每一级最多有11个装备。
例如攻击类高级装备第3个是无尽战刃。那么它的链接为。"1"+1+3+3+".jpg;"
例如防御类高级装备第2个是霸者重装。那么它的链接为。"1"+3+3+2+".jpg;"
*/




//https://game.gtimg.cn/images/yxzj/img201606/itemimg/1424.jpg






console.show();
var DirPath = "/sdcard/装备图标/";


let sum = new Array;

events.on("exit", function() {
    log("总数", sum);
});

for (let j = 1; j <= 7; j++) {
    let dirPath1 = DirPath + j + "/";
    files.ensureDir(dirPath1);

    for (let k = 1; k <= 3; k++) {
        let dirPath2 = dirPath1 + k + "/";
        files.ensureDir(dirPath2);
        for (let l = 1; l <= 11; l++) {
            let fileName = "1" + j + k + l + '.jpg';
            let absPath = dirPath2 + fileName;
            if (!files.exists(absPath)) {
                let res = http.get("https://game.gtimg.cn/images/yxzj/img201606/itemimg/1" + j + k + l + ".jpg");
                if (res.statusCode == 200) {
                    files.writeBytes(absPath, res.body.bytes());
                    log("ok ", "1" + j + k + l);
                    sum.push("1" + j + k + l);

                } else {
                    log("no ", "1" + j + k + l);

                };
            };
        };
    };
};