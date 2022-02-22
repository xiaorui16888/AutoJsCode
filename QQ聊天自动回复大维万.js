"auto";
console.show();
launchApp("QQ");
sleep(1000);

Text = "";
while (true) {
    var UIOB = className("android.widget.AbsListView").findOne();
    if (getEndText(UIOB) && getEndText(UIOB) != Text) {
        Text = getEndText(UIOB);
        log(Text);
        var txt = TuringRobot(Text);
        input(txt);
        while (!click("发送"));
    };
};


function getEndText(UiObject) {
    try {
        var sum = UiObject.childCount();
        if (sum) {
            var Object = UiObject.child(sum - 1);
            if (!Object.childCount()) {
                Object = UiObject.child(sum - 2);
            };
            if (Object.child(Object.childCount() - 1).className() == "android.widget.TextView") {
                return Object.child(Object.childCount() - 1).text();
            };
        };
    } catch (e) {};
};

function TuringRobot(message, id) {
    var url = "http://www.tuling123.com/openapi/api";
    var res = http.postJson(url, {
        key: "1c2514d9c9884931985b5bef1232fa24",
        info: message,
        userid: "1"
    });
    var txt = res.body.json().text;
    return txt;
};