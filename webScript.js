function webScript(){
  document.querySelector('#landing > div > div.landing_ipt.register_phone > input[type="text"]').value='手机号'
  document.querySelector('#landing > div > div:nth-child(2) > input[type="text"]').value='验证码111'
  document.querySelector('#landing > div > div:nth-child(3) > input[type="text"]').value='验证码222'
  document.querySelector('#landing > div > div:nth-child(4) > input[type="text"]').value='交易密码'
  return '点击了搜索按钮'
}
;webScript();
