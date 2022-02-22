"ui";

var usay;
var r;
var str;
var res;
var a;


ui.layout(
    <vertical>
        <text text="沙雕网友↓" textSize="70"/>
        <input id="ai" textSize="10"/>
        <text text="你↓" textSize="70"/>
        <input id="u" hint="你想说啥？" textSize="30"/>
        <button id="ok" text="确认"/>
    </vertical>
);

ui.ok.click(function()
{
    usay = ui.u.getText();
    threads.start(function()
    {
        r = http.postJson("http://www.tuling123.com/openapi/api", { key: "65458a5df537443b89b31f1c03202a80", 
        info: usay, userid: "1", }); 
        str=JSON.stringify(r.body.string());
        res=JSON.parse(str);
        a=JSON.parse(res).text;
     });
    
    setText(0,a);
});