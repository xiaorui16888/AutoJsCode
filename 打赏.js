"ui";

ui.layout(
    <vertical padding="16">
        <button id="click_me" text="点我" w="auto"/>
    </vertical>
);

ui.click_me.on("click", ()=>{
dialogs.build({
            title: "请选择打赏的方式",
            content: "打赏开发者。",
            neutral: "取消",
            negative: "支付宝",
            positive: "微信",
            cancelable: false
        })
        .on("neutral", () => {
            toast("多少打赏一下嘛！(ಥ﹏ಥ) ")
        })
        .on("negative", () => {
            alipay("fkx056336vta9af97cwwc00");
        })
        .on("positive", () => {
            QuoteCode("f2f03ArK3ufFahaw7pmDaiZyj1a4rK2AC3Fq");
        })
        .show();
 });
function QuoteCode(code) {
    -"ui";
const base64 = "";
ui.layout(
    <frame>
        <horizontal>
            <img id="exit" src="file://./res/ic_keyboard_backspace_black_48dp.png" w="40" h="40" gravity="center"/>
            //<text text=""  textColor="#333333" textSize="26sp" typeface="serif" gravity="top|center" w="*" textStyle="bold"/>
        </horizontal>
        <vertical>
            <vertical marginTop="50">
                <img w="auto" h="auto" src="data:image/png;base64,{{base64}}"/>
            </vertical>
            //<text text="截图微信扫码打赏👆"  textColor="#333333" textSize="27sp" typeface="serif" gravity="top|center" w="*" textStyle="bold"/>
        </vertical>
    </frame>
);
ui.exit.on("click", () => ui.finish());
}    
function alipay(code) {
    app.startActivity({      
        action: "android.intent.action.VIEW",
              data: "alipayqr://platformapi/startapp?saId=10000007&qrcode=" +
            "HTTPS://QR.ALIPAY.COM/" + code    
    });
}