console.show()
var 赞 = className("ImageView").desc("赞").untilFind();
var tu = descContains("次赞");
var 名片界面 = desc("编辑资料").text("编辑资料");

function 下滑() {

    className("AbsListView").id("name").scrollable().scrollForward();

}

function 名片() {
    if (名片界面.findOne(1000)) {tu.click()
        log("名片界面")
    }
     else  if(赞){log("开始点赞");点赞()}
    else {
        log("正在寻找")
    }



}



function 点赞() {
    赞
        .each(function(item) {
            for (var i = 0; i < 5; i++) {
                log("点赞");
                item.click();
                sleep(100)
            }


        });

下滑()
}


for (;;) {
    名片()
}