"auto";
console.show();
var win = floaty.rawWindow(
    <vertical>
        <canvas id="canvas" layout_weight="1"/>
        <button id="exit" text="退出" />
    </vertical>
);
win.setSize(-1, -1);
win.setTouchable(true);
setInterval(() => {}, 100);
var paint = new Paint;
paint.setStrokeWidth(2);
paint.setStyle(Paint.Style.STROKE);
paint.setARGB(255, 255, 0, 0);
win.exit.on("click", () => {
  exit();
});
win.canvas.setOnTouchListener(
    function(view, event) {
        switch (event.getActionMasked()) {
            case event.ACTION_DOWN:
                downX = Math.floor(event.getX());
                downY = Math.floor(event.getY());
                log("down:(" + downX + "," + downY + ")");
                return true;
            case event.ACTION_MOVE:
                return true;
            case event.ACTION_UP:
                upX = Math.floor(event.getX());
                upY = Math.floor(event.getY());
                log("up:(" + upX + "," + upY + ")");
                win.canvas.on("draw", function(canvas) {
                    canvas.drawColor(android.graphics.Color.TRANSPARENT, android.graphics.PorterDuff.Mode.CLEAR);
                 canvas.drawRect(downX, downY, upX, upY, paint);  
                });
                return true;
        };
        return true;
    }
);