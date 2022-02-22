var window = floaty.window(
    <card layout_width="match_parent" layout_height="match_parent" cardCornerRadius="8dp" cardElevation="0dp" gravity="center_vertical">
        <LinearLayout orientation="vertical" layout_width="wrap_content" layout_height="wrap_content" gravity="left|center">
            <EditText layout_width="360px" inputType="number" layout_height="85px" ems="10" hint="手机号码" textSize="15sp"id="EditText1"/>
            <LinearLayout orientation="horizontal" layout_width="wrap_content" layout_height="wrap_content">
                <EditText layout_width="260px" inputType="number" layout_height="85px" ems="10" textSize="15sp" hint="验证码" id="EditText2"/>
                <Button layout_width="100px" layout_height="75px" text="发送"/>
            </LinearLayout>
            <Button layout_width="match_parent" layout_height="match_parent" text="登入" id="exit"/>
        </LinearLayout>
    </card>
);
setInterval(() => {}, 1000);
window.setPosition(160, 360)

window.exit.on("click", () => {
    window.close();
    exit();
});