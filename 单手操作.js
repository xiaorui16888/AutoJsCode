var window = floaty.rawWindow(
    <frame>
        <button id="action" text=" " textColor="#850000ec" gravity="center" bg="#3366ec15"/>
    </frame>
);
var window2 = floaty.rawWindow(
    <frame>
        <button  w="*" h="*" circle="true" id="act" text="〇" textSize="10sp" textColor="#850000ec" gravity="center" bg="#9966ec15"/>
    </frame>
);
setInterval(() => {}, 1000);
window.setTouchable(true);
window.setSize(540, 1170);
//
window.setPosition(439, 1069)
window2.setSize(30, 30)
var execution = null;
window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            return true;
        case event.ACTION_MOVE:

            x = event.getRawX() - 439;
            y = event.getRawY() - 1069;
            window2.setPosition(x * 2 - 15, y * 2 - 93)
            return true;
        case event.ACTION_UP:

            x = event.getRawX() - 439;
            y = event.getRawY() - 1069;

            threads.start(function() {
                window2.setSize(0, 0);
                window.setSize(0, 0);
                sleep(80);
                press(x * 2, y * 2, 20)
                otim = new Date().getTime();
                window.setSize(540, 1170)
                window2.setSize(30, 30)
            });

            log(x * 2, y * 2)
            return true;
    }
    return true;
});