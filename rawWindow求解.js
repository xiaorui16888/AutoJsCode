auto();

var window = floaty.rawWindow(
    <frame alpha="0.9"w="200" h="*">
        <vertical >
            <text id="action" text="拖动" w="*" />
            <text id="end" text="关闭" w="*"/>
        </vertical>
    </frame>
);
sleep(250);
window.setTouchable(true);


window.end.click(() => {
    floaty.closeAll();
    exit();
});