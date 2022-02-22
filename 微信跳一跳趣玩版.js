/***************************************************** 
   由于腾讯利用间隔时间、屏幕按压位置、 分数与次数比，用时时长反外挂.
   首玩时如果“精准模式”不能跳到格子中心，需要点“参数”按钮进行跳跃系数调整
   参数调整精准后，建议用“精准模式”与“随机模式”混合玩；
   也可以“暂停”后手动与自动方式混合玩：
   比如难的机器玩，简单的手动玩以达到高分记录系统
 @author : 水木年华
 @QQ交流群 : 704991960
 @e-mail : world_window@126.com
 
*****************************************************/
function Config() {
	if (this instanceof Config) {
		this.config_dir = "/sdcard/Wechat/config/";
		this.debug_images_dir = "/sdcard/Wechat/images/";
		this.width = device.width;
		this.height = device.height;
		this.config = this.load();
	}else{
		return new Config();
	}
}

Config.prototype = {
	getScreenSize : function(){//得到屏幕分辨率
		if(this.width&&this.height){
			return this.height+"x"+this.width;
		}
		return "1920x1080";
	},
	load : function(){//加载配置文件参数信息
		let screen_size = this.getScreenSize();
		let path = this.config_dir+screen_size+"/config.json";
		let data = "";
		if(files.exists(this.config_dir)){
			if(files.exists(path)){
				data = files.read(path);
			}else{
				data = files.read(this.config_dir+"default.json");
			}
		}else{
			return this.defaultConfig(device.brand, device.model);
		}
		
		return JSON.parse(data);
	},
	defaultConfig: function(brand,model){
	    var product = brand+"_"+model;
	    var o = {"min_size":100};
		switch(product){
			case "honor_FRD-AL10":
				o["press_coefficient"] = 1.392;
				o["piece_body_width"] = 70;
				break;
			default :
				o["press_coefficient"] = 1.392;
				o["piece_body_width"] = 70;
		}
		return o;
	}
}

function Wechat(){
	Config.call(this);
	this.packageName = "com.tencent.mm";
	this.press_coefficient = this.config['press_coefficient'];
	this.piece_body_width = this.config['piece_body_width'];
	this.min_size = this.config['min_size']; //随机模式下的精准度（值越大越精准，被腾讯认为作弊的可能性就越大）
	this.scan_x_border_left = parseInt(this.width / 8);// 扫描棋子时的左边界
	this.scan_x_border_right = parseInt(this.width-this.scan_x_border_left);//扫描棋子时的右边界
	this.scan_y_border_top = parseInt(this.height / 3);//扫描棋子时的上边界
	this.scan_y_border_bottom = parseInt(this.height * 2 / 3);//扫描棋子时的下边界
	this.region = [20,50,this.width-20,this.height-50];//屏幕区域
	this.debug = false;
	this.rmode = false;
	this.pause = true;
	this.piece_color = "#3d3752";
	
	this.floaty = floaty.window(
	    <frame gravity="center">
		    <vertical>
		    	<linear>
		        	<button w="60" id="action1" text="开始" style="Widget.AppCompat.Button.Colored" />
		        	<button w="60" id="action2" text="结束"/>
		        	<button w="60" id="action3" text="参数"/>
		        	<button w="80" id="action4" text="精准模式"/>
		        </linear>
		        <linear>
		        	<text id="text1" textSize="16sp" textColor="#F44336"></text>
		        </linear>
		    </vertical>
	    </frame>
	);
	sleep(100);
	var that = this;
	if(this.floaty){
		this.floaty.action1.click(function(){
			ui.run(function(){
				if(!that.pause){
					that.floaty.action1.setText("开始");
					that.stop();
					console.log("程序暂停！");
				}else{
					that.floaty.action1.setText("暂停");
					that.start();
					console.log("程序开始！");
				}
		    });
		});
		
		this.floaty.action2.click(function(){
			console.log("程序结束！");
			that.floaty.close();
			exit();
		});
		
		this.floaty.action3.click(function(){
			if(!that.pause){
				that.floaty.action1.click();
				rawInput("调整跳跃系数：值越大，跳得越远", that.press_coefficient).then(v=>{
					that.press_coefficient = parseFloat(v);
					that.floaty.action1.click();
				});
			}else{
				rawInput("调整跳跃系数：值越大，跳得越远", that.press_coefficient).then(v=>{
					that.press_coefficient = parseFloat(v);
				});
			}
		});
		
		this.floaty.action4.click(function(){
			ui.run(function(){
				if(!that.pause){
					that.floaty.action1.click();
					if(that.rmode){
						that.rmode = false;
						that.floaty.action4.setText("精准模式");
					}else{
						that.rmode = true;
						that.floaty.action4.setText("随机模式");
					}
					that.floaty.action1.click();
				}else{
					if(that.rmode){
						that.rmode = false;
						that.floaty.action4.setText("精准模式");
					}else{
						that.rmode = true;
						that.floaty.action4.setText("随机模式");
					}
				}
		    });
		});
		
		if(that.floaty.text1){
			var screenResolution = "当前手机分辨率："+that.getScreenSize();
			ui.run(function(){
				that.floaty.text1.setText(screenResolution);
			});
		}
		
	}
	
}
Wechat.prototype = new Config();
Wechat.prototype.constructor = Wechat;
Wechat.prototype.main = function(){
	auto();//开启无障碍服务
	if(!requestScreenCapture()){//请求截图权限
		toast("请求截图失败!");
    	exit();
	}
	events.on("exit", function(){
        device.cancelKeepingAwake();
    });
    if(this.debug){
        if(!files.createWithDirs(this.debug_images_dir)){
        	var fileDir = new java.io.File(this.debug_images_dir);
        	fileDir.mkdirs();
        }
    }
    toast("请打开游戏，并点击 “开始”按钮");
	waitForPackage(this.packageName);
	this.play();
}

