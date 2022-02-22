auto.waitFor();

toast("Hello!");

function click(x, y) {
    press(x, y, 1);
}

function doubleClick(x, y) {
    press(x, y, 1);
    sleep(50);
    press(x, y, 1);
}

function getText(uiObj) {
    let rect = uiObj.bounds();
    let [x, y] = [rect.centerX(), rect.centerY()]

    doubleClick(x, y);
    let ar6 = id('com.tencent.mm:id/ar6').findOne(500);
    click(x, y);
    sleep(500);

    if (ar6 != null) {
        let text = ar6.text();
        log(text);
    } else {
        return null;
    }
}

function getWeChatMsg() {
    nl = id('nl').find();
    if (!nl.empty()) {
        for (let i of nl) {
            getText(i);
        }
    } else {
        log('没找到消息! ')
    }
}

function sendWeChatMsg(text) {
    editor = editable().findOne();
    if (editor != null) {
        editor.setText(text);
        text('发送').findOne().click();
    } else {
        log('没找到输入框! ');
    }
    
}

getWeChatMsg();
sendWeChatMsg('test...');