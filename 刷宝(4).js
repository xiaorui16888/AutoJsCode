"auto";


launchApp("刷宝短视频");

var i = 0;
var i = 0;

setInterval(function() {
   var i1=0
   i1=random(1,3)
    i++;
    
    if(i1==1){while(!click("首页"));}
    
   
    if(i1==2){click(67, 1820);}
    if(i1==3){gestures([20, [300, 500], [300, 200]]);}
    toast("点击" + i + "遍");
        
    if (i == 30) {

        toast("运行" + i + "遍，结速了")


        关闭程序 ();

    }
},
10000 + random(1, 15000));



function   关闭程序 () {

    var q1 = 0
    openAppSetting(getPackageName("刷宝短视频"));

    setInterval(function() {


        while (!click("结束运行"));
        q1++;
        while (!click("确定"));

        while (!click("清除数据"));
        while (!click("清除缓存"));
        while (!click("确定"));
        if (q1=>5) {
            exit();
        }

    },
    2000);


}