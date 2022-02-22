"ui";
ui.layout(
    <vertical padding="16">
        <text textSize="16sp" textColor="black" text="请输入刷宝时长(分钟)"/>
        <input id="shichang" text="1"/>
        <text textSize="16sp" textColor="black" text="一个视频看多久(秒)"/>
        <input id="kan" text="10"/>
        <checkbox id="cb1" text="长震动(结束时提醒)"/>
        <button id="ok" text="确定"/>
        
    </vertical>

);

ui.cb1.on("check", (checked)=>{
    if(checked){
        toast("第一个框被勾选了");
        threads.start(function() {
            gouxuan();
           }); 
    }else{
       // toast("第一个框被取消勾选了");
       threads.start(function() {
            bugouxuan();
            });
            
    }
});

/*ui.cb1.on("check", (checked) => {
    if(checked){
        toast("任务结束将会疯狂震动提醒你");
       // threads.start(function() {

            gouxuan();

       // });
    }else{
        toast("第一个框被取消勾选了");
        // var gou = 2;
      //  threads.start(function() {
          bugouxuan();

      //  });

    }
});

*/
ui.ok.click(function() {

    threads.start(function() {

        main();

    });

});


function gouxuan() {
    var name = ui.shichang.getText();
    var xx = parseInt(name);
    var y = xx * 1000 * 60;
    setTimeout(function() {
        sleep(500);
        device.vibrate(2000);
        sleep(4000);
        device.vibrate(2000);
        sleep(1000);
        app.launch("com.coloros.onekeylockscreen");
        //app.launchApp("一键锁屏");
        // app.launch("com.iodkols.onekeylockscreen");
        sleep(3000);
        device.vibrate(2500);
        sleep(1000);
        engines.stopAll();
    }, y);
}

function bugouxuan() {
    var name = ui.shichang.getText();
    var xx = parseInt(name);
    var y = xx * 1000 * 60;
    setTimeout(function() {
       /* sleep(500);
        device.vibrate(2000);
        sleep(4000);
        device.vibrate(2000);
        sleep(1000);*/
        app.launch("com.coloros.onekeylockscreen");
        //app.launchApp("一键锁屏");
        // app.launch("com.iodkols.onekeylockscreen");
      /*  sleep(3000);
        device.vibrate(2500);*/
        sleep(1000);
        engines.stopAll();
    }, y);
}





function main() {

    var sp = ui.kan.getText();
    var mm = parseInt(sp);
    var m = mm * 1000;

    app.launch("com.jm.video");

    sleep(5000);
    yun();




    function yun() {
        while (1) {

            sb();

        }

        function sb() {

            sleep(2000);

            swipe(540, 1600, 540, 200, 700);

            sleep(m);
            click(540, 1000);
            sleep(70);
            click(540, 1000);
            sleep(1000);
            swipe(540, 1600, 540, 200, 700);
            sleep(5000);
            swipe(540, 1600, 540, 200, 700);

            sleep(m);
            click(540, 1000);
            sleep(70);
            click(540, 1000);
            sleep(1000);




        }


    }

}