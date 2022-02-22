//请问大家，我想监控对话框里输入的内容，
//之后自动点确定，应该怎么改这段代码？

dialogs.build({
        title: "语音输入要做的", //对话框标题
        content: "1", //对话框内容
        positive: "确定", //确定键内容
        negative: "取消", //取消键内容
        neutral: "中性键", //中性键内容
        checkBoxPrompt: "勾选框", //勾选框内容
        inputPrefill: "" //输入框，可以预先填入内容
    })
    //监听输入框
    //.on("input", (input) => {
    //    toast(input)
    //})
    //监听确定键
    .on("positive", () => {
        toast("开始下载....")
    })
    //监听中性键
    .on("neutral", () => {
        app.openUrl("https://www.autojs.org");
    })
    //监听勾选框
    .on("check", (checked) => {
        log(checked)
    }).show()

threads.start(function() {
    sleep(5000)
    var a = input
    sleep(5000)
    var b = input
    if (a = b) {
        toast(input) //监控输入控件
    } //判断点击
})