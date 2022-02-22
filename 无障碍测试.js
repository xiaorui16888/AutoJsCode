"ui";

ui.layout(
    <vertical>
        <button id="but" w="*"layout_weight="1"/>
        <button id="but2" w="*" layout_weight="1"/>
    </vertical>
);


threads.start(function() {
    auto();
    sleep(100);
    className("android.widget.Button").findOne().click();
    sleep(100);
    if (String(ui.but.getText())) {
        toastLog("控件测试成功");
    } else {
        toastLog("控件测试失败");
    };
    sleep(100);
    click(device.width / 2, device.height / 4 * 3);
    sleep(100);
    if (String(ui.but2.getText())) {
        toastLog("坐标测试成功");
    } else {
        toastLog("坐标测试失败");
    };
});

ui.but.click(function(v) {
    v.setText("成功");
});
ui.but2.click(function(v) {
    v.setText("成功");
});