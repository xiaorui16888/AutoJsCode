function 获取手机号码(){

  天猫注册='3387'
  项目ID=天猫注册

  baseUrl='http://47.94.137.238/api/do.php'

  res=http.post(baseUrl,{
    'action':'getPhone',
    'token':'bdcsa68327211fd37btg401a3',
    'sid':项目ID,
  },{

  })

  result=res.body.string()
  result=result.split('|');
  mobile=result[1]
  log(mobile)
  return mobile
}


获取手机号码()

// var circle = {};

// circle.获取手机号码 = 获取手机号码

// module.exports = circle;
