
// by autojs --摇拽的稻草

var window = floaty.rawWindow(
    <frame>
        <img id="action" src="file:///sdcard/脚本/守约/miao.png"  circle="true" />
    </frame>
);

setInterval(() => { }, 1000);
//window.setTouchable(false);
window.setSize(120,120)
window.setPosition(1900, 240);
requestScreenCapture();
var shouyue = images.read("/sdcard/脚本/守约/test.png");   //守约头像9*9

var kaiqi = 0;

//启动
window.action.on("click", () => {
    if (kaiqi == 0) {
        kaiqi = 1;
        threads.start(function () {
            qidong();
            window.setPosition(1900, 240);
            kaiqi = 0;
        });

    } else {
        kaiqi = 0;
        threads.shutDownAll();
    }



})

//长安中断
// window.action.on("long_click",()=>{
//     threads.start(function () {
//         zhegai(300, 300);
//     });
// })

function qidong(){

    while (true) {
        var sbzj = shibieziji()
        if (sbzj) {
            threads.start(function(){

                zhegai(sbzj.x,sbzj.y);  //屏蔽其他区域
            });
            sleep(150)

            var ttt = 0;
            while (true) {
                var dfwz = shibiediren(sbzj.x, sbzj.y)  //固定点开镜无需自己位置只需敌方
                
                if (dfwz) {
                    if(ttt==0){
                        ttt=1;
                        var dfhudu000 = Math.atan2(sbzj.y-dfwz.y,dfwz.x-sbzj.x);
                        dfhudu000 = dfhudu000*180/Math.PI
                        log(dfhudu000)
                        zhegai2(sbzj.x,sbzj.y,-dfhudu000)
                    }

                    var dfhudu0 = Math.atan2(sbzj.y-dfwz.y,dfwz.x-sbzj.x);  //Y轴特殊相减,得到敌方弧度
                    var bianjiehu = dfhudu0-50*Math.PI/180
                    threads.start(function(){
                        sleep(1238)  //此处加入手势计算数据的时间  以及运行手势的细小时间共0.008 s   但是不知道什么原因就是要多加30ms才准确
                        dongtaidaduan(sbzj.x,sbzj.y,bianjiehu)
                    });
                    shoushi(sbzj.x, sbzj.y, dfwz.x, dfwz.y);
                    break;



    
                }else{log("没有找到敌人");}
    
            }
    
            break;
        }
    
    }


}






//识别敌人一次

function shibiediren(myx, myy) {
    if (myx < 115) {
        var xzhou = 0
    } else {
        var xzhou = myx - 108
    };

    if (myy < 115) {
        var yzhou = 0
    } else {
        var yzhou = myy - 108
    };

    var tu = captureScreen();
    var p = images.findMultiColors(tu, "#eb1f1f", [[8, 0, "#ed1f1e"], [22, 11, "#e5191a"]], {
        region: [xzhou, yzhou, 216, 216],
        threshold: 8
    });//+5   +20

    if (p) {
        //修正敌方坐标
        return {x:p.x + 5,
            y:p.y +20
        }

    }else{
        return null;
    }


}

//动态识别敌人并计算打断时间                悬浮窗追踪

