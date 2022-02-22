"ui";
ui.layout(
    <vertical>
        <horizontal>
            <button id="b0" text="全选" w="auto" />
        </horizontal>
        <ScrollView>
            <vertical id="v" padding="16">
                    <checkbox id="c1" text="1" />
                    <checkbox id="c2" text="2" />
            </vertical>
        </ScrollView>
    </vertical>
);

ui.c1.on("check", (checked) => {
    if (checked) {
        console.log("1111111：选中");
    } else {
        console.log("1111111：取消");
    }
});
ui.c2.on("check", (checked) => {
    if (checked) {
        console.log("2222222：选中");

    } else {
        console.log("2222222：取消");
    }
});
ui.b0.on("click", (click) => {
    console.log("b0");
    if (click) {
        let list = new Array();
        console.log(ui.v.childCount);
        for (let index = 0; index < ui.v.childCount; index++) {
            list[index] = ui.v.getChildAt(index);    
            if (list[index].isChecked()) {
                list[index].checked = false;
            }
            else {
                list[index].checked = true;
            }
        }
    }
});