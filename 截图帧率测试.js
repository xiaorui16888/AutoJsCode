if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
}

let isWorking = false;
let sTime = 0;
let count = 0;

// 布局
let window = floaty.window(
    <vertical weightSum="2" bg='#ffffff'>
        <text id='fps' textColor='#ff0000' textSize='20'>0 fps</text>
        <button id='start' layout_weight="1" >开始</button>
    </vertical>
);

// 播放按钮点击
window.start.click(function(e){
    if(e.getText()=='开始'){
        e.setText('停止');
        sTime = new Date().getTime();
        count = 0;
        isWorking = true;
    }else{
        e.setText('开始');
        isWorking = false;
    }
});

// 长按退出
window.start.longClick(function(){
    exit();
});


while(1){
    if(isWorking){
        captureScreen();
        count++;
        //toast((count/(new Date().getTime() - sTime)*1000) +' fps');
        ui.run(()=>{
            window.fps.setText((count/(new Date().getTime() - sTime)*1000) +' fps');
        })
    }
}