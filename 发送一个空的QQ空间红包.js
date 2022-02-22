auto.waitFor();

//直接分享一个空红包到QQ空间
var s = "我发了一个QQ空间红包,快来领取吧~~~";
app.startActivity({
    data : "mqqapi://qzone/to_redpocket_share"
})
text("转发理由...").waitFor();
sleep(200);
setText(0, s);
while(!click("发表"));



// //回调形式
// dialogs.rawInput("请输入内容", "", (s)=>{
//     if (s) {
//         threads.start(function() {
//             app.startActivity({
//                 data : "mqqapi://qzone/to_redpocket_share"
//             })
//             text("转发理由...").waitFor();
//             sleep(200);
//             setText(0, s);
//             while(!click("发表"));
//         })
//     }
// })


