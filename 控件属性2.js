storage = storages.create("ABC");
//az = ["bounds", "checked", "className", "clickable", "depth", "desc", "drawingOrder", "id", "scrollable","text"]
az = ["className", "depth", "desc", "drawingOrder", "id", "text"]
var a = rowCount(27).className("android.support.v7.widget.RecyclerView");
a.findOne();
sleep(100);
b = new Array();
k=0;
 //god: for (i = 0; i < az.length; i++) {
god: for(var i in az){
    while (true) {
      if (id("name").text(az[i]).exists()) {
        b.push(id("name").text(az[i]).findOne().parent().child(1).getText());
          continue god;
      };
      a.findOne().scrollForward();
      sleep(100);
    };
    sleep(10);
  };
c=new Array();
n=0
for(var i in b){
    if(b[i]==null){
        az.splice(i-k,1);
        k++
        continue;
        };
    c[n]=b[i];
    n++
    };
sleep(300)
back();
sleep(300);
back();
aa = dialogs.multiChoice("属性", az);
bb = new Array();
for (var i in aa) {
  if (az[aa[i]] == "depth" || az[aa[i]]=="drawingOrder") {//有数字的属性在这里且一下
    bb[i] = az[aa[i]] + "(" + c[aa[i]] + ")";
  } else {
    bb[i] = az[aa[i]] + "(\"" + c[aa[i]] + "\")";
  }
};
cc = bb.join(".");
log(cc);
storage.put("a", cc);
device.vibrate(40);