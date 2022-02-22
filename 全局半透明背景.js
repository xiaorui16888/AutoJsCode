var w = floaty.rawWindow(
    <frame>
    <img w="1080" scaleType="fitStart" src="http://img02.sogoucdn.com/app/a/100520146/2b4f60570cdc3bdefd3cf693ee4e2484" alpha="0.2"/>
    //w 宽度 alpha 透明度
   </frame>
);
w.setSize(-1, -1);//悬浮窗铺满全屏
w.setTouchable(false);//是否可触摸
setTimeout(()=>{
    w.close();//关闭悬浮窗
}, 3600000);//持续运行时间 1000=1s
//720*1280、1080*1920分辨率显示正常