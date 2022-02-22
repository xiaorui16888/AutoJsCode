let view = ui.__inflate__(context,
    <vertical padding="16 0">
        <text>用户名</text>
        <input id="username" />
        <text>密码</text>
        <input id="password"/>
    </vertical>
    , null, false);

dialogs.build({
    customView: view,
    title: "登录",
    positive: "确定",
    negative: "取消",
    wrapInScrollView: false,
    autoDismiss: false
}).on("positive", (dialog) => {
    let username = String(view.username.getText())
    let password = String(view.password.getText())
    log(username, password);
    if (username != 'root' && password != '123456') {
        view.password.setError("密码不正确");
    } else {
        dialog.dismiss();
        toast("登录成功");
    }
}).on("negative", (dialog) => {
    dialog.dismiss();
}).show();