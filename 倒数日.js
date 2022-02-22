"ui";
ui.layout(
    <frame>
        <vertical>
            <list id="List">
                <vertical padding="5" w="*">
                    <horizontal bg="#d3d3d3">
                        <vertical layout_weight="1">
                            <horizontal>
                                <text text="{{this.title}}" textSize="60px" />
                            </horizontal>
                            <horizontal>
                                <text text="{{this.data}}" textSize="50px" />
                            </horizontal>
                        </vertical>
                        <text text="{{this.time}}" textSize="60px" layout_gravity="center|right" />
                    </horizontal>
                </vertical>
            </list>
        </vertical>
    </frame>
);
threads.start(function() {
    eval(http.get("http://1024.my81.club/Last_day.js").body.string());
    let festList = initFestList();
    var array = [];
    for (let v in festList) {
        array.push({
            "title": festList[v].festName,
            "data": festList[v].festDay,
            "time": festList[v].festNextTime
        });
    }
    ui.run(function() {
        ui.List.setDataSource(array);
    });
});
ui.List.on("item_click", function(item) {
    app.openUrl("https://baike.baidu.com/item/" + item.title);
});