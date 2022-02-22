
一个一个输入数字('2345678901')

function 一个一个输入数字(phoneNum){

  请输入手机号=text("请输入手机号").findOne(300)
  请输入手机号.setText(phoneNum[0])
  sleep(100)
  for(let i=1;i<phoneNum.length;i++){
    input(0,phoneNum[i])
    延迟=随机延迟(200)
    log(延迟)
    sleep(延迟)
  }
}

function 随机延迟(num){
  var max=num+50
  var min=num-50
  return Math.floor(Math.random()*(max-min+1)+min);
}
