//console.show()

//
if(!requestScreenCapture()){
    toast("请求截图失败");
    exit();
}
fcx=50
fcy=50
坐标偏移x=35
坐标偏移y=95
//最小化窗口()
取色()

function 最小化窗口(){
  v= floaty.window(
    <frame bg="#99611919" gravity="center" w="90" h="100">
       <vertical  w="90" h="100">
      <button id="quse" text="取色" w="50" h="30"  textSize="10sp" />
      <button id="yd"   text="移动" w="50" h="30"  textSize="10sp" />
      </vertical>
     </frame>
);
  v.quse.click(()=>{
       v.close();
    bb = threads.start(function(){
    取色()
       
   });
 
});
 }


function 取色(){
 w = floaty.window(
  <frame id="beijing"  bg="#99611919"h="200" w="200" >
    <vertical>
     <linear padding="-6" w="200" h="20" >  
       <linear w="40" h="30" gravity="left">
          <button id="zs" text="◤" w="40" h="30"  textSize="8sp" />
       </linear>
      <linear>
       <text id="zhuobiao" padding="6"  w="*" gravity="center" color="#111111" size="12">坐标:</text>
      </linear>
       <linear  w="*" h="30" gravity="right">  
          <button id="ys" text="↗" w="40" h="30" textSize="8sp" />
       </linear>  
     </linear>  
    <vertical>
         <vertical>
           <text id="yanse" w="*" gravity="left" color="#111111" size="16">数字颜色:</text>
           <text id="yanse1" w="*" gravity="left" color="#111111" size="16">RGB颜色:</text>
           <text id="yanse2" w="*" gravity="left" color="#111111" size="16">颜色:</text>
         </vertical>
     </vertical>
     <vertical bg="#99991919" gravity="top" h="80" w="165">
           <linear gravity="center">
             <button id="zxh" gravity="center" text="⊙"  w="40" h="30" textSize="8sp" />
             <button id="shang" gravity="center" text="↑"  w="40" h="30" textSize="8sp" />
             <button id="tuichu" gravity="center" text="╳"  w="40" h="30" textSize="8sp" />
           </linear>
          <linear gravity="center">
            <button id="zuo" gravity="center" text="←"  w="40" h="30" textSize="8sp" />
            <button id="fuzhi" gravity="center" text="复制"  w="40" h="30" textSize="8sp" />
            <button id="you" gravity="center" text="→"  w="40" h="30" textSize="8sp" />
          </linear>
          <linear gravity="center">
            <button id="zuo" gravity="center" text="←"  w="40" h="30" textSize="8sp" />
            <button id="xia" gravity="center" text="↓"  w="40" h="30" textSize="8sp" />
            <button id="you" gravity="center" text="→"  w="40" h="30" textSize="8sp" />
          </linear>
     </vertical>
     
    <vertical gravity="bottom" >
     <linear padding="2" w="*" h="30" >  
       <linear w="100" h="30" gravity="left">
        <button id="zx" text="↙" w="40" h="30"  textSize="8sp" />
       </linear>
       <linear  w="*" h="30" gravity="right">  
       <button id="yx" text="↘" w="40" h="30" textSize="8sp" />
       </linear>  
     </linear>  
      </vertical>
     </vertical>
  </frame>
);


 
w.setPosition(5,0)
    w.shang.click(()=>{
        fcy-=1
        fcyidong()
});
    w.xia.click(()=>{
        fcy+=1
    fcyidong()
});
    w.zuo.click(()=>{
        fcx-=1
    fcyidong()
});
    w.you.click(()=>{
        fcx+=1
    fcyidong()
});
 w.zs.click(()=>{
      w.zs.setText("◤")
      w.ys.setText("↗")
      w.zx.setText("↙")
      w.yx.setText("↘")
     坐标偏移x=35
     坐标偏移y=95
}); w.ys.click(()=>{
      w.zs.setText("↖")
      w.ys.setText("◥")
      w.zx.setText("↙")
      w.yx.setText("↘")
     坐标偏移x=35+603
     坐标偏移y=95
}); w.zx.click(()=>{
      w.zs.setText("↖")
      w.ys.setText("↗")
      w.zx.setText("◣")
      w.yx.setText("↘")
     坐标偏移x=35
     坐标偏移y=95+603
}); w.yx.click(()=>{
      w.zs.setText("↖")
      w.ys.setText("↗")
      w.zx.setText("↙")
      w.yx.setText("◢")
     坐标偏移x=35+603
     坐标偏移y=95+603
});
w.fuzhi.click(()=>{
    toast("复制成功");
    setClip( w.zhuobiao.getText()+w.yanse.getText()+w.yanse1.getText()+w.yanse2.getText())
});
w.zxh.click(()=>{
    toast("最小化");
    //activity.finish();
    w.close();
  a= threads.start(function(){
    最小化窗口()
});
});
w.tuichu.click(()=>{
    toast("退出");
    //activity.finish();
     w.close();
    exit()
});

w.beijing.setOnTouchListener(function(view, event) {
  switch (event.getAction()) {
     case event.ACTION_DOWN:
      x = event.getRawX();
      y = event.getRawY();
      aw = w.getWidth();
      ah = w.getHeight();
      windowX = w.getX();
      windowY = w.getY();
      downTime = new Date().getTime();
      return true;
    case event.ACTION_MOVE:
      //移动手指时调整悬浮窗位置
       fcx=windowX + (event.getRawX() - x)
       fcy=windowY + (event.getRawY() - y)
          fcyidong()
      case event.ACTION_UP:
   }
    return true;
})
}
function fcyidong(){
    w.setPosition(fcx, fcy)
      x1=w.getX()+坐标偏移x
      y1=w.getY()+坐标偏移y
  var img = capturescreen();
  if(1080>x1&&x1>0&&1920>y1&&y1>0){
var color = images.pixel(img, x1, y1);
//显示该颜色值
 w.yanse.setText("数字:"+color);
  w.yanse1.setText("ARGB:"+colors.toString(color));
  hsl=RgbToHsl(colors.red(color), colors.green(color), colors.blue(color))
      w.yanse2.setText("SHL:"+hsl)
  }
    w.zhuobiao.setText("坐标:X:"+x1+"  Y:"+y1)
   
    }
function capturescreen() {
  while (true) {
    if (ajt = captureScreen()) {
      return ajt;
      break;
    }
  }
}
   function RgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
 
        if (max == min) {
            h = s = 0;
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [Math.floor(h * 100), Math.round(s * 100) + "%", Math.round(l * 100) + "%"];
    }
//xuanfuchuang()

setInterval(()=>{}, 1000);
