auto("fast");

//launchApp("QQ");
//sleep(2000);
while (true) {
  //threads.shutDownAll()
  console.show()
  threads.start(function() {
    packageName("com.stardust.scriptdroid").className("android.widget.EditText").setText("点击确定->");
  });
  console.rawInput("请点击确定开始!")
    console.hide()
    console.clear()
    sleep(1000)
  while (true) {
    swipe((random(300,700)), (random(230,400)), random(300,500),random(900,1500), random(5,100))
    if (!(currentPackage() == 'com.tencent.mobileqq')) {
        console.show()
      console.info("退出了QQ!")
      break;
      //  swipe(600, 900, 600, 1400, 1);
    }
    sleep(60);
  }
}