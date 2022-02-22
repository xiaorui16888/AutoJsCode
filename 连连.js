var window = floaty.window(
    <frame><linear>
        <button id="action" text="开始消" w="60" h="40" color="#ffffff" bg="#77000000"/>
         <seekbar id="asd" w="150" progress="0"/>
   <button id="dxkz" text="点消" w="50" h="40" color="#ffffff" bg="#77000000"/>
    </linear> </frame>
);
requestScreenCapture();
ꕒ = 30;
ꕓ = 100;

var execution = null;

//记录按键被按下时的触摸坐标
var x = 0, y = 0;
//记录按键被按下时的悬浮窗位置
var windowX, windowY;
//记录按键被按下的时间以便判断长按等动作
var downTime;
window.action.setOnTouchListener(function(view, event){
    switch(event.getAction()){
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //移动手指时调整悬浮窗位置
            window.setPosition(windowX + (event.getRawX() - x),
                windowY + (event.getRawY() - y));
            //如果按下的时间超过1.5秒判断为长按，退出脚本
            //if(new Date().getTime() - downTime > 1500){
                //exit();
            //}
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if(Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5){
                onClick();
            }
            return true;
    }
    return true;
});
bkz=0;
function onClick(){
    if(bkz==0){
        bkz=1;
        window.action.text("消除中");
    threads.start(function(){
    xc();
        bkz=0;
       ui.run(function(){
        window.action.text("开始运行");
       });
    });}
}
dxkz=0;
window.dxkz.click(()=>{
//if(ꕓ==601){
dxkz=600;
//}
});
function xc(){
function ꕔ() {
while (true) {
if (ꕕ = captureScreen()) {
return ꕕ;
break;
}
}
}
function ꕙ() {
for (ꕖ = 0; ꕖ <= a0l; ꕖ++) {
for (ꕘ = 0; ꕘ <= a1l; ꕘ++) {
ꕚ = -10523472;
ꕛ = ꕞ[ꕖ][ꕘ];
if (Math.abs(colors.red(ꕚ) - colors.red(ꕛ)) < ꕒ && Math.abs(colors.green(ꕚ) - colors.green(ꕛ)) < ꕒ && Math.abs(colors.blue(ꕚ) - colors.blue(ꕛ)) < ꕒ) {
ꕟ[ꕖ][ꕘ] = 0;
}
}
}
}
function ꕦ(ꕠ, ꕡ, ꕢ, ꕤ) {
if (ꕠ == ꕢ) {
ꕣ = (ꕡ - ꕤ) / (Math.abs(ꕡ - ꕤ));
for (ꕥ = ꕤ + ꕣ; ꕥ != ꕡ; ꕥ += ꕣ) {
if (ꕟ[ꕠ][ꕥ] != 0) {
return false;
}
}
}
if (ꕡ == ꕤ) {
ꕣ = (ꕠ - ꕢ) / (Math.abs(ꕠ - ꕢ));
for (ꕥ = ꕢ + ꕣ; ꕥ != ꕠ; ꕥ += ꕣ) {
if (ꕟ[ꕥ][ꕡ] != 0) {
return false;
}
}
}
if (ꕠ != ꕢ && ꕡ != ꕤ) {
return false;
}
return true;
}
function ꕧ(ꕧ1, ꕧ2, ꕧ3, ꕧ4) {
if (ꕟ[ꕧ1][ꕧ4] == 0) {
if (ꕦ(ꕧ1, ꕧ4, ꕧ1, ꕧ2) && ꕦ(ꕧ1, ꕧ4, ꕧ3, ꕧ4)) {
return true;
}
}
if (ꕟ[ꕧ3][ꕧ2] == 0) {
if (ꕦ(ꕧ3, ꕧ2, ꕧ1, ꕧ2) && ꕦ(ꕧ3, ꕧ2, ꕧ3, ꕧ4)) {
return true;
}
}
return false;
}
function ꕨ(ꕨ1, ꕨ2, ꕨ3, ꕨ4) {
if (ꕨ1 == 0 && ꕨ3 == 0) {
return true;
}
if (ꕨ1 == a0l && ꕨ3 == a0l) {
return true;
}
if (ꕨ2 == 0 && ꕨ4 == 0) {
return true;
}
if (ꕨ2 == a1l && ꕨ4 == a1l) {
return true;
}
for (ꕨ5 = 0; ꕨ5 <= a0l; ꕨ5++) {
if (ꕟ[ꕨ5][ꕨ2] == 0 && ꕦ(ꕨ5, ꕨ2, ꕨ1, ꕨ2) && ꕧ(ꕨ5, ꕨ2, ꕨ3, ꕨ4)) {
return true;
}
}
for (ꕨ5 = 0; ꕨ5 <= a1l; ꕨ5++) {
if (ꕟ[ꕨ1][ꕨ5] == 0 && ꕦ(ꕨ1, ꕨ5, ꕨ1, ꕨ2) && ꕧ(ꕨ1, ꕨ5, ꕨ3, ꕨ4)) {
return true;
}
}
if (ꕟ[0][ꕨ2] == 0 && ꕟ[0][ꕨ4] == 0 && ꕦ(0, ꕨ2, ꕨ1, ꕨ2) && ꕦ(0, ꕨ4, ꕨ3, ꕨ4)) {
return true;
}
if (ꕟ[a0l][ꕨ2] == 0 && ꕟ[a0l][ꕨ4] == 0 && ꕦ(a0l, ꕨ2, ꕨ1, ꕨ2) && ꕦ(a0l, ꕨ4, ꕨ3, ꕨ4)) {
return true;
}
if (ꕟ[ꕨ1][0] == 0 && ꕟ[ꕨ3][0] == 0 && ꕦ(ꕨ1, 0, ꕨ1, ꕨ2) && ꕦ(ꕨ3, 0, ꕨ3, ꕨ4)) {
return true;
}
if (ꕟ[ꕨ1][a1l] == 0 && ꕟ[ꕨ3][a1l] == 0 && ꕦ(ꕨ1, a1l, ꕨ1, ꕨ2) && ꕦ(ꕨ3, a1l, ꕨ3, ꕨ4)) {
return true;
}
return false;
}
function ꕩ(ꕩ1, ꕩ2, ꕩ3, ꕩ4) {
if (ꕦ(ꕩ1, ꕩ2, ꕩ3, ꕩ4) || ꕧ(ꕩ1, ꕩ2, ꕩ3, ꕩ4) || ꕨ(ꕩ1, ꕩ2, ꕩ3, ꕩ4)) {
return true;
}
}
function abs(a7, a8, a9, a10) {
a11 = ꕞ[a7][a8];
a12 = ꕞ[a9][a10];
if (Math.abs(colors.red(a11) - colors.red(a12)) < ꕒ && Math.abs(colors.green(a11) - colors.green(a12)) < ꕒ && Math.abs(colors.blue(a11) - colors.blue(a12)) < ꕒ) {
return true;
} else {
return false;
}
}
function acs(){
a0 = [108,250,393,535,678,820,963];
a1 = [499,641,784,927,1070,1213,1356,1499,1642,1785];
a0l=a0.length-1;
a1l=a1.length-1;
ꕞ = new Array();
ꕟ = new Array();
for (ꕖ = 0; ꕖ <= a0l; ꕖ++) {
ꕞ[ꕖ] = new Array();
ꕟ[ꕖ] = new Array();
}}
function f0(f1){
for (ꕖ = 0; ꕖ <= a0l; ꕖ++) {
for (ꕘ = 0; ꕘ <= a1l; ꕘ++) {
if (ꕟ[ꕖ][ꕘ] != 0) {
for (ꕪ = 0; ꕪ <= a0l; ꕪ++) {
for (ꕫ = 0; ꕫ <= a1l; ꕫ++) {
if ((ꕖ != ꕪ || ꕘ != ꕫ) && ꕟ[ꕖ][ꕘ] == ꕟ[ꕪ][ꕫ] && ꕟ[ꕖ][ꕘ] != 0) {
if (eval(f1)) {
//new java.lang.Thread(function() {
if(ꕓ==601){while(dxkz==0){if(ꕓ!=601){dxkz=0;break;}sleep(10);}}

press(a0[ꕖ]+random(-10,10), a1[ꕘ]+random(-10,10), ꕓ-dxkz);
//sleep(ꕓ-dxkz);
press(a0[ꕪ]+random(-10,10), a1[ꕫ]+random(-10,10), ꕓ-dxkz);
dxkz=0;
//});
ae++;
//if(ae==35){break;}
e++;
ꕟ[ꕖ][ꕘ] = 0;
ꕟ[ꕪ][ꕫ] = 0;
}
}
}
}
}
}
}
}
function main(){
apc=ꕔ();
ae=0;
for (ꕖ = 0; ꕖ <= a0l; ꕖ++) {
for (ꕘ = 0; ꕘ <= a1l; ꕘ++) {
ꕞ[ꕖ][ꕘ] = images.pixel(apc, a0[ꕖ], a1[ꕘ])
}
}
b0 = 1;
for (ꕖ = 0; ꕖ <= a0l; ꕖ++) {
for (ꕘ = 0; ꕘ <= a1l; ꕘ++) {
if (ꕟ[ꕖ][ꕘ] == null) {
ꕟ[ꕖ][ꕘ] = b0;
b0++;
for (ꕪ = 0; ꕪ <= a0l; ꕪ++) {
for (ꕫ = 0; ꕫ <= a1l; ꕫ++) {
if (abs(ꕖ, ꕘ, ꕪ, ꕫ)) {
ꕟ[ꕪ][ꕫ] = ꕟ[ꕖ][ꕘ];
}
}
}
}
}
}
//ꕙ();
while (true) {
e = 0;
f0("ꕦ(ꕖ, ꕘ, ꕪ, ꕫ)");
if (e == 0) {
f0("ꕧ(ꕖ, ꕘ, ꕪ, ꕫ)");
}
if (e == 0) {
f0("ꕨ(ꕖ, ꕘ, ꕪ, ꕫ)");
}
if (ae >= 35||e==0) {
break;
}
   // log(ae);
}
}
function akzt() {
new java.lang.Thread(function() {
packageName("com.stardust.scriptdroid").className("android.widget.EditText").setText("100");
}).start();
atime=console.rawInput("点击确定开始执行\nQQ:787067033", "")-154;
}
function qs(i0,i1){
return images.pixel(ꕔ(), i0, i1)
}

//akzt();
acs();
    /*
while(true){
sleep(100);
if(qs(608,934)==-12926225){log("就是这里");break;}
}*/
e0=(new Date()).getTime();
main();
e1=(new Date()).getTime();
//console.info("用时:"+(e1-e0)+"毫秒");

    
    
}





while(true){
sleep(50);
ꕓ=601-window.asd.progress*6;
}

