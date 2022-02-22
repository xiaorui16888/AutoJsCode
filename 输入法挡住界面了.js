/**
 * 作者: 家
 * QQ:   203118908
 * 功能:  模仿安卓抽屉效果
 */
//定义悬浮窗控制模块，命名为(悬块)。
var obj=init()
var storage=obj.storage;
function 悬块(window, view) {
  //判断是否缺少构造参数。
  if (!window || !view) {
      //缺少构造参数，抛出错误。
      throw "缺参数";
  };
  //记录按键被按下时的触摸坐标
  this.x = 0, this.y = 0;
  //记录按键被按下时的悬浮窗位置
  this.windowX, this.windowY;
  //按下时长超过此值则执行长按等动作
  this.downTime = 500;
  //记录定时执行器的返回id
  this.Timeout = 0;
  //创建点击长按事件
  this.Click = function() {};
  this.LongClick = function() {};
  //可修改点击长按事件
  this.setClick = function(fun) {
      //判断参数类型是否为函数？
      if (typeof fun == "function") {
          this.Click = fun;
      };
  };
  this.setLongClick = function(fun, ji) {
      //判断参数类型是否为函数？
      if (typeof fun == "function") {
          this.LongClick = fun;
          //判断参数是否可为设置数字？
          if (parseInt(ji) <= 1000) {
              this.downTime = parseInt(ji);
          };
      };
  };
  view.setOnTouchListener(new android.view.View.OnTouchListener((view, event) => {
      //判断当前触控事件，以便执行操作。
      switch (event.getAction()) {
          //按下事件。
          case event.ACTION_DOWN:
              //按下记录各种坐标数据。
              this.x = event.getRawX();
              this.y = event.getRawY();
              this.windowX = window.getX();
              this.windowY = window.getY();
              //创建一个定时器用来定时执行长按操作。
              this.Timeout = setTimeout(() => {
                  this.LongClick();
                  this.Timeout = 0;
              }, this.downTime);
              return true;
              //移动事件。
          case event.ACTION_MOVE:
              //移动距离过大则判断为移动状态
              if (Math.abs(event.getRawY() - this.y) > 5 && Math.abs(event.getRawX() - this.x) > 5) {
                  //移动状态清除定时器
                  if (this.Timeout) {
                      //定时器存在则清除定时器。
                      clearTimeout(this.Timeout);
                      this.Timeout = 0;
                  };
                  //移动手指时调整悬浮窗位置
                  window.setPosition(this.windowX + (event.getRawX() - this.x), this.windowY + (event.getRawY() - this.y));
              };
              return true;
              //抬起事件。
          case event.ACTION_UP:
              if (this.Timeout) {
                  //手指抬起时，定时器存在，说明没有移动和按下时间小于长按时间。
                  //清除定时器。
                  clearTimeout(this.Timeout);
                  this.Timeout = 0;
                  //执行点击事件。
                  this.Click();
              };
              return true;
      };
      //控件的触控事件函数必须要返回true。否则报错。
      return true;
  }));
};
//上面是悬块,下面开始写悬浮窗
var hoverButton=floaty.rawWindow(
  <frame id='main'>
  <button id='switch' textSize="16sp"  w='30' h='30'  bg='#88ff0000'/>
  {/* <button id='switch' textSize="16sp"  w='60' h='60'  bg='@drawable/ic_android_black_48dp'/> */}
  </frame>
)
//输出提示信息。
toastLog("长按悬浮窗关闭本脚本");
//空运行定时器保持脚本运行中,这是悬浮窗脚本所必需的。
setInterval(() => {}, 1000);
// setInterval(() => {移动悬浮按钮至屏幕边缘()}, 500);
//声明一个变量用来控制线程。
var thread = null;
//创建一个新的悬浮控制模块 ad 并带入参数(所要控制的悬浮窗和用来控制悬浮窗移动的控件)。
var ad = new 悬块(hoverButton, hoverButton.switch);
//设置长按事件。
ad.setLongClick(function() {
  //输出气泡信息。
  toast("脚本已关闭");
  //脚本停止代码。
  exit();
});
//设置点击事件。
ad.setClick(function() {
  //输出气泡信息。
  toast("点击");
  //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
  if (thread ? !thread.isAlive() : true) { //线程没有运行。
      ui.run(() => {
          //在ui线程中修改按钮的文字
          toastLog('悬浮按钮被点击了')
      });
      //新建一个线程，赋值给变量thread
      thread = threads.start(function() {
          try {
              Main();
          } catch (e) {
              toastLog(e);
          };
          //运行完毕修改按钮文字
          ui.run(() => {
          //在ui线程中修改按钮的文字
            toastLog('点击事件中的方法运行完毕')
          });
      });
  } else {
      thread.interrupt();
      //中断线程;
      ui.run(() => {
          //在ui线程中修改按钮的文字
          toastLog('点击事件中的方法被中断了')
      });
  };
});
hoverButton.setPosition(device.width-90,device.height/2)
setTimeout(
  function(){
    移动悬浮按钮至屏幕边缘()
  },500)
