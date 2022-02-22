//可以用这个来代替指针位置

console.show();

events.observeTouch();

events.setTouchEventTimeout(30);

toast("请在控制台中查看触摸的点的坐标");

events.on("touch", function(point) {
  console.log(point);
});

loop();