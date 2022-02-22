"ui";

ui.layout(
    <horizontal>
        <input id="aaa" inputType="number" w="*" h="auto"/>
    </horizontal>
);


let store = storages.create("ljy.mcu");

let idx = store.get("idx", "");
ui.aaa.setText(idx);
events.on("exit", function() {
    idx = ui.aaa.getText();
    //log(idx);
    store.put("idx", idx)//加上这句立马卡死？？？？？？
})