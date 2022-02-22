"ui";
var A = random(1000, 9000)
main();
function main() {
    ui.layout(
        <vertical padding="16">
            <linear>
                <button id="hq" text="点击获取验证码"  w="100"/>
                <input id="yzm" inputType="number" hint="请输入验证码" w="*"/>
            </linear>
            <button id="ok" text="确定"/>
        </vertical>
    );
}

ui.hq.on("click", () => {
    scyzm();
});

function scyzm() {
    dialogs.confirm("验证码是" + A)
}
ui.ok.on("click", () => {
    pd();
});

function pd() {
    var B = ui.yzm.text();
    if (A == B) {
        dialogs.alert("正确")
    } else {
        dialogs.alert("错误")
    }
}
//超丑代码你看个鸟
//bug:每运行一次只能生产一个验证码