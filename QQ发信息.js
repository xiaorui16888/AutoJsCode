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
            一键发QQ信息
       
        </text>
        <vertical h="auto" align="center" margin="0 50">
          <linear>
             <text w="53" gravity="center" color="#111111" size="20">信息</text>
             <input id="first" hint="请输入信息" w="*" h="40"/>
          </linear>
          <linear>
             <text w="56" gravity="center" color="#111111" size="20">联系人</text>
             <input id="second" hint="请输入联系人" w="*" h="40" password="true"/>
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
       toast("您输入的信息为" + ui.first.text() + " 联系人为" + ui.second.text());
    var 信息=ui.name.text();
    var 联系人=ui.password.text();
    toast(信息);
      app.launchPackage(app.getPackageName("QQ轻聊版"))
        sleep(5000);
        toast("开始运行")
        click(联系人);
        input(信息);
        click("发送");
         });
   }