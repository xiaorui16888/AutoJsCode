
var w=floaty.window(
  <card cardBackgroundColor="#aa000000"  cardCornerRadius="18dp">
    <horizontal id='move' w="250" h="35" paddingLeft="10" paddingRight="10">
      <text id="计时" size="12dp" color="white" w="180" h="35" layout_gravity="center" gravity="center||left">脚本启动中</text>
      <button id='stop' w="150" textSize="10dp" textColor="red" h="35" text='你好现在几点了' w="*" gravity="center" />
    </horizontal>
  </card>
);
ui.run(
  ()=>{
    var x=Math.floor(device.width/6)
    var y=Math.floor(device.height/2)
    log(x,y)
    w.setPosition(x,y)
  }
)
w.move.setOnTouchListener(
  function (view,event){
    switch (event.getAction()){
      case event.ACTION_DOWN:
        x=event.getRawX()
        y=event.getRawY()
        windowX=w.getX()
        windowY=w.getY()
        return true
      case event.ACTION_MOVE:
      //移动手指调整悬浮窗位置
       w.setPosition(windowX+(event.getRawX()-x),windowY+(event.getRawY()-y))
    }
    return true
  }
)
_log=log;
function log(){
  var s=''
  for(let i=0;i<arguments.length;i++){
    s+=''+arguments[i]+' '
  }
  ui.run(()=>{
    w.计时.text(s);
  })
}
fn=function (){
  var c=0
  return function (){
    log(s_to_hs(c));
    return c++;
  }
}()
setInterval(fn,1000)
function s_to_hs(s){
  //计算分钟
  //算法：将秒数除以60，然后下舍入，既得到分钟数
  var h;
  h  =   Math.floor(s/60);
  //计算秒
  //算法：取得秒%60的余数，既得到秒数
  s  =   s%60;
  //将变量转换为字符串
  h    +=    '';
  s    +=    '';
  //如果只有一位数，前面增加一个0
  h  =   (h.length==1)?'0'+h:h;
  s  =   (s.length==1)?'0'+s:s;
  return h+':'+s;
}
