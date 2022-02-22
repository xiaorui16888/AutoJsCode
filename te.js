var window = floaty.window(
    <frame>
        <button id="action" text="开始运行" w="60" h="40" bg="#77ffffff"/>
    </frame>
);

setInterval(() => {}, 1000);


window.action.on("click", () =>
    onClick()
);

function onClick() {
    toast("开始")

    while (1) {
        for (i = 0; i < 8; i++) {
            click("账户安全")
            click("提交验证码")
            sleep(1000);
            setText(ma)
        }
        toast("已8次")
        sleep(1000)
        swipe(500, 500, 500, 1500, 1000);
        sleep(1000);
    }
}


var ma = getClip()
log(ma)