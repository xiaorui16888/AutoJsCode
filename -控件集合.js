var window = floaty.window(
    <frame padding="1" alpha="0.9" bg="#505050" w="103">
        <horizontal>
            <vertical>
                <button id="Bmove" w="100" h="40" textSize="16sp" text="窗口" background="#aaaaa0"/>
                <button id="Bexit" w="100" h="40" textSize="16sp" text="关闭" background="#fff0f0"/>
                <button id="Bcc" w="100" h="40" textSize="16sp" text="控件属性" background="#ffaa1F"/>
                <button id="Bc" w="100" h="40" textSize="16sp" text="生成代码" background="#11aa1F"/>
            </vertical>
        </horizontal>

    </frame>
);
//sleep(200);
setInterval(()=>{}, 1000);
window.exitOnClose();
window.setPosition(800, 400);
ui.run(function () {
    windowWidth = window.getWidth();
    windowHeight = window.getHeight();
}
);

window.Bmove.click(() => {
    window.setAdjustEnabled(!window.isAdjustEnabled());
});
window.Bcc.click(() => {
    toastLog("属性")
    engines.execScriptFile("/sdcard/脚本/222实验室/控件/新.js");
});
window.Bc.click(() => {
    toastLog("代码");
          engines.execScriptFile("/sdcard/脚本/222实验室/控件/控件属性配套.js");
    
});
window.Bexit.click(() => {
    window.close()
    exit();
});​