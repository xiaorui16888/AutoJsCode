//console.show();
storage = storages.create("ABC");
//while(true){
var a = rowCount(27).className("android.support.v7.widget.RecyclerView");
var b = a.findOne().childCount();
//a.findOne().scrollBackward();
while (true) {
  if (!a.findOne().scrollBackward()) {
    break;
  }
    sleep(50);
};
i = 0;
ki = 0;
c = new Array();
ck = new Array();
while(true) {
  while (ki < b) {
    c[i] = a.findOne().child(ki).child(0).getText();
    c[i + 1] = a.findOne().child(ki).child(1).getText();
   // log(i / 2, c[i], c[i + 1]);
    ck[i / 2] = c[i] + "==" + c[i + 1];
    ki += 1;
    i += 2;
  };
  if (!a.findOne().scrollForward()) {
    break;
  }
  sleep(50);
  ki = a.findOne().childCount() - (27 - b);
  b = a.findOne().childCount();
};
sleep(300)
back();
sleep(300);
back();
sz1 = ["depth(" + c[21] + ")", "className(\"" + c[9] + "\")", "desc(\"" + c[23] + "\")", "id(\"" + c[35] + "\")", "columnCount(" + c[15] + ")", "rowCount(" + c[45] + ")", "text(\"" + c[53] + "\")"] //      vv
kk = 0;
if (c[23] == null) {
  sz1.splice(2, 1, 99);
  kk++;
};
if (c[35] == null) {
  sz1.splice(3, 1, 99);
  kk++;
};
if (c[53] == null) {
  sz1.splice(6, 1, 99);
  kk++;
};
for (h = 0; h < kk; h++) {
  sz1.splice(sz1.indexOf(99), 1)
}
a0 = dialogs.multiChoice("用哪几个属性？", sz1);
a0th = a0.length;
    device.vibrate(40);//振动
km = new Array();
for (m = 0; m < a0th; m++) {
  km[m] = sz1[a0[m]];
};
zz = km.join(".")
//console.show();
storage.put("a", zz);
//setClip(zz);

sleep(200);
    























//