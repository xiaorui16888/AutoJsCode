  console.show();
  var r = http.get("https://h5.qzone.qq.com/ugc/share/D827C1AD59A3DA0D5897E3EED6966186?uw=2011880387&subtype=0&blog_photo=0&appid=311&ciphertext=D827C1AD59A3DA0D5897E3EED6966186&g_f=2000000393&_wv=1");
  var 网页源码 = r.body.string(); //正则匹配的内容
  var 表达式 = 'info\":{\"title\":\"([\\s\\S]*?)\",\"summary';
  //log(表达式);//查看表达式是否显示正确
  var 结果数组 = new RegExp(表达式); //正则匹配
  var 结果 = 结果数组.exec(网页源码);
  log(结果[1]);