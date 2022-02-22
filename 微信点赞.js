auto();

while(true){
    sleep(200);
    寻找可以点赞();
    swipe(device.width/2, device.height/2, device.width/2, device.height/4, 300);
}

function 寻找可以点赞(){
    var d=desc("评论").untilFind();
    log(d.length);
    d.forEach(child=>{
        log("点击了");
        sleep(200);
        log(child);
        child.click();
        // 点赞();
    });
}

function 点赞(){
    click("赞");
}