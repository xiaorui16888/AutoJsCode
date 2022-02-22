var url = "https://www.lanzous.com/b308996/";
var res = http.get(url);
var now_version="v1.1";

if(res.statusCode == 200){
    //toast("请求成功");



    if(res.body.string().indexOf(now_version)>0)
    {
        toast("当前为最新版");
    }
    else
    {
        toast("请更新");
    }
}else{
    toast("请求失败:" + res.statusMessage);
}
