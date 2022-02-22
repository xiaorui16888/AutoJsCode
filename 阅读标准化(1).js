// 阅读的一般流程
// 粗略划分 注册->阅读
// 详细划分
// 注册
// 启动app->进入我的页面->(没有登录)进入注册界面->输入手机号->输入图片验证码->输入短信验证码->登录app
// 阅读
// 进入文章列表->点击一篇文章->向上滑动->浏览完毕返回文章列表

// 每一个步骤都跟上一个步骤有关

// 上一个步骤执行成功才可以执行当前步骤

// 这是每一个步骤都有的特性
// 应该抽象出来
// previous

/**
  * 每个步骤有类似的行为,抽象出来.
  * @method Step
  * @param stepName 当前步骤的名字.
  * @param previous 前一个步骤.
  * @throws 重复执行步骤的次数超过最大次数, 当前步骤名字=xxx
  * @desc   每个步骤有类似的行为, 抽象出来
  */
 function Step(stepName,previous){

  this.stepName=stepName
  // 重复执行当前步骤,最多三次
  this.doMaxtimes=3
  //第一步和最后一步为null
  if(previous){
    this.previous=previous
  }else{
    this.previous=()=>{}
  }
  //执行这个步骤之前应该具备的状态
  this.doBeforeShouldPossessStatus={}
  //执行这个步骤之后应该具备的状态
  this.doAfterShouldPossessStatus={}
  //用来存储当前状态
  this.currentStatus={}
  //update当前状态
  this.updateCurrentStatus=function(){
    console.log(this.stepName+'更新当前状态')
  }
  //这个步骤需要做的事情
  this.needDo=function(){
    console.log(this.stepName+'做点正事')
  }
  //处理可能在这个步骤发生的异常情况,比如弹框之类的
  this.handleAccident=function(){
    console.log(this.stepName+'做点羞羞的事')
  }
  //检查执行这个步骤之前的状态
  this.verifyConditionDoBeforStatus=function(){
    log(util.format('执行步骤%s之前,验证界面状态',this.stepName))
    this.updateCurrentStatus()
    for(var k in this.doBeforeShouldPossessStatus){
      if(
        this.currentStatus.hasOwnProperty(k) &&
        this.currentStatus[k] == this.doBeforeShouldPossessStatus[k]
        ){
        }else{
          //不具备执行当前步骤的条件
          return false
        }
    }
    //具备执行当前步骤的条件
    return true
  }
  //检查执行这个步骤之后的状态
  this.verifyConditionDoAfterStatus=function(){
    log(util.format('执行步骤%s之后,验证界面状态',this.stepName))
    this.updateCurrentStatus()
    for(var k in this.doAfterShouldPossessStatus){
      if(
        this.currentStatus.hasOwnProperty(k) &&
        this.currentStatus[k] == this.doAfterShouldPossessStatus[k]
        ){
        }else{
          //不具备执行下一个步骤的条件
          return false
        }
    }
    //具备执行下一个步骤的条件
    return true
  }
  //执行步骤
  this.do=function(){
    for(let i=0;i<this.doMaxtimes;i++){
      if(this.verifyConditionDoBeforStatus()){
        log(util.format('做事情-->%s',this.stepName))
        this.needDo()
        sleep(2000)
      }else{
        //重新执行上一步
        log(util.format('重新执行上一步: 做事情-->%s',this.previous.stepName))
        this.previous()
        sleep(2000)
      }
      if(this.verifyConditionDoAfterStatus()){
        return true
      }else{
        log(util.format('做事情-->%s出现了其他情况,正在处理',this.stepName))
        this.handleAccident()
        sleep(2000)
      }
    }
    //超过执行当前步骤的最大次数
    throw util.format('重复执行步骤的次数超过最大次数,当前步骤名字=%s',this.stepName);
  }
}



// 我们来写一个在autojsQQ群发消息的例子
// 首先打开QQ
打开QQ=new Step('打开QQ',null)
点击左下角的消息=new Step('点击左下角的消息',打开QQ)
点击Autojs群=new Step('点击Autojs群',点击左下角的消息)
输入消息=new Step('输入消息',点击Autojs群)
发送消息=new Step('发送消息',输入消息)