Wechat.prototype.play = function(){
	while(currentPackage() == this.packageName){
		if(!this.pause){
			var im = images.captureScreen();//截图
    		var result = this.find_piece_and_board(im);
    		if(this.debug && result){
	            this.save_result(im, result);
	        }
    		var board = result.board;
        	var piece = result.piece;
	        this.jump(Math.sqrt(Math.pow(board.x - piece.x, 2) + Math.pow(board.y - piece.y, 2)));
		}
		//生成1200－3700的随机数，对抗腾讯反外挂
		sleep(parseInt(Math.random()*2501+1200));
    	//exit();
	}
}

Wechat.prototype.start = function(){
	this.pause = false;
}

Wechat.prototype.stop = function(){
	this.pause = true;
}

Wechat.prototype.find_piece_and_board = function(im){
	var piece = this.find_piece(im);
	var board = this.find_board(im,piece);
	//console.log(piece.x+","+piece.y+" : "+board.x+","+board.y);
	return {
        piece: piece,
        board: board
    };
}

Wechat.prototype.find_piece = function(im){
	//使用内置找色函数找出棋子最顶部的位置
	var piece_top = images.findColor(im, this.piece_color, {
	    region:this.region,
        threshold:3
    });
    if(!piece_top){
    	toast("您没有打开游戏，程序退出");
    	exit();
    }

    var piece_start_x = -1;
	var piece_end_x = -1;
	//遍历该行找出棋子顶部中点位置
    for(var x = this.scan_x_border_left; x < this.scan_x_border_right; x++){
        var is_piece = images.detectsColor(im, this.piece_color, x, piece_top.y, 2, "diff");
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
    var piece_y = piece_top.y + 188;//棋子底部位置，188棋子高度
    return {
        x: parseInt(piece_x), y: parseInt(piece_y)
    }
}

Wechat.prototype.find_board = function(im, piece){
	const max = Math.max;
	const abs = Math.abs;
	const red = colors.red;
	const green = colors.green;
	const blue = colors.blue;
	var board_x = 0;
	var board_y = 0;
	var last_pixel = null;
	
	for(var i = this.scan_y_border_top; i < this.scan_y_border_bottom; i++){
        last_pixel = im.pixel(this.scan_x_border_left, i);
        var board_x_sum = 0;
        var board_x_c = 0;

        for(var j = this.scan_x_border_left; j < this.scan_x_border_right; j++){
            var pixel = im.pixel(j, i);
            // 修掉脑袋比下一个小格子还高的情况的 bug
            if(abs(j - piece.x) < this.piece_body_width){
                continue;
            }

            //利用色差，找到屏幕最上面一个格子的顶点
            if(abs(red(pixel) - red(last_pixel)) + abs(blue(pixel) - blue(last_pixel)) + abs(green(pixel) - green(last_pixel)) > 10){
                board_x_sum += j;
                board_x_c += 1;
            }
        }
        if(board_x_sum>0){
        	//取得顶点中值
            board_x = board_x_sum / board_x_c;
            board_y = i;
            break;
        }
    }
	last_pixel = im.pixel(board_x, board_y+2);//记录下顶点的像素
	//this.save_result(im ,{piece:{x:board_x,y:piece.y},board:{x:board_x,y:board_y}});
	var color = "#"+colors.toString(last_pixel).substring(3);//获取像素rgb值(#FF7711)
	var k = 0;
	//从直角三角型直角顶点向上找到色差最近值做为格子底部
    for(k=piece.y;k>board_y;k--){
		if(images.detectsColor(im, color, board_x, k, 2)){
			break;
		}
    }
    //this.save_result(im ,{piece:{x:board_x,y:board_y},board:{x:board_x,y:k}});
    var center = parseInt((board_y+k) / 2);//取格子中心点
    if(!this.rmode){
    	board_y = center;
    }else{
    	//随机模式下，设置偏移差对抗腾讯反外挂
    	var item = [20,-20,21,-21,22,-22,23,-23,24,-24,25,-25,26,-26];
    	var offset_board_y = center+item[Math.floor(Math.random()*item.length)];
    	var offset_board_x = parseInt(board_x)+item[Math.floor(Math.random()*item.length)];
    	//var pixel = im.pixel(offset_board_x, offset_board_y);
    	var min_size = abs(k-board_y);
    	if(!images.detectsColor(im, color, offset_board_x, offset_board_y, 0)||min_size<parseInt(this.min_size)){
    		if(min_size<30){
	    		board_y = center + 30;
	    	}else{
	    		board_y = center;
	    	}
    	}else{
    		board_y = offset_board_y;
    		board_x = offset_board_x;
    	}
    }
	
    return {
        x: parseInt(board_x), y: parseInt(board_y)
    }
}

Wechat.prototype.save_result = function(im, result){
	//生成调试图
	importPackage(android.graphics);
    var bmp = im.getBitmap();
    var canvas = new Canvas(bmp);
    var paint = new Paint();
    paint.setStyle(Paint.Style.FILL);
    paint.setColor(colors.rgb(255, 0, 0));
    canvas.drawCircle(result.piece.x, result.piece.y, 8, paint);
    paint.setColor(colors.rgb(0, 0, 255));
    canvas.drawCircle(result.board.x, result.board.y, 8, paint);
    paint.setColor(colors.rgb(0, 255, 0));
    paint.setStrokeWidth(5);
    canvas.drawLine(result.piece.x, result.piece.y, result.board.x, result.board.y, paint);
    var out = new java.io.FileOutputStream(files.join(this.debug_images_dir, new Date().getTime() + ".png"));
    bmp.compress(Bitmap.CompressFormat.PNG, 100, out);
}

Wechat.prototype.jump = function(distance){
	var press_time = Math.abs(distance) * this.press_coefficient;
    press_time = parseInt(Math.max(200, press_time));
    //对抗腾讯反外挂
    var xa = this.scan_x_border_right - this.scan_x_border_left;
    var ya = this.scan_y_border_bottom - this.scan_y_border_top;
	var x = parseInt(Math.random()*xa+this.scan_x_border_left);
	var y = parseInt(Math.random()*ya+this.scan_y_border_top);
    //执行Android按压屏幕指令
    if(device.sdkInt >= 24){
    	//Android 7.0以上调用新的API
    	//swipe(x, y, x, y, press_time);
    	press(x, y, press_time);
    }else{
    	shell(util.format("input swipe %d %d %d %d %d", x, y, x, y, press_time), true);
    }
}

var wechat = new Wechat();
wechat.main();
