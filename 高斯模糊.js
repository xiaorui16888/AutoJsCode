"ui";
//console.show();
ui.layout(
    <vertical id="vertical">
      <frame>
      <text id="text" w="auto" layout_gravity="left"/>      
      <text id="text1" w="auto" layout_gravity="right"/>      
      </frame>
      <img id="img" w="*" bg="#ffffffff"/>
    </vertical>
);

importClass(android.graphics.Paint);
//importClass(android.graphics.Canvas);
importClass(android.graphics.Bitmap);
threads.start(function() {
    try {
        var path =listpath("/sdcard");
        var img = images.read(path);
        var bitmap = Bitmap.createBitmap(img.getWidth(), img.getHeight(), Bitmap.Config.ARGB_8888);
        var canvas = new Canvas(bitmap);
        canvas.drawARGB(255, 0, 0, 0);
        var paint = new Paint();
        paint.setStrokeWidth(1);
        var s = 3;
        for (var x = 0; x < img.getWidth(); x++) {
            for (var y = 0; y < img.getHeight(); y++) {
                var a = 0,
                    r = 0,
                    g = 0,
                    b = 0,
                    k = 0;
                for (var xi = -s; xi < s; xi++) {
                    for (var yi = -s; yi < s; yi++) {
                        var jx = x + xi,
                            jy = y + yi;
                        if (jx < 0 || jx >= img.getWidth()) {
                            continue
                        };
                        if (jy < 0 || jy >= img.getHeight()) {
                            continue
                        };
                        k++;
                        var color = images.pixel(img, jx, jy);
                        //log(color);
                        a += colors.alpha(color);
                        r += colors.red(color);
                        g += colors.green(color);
                        b += colors.blue(color);
                    };
                };
                a = Math.round(a / k);
                r = Math.round(r / k);
                g = Math.round(g / k);
                b = Math.round(b / k);
                paint.setARGB(a, r, g, b);
                //log(a/k, r/k, g/k, b/k);
                canvas.drawPoint(x, y, paint);
                ui.run(function() {
                    ui.text.setText(txt(x, y));
                    ui.text1.setText(txt(a, r, g, b));
                    //ui.vertical.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(a, r, g, b)));
                    ui.img.setImageBitmap(bitmap);
                });
            };
        };
    } catch (e) {
        toast(e);
    }
});

function txt() {
    var T = new Array;
    for (var i = 0; i < arguments.length; i++) {
        T.push(arguments[i].toString());
    };
    return T.join(" ");
};

function listpath(Apath, Bpath) {
    Bpath = Bpath || "";
    var path = files.join(Apath, Bpath);
    var a = files.listDir(path, function(name){
            return files.isFile(files.join(path,name))||files.isDir(files.join(path,name));
        }).sort();        
    i = dialogs.select(path, a);
    if (i + 1) {
        path = files.join(path, a[i]);
        if (files.isDir(path)) {
            return listpath(Apath, files.join(Bpath, a[i]));
        } else {
            if (dialogs.confirm("确定文件？", a[i])) {
                //viewFile(path);
                return path;
            } else {
                return listpath(Apath, Bpath);
            }
        }
    } else {
        var ary = Bpath.split("/");
        if (ary.length && Bpath.length) {
            ary.pop();
            return listpath(Apath, ary.join("/"));
        }
    }
};
