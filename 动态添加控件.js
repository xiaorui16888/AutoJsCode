"ui";

ui.layout(<vertical >
        <vertical id="ll"/>
        <button id="add">点击动态添加</button>
    </vertical>)


ui.add.click(()=>{
    toast("点击了");
    var edit=new android.widget.EditText(activity);
    ui.ll.addView(edit);
})