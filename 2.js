pat = "/storage/emulated/0/自动精灵/图.zjs"
if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}
a = dq(pat)
b = a.split("\r\n");
b.pop();
b.shift();
//console.show()
for(i in b){
bb = b[i]
//bb=b[b.length-1]
c = JSON.parse(bb);
k = c.type
log(k)
eval(k + "(c)")
if(k=="点击图片"){
    var sm_img = images.fromBase64(img_base64)
while (true) {
    var img = captureScreen();
    var point = findImage(img, sm_img);
    log(point);
    if (point == null) {
        //sm_img.recycle();
        img.recycle();
    } else {
        press(point.x+(w/2),point.y+(h/2),16);
        break;
    }
    sleep(200);
}
}
sleep(500)
}
function 点击图片(c) {
    img_base64 = c.posData.imageData.data
    w=c.posData.imageData.imageWidth
    h=c.posData.imageData.imageHeight
    to_jump = c.jumpToPosition
    cs = c.repeatCount
   
    log(to_jump, cs,w,h)
}

function 点击(c) {
    x = Math.round(c.posData.x.split("%")[0] / 100 * 1080)
    y = Math.round(c.posData.y.split("%")[0] / 100 * 2261)
    tim = c.duration
    if (tim = "undefined") {
        tim = 100
    }
    tie = c.delay
    if (tie = "undefined") {
        tie = 1000
    }
    // return [x,y,tim,tie]
    sleep(tie)
    press(x, y, tim)
}

function dq(k) {
    let file = open(k);
    let text = file.read();
    return text;
    file.close();
};

function kk(mm) {
    for (i in mm) {
        df = mm[i]
        as = typeof(df);
        sd = df.toString().length
        if (sd > 50 || as == "object") {
            df = "太多了"
        }
        setClip(i)
        log(i, as, df)
        if (as == "object") {
            kk(mm[i]);
        };
        sleep(200)
    }
}