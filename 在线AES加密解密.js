"ui";
ui.statusBarColor("#ffffff");
ui.layout(
<frame background="#d9edf7">
<vertical align="top" margin="5">
<linear>
<text text="AES加密模式:" textStyle="bold" size="10" color="#3a87ad"/>
<button id="ams" text="CBC▼" size="10" h="42" w="55"/>
<text text=" 填充:" textStyle="bold" size="10" color="#3a87ad"/>
<button id="atc" text="PKCS5Padding▼" size="9" h="42" w="100"/>
<text text=" 数据块:" textStyle="bold" size="10" color="#3a87ad"/>
<button id="asj" text="128▼" size="10" h="42" w="55"/>
</linear>
<linear>
<text text="密码:" textStyle="bold" size="10" color="#3a87ad"/>
<input id="amm" borderWidth="2dp" borderColor="#202020" bg="#ffffff" text="" size="9" h="42" w="90"/>
<text text="偏移量:" textStyle="bold" size="10" color="#3a87ad"/>
<input id="aiv" borderWidth="2dp" borderColor="#202020" bg="#ffffff" text="" size="9" h="42" w="90"/>
<text text="输出:" textStyle="bold" size="10" color="#3a87ad"/>
<button id="asc" text="base64▼" size="10" h="42" w="75"/>
</linear>
<text text="待加密、解密的文本:" size="8" color="#3a87ad"/>
<input id="aym" color="#0f3f94" gravity="left" bg="#ffffff" text="" size="9" h="100" w="360"/>
<text text="     ↑ 将你电脑文件直接拖入试试^-^" size="8" color="#ff0000"/>
<linear>
<button h="35" w="60" id="aen" text="AES加密" bg="#eb8f00" size="11" margin="0 0 0 105" style="Widget.AppCompat.Button.Colored"/>           
<button h="35" w="60" id="ade" text="AES解密" bg="#eb8f00" size="11" margin="0 0 0 10" style="Widget.AppCompat.Button.Colored"/>           
</linear>
<text text="AES加密、解密转换结果(base64了):" size="8" color="#3a87ad"/>
<input id="ajg" color="#0f3f94" gravity="left" bg="#ffffff" text="" size="9" h="100" w="360"/>
<text text="以下附加模块,默认以无限制密码的md5作为密码,以sha1前16位作为偏移" h="30" margin="0 0 0 0" size="8" color="#000000"/>
<text id="axx" text="" h="50" margin="0 0 0 0" size="8" color="#000000"/>
<linear>
<input id="aom" hint="无限制密码" bg="#ffffff" text="" size="14" h="42" w="220"/>
<button h="35" w="60" id="amd" text="加密2" bg="#eb8f00" size="11" margin="0 0 0 2" style="Widget.AppCompat.Button.Colored"/>           
<button h="35" w="60" id="ayj" text="解密2" bg="#eb8f00" size="11" margin="0 0 0 2" style="Widget.AppCompat.Button.Colored"/>           
</linear>
<linear>
<button id="amd1" text="md5▼" size="10" h="42" w="75"/>
<button id="amd2" text="sha1▼" size="10" h="42" w="75"/>
<checkbox id="azz" checked="true" text="随机种子"/>
      
</linear>
<vertical w="20">
</vertical>
</vertical>
</frame>
);
alx="PKCS5Padding";
ui.amd.click(() => {
var zx=1;
var ams=a(ui.ams.text());
if(ui.azz.checked){
var text=(java.lang.String(randomx(4)+ui.aym.text()).getBytes());
}else{
var text=(java.lang.String(ui.aym.text()).getBytes());
}
var aws=a(ui.asj.text());
if(alx=="NoPadding"&&(ams=="ECB"||ams=="CBC")){
if(text.length%16!=0){
var tmp0=text.length;
var tmp=16-(tmp0%16);
text=java.util.Arrays.copyOf(text,tmp0+tmp);
for(i=0;i<tmp;i++){
text[i+tmp0]=tmp;
}
}
}
var lx=a("AES/"+ams+"/"+alx);
var sc=a(ui.asc.text());
if(zx==1){
var t=ui.aom.text();
ui.axx.text("md5:"+bytestohexstring(md5(t,"md5"))+"\n"+"sha1:"+bytestohexstring(md5(t,"sha1"))+"\n"+"sha256:"+bytestohexstring(md5(t,"sha256"))+"\n"+"sha512:"+bytestohexstring(md5(t,"sha512")));               
var jg=encode(text,java.util.Arrays.copyOfRange(md5(t,a(ui.amd1.text())),0,16),lx,java.util.Arrays.copyOfRange(md5(t,a(ui.amd2.text())),0,16));
if(sc=="base64"){
ui.ajg.text(java.lang.String(android.util.Base64.encode(jg,0)));
}else if(sc=="Hex"){
ui.ajg.text(bytestohexstring(jg));
}else{
ui.ajg.text("输出形式未选择");
}}
});
ui.ayj.click(() => {
var zx=1;
var sc=a(ui.asc.text());
if(sc=="base64"){
var text=android.util.Base64.decode(ui.ajg.text(),0);
}else if(sc=="Hex"){
var text=hexstringtobytes(ui.ajg.text());
}else{
ui.aym.text("输出形式未选择");zx=0;
}
var ams=a(ui.ams.text());
var aws=a(ui.asj.text());
var lx=a("AES/"+ams+"/"+alx);
if(zx==1){
var t=ui.aom.text();
ui.axx.text("md5:"+bytestohexstring(md5(t,"md5"))+"\n"+"sha1:"+bytestohexstring(md5(t,"sha1"))+"\n"+"sha256:"+bytestohexstring(md5(t,"sha256"))+"\n"+"sha512:"+bytestohexstring(md5(t,"sha512")));               
try{
var jg=java.lang.String(decode(text,java.util.Arrays.copyOfRange(md5(t,a(ui.amd1.text())),0,16),lx,java.util.Arrays.copyOfRange(md5(t,a(ui.amd2.text())),0,16)));
if(ui.azz.checked){
ui.aym.text(jg.substring(4,jg.length()));}else{
ui.aym.text(jg);
}
}catch(e){
ui.aym.text("解密错误");
}
}
});
ui.ams.click(() => {
var xx=["ECB","CBC","CTR","OFB","CFB"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
 ui.run(function(){
    ui.ams.text(xx[t]+"▼");});
});
});
ui.amd1.click(() => {
var xx=["md5","sha1","sha256","sha512"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
 ui.run(function(){
    ui.amd1.text(xx[t]+"▼");});
});
});
ui.amd2.click(() => {
var xx=["md5","sha1","sha256","sha512"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
 ui.run(function(){
    ui.amd2.text(xx[t]+"▼");});
});
});
ui.atc.click(() => {
var xx=["PKCS5Padding","NoPadding","ISO10126Padding"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
alx=xx[t];
 ui.run(function(){
    ui.atc.text(xx[t]+"▼");});
});
});
ui.asj.click(() => {
var xx=["128"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
 ui.run(function(){
    ui.asj.text(xx[t]+"▼");});
});
});
ui.asc.click(() => {
var xx=["base64","Hex"];
threads.start(function(){
var t=dialogs.singleChoice("",xx);
 ui.run(function(){
    ui.asc.text(xx[t]+"▼");});
});
});
ui.aen.click(() => {
var zx=1;
var ams=a(ui.ams.text());
var text=java.lang.String(ui.aym.text()).getBytes();
var mm=java.lang.String(ui.amm.text()).getBytes();
var aws=a(ui.asj.text());
if(alx=="NoPadding"&&(ams=="ECB"||ams=="CBC")){
if(text.length%16!=0){
var tmp0=text.length;
var tmp=16-(tmp0%16);
text=java.util.Arrays.copyOf(text,tmp0+tmp);
for(i=0;i<tmp;i++){
text[i+tmp0]=tmp;
}
}
}

if(mm.length!=aws/8){
ui.ajg.text("密码长度必须为"+aws/8+"位!");zx=0;
}
var iv="";
if(ams!="ECB"){
var iv=java.lang.String(ui.aiv.text()).getBytes();
if(iv.length!=aws/8){
ui.ajg.text("偏移量长度必须为"+aws/8+"位!");zx=0;
}}
var lx=a("AES/"+ams+"/"+alx);
var sc=a(ui.asc.text());
if(zx==1){
var jg=encode(text,mm,lx,iv);
if(sc=="base64"){
ui.ajg.text(java.lang.String(android.util.Base64.encode(jg,0)));
}else if(sc=="Hex"){
ui.ajg.text(bytestohexstring(jg));
}else{
ui.ajg.text("输出形式未选择");
}
}
});
ui.ade.click(() => {
var zx=1;
var sc=a(ui.asc.text());
if(sc=="base64"){
var text=android.util.Base64.decode(ui.ajg.text(),0);
}else if(sc=="Hex"){
var text=hexstringtobytes(ui.ajg.text());
}else{
ui.aym.text("输出形式未选择");zx=0;
}
var ams=a(ui.ams.text());
var mm=java.lang.String(ui.amm.text()).getBytes();
var aws=a(ui.asj.text());
if(mm.length!=aws/8){
ui.ajg.text("密码长度必须为"+aws/8+"位!");zx=0;
}
var iv="";
if(ams!="ECB"){
var iv=java.lang.String(ui.aiv.text()).getBytes();
if(iv.length!=aws/8){
ui.ajg.text("偏移长度必须为"+aws/8+"位!");zx=0;
}}
var lx=a("AES/"+ams+"/"+alx);
if(zx==1){
try{
var jg=decode(text,mm,lx,iv);
ui.aym.text(java.lang.String(jg));}catch(e){
ui.aym.text("解密错误!");
}
}
});
function encode(byteContent,password,lx,iv){
var key = javax.crypto.spec.SecretKeySpec(password, "AES");
var cipher = javax.crypto.Cipher.getInstance(lx);
if((ui.ams.text()+"")=="ECB▼"){
cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, key);               
}else{
cipher.init(javax.crypto.Cipher.ENCRYPT_MODE, key,javax.crypto.spec.IvParameterSpec(iv));               
}
return cipher.doFinal(byteContent);
}//加密
function decode(byteContent,password,lx,iv){
var key = javax.crypto.spec.SecretKeySpec(password, "AES");
var cipher = javax.crypto.Cipher.getInstance(lx);
if((ui.ams.text()+"")=="ECB▼"){
cipher.init(javax.crypto.Cipher.DECRYPT_MODE, key);               
}else{
cipher.init(javax.crypto.Cipher.DECRYPT_MODE, key,javax.crypto.spec.IvParameterSpec(iv));               
}
return cipher.doFinal(byteContent);
}//解密
function md5(str,lx){
var md5 = java.security.MessageDigest.getInstance(lx);
md5.update(java.lang.String(str).getBytes());
return md5.digest();
}

function randomx(n){
var str="";
for(var i=0;i<n;i++){
str+=String.fromCharCode(random(0,65535));
}
return str;
}//随机字符串
function bytestohexstring(bytes) {
  var val = "";　
  for (var i = 0; i < bytes.length; i++) {　　
    var tmp = bytes[i];
      if((tmp+"").length==1){
      tmp="0"+tmp;
      }
    if (tmp < 0) {
      tmp = 256 + tmp;
    }
    val += tmp.toString(16);
  }
  return val;
}
function hexstringtobytes(str) {
  var val = [];　
  str = str.split("");
  for (var i = 0; i < str.length; i++) {　　
    var tmp = "" + str[i] + str[i + 1];
    tmp = parseInt(tmp, 16);

    if (tmp <= 127) {
      val[i / 2] = tmp;
    } else {
      val[i / 2] = tmp - 256;
    }
  }
  return val;
}
function a(str){return str.replace("▼","");}































