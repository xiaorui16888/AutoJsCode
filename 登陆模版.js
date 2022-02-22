var window = floaty.window(
    <card id="ff">
        <vertical margin="20 20 20 20">
            <linear gravity="center">
                <text text="今日必看"/>
            </linear>
            <linear>
                <input id="name" maxLength="11"/>
            </linear>
            <linear>
                <input id="code" maxLength="4"/>
                <button id="send" />
            </linear>
            <linear gravity="center">
                <button id="login"/>
            </linear>
        </vertical>
    </card>
);
window.ff.alpha = "0.9";
window.name.hint = "手机号";
window.name.width = "500";
window.code.hint = "验证码";
window.code.width = "280";
window.send.setText("获取验证码");
window.login.setText("立即登陆");
window.login.width = "560";
setInterval(() => {}, 1000);
window.code.on("touch_down", () => {
    window.requestFocus();
    window.code.requestFocus();
});
window.name.on("touch_down", () => {
    window.requestFocus();
    window.name.requestFocus();
});
window.login.click(() => {
    window.disableFocus();
    threads.start(function() {
        if (isPhone(window.name.getText()) && window.code.text() != "") {
            try {
                ui.run(() => {
                    window.login.setText("登陆成功");
                });
            } catch (e) {
                ui.run(() => {
                    window.login.setText("立即登陆");
                });
                toast("登陆失败！");
            }
        } else {
            toastLog("请您填写手机号与验证码!");
        }
    });
});
window.send.click(() => {
    window.disableFocus();
    if (window.send.getText() == "获取验证码") {
        threads.start(function() {
            if (isPhone(window.name.getText())) {
                for (var i = 60; i > 0; i--) {
                    sleep(1000);
                    ui.run(function() {
                        window.send.setText(i + " 秒");
                    });
                }
                window.send.setText("获取验证码");
            } else {
                toastLog("手机号码错误!");
            }
        });
    } else {
        toastLog("您有一条短信在发送，请稍等!");
    }
});

function isPhone(s) {
    var pat = /^1\d{10}$/;
    if (!pat.exec(s)) return false;
    return true;
}