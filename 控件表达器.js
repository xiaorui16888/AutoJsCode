

      /*                            _ooOoo_
      //                           o8888888o
      //                           88" . "88
      //                           (| -_- |)
      //                            O\ = /O
      //                        ____/`---'\____
      //                      .   ' \\| |// `.
      //                       / \\||| : |||// \
      //                     / _||||| -:- |||||- \
      //                       | | \\\ - /// | |
      //                     | \_| ''\---/'' | |
      //                      \ .-\__ `-` ___/-. /
      //                   ___`. .' /--.--\ `. . __
      //                ."" '< `.___\_<|>_/___.' >'"".
      //               | | : `- \`.;`\ _ /`;.`/ - ` : | |
      //                 \ \ `-. \_ __\ /__ _/ .-` / /
      //         ======`-.____`-.___\_____/___.-`____.-'======
      //                            `=---='
      //
      //         .............................................
      //                  佛祖保佑             永无BUG
      */
      
/*示例
var json={
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
                        }
                    }]
                }]
            }]
        }]
    }]
};

以上是一个QQ的群成员列表中的单个群成员的表达方式。
它是由定位QQ的群成员列表控件并生成它的子控件表达式后经过修改而得到的。
它可以用来判定是不是QQ群成员列表中的群成员(群员列表中有些部分不是群成员);

*/


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
            return "\"" + A.toString() + "\"";
            break;
        case "number":
            return A.toString();
            break;
        case "boolean":
            return A.toString();
            break;
        default:
            return A;
    };
};


//输入控件(必须是已经找到的控件)和控件的表达式并判断是否符合。
function 控件判断(UiObject, object) {
    var kg = true;
    if ((!object) || (!UiObject)) {
        return false;
    };
    if (object.message) {
        //log("m");
        for (i in object.message) {
            switch (i) {
                case "className":
                    kg = kg && UiObject.className() == object.message[i];
                    break;
                case "id":
                    kg = kg && UiObject.id() == object.message[i];
                    break;
                case "text":
                    kg = kg && UiObject.text() == object.message[i];
                    break;
                case "desc":
                    kg = kg && UiObject.desc() == object.message[i];
                    break;
                default:

            };
            if (!kg) {
                //log("mess");
                return kg;
            };
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
                    if (i < UiObject.childCount() && 控件判断(UiObject.child(ii), object.Subset[i])) {
                        k = true;
                        break;
                    };
                };
                kg = kg && k;
                if (!kg) {
                    //log("Sub");
                    return kg;
                };
            };
        } else {
            kg = false;
            log("UiObject.childCount");
            return kg;
        };
    };
    return kg;
};