var ScriptName = engines.myEngine().getSource().toString().match(/[^\/]+$/)[0];
var execution = engines.all();
var Scripts = 0;
for (var i = 0; i < execution.length; i++) {
    if (ScriptName = execution[i].getSource().toString().match(/[^\/]+$/)[0]) {
        Scripts++;
        if (Scripts == 2) {
            toast(ScriptName + "已有");
            exit();
        }
    }
}
var window = floaty.window(
    <frame>
        <button id="action" w="50" h="50" bg="@drawable/ic_all_out_black_48dp"/>
    </frame>
);
var x, y, sx, sy, dx, dy;
var X, Y;
var Akeep = false,
    yidong = false,
    Time = 0;
setInterval(function() {
    if (Akeep) {
        Time++;
        if (!yidong && Time > 20) {

            sleep(50);
            window.close();
            toast("已停止运行");
            exit();
        }
    }
}, 50);
sleep(100);
G = function(win) {
    var K = 35,
        H = 66;
    return [-K, -K, device.width - win.getWidth() + K, device.height - win.getHeight() - H + K]
};
window.action.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            X = window.getX();
            Y = window.getY();
            Akeep = true;

            return true;
        case event.ACTION_MOVE:
            sx = event.getRawX() - x;
            sy = event.getRawY() - y;
            if (!yidong && weiyi(sx, sy) >= 50) {
                yidong = true;
                dx = 0;
                dy = 0;
            };
            if (yidong) {
                window.setPosition(X + sx - dx, Y + sy - dy);
            }
            return true;
        case event.ACTION_UP:
            if (!yidong && Time < 7) {
                var a = x - (X + window.getWidth() / 2),
                    b = y - (Y + window.getHeight() / 2);
                onClick()
            }
            Akeep = false;
            Time = 0;
            if (yidong) {
                var gx = Math.round(X + sx - dx),
                    gy = Math.round(Y + sy - dy);
                var A = windowGXY(gx, gy, G(window));
                window.setPosition(A.x, A.y);
                yidong = false;
            };
            return true;
    }
    return true;
});
var F = G(window);
windowyidong(F, window);
windowyidong([F[2], F[3], F[2], F[1]], window);
windowyidong([F[2], F[1], F[0], F[1]], window);
windowyidong([F[0], F[1], F[0], F[3]], window);
windowyidong([F[0], F[3], F[2], F[3]], window);
windowyidong([F[2], F[3], F[0], 0.20 * (F[3] - F[1])], window);

function weiyi() {
    var num = 0;
    for (var i = 0; i < arguments.length; i++) {
        num += arguments[i] * arguments[i];
    }
    return Math.round(Math.sqrt(num) * 1000) / 1000
}

function windowyidong(A, B) {
    var sx = A[2] - A[0],
        sy = A[3] - A[1];
    var sd = weiyi(sx, sy) / 50;
    var X = sx / sd,
        Y = sy / sd;
    var x = 0,
        y = 0;
    for (var i = 0; i < sd; i++) {
        x += X;
        y += Y;
        sleep(5);
        B.setPosition(A[0] + x, A[1] + y);
    }
    B.setPosition(A[2], A[3]);
}

function windowGXY(x, y, k) {
    if (x < k[0]) {
        x = k[0]
    };
    if (k[2] < x) {
        x = k[2]
    };
    if (y < k[1]) {
        y = k[1]
    };
    if (k[3] < y) {
        y = k[3]
    };
    return {
        x: x,
        y: y
    };
}

function onClick() {

    threads.start(function() {
        选择();

    });
}

