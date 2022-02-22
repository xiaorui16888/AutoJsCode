var window = floaty.window(
    <card layout_width="match_parent" layout_height="match_parent" cardCornerRadius="8dp" cardElevation="0dp" gravity="center_vertical">
        <LinearLayout orientation="vertical" layout_width="wrap_content" layout_height="wrap_content" gravity="left|center">
            <EditText layout_width="360px" inputType="number" layout_height="85px" ems="10" hint="手机号码" textSize="15sp"id="EditText1" textColor="#0078FF"/>
            <LinearLayout orientation="horizontal" layout_width="wrap_content" layout_height="wrap_content">
                <EditText layout_width="260px" inputType="number" layout_height="85px" ems="10" textSize="15sp" hint="验证码" id="EditText2" textColor="#0078FF"/>
                <Button layout_width="100px" layout_height="75px" text="发送" id="code" textColor="#0078FF"/>
            </LinearLayout>
            <LinearLayout orientation="horizontal" layout_width="wrap_content" layout_height="wrap_content">
                <Button layout_width="wrap_content" layout_height="80px" text="登入" id="Loginto" textColor="#0078FF"/>
                <Button layout_width="wrap_content" layout_height="80px" text="退出" id="exit" textColor="#0078FF"/>
            </LinearLayout>
        </LinearLayout>
    </card>
);
setInterval(() => {}, 1000);
//window.setPosition(160, 360);

window.requestFocus();


window.code.on("click", () => {
    toastLog("获取验证码");
});

window.Loginto.on("click", () => {
    toastLog("登入");
});

window.exit.on("click", () => {
    window.close();
   // exit();
});


