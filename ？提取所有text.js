var bao = currentPackage();
var i = packageName(bao).find();
for (l = 0; l < i.length; l++) {
    if (i[l].text() != "") {
        log(i[l].text());
    };
};