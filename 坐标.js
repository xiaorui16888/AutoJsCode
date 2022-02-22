console.show();
var win = floaty.rawWindow(
    <vertical>
        <canvas id="canvas" layout_weight="1"/>
    </vertical>
);
win.setSize(-1, -1);
win.setTouchable(true);
setInterval(() => {}, 100);
new canvasDraw(win.canvas);

function canvasDraw(canvasView) {
    var paint = new Paint;
    paint.setStrokeWidth(10);
    paint.setStyle(Paint.Style.FILL);
    paint.setStrokeCap(Paint.Cap.SQUARE);
    paint.setARGB(50, 100, 120, 160);
  
    
    
    viewDraw = (canvas) => {
       
    
        win.canvas.setOnTouchListener(function(view, event) {
           
           
                    
            
            
            
            switch (event.getAction()) {
                case event.ACTION_DOWN:
                    downX = parseInt(event.getX());
                    downY = parseInt(event.getY());
                    toastLog("down:\n(" + downX + "," + downY + ")");
                    
                    
                    
                    return true;
                case event.ACTION_MOVE:
                    return true;
                case event.ACTION_UP:
                    upX = parseInt(event.getX());
                    upY = parseInt(event.getY());
                    toastLog("up:\n(" + upX + "," + upY + ")");
                    return true;
            };
            return true;
        })
    };
    canvasView.on("draw", viewDraw);
    
}