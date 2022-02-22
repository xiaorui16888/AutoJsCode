var content = rawInput("请输入要发生的消息");
context.startActivity(app.intent({
    action: "android.intent.action.SEND",
    type: "text/*",
    extras: {
        "android.intent.extra.TEXT": content
    },
    packageName: "com.tencent.mobileqq",
    className: "com.tencent.mobileqq.activity.JumpActivity"
})
.addFlags(android.content.Intent.FLAG_ACTIVITY_NEW_TASK));