function Main(){
      移动悬浮按钮至屏幕边缘()
      侧滑栏toggle()
};
function 移动悬浮按钮至屏幕边缘(){
  log('移动悬浮按钮至屏幕边缘')
  var 按钮left=hoverButton.getX()
  //移动到左边还是右边,看此时按钮左上角x的大小
  if(按钮left>device.width/2){
    移动到屏幕右侧边缘中心()
  }else{
    移动到屏幕左侧边缘中心()
  }
}
function 移动到屏幕右侧边缘中心(){
  var 按钮left=hoverButton.getX()
  var 按钮top=hoverButton.getY()
  var 按钮宽度=hoverButton.getWidth()
  var 按钮高度=hoverButton.getHeight()
  log('按钮left=',按钮left,'按钮top=',按钮top)
  log('按钮宽度=',按钮宽度,'按钮高度=',按钮高度)
  var xStart=按钮left
  var yStart=按钮top
  var xEnd=device.width-按钮宽度
  var yEnd=(device.height-按钮高度)/2
  log('xEnd=',xEnd,'yEnd=',yEnd)
  hoverButton.setPosition(xEnd,yEnd)
}
function 移动到屏幕左侧边缘中心(){
  var 按钮left=hoverButton.getX()
  var 按钮top=hoverButton.getY()
  var 按钮宽度=hoverButton.getWidth()
  var 按钮高度=hoverButton.getHeight()
  log('按钮left=',按钮left,'按钮top=',按钮top)
  log('按钮宽度=',按钮宽度,'按钮高度=',按钮高度)
  var xEnd=0
  var yEnd=(device.height-按钮高度)/2
  hoverButton.setPosition(xEnd,yEnd)
}
var sideSlipWindow=floaty.rawWindow(
  <ScrollView margin='10'>
  <TableLayout id='sideSlip'  w='250' h='300' stretchColumns='1'  background='#00ff00' >
  <TableRow>
    <TextView id='透明度' layout_width='wrap_content'  layout_height='wrap_content' text=
    '透明度:'>
    </TextView>
    <EditText id='透明度value' layout_width='match_parent'  layout_height='wrap_content' hint='输入框1' text='33'>
    </EditText>
  </TableRow>
  <TableRow>
    <TextView layout_width='wrap_content'  layout_height='wrap_content' text=
    'ip'>
    </TextView>
    <EditText id='ip' layout_width='match_parent'  layout_height='wrap_content' hint='未知ip' >
    </EditText>
  </TableRow>
  <TableRow>
    <TextView layout_width='wrap_content'  layout_height='wrap_content' text=
    '城市'>
    </TextView>
    <EditText id='city' layout_width='match_parent'  layout_height='wrap_content' hint='未知城市' >
    </EditText>
  </TableRow>
  <TableRow>
    <button margin='6' id='hide' textSize="16sp"  layout_width='match_parent'  layout_height='wrap_content'  bg='#ff0000' text='隐藏' />
    <button margin='6' id='getIp' textSize="16sp"  layout_width='match_parent'  layout_height='wrap_content'  bg='#0000ff' text='获取ip和城市' />
  </TableRow>
  <TableRow>
    <button  margin='6' id='打开APP1' textSize="16sp"  layout_width='match_parent'  layout_height='wrap_content'  bg='#ff0000' text='打开APP1' />
    <EditText margin='6'  id='appName1' layout_width='match_parent'  layout_height='wrap_content' hint='填写app名字' >
    </EditText>
  </TableRow>
  <TableRow>
    <button  margin='6' id='打开APP2' textSize="16sp"  layout_width='match_parent'  layout_height='wrap_content'  bg='#ff0000' text='打开APP2' />
    <EditText  margin='6' id='appName2' layout_width='match_parent'  layout_height='wrap_content' hint='填写app名字' >
    </EditText>
  </TableRow>
  <TableRow>
    <button  margin='6' id='打开应用信息' textSize="16sp"  layout_width='match_parent'  layout_height='wrap_content'  bg='#ff0000' text='打开应用信息' />
    <EditText margin='6'  id='appInfo' layout_width='match_parent'  layout_height='wrap_content' hint='填写app名字' >
    </EditText>
  </TableRow>
  </TableLayout>
  </ScrollView>
  )
