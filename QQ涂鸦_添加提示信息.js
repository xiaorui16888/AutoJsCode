//by Mannix QQ 3068758340
//date 6-14-2019
//下面这行的文件路径自己写
toast('正在读取en.json  cn.json  大概10秒钟')
var json = Object.assign(j("cn"),j("en"));
toast("读取完成");
var window = floaty.rawWindow(
    <frame gravity="center" bg='#ff00ff'>
        <button id="button" h="*" w="*"  bg='#0000ff'/>
    </frame>
);

window.exitOnClose();
window.button.click(() => {
    toastLog('点击一下就可以了 10秒后才能点击下一次')
    ui.run(
        function(){
            window.button.setEnabled(false)
        }
    )
    threads.start(function() {
        onClick();
        ui.run(
            function(){
                window.button.setEnabled(true)
            }
        )
    })
    setTimeout(function(){
        window.button.setEnabled(true)
    },10000);

});
window.button.setBackgroundColor(colors.argb(0, 255, 0, 255))
setInterval(() => {
    ui.run(function() {
        var send = text("发送").find()
        if (!send.empty()) {
            var rect = send[0].bounds();
            window.setPosition(rect.left, rect.top);
            window.setSize(rect.width(), rect.height());
        } else {
            window.setPosition(0, 0);
            window.setSize(0, 0);
        }
    });
}, 100);

function onClick() {
    sleep(5000)
    var input = idEndsWith("input").depth(9).findOne();
    log('input的内容='+input.text())
    打开涂鸦板()
    paint(input.text());


}
function 打开涂鸦板(){
    for(var i=0;i<10;i++){
        var view=text('涂鸦').visibleToUser(true).findOnce()
        if(view){
            var x=view.bounds().centerX()
            var y=view.bounds().centerY()
            press(x,y,10)
    
            break;
        }else{
            toast('没有找到涂鸦view')
        }
        sleep(2000)
      
    }

}

function paint(str) {
    threads.shutDownAll();
    var thread = threads.start(function() {
        str = str.split("");
        var sizeY = Math.ceil(Math.sqrt(str.length));
        var sizeX = 0;
        while (sizeX * sizeY < str.length) {
            sizeX++;
        }
        print(sizeX + ";" + sizeY)
        for (var ty = 0; ty < sizeY; ty++) {
            for (var tx = 0; tx < sizeX; tx++) {
                var word = str.shift();
                if (json[word]) {     
                    var board;  
                    for(var i=0;i<10;i++){
                        board=获取涂鸦view()
                        if(board){
                            rect = board.bounds();
                            rect_w = rect.width() * 0.8;
                            rect_h = rect.height();
                            rect_l = rect.left + rect_w * 0.1;
                            rect_t = rect.top;
                            var date = json[word];
                            for (var m = 0; m < date.length; m++) {
                                for (var n = 0; n < date[m].length - 2; n += 2) {
                                    try {
                                        className("android.view.View").depth(9).accessibilityFocused(false).indexInParent(0).longClickable(false).editable(false).focusable(false).drawingOrder(2).findOne();
                                        swipe(rect_l + (rect_w / sizeX) * (tx + date[m][n] / 1000), rect_t + (rect_h / sizeY) * (ty + date[m][n + 1] / 1000), rect_l + (rect_w / sizeX) * (tx + date[m][n + 2] / 1000), rect_t + (rect_h / sizeY) * (ty + date[m][n + 3] / 1000), 10);
                                    } catch (e) {
                                        print(e + "；" + m + "；" + n + "；");
                                    }
                                }
                            }
                            break;
                        }
                        sleep(2000)
                    }             

                }
            }
        }
        text("发送").longClickable(false).indexInParent(1).editable(false).drawingOrder(2).dismissable(false).depth(10).contextClickable(false).clickable(true).className("android.widget.Button").findOne().click();
    });
}
function j(name){
    return JSON.parse(files.read("/sdcard/脚本/笔画库/"+name+".json"));
    }

function 获取涂鸦view() {
    //let x=500,y=500;
    let x = device.width / 2
    let y = device.height / 3 * 2
    log(x,y)
    let uiObj_ary = visibleToUser(true).filter(function (uiObj) {
        let rect = uiObj.bounds();
        if(rect.height()>device.height/4 && rect.width()>=device.width && rect.top>device.height/5){
        return rect.contains(x, y);
        }else{
        return false
        }
    }).find().sort(function (A, B) {
        AR = A.bounds();
        BR = B.bounds();
    
        return BR.width() * BR.height() - AR.width() * AR.height();
    
    });
    /*
    uiObj_ary.forEach(function(uiObj){
        log(uiObj.bounds());
        
    });
    */
    if(uiObj_ary && uiObj_ary.length>0){
        return uiObj_ary[uiObj_ary.length-1];
    }else{
        toast('没有找图涂鸦区域  请打开涂鸦区域')
    }
    };
    