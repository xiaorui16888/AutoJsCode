//严重警告。千万别专心看屏幕。闪瞎你的眼可别怪我啊。
//有心脏病。千万不要用。我可能闪的心脏病犯了。


"ui";

ui.layout(
    <vertical>
        <canvas id="canvas"/>
    </vertical>
);

var kg = 0;

ui.canvas.on("draw", function(canvas) {
    if (kg) {
        kg = 0;
        canvas.drawARGB(255, 0, 0, 255);
    } else {
        kg = 1;
        canvas.drawARGB(255, 255, 0, 0);
    };
});