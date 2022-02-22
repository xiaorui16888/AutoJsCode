// 截图，寻找所有黑色位置，y轴最大的先点击
requestScreenCapture(false);
let a = true , devHeight = device.height / 2, devWidth = device.width, point;
while(a){
  point = images.findMultiColors(captureScreen(), "#ff202020",[[10,10,'#ff202020']],{ region: [0, devHeight, devWidth, 2] });
  if(!point) { a = false; toast('结束了...')};
  try {
    if(!click(point.x, point.y)) { toast('结束了...') }
  } catch (e) {}
}