var inputBoxViewArr=[
  sideSlipWindow.appName1,
  sideSlipWindow.appName2,
  sideSlipWindow.appInfo
]
使所有输入框点击时都能弹出输入法(sideSlipWindow,inputBoxViewArr)
sideSlipWindow.setPosition(device.width,device.height/3)
setTimeout(
  function(){
    移动侧滑栏至屏幕边缘第一次()
  },500)
var 透明度范围提示内容='悬浮按钮透明度\n(十六进制范围00-FF)'
sideSlipWindow.透明度.setText(透明度范围提示内容)
setTimeout(
  function (){
    ui.run(
      function (){
        sideSlipWindow.ip.setText('111111')
        sideSlipWindow.city.setText('bbbbbbb')

      }
    )
},500
)
sideSlipWindow.getIp.on(
  "click", function () {
    // sideSlipWindow.透明度value.requestFocus();
    toastLog('获取ip中,请稍后')
    threads.start(
      function (){
        var info=getIpAndCity()
        toastLog(info)
        var ip=info.ip
        var city=info.city
        ui.run(
          function (){
            sideSlipWindow.ip.setText(ip)
            sideSlipWindow.city.setText(city)
          }
        )

      }
    )
  }
)
function getIpAndCity(){
  try{
    var getIp_api = http.get('http://pv.sohu.com/cityjson?ie=utf-8');
    var InetIP = getIp_api.body.string();
    log(InetIP)
    eval(InetIP);
    var r={
      ip:returnCitySN.cip,
      city:returnCitySN.cname,
    }
    return r

  }catch(e){
    log(e)
    return {'ip':'未知',city:'未知'}
  }
}