function dongtaidaduan(myx, myy, bianjiehu) {
    var time = new Date();
    var dfwzx0 = null;
    var dfwzy0 =null; //准备记录

    while (true) {
        var dfwz = shibiediren(myx, myy);
        
        if (dfwz) {
            
            

            //如果有上一次的坐标数据则  推算出预判坐标     
            if (dfwzx0) {
                var yupanx = dfwz.x + (dfwz.x - dfwzx0)*4;
                var yupany = dfwz.y + (dfwz.y - dfwzy0)*4;

            }else{
                var yupanx = dfwz.x;
                var yupany = dfwz.y;
            }

           // dfwz.x += -5;
            //dfwz.y += -5;



            var dx = yupanx - myx;//x悬浮窗追踪
            var dy = yupany - myy;//y
            var h = Math.sqrt(dx * dx + dy * dy);
            var xz = 1645 + 232 * dx / h
            var yz = 747 + (232 * dy / h)
            window.setPosition(xz - 60, yz - 60);
           // log("敌方坐标"+yupanx+"and"+yupany + "我方坐标" +myx+"and"+myy)

            var dfhudu0 = Math.atan2(myy - yupany, yupanx - myx);  //Y轴特殊相减
            var julihu = dfhudu0 - bianjiehu
            var Tdaodi = (julihu / (Math.PI / 36)) * 100   //每100ms  5度  需要多少ms?
            log("需要的时间是   " + Tdaodi + "ms")

            var time2 = new Date();
            log ("当前已经经过"+(time2-time))
            if ((time2 - time) - Tdaodi > 0) {
                press(1675, 940, 1)
                log("本次误差（ms）"+(time2-time-Tdaodi))
               // toast("发射")
                return;
            }

            dfwzx0 = dfwz.x;
            dfwzy0 = dfwz.y;   //记录
            sleep(20);


        }



    }

}



//识别自己位置得到x  y
function shibieziji() {

    var tu = captureScreen();
    var pmy = findImage(tu, shouyue, {
        region: [0, 0, 380, 380]
    });//+11  -4
    if (pmy) {
        return {x:pmy.x + 11,
            y:pmy.y - 4
        }
    }else{
        return null;
    }


}



//手势
function shoushi(wfx,wfy,dfx,dfy) {

    var points = [3200];
    var r = 300;
    var x1 = 1645;
    var y1 = 747;
    var dfx =dfx-wfx;
    var dfy=wfy-dfy

    points.push([1645, 747]);//首个默认不计，相隔26,   1.6s开镜
    var xhd = Math.atan2(dfy, dfx) - 54.525 * Math.PI / 180; //减去54.525°+ 接入轨迹的角度   写入敌方坐标   myy-dfy特殊相减

    //开始画初始线11组下滑缓冲数据，画完+°
    for (var changd = 26172; changd <= 287892; changd +=26172 ) {

        var xshi = x1 + Math.cos(xhd) * changd/1000;
        var yshi = y1 - Math.sin(xhd) * changd/1000;
        points.push([parseInt(xshi), parseInt(yshi)]);
       
    }
    //log(points)
    xhd += (4.525 * Math.PI / 180)
    var x = x1 + Math.cos(xhd) * r;
    var y = y1 - Math.sin(xhd) * r;
    points.push([parseInt(x), parseInt(y)]);
    //接入轨道,加入4.525度     第12组


    for (var t = 1; t <= 20; t++) {
        xhd += (Math.PI / 180) * 5;   //每次加5°
        var x = x1 + Math.cos(xhd) * r;
        var y = y1 - Math.sin(xhd) * r;
        points.push([parseInt(x), parseInt(y)]);
        
    }//20组数据
    //log(points)
    //log(1)   0.003 s  计算完成
    gesture.apply(null, points);

}

function zhegai(myx,myy,jiaodu){
    var window = floaty.rawWindow(
        <frame>
            <img id="action" src="file:///sdcard/脚本/守约/mzj.png" />
        </frame>
    );

   

    window.setSize(216,216)
    setTimeout(()=>{
        window.close();
    }, 3000);
    window.setTouchable(false);
    window.setPosition(myx-108, myy-108);

    

}

function zhegai2(myx,myy,jiaodu){
    var window2 = floaty.rawWindow(
        <frame>
            <img id="action" src="file:///sdcard/脚本/守约/quan.png" rotation ={jiaodu} />
        </frame>
    );

    window2.setSize(216,216)
    setTimeout(()=>{
        window2.close();
    }, 3000);
    window2.setTouchable(false);
    window2.setPosition(myx-108, myy-108)
}