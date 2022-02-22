auto.waitFor();

var wake=function (){
    device.wakeUp();
    sleep(400);
    //小米跳转到解锁页面
    gesture(500, [0, device.height/2], [device.width/2, device.height/4], [device.width/2, device.height/8]);
    // swipe(device.width / 2, device.height /2, device.width / 2, device.height /4, 500);

    sleep(1000);
    var pwd="0403";
    clickPwd(pwd);
    sleep(1000);
}

function clickPwd(pwd){
    for(var i=0;i<pwd.length;i++){
        log(pwd[i]);
        click(pwd[i]);
        sleep(500);
    }
}

//module.exports=wake;
wake()