sideSlipWindow.打开APP1.on(
  "click", function () {
    var appName=sideSlipWindow.appName1.getText();
    toastLog('您输入的APP是'+appName)
    launchApp(appName);
    toastLog('打开APP命令执行完毕,若十秒后没反应,请手动打开APP')

  }
)
sideSlipWindow.打开APP2.on(
  "click", function () {
    var appName=sideSlipWindow.appName2.getText();
    toastLog('您输入的APP是'+appName)
    launchApp(appName);
    toastLog('打开APP命令执行完毕,若十秒后没反应,请手动打开APP')

  }
)
sideSlipWindow.打开应用信息.on(
  "click", function () {
    var appName=sideSlipWindow.appInfo.getText();
    toastLog('您输入的APP是'+appName)
    var packageName=getPackageName(appName)
    app.openAppSetting(packageName)
    toastLog('打开APP应用信息命令执行完毕,若十秒后没反应,请手动打开APP')

  }
)
function 使所有输入框点击时都能弹出输入法(window,inputBoxViewArr){
  for(let i=0;i<inputBoxViewArr.length;i++){
    var view=inputBoxViewArr[i]
    使输入框点击时输入法弹出来(window,view)
  }
}
function 使输入框点击时输入法弹出来(window,view){
  view.on(
    "touch_down", function () {
      window.requestFocus();
      view.requestFocus();
    }
  )
  view.on(
    "key", function (keyCode,event) {
      if(event.getAction()==event.ACTION_DOWN && keyCode == keys.back){
        window.disableFocus()
        event.consumed=true
      }
      window.requestFocus();
      view.requestFocus();
    }
  )

}
    sideSlipWindow.透明度value.on(
      "touch_down", function () {
        sideSlipWindow.requestFocus();
        sideSlipWindow.透明度value.requestFocus();
      }
    )
    sideSlipWindow.透明度value.on(
      "key", function (keyCode,event) {
        if(event.getAction()==event.ACTION_DOWN && keyCode == keys.back){
          window.disableFocus()
          event.consumed=true
        }
        sideSlipWindow.requestFocus();
        sideSlipWindow.透明度value.requestFocus();
      }
    )
setTimeout(
  // function(){
  //   sideSlipWindow.透明度.setText(透明度范围提示内容)
  //   var 透明度value=sideSlipWindow.透明度value.text()
  //   var 上次的透明度范值=storage.get("上次的透明度范值")
  //   if(上次的透明度范值){}else{return}
  //   var 上次的透明度范值=sideSlipWindow.透明度.text()
  //   storage.put("上次的透明度范值", 上次的透明度范值);
  //   sideSlipWindow.透明度value.setText(上次的透明度范值)
  // }
  function (){
    sideSlipWindow.透明度value.addTextChangedListener(
      new android.text.TextWatcher({
        afterTextChanged:function(text){
          log('afterTextChanged:function(text){',text)
          if(sideSlipWindow.透明度value.focused){
                    log('function (text)2',text)
                    var bg=hoverButton.switch.attr('bg')
                    var bg后六位=bg.match(/\w{6}$/)[0]
                    log('TextWatcher text',text)
                    if(text.length()>=2){
                      log('11111111111111111111111')
                      var text=text.substring(0,2)
                      var newBg='#'+text+bg后六位
                      hoverButton.switch.attr('bg',newBg)
                    }else{
                      log('text=',text)
                      log('text.length=',text.length)
                      log('222222222222222222')
                    }
          }
        }
      })
    )
  }
  ,500)
