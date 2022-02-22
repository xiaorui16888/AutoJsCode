"ui";
var tip = '使用教程\n1.使用前按“清空按钮”。\n2.在绿色区域输入你要查询的成语意思，可批量查询（一个成语一行）。\n3.“保存”可以把输入框中的内容进行保存，默认路径在"/sdcard/成语意思.txt"\n4.“导入”可以把提前编辑好的成语(一个成语一行)导入查看或查询，默认导入路径"/sdcard/成语.txt"\n5.“示例”批量查询成语及导入的标准格式\n\n \n       此脚本并不完美，有兴趣可自行修改\n     ';
var Examples = "起早贪黑\n闻鸡起舞\n默默无闻\n精卫填海\n一叶障目";
ui.layout(
    <vertical padding="8">
        <horizontal>
            <text textColor="black" textSize="18sp" layout_weight="1">成语字典 v1.0</text>
            <button id="del" text="删除" w="auto" style="Widget.AppCompat.Button.Borderless.Colored"/>
            <button id="baocun" text="保存" w="auto" style="Widget.AppCompat.Button.Borderless.Colored"/>
        </horizontal>
        <input id="text" h="500" gravity="top" bg="#00FF00" alpha="0.5"/>
           <horizontal>           
             <button layout_weight="1" text="查询" id="chaxun"/>
             <button layout_weight="1" text="清空" id="qingkong"/>
             <button layout_weight="1" text="导入" id="daoru"/>
             <button layout_weight="1" text="示例" id="shili"/>
           </horizontal>
    </vertical>
);
ui.text.setText(tip);
var path=[];
log(files.remove("/sdcard/.temp.txt"));

//保存
ui.baocun.click(()=>{
    files.append("/sdcard/成语意思.txt",ui.text.text());
    toast('保存成功!\n"/sdcard/成语意思.txt"');
});


//删除
ui.del.click(() => {
    log(files.remove("/sdcard/成语意思.txt"));
    toast('删除成功!!\n"/sdcard/成语意思.txt"');
});
//查询
ui.chaxun.click(() => {
    查询();
});
//清空
ui.qingkong.click(() => {
    ui.text.setText("");
});
//导入
ui.daoru.click(() => {
    log(files.ensureDir("/sdcard/成语.txt"));
    sleep(200);
    ui.text.setText(files.read("/sdcard/成语.txt"));
    //toast('导入成功!!\n"/sdcard/成语.txt');
});
//示例
ui.shili.click(() => {
    ui.text.setText(Examples);
});
//显示
function show(lg) {
    ui.run(() => {
        files.append("/sdcard/.temp.txt",lg);
        ui.text.setText(files.read("/sdcard/.temp.txt"));;
    });
}

function 查询() {
    threads.start(function() {
        log(files.remove("/sdcard/.temp.txt"));
        var txt = ui.text.text();
        var info = txt.split("\n");
        for (let a = 0; a < info.length; a++) {
            var url = "http://m.dict.cn/hanyu/search.php?q=";
            var res = http.get(url + info[a]);
            var html = res.body.string();
            html = cutstr(html, "<dl", "</dl>", 1, 20);
            html = cutstr(html, "<dd", "</dd>", 1, 20);
            html = html.split(">");
            var txt = info[a] + "\n【释义】" + html[1] + "\n";
            toast(info[a] + "  完成!");
            show(txt);
            sleep(100);

        }
    });
}


function cutstr(a, b, c, f, e) {
    a = a.split(b);
    var d = "";
    if (e < a.length && e != null) {} else {
        e = a.length;
    }
    if (f == null) {
        f = 1;
    }
    for (i = f; i < e; i++) {
        tmp = a[i].split(c);
        if (tmp.length > 1) {
            d += tmp[0];
        }
    }
    return d;
}