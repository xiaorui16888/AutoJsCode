"ui";



var jiemian = {};
jiemian.fuxuan = function(zhi) {
    var hanshu = "ui."+zhi+".isChecked()";
    return eval(hanshu);
}
jiemian.suruka = function(zhi) {
    var hanshu = "ui."+zhi+".getText()";
    return eval(hanshu);
}




ui.layout(
    <vertical>
        <appbar>
            <toolbar id="" title="设置" />
        </appbar>
        <horizontal gravity="center" padding="10">
            <button w="auto" id="click_me" text="恢复默认"/>
            <button w="auto" id="tijiao" color="#009688" text="确定开始"/>
        </horizontal>
        <frame bg="#eeeeee" id="liebiao">
            <list id="list">
                <vertical w="*" h="auto" margin="5 10" padding="8" bg="#ffffff">
                    <horizontal w="*" h="2" bg="#009688"></horizontal>
                    <horizontal margin="3 0">
                        <text layout_weight="3" id="name_{{id}}" textSize="18sp" textColor="#000000" text="应该名称: {{name}}"/>
                        <checkbox layout_weight="1" id="kaiguan_{{id}}" checked="{{kaiguan}}"  text="是否开启"/>
                    </horizontal>
                    <horizontal>
                        <checkbox layout_weight="1" id="yuedu_{{id}}" checked="{{yuedu}}" textColor="#666666" text="内容阅读"/>
                        <checkbox layout_weight="1" id="zhuanfa_{{id}}" checked="{{zhuanfa}}" textColor="#666666" text="转发"/>
                        <checkbox layout_weight="1" id="tixian_{{id}}" checked="{{tixian}}" textColor="#666666" text="自动提现"/>
                    </horizontal>
                    <horizontal gravity="center_horizontal">
                        <input inputType="number|numberDecimal" id="shichang_{{id}}" hint="请输阅读时长" gravity="center_horizontal" text="{{shichang}}"/>
                        <text textSize="14sp" textColor="#000000" text="分钟"/>
                    </horizontal>
                </vertical>
            </list>
        </frame>

    </vertical>
);


var items = [
    {id: 0, name: "刷宝", kaiguan: true, yuedu: true, zhuanfa: false, tixian: true, shichang: 30},
    {id: 1, name: "闪电盒子", kaiguan: true, yuedu: true, zhuanfa: true, tixian: true, shichang: 40},
    {id: 2, name: "微鲤看看", kaiguan: true, yuedu: true, zhuanfa: true, tixian: true, shichang: 30},
    {id: 3, name: "趣看天下", kaiguan: false, yuedu: true, zhuanfa: true, tixian: true, shichang: 20},
    {id: 4, name: "中青看点", kaiguan: true, yuedu: true, zhuanfa: false, tixian: true, shichang: 30},
];
ui.list.setDataSource(items);


ui.click_me.on("click", ()=>{
    //toast("我被点啦");
    ui.list.setDataSource(items);
});


ui.tijiao.on("click", ()=>{
    //toast("我被点啦");
    var zhs_items = items;

    var kaiguans = jiemian.fuxuan("kaiguan_0");
    log(kaiguans);
    log('------------------------------');
    kaiguans = jiemian.fuxuan("kaiguan_1");
    log(kaiguans);
    log('------------------------------');
    kaiguans = jiemian.fuxuan("kaiguan_2");
    log(kaiguans);
    log('------------------------------');
    kaiguans = jiemian.fuxuan("kaiguan_3");
    log(kaiguans);
    log('------------------------------');
    kaiguans = jiemian.fuxuan("kaiguan_4");
    log(kaiguans);
    log('------------------------------');


    // for (i = 0; i < items.length; i++) { 
    //     var lieb = items[i].id;
    //     log(lieb);
    //     var kaiguans = jiemian.fuxuan("kaiguan_"+lieb);
    //     log(kaiguans);
    //     var yuedus = jiemian.fuxuan("yuedu_"+lieb);
    //     log(yuedus);
    //     var zhuanfas = jiemian.fuxuan("zhuanfa_"+lieb);
    //     log(zhuanfas);
    //     var tixians = jiemian.fuxuan("tixian_"+lieb);
    //     log(tixians);
    //     var shichangs = jiemian.suruka("shichang_"+lieb);
    //     log(shichangs);
    //     log('------------------------------');
    //     sleep(100);
    //  }
});
