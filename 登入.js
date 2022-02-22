"ui";
ui.statusBarColor("#000000")
var kg, u = 1,op = 0;
var stg = storages.create("user");
let zh = stg.get("list", {see: "",name: "",pass: ""});

ui.layout(
    <vertical bg="#708090">
        <vertical h="auto" align="center" margin="100 100 30 0">
            <img src="http://www.autojs.org/assets/uploads/profile/1-profileavatar.jpeg" w="70" h="70" circle="true"/>
        </vertical>
        <card w="*" h="250" margin="20" cardCornerRadius="15dp" cardBackgroundColor="#b0c4de"
        cardElevation="15dp" gravity="bottom" foreground="?selectableItemBackground">
        <vertical>
            <linear margin="0 40 0 0">
                <img w="30" h="30" src="@drawable/ic_person_black_48dp"/>
                <input id="name" w="*" h="40" hint="用户名/邮箱/手机号" inputType="textVisiblePassword"/>
            </linear>
            <linear>
                <img w="30" h="30" src="@drawable/ic_https_black_48dp"/>
                <input id="password" hint="密码" w="*" h="40" inputType="textPassword"/>
            </linear>
            <linear gravity="center">
                <checkbox id="cb1" text="记住密码"/>
                <checkbox id="cb2" text="自动登入"/>
            </linear>
            <linear gravity="center">
                <horizontal>
                    <button id="login" w="250" h="*" text="登录" size="16" style="Widget.AppCompat.Button.Colored"/>
                </horizontal>
            </linear>
            <linear gravity="center">
                <text w="106" gravity="center" color="#111111" size="16">还没有账号？</text>
                <text id="register" w="auto" h="auto" size="16" text="注册" paddingRight="15"/>
                <text id="reg" w="auto" h="auto" size="16" paddingLeft="10" text="忘记密码"/>
            </linear>
        </vertical>
    </card>
    </vertical>
);

if (zh.see == "1") {
    ui.name.setText(zh.name);
    ui.password.setText(zh.pass);
    ui.cb1.setChecked(true);
} else if (zh.see == "2") {
    ui.finish();
    engines.execScriptFile("./软件界面.js");
}


ui.login.on("click", () => {
    threads.start(function() {
        if (!ui.name.text()) {
            toast("您还没有输入用户名!");
            return;
        }
        if (!ui.password.text()) {
            toast("还没有输入密码呢");
            return;
        }
        var str = JSON.parse(http.get("https://www.apiopen.top/login?key=c0d2433c951a7bceff831e382124dea5&phone=" + ui.name.text() + "&passwd=" + ui.password.text()).body.string());
        if (str.code !== 200) {
            toast(str.msg);
            return;
        } else {
            if (op == 1) {
                stg.put("list", {see: "1",name: ui.name.text(),pass: ui.password.text()});
                toast("登入" + str.msg);
                engines.execScriptFile("./软件界面.js");
                ui.finish();
            } else if (op == 2) {
                stg.put("list", {see: "2",name: ui.name.text(),pass: ui.password.text()});
                toast("登入" + str.msg);
                engines.execScriptFile("./软件界面.js");
                ui.finish();
            } else {
                storages.remove("user");
                toast("登入" + str.msg);
                engines.execScriptFile("./软件界面.js");
                ui.finish();
            }
        }
    });
});
ui.emitter.on("back_pressed", e => {
    if (!kg) {
        kg = true;
        toast("再按一次退出");
        setTimeout(() => {
            kg = false;
        }, 250);
        e.consumed = true;
    } else {
        e.consumed = false;
    };
});
ui.register.on("click", () => {
    engines.execScriptFile("./注册.js");
});
ui.reg.on("click", () => {
    dialogs.confirm(null, "抱歉，暂时没有找回密码功能，是否重新注册一个新账号?", (a) => {
        if (a) {
            engines.execScriptFile("./注册界面.js");
        }
    })
});
ui.cb1.on("check", (checked) => {
    if (checked) {
        op = 1;
    } else {
        op = 0;
        u = 0;
        ui.cb2.setChecked(false);
    }
});
ui.cb2.on("check", (checked) => {
    if (checked) {
        ui.cb1.setChecked(true);
        op = 2;
        u = 1;
    } else {
        if (u) {
            op = 1;
        }
    }
});