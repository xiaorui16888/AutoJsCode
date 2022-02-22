/**
 * 悬浮窗文本追加内容并滚动至末尾
 * 用到append、scrollTo、getHeight
 */

var window = floaty.window(
    <frame padding="2" alpha="0.9" bg="#505050" w="100">
        <vertical >
            <ScrollView id="As" h="40" w="*">
                <text id="Alog" textSize="12sp" textColor="#ffffff" margin="1">内容</text>
            </ScrollView>
        </vertical>
    </frame>
);
window.exitOnClose();
window.setAdjustEnabled(true);


setInterval(() => {
    ui.run(function () {
        window.Alog.append("\n新增一行");
        window.As.scrollTo(0, window.Alog.getHeight());
    }
    );
 }, 1000);

