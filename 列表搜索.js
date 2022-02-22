"auto";

/*
列表文本搜索
By 张达
QQ:32552732
E-Mail:new-age@outlook.com
代码和注释太乱，不是给人看的，
嗯，是给我看的。
*/

toast("请稍等5秒...");

sleep(5000);

console.show();
var lists = className("android.widget.ListView").find(); //列表控件
if (lists) {
    var listsc = lists.size(); //列表数量
    if (listsc > 0) {
        console.info("你好，开始运行咯~");
        var lsts = new Array(); //所有列表文本内容
        var lss = new Array(); //所有列表展示列表
        console.warn("共找到" + listsc + "个列表");
        for (var listi = 0; listi < listsc; listi++) { //循环处理列表
            var ltexts = new Array(); //列表文本内容
            console.verbose("处理第" + listi + "个列表，共" + listsc + "个列表");
            var lts = lists.get(listi).find(className("android.widget.TextView")); //列表文本控件
            var ltsc = lts.size();
            if (ltsc > 0) {
                console.warn("在列表" + listi + "中找到" + ltsc + "个文本");
                for (var ltsi = 0; ltsi < ltsc; ltsi++) { //循环处理文本
                    console.verbose("处理第" + ltsi + "个文本，共" + ltsc + "个文本");
                    var ltst = lts.get(ltsi).text();
                    if (String(ltst)) { //过滤无效文本（空文本）
                        console.log("在列表" + listi + "找到的第" + ltsi + "个文本为" + ltst);
                        ltexts.push(ltst); //新增到列表文本
                    } else {
                        console.verbose("在列表" + listi + "找到的第" + ltsi + "个文本为空，已忽略");
                    }
                }
            } else {
                console.error("无法在列表" + listi + "找到文本");
            }
            var ltextsc = ltexts.length; //列表有效文本数量
            console.warn("列表" + listi + "共找到" + ltextsc + "个文本：" + ltexts);
            lsts.push(ltexts); //新增到所有列表文本
        }
        for (var ii = 0; ii < lsts.length; ii++) { //循环读取所有列表文本到所有列表展示列表（for(i in array){}总是给我的i输出一堆intent什么鬼的东西，弃之~）
            var ls = "列表" + ii + "：包含"; //单条展示列表内容
            var iii = 0; //临时循环用变量
            var lstss = lsts[ii]; //单条列表内容
            for (var iii = 0; iii < lstss.length; iii++) {
                ls += lstss[iii]; //添加到单条展示列表内容
                if (iii > 2) { //设置最多读取条数
                    ls += "等"; //超出最多条数结尾字符
                    break; //跳出循环
                } else if (iii < lstss.length) { //如果这个文本不是最后一位，则加入分隔符号
                    ls += "、"; //单条展示列表文本分隔
                }
            }
            lss.push(ls);
        }
        var slistc = 0; //最大的列表数量
        var slist = 0; //最大的列表序号
        for (var i = 0; i < lsts.length; i++) { //筛选出最大列表
            if (lsts[i].length > slistc) { //判断与上一列表大小
                //设置最大列表数量及序号
                slistc = lsts[i].length;
                slist = i;
            }
        }
        console.log("最大列表为列表" + slist + "，共含有" + slistc + "条有效文本");
        console.info("一切正常，处理完成");
        //搜索部分
        //原思路是使用正则表达式搜索，搜索到关键词弹窗选择继续、暂时隐藏弹窗以供操作及退出搜索，并根据滑动后文本的变化判断是否到底并自动终止，现在因为懒~有空补上吧
        var selist = dialogs.singleChoice("请选择列表...", lss, slist); //要求选择列表，默认焦点在最大列表slist，本来有个思路，通过检测列表文本变化来判断滑动的列表来选择，但是懒，有空就补上吧
        var seword = String(prompt("在列表中搜索...")); //要求搜索词
        if (String(seword)) { //搜索词不为空
            toast("搜索" + seword);
            var seok = false; //搜索完成变量
            sleep(500); //等待
            while (!seok) {
                sleep(500); //等待
                var selts = lists.get(selist).find(className("android.widget.TextView")); //列表文本控件
                var seltsc = selts.size();
                for (var i = 0; i < seltsc; i++) { //循环搜索
                    var setext = String(selts.get(i).text());
                    if (setext.match(seword) != null) { //如果匹配搜索词
                        alert("搜索完成", setext + "位于列表在屏幕上的第" + (i + 1) + "项");
                        seok = true; //搜索完成
                    }
                }
                if (!seok) { //若未搜索完成则滑动列表
                    lists.get(selist).scrollDown(); //滑动列表
                    sleep(500); //等待
                }
            }
        }
    } else {
        console.error("无法在当前页面找到列表"); //原思路是在找不到列表时弹出是否重试，现在懒呐，也感觉没多大影响，有空补上
    }
} else {
    console.error("无法在当前界面找到列表");
}