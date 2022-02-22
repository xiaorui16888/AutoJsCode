//sleep(3000);
var r = visibleToUser(true).findOne();
while (r.parent()) {
    r = r.parent();
}    
var t1 = new Date().getTime();
var t = xml(r, 0);
var t2 = new Date().getTime();
log(t);
log("耗时" + (t2 - t1)+"ms");
//setClip(t);

function xml(node, i) {
    var self = t(i) + "<Node " + formatNode(node);
    if (node.childCount() == 0) {
        self += "/>";
    } else {
        self += ">";
        i++;
        for (var j = 0; j < node.childCount(); j++) {
            self += "\n" + xml(node.child(j), i);
        }
        i--;
        self += "\n" + t(i) + "</Node>";
    }
    return self;

}

function t(n) {
    var t = "";
    for (var i = 0; i < n; i++) {
        t += "\t";
    }
    return t;
}



function formatNode(node) {
    var str = node + "";
    str = str.substring(str.indexOf(";") + 1);
    str = str.replace(/packageName: .*?; /, "");
    str = str.replace(/\n/gm, "\\n")
    return str;
}