sys = "运行脚本后，每当遇到\"布局范围分析\"界面，当你滑倒底时，3秒之内滑倒顶端，就会自动复制属性。";
alert(sys);
   var a = rowCount(29).className("androidx.recyclerview.widget.RecyclerView");
while (true) {
    log(1)

   a.findOne();
    log(2)
    var ab0 = className("android.widget.TextView").text("text");
    if (ab0.findOne()) {
        log(3)
        device.vibrate(20);
        var ab1 = className("android.widget.TextView").text("属性");
        toast("3秒滑到顶端就开始收集属性");
        //sleep(3000);
        if (ab1.findOne(3000)) {
            log(4);
            if(收集()=="取消"){
                continue;
                }
        } else {
            //device.vibrate(20);
            toastLog("3秒已过");
        };
    };
    sleep(500);
};
//内置存储.clear();

function 收集() {
   // var a = rowCount(23).className("android.support.v7.widget.RecyclerView");
   // var a = rowCount(29).className("androidx.recyclerview.widget.RecyclerView");
   if (a.findOne()) {
        var 内置存储 = storages.create("ABC");
        //可以自己添加想收集的名字
        var az = ["indexInParent","className", "bounds", "depth", "desc", "drawingOrder", "id", "text"];
        var b = []
        threads.start(function() {
            while (true) {
                sleep(300);//调节翻页间隔
                a.findOne().scrollForward();
            };
        });
        mm = {}
        for (var i in az) {
            b[i] = text(az[i]).findOne().parent().child(1).getText();
            if (az[i] == "bounds") {
                zzx = b[i];
                b[i] = null;
            };
            mm[az[i]] = b[i]
        };
        threads.shutDownAll();
        sleep(300)
        press(5, 1600, 10);
        sleep(300);
        back();
        b = []
        az=[]
        for (i in mm) {
            if (mm[i] != null) {
                az.push(i);
                b.push(mm[i]);
            }
           /*
            if(mm[i]==null){
                eval("delete mm."+i)
                }*/
        }
        
       az.push("取消");
        aa = dialogs.multiChoice("属性", az);
        bb = new Array();
        asd: for (var i in aa) {
            if (az[aa[i]] == "取消") {
                log("取消");
                return "取消";
                //exit();
            }
            if(wh(b[aa[i]])=="Number"){
                bb[i] = az[aa[i]] + "(" + b[aa[i]] + ")";
            } else {
                bb[i] = az[aa[i]] + "(\"" + b[aa[i]] + "\")";
            };
        };
        cc = bb.join(".");
        log(cc,zzx)
        内置存储.put("a", cc);
        内置存储.put("b", zzx);
        device.vibrate(27);
    }
};



function wh(a) {
        if ((a * 1).toString() == "NaN") {
            return "string";
        } else {
            return "Number";
        };
};