auto();
console.show();
launchApp("QQ");
toastLog("请手动打开QQ群成员列表界面");
waitForActivity("com.tencent.mobileqq.activity.TroopMemberListActivity");
log("进入");

var json = {
    message: {
        className: "android.widget.FrameLayout"
    },
    Subset: [{
        message: {
            className: "android.widget.FrameLayout",
            id: "com.tencent.mobileqq:id/name"
        },
        Subset: [{
            message: {
                className: "android.widget.LinearLayout",
                id: "com.tencent.mobileqq:id/name"
            },
            Subset: [{
                message: {
                    className: "android.widget.ImageView",
                    id: "com.tencent.mobileqq:id/name"
                }
            }, {
                message: {
                    className: "android.widget.LinearLayout"
                },
                Subset: [{
                    message: {
                        className: "android.widget.TextView",
                        id: "com.tencent.mobileqq:id/name",
                    }
                }, {
                    message: {
                        className: "android.widget.TextView",
                        id: "com.tencent.mobileqq:id/name",
                    }
                }, {
                    message: {
                        className: "android.widget.LinearLayout",
                        id: "com.tencent.mobileqq:id/name"
                    },
                    Subset: [{
                        message: {
                            className: "android.widget.TextView",
                            id: "com.tencent.mobileqq:id/tv_name",
                            isReturn: true
                        }
                    }]
                }]
            }]
        }]
    }]
};


while (true) {
    var list = className("android.widget.AbsListView").findOne();
    for (let i = 0; i < list.childCount(); i++) {
        var child = list.child(i);
        var ret = 控件判断(child, json);
        if (ret) {
            if (Array.isArray(ret)) {
                log(ret[0].text());
            };
        } else {
            log(ret);
        };
    };

    if (!list.scrollForward()) {
        break;
    };
    sleep(100);
};





//返回值是一个object。
function 生成表达式(UiObject) {
    if (!UiObject) {
        throw "UiObject 空";
    };
    var ob = {};
    if (UiObject.childCount()) {
        ob.message = Uimessage(UiObject);
        ob.Subset = UiSubset(UiObject);
        return ob;
    } else {
        ob.message = Uimessage(UiObject);
        return ob;
    };
};

//在此可以修改或添加它的输出内容
function Uimessage(UiObject) {
    var mess = {};
    if (UiObject.className()) {
        mess.className = UiObject.className();
    };
    if (UiObject.id()) {
        mess.id = UiObject.id();
    };
    if (UiObject.text()) {
        mess.text = UiObject.text();
    };
    if (UiObject.desc()) {
        mess.desc = UiObject.desc();
    };
    return mess;
};

function UiSubset(UiObject) {
    var ary = new Array;
    for (var i = 0; i < UiObject.childCount(); i++) {
        var child = UiObject.child(i);
        ary.push(生成表达式(child));
    };
    return ary;
};

//json.toString****将生成的表达式字符串化输出。
function Disassembly(A) {
    switch (typeof(A)) {
        case "object":
            var ary = new Array;
            if (Array.isArray(A)) {
                for (var i in A) {
                    ary.push(Disassembly(A[i]));
                };
                return "[" + ary.join(",") + "]";
            } else {
                for (var i in A) {
                    ary.push(i + ":" + Disassembly(A[i]));
                };
                return "{" + ary.join(",") + "}";
            };
            break;
        case "function":
            return A.toString();
            break;
        case "string":
            return "\"" + String(A) + "\"";
            break;
        default:
            return String(A);
    };
};


//输入控件(必须是已经找到的控件)和控件的表达式并判断是否符合。
function 控件判断(UiObject, object) {
    var returnAry = new Array;
    if ((!object) || (!UiObject)) {
        return false;
    };
    if (object.message) {
        //log("m");
        for (i in object.message) {
            var k = false;
            switch (i) {
                case "className":
                    k = UiObject.className() == object.message[i];
                    break;
                case "id":
                    k = UiObject.id() == object.message[i];
                    break;
                case "text":
                    k = UiObject.text() == object.message[i];
                    break;
                case "desc":
                    k = UiObject.desc() == object.message[i];
                    break;
                case "isReturn":
                    k=true;
                    break;
                  default:

            };
            if (!k) {
                //log("mess");
                return false;
            };
        };
        if (object.message.isReturn) {
            returnAry.push(UiObject);
        };
    } else {
        throw "message";
    };
    if (object.Subset) {
        //log("s");
        if (UiObject.childCount()) {
            for (var i = 0; i < object.Subset.length; i++) {
                var k = false;
                for (var ii = 0; ii < UiObject.childCount(); ii++) {
                    if (i < UiObject.childCount()) {
                        var ret = 控件判断(UiObject.child(ii), object.Subset[i]);
                        if (ret) {
                            if (Array.isArray(ret)) {
                                returnAry = returnAry.concat(ret);
                            };
                            k = true;
                            break;
                        };
                    };
                };
                if (!k) {
                    //log("Sub");
                    return false;
                };
            };
        } else {
            log("UiObject.childCount");
            return false;
        };
    };
    if (returnAry.length) {
        return returnAry;
    };
    return true;
};