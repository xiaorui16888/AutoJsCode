"ui";
function a7(a0) {
a1 = a0.split("");
a2 = a1.length;
a3 = "";
for (ai = 0; ai < a2; ai++) {
if (a1[ai] == "/") {
if (a1[ai + 1] == "/") {
ai += 2;
for (aj = ai; aj < a2; aj++) {
if (a1[aj] == "\n") {
ai = aj - 1;
aj = a2;
}
if (aj == a2 - 1) {
ai = a2;
}
}
} else if (a1[ai + 1] == "*") {
ai += 3;
for (aj = ai; aj < a2; aj++) {
if (a1[aj - 1] == "*" && a1[aj] == "/") {
ai = aj;
aj = a2;
}
if (aj == a2 - 1) {
ai = a2;
}
}
} else {
a3 += a1[ai];
}
} else if (a1[ai] == '"') {
a3 += a1[ai];
ai += 1;
while (a1[ai] != '"') {
a3 += a1[ai];
if (ai == a2 - 1) {
break;
}
ai++;
}
a3 += a1[ai];
} else if (a1[ai] == "'") {
a3 += a1[ai];
ai += 1;
while (a1[ai] != "'") {
a3 += a1[ai];
if (ai == a2 - 1) {
break;
}
ai++;
}
a3 += a1[ai];
} else {
a3 += a1[ai];
}
}
return a3;
}
function a6(a0) {
a1 = a0.split("");
a2 = a1.length;
a3 = "";
for (ai = 0; ai < a2; ai++) {
if (a1[ai] == "\n") {
a3 += a1[ai];
while (true) {
ai++;
if (a1[ai] != " "&&a1[ai] != "\n"){
break;
}
}
} else if (ai == 0) {
while (true) {
if (a1[ai] != " "&&a1[ai] != "\n") {
break;
}
ai++;
}
}
if (ai < a2) {
a3 += a1[ai];
}
}
return a3;
}
function encode(a0) {
a0 = a7(a0);
a0 = a6(a0);
return a0;
}
ui.statusBarColor("#ff555555");
ui.layout(
<frame background="#ff555555">
<vertical align="top" margin="5">
<input id="ayuanma" h="60" bg="#ffffff" hint="输入要去掉注释的代码。"/>
<text id="atext" color="#ffffff" h="15" size="10"></text>
<input id="text" h="360" bg="#ffffff" margin="0 0 0 0" hint="结果代码区"/>
<linear>
<vertical w="170">
<button margin="15 0 0 4" h="160" w="160" id="ajiami" text="运算" size="55"></button>
</vertical>
<vertical>
<linear> 
<button h="60" w="60" id="afuzhi" text="复制结果" ></button>
<button margin="0 0 0 0" h="60" w="60" id="ashang" text="运行输入"></button>
</linear>
<linear>
<button h="60" w="60" id="azuo" text="清空输入" ></button>
<button h="60" w="60" id="aok" text="保存结果" ></button>
<button h="60" w="60" id="ayou" text="清空结果" ></button>
</linear>
<linear>
<button margin="0 0 0 60" h="60" w="60" id="axia" text="运行结果" ></button>
</linear>
</vertical>
</linear>
</vertical>
</frame>
);
ui.ashang.click(() => {
try {
engines.execScript("输入代码", "" + ui.ayuanma.text());
} catch (e) {
toast("运行失败");
}
});
ui.ayou.click(() => {
ui.text.text("");
});
ui.afuzhi.click(() => {
setClip(ui.text.text());
toast("拜见宫主大人提示你 复制成功");
});
ui.axia.click(() => {
try {
engines.execScript("结果代码", "" + ui.text.text());
} catch (e) {
toast("运行失败");
}
});
ui.azuo.click(() => {
ui.ayuanma.text("");
});
ui.aok.click(() => {
aaaaaab = ui.text.text();
path = "/sdcard/脚本/去注释脚本.js";
file = open(path, "w");
file.write(aaaaaab);
file.close();
toast("已生成脚本放在：" + path + "");
});
ui.ajiami.click(() => {
a5 = ui.ayuanma.text();
a4 = encode(a5);
ui.text.text(a4);
});