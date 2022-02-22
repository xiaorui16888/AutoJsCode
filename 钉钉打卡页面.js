//企业id 就是 corpId 通过抓包获得
企业id = "dingaed1c37e0025eaa035c2f4657eb6378f"
aq = "dingtalk://qr.dingtalk.com/page/link?url=https://attend.dingtalk.com/attend/index.html?dd_web_timestamp=1557588671919&lwfrom=2019040215441244000&corpId="+企业id+"&showmenu=false&dd_share=false&dd_progress=false&spm=a2o5v.12729200#/home?spm=a2o5v.12587083"

app.startActivity({
    action: "android.intent.action.VIEW",
    data: aq
});