function 选择() {
    var 一级命令 = ["常用", "模块化功能", "ui", "逻辑", "控制台", "java与安卓"];
    var 二级命令 = [
        ["getClip()",
            "setClip()",
            'Object.keys()',
            'requestScreenCapture();',
            "threads.start(function(){\n\n});",
            'function (){\n\n}',
        ],
        [b64("ZnVuY3Rpb24gY3V0c3RyKGEsIGIsIGMpIHsvL+WcqGHkuK3miKrlj5ZiLGPkuYvpl7TnmoTlhoXlrrkKYSA9IGEuc3BsaXQoYik7dmFyIGQ9W107dmFyIHA9MDsKZm9yICh2YXIgaSA9IDE7IGkgPCBhLmxlbmd0aDsgaSsrKSB7CnZhciB0bXAgPSBhW2ldLnNwbGl0KGMpOwppZiAodG1wLmxlbmd0aCA+IDEpIHsKZFtwXT10bXBbMF0KcCsrOwp9Cn1yZXR1cm4gZDsKfQ=="),
            b64("dmFyIHFxPWphdmEubGFuZy5TdHJpbmcoZmlsZXMubGlzdERpcigiL3N0b3JhZ2UvZW11bGF0ZWQvMC9UZW5jZW50L01vYmlsZVFRL2FydGZpbHRlci8iLCBmdW5jdGlvbihuYW1lKXsKICAgIHJldHVybiBuYW1lLmVuZHNXaXRoKCJhcnRmaWx0ZXIuY29uZmlnIik7Cn0pLmpvaW4oIiwiKSkucmVwbGFjZSgnYXJ0ZmlsdGVyLmNvbmZpZycsICcnKTsKLy/or7vlj5borrDlvZVxceWPtw=="),
            b64("ZnVuY3Rpb24gY2FwdHVyZXNjcmVlbigpIHsvL+eos+WumuaIquWbvuaooeWdlwp2YXIgYTsKd2hpbGUgKHRydWUpIHsKaWYgKGE9Y2FwdHVyZVNjcmVlbigpKSB7CnJldHVybiBhOwp9Cn0KfQ=="),
            b64("dmFyIHFx576k5Y+3PSI2NzkwMzk1MTYiOwphcHAuc3RhcnRBY3Rpdml0eSh7CiAgICBhY3Rpb246ICJhbmRyb2lkLmludGVudC5hY3Rpb24uVklFVyIsCiAgICBkYXRhOiJtcXFhcGk6Ly9jYXJkL3Nob3dfcHNsY2FyZD9jYXJkX3R5cGU9Z3JvdXAmdWluPSIrcXHnvqTlj7csCiAgICBwYWNrYWdlTmFtZTogImNvbS50ZW5jZW50Lm1vYmlsZXFxIiwKfSk7Ly/miZPlvIBxcee+pOWQjeeJhw=="),
            b64("ZnVuY3Rpb24g5pCc54uX5Zu+6ZO+KHBhdGgpewp2YXIgdXJsPSJodHRwOi8vcGljLnNvZ291LmNvbS9waWMvdXBsb2FkX3BpYy5qc3AiOwp2YXIgcmVzPWh0dHAucG9zdE11bHRpcGFydCh1cmwsewoiZmlsZSI6IG9wZW4ocGF0aCksCn0pOwp2YXIgdD1yZXMuYm9keS5zdHJpbmcoKTsKcmV0dXJuIHQ7Cn0="),
            b64("dmFyIHFx5Y+3PSI3ODcwNjcwMzMiOwphcHAuc3RhcnRBY3Rpdml0eSh7CiAgICBhY3Rpb246ICJhbmRyb2lkLmludGVudC5hY3Rpb24uVklFVyIsCiAgICBkYXRhOiJtcXFhcGk6Ly9jYXJkL3Nob3dfcHNsY2FyZD91aW49IitxceWPtywKICAgIHBhY2thZ2VOYW1lOiAiY29tLnRlbmNlbnQubW9iaWxlcXEiLAp9KTsvL+aJk+W8gHFx5ZCN54mH"),
            b64("dmFyIHFx5Y+3PSI3ODcwNjcwMzMiOwphcHAuc3RhcnRBY3Rpdml0eSh7CiAgICBhY3Rpb246ICJhbmRyb2lkLmludGVudC5hY3Rpb24uVklFVyIsCiAgICBkYXRhOiJtcXE6Ly9pbS9jaGF0P2NoYXRfdHlwZT13cGEmdmVyc2lvbj0xJnNyY190eXBlPXdlYiZ1aW49IitxceWPtywKICAgIHBhY2thZ2VOYW1lOiAiY29tLnRlbmNlbnQubW9iaWxlcXEiLAp9KTsvL3Fx5by65Yi26IGK5aSp"),
            b64("dmFyIHFx576k5Y+3PSI2NzkwMzk1MTYiOwphcHAuc3RhcnRBY3Rpdml0eSh7CiAgICBhY3Rpb246ICJhbmRyb2lkLmludGVudC5hY3Rpb24uVklFVyIsCiAgICBkYXRhOiJtcXE6Ly9pbS9jaGF0P2NoYXRfdHlwZT1ncm91cCZ2ZXJzaW9uPTEmc3JjX3R5cGU9d2ViJnVpbj0iK3Fx576k5Y+3LAogICAgcGFja2FnZU5hbWU6ICJjb20udGVuY2VudC5tb2JpbGVxcSIsCn0pOy8v5bey5Yqg5YWl55qEcXHnvqTogYrlpKk="),
            b64("dmFyIFNjcmlwdE5hbWUgPSBlbmdpbmVzLm15RW5naW5lKCkuZ2V0U291cmNlKCkudG9TdHJpbmcoKS5tYXRjaCgvW15cL10rJC8pWzBdOwp2YXIgZXhlY3V0aW9uID0gZW5naW5lcy5hbGwoKTsKdmFyIFNjcmlwdHMgPSAwOwpmb3IgKHZhciBpID0gMDsgaSA8IGV4ZWN1dGlvbi5sZW5ndGg7IGkrKykgewogICAgaWYgKFNjcmlwdE5hbWUgPT0gZXhlY3V0aW9uW2ldLmdldFNvdXJjZSgpLnRvU3RyaW5nKCkubWF0Y2goL1teXC9dKyQvKVswXSkgewogICAgICAgIFNjcmlwdHMrKzsKICAgICAgICBpZiAoU2NyaXB0cyA9PSAyKSB7CiAgICAgICAgICAgIHRvYXN0KFNjcmlwdE5hbWUgKyAi5bey5pyJIik7CiAgICAgICAgICAgIGV4aXQoKTsKICAgICAgICB9CiAgICB9Cn0K")
        ],
        ['"ui";',
            "ui.run(function(){\n\n});",
            'ui..click(() => {\n\n});',
            'var window=floaty.window(\n\n);',
            'ui.layout(\n\n);', 'ui.statusBarColor("#00000000");', '<frame>', '</frame>', '<ScrollView>', '</ScrollView>', '<vertical>', '</vertical>', '<linear>', '</linear>', '<text />', '<seekbar progress="0"/>', '<button />', '<input />', 'color="#ffffff" ',
            'id="" ',
            'margin="1 0 0 1" '
        ],
        ["for(var i=0;i<1;i++){\n\n}", "while(true){\n\n}", "if(){\n\n}else{\n\n}", "try{\n\n}catch(e){\n\n}",
            "for(var i in ){\nlog(i);\n}"
        ],
        ["console.",
            "show();",
            "setPosition(,);",
            'rawInput("提示","");',
            'clear()'
        ],
        ['importClass();',
            'importPackage();',
            'java.lang.String();',
            'android.util.Base64.decode',
            '.getBytes()',
        ]
    ];
    var 一级选择 = dialogs.select("命令助手", 一级命令);
    if (一级选择 > -1) {
        var 二级选择 = dialogs.select(一级命令[一级选择], 二级命令[一级选择]);
        if (二级选择 > -1) {
            setClip(二级命令[一级选择][二级选择]);
        toast("已复制");
        }
    }
}

function b64(str) {
    return java.lang.String(android.util.Base64.decode(java.lang.String(str).getBytes(), 0));
}