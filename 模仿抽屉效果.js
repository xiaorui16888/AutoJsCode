//抽屉效果
//点击一个按钮,侧滑栏出现  Sideslip
w=floaty.window(
  <button id='switch' textSize="16sp"  w='60' h='60'  bg='@drawable/ic_android_black_48dp'   />
)
var 按钮宽度=w.switch.getWidth() || 90
var 按钮高度=w.switch.getHeight() || 90
log('按钮宽度=',按钮宽度,'按钮高度=',按钮高度)
var x=device.width-按钮宽度
var y=device.height/2
log('xy=',x,y)
w.setPosition(x,y)
setTimeout(
  function(){
    log('一秒之后')
    var 按钮宽度=w.switch.getWidth()
    var 按钮高度=w.switch.getHeight()
    log('按钮宽度=',按钮宽度,'按钮高度=',按钮高度)
    var x=device.width-按钮宽度
    var y=device.height/2
    log('xy=',x,y)
    var xStart=w.getX()
    var xEnd=x
    for(let x=xStart;x>xEnd;x--){
      w.setPosition(x,y)
      sleep(3)
    }
  },300
)
wSideSlip=floaty.window(
  <button id='sideSlip' textSize="16sp"  w='300' h='300' bg='#FFFF00'   />
  )
wSideSlip.setPosition(device.width,device.height/3)
wSideSlip.sideSlip.click(function (){
  var 侧边栏=wSideSlip
  var 侧边栏宽度=侧边栏.getWidth()
  var 侧边栏高度=侧边栏.getHeight()
  var 侧边栏left=侧边栏.getX()
  var 侧边栏top=侧边栏.getY()
  log('侧边栏宽度,侧边栏高度,侧边栏left,侧边栏top',侧边栏宽度,侧边栏高度,侧边栏left,侧边栏top)
  var xStart=侧边栏left
  var xEnd=device.width
  var y=侧边栏top
  threads.start(
    function(){
      for(let x=xStart;x<xEnd+30;x=x+10){
        if(x>device.width+30){
          break
        }
        wSideSlip.setPosition(x,y)
        log(x,y)
        sleep(3)
      }
    }
  )
})
w.switch.click(function (){
  var 侧边栏=wSideSlip
  var 侧边栏宽度=侧边栏.getWidth()
  var 侧边栏高度=侧边栏.getHeight()
  var 侧边栏left=侧边栏.getX()
  var 侧边栏top=侧边栏.getY()
  log('侧边栏宽度,侧边栏高度,侧边栏left,侧边栏top',侧边栏宽度,侧边栏高度,侧边栏left,侧边栏top)
  var xStart=侧边栏left
  var xEnd=device.width-侧边栏宽度
  var y=侧边栏top
  threads.start(
    function(){
      for(let x=xStart;x>xEnd;x=x-10){
        if(x<device.width/2){
          break
        }
        wSideSlip.setPosition(x,y)
        log(x,y)
        sleep(3)
      }
    }
  )
})
setInterval(function(){},3000)
