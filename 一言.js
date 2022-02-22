var url = "https://v1.hitokoto.cn/";
var res = http.get(url);
if(res.statusCode == 200){
    console.show();
    log(res.body.string());
}