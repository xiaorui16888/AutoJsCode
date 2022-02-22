  if (!requestScreenCapture()) {
      toast("请求截图失败");
      exit();
  }
  var 用户名 = "api_fnh000_eztp"
  var 密码 = "fnhdd123"
  var taken = "DF4B9D7F737047CE922EF1806590EB83";
  var pid = "";
  var 手机号 = ""
  var 地区码 = ""
  var 验证码 = ""
  var 密码微信 = "aaaaaa";

  function 登录() {
      var r = http.get("http://kk.codesfrom.com/yhapi.ashx?Action=userLogin&userName=" + 用户名 + "&userPassword=" + 密码);
      var r = r.body.string()
      var arr = r.split("|")
      taken = arr[1]
      log(taken)
  }

  function 取号() {
      var r = http.get("http://kk.codesfrom.com/yhapi.ashx?Action=getPhone&token=" + taken + "&i_id=1002")
      var arr = r.body.string().split("|")
      pid = arr[1]
      手机号 = arr[4]
      地区码 = arr[6]
  }

  function 验证码1() {

      var r = http.get("http://kk.codesfrom.com/yhapi.ashx?Action=getPhoneMessage&token=" + taken + "&p_id=" + pid)
      var arr = r.body.string().split("|")
      验证码 = arr[1]
  }

  function 名字() {
      //生成大写字母 A的Unicode值为65
      function generateBig_1() {
          var str = [];
          for (var i = 65; i < 91; i++) {
              str.push(String.fromCharCode(i));
          }
          return str;
      }
      //生成大写字母 a的Unicode值为97
      function generateSmall_1() {
          var str = [];
          for (var i = 97; i < 123; i++) {
              str.push(String.fromCharCode(i));
          }
          return str;
      }
      //将字符串转换成Unicode码
      function toUnicode(str) {
          var codes = [];
          for (var i = 0; i < str.length; i++) {
              codes.push(str.charCodeAt(i));
          }
          return codes;
      }

      function generateSmall() {
          var ch_small = 'a';
          var str_small = '';
          for (var i = 0; i < 26; i++) {
              str_small += String.fromCharCode(ch_small.charCodeAt(0) + i);
          }
          return str_small;
      }

      function generateBig() {
          var ch_big = 'A';
          var str_big = '';
          for (var i = 0; i < 26; i++) {
              str_big += String.fromCharCode(ch_big.charCodeAt(0) + i);
          }
          return str_big;
      }
      function getCharacter(flag) {
          var character = "";
          if (flag === "lower") {
              character = String.fromCharCode(Math.floor(Math.random() * 26) + "a".charCodeAt(0));
          }
          if (flag === "upper") {
              character = String.fromCharCode(Math.floor(Math.random() * 26) + "A".charCodeAt(0));
          }
          return character;
      }

      function getUpperCharacter() {
          return getCharacter("upper");;
      }

      function getLowerCharacter() {
          return getCharacter("lower");;
      }
      //console.log(getUpperCharacter());
      var name = "";
      for (i = 0; i <= 12; i++) {
          if (i == 6) {
              name = name + "\0";
              continue;
          }
          name = name + getLowerCharacter()

      }
      return name

      return name;
  }


  取号()

  log("用户名" + 名字())
  log("手机号为" + 手机号)
  log("地区代码为" + 地区码)
  log("验证码为" + 验证码)
  log("密码为" + 密码微信 + 手机号)
  //变量
  var name = 名字(); //用户名
  var phoneNumber = 手机号; //手机号
  var areaCode = 地区码; //区号
  var passWord = "aaaaaa" + phoneNumber; //密码
  var securityCode = 验证码; //验证码
  //代码
  app.launchPackage("com.tencent.mm")
  text("Sign Up").id("d74").waitFor();
  text("Sign Up").findOne().click();
  text("Name").waitFor();
  setText(0, name) //输入用户名
  sleep(1000);
  id("w1").findOne().click();
  id("bc").waitFor();
  id("bc").findOne().click();
  sleep(1000);
  setText(areaCode) //区号
  sleep(500);
  id("k6").text(areaCode).findOne().parent().click();
  sleep(1000);
  setText(1, phoneNumber) //输入手机号
  sleep(1000) //
  setText(2, passWord) //输入密码
  sleep(1000);
  id("czh").findOne().click();
  sleep(2000);
  desc("I have read and agree to the above terms").waitFor();
  desc("I have read and agree to the above terms").findOne().click();
  sleep(1000);
  desc("Next").findOne().click();
  sleep(2000);
  var a = className("android.view.View").boundsInside(30, 820, 1046, 938).findOne().bounds();
  click(a.centerX(), a.centerY())
  sleep(2000);
  //过验证
  function 滑图() {
      text("WeChat Security").findOne()
      toast("请 等待")
      sleep(3000)
      swipe(229, 1024, 827, 1024, 100);


  }
  滑图()
  while(1){
         
         
         
    var img = captureScreen();
    var point = findColor(img, "#f04040");
    if(point){
      click(1004,1137) 
      滑图() 
    }else{
        break;
        }
}
  toast("wait");
  //***************//

  sleep(2000)
  验证码1()
  text("Code").id("ge").waitFor();
  //等待验证码
  sleep(10000);
  setText(securityCode);
  sleep(1000);
  text("Next").findOne().click();
  text("Discover").waitFor(); //朋友圈
  text("Discover").findOne().parent().click();
  sleep(1000);
  text("Moments").waitFor(); //朋友圈
  text("Moments").findOne().parent().click();
  sleep(1000);
  id("hh").waitFor(); //发朋友圈
  id("hh").findOne().longClick();
  sleep(2000);
  text("Say something...").waitFor();
  setText("asdfghjklqwertyuiopzxcvbnmdbfjelnd");
  sleep(1000);
  text("Publish").findOne().click();
  sleep(1000)