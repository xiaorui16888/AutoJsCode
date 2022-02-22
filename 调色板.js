"ui";

ui.layout(
    <vertical id="bg" padding="16" >
        <vertical w="*" margin="10" gravity="center">
            <text id="text" textSize="100px" gravity="center"/>
            <text id="text1" textSize="100px" gravity="center"/>
        </vertical>
        <horizontal margin="10">
        <text id="TA" text="A" w="150px" textColor="black"/>
        <seekbar id="proA" w="*" h="*" max="255"/>
</horizontal>
        <horizontal margin="10">
        <text id="TR" text="R" w="150px" textColor="black"/>
        <seekbar id="proR" w="*" h="*" max="255"/>
</horizontal>
<horizontal margin="10">
        <text id="TG" text="G" w="150px" textColor="black"/>
        <seekbar id="proG" w="*" h="*" max="255"/>
</horizontal>
<horizontal margin="10"> 
        <text id="TB" text="B" w="150px" textColor="black"/>
        <seekbar id="proB" w="*" h="*" max="255"/>
</horizontal>
    </vertical>
);

threads.start(function() {
    //console.show();

});
ui.run(() => {
    ui.proA.setProgress(255);
    ui.proR.setProgress(255);
    ui.proG.setProgress(0);
    ui.proB.setProgress(0);
});

var a, r, g, b;
setInterval(() => {
    a = Math.floor(ui.proA.getProgress()), r = Math.floor(ui.proR.getProgress()), g = Math.floor(ui.proG.getProgress()), b = Math.floor(ui.proB.getProgress());
    ui.run(() => {
        var 反色 = -1 - colors.argb(0, r, g, b);
        ui.TA.setText("A" + a);
        ui.TR.setText("R" + r);
        ui.TG.setText("G" + g);
        ui.TB.setText("B" + b);
        ui.TA.setTextColor(反色);
        ui.TR.setTextColor(反色);
        ui.TG.setTextColor(反色);
        ui.TB.setTextColor(反色);
        ui.bg.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(a, r, g, b)));
        ui.text.setTextColor(反色);
        ui.text.setText(String(colors.argb(a, r, g, b)));
        ui.text1.setTextColor(反色);
        ui.text1.setText(colors.toString(colors.argb(a, r, g, b)));
    });
}, 50)

ui.text.click(() => {
    var color = ui.text.getText();
    setClip(color);
    toastLog("已复制\n" + color);
});
ui.text1.click(() => {
    var color = ui.text1.getText();
    setClip(color);
    toastLog("已复制\n" + color);
});




//Details(ui.proR,"set");

function Details(A, re) {
    threads.start(function() {
        console.show();
    });
    log(typeof(A));
    log(typeof(re));
    if (typeof(re) == "string") {
        re = new RegExp(re, "i")
    };
    log(A);
    try {
        //A= A.sort();
        log(A.toString());

    } catch (e) {
        toast(e)
    };
    for (var i in A) {

        try {
            if (!re || re.test(i.toString())) { //
                log(typeof(A[i]));
                log(i + "\n" + A[i].toString())
            };
        } catch (e) {
            log("错误")
        }
    };
};




/*
ui.proR.setOnSeekBarChangeListener({
    onProgressChanged: function(seekBar, progress, fromUser) {
        //SeekBar 滑动时的回调函数，其中 fromUser 为 true 时是手动调节
    },
    onStartTrackingTouch: function(seekBar) {
        //SeekBar 开始滑动的的回调函数
    },
    onStopTrackingTouch: function(seekBar) {
        //SeekBar 停止滑动的回调函数
    }
});

*/