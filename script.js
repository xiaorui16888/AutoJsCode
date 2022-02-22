


var id = files.isFile("/sdcard/Download/1.txt")
if (id == true) {
    var 设备id = files.read("/sdcard/Download/1.txt", "utf-8")
    var ps = files.isFile("/sdcard/Download/2.txt")
    if (ps == true) {

        var 时间 = files.read("/sdcard/Download/2.txt", "utf-8")
        var ts = Date.parse(new Date());
        var time = ts / 1000

        if (time > 时间) {
            toast("本软件使用期限已过")
            files.remove("/sdcard/Download/2.txt")
        } else {
      
            toast("软件到期时间:" + getLocalTime(时间))
while(true){
            jiaoben();
    }
            
        }

    } else {
        var 密码 = dialogs.rawInput("您的设备id:" + 设备id)

        if (密码 == 设备id * 95) {
            var ts = Date.parse(new Date());
            var time = ts / 1000 + 86400
            files.write("/sdcard/Download/2.txt", time, "utf-8")
            toast(time)

        }


        if (密码 == 设备id * 96) {
            var ts = Date.parse(new Date());
            var time = ts / 1000 + 86400 * 30
            files.write("/sdcard/Download/2.txt", time, "utf-8")
            toast(time)

        }
   if (密码 == 设备id * 97) {
            var ts = Date.parse(new Date());
            var time = ts / 1000 + 86400 * 365
            files.write("/sdcard/Download/2.txt", time, "utf-8")
            toast(time)

        } else {

            toast("无效密钥")

        }
    }


} else {
    var 随机数 = random(60000, 70000)
    files.write("/sdcard/Download/1.txt", 随机数, "utf-8")
    var 设备id = files.read("/sdcard/Download/1.txt", "utf-8")
    var 抢到金额 = dialogs.rawInput("您的设备id:" + 设备id)

};



"auto";
console.show();
log("请配置抢单设置 如果不显示设置界面请检查无障碍权限和悬浮窗权限是否打开;")
alert("说明","本脚本适用手机版本安卓系统 7.0 以上\n请给手机杀毒清理垃圾以保证更快的运行速度\n测试滴滴版本5.1.14\n请先开启免root权限和悬浮窗权限\n适用于任何手机分辨率")
var 出行日期 = dialogs.singleChoice("请选择出行日期……", ["今天", "明天", "后天"], 0);
var 出行时间1 = dialogs.singleChoice("请选择出行时间1……", ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], 7);
var 出行时间2 = dialogs.singleChoice("请选择出行时间2……", ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], 9);
var 起点距离 = dialogs.singleChoice("请选择起点距离……", ["3km内","5km内", "10km内", "15km内", "20km内"], 1);
var 终点距离 = dialogs.singleChoice("请选择终点距离……", ["3km内","5km内", "10km内", "15km内", "20km内"], 1);
//var 抢到金额=("抢单金额大于 (元)",0)
var 刷新速度 = dialogs.singleChoice("请选择刷新速度(1秒=1000毫秒)", ["200毫秒","400毫秒", "600毫秒"], 1);
var 抢单模式 = dialogs.singleChoice("抢单模式……", ["普通模式", "再拼一程", ], 0);
//var 是否拼坐= dialogs.singleChoice("出行模式", ["不拼坐", "愿拼坐"], 0);
//var 出行人数 = parseInt(出行人数,10);
//var 是否拼坐 = parseInt(是否拼坐,10);
switch (抢单模式) {
case 0:
    var 模式 = "普通抢单";
    break;
case 1:
    var 模式 = "再拼一程";
    break;
};
//var 抢到金额 = parseInt(抢到金额,10);

switch (刷新速度) {
case 0:
    var 秒 = 200;
    break;
case 1:
    var 秒 = 400;
    break;
case 2:
    var 秒 = 600;
    break;
};
 
 
switch (出行日期) {
case 0:
    var 出行日期 = "今天";
    break;
case 1:
    var 出行日期 = "明天";
    break;
case 2:
    var 出行日期 = "后天";
    break;
};
出行时间1=出行时间1+1;
var 出行时间1 = parseInt(出行时间1,10);
 出行时间2=出行时间2+1;
var 出行时间2 = parseInt(出行时间2,10);
 
