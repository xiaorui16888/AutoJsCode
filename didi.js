"auto";
console.show();


log("使用说明;\n{本程序适用于安卓系统7.0以上版本(含7.0)}\n{音量上键为停止按钮}\n{需开启悬浮窗权限和无障碍权限具体看教程}\n{为了更好的体验请开始前对设备清理加速}")
var 设备id=random(10000, 100000)
var 测试= 设备id*2+639-367+264976;
var 月卡= 设备id*3+2-3+39-1000;
var 年卡= 设备id*4-2-3+39-1000;
var time = String(Date.parse(new Date()));
var ii=files.exists("/sdcard/pass.txt");
if(ii){
 var file = open("/sdcard/pass.txt");
 var text =parseInt(file.read());  
 var 到期时间1=时间转换(text);

    if(text>time){
    alert("到期时间:\n"+到期时间1); 
    抢单()	
        }else{
     alert("注册码已过期")
     files.remove("/sdcard/pass.txt")
      exit();
            }
    
  
    }else{
        
   var 密码=dialogs.input("您的设备id为;"+设备id)
   if(密码==测试){
       var 时间戳=parseInt(time)+86400000;
       files.write("/sdcard/pass.txt", 时间戳, "utf-8")
       var 到期时间1=时间转换(时间戳);
       alert("到期时间;"+到期时间1)
	   抢单()
       }else{
if(密码==月卡){
       var 时间戳=parseInt(time)+2592000000;
       files.write("/sdcard/pass.txt", 时间戳, "utf-8")
    var 到期时间1=时间转换(时间戳);
       alert("到期时间;"+到期时间1)
	   抢单()
       }else{
if(密码==年卡){
       var 时间戳=parseInt(time)+31536000000;
       files.write("/sdcard/pass.txt", 时间戳, "utf-8")
    var 到期时间1=时间转换(时间戳);
       alert("到期时间;"+到期时间1)
	   抢单()
       }else{
alert("注册码错误\n请联系作者销售人员");
           exit()
}

}

}
   
};//判断文件





  

function 时间转换(ii){
var d=new Date(ii);
var hour=d.getHours();
var minute=d.getMinutes();
hour=hour<10?"0"+hour:hour;
var year=d.getFullYear();
var month=d.getMonth()+1;
var date=d.getDate();
var day=d.getDay();
tip=year+"年"+month+"月"+date+"日"+hour+"时 到期。";
return(tip)
}



