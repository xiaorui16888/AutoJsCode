requestScreenCapture();
console.rawInput("输入任意内容，点击确认才开始执行脚本");
while(true){
while(true){
if(ab5=captureScreen()){
break;
}
}
//第1,1个动物头判断开始
//右方判断开始
//判断1,1和2,1是不是一样
ab6 = images.pixel(ab5,87,575);
ab7 = images.pixel(ab5,239,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,575,391,575,1);
}
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,391,575,1);
}
}
ab6 = images.pixel(ab5,87,575);
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,239,575,1);
}
}
//下方判断开始
//判断1,1和1,2是不是一样
ab6 = images.pixel(ab5,87,575);
ab7 = images.pixel(ab5,87,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1030,87,879,1);
}
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,87,879,1);
}
}
ab6 = images.pixel(ab5,87,575);
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,87,727,1);
}
}
//左方判断开始
//上方判断开始
while(true){
if(ab5=captureScreen()){
break;
}
}
//第1,2个动物头判断开始
//右方判断开始
//判断1,2和2,2是不是一样
ab6 = images.pixel(ab5,87,727);
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,575,391,727,1);
}
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,391,727,1);
}
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,391,727,1);
}
}
ab6 = images.pixel(ab5,87,727);
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,575,239,727,1);
}
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,239,727,1);
}
}
//下方判断开始
//判断1,2和1,3是不是一样
ab6 = images.pixel(ab5,87,727);
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1182,87,1030,1);
}
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,87,1030,1);
}
}
ab6 = images.pixel(ab5,87,727);
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,87,879,1);
}
}
//左方判断开始
//上方判断开始
//判断1,2和1,1是不是一样
ab6 = images.pixel(ab5,87,727);
ab7 = images.pixel(ab5,87,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第1,3个动物头判断开始
//右方判断开始
//判断1,3和2,3是不是一样
ab6 = images.pixel(ab5,87,879);
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,391,879,1);
}
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,391,879,1);
}
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,391,879,1);
}
}
ab6 = images.pixel(ab5,87,879);
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,239,879,1);
}
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,239,879,1);
}
}
//下方判断开始
//判断1,3和1,4是不是一样
ab6 = images.pixel(ab5,87,879);
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1334,87,1182,1);
}
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,87,1182,1);
}
}
ab6 = images.pixel(ab5,87,879);
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,87,1030,1);
}
}
//左方判断开始
//上方判断开始
//判断1,3和1,2是不是一样
ab6 = images.pixel(ab5,87,879);
ab7 = images.pixel(ab5,87,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,575,87,575,1);
}
}
ab6 = images.pixel(ab5,87,879);
ab7 = images.pixel(ab5,87,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,87,727,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第1,4个动物头判断开始
//右方判断开始
//判断1,4和2,4是不是一样
ab6 = images.pixel(ab5,87,1030);
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,391,1030,1);
}
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,391,1030,1);
}
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,391,1030,1);
}
}
ab6 = images.pixel(ab5,87,1030);
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,239,1030,1);
}
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,239,1030,1);
}
}
//下方判断开始
//判断1,4和1,5是不是一样
ab6 = images.pixel(ab5,87,1030);
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1485,87,1334,1);
}
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,87,1334,1);
}
}
ab6 = images.pixel(ab5,87,1030);
ab7 = images.pixel(ab5,87,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,87,1182,1);
}
}
//左方判断开始
//上方判断开始
//判断1,4和1,3是不是一样
ab6 = images.pixel(ab5,87,1030);
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,575,87,727,1);
}
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,87,727,1);
}
}
ab6 = images.pixel(ab5,87,1030);
ab7 = images.pixel(ab5,87,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,87,879,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第1,5个动物头判断开始
//右方判断开始
//判断1,5和2,5是不是一样
ab6 = images.pixel(ab5,87,1182);
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,391,1182,1);
}
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,391,1182,1);
}
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,391,1182,1);
}
}
ab6 = images.pixel(ab5,87,1182);
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,239,1182,1);
}
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,239,1182,1);
}
}
//下方判断开始
//判断1,5和1,6是不是一样
ab6 = images.pixel(ab5,87,1182);
ab7 = images.pixel(ab5,87,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1485,87,1485,1);
}
}
ab6 = images.pixel(ab5,87,1182);
ab7 = images.pixel(ab5,87,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,87,1334,1);
}
}
//左方判断开始
//上方判断开始
//判断1,5和1,4是不是一样
ab6 = images.pixel(ab5,87,1182);
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,727,87,879,1);
}
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,87,879,1);
}
}
ab6 = images.pixel(ab5,87,1182);
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,87,1030,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第1,6个动物头判断开始
//右方判断开始
//判断1,6和2,6是不是一样
ab6 = images.pixel(ab5,87,1334);
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,391,1334,1);
}
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,391,1334,1);
}
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1485,391,1334,1);
}
}
ab6 = images.pixel(ab5,87,1334);
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,239,1334,1);
}
ab7 = images.pixel(ab5,239,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1485,239,1334,1);
}
}
//下方判断开始
//判断1,6和1,7是不是一样
ab6 = images.pixel(ab5,87,1334);
ab7 = images.pixel(ab5,87,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//左方判断开始
//上方判断开始
//判断1,6和1,5是不是一样
ab6 = images.pixel(ab5,87,1334);
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,879,87,1030,1);
}
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,87,1030,1);
}
}
ab6 = images.pixel(ab5,87,1334);
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,87,1182,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第1,7个动物头判断开始
//右方判断开始
//判断1,7和2,7是不是一样
ab6 = images.pixel(ab5,87,1485);
ab7 = images.pixel(ab5,239,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,391,1485,1);
}
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1485,391,1485,1);
}
}
ab6 = images.pixel(ab5,87,1485);
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,239,1485,1);
}
}
//下方判断开始
//左方判断开始
//上方判断开始
//判断1,7和1,6是不是一样
ab6 = images.pixel(ab5,87,1485);
ab7 = images.pixel(ab5,87,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1030,87,1182,1);
}
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,87,1182,1);
}
}
ab6 = images.pixel(ab5,87,1485);
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,87,1334,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第2,1个动物头判断开始
//右方判断开始
//判断2,1和3,1是不是一样
ab6 = images.pixel(ab5,239,575);
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,575,544,575,1);
}
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,544,575,1);
}
}
ab6 = images.pixel(ab5,239,575);
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,391,575,1);
}
}
//下方判断开始
//判断2,1和2,2是不是一样
ab6 = images.pixel(ab5,239,575);
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,879,239,879,1);
}
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,239,879,1);
}
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,239,879,1);
}
}
ab6 = images.pixel(ab5,239,575);
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,727,239,727,1);
}
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,239,727,1);
}
}
//左方判断开始
//判断2,1和1,1是不是一样
ab6 = images.pixel(ab5,239,575);
ab7 = images.pixel(ab5,87,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//上方判断开始
while(true){
if(ab5=captureScreen()){
break;
}
}
//第2,2个动物头判断开始
//右方判断开始
//判断2,2和3,2是不是一样
ab6 = images.pixel(ab5,239,727);
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,575,544,727,1);
}
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,544,727,1);
}
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,544,727,1);
}
}
ab6 = images.pixel(ab5,239,727);
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,575,391,727,1);
}
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,391,727,1);
}
}
//下方判断开始
//判断2,2和2,3是不是一样
ab6 = images.pixel(ab5,239,727);
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1030,239,1030,1);
}
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,239,1030,1);
}
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,239,1030,1);
}
}
ab6 = images.pixel(ab5,239,727);
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,879,239,879,1);
}
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,239,879,1);
}
}
//左方判断开始
//判断2,2和1,2是不是一样
ab6 = images.pixel(ab5,239,727);
ab7 = images.pixel(ab5,87,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//上方判断开始
//判断2,2和2,1是不是一样
ab6 = images.pixel(ab5,239,727);
ab7 = images.pixel(ab5,239,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第2,3个动物头判断开始
//右方判断开始
//判断2,3和3,3是不是一样
ab6 = images.pixel(ab5,239,879);
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,544,879,1);
}
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,544,879,1);
}
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,544,879,1);
}
}
ab6 = images.pixel(ab5,239,879);
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,391,879,1);
}
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,391,879,1);
}
}
//下方判断开始
//判断2,3和2,4是不是一样
ab6 = images.pixel(ab5,239,879);
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1182,239,1182,1);
}
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,239,1182,1);
}
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,239,1182,1);
}
}
ab6 = images.pixel(ab5,239,879);
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1030,239,1030,1);
}
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,239,1030,1);
}
}
//左方判断开始
//判断2,3和1,3是不是一样
ab6 = images.pixel(ab5,239,879);
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//上方判断开始
//判断2,3和2,2是不是一样
ab6 = images.pixel(ab5,239,879);
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,575,239,575,1);
}
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,575,239,575,1);
}
}
ab6 = images.pixel(ab5,239,879);
ab7 = images.pixel(ab5,239,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,727,239,727,1);
}
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,239,727,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第2,4个动物头判断开始
//右方判断开始
//判断2,4和3,4是不是一样
ab6 = images.pixel(ab5,239,1030);
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,544,1030,1);
}
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,544,1030,1);
}
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,544,1030,1);
}
}
ab6 = images.pixel(ab5,239,1030);
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,391,1030,1);
}
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,391,1030,1);
}
}
//下方判断开始
//判断2,4和2,5是不是一样
ab6 = images.pixel(ab5,239,1030);
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1334,239,1334,1);
}
ab7 = images.pixel(ab5,239,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1485,239,1334,1);
}
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,239,1334,1);
}
}
ab6 = images.pixel(ab5,239,1030);
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1182,239,1182,1);
}
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,239,1182,1);
}
}
//左方判断开始
//判断2,4和1,4是不是一样
ab6 = images.pixel(ab5,239,1030);
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//上方判断开始
//判断2,4和2,3是不是一样
ab6 = images.pixel(ab5,239,1030);
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,727,239,727,1);
}
ab7 = images.pixel(ab5,239,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,575,239,727,1);
}
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,239,727,1);
}
}
ab6 = images.pixel(ab5,239,1030);
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,879,239,879,1);
}
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,239,879,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第2,5个动物头判断开始
//右方判断开始
//判断2,5和3,5是不是一样
ab6 = images.pixel(ab5,239,1182);
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,544,1182,1);
}
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,544,1182,1);
}
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,544,1182,1);
}
}
ab6 = images.pixel(ab5,239,1182);
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,391,1182,1);
}
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,391,1182,1);
}
}
//下方判断开始
//判断2,5和2,6是不是一样
ab6 = images.pixel(ab5,239,1182);
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1485,239,1485,1);
}
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1485,239,1485,1);
}
}
ab6 = images.pixel(ab5,239,1182);
ab7 = images.pixel(ab5,239,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1334,239,1334,1);
}
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,239,1334,1);
}
}
//左方判断开始
//判断2,5和1,5是不是一样
ab6 = images.pixel(ab5,239,1182);
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//上方判断开始
//判断2,5和2,4是不是一样
ab6 = images.pixel(ab5,239,1182);
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,879,239,879,1);
}
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,239,879,1);
}
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,239,879,1);
}
}
ab6 = images.pixel(ab5,239,1182);
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1030,239,1030,1);
}
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,239,1030,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第2,6个动物头判断开始
//右方判断开始
//判断2,6和3,6是不是一样
ab6 = images.pixel(ab5,239,1334);
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,544,1334,1);
}
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,544,1334,1);
}
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1485,544,1334,1);
}
}
ab6 = images.pixel(ab5,239,1334);
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,391,1334,1);
}
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1485,391,1334,1);
}
}
//下方判断开始
//判断2,6和2,7是不是一样
ab6 = images.pixel(ab5,239,1334);
ab7 = images.pixel(ab5,239,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//左方判断开始
//判断2,6和1,6是不是一样
ab6 = images.pixel(ab5,239,1334);
ab7 = images.pixel(ab5,87,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//上方判断开始
//判断2,6和2,5是不是一样
ab6 = images.pixel(ab5,239,1334);
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1030,239,1030,1);
}
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,239,1030,1);
}
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,239,1030,1);
}
}
ab6 = images.pixel(ab5,239,1334);
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1182,239,1182,1);
}
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,239,1182,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第2,7个动物头判断开始
//右方判断开始
//判断2,7和3,7是不是一样
ab6 = images.pixel(ab5,239,1485);
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,544,1485,1);
}
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1485,544,1485,1);
}
}
ab6 = images.pixel(ab5,239,1485);
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,391,1485,1);
}
}
//下方判断开始
//左方判断开始
//判断2,7和1,7是不是一样
ab6 = images.pixel(ab5,239,1485);
ab7 = images.pixel(ab5,87,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//上方判断开始
//判断2,7和2,6是不是一样
ab6 = images.pixel(ab5,239,1485);
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1182,239,1182,1);
}
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,239,1182,1);
}
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,239,1182,1);
}
}
ab6 = images.pixel(ab5,239,1485);
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1334,239,1334,1);
}
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,239,1334,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第3,1个动物头判断开始
//右方判断开始
//判断3,1和4,1是不是一样
ab6 = images.pixel(ab5,391,575);
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,575,696,575,1);
}
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,696,575,1);
}
}
ab6 = images.pixel(ab5,391,575);
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,544,575,1);
}
}
//下方判断开始
//判断3,1和3,2是不是一样
ab6 = images.pixel(ab5,391,575);
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,391,879,1);
}
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,391,879,1);
}
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,391,879,1);
}
}
ab6 = images.pixel(ab5,391,575);
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,391,727,1);
}
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,391,727,1);
}
}
//左方判断开始
//判断3,1和2,1是不是一样
ab6 = images.pixel(ab5,391,575);
ab7 = images.pixel(ab5,239,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,727,87,575,1);
}
}
ab6 = images.pixel(ab5,391,575);
ab7 = images.pixel(ab5,87,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,239,575,1);
}
}
//上方判断开始
while(true){
if(ab5=captureScreen()){
break;
}
}
//第3,2个动物头判断开始
//右方判断开始
//判断3,2和4,2是不是一样
ab6 = images.pixel(ab5,391,727);
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,575,696,727,1);
}
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,696,727,1);
}
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,696,727,1);
}
}
ab6 = images.pixel(ab5,391,727);
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,575,544,727,1);
}
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,544,727,1);
}
}
//下方判断开始
//判断3,2和3,3是不是一样
ab6 = images.pixel(ab5,391,727);
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,391,1030,1);
}
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,391,1030,1);
}
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,391,1030,1);
}
}
ab6 = images.pixel(ab5,391,727);
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,391,879,1);
}
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,391,879,1);
}
}
//左方判断开始
//判断3,2和2,2是不是一样
ab6 = images.pixel(ab5,391,727);
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,575,87,727,1);
}
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,879,87,727,1);
}
}
ab6 = images.pixel(ab5,391,727);
ab7 = images.pixel(ab5,87,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,575,239,727,1);
}
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,239,727,1);
}
}
//上方判断开始
//判断3,2和3,1是不是一样
ab6 = images.pixel(ab5,391,727);
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第3,3个动物头判断开始
//右方判断开始
//判断3,3和4,3是不是一样
ab6 = images.pixel(ab5,391,879);
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,696,879,1);
}
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,696,879,1);
}
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,696,879,1);
}
}
ab6 = images.pixel(ab5,391,879);
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,544,879,1);
}
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,544,879,1);
}
}
//下方判断开始
//判断3,3和3,4是不是一样
ab6 = images.pixel(ab5,391,879);
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,391,1182,1);
}
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,391,1182,1);
}
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,391,1182,1);
}
}
ab6 = images.pixel(ab5,391,879);
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,391,1030,1);
}
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,391,1030,1);
}
}
//左方判断开始
//判断3,3和2,3是不是一样
ab6 = images.pixel(ab5,391,879);
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,727,87,879,1);
}
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1030,87,879,1);
}
}
ab6 = images.pixel(ab5,391,879);
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,239,879,1);
}
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,239,879,1);
}
}
//上方判断开始
//判断3,3和3,2是不是一样
ab6 = images.pixel(ab5,391,879);
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,575,391,575,1);
}
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,575,391,575,1);
}
}
ab6 = images.pixel(ab5,391,879);
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,391,727,1);
}
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,391,727,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第3,4个动物头判断开始
//右方判断开始
//判断3,4和4,4是不是一样
ab6 = images.pixel(ab5,391,1030);
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,696,1030,1);
}
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,696,1030,1);
}
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,696,1030,1);
}
}
ab6 = images.pixel(ab5,391,1030);
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,544,1030,1);
}
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,544,1030,1);
}
}
//下方判断开始
//判断3,4和3,5是不是一样
ab6 = images.pixel(ab5,391,1030);
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,391,1334,1);
}
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1485,391,1334,1);
}
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,391,1334,1);
}
}
ab6 = images.pixel(ab5,391,1030);
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,391,1182,1);
}
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,391,1182,1);
}
}
//左方判断开始
//判断3,4和2,4是不是一样
ab6 = images.pixel(ab5,391,1030);
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,879,87,1030,1);
}
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1182,87,1030,1);
}
}
ab6 = images.pixel(ab5,391,1030);
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,239,1030,1);
}
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,239,1030,1);
}
}
//上方判断开始
//判断3,4和3,3是不是一样
ab6 = images.pixel(ab5,391,1030);
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,391,727,1);
}
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,575,391,727,1);
}
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,391,727,1);
}
}
ab6 = images.pixel(ab5,391,1030);
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,391,879,1);
}
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,391,879,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第3,5个动物头判断开始
//右方判断开始
//判断3,5和4,5是不是一样
ab6 = images.pixel(ab5,391,1182);
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,696,1182,1);
}
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,696,1182,1);
}
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,696,1182,1);
}
}
ab6 = images.pixel(ab5,391,1182);
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,544,1182,1);
}
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,544,1182,1);
}
}
//下方判断开始
//判断3,5和3,6是不是一样
ab6 = images.pixel(ab5,391,1182);
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1485,391,1485,1);
}
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1485,391,1485,1);
}
}
ab6 = images.pixel(ab5,391,1182);
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,391,1334,1);
}
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,391,1334,1);
}
}
//左方判断开始
//判断3,5和2,5是不是一样
ab6 = images.pixel(ab5,391,1182);
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1030,87,1182,1);
}
ab7 = images.pixel(ab5,87,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1334,87,1182,1);
}
}
ab6 = images.pixel(ab5,391,1182);
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,239,1182,1);
}
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,239,1182,1);
}
}
//上方判断开始
//判断3,5和3,4是不是一样
ab6 = images.pixel(ab5,391,1182);
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,391,879,1);
}
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,391,879,1);
}
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,391,879,1);
}
}
ab6 = images.pixel(ab5,391,1182);
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,391,1030,1);
}
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,391,1030,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第3,6个动物头判断开始
//右方判断开始
//判断3,6和4,6是不是一样
ab6 = images.pixel(ab5,391,1334);
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,696,1334,1);
}
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,696,1334,1);
}
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1485,696,1334,1);
}
}
ab6 = images.pixel(ab5,391,1334);
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,544,1334,1);
}
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1485,544,1334,1);
}
}
//下方判断开始
//判断3,6和3,7是不是一样
ab6 = images.pixel(ab5,391,1334);
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//左方判断开始
//判断3,6和2,6是不是一样
ab6 = images.pixel(ab5,391,1334);
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1182,87,1334,1);
}
ab7 = images.pixel(ab5,87,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1485,87,1334,1);
}
}
ab6 = images.pixel(ab5,391,1334);
ab7 = images.pixel(ab5,87,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,239,1334,1);
}
ab7 = images.pixel(ab5,239,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1485,239,1334,1);
}
}
//上方判断开始
//判断3,6和3,5是不是一样
ab6 = images.pixel(ab5,391,1334);
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,391,1030,1);
}
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,391,1030,1);
}
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,391,1030,1);
}
}
ab6 = images.pixel(ab5,391,1334);
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,391,1182,1);
}
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,391,1182,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第3,7个动物头判断开始
//右方判断开始
//判断3,7和4,7是不是一样
ab6 = images.pixel(ab5,391,1485);
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,696,1485,1);
}
ab7 = images.pixel(ab5,848,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1485,696,1485,1);
}
}
ab6 = images.pixel(ab5,391,1485);
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,544,1485,1);
}
}
//下方判断开始
//左方判断开始
//判断3,7和2,7是不是一样
ab6 = images.pixel(ab5,391,1485);
ab7 = images.pixel(ab5,239,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1334,87,1485,1);
}
}
ab6 = images.pixel(ab5,391,1485);
ab7 = images.pixel(ab5,87,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,239,1485,1);
}
}
//上方判断开始
//判断3,7和3,6是不是一样
ab6 = images.pixel(ab5,391,1485);
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,391,1182,1);
}
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,391,1182,1);
}
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,391,1182,1);
}
}
ab6 = images.pixel(ab5,391,1485);
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,391,1334,1);
}
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,391,1334,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第4,1个动物头判断开始
//右方判断开始
//判断4,1和5,1是不是一样
ab6 = images.pixel(ab5,544,575);
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,1001,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,575,848,575,1);
}
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,848,575,1);
}
}
ab6 = images.pixel(ab5,544,575);
ab7 = images.pixel(ab5,848,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,696,575,1);
}
}
//下方判断开始
//判断4,1和4,2是不是一样
ab6 = images.pixel(ab5,544,575);
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,544,879,1);
}
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,544,879,1);
}
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,544,879,1);
}
}
ab6 = images.pixel(ab5,544,575);
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,544,727,1);
}
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,544,727,1);
}
}
//左方判断开始
//判断4,1和3,1是不是一样
ab6 = images.pixel(ab5,544,575);
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,87,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,575,239,575,1);
}
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,239,575,1);
}
}
ab6 = images.pixel(ab5,544,575);
ab7 = images.pixel(ab5,239,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,391,575,1);
}
}
//上方判断开始
while(true){
if(ab5=captureScreen()){
break;
}
}
//第4,2个动物头判断开始
//右方判断开始
//判断4,2和5,2是不是一样
ab6 = images.pixel(ab5,544,727);
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,575,848,727,1);
}
ab7 = images.pixel(ab5,1001,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,727,848,727,1);
}
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,848,727,1);
}
}
ab6 = images.pixel(ab5,544,727);
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,575,696,727,1);
}
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,696,727,1);
}
}
//下方判断开始
//判断4,2和4,3是不是一样
ab6 = images.pixel(ab5,544,727);
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,544,1030,1);
}
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,544,1030,1);
}
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,544,1030,1);
}
}
ab6 = images.pixel(ab5,544,727);
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,544,879,1);
}
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,544,879,1);
}
}
//左方判断开始
//判断4,2和3,2是不是一样
ab6 = images.pixel(ab5,544,727);
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,575,239,727,1);
}
ab7 = images.pixel(ab5,87,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,727,239,727,1);
}
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,239,727,1);
}
}
ab6 = images.pixel(ab5,544,727);
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,575,391,727,1);
}
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,391,727,1);
}
}
//上方判断开始
//判断4,2和4,1是不是一样
ab6 = images.pixel(ab5,544,727);
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第4,3个动物头判断开始
//右方判断开始
//判断4,3和5,3是不是一样
ab6 = images.pixel(ab5,544,879);
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,848,879,1);
}
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,879,848,879,1);
}
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,848,879,1);
}
}
ab6 = images.pixel(ab5,544,879);
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,696,879,1);
}
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,696,879,1);
}
}
//下方判断开始
//判断4,3和4,4是不是一样
ab6 = images.pixel(ab5,544,879);
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,544,1182,1);
}
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,544,1182,1);
}
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,544,1182,1);
}
}
ab6 = images.pixel(ab5,544,879);
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,544,1030,1);
}
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,544,1030,1);
}
}
//左方判断开始
//判断4,3和3,3是不是一样
ab6 = images.pixel(ab5,544,879);
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,239,879,1);
}
ab7 = images.pixel(ab5,87,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,879,239,879,1);
}
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,239,879,1);
}
}
ab6 = images.pixel(ab5,544,879);
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,391,879,1);
}
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,391,879,1);
}
}
//上方判断开始
//判断4,3和4,2是不是一样
ab6 = images.pixel(ab5,544,879);
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,575,544,575,1);
}
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,575,544,575,1);
}
}
ab6 = images.pixel(ab5,544,879);
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,544,727,1);
}
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,544,727,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第4,4个动物头判断开始
//右方判断开始
//判断4,4和5,4是不是一样
ab6 = images.pixel(ab5,544,1030);
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,848,1030,1);
}
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1030,848,1030,1);
}
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,848,1030,1);
}
}
ab6 = images.pixel(ab5,544,1030);
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,696,1030,1);
}
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,696,1030,1);
}
}
//下方判断开始
//判断4,4和4,5是不是一样
ab6 = images.pixel(ab5,544,1030);
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,544,1334,1);
}
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1485,544,1334,1);
}
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,544,1334,1);
}
}
ab6 = images.pixel(ab5,544,1030);
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,544,1182,1);
}
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,544,1182,1);
}
}
//左方判断开始
//判断4,4和3,4是不是一样
ab6 = images.pixel(ab5,544,1030);
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,239,1030,1);
}
ab7 = images.pixel(ab5,87,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1030,239,1030,1);
}
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,239,1030,1);
}
}
ab6 = images.pixel(ab5,544,1030);
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,391,1030,1);
}
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,391,1030,1);
}
}
//上方判断开始
//判断4,4和4,3是不是一样
ab6 = images.pixel(ab5,544,1030);
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,544,727,1);
}
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,575,544,727,1);
}
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,544,727,1);
}
}
ab6 = images.pixel(ab5,544,1030);
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,544,879,1);
}
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,544,879,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第4,5个动物头判断开始
//右方判断开始
//判断4,5和5,5是不是一样
ab6 = images.pixel(ab5,544,1182);
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,848,1182,1);
}
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1182,848,1182,1);
}
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,848,1182,1);
}
}
ab6 = images.pixel(ab5,544,1182);
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,696,1182,1);
}
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,696,1182,1);
}
}
//下方判断开始
//判断4,5和4,6是不是一样
ab6 = images.pixel(ab5,544,1182);
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1485,544,1485,1);
}
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1485,544,1485,1);
}
}
ab6 = images.pixel(ab5,544,1182);
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,544,1334,1);
}
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,544,1334,1);
}
}
//左方判断开始
//判断4,5和3,5是不是一样
ab6 = images.pixel(ab5,544,1182);
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,239,1182,1);
}
ab7 = images.pixel(ab5,87,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1182,239,1182,1);
}
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,239,1182,1);
}
}
ab6 = images.pixel(ab5,544,1182);
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,391,1182,1);
}
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,391,1182,1);
}
}
//上方判断开始
//判断4,5和4,4是不是一样
ab6 = images.pixel(ab5,544,1182);
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,544,879,1);
}
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,544,879,1);
}
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,544,879,1);
}
}
ab6 = images.pixel(ab5,544,1182);
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,544,1030,1);
}
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,544,1030,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第4,6个动物头判断开始
//右方判断开始
//判断4,6和5,6是不是一样
ab6 = images.pixel(ab5,544,1334);
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,848,1334,1);
}
ab7 = images.pixel(ab5,1001,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1334,848,1334,1);
}
ab7 = images.pixel(ab5,848,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1485,848,1334,1);
}
}
ab6 = images.pixel(ab5,544,1334);
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,696,1334,1);
}
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1485,696,1334,1);
}
}
//下方判断开始
//判断4,6和4,7是不是一样
ab6 = images.pixel(ab5,544,1334);
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//左方判断开始
//判断4,6和3,6是不是一样
ab6 = images.pixel(ab5,544,1334);
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,239,1334,1);
}
ab7 = images.pixel(ab5,87,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1334,239,1334,1);
}
ab7 = images.pixel(ab5,239,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1485,239,1334,1);
}
}
ab6 = images.pixel(ab5,544,1334);
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,391,1334,1);
}
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1485,391,1334,1);
}
}
//上方判断开始
//判断4,6和4,5是不是一样
ab6 = images.pixel(ab5,544,1334);
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,544,1030,1);
}
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,544,1030,1);
}
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,544,1030,1);
}
}
ab6 = images.pixel(ab5,544,1334);
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,544,1182,1);
}
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,544,1182,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第4,7个动物头判断开始
//右方判断开始
//判断4,7和5,7是不是一样
ab6 = images.pixel(ab5,544,1485);
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,848,1485,1);
}
ab7 = images.pixel(ab5,1001,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1485,848,1485,1);
}
}
ab6 = images.pixel(ab5,544,1485);
ab7 = images.pixel(ab5,848,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,696,1485,1);
}
}
//下方判断开始
//左方判断开始
//判断4,7和3,7是不是一样
ab6 = images.pixel(ab5,544,1485);
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,239,1485,1);
}
ab7 = images.pixel(ab5,87,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(87,1485,239,1485,1);
}
}
ab6 = images.pixel(ab5,544,1485);
ab7 = images.pixel(ab5,239,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,391,1485,1);
}
}
//上方判断开始
//判断4,7和4,6是不是一样
ab6 = images.pixel(ab5,544,1485);
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,544,1182,1);
}
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,544,1182,1);
}
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,544,1182,1);
}
}
ab6 = images.pixel(ab5,544,1485);
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,544,1334,1);
}
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,544,1334,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第5,1个动物头判断开始
//右方判断开始
//判断5,1和6,1是不是一样
ab6 = images.pixel(ab5,696,575);
ab7 = images.pixel(ab5,848,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,1001,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,727,1001,575,1);
}
}
ab6 = images.pixel(ab5,696,575);
ab7 = images.pixel(ab5,1001,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,848,575,1);
}
}
//下方判断开始
//判断5,1和5,2是不是一样
ab6 = images.pixel(ab5,696,575);
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,696,879,1);
}
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,696,879,1);
}
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,696,879,1);
}
}
ab6 = images.pixel(ab5,696,575);
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,696,727,1);
}
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,696,727,1);
}
}
//左方判断开始
//判断5,1和4,1是不是一样
ab6 = images.pixel(ab5,696,575);
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,239,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,575,391,575,1);
}
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,391,575,1);
}
}
ab6 = images.pixel(ab5,696,575);
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,544,575,1);
}
}
//上方判断开始
while(true){
if(ab5=captureScreen()){
break;
}
}
//第5,2个动物头判断开始
//右方判断开始
//判断5,2和6,2是不是一样
ab6 = images.pixel(ab5,696,727);
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,1001,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,575,1001,727,1);
}
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,879,1001,727,1);
}
}
ab6 = images.pixel(ab5,696,727);
ab7 = images.pixel(ab5,1001,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,575,848,727,1);
}
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,848,727,1);
}
}
//下方判断开始
//判断5,2和5,3是不是一样
ab6 = images.pixel(ab5,696,727);
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,696,1030,1);
}
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,696,1030,1);
}
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,696,1030,1);
}
}
ab6 = images.pixel(ab5,696,727);
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,696,879,1);
}
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,696,879,1);
}
}
//左方判断开始
//判断5,2和4,2是不是一样
ab6 = images.pixel(ab5,696,727);
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,575,391,727,1);
}
ab7 = images.pixel(ab5,239,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,727,391,727,1);
}
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,391,727,1);
}
}
ab6 = images.pixel(ab5,696,727);
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,575,544,727,1);
}
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,544,727,1);
}
}
//上方判断开始
//判断5,2和5,1是不是一样
ab6 = images.pixel(ab5,696,727);
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第5,3个动物头判断开始
//右方判断开始
//判断5,3和6,3是不是一样
ab6 = images.pixel(ab5,696,879);
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,1001,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,727,1001,879,1);
}
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1030,1001,879,1);
}
}
ab6 = images.pixel(ab5,696,879);
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,848,879,1);
}
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,848,879,1);
}
}
//下方判断开始
//判断5,3和5,4是不是一样
ab6 = images.pixel(ab5,696,879);
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,696,1182,1);
}
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,696,1182,1);
}
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,696,1182,1);
}
}
ab6 = images.pixel(ab5,696,879);
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,696,1030,1);
}
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,696,1030,1);
}
}
//左方判断开始
//判断5,3和4,3是不是一样
ab6 = images.pixel(ab5,696,879);
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,391,879,1);
}
ab7 = images.pixel(ab5,239,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,879,391,879,1);
}
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,391,879,1);
}
}
ab6 = images.pixel(ab5,696,879);
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,544,879,1);
}
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,544,879,1);
}
}
//上方判断开始
//判断5,3和5,2是不是一样
ab6 = images.pixel(ab5,696,879);
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,575,696,575,1);
}
ab7 = images.pixel(ab5,848,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,575,696,575,1);
}
}
ab6 = images.pixel(ab5,696,879);
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,696,727,1);
}
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,696,727,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第5,4个动物头判断开始
//右方判断开始
//判断5,4和6,4是不是一样
ab6 = images.pixel(ab5,696,1030);
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,879,1001,1030,1);
}
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1182,1001,1030,1);
}
}
ab6 = images.pixel(ab5,696,1030);
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,848,1030,1);
}
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,848,1030,1);
}
}
//下方判断开始
//判断5,4和5,5是不是一样
ab6 = images.pixel(ab5,696,1030);
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,696,1334,1);
}
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1485,696,1334,1);
}
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,696,1334,1);
}
}
ab6 = images.pixel(ab5,696,1030);
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,696,1182,1);
}
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,696,1182,1);
}
}
//左方判断开始
//判断5,4和4,4是不是一样
ab6 = images.pixel(ab5,696,1030);
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,391,1030,1);
}
ab7 = images.pixel(ab5,239,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1030,391,1030,1);
}
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,391,1030,1);
}
}
ab6 = images.pixel(ab5,696,1030);
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,544,1030,1);
}
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,544,1030,1);
}
}
//上方判断开始
//判断5,4和5,3是不是一样
ab6 = images.pixel(ab5,696,1030);
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,696,727,1);
}
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,575,696,727,1);
}
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,696,727,1);
}
}
ab6 = images.pixel(ab5,696,1030);
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,696,879,1);
}
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,696,879,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第5,5个动物头判断开始
//右方判断开始
//判断5,5和6,5是不是一样
ab6 = images.pixel(ab5,696,1182);
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1030,1001,1182,1);
}
ab7 = images.pixel(ab5,1001,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1334,1001,1182,1);
}
}
ab6 = images.pixel(ab5,696,1182);
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,848,1182,1);
}
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,848,1182,1);
}
}
//下方判断开始
//判断5,5和5,6是不是一样
ab6 = images.pixel(ab5,696,1182);
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1485,696,1485,1);
}
ab7 = images.pixel(ab5,848,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1485,696,1485,1);
}
}
ab6 = images.pixel(ab5,696,1182);
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,696,1334,1);
}
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,696,1334,1);
}
}
//左方判断开始
//判断5,5和4,5是不是一样
ab6 = images.pixel(ab5,696,1182);
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,391,1182,1);
}
ab7 = images.pixel(ab5,239,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1182,391,1182,1);
}
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,391,1182,1);
}
}
ab6 = images.pixel(ab5,696,1182);
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,544,1182,1);
}
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,544,1182,1);
}
}
//上方判断开始
//判断5,5和5,4是不是一样
ab6 = images.pixel(ab5,696,1182);
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,696,879,1);
}
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,696,879,1);
}
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,696,879,1);
}
}
ab6 = images.pixel(ab5,696,1182);
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,696,1030,1);
}
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,696,1030,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第5,6个动物头判断开始
//右方判断开始
//判断5,6和6,6是不是一样
ab6 = images.pixel(ab5,696,1334);
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1182,1001,1334,1);
}
ab7 = images.pixel(ab5,1001,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1485,1001,1334,1);
}
}
ab6 = images.pixel(ab5,696,1334);
ab7 = images.pixel(ab5,1001,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,848,1334,1);
}
ab7 = images.pixel(ab5,848,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1485,848,1334,1);
}
}
//下方判断开始
//判断5,6和5,7是不是一样
ab6 = images.pixel(ab5,696,1334);
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//左方判断开始
//判断5,6和4,6是不是一样
ab6 = images.pixel(ab5,696,1334);
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,391,1334,1);
}
ab7 = images.pixel(ab5,239,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1334,391,1334,1);
}
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1485,391,1334,1);
}
}
ab6 = images.pixel(ab5,696,1334);
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,544,1334,1);
}
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1485,544,1334,1);
}
}
//上方判断开始
//判断5,6和5,5是不是一样
ab6 = images.pixel(ab5,696,1334);
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,696,1030,1);
}
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,696,1030,1);
}
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,696,1030,1);
}
}
ab6 = images.pixel(ab5,696,1334);
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,696,1182,1);
}
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,696,1182,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第5,7个动物头判断开始
//右方判断开始
//判断5,7和6,7是不是一样
ab6 = images.pixel(ab5,696,1485);
ab7 = images.pixel(ab5,848,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,1001,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1334,1001,1485,1);
}
}
ab6 = images.pixel(ab5,696,1485);
ab7 = images.pixel(ab5,1001,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,848,1485,1);
}
}
//下方判断开始
//左方判断开始
//判断5,7和4,7是不是一样
ab6 = images.pixel(ab5,696,1485);
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,391,1485,1);
}
ab7 = images.pixel(ab5,239,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(239,1485,391,1485,1);
}
}
ab6 = images.pixel(ab5,696,1485);
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,544,1485,1);
}
}
//上方判断开始
//判断5,7和5,6是不是一样
ab6 = images.pixel(ab5,696,1485);
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,696,1182,1);
}
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,696,1182,1);
}
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,696,1182,1);
}
}
ab6 = images.pixel(ab5,696,1485);
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,696,1334,1);
}
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,696,1334,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第6,1个动物头判断开始
//右方判断开始
//判断6,1和7,1是不是一样
ab6 = images.pixel(ab5,848,575);
ab7 = images.pixel(ab5,1001,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//下方判断开始
//判断6,1和6,2是不是一样
ab6 = images.pixel(ab5,848,575);
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,848,879,1);
}
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,848,879,1);
}
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,879,848,879,1);
}
}
ab6 = images.pixel(ab5,848,575);
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,848,727,1);
}
ab7 = images.pixel(ab5,1001,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,727,848,727,1);
}
}
//左方判断开始
//判断6,1和5,1是不是一样
ab6 = images.pixel(ab5,848,575);
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,391,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,575,544,575,1);
}
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,544,575,1);
}
}
ab6 = images.pixel(ab5,848,575);
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,696,575,1);
}
}
//上方判断开始
while(true){
if(ab5=captureScreen()){
break;
}
}
//第6,2个动物头判断开始
//右方判断开始
//判断6,2和7,2是不是一样
ab6 = images.pixel(ab5,848,727);
ab7 = images.pixel(ab5,1001,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//下方判断开始
//判断6,2和6,3是不是一样
ab6 = images.pixel(ab5,848,727);
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,848,1030,1);
}
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,848,1030,1);
}
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1030,848,1030,1);
}
}
ab6 = images.pixel(ab5,848,727);
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,848,879,1);
}
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,879,848,879,1);
}
}
//左方判断开始
//判断6,2和5,2是不是一样
ab6 = images.pixel(ab5,848,727);
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,575,544,727,1);
}
ab7 = images.pixel(ab5,391,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,727,544,727,1);
}
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,544,727,1);
}
}
ab6 = images.pixel(ab5,848,727);
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,575,696,727,1);
}
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,696,727,1);
}
}
//上方判断开始
//判断6,2和6,1是不是一样
ab6 = images.pixel(ab5,848,727);
ab7 = images.pixel(ab5,848,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第6,3个动物头判断开始
//右方判断开始
//判断6,3和7,3是不是一样
ab6 = images.pixel(ab5,848,879);
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//下方判断开始
//判断6,3和6,4是不是一样
ab6 = images.pixel(ab5,848,879);
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,848,1182,1);
}
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,848,1182,1);
}
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1182,848,1182,1);
}
}
ab6 = images.pixel(ab5,848,879);
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,848,1030,1);
}
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1030,848,1030,1);
}
}
//左方判断开始
//判断6,3和5,3是不是一样
ab6 = images.pixel(ab5,848,879);
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,544,879,1);
}
ab7 = images.pixel(ab5,391,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,879,544,879,1);
}
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,544,879,1);
}
}
ab6 = images.pixel(ab5,848,879);
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,696,879,1);
}
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,696,879,1);
}
}
//上方判断开始
//判断6,3和6,2是不是一样
ab6 = images.pixel(ab5,848,879);
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,575,848,575,1);
}
ab7 = images.pixel(ab5,1001,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,575,848,575,1);
}
}
ab6 = images.pixel(ab5,848,879);
ab7 = images.pixel(ab5,848,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,848,727,1);
}
ab7 = images.pixel(ab5,1001,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,727,848,727,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第6,4个动物头判断开始
//右方判断开始
//判断6,4和7,4是不是一样
ab6 = images.pixel(ab5,848,1030);
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//下方判断开始
//判断6,4和6,5是不是一样
ab6 = images.pixel(ab5,848,1030);
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,848,1334,1);
}
ab7 = images.pixel(ab5,848,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1485,848,1334,1);
}
ab7 = images.pixel(ab5,1001,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1334,848,1334,1);
}
}
ab6 = images.pixel(ab5,848,1030);
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,848,1182,1);
}
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1182,848,1182,1);
}
}
//左方判断开始
//判断6,4和5,4是不是一样
ab6 = images.pixel(ab5,848,1030);
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,544,1030,1);
}
ab7 = images.pixel(ab5,391,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1030,544,1030,1);
}
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,544,1030,1);
}
}
ab6 = images.pixel(ab5,848,1030);
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,696,1030,1);
}
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,696,1030,1);
}
}
//上方判断开始
//判断6,4和6,3是不是一样
ab6 = images.pixel(ab5,848,1030);
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,848,727,1);
}
ab7 = images.pixel(ab5,848,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,575,848,727,1);
}
ab7 = images.pixel(ab5,1001,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,727,848,727,1);
}
}
ab6 = images.pixel(ab5,848,1030);
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,848,879,1);
}
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,879,848,879,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第6,5个动物头判断开始
//右方判断开始
//判断6,5和7,5是不是一样
ab6 = images.pixel(ab5,848,1182);
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//下方判断开始
//判断6,5和6,6是不是一样
ab6 = images.pixel(ab5,848,1182);
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1485,848,1485,1);
}
ab7 = images.pixel(ab5,1001,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1485,848,1485,1);
}
}
ab6 = images.pixel(ab5,848,1182);
ab7 = images.pixel(ab5,848,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,848,1334,1);
}
ab7 = images.pixel(ab5,1001,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1334,848,1334,1);
}
}
//左方判断开始
//判断6,5和5,5是不是一样
ab6 = images.pixel(ab5,848,1182);
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,544,1182,1);
}
ab7 = images.pixel(ab5,391,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1182,544,1182,1);
}
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,544,1182,1);
}
}
ab6 = images.pixel(ab5,848,1182);
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,696,1182,1);
}
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,696,1182,1);
}
}
//上方判断开始
//判断6,5和6,4是不是一样
ab6 = images.pixel(ab5,848,1182);
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,848,879,1);
}
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,848,879,1);
}
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,879,848,879,1);
}
}
ab6 = images.pixel(ab5,848,1182);
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,848,1030,1);
}
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1030,848,1030,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第6,6个动物头判断开始
//右方判断开始
//判断6,6和7,6是不是一样
ab6 = images.pixel(ab5,848,1334);
ab7 = images.pixel(ab5,1001,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//下方判断开始
//判断6,6和6,7是不是一样
ab6 = images.pixel(ab5,848,1334);
ab7 = images.pixel(ab5,848,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//左方判断开始
//判断6,6和5,6是不是一样
ab6 = images.pixel(ab5,848,1334);
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,544,1334,1);
}
ab7 = images.pixel(ab5,391,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1334,544,1334,1);
}
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1485,544,1334,1);
}
}
ab6 = images.pixel(ab5,848,1334);
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,696,1334,1);
}
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1485,696,1334,1);
}
}
//上方判断开始
//判断6,6和6,5是不是一样
ab6 = images.pixel(ab5,848,1334);
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,848,1030,1);
}
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,848,1030,1);
}
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1030,848,1030,1);
}
}
ab6 = images.pixel(ab5,848,1334);
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,848,1182,1);
}
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1182,848,1182,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第6,7个动物头判断开始
//右方判断开始
//判断6,7和7,7是不是一样
ab6 = images.pixel(ab5,848,1485);
ab7 = images.pixel(ab5,1001,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//下方判断开始
//左方判断开始
//判断6,7和5,7是不是一样
ab6 = images.pixel(ab5,848,1485);
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,544,1485,1);
}
ab7 = images.pixel(ab5,391,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(391,1485,544,1485,1);
}
}
ab6 = images.pixel(ab5,848,1485);
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,696,1485,1);
}
}
//上方判断开始
//判断6,7和6,6是不是一样
ab6 = images.pixel(ab5,848,1485);
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,848,1182,1);
}
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,848,1182,1);
}
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1182,848,1182,1);
}
}
ab6 = images.pixel(ab5,848,1485);
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,848,1334,1);
}
ab7 = images.pixel(ab5,1001,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1334,848,1334,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第7,1个动物头判断开始
//右方判断开始
//下方判断开始
//判断7,1和7,2是不是一样
ab6 = images.pixel(ab5,1001,575);
ab7 = images.pixel(ab5,1001,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,1001,879,1);
}
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1030,1001,879,1);
}
}
ab6 = images.pixel(ab5,1001,575);
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,1001,727,1);
}
}
//左方判断开始
//判断7,1和6,1是不是一样
ab6 = images.pixel(ab5,1001,575);
ab7 = images.pixel(ab5,848,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,544,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,575,696,575,1);
}
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,696,575,1);
}
}
ab6 = images.pixel(ab5,1001,575);
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,848,575,1);
}
}
//上方判断开始
while(true){
if(ab5=captureScreen()){
break;
}
}
//第7,2个动物头判断开始
//右方判断开始
//下方判断开始
//判断7,2和7,3是不是一样
ab6 = images.pixel(ab5,1001,727);
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,1001,1030,1);
}
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1182,1001,1030,1);
}
}
ab6 = images.pixel(ab5,1001,727);
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,1001,879,1);
}
}
//左方判断开始
//判断7,2和6,2是不是一样
ab6 = images.pixel(ab5,1001,727);
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,575,696,727,1);
}
ab7 = images.pixel(ab5,544,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,727,696,727,1);
}
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,696,727,1);
}
}
ab6 = images.pixel(ab5,1001,727);
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,575,848,727,1);
}
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,848,727,1);
}
}
//上方判断开始
//判断7,2和7,1是不是一样
ab6 = images.pixel(ab5,1001,727);
ab7 = images.pixel(ab5,1001,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第7,3个动物头判断开始
//右方判断开始
//下方判断开始
//判断7,3和7,4是不是一样
ab6 = images.pixel(ab5,1001,879);
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,1001,1182,1);
}
ab7 = images.pixel(ab5,1001,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1334,1001,1182,1);
}
}
ab6 = images.pixel(ab5,1001,879);
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,1001,1030,1);
}
}
//左方判断开始
//判断7,3和6,3是不是一样
ab6 = images.pixel(ab5,1001,879);
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,727,696,879,1);
}
ab7 = images.pixel(ab5,544,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,879,696,879,1);
}
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,696,879,1);
}
}
ab6 = images.pixel(ab5,1001,879);
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,848,879,1);
}
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,848,879,1);
}
}
//上方判断开始
//判断7,3和7,2是不是一样
ab6 = images.pixel(ab5,1001,879);
ab7 = images.pixel(ab5,1001,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,575,1001,575,1);
}
}
ab6 = images.pixel(ab5,1001,879);
ab7 = images.pixel(ab5,1001,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,1001,727,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第7,4个动物头判断开始
//右方判断开始
//下方判断开始
//判断7,4和7,5是不是一样
ab6 = images.pixel(ab5,1001,1030);
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,1001,1334,1);
}
ab7 = images.pixel(ab5,1001,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1485,1001,1334,1);
}
}
ab6 = images.pixel(ab5,1001,1030);
ab7 = images.pixel(ab5,1001,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,1001,1182,1);
}
}
//左方判断开始
//判断7,4和6,4是不是一样
ab6 = images.pixel(ab5,1001,1030);
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,879,696,1030,1);
}
ab7 = images.pixel(ab5,544,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1030,696,1030,1);
}
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,696,1030,1);
}
}
ab6 = images.pixel(ab5,1001,1030);
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,848,1030,1);
}
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,848,1030,1);
}
}
//上方判断开始
//判断7,4和7,3是不是一样
ab6 = images.pixel(ab5,1001,1030);
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,727,1001,727,1);
}
ab7 = images.pixel(ab5,1001,575);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,575,1001,727,1);
}
}
ab6 = images.pixel(ab5,1001,1030);
ab7 = images.pixel(ab5,1001,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,1001,879,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第7,5个动物头判断开始
//右方判断开始
//下方判断开始
//判断7,5和7,6是不是一样
ab6 = images.pixel(ab5,1001,1182);
ab7 = images.pixel(ab5,1001,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1485,1001,1485,1);
}
}
ab6 = images.pixel(ab5,1001,1182);
ab7 = images.pixel(ab5,1001,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,1001,1334,1);
}
}
//左方判断开始
//判断7,5和6,5是不是一样
ab6 = images.pixel(ab5,1001,1182);
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1030,696,1182,1);
}
ab7 = images.pixel(ab5,544,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1182,696,1182,1);
}
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,696,1182,1);
}
}
ab6 = images.pixel(ab5,1001,1182);
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,848,1182,1);
}
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,848,1182,1);
}
}
//上方判断开始
//判断7,5和7,4是不是一样
ab6 = images.pixel(ab5,1001,1182);
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,879,1001,879,1);
}
ab7 = images.pixel(ab5,1001,727);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,727,1001,879,1);
}
}
ab6 = images.pixel(ab5,1001,1182);
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,1001,1030,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第7,6个动物头判断开始
//右方判断开始
//下方判断开始
//判断7,6和7,7是不是一样
ab6 = images.pixel(ab5,1001,1334);
ab7 = images.pixel(ab5,1001,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
}
//左方判断开始
//判断7,6和6,6是不是一样
ab6 = images.pixel(ab5,1001,1334);
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1182,696,1334,1);
}
ab7 = images.pixel(ab5,544,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1334,696,1334,1);
}
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1485,696,1334,1);
}
}
ab6 = images.pixel(ab5,1001,1334);
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,848,1334,1);
}
ab7 = images.pixel(ab5,848,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1485,848,1334,1);
}
}
//上方判断开始
//判断7,6和7,5是不是一样
ab6 = images.pixel(ab5,1001,1334);
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1030,1001,1030,1);
}
ab7 = images.pixel(ab5,1001,879);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,879,1001,1030,1);
}
}
ab6 = images.pixel(ab5,1001,1334);
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,1001,1182,1);
}
}
while(true){
if(ab5=captureScreen()){
break;
}
}
//第7,7个动物头判断开始
//右方判断开始
//下方判断开始
//左方判断开始
//判断7,7和6,7是不是一样
ab6 = images.pixel(ab5,1001,1485);
ab7 = images.pixel(ab5,848,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,696,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(696,1334,696,1485,1);
}
ab7 = images.pixel(ab5,544,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(544,1485,696,1485,1);
}
}
ab6 = images.pixel(ab5,1001,1485);
ab7 = images.pixel(ab5,696,1485);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,848,1485,1);
}
}
//上方判断开始
//判断7,7和7,6是不是一样
ab6 = images.pixel(ab5,1001,1485);
ab7 = images.pixel(ab5,1001,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1182,1001,1182,1);
}
ab7 = images.pixel(ab5,1001,1030);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(1001,1030,1001,1182,1);
}
}
ab6 = images.pixel(ab5,1001,1485);
ab7 = images.pixel(ab5,1001,1182);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
ab7 = images.pixel(ab5,848,1334);
if (Math.abs(colors.red(ab6) - colors.red(ab7)) < 5 && Math.abs(colors.green(ab6) - colors.green(ab7)) < 5 && Math.abs(colors.blue(ab6) - colors.blue(ab7)) < 5) {
swipe(848,1334,1001,1334,1);
}
}
}