function 移动侧滑栏至屏幕边缘第一次(){
  var 按钮left=sideSlipWindow.getX()
  var 按钮top=sideSlipWindow.getY()
  var 按钮宽度=sideSlipWindow.getWidth()
  var 按钮高度=sideSlipWindow.getHeight()
  sideSlipWindow.setPosition(device.width,(device.height-按钮宽度)/2)
}
function 移动侧滑栏至屏幕边缘(){
  log('移动侧滑栏至屏幕边缘')
  var 按钮left=sideSlipWindow.getX()
  var 按钮top=sideSlipWindow.getY()
  var 按钮宽度=sideSlipWindow.getWidth()
  var 按钮高度=sideSlipWindow.getHeight()
  //移动到左边还是右边,看此时按钮左上角x的大小
  if((按钮left+按钮宽度/2)>device.width/2){
    log('侧滑栏在屏幕右侧')
    移动侧滑栏到屏幕右侧边缘中心()
  }else{
    log('侧滑栏在屏幕左侧')
    移动侧滑栏到屏幕左侧边缘中心()
  }
}
function 移动侧滑栏到屏幕右侧边缘中心(){
  log('移动侧滑栏到屏幕右侧边缘中心')
  var 按钮left=sideSlipWindow.getX()
  var 按钮top=sideSlipWindow.getY()
  var 按钮宽度=sideSlipWindow.getWidth()
  var 按钮高度=sideSlipWindow.getHeight()
  log('按钮left=',按钮left,'按钮top=',按钮top)
  log('按钮宽度=',按钮宽度,'按钮高度=',按钮高度)
  var xStart=按钮left
  var yStart=按钮top
  var xEnd=device.width
  var yEnd=按钮top
  log('xEnd=',xEnd,'yEnd=',yEnd)
  log('xEnd-xStart=',xEnd,' - ',xStart,' = ',xEnd-xStart)
  for(let i=0;i<(xEnd-xStart);i=i+8){
    sideSlipWindow.setPosition(xStart+i,yEnd)
    log(xStart+i,yEnd)
    sleep(3)
    if(sideSlipWindow.getX()>device.width){
      log('侧边栏左上角横坐标大于屏幕宽度,跳出for循环')
      break
    }
  }
}
function 移动侧滑栏到屏幕左侧边缘中心(){
  log('移动侧滑栏到屏幕左侧边缘中心')
  var 按钮left=sideSlipWindow.getX()
  var 按钮top=sideSlipWindow.getY()
  var 按钮宽度=sideSlipWindow.getWidth()
  var 按钮高度=sideSlipWindow.getHeight()
  log('按钮left=',按钮left,'按钮top=',按钮top)
  log('按钮宽度=',按钮宽度,'按钮高度=',按钮高度)
  var xStart=按钮left
  var yStart=按钮top
  var xEnd=-(按钮宽度)
  var yEnd=(device.height-按钮高度)/2
  var yUnit=(yEnd-yStart)/(xStart-xEnd)
  var count=0
  for(let i=0;i<(xStart-xEnd);i=i+8){
    var y=yStart+yUnit*count++;
    sideSlipWindow.setPosition(xStart-i,y)
    sleep(3)
    if(sideSlipWindow.getX()+sideSlipWindow.getWidth()<0){
      break
    }
  }
}
var threadSideSlipWindow= null;
var adSideSlipWindow = new 悬块(sideSlipWindow, sideSlipWindow.hide);
//设置长按事件。
adSideSlipWindow.setLongClick(function() {
  //输出气泡信息。
  toast("脚本已关闭");
  //脚本停止代码。
  exit();
});
//设置点击事件。
adSideSlipWindow.setClick(function() {
  //输出气泡信息。
  toast("点击");
  //变量值为空则代表线程没有开启。变量值不为空，则判断线程是不是正在运行。
  if (threadSideSlipWindow ? !threadSideSlipWindow.isAlive() : true) { //线程没有运行。
      ui.run(() => {
          //在ui线程中修改按钮的文字
          toastLog('侧滑栏被点击了')
      });
      //新建一个线程，赋值给变量thread
      threadSideSlipWindow = threads.start(function() {
          try {
            sideSlipWindowMain();
          } catch (e) {
              toastLog(e);
          };
          //运行完毕修改按钮文字
          ui.run(() => {
          //在ui线程中修改按钮的文字
            toastLog('侧滑栏点击事件中的方法运行完毕')
          });
      });
  } else {
    threadSideSlipWindow.interrupt();
      //中断线程;
      ui.run(() => {
          //在ui线程中修改按钮的文字
          toastLog('侧滑栏点击事件中的方法被中断了')
      });
  };
});
function sideSlipWindowMain(){
  log('侧滑栏toggle')
  侧滑栏toggle()
}
function 侧滑栏toggle(){
  log('侧滑栏toggle')
  if(侧滑栏中心点是否在屏幕中()){
    log('侧滑栏中心点在屏幕中')
    log('移动侧滑栏至屏幕边缘()开始')
    移动侧滑栏至屏幕边缘()
    log('移动侧滑栏至屏幕边缘()结束')
  }else{
    log('侧滑栏中心点不在屏幕中')
    移动侧滑栏至屏幕中()
  }
}
function 移动侧滑栏至屏幕中(){
  var 侧滑栏中心点=获取侧滑栏中心点坐标()
  log('侧滑栏中心点',侧滑栏中心点)
  var x=侧滑栏中心点.x
  var y=侧滑栏中心点.y
  if(x>device.width/2){
    log('移动侧滑栏到屏幕右侧')
    移动侧滑栏到屏幕右侧()
  }else{
    log('移动侧滑栏到屏幕左侧')
    移动侧滑栏到屏幕左侧()
  }
}
function 移动侧滑栏到屏幕右侧(){
  log('移动侧滑栏到屏幕右侧')
  var 按钮left=sideSlipWindow.getX()
  var 按钮top=sideSlipWindow.getY()
  var 按钮宽度=sideSlipWindow.getWidth()
  var 按钮高度=sideSlipWindow.getHeight()
  log('按钮left=',按钮left,'按钮top=',按钮top)
  log('按钮宽度=',按钮宽度,'按钮高度=',按钮高度)
  var xStart=按钮left
  var yStart=按钮top
  var xEnd=device.width-按钮宽度
  var yEnd=按钮top
  log('xEnd=',xEnd,'yEnd=',yEnd)
  for(let i=0;i<(xStart-xEnd);i=i+6){
    sideSlipWindow.setPosition(xStart-i,yEnd)
    log(xStart-i,yEnd)
    sleep(3)
    if(sideSlipWindow.getX()<device.width-按钮宽度){
      log('侧滑栏移动到屏幕中了,跳出for循环')
      break
    }
  }
}
function 移动侧滑栏到屏幕左侧(){
  log('移动侧滑栏到屏幕左侧')
  var 按钮left=sideSlipWindow.getX()
  var 按钮top=sideSlipWindow.getY()
  var 按钮宽度=sideSlipWindow.getWidth()
  var 按钮高度=sideSlipWindow.getHeight()
  log('按钮left=',按钮left,'按钮top=',按钮top)
  log('按钮宽度=',按钮宽度,'按钮高度=',按钮高度)
  var xStart=按钮left
  var yStart=按钮top
  var xEnd=0
  var yEnd=(device.height-按钮高度)/2
  var yUnit=(yEnd-yStart)/(xEnd-xStart)
  var count=0
  log('xEnd-xStart=',xEnd-xStart)
  for(let i=0;i<(xEnd-xStart);i=i+8){
    var y=yStart+yUnit*count++;
    sideSlipWindow.setPosition(xStart+i,y)
    sleep(3)
    if(sideSlipWindow.getX()>0){
      log('sideSlipWindow.getX()>0,跳出for循环')
      break
    }
  }
}
function 侧滑栏中心点是否在屏幕中(){
  var 侧滑栏中心点=获取侧滑栏中心点坐标()
  log('侧滑栏中心点=',侧滑栏中心点)
  var x=侧滑栏中心点.x
  var y=侧滑栏中心点.y
  if(x>0 && x<device.width && y>0 && y<device.height){
    return true
  }
  return false
}
function 获取侧滑栏中心点坐标(){
  var x=sideSlipWindow.x
  var y=sideSlipWindow.y
  var width=sideSlipWindow.getWidth()
  var height=sideSlipWindow.getHeight()
  var centerX=(x+width/2)
  var centerY=(y+height/2)
  var centerXY={
    x:centerX,
    y:centerY
  }
  return centerXY
}
function init(){
  var obj={}
  var storage = storages.create("彩票77");
  // storage.put("a", 123);
  // log("a = " + storage.get("a"));
  obj.storage=storage;
  return obj
}
