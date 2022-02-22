(function(){
const SCRIPT_DIR = "/sdcard/脚本/";
var scripts = files.listDir(SCRIPT_DIR, function(name){
    return name.endsWith(".js") && files.isFile(SCRIPT_DIR + name);
});
var f = scripts[dialogs.singleChoice("请选择脚本", scripts)];
if (!f) return;
f = SCRIPT_DIR + f;
var ps = rawInput("请输入密码");
if (!ps) return;
ps = new java.lang.String(ps).hashCode();
ps = [ps & 0xff, ps >>> 8 & 0xff, ps >>> 16 & 0xff, ps >>> 24 & 0xff];
var t = files.read(f);
var s = new java.io.ByteArrayOutputStream(), z = new java.util.zip.GZIPOutputStream(s);
z.write(new java.lang.String(t).getBytes());
z.close();
var a = s.toByteArray(), i;
for (i in a) {
	a[i] ^= ps[i % 4];
}
files.write(f.replace(/js$/, "encrypt.js"), 'var a,b,c=rawInput("请输入密码");if(!c)exit();try{c=new java.lang.String(c).hashCode();b=[c&0xff,c>>>8&0xff,c>>>16&0xff,c>>>24&0xff];a=new android.util.Base64.decode("' + android.util.Base64.encodeToString(a, 2) + '",2);for(c in a)a[c]^=b[c%4];a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.util.zip.GZIPInputStream(new java.io.ByteArrayInputStream(a)))),b=[],c;while(c=a.readLine())b.push(c);a.close();engines.execScript("' + files.getNameWithoutExtension(f) + '",b.join("\\n"));"xero"}catch(e){toast("密码错误")}');
toast("加密完成");
})();