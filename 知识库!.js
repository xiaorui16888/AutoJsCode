"ui";
var inputWidth = Math.round(0.83 * device.width);
var webWidth = Math.round(0.83 * device.width);
var width = Math.round(0.17 * device.width);
ui.layout(
    <vertical>
    <horizontal bg="#346489">    
      <input id="input" w="{{inputWidth}}px" lines="1" textSize="16sp" margin="10px" bg="#ffffeeff" gravity="center"/>
      <button id="but" margin="10px" bg="@drawable/ic_cached_black_48dp"/>
    </horizontal >    
    <button id="but1" w="*" text="用浏览器打开"/> 
    <horizontal h="*">    
      <webview w="{{webWidth}}px" h="*" size="6" id="webview" margin="10px" />
      <list id="list" w="*" h="auto" bg="#346489">
        <vertical w="*" h="{{width}}px" bg="#dddddd" margin="10px" gravity="center">
          <text w="auto" h="auto" textSize="16sp" padding="5px" gravity="center" text="{{txt}}"/>
        </vertical>
      </list>
    </horizontal>
  </vertical>
);
//          <text w="auto" h="auto" textSize="8sp" lines="3" padding="5px" gravity="center" text="{{url}}"/>

var item0 = [
    {
        url: "item1",
        txt: "JavaScript"
    },
    {
        url: "http://m.x81zw.com",
        txt: "小说"
    },
    {
        url: "http://www.baidu.com",
        txt: "baidu"
    }
];
var item1 = [{
        url: "item0",
        txt: "返回"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-tutorial.html",
        txt: "javascript"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-array.html",
        txt: "array"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-boolean.html",
        txt: "boolean"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-date.html",
        txt: "date"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-math.html",
        txt: "math"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-number.html",
        txt: "number"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-regexp.html",
        txt: "regexp"
    },
    {
        url: "http://www.runoob.com/jsref/jsref-obj-string.html",
        txt: "string"
    }
];

ui.list.setDataSource(item0);

//ui.webview.loadUrl("http://www.autojs.org/");

ui.list.on("item_click", function(item, itemView) {
    try {
        if (item.txt == "返回"||item.txt == "JavaScript") {                    
                    ui.list.setDataSource(eval("("+item.url+")"));           
            } else {
            ui.webview.loadUrl(item.url);
            ui.run(() => {
                ui.input.setText(item.url);
            });
        }
        //ui.webview.loadUrl(item.url);
    } catch (e) {
        toast("错误");
    }
});

ui.but.click(() => {
    var A = ui.input.getText();
    toast(A);
    if(A)ui.webview.loadUrl(A);
});

ui.but1.click(() => {
    var A = ui.webview.getUrl();
    toast(A);
    if(A)app.openUrl(A);
});

/* 
代码	输出
\'	单引号
\"	双引号
\\	反斜杠
\n	换行
\r	回车
\t	tab(制表符)
\b	退格符
\f	换页符

*/