//上面是创建了每个步骤的实例
//接下来设置每个步骤要做什么
打开QQ.needDo=function(){
  launchApp("QQ");
}
点击左下角的消息.needDo=function(){
  var 消息控件=boundsInside(0, device.height/4, device.width/4, device.height).text('消息').findOnce()
  // var 消息控件=idEndsWith('name').findOnce()
  点击控件(消息控件)
}
//点击消息之后最上方应该有消息两个字
点击左下角的消息.doAfterShouldPossessStatus={
  最上方的标题:'消息'
}
点击左下角的消息.updateCurrentStatus= function (){
  // id = ivTitleName
  var 最上方的标题=idEndsWith('ivTitleName').findOnce()
  if(最上方的标题){
    this.currentStatus.最上方的标题=最上方的标题.text()
  }else{
    this.currentStatus.最上方的标题=''
  }
}
点击Autojs群.needDo=function(){
  //由于text和desc中都没有autojs这几个字,只能用ocr了,群文件中有OPR插件
  var result=识别文字()
  var autojs坐标=提取指定文字的坐标('auto.js',result)
  var x=autojs坐标.x
  var y=autojs坐标.y
  press(x,y,1)
}
输入消息.needDo=function(){
  var 消息输入框=idEndsWith('input').findOnce()
  消息输入框.setText('海贼王,舍我其谁!')
}
发送消息.needDo=function(){
  var 发送控件=text('发送').findOnce()
  点击控件(发送控件)
}

//上面把每一步需要做什么都设置好了
//接下来  let's do

我们要做的事情=[
  打开QQ,
  点击左下角的消息,
  点击Autojs群,
  输入消息,
  发送消息
]


我们要做的事情.map(
  (action)=>{
    log(util.format('当前要执行的步骤-->%s',action.stepName))
    action.do()
  }
)











function 提取指定文字的坐标(specifiedText,OCRResult){
  log('specifiedText=',specifiedText)
  log('OCRResult=',OCRResult.words)
  log('OCRResult.words的类型=',Object.prototype.toString.call(OCRResult.words))
  var wordsArr=OCRResult.words.toArray()
  log('wordsArr.length=',wordsArr.length)

  // for(var k in OCRResult.words){
  //   log(k+'='+OCRResult.words[k])
  // }

  // bounds=Rect(3, 7 - 88, 31)
  // text=P:0/1
  // 00:55:46.151

  // for(var k in wordsArr[0]){
  //   log(k+'='+wordsArr[0][k])
  // }

  for(let i=0;i<wordsArr.length;i++){
    log(wordsArr[i])
    // log('wordsArr[i].Word的类型=',Object.prototype.toString.call(wordsArr[i]))
    var text=wordsArr[i].text
    log("wordsArr["+i+"].text=",wordsArr[i].text)
    if(   (text.toLowerCase() == specifiedText) ||
          (text.toLowerCase().replace(/[.-]/,'') == specifiedText.replace(/[.-]/,'')
      )
    ){
      var bounds=wordsArr[i].bounds
      var x=bounds.centerX()
      var y=bounds.centerY()
      log("x,y,")
      return {x:x,y:y}
    }
    // Word{text='AutO.jS', bounds=Rect(223, 995 - 377, 1043), confidences=87.31852}
  }
  return false
}










//由于控件点击很常用,我们做个函数
function 点击控件(控件) {
  log(控件)
  if(控件){
    var x = 控件.bounds().centerX()
    var y = 控件.bounds().centerY()
    log('将要点击的坐标 %s,%s', x, y)
    press(x, y, 1)
  }else{
    log('没有找到控件')
  }
}



function 识别文字(){
  requestScreenCapture()
  var OCR=plugins.load('org.autojs.plugin.ocr')
  log(OCR)
  var ocr = new OCR();
  events.on("exit", () => {
     ocr.end();
  });
  var img=captureScreen()
  var result=ocr.ocrImage(img)
  log('ocr识别结果',result)
  img.recycle()
  return result
}
