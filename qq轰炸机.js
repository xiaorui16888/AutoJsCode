var window = floaty.window(
    <vertical>
        <button id="ok" textSize="20sp" text="发送" textColor="#f44336"/>
        <horizontal>
            <text text="内容: " textSize="20sp" textColor="#f44336"/>
            <input id="input" textSize="20sp" textColor="#f44336" text="" w="100" textSize="16sp" focusable="true"/>
        </horizontal>
        <horizontal>
            <text text="间隔时间: " textSize="20sp" textColor="#f44336"/>
            <input id="input1" textSize="20sp" textColor="#f44336" text="" w="60" textSize="16sp" focusable="true"/>
        </horizontal>
    </vertical>
);

window.exitOnClose();

window.input.on("key", function(keyCode, event) {
    if (event.getAction() == event.ACTION_DOWN && keyCode == keys.back) {
        window.disableFocus();
        event.consumed = true;
    }
});

window.input.on("touch_down", () => {
    window.requestFocus();
    window.input.requestFocus();
});
window.input1.on("touch_down", () => {
    window.requestFocus();
    window.input1.requestFocus();
});

window.ok.on("click", () => {
    if (window.ok.getText() == "发送") {
        //执行线程方法
        var c = window.input.getText();
        var m = window.input1.getText();
        if ((isNaN(m)) || (m.length() == 0)) {
            toast("时间填写错误！比如:1秒发送，就填1");
        } else {
            ab(1, c, m);
            window.ok.setText("停止发送");
        }
    } else {
        ab(0, 0, 0);
        window.ok.setText("发送");
    }
    // window.disableFocus();
});


var b;

function ab(q, c, m) {
    if (q == 1) {
        b = setInterval(function() {
            if (id("input").exists()) {
                setText(c);
                click("发送");
            }
        }, m * 1000);
    } else {
        clearInterval(b);
    }
}

setInterval(() => {}, 1000);