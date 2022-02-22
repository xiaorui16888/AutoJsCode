
// === 思路 ===
// 核心：每次落稳之后截图，根据截图算出棋子的坐标和下一个块顶面的中点坐标，
//      根据两个点的距离乘以一个时间系数获得长按的时间
// 识别棋子：靠棋子的颜色来识别位置，通过截图发现最下面一行大概是一条直线，就从上往下一行一行遍历，
//         比较颜色（颜色用了一个区间来比较）找到最下面的那一行的所有点，然后求个中点，
//         求好之后再让 Y 轴坐标减小棋子底盘的一半高度从而得到中心点的坐标
// 识别棋盘：靠底色和方块的色差来做，从分数之下的位置开始，一行一行扫描，由于圆形的块最顶上是一条线，
//          方形的上面大概是一个点，所以就用类似识别棋子的做法多识别了几个点求中点，
//          这时候得到了块中点的 X 轴坐标，这时候假设现在棋子在当前块的中心，
//          根据一个通过截图获取的固定的角度来推出中点的 Y 坐标
// 最后：根据两点的坐标算距离乘以系数来获取长按时间（似乎可以直接用 X 轴距离）


// TODO{ 解决定位偏移的问题
// TODO{ 看看两个块中心到中轴距离是否相同，如果是的话靠这个来判断一下当前超前还是落后，便于矫正
// TODO{ 一些固定值根据截图的具体大小计算
// TODO{ 直接用 X 轴距离简化逻辑


// Magic Number，不设置可能无法正常执行，请根据具体截图从上到下按需设置
const under_game_score_y = 300     // 截图中刚好低于分数显示区域的 Y 坐标，300 是 1920x1080 的值，2K 屏、全面屏请根据实际情况修改
const press_coefficient = 1.392    // 长按的时间系数，请自己根据实际情况调节
//按压位置为再来一局的位置
const press_x = device.width / 2;
const press_y = 1584 * (device.height / 1920.0);
const piece_body_width = 80       // 棋子的宽度，比截图中量到的稍微大一点比较安全，可能要调节
const piece_dist_from_top_to_base = 188;  //棋子最顶部到棋子底部中点的距离
// 下面的 (353, 859) 和 (772, 1100) 是游戏截图里的两个台子的中点坐标，主要用来算角度，可能要调节
const sample_board_x1 = 353;
const sample_board_y1 = 859;
const sample_board_x2 = 772;
const sample_board_y2 = 1100;

const piece_color = "#3d3752";    //棋子大致颜色

const red = colors.red;
const green = colors.green;
const blue = colors.blue;
const max = Math.max;
const abs = Math.abs;

prepare();
main();

function press_compat(x, y, duration){
    if(device.sdkInt >= 24){
        press(x, y, duration);
    }else{
        root_automator.press(x, y, duration);
    }
}

function jump(distance){
    var press_time = distance * press_coefficient
    press_time = Math.max(press_time, 200)   // 设置 200 ms 是最小的按压时间
    press_compat(press_x, press_y, press_time);
}

function find_piece_and_board(im){
    var w = im.getWidth();
    var h = im.getHeight();

    var piece_x_sum = 0
    var piece_x_c = 0
    var piece_y_max = 0
    var board_x = 0
    var board_y = 0
    var scan_x_border = parseInt(w / 8)  // 扫描棋子时的左右边界
    var scan_start_y = 0  // 扫描的起始y坐标
    // 以50px步长，尝试探测scan_start_y
    for(var i = under_game_score_y; i < h; i += 50){
        var last_pixel = im.pixel(0, i);
        for(var j = 1; j < w; j++){
            var pixel = im.pixel(j,i);
            // 不是纯色的线，则记录scan_start_y的值，准备跳出循环
            if(red(pixel) != red(last_pixel) || green(pixel) != green(last_pixel) || blue(pixel) != blue(last_pixel)){
                scan_start_y = i - 50
                break;
            }
        }
        if(scan_start_y){
            break;
        }
    }
    log("scan_start_y: ", scan_start_y);

    //使用内置找色函数找出棋子最顶部的位置
    var piece_top = findColor(im, piece_color);

    var piece_start_x = -1;
    var piece_end_x = -1;
    //遍历该行找出棋子顶部中点位置
    for(var x = 0; x < w; x++){
        var is_piece = images.detectsColor(im, piece_color, x, piece_top.y);
        if(is_piece && piece_start_x < 0){
            piece_start_x = x;
        }
        if(!is_piece && piece_start_x >= 0){
            piece_end_x = x;
            break;
        }
    }
    //棋子顶部中点位置
    var piece_top_center_x = (piece_start_x + piece_end_x) / 2;

    var piece_x = piece_top_center_x;
    var piece_y = piece_top.y + piece_dist_from_top_to_base;
    log("piece: x = %d, y = %d", piece_x, piece_y);

    for(var i = scan_start_y; i < h; i++){
        last_pixel = im.pixel(0, i);
        if(board_x || board_y){
            break;
        }
        var board_x_sum = 0
        var board_x_c = 0

        for(var j = 0; j < w; j++){
            var pixel = im.pixel(j,i);
            // 修掉脑袋比下一个小格子还高的情况的 bug
            if(abs(j - piece_x) < piece_body_width){
                continue;
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
    // 按实际的角度来算，找到接近下一个 board 中心的坐标
    var board_y = piece_y - abs(board_x - piece_x) * abs(sample_board_y1 - sample_board_y2) / abs(sample_board_x1 - sample_board_x2)

    if(!(board_x && board_y)){
        return null;
    }

    return {
        piece: {
            x: piece_x,
            y: piece_y
        },
        board: {
            x: board_x,
            y: board_y
        }
    };
}

function main(){
    toast("请在5秒内打开游戏，并点击开始按钮");
    waitForPackage("com.tencent.mm");
    sleep(5000);
    while(currentPackage() == "com.tencent.mm"){
        var im = captureScreen();
        // 获取棋子和 board 的位置
        var result = find_piece_and_board(im);
        var board = result.board;
        var piece = result.piece;
        log("find result: ", result);
        jump(Math.sqrt(Math.pow(board.x - piece.x, 2) + Math.pow(board.y - piece.y, 2)));
        sleep(1000);
    }
}


var root_automator = null;

function prepare(){
    auto();
    requestScreenCapture();
    device.keepScreenOn(1000 * 3600);
    if(device.sdkInt < 24){
        root_automator = new RootAutomator();
    }
    events.on("exit", function(){
        device.cancelKeepingAwake();
        if(root_automator){
            root_automator.exit();
        }
    });
}