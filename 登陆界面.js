"ui";
auto();
showLoginUI();
ui.statusBarColor("#000001")

//显示登录界面
function showLoginUI(){
    ui.layout(
      <frame w="*" h="*">
        <img w="550" h="550" margin="0 -115" src="file:///storage/sdcard0/2.png"/>
        <text textSize="23sp" textColor="white" margin="5 95" textStyle="bold">
            QQ用户登陆
       
        </text>
        <vertical h="auto" align="center" margin="0 50">
          <linear>
             <text w="53" gravity="center" color="#111111" size="20">账号</text>
             <input id="name" hint="请输入QQ账号" w="*" h="40"/>
          </linear>
          <linear>
             <text w="56" gravity="center" color="#111111" size="20">密码</text>
             <input id="password" hint="请输入密码" w="*" h="40" password="true"/>
          </linear>
          <linear gravity="center">
             <button id="login" w="250" radius="20dp" scaleType="fitXY" color="white" style="Widget.AppCompat.Button.Colored" text="登录"/>
          </linear>
        <linear>
        </linear>
        </vertical>
      </frame>
    );

    ui.login.click(() =>{
       toast("您输入的用户名为" + ui.name.text() + " 密码为" + ui.password.text());
    var 账号=ui.name.text();
    var 密码=ui.password.text();
    toast(账号+密码);
        click("夏世根");
      app.launchPackage(app.getPackageName("QQ轻聊版"))
        sleep(500);
        toast("运行1");
        text("夏世根").click()
        toast("运行2");
        click("夏世根");
         });
   }