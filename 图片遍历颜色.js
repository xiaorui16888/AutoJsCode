//sleep(3000)
requestScreenCapture()

function run(num) {
    var img = images.read("/sdcard/找图存放/" + num + ".png")
    var imga2 = captureScreen()
    imga2 = images.clip(imga2, 135, 575, 946 - 135, 1076 - 575)

    var arrx = new Array()
    var len = 0
    for (var x = 195; x < 810; x += 10) {
        for (var y = 10; y < 500; y += 10) {
            if (!is_equal(img, imga2, x, y)) {
                //log((x + 135) + "," + (y + 575))

                arrx[len++] = x + 135
            }
            sleep(0.01)
        }
    }
    //img.recycle()
    imga2.recycle()
    if(img!=null){
        bmp=img.getBitmap();
        bmp.recycle()
    }
    if ((arrx[arrx.length - 1] - arrx[0]) < 150) {
        for (var i = 0; i < 6; i++) {
            if (arrx[i] == arrx[i + 1] == arrx[i + 2]) {
                arrx[0] = arrx[i]

            }

        }    
        if(num==101){
           // randomSwipe(220, randomNum(1111,1235),Math.floor((arrx[0] + 85-9+75)/10)*10 ,randomNum(1111,1235))
            //console.info(arrx[0] + 85 - 9)
            log("成功率不高，放弃")
        }else{
        //swipe(220, 1110, arrx[0] + 85 - 9, 1150, sj)
            randomSwipe(220, randomNum(1111,1235),Math.floor((arrx[0] + 85-9)/10)*10 ,randomNum(1111,1235))
            console.info( Math.floor(Math.floor((arrx[0] + 85-9)/10)*10))
        }
        return false
    } else {
        toastLog("计算不准确")
        
        return true
    }
    //log(arrx[arrx.length - 1] - arrx[0])
    //img.recycle()
    //imga2.recycle()
}
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
        break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
        break; 
            default: 
                return 0; 
            break; 
    } 
} 
function is_equal(img1, img2, x, y) {
    var im1 = colors.toString(images.pixel(img1, x, y))
    var im2 = colors.toString(images.pixel(img2, x, y))
    var threshold = 120
    if (Math.abs(colors.red(im1) - colors.red(im2)) < threshold && Math.abs(colors.green(im1) - colors.green(im2)) < threshold && Math.abs(colors.blue(im1) - colors.blue(im2)) < threshold) {
        return true
    } else {
        return false
    }
}

function bezierCreate(x1,y1,x2,y2,x3,y3,x4,y4){
    //构建参数
    var h=100;
    var cp=[{x:x1,y:y1+h},{x:x2,y:y2+h},{x:x3,y:y3+h},{x:x4,y:y4+h}];
    var numberOfPoints = 100;
    var curve = [];
    var dt = 1.0 / (numberOfPoints - 1);
    
    //计算轨迹
    for (var i = 0; i < numberOfPoints; i++){
        var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;
        var result_x, result_y;
    
        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;
    
        var t=dt*i
        tSquared = t * t;
        tCubed = tSquared * t;
        result_x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result_y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        curve[i] = {
            x: result_x,
            y: result_y
        };
    }

    //轨迹转路数组
    var array=[];
    for (var i = 0;i<curve.length; i++) {
        try {
            var j = (i < 100) ? i : (199 - i);
            xx = parseInt(curve[j].x)
            yy = parseInt(Math.abs(100 - curve[j].y))
        } catch (e) {
            break
        }
        array.push([xx, yy])
    }
    
    return array
}

/**
 * 真人模拟滑动函数
 * 
 * 传入值：起点终点坐标
 * 效果：模拟真人滑动
 */
function randomSwipe(sx,sy,ex,ey){
    //设置随机滑动时长范围
    var timeMin=1000
    var timeMax=3000
    //设置控制点极限距离
    var leaveHeightLength=500
    
    //根据偏差距离，应用不同的随机方式
    if(Math.abs(ex-sx)>Math.abs(ey-sy)){
        var my=(sy+ey)/2
        var y2=my+random(0,leaveHeightLength)
        var y3=my-random(0,leaveHeightLength)
    
        var lx=(sx-ex)/3
        if(lx<0){lx=-lx}
        var x2=sx+lx/2+random(0,lx)
        var x3=sx+lx+lx/2+random(0,lx)
    }else{
        var mx=(sx+ex)/2
        var y2=mx+random(0,leaveHeightLength)
        var y3=mx-random(0,leaveHeightLength)

        var ly=(sy-ey)/3
        if(ly<0){ly=-ly}
        var y2=sy+ly/2+random(0,ly)
        var y3=sy+ly+ly/2+random(0,ly)
    }

    //获取运行轨迹，及参数
    var time=[0,random(timeMin,timeMax)]
    var track=bezierCreate(sx,sy,x2,y2,x3,y3,ex,ey)
    
    //log("随机控制点A坐标："+x2+","+y2)
    //log("随机控制点B坐标："+x3+","+y3)
    log("随机滑动时长："+time[1])
    
    //滑动
    gestures(time.concat(track))
}

var num = 100
while (run(num++) && num <= 105) {
    sleep(300)
}




