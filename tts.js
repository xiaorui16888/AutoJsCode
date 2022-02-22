var www = floaty.window(
    <frame padding="1" alpha="0.9" bg="#505050" >
        <horizontal>
            <vertical>
                <button id="Bmove" w="100" h="40" textSize="16sp" text="窗口" background="#aaaaa0"/>
                <button id="Bexit" w="100" h="40" textSize="16sp" text="关闭" background="#fff0f0"/>
                <button id="Bc" w="100" h="40" textSize="16sp" text="替换" background="#11aa1F"/>
            </vertical>
        </horizontal>

    </frame>
);
//sleep(200);
setInterval(()=>{}, 1000);
www.exitOnClose();
www.setPosition(100, 400);
//www.setSize(500,600)
ui.run(function () {
    wwwWidth = www.getWidth();
    wwwHeight = www.getHeight();
}
);

www.Bmove.click(() => {
    www.setAdjustEnabled(!www.isAdjustEnabled());
});

www.Bexit.click(() => {
    www.close()
    exit();
});




www.Bc.click(() => {
    engines.execScriptFile("/sdcard/脚本/222实验室/三楼/tts2.js");
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //