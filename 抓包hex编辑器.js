"ui";
ui.statusBarColor("#ff555555");
ui.layout(
    <frame background="#ff555555">
<ScrollView>
<vertical align="top" margin="0">


<input id="t0" w="359" h="100" size="8" bg="#ffffff" margin="0 0 1 0" hint="网页代码区"/>
<input id="t1" w="359" h="200" size="8" bg="#ffffff" margin="0 0 1 0" hint="网页代码区"/>
<input id="t2" w="359" h="200" size="8" bg="#ffffff" margin="0 0 1 0" hint="网页代码区"/>

 <linear>
<button h="55" w="60" id="ags" text="格式" />
<button h="55" w="60" id="azzh" text="zhz" />
 <button h="55" w="60" id="ahzz" text="hzz" />
</linear>

</vertical>
</ScrollView>
</frame>
);
ui.ags.click(function() {
    threads.start(function() {
        gs();
    });
});
ui.azzh.click(function() {
    threads.start(function() {
        tmph = ui.t2.text();
        tmp2 =toUTF8Hex(tmph);
        ui.run(function() {
            ui.t1.text(tmp2);
        });

    });
});
ui.ahzz.click(function() {
    threads.start(function() {
        tmp = ui.t1.text();
        tmp2 =utf8HexToStr(tmp);
        log(tmp2);
        ui.run(function() {
            ui.t2.text(tmp2);
        });
    });
});

function gs() {
    var p = ui.t0.text().split("\n");
    for (i in p) {
        p[i] = p[i].substring(0, 48).split(" ").join("");
        //log(p[i]);
    }
    ui.run(function() {
        ui.t1.text(p.join(""));
    });
}
tmp = "";
tmph = "";


var writeUTF = function(str, isGetBytes) {
    var back = [];
    var byteSize = 0;
    for (var i = 0; i < str.length; i++) {
        var code = str.charCodeAt(i);
        if (0x00 <= code && code <= 0x7f) {
            byteSize += 1;
            back.push(code);
        } else if (0x80 <= code && code <= 0x7ff) {
            byteSize += 2;
            back.push((192 | (31 & (code >> 6))));
            back.push((128 | (63 & code)))
        } else if ((0x800 <= code && code <= 0xd7ff) ||
            (0xe000 <= code && code <= 0xffff)) {
            byteSize += 3;
            back.push((224 | (15 & (code >> 12))));
            back.push((128 | (63 & (code >> 6))));
            back.push((128 | (63 & code)))
        }
    }
    for (i = 0; i < back.length; i++) {
        back[i] &= 0xff;
    }
    if (isGetBytes) {
        return back
    }
    if (byteSize <= 0xff) {
        return [0, byteSize].concat(back);
    } else {
        return [byteSize >> 8, byteSize & 0xff].concat(back);
    }
}


var readUTF = function(arr) {
    if (typeof arr === 'string') {
        return arr;
    }
    var UTF = '',
        _arr = arr;
    for (var i = 0; i < _arr.length; i++) {
        var one = _arr[i].toString(2),
            v = one.match(/^1+?(?=0)/);
        if (v && one.length == 8) {
            var bytesLength = v[0].length;
            var store = _arr[i].toString(2).slice(7 - bytesLength);
            for (var st = 1; st < bytesLength; st++) {
                store += _arr[st + i].toString(2).slice(2)
            }
            UTF += String.fromCharCode(parseInt(store, 2));
            i += bytesLength - 1
        } else {
            UTF += String.fromCharCode(_arr[i])
        }
    }
    return UTF
}




var toUTF8Hex = function(str) {
    var charBuf = writeUTF(str, true);
    var re = '';
    for (var i = 0; i < charBuf.length; i++) {
        var x = (charBuf[i] & 0xFF).toString(16);
        if (x.length === 1) {
            x = '0' + x;
        }
        re += x;
    }
    return re;
}


var utf8HexToStr = function(str) {
    var buf = [];
    for (var i = 0; i < str.length; i += 2) {
        buf.push(parseInt(str.substring(i, i + 2), 16));
    }
    return readUTF(buf);
}