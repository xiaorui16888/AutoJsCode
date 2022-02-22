"ui";
ui.statusBarColor("#ff009688");
ui.layout(
<frame background="#ff009688">
<vertical align="top" margin="5">
<input id="ayuanma" h="60" bg="#ffffff" hint="原代码。"/>
<input id="text" h="315" bg="#ffffff" margin="10 0 0 0" hint="结果代码区"/>
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
c2="";
ui.ayuanma.text("openConsole();//显示控制台,拜见宫主大人 \nconsole.info(\"这是绿色\");//显示");
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
engines.execScript("结果代码",code());
} catch (e) {
toast("运行失败");
}
});
ui.azuo.click(() => {
ui.ayuanma.text("");
});
ui.aok.click(() => {
path = "/sdcard/脚本/base64的脚本.js";
file = open(path, "w");
file.write(code());
file.close();
toast("已生成脚本放在：" + path + "");
});
ui.ajiami.click(() => {
c2=java.lang.String(android.util.Base64.encode(java.lang.String(ui.ayuanma.text()+"").getBytes(),0)).replace('\n', '');
ui.text.text('b64("'+c2+'")');
});

function code(){
return 'engines.execScript("hello world",'+ui.text.text()+');'+b64;
}
function b64(str){
return java.lang.String(android.util.Base64.decode(java.lang.String(str).getBytes(),0));
}









