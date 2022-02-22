var page = 1;
while (true) {
    var page=1;
    var getArticleList = http.post("http://www.kuaiyueread.com/Index/getArticleList", {
            'type': 1,
            'page': page, //文章页数
            'cid': -1,
            'platform_type': -1,
        },
        getHeaders()); //获取新闻列表
    var TimeStamp = Math.round(new Date().getTime());
    var List = getArticleList.body.json().data["lists"];

    for (let i = 0; i < List.length; i++) {
        var id = List[i]["id"]; //获取id
        var title = List[i]["title"] //获取标题
        log("阅读文章:", title);
        sleep(random(1, 3) * 1000);
        var getGold = http.post("http://www.kuaiyueread.com/Userinfo/userReadAddGold?_=" + TimeStamp, {
                'platform_type': '1',
                'token': 'b4f02814c2ac00633e93f6487388cd4d',//抓包获取
                'id': id,
                'cid': '6',
                'type': '1',
                'page': page,
                'tid': id,
            },
            getHeaders()); //获取金币
       // log(getGold);
       
        var resu=new getGold.body.json();
        
        var countdown= resu.data.countdown*1000;
        log(resu.data.gold,"countdown:",countdown/1000,"s");
        sleep(countdown);
       // var countdown=resu.data.countdown*1000;
    //    log(getGold.body.json());
        
        /*
        var Golb = getGold.body.json().data.gold;
        if (Golb == 0) {
            log("【任务完成】快阅读");
            //exit();
        } else {
            log("获得:", Golb, "金币");
        }
        */
        page = page + 1;
    }
}

function getHeaders() {
    var header = {
        headers: {
            'Connection': 'Keep-Alive',
            'Content-Length': '217',
            'Cache-Control': 'no-cache',
            'Accept-Encoding': 'application/json',
            'Origin': 'http://webh5.kuaiyuekeji.com',
            'User-Agent': 'Mozilla/5.0 (Linux; Android 8.0; 6666 Build/6666; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044306 Mobile Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'zh-CN,en-US;q=0.8',
            'X-Requested-With': 'com.kyd.fast.read.app',
        }
    }
    return header;
}