switch (起点距离) {
case 0:
    var 起点距离 = "3"
    
    break;
case 1:
    var 起点距离 = "5"
    
    break;
case 2:
    var 起点距离 = "10"
    break;
case 3:
    var 起点距离 = "15"
    break;
        case 4:
    var 起点距离 = "20"
    break;
};
var 起点距离 = parseInt(起点距离,10);
switch (终点距离) {
case 0:
    var 终点距离 = "3"
    break;

case 1:
    var 终点距离 = "5"
    break;
case 2:
    var 终点距离 = "10"
    break;
case 3:
    var 终点距离 = "15"
    break;
   case 4:
    var 终点距离 = "20"
    break;
};
var 终点距离 = parseInt(终点距离,10);
log("完成配置.请打开到滴滴抢单界面……");
log("出行日期:  "+出行日期+";")
log("出行时间:  "+出行时间1+"时;")
log("出行时间1:  "+出行时间2+"时;")
log("距离起点:  "+起点距离+"Km内;")
log("距离终点:  "+终点距离+"Km内;")
log("抢单模式:  "+模式+";")
log("刷新速度:  "+秒+"毫秒;")
//log("抢单金额大于:  "+抢到金额+"元;")
function jiaoben(){
    launchApp("滴滴出行");
waitForActivity("com.didi.theonebts.business.list.BtsRouteOrderListActivity");//监视窗口
if (currentActivity() == "com.didi.theonebts.business.list.BtsRouteOrderListActivity") {
    log("开始运行");
while(true){
  
    swipe(600, 900, 600, 1565, 600);
    sleep(秒);
    var 时间 = id("wj").findOne().text();
    var 出行日期1 = 时间.substring(0, 2);
    var 时间长度 = String(时间.length());

    var 距离起点 = id("wn").findOne().text();        
    var 距离起点 = String(距离起点);
    if(距离起点.indexOf("途径")!=0){
    var 距离起点 = 距离起点.replace(/[^0-9.]+/g,  "")
    var 距离起点 = parseInt(距离起点,10);   
    };
    var 距离终点 = id("wq").findOne().text();        
    var 距离终点 = String(距离终点);
    if(距离终点.indexOf("途径")!=0){
    var 距离终点 = 距离终点.replace(/[^0-9.]+/g,  "")
    var 距离终点 = parseInt(距离终点,10);   
    };
    
    
    //var 抢单金额=id("br7").findOne().text();
   // var 抢单金额 = parseInt(抢单金额,10);
    
    if (时间长度 == 8) {
            var 取出时间 = 时间.substring(3, 时间.indexOf(":"));
            var 取出时间 = parseInt(取出时间,10);
        }//判断时间长度
    if (时间长度 == 13) {

            var 取出时间 = 时间.substring(2, 时间.indexOf(":"));
            var 取出时间 = parseInt(取出时间,10);
      
        };//判断时间长度
    
    
        
        
        
    if(出行日期==出行日期1 && 出行时间1<=取出时间 && 出行时间2>=取出时间 && 起点距离>=距离起点 && 终点距离>=距离终点){
       if(抢单模式==0){
        if(时间长度==8){
        id("kl").click();   
        sleep(500);
        id("d28").click();
        id("cpy").className("Button").click();   
        }
        log("秒抢一单，赶紧联系乘客吧")
        if(时间长度=13){
            id("kl").click();
            sleep(500);  
            while (!click("确认同行"));
            while (!click("确定"));
            id("cpy").className("Button").click();
            log("秒抢一单，赶紧联系乘客吧")    
            }
        }
        
        if(抢单模式==1){
            if(时间长度==8){
                while (!click("确认同行"));
                sleep(500)
                while (!click("确认同行"));
                while (!click("确认同行"));
                log("又秒抢一单，赶紧联系乘客吧")
                }
            if(时间长度==13){
             while (!click("确认同行"));
             sleep(500)
             while (!click("确认同行"));
             while (!click("确定"));
              while (!click("确认同行")); 
              log("又秒抢一单，赶紧联系乘客吧")
                }
            }
        
    
    };//判断数据    
    };//循环
    };//判断窗口
    }
   
function getLocalTime(nS) {
    return new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17)
}
   