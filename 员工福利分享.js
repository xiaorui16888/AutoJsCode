"ui";

showLoginUI();
ui.statusBarColor("#000000")

function showLoginUI(){
    ui.layout(
        <frame>
        <vertical align="center">
        <linear>
        <text>这是员工福利软件，需要员工账号</text>
        </linear>
        <linear>
        <input hint="员工用户名">
        <input password="true" hint="员工密码">
        </linear>
        <linear>
        <button text="登录"id="er">
        </linear>
        </vertical>
        </frame>
        );
    
        ui.er.click(()=>{
            toast("登录成功")
            });
        };