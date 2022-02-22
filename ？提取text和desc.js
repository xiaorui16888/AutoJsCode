console.show()
//橘猫
var bao = currentPackage();
var i = packageName(bao).find();
for (l = 0; l < i.length; l++) {
    if (i[l].text() != "") {
        log("text=>" + i[l].text());
        sleep(50);
    };
    if (i[l].desc() != null) {
        log("desc=>" + i[l].desc());
        sleep(50);
    };                
};
toastLog("提取完成");