function 抢单(){
    

var 出行日期 = dialogs.singleChoice("请选择出行日期……", ["今天", "明天", "后天"], 0);
var 出行时间1 = dialogs.singleChoice("请选择出行时间1(时)……", ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], 7);
var 出行时间2 = dialogs.singleChoice("请选择出行时间2(时)……", ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"], 9);
var 起点距离 = dialogs.singleChoice("请选择起点距离……", ["抢距离起点3km内订单","抢距离起点5km内订单", "抢距离起点10km内订单", "抢距离起点15km内订单"], 1);
var 终点距离 = dialogs.singleChoice("请选择终点距离……", ["抢距离终点3km内订单","抢距离终点5km内订单", "抢距离终点10km内订单", "抢距离终点15km内订单"], 1);
//var 出行人数= dialogs.singleChoice("请设置要抢的订单人数", ["1人", "2人","3人"], 0);
var 抢单模式 = dialogs.singleChoice("抢单模式……", ["普通模式", "再拼一程", ], 0);
var 是否拼坐= dialogs.singleChoice("是否拼坐", ["愿拼坐", "不拼坐"], 0);
    var 出行人数 = parseInt(出行人数,10);
var 是否拼坐 = parseInt(是否拼坐,10);
var 抢单速度= dialogs.singleChoice("刷新速度", ["300毫秒（特快）", "500毫秒（中等）", "800毫秒（较慢）"], 0);

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
    
switch (抢单速度) {
case 0:
    var 抢单速度 = "300";
    break;
case 1:
    var 抢单速度 = "500";
    break;
case 2:
    var 抢单速度 = "800";
    break;
};
    
    
出行时间1=出行时间1+1;
var 出行时间1 = parseInt(出行时间1,10);
 出行时间2=出行时间2+1;
var 出行时间2 = parseInt(出行时间2,10);
 
switch (起点距离) {
case 0:
    var 起点距离 = "3";
    
    break;
case 1:
    var 起点距离 = "5";
    
    break;
case 2:
    var 起点距离 = "10";
    break;
case 3:
    var 起点距离 = "15";
    break;
        
        
};
    
var 起点距离 = parseInt(起点距离,10);
switch (终点距离) {
case 0:
    var 终点距离 = "3";
    break;

case 1:
    var 终点距离 = "5";
    break;
case 2:
    var 终点距离 = "10";
    break;
case 3:
    var 终点距离 = "15";
    break;

        
};
    log("配置参数如下;")
    log("出发日期【"+出行日期+"】");
    log("出发时间【"+出行时间1+"时-"+出行时间2+"时】");
    log("距离起点【"+起点距离+"km内】");
    log("距离终点【"+终点距离+"km内】");
    log("刷新速度【"+抢单速度+"毫秒(每次)】");
    
    
var 终点距离 = parseInt(终点距离,10);
log("完成配置.请打开到滴滴抢单界面……");
launchApp("滴滴出行");

  
    
    
    
    
    log("开始抢单");
while(true){
  waitForActivity("com.didi.theonebts.business.list.BtsRouteOrderListActivity");//监视窗口
 if (currentActivity() == "com.didi.theonebts.business.list.BtsRouteOrderListActivity") {
    swipe(600, 900, 600, 1665, 600);
    sleep(抢单速度);
    
     
     
     
     
    var 时间 = id("wj").findOne().text();
    var 出行日期1 = 时间.substring(0, 2);
    var 时间长度 = String(时间.length);
	
    var 距离起点 = id("wn").findOne().text();        
    var 距离起点 = String(距离起点);
    if(距离起点.indexOf("途径")!=0){
    if(距离起点.indexOf("道")!=0){
    var 距离起点=距离起点.substring(距离起点.indexOf("道"), 距离起点.length);
	var 距离起点 = 距离起点.replace(/[^0-9.]+/g,  "");
    var 距离起点 = parseInt(距离起点,10);   
    }else{
    var 距离起点 = 距离起点.replace(/[^0-9.]+/g,  "")
    var 距离起点 = parseInt(距离起点,10);
        
        
    };
    };
    var 距离终点 = id("wq").findOne().text();        
    var 距离终点 = String(距离终点);
    if(距离终点.indexOf("途径")!=0){
    if(距离终点.indexOf("道")!=0){
    var 距离终点=距离终点.substring(距离终点.indexOf("道"), 距离终点.length);
	var 距离终点 = 距离终点.replace(/[^0-9.]+/g,  "");
    var 距离终点 = parseInt(距离终点,10);   
    }else{
    var 距离终点 = 距离终点.replace(/[^0-9.]+/g,  "")
    var 距离终点 = parseInt(距离终点,10);
        };
        };
    
    if (时间长度 == 8) {
            var 取出时间 = 时间.substring(3, 时间.indexOf(":"));
            var 取出时间 = parseInt(取出时间,10);
        }//判断时间长度
    if (时间长度 == 13) {

            var 取出时间 = 时间.substring(2, 时间.indexOf(":"));
            var 取出时间 = parseInt(取出时间,10);
      
        };//判断时间长度
        var 是否拼坐1 = id("bqr").className("TextView").drawingOrder("2").findOne().text();
        var 是否拼坐2 = id("bqr").className("TextView").drawingOrder("1").findOne().text();
        var 是否拼坐3 = id("bqr").className("TextView").drawingOrder("0").findOne().text();
     
     //var 是否拼坐2 = id("bqr").drawingOrder("2").findOne().text();
    
        
        var 是否拼坐5=是否拼坐1+是否拼坐2+是否拼坐3;
     
     log(是否拼坐5);
     if(是否拼坐5.indexOf("愿拼座")!=0){
       var  愿拼坐=0;
         }else{
           var  愿拼坐=1;
             };
  log(愿拼坐);
    if(出行日期==出行日期1 && 出行时间1<=取出时间 && 出行时间2>=取出时间 && 起点距离>=距离起点 && 终点距离>=距离终点){
       if(是否拼坐==愿拼坐){
        if(抢单模式==0){
        if(时间长度==8){
        id("kl").click();
            //com.didi.carmate.detail.view.BtsDetailPageActivity
        waitForActivity("com.didi.carmate.detail.view.BtsDetailPageActivity");//监视窗口
			if (currentActivity() == "com.didi.carmate.detail.view.BtsDetailPageActivity") {
            id("d28").click();
			}
        id("cpy").click();
            log("恭喜抢单成功!赶紧联系乘客吧。")
            var handsome = confirm("是否继续抢单？");
            if(handsome){
            抢单();
            }else{
            exit();
            };
            
            
            exit();
        }
            
        if(时间长度=13){
            id("kl").click();
            waitForActivity("com.didi.carmate.detail.view.BtsDetailPageActivity");//监视窗口
			if (currentActivity() == "com.didi.carmate.detail.view.BtsDetailPageActivity") {
            id("d28").click();
			}
            id("kl").click();
            id("cpy").click();
            log("恭喜抢单成功!赶紧联系乘客吧。");
            var handsome = confirm("是否继续抢单？");
            if(handsome){
            抢单();
            }else{
            exit();
            };
            }
        }
        }
        if(抢单模式==1){
            if(时间长度==8){
             id("kl").click();
              waitForActivity("com.didi.carmate.detail.view.BtsDetailPageActivity");//监视窗口
			if (currentActivity() == "com.didi.carmate.detail.view.BtsDetailPageActivity") {
            id("d28").click();
			}
              id("nd").click();
              log("恭喜抢单成功!赶紧联系乘客吧。")
 
            var handsome = confirm("是否继续抢单？");
            if(handsome){
            抢单();
            }else{
            exit();
            };
                
                
                
                }
            if(时间长度==13){
              id("kl").click();
                            waitForActivity("com.didi.carmate.detail.view.BtsDetailPageActivity");//监视窗口
						if (currentActivity() == "com.didi.carmate.detail.view.BtsDetailPageActivity") {
            id("d28").click();
			}
              id("kl").click();
              id("nd").click();
              log("恭喜抢单成功!赶紧联系乘客吧。")
                
                 log("恭喜抢单成功!赶紧联系乘客吧。");
            var handsome = confirm("是否继续抢单？");
            if(handsome){
            抢单();
            }else{
            exit();
            };
                }
            }
        
    
    };//判断数据    
    };//判断窗口
    };//循环
    };

	
	
	
	
	