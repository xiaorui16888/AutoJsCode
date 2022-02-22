"auto";

//启动刷宝  名字看对不 是刷宝 还是刷宝短视频
launchApp("刷宝短视频");

var i = 0;
var i = 0;

setInterval(function() {
   var i1=0
   i1=random(1,3)
    i++;
    //点 首页 按钮
    if(i1==1){while(!click("首页"));}
    
   //点屏慕上的位置  首页所在位置 如不对自行更改
    
     setScreenMetrics(1080, 1920)

    if(i1==2){click(67, 1820);}
    // 滑屏
    if(i1==3){gestures([20, [300, 500], [300, 200]]);}
    toast("点击" + i + "遍");
        //以下30数字可以改长些，看你想刷多少遍
    if (i == 30) {

        toast("运行" + i + "遍，结速了")

//结束刷宝程序   ，可以在 刷宝短视频 那改动别的应用名
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