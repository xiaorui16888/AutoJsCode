function 上滑动作(){
  var xyArr = [300]
  var x0=device.width/2
  var y0=device.height/4*3
  x0=x0+rndNum(-30, 30)
  y0=y0+rndNum(-30, 30)
  // log('x0,y0',x0,y0)
  var angle = 0
  var x = 0
  var y = 0
  for (let i = 0; i < 30; i++) {
    y = x * tan(angle)
    y=Math.floor(y)
    // log(y)
    if((y0-y)<0){
      break
    }
    var xy = [x0+x,y0-y]
    xyArr.push(xy)
    x += 5;
    angle += 3
  }
  log(xyArr)
  gesture.apply(null,xyArr)
  function tan(angle) {
    return Math.tan(angle * Math.PI / 180);
  }
}
function rndNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

上滑动作()
