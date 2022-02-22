//@hyb1996 
// 微信 跳一跳
//加快速度 i+=60，所以我的手机不卡了哈哈
//兼容7.0以下.因为我的是安卓6.0
//需要autojs 3.0 //root 分辨率1920 1080

var press_coefficient = device.height == 1920 ? 1.392 : 2.099; // 长按的时间系数，请自己根据实际情况调节

const under_game_score_y = 300 // 截图中刚好低于分数显示区域的 Y 坐标，300 是 1920x1080 的值，2K 屏、全面屏请根据实际情况修改
//按压位置为再来一局的位置
const press_x = device.width / 2;
const press_y = 1584 * (device.height / 1920.0);
const piece_body_width = 80 // 棋子的宽度，比截图中量到的稍微大一点比较安全，可能要调节
const piece_dist_from_top_to_base = 188; //棋子最顶部到棋子底部中点的距离

const piece_color = "#3d3752"; //棋子大致颜色
var w = device.width;
var h = device.height;
//使这些函数调用更方便
const red = colors.red;
const green = colors.green;
const blue = colors.blue;
const max = Math.max;
const abs = Math.abs;
var root_automator = true;
main();
 
function main(){
	 prepare();
toast("请在5秒内打开游戏，并点击开始按钮");

waitForPackage("com.tencent.mm");
sleep(5000);

while(currentPackage() == "com.tencent.mm"){
			sleep(3000);
var im = captureScreen();
// 获取棋子和 board 的位置
var result = find_piece_and_board(im);
var board = result.board;
var piece = result.piece;
jump(Math.sqrt(Math.pow(board.x - piece.x, 2) + Math.pow(board.y - piece.y, 2)));

	sleep(2000);
}
}

function press_compat(x, y, duration){
if(device.sdkInt >= 24){
press(x, y, duration);
}else{

		Swipe(x,y,x,y,duration);
}
}
function jump(distance){
var press_time = distance * press_coefficient;
press_time = max(200, press_time);
press_compat(press_x, press_y, parseInt(press_time));
}
function find_piece_and_board(im){
var piece = find_piece(im);
var board = find_board(im, piece);
return {
piece: piece,
board: board
};
}

function find_piece(im){//图片找色
//使用内置找色函数找出棋子最顶部的位置
var piece_top = findColor(im, piece_color, {
threshold: 2
});
	if(piece_top==null) return {
x: 300, y: 300
}

var piece_start_x = -1;
var piece_end_x = -1;
//遍历该行找出棋子顶部中点位置
for(var x = 0; x < w; x++){
var is_piece = images.detectsColor(im, piece_color, x, piece_top.y, 2);
if(is_piece && piece_start_x < 0){
piece_start_x = x;
}
if(!is_piece && piece_start_x >= 0){
piece_end_x = x;
break;
}
}
//棋子顶部中点位置x
var piece_top_center_x = (piece_start_x + piece_end_x) / 2;

var piece_x = piece_top_center_x;
var piece_y = piece_top.y + piece_dist_from_top_to_base;
return {
x: piece_x, y: piece_y
}

}

function find_board(im, piece){
var board_x = 0;
var board_y = 0;
//i+=70加快速度，没测试最大可以设到多少。
for(var i = parseInt(h / 3); i < parseInt(h * 2 / 3); i+=60){
last_pixel = im.pixel(0, i);
if(board_x || board_y){
break;
}
var board_x_sum = 0
var board_x_c = 0

for(var j = 0; j < w; j++){
var pixel = im.pixel(j, i);
// 修掉脑袋比下一个小格子还高的情况的 bug

if(abs(j - piece.x) < piece_body_width){
continue;//认为小于脑袋的宽度的格子不存在，直接跳过这一行
}

// 修掉圆顶的时候一条线导致的小 bug，这个颜色判断应该 OK，暂时不提出来
if(abs(red(pixel) - red(last_pixel)) + abs(blue(pixel) - blue(last_pixel)) + abs(green(pixel) - green(last_pixel)) > 10){
board_x_sum += j;
board_x_c += 1;
}
}
if(board_x_sum){
board_x = board_x_sum / board_x_c
}
}
// 按实际的角度30度来算，找到接近下一个 board 中心的y坐标 :y=x*tan(30)
var board_y = piece.y - abs(board_x - piece.x) * Math.sqrt(3) / 3;

if(!(board_x && board_y)){
return null;
}
return {
x: board_x, y: board_y
}
}

function prepare(){

//确保无障碍服务开启
auto();
//请求截图权限
requestScreenCapture();
device.keepScreenOn(1000 * 3600);

if(device.sdkInt < 24){
root_automator = new RootAutomator();
}

}
events.on("exit", function(){
device.cancelKeepingAwake();
if(root_automator){
root_automator.exit();
}
});