
// 根据wangshub的Python代码修改而来(原项目地址https://github.com/wangshub/wechat_jump_game)

// 运行环境：安卓软件Auto.js(https://github.com/hyb1996/Auto.js), 下载地址: https://github.com/hyb1996/Auto.js/releases
// 需求root权限或者安卓7.0以上才能运行本脚本

// 在原算法基础上优化了找出棋子的算法(直接使用Auto.js内置使用opencv实现的找色函数, 比原算法快很多)，但是在手机设备上找出跳跃位置的算法的效率还是不够理想

var press_coefficient = device.height == 1920 ? 1.392 : 2.099;    // 长按的时间系数，请自己根据实际情况调节

const under_game_score_y = 300     // 截图中刚好低于分数显示区域的 Y 坐标，300 是 1920x1080 的值，2K 屏、全面屏请根据实际情况修改
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

var w = device.width;
var h = device.height;

//使这些函数调用更方便
const red = colors.red;
const green = colors.green;
const blue = colors.blue;
const max = Math.max;
const abs = Math.abs;

//如果debug为true则开启调试，将会把每次计算的棋子位置和目标位置标记在截图中并保存在一下目录
const debug = false;
const debug_images_dir = "/sdcard/debug/";

prepare();
main();

function press_compat(x, y, duration){
    if(device.sdkInt >= 24){
        press(x, y, duration);
    }else{
        shell(util.format("input swipe %d %d %d %d %d", x, y, x, y, duration), true);
    }
}

function jump(distance){
    var press_time = distance * press_coefficient;
    press_time = max(200, press_time);
    press_compat(press_x, press_y, parseInt(press_time));
}

function find_piece_and_board(im){
    var piece = find_piece(im);
    if(!piece){
        return null;
    }
    var board = find_board(im, piece);
    return {
        piece: piece,
        board: board
    };
}

function find_board(im, piece){
    var board_x = 0;
    var board_y = 0;
    for(var i = parseInt(h / 3); i < parseInt(h * 2 / 3); i++){
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
    var board_y = piece.y - abs(board_x - piece.x) * Math.sqrt(3) / 3;

    if(!(board_x && board_y)){
        return null;
    }
    return {
        x: board_x, y: board_y
    }
}

function find_piece(im){
    //使用内置找色函数找出棋子最顶部的位置
    var piece_top = findColor(im, piece_color, {
        threshold: 3
    });
    if(!piece_top){
        return null;
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
    //棋子顶部中点位置
    var piece_top_center_x = (piece_start_x + piece_end_x) / 2;

    var piece_x = piece_top_center_x;
    var piece_y = piece_top.y + piece_dist_from_top_to_base;
    return {
        x: piece_x, y: piece_y
    }
}

function main(){
    toast("请在5秒内打开游戏，并点击开始按钮");
    waitForPackage("com.tencent.mm");
    sleep(5000);
    while(currentPackage() == "com.tencent.mm"){
        var im = captureScreen();
        // 获取棋子和 board 的位置
        var result = find_piece_and_board(im);
        if(!result){
            sleep(1000);
            continue;
        }
        var board = result.board;
        var piece = result.piece;
        log("find result: ", result);
        if(debug && result){
            save_result(im, result);
        }
        jump(Math.sqrt(Math.pow(board.x - piece.x, 2) + Math.pow(board.y - piece.y, 2)));
        sleep(2000);
    }
}



function prepare(){
    //确保无障碍服务开启
    auto();
    //请求截图权限
    requestScreenCapture();
    device.keepScreenOn(1000 * 3600);
    events.on("exit", function(){
        device.cancelKeepingAwake();
    });
    if(debug){
        files.ensureDir(debug_images_dir);
    }
    //从存储中读取系数
    var storage = storages.create("org.autojs.wxjumping");
    press_coefficient = storage.get("press_coefficient", press_coefficient);
    //让用户输入系数
    press_coefficient = dialogs.input("调整跳跃系数(可选)", press_coefficient);
    storage.put("press_coefficient", press_coefficient);
}

function save_result(im, result){
    importPackage(android.graphics);
    var bmp = im.getBitmap();
    var canvas = new Canvas(bmp);
    var paint = new Paint();
    paint.setStyle(Paint.Style.FILL);
    paint.setColor(colors.rgb(255, 0, 0));
    drawCircle(canvas, result.piece, paint);
    paint.setColor(colors.rgb(0, 255, 0));
    drawCircle(canvas, result.board, paint);
    var out = new java.io.FileOutputStream(files.join(debug_images_dir, new Date().getTime() + ".png"));
    bmp.compress(Bitmap.CompressFormat.PNG, 100, out);
}

function drawCircle(canvas, point, paint){
    canvas.drawCircle(point.x, point.y, 8, paint);
}
