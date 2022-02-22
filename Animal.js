//餐厅颜色
const BG_COLOR_RESTAURANT = '#ffccb07c';
//花园颜色
const BG_COLOR_GARDEN = '#ffcfc169';
//厨房颜色
const BG_COLOR_KITCHEN = '#ffd3c088';
//提示确认颜色
const BG_COLOR_NOTICE = '#ffffd055';
//小费提示颜色
const BG_COLOR_GRATUITY = '#fff9f5e8';
//任务提示颜色
const BG_COLOR_TASK_NOTICE = "#ffd96a28";
//菜单被覆盖颜色
const BG_COLOR_MENU_COVER = '#ff876e2d';
//双倍按钮->直接领取
const BG_COLOR_DOUBLE_NO = '#ffe9d2bf';
//歌手颜色
const BG_COLOR_SINGER = '#ffe89781';
//订单完成颜色
const BG_COLOR_ORDER_COMPLETE = '#ffa0bf7c';
//对话框颜色
const BG_COLOR_TALK = '#ffdd765a';
//种植花朵按钮颜色
const BG_COLOR_FLOWER_CULTIVATE = '#ffe2c36a';
//花1颜色
const BG_COLOR_FLOWER_1 = '#fff9f4e7';
//花2颜色
const BG_COLOR_FLOWER_2 = '#ffe7a72f';
//花3颜色
const BG_COLOR_FLOWER_3 = '#ffc56d3a';
//花4颜色
const BG_COLOR_FLOWER_4 = '#ff9d73cd';
//宣传按钮颜色
const BG_COLOR_PROPAGANDA = '#ffdaa238';
//星星颜色
const BG_COLOR_START = '#ffdba141';
//星星被覆盖颜色
const BG_COLOR_START_COVER = "#ff745522";
//切页按钮颜色
const BG_COLOR_SWITCH_BTN = "#ffd5b3aa";
//小鱼颜色
const BG_COLOR_FISH = "#ff929292";
//白色
const BG_COLOR_WHITE = '#ffffffff';
//黑色
const BG_COLOR_BLACK = '#000000';
//扑克颜色
const BG_COLOR_POKER = '#ff57a7b5';
//广告按钮颜色
const BG_COLOR_ADV_BTN = '#ff1aad19';

//手指1,2,3
const FINGER_1 = 1;
const FINGER_2 = 2;
const FINGER_3 = 3;

//按钮点击时间
const TIME_BTN_CLICK = 200;
//弹窗时间
const TIME_SHOW_CONFIRM = 800;
//广告播放时间
const TIME_ADV_LOCK = 1000*20;

var Animal = function(){
    //当前所在页面颜色
    this.current_bg_color = '';
    //脚本运行状态
    this.is_run = false;
    //页面切换状态
    this.switch_page_status = false;
    //RootAutomator 手势处理对象
    this.ra = null;
    //范围颜色比对
    this.isColorRegion = (x,y,w,h,color,success,fail) =>{
        var img = captureScreen();
        var point = null;
        //数组处理
        if(color.constructor == Array){
            for(color_index of color){
                point = images.findColor(img, color_index, {region: [x, y, w, h]});
            }
        }
        //字符串处理
        if(color.constructor == String){
            point = images.findColor(img, color, {region: [x, y, w, h]});
        }
        if(point != null){
            if(success != undefined){
                success.call(this,point);
            }
            return true;
        }else{
            if(fail != undefined){
                fail.call(this);
            }
            return false;
        }
    };
    //检查颜色是否匹配
    this.isColor = (x,y,color,success,fail) => {
        var img = captureScreen();
        var findColor = images.pixel(img, x, y);
        var check = false;
        //数组处理
        if(color.constructor == Array){
            for(color_index of color){
                if(colors.isSimilar(colors.toString(findColor),color_index)){
                    check = true;
                }
            }
        }
        //字符串处理
        if(color.constructor == String){
            check = colors.isSimilar(colors.toString(findColor),color);
        }
        //回调函数处理
        if(check){
            if(success != undefined){
                success.call(this);
            }
            return true;
        }else{
            if(fail != undefined){
                fail.call(this);
            }
            return false;
        }
    }
    //创建测试点
    this.createTestDot = function(x,y){
        var dot = floaty.rawWindow(
            <frame h="*" w="*">
                <button h="2" w="2" id="dot" rotation="45" text="" bg="#FF3030" />
            </frame>
        );
        //设置悬浮窗位置
        dot.setPosition(x, y);
        //5秒后移除
        setTimeout(() => {
            dot.close();
        }, 5000);
    }
    //创建一个正方形
    this.createTestSquare = (x, y, w, h) => {
        var square = floaty.rawWindow(
            <frame h="*" w="*" bg="#FF3030" alpha="0.2"></frame>
        );
        square.setSize(w,h);
        //设置悬浮窗位置
        square.setPosition(x, y);
        //5秒后移除
        setTimeout(() => {
            square.close();
        }, 5000);
    };
    //测试颜色显示(需要截图)
    this.showTestColor = (x, y) => {
        var img = captureScreen();
        var color = images.pixel(img, x, y);
        dialogs.build({
            title: colors.toString(color)
        }).show();
    }
    //获取当前点击位置
    this.getCurrentClickPos = function(){
        var $this = this;
        toast("进入屏幕点击监听事件");
        events.observeTouch();
        //注册触摸监听器
        events.onTouch(function(p){
            //触摸事件发生时, 打印出触摸的点的坐标
            toast("当前点击位置:"+p.x + "," + p.y);
            $this.createTestDot(p.x, p.y);
        });
        
    }
    //点击左边切换按钮
    this.clickLeft = (success) => {
        var isOk = this.isColorRegion(25,1051,50,70,BG_COLOR_SWITCH_BTN,function(point){
            this.ra.press(point.x, point.y,TIME_BTN_CLICK,FINGER_2);
        });
        if(isOk){
            toast("找到了左边按钮&点击了")
            sleep(TIME_SHOW_CONFIRM);
            success.call(this);
        }else{
            toast("没有找到左边按钮")
        }
        return isOk;
    }
    //点击右边切换按钮
    this.clickRight = (success) => {
        var isOk = this.isColorRegion(998,1051,50,70,BG_COLOR_SWITCH_BTN,function(point){
            this.ra.press(point.x, point.y,TIME_BTN_CLICK,FINGER_2);
        });
        if(isOk){
            toast("找到了右边边按钮&点击了")
            sleep(TIME_SHOW_CONFIRM);
            success.call(this);
        }else{
            toast("没有找到右边边按钮")
        }
        return isOk;
    }
    //切换页面
    this.switchPage = function(target){
        toast("滑动页面 -> "+target);
        //当前页为花园
        if(this.current_bg_color == BG_COLOR_GARDEN){
            switch(target){
                case BG_COLOR_KITCHEN:
                        if(this.clickRight(this.isRestaurant)){
                            this.clickRight(this.iskitchen);
                        }
                    break;
                case BG_COLOR_RESTAURANT:
                        this.clickRight(this.isRestaurant);
                    break;    
                default:
                    break;    
            }
        }else if(this.current_bg_color == BG_COLOR_KITCHEN){
            //当前页为厨房
            switch(target){
                case BG_COLOR_GARDEN:
                        if(this.clickLeft(this.isRestaurant)){
                            this.clickLeft(this.isGarden);
                        }
                    break;
                case BG_COLOR_RESTAURANT:
                        this.clickLeft(this.isRestaurant);
                    break;   
                default:
                    break;    
            }
        }else if(this.current_bg_color == BG_COLOR_RESTAURANT){
            //当前页为餐厅
            switch(target){
                case BG_COLOR_GARDEN:
                        this.clickLeft(this.isGarden);
                    break;
                case BG_COLOR_KITCHEN:
                        this.clickRight(this.iskitchen);
                    break;   
                default:
                    break;    
            }
        }
    }
    //检查餐厅颜色是否匹配
    this.isRestaurant = () => {
        toast("检测是否是餐厅");
        return this.isColor(device.width-500, device.height/7,BG_COLOR_RESTAURANT, function(){
            this.current_bg_color = BG_COLOR_RESTAURANT;
        });
    }
    //检查花园颜色是否匹配
    this.isGarden = () => {
        toast("检测是否是花园");
        return this.isColor(device.width-100, 150,BG_COLOR_GARDEN, function(){
            this.current_bg_color = BG_COLOR_GARDEN;
        });
    }
    //检查厨房颜色是否匹配
    this.iskitchen = () => {
        toast("检测是否是厨房");
        return this.isColor(device.width/2, 480,BG_COLOR_KITCHEN, function(){
            this.current_bg_color = BG_COLOR_KITCHEN;
        });
    }
    //检查花园金钱
    this.checkGardenMoney = () => {
        // //花园星星1
        // this.createTestSquare(470,501,100,100);
        this.isColorRegion(470,501,100,100,BG_COLOR_START,function(point){
            this.ra.press(point.x, point.y,TIME_BTN_CLICK, FINGER_2);
        });
        // //花园星星2
        // this.createTestSquare(655,501,100,100);
        this.isColorRegion(655,501,100,100,BG_COLOR_START,function(point){
            this.ra.press(point.x, point.y,TIME_BTN_CLICK, FINGER_2);
        });
        // //花园星星3
        // this.createTestSquare(840,525,100,100);
        this.isColorRegion(840,525,100,100,BG_COLOR_START,function(point){
            this.ra.press(point.x, point.y,TIME_BTN_CLICK, FINGER_2);
        });

        // //花园鱼1
        // this.createTestSquare(10,550,120,100);
        this.isColorRegion(10,550,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        // //花园鱼2
        // this.createTestSquare(681,455,120,100);
        this.isColorRegion(681,455,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
    }
    this.checkkitchenMoney = () => {
        //厨房鱼1
        //this.createTestSquare(36,638,120,100);
        this.isColorRegion(36,638,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK,FINGER_2);
        });
        //厨房鱼2
        //this.createTestSquare(855,730,120,70);
        this.isColorRegion(855,730,120,70,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK,FINGER_2);
        });
        //厨房鱼3
        //this.createTestSquare(814,783,120,100);
        this.isColorRegion(814,783,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK,FINGER_2);
        });
        //厨房鱼4
        //this.createTestSquare(390,1600,120,100);
        this.isColorRegion(390,1600,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK,FINGER_2);
        });
    }
    this.checkRestaurantMoney = () => {
        //检查点菜
        //this.createTestSquare(330,750,120,100);
        this.isColorRegion(330,750,120,100,BG_COLOR_GRATUITY,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        //this.createTestSquare(600,750,120,100);
        this.isColorRegion(600,750,120,100,BG_COLOR_GRATUITY,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        //this.createTestSquare(870,750,120,100);
        this.isColorRegion(870,750,120,100,BG_COLOR_GRATUITY,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        //this.createTestSquare(330,1110,120,100);
        this.isColorRegion(330,1110,120,100,BG_COLOR_GRATUITY,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        //this.createTestSquare(600,1110,120,100);
        this.isColorRegion(600,1110,120,100,BG_COLOR_GRATUITY,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        //this.createTestSquare(870,1110,120,100);
        this.isColorRegion(870,1110,120,100,BG_COLOR_GRATUITY,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
         // //餐厅鱼1
        // this.createTestSquare(65,826,120,100);
        this.isColorRegion(65,826,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        // //餐厅鱼2
        // this.createTestSquare(390,920,120,100);
        this.isColorRegion(390,920,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        // //餐厅鱼3
        // this.createTestSquare(657,920,120,100);
        this.isColorRegion(657,920,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        // //餐厅鱼4
        // this.createTestSquare(930,920,120,100);
        this.isColorRegion(930,920,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        // //餐厅鱼5
        // this.createTestSquare(390,1259,120,100);
        this.isColorRegion(390,1259,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        // //餐厅鱼6
        // this.createTestSquare(657,1259,120,100);
        this.isColorRegion(657,1259,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        // //餐厅鱼7
        // this.createTestSquare(930,1259,120,100);
        this.isColorRegion(930,1259,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        // //餐厅鱼7
        // this.createTestSquare(385,1557,120,100);
        this.isColorRegion(385,1557,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
        // //餐厅鱼8
        // this.createTestSquare(410,1790,120,100);
        this.isColorRegion(410,1790,120,100,BG_COLOR_FISH,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
    }
    //检查花朵展示
    this.checkFlowerShow = () => {
        toast('检查花朵展示情况');
        sleep(TIME_SHOW_CONFIRM);
        //检查flower1
        this.isColorRegion(420,940,100,100,BG_COLOR_FLOWER_1,function(point){
            this.ra.press(point.x,point.y, TIME_BTN_CLICK, FINGER_2);
        });
        // //检查flower2
        this.isColorRegion(device.width-185,958,100,100,BG_COLOR_FLOWER_2,function(point){
            this.ra.press(point.x,point.y, TIME_BTN_CLICK, FINGER_2);
        });
        // //检查flower3
        this.isColorRegion(420,1258,100,100,BG_COLOR_FLOWER_3,function(point){
            this.ra.press(point.x,point.y, TIME_BTN_CLICK, FINGER_2);
        });
        // //检查flower4
        this.isColorRegion(device.width-185,1270,100,100,BG_COLOR_FLOWER_4,function(point){
            this.ra.press(point.x,point.y, TIME_BTN_CLICK, FINGER_2);
        });
    }
    //检查花朵是否成熟
    this.checkFlowerIsRipe = () => {
        toast('检查花朵成熟情况');
        // //花园成熟1
        //this.createTestSquare(210,927,120,120);
        this.isColorRegion(210,927,120,120,BG_COLOR_FLOWER_1,function(point){
            this.ra.press(point.x, point.y,TIME_BTN_CLICK,FINGER_2);
        });
        // //花园成熟2
        //this.createTestSquare(670,927,120,120);
        this.isColorRegion(670,927,120,120,BG_COLOR_FLOWER_2,function(point){
            this.ra.press(point.x, point.y,TIME_BTN_CLICK,FINGER_2);
        });
        // //花园成熟3
        //this.createTestSquare(210,1240,120,120);
        this.isColorRegion(210,1240,120,120,BG_COLOR_FLOWER_3,function(point){
            this.ra.press(point.x, point.y,TIME_BTN_CLICK,FINGER_2);
        });
        // //花园成熟4
        //this.createTestSquare(670,1240,120,120);
        this.isColorRegion(670,1240,120,120,BG_COLOR_FLOWER_4,function(point){
            this.ra.press(point.x, point.y,TIME_BTN_CLICK,FINGER_2);
        });
    }
    //检查花朵栽种
    this.checkFlowerCultivate = () => {
        toast('检查花朵种植情况');
        // //花园种植1
        // this.createTestSquare(365,801,100,100);
        this.isColorRegion(365,801,100,100,BG_COLOR_FLOWER_CULTIVATE,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
            //检查对话框
            this.checkNotice();
        });
        // //花园种植2
        // this.createTestSquare(845,801,100,100);
        this.isColorRegion(845,801,100,100,BG_COLOR_FLOWER_CULTIVATE,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
            //检查对话框
            this.checkNotice();
        });
        // //花园种植3
        // this.createTestSquare(365,1110,100,100);
        this.isColorRegion(365,1110,100,100,BG_COLOR_FLOWER_CULTIVATE,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
            //检查对话框
            this.checkNotice();
        });
        // //花园种植4
        // this.createTestSquare(845,1110,100,100);
        this.isColorRegion(845,1110,100,100,BG_COLOR_FLOWER_CULTIVATE,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
            //检查对话框
            this.checkNotice();
        });
    }
    //检查Double提示
    this.checkDoubleNotice = (isDouble) => {
        toast("检测double&点击");
        sleep(TIME_SHOW_CONFIRM);
        //小费双倍
        // this.createTestSquare(700,1310,100,100);
        //小费直接领取,颜色:#ffe9d2bf
        // this.createTestSquare(275,1310,100,100);
        if(!isDouble){
            return this.isColorRegion(275,1310,100,100,BG_COLOR_DOUBLE_NO,function(point){
                this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
            });
        }else{
            return this.isColorRegion(700,1310,100,100,BG_COLOR_NOTICE,function(point){
                this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
            });
        }
    }
    //检查小费
    this.checkGratuity = (isGet) => {
        toast("检测小费&点击");
        //餐厅小费
        //this.createTestSquare(407,665,50,50);
        return this.isColorRegion(407,665,50,50,BG_COLOR_FISH,function(point){
            if(isGet){
                this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
                this.checkDoubleNotice(true);
            }
        });
    }
    //检查任务
    this.checkTask = () => {
        // this.createTestSquare(30,735,device.width-60,800);
        return this.isColorRegion(30,735,device.width-60,800,BG_COLOR_TASK_NOTICE,function(point){
            this.ra.press(point.x, point.y+120, TIME_BTN_CLICK, FINGER_2);
            sleep(TIME_SHOW_CONFIRM);
            this.checkOrder();
        });
    }
    //检查邮递员
    this.checkPostman = (isClick) =>{

    }
    //检查老千
    this.checkSwindler = (isGamble,pos) =>{
        toast("检查老千")
        //赌博,提示位置 颜色:#ffd96a28
        //this.createTestSquare(380,635,30,80);
        this.isColorRegion(380,635,30,80,BG_COLOR_TASK_NOTICE,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
            sleep(TIME_SHOW_CONFIRM);
        });
        //检查对话
        this.isColorRegion(975,1900,70,70,BG_COLOR_TALK,function(point){
            this.ra.press(130, 1890, TIME_BTN_CLICK, FINGER_2);
            sleep(TIME_SHOW_CONFIRM);
        });
        if(!isGamble){
            //不赌
            this.isColorRegion(320,1875,100,100,BG_COLOR_DOUBLE_NO,function(point){
                this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
            });
        }else{
            //赌
            this.isColorRegion(705,1820,100,100,BG_COLOR_FISH,function(point){
                this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
                sleep(TIME_SHOW_CONFIRM);
            });
            if(pos == undefined)pos = 1;
            if(pos == 1){
                //this.createTestSquare(220,780,50,60);
                this.isColorRegion(220,780,50,60,BG_COLOR_POKER,function(point){
                    this.ra.press(point.x, point.y, TIME_BTN_CLICK,FINGER_2);
                });
            }else if(pos == 2){
                //this.createTestSquare(520,780,50,60);
                this.isColorRegion(520,780,50,60,BG_COLOR_POKER,function(point){
                    this.ra.press(point.x, point.y, TIME_BTN_CLICK,FINGER_2);
                });
            }else if(pos == 3){
                //this.createTestSquare(815,780,50,60);
                this.isColorRegion(815,780,50,60,BG_COLOR_POKER,function(point){
                    this.ra.press(point.x, point.y, TIME_BTN_CLICK,FINGER_2);
                });
            }
        }
    }
    //检查广告并关闭
    this.checkAdv = () => {
        toast("检查广告");
        //this.createTestSquare(825,70,30,30);
        this.isColorRegion(825,70,30,30,BG_COLOR_WHITE,function(point){
            if(!this.checkStart()){
                // 检查广告时间是否完结 this.createTestSquare(240,72,80,40);
                if(!this.isColorRegion(240,72,80,40,BG_COLOR_WHITE) || this.isColorRegion(340,1675,100,100,BG_COLOR_ADV_BTN)){
                    toast("广告已完结");
                    this.ra.press(point.x+120,point.y+15,TIME_BTN_CLICK,FINGER_2);
                }else{
                    toast("广告未完结")
                }
            }
        });
        sleep(1000);
    }
    //检查顶部星星
    this.checkStart = () => {
        if(this.isColorRegion(28,208,53,70,BG_COLOR_START)){
            return true;
        }
        if(this.isColorRegion(28,208,53,70,BG_COLOR_START_COVER)){
            return true;
        }
        return false;
    }
    //检查对话
    this.checkTalk = () => {
        toast("检测对话&点击");
        sleep(TIME_SHOW_CONFIRM);
        //对话确认
        //this.createTestSquare(950,1830,70,70);
        //对话跳过
        // this.createTestDot(130,1890);
        this.isColorRegion(950,1830,70,70,BG_COLOR_TALK,function(point){
            this.ra.press(130, 1890, TIME_BTN_CLICK, FINGER_2);
        });
    }
    //检查分享按钮
    this.checkShare = () => {
        toast("检测分享&点击");
        //新客人分享
        // this.createTestSquare(775,1395,100,80);
        return this.isColorRegion(775,1395,100,80,BG_COLOR_NOTICE,function(point){
            this.ra.press(device.width-20, device.height-720, TIME_BTN_CLICK, FINGER_2);
        });
    }
    //检查宣传按钮
    this.checkPropaganda = () => {
        return this.isColorRegion(905,1938,100,100,BG_COLOR_PROPAGANDA);
    }
    //任务按钮
    this.checkTaskBtn = (isGet) => {
        //this.createTestSquare(515,1918,160,190)
        if(isGet){
            //this.createTestSquare(515,1918,160,190)
            this.isColorRegion(515,1918,160,190,BG_COLOR_TASK_NOTICE,function(point){
                this.ra.press(point.x, point.y,TIME_BTN_CLICK,FINGER_2);
            });
        }
    }
    //宣传X15按钮
    this.checkPropagandaBtn = (isLook) => {
        toast("宣传X15")
        if(isLook){
            //this.createTestSquare(690,1918,160,190)
            this.isColorRegion(690,1918,160,190,BG_COLOR_TASK_NOTICE,function(point){
                this.ra.press(point.x, point.y+150,TIME_BTN_CLICK,FINGER_2);
                sleep(TIME_SHOW_CONFIRM);
                this.checkNotice();
                sleep(TIME_ADV_LOCK);
                this.checkAdv();
            });
        }
    }
    //检查订单
    this.checkOrder = () => {
        toast("检测订单&点击");
        //任务完成位置
        // this.createTestSquare(775,1335,100,100);
        return this.isColorRegion(775,1335,100,100,BG_COLOR_NOTICE,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
            this.checkTalk();
        });
    }
    //检查歌手
    this.checkSinger = (isGet) => {
        toast("检测歌手&点击");
        //餐厅歌手 ok
        //this.createTestSquare(795,550,130,250);
        return this.isColorRegion(795,550,130,250,BG_COLOR_SINGER,function(point){
            if(isGet){
                for(var i=0;i<20;i++){
                    this.ra.press(point.x, point.y,TIME_BTN_CLICK,FINGER_2);
                }
            }
        });
    };
    //检查提示窗口&并关闭
    this.checkNotice = () => {
        toast("检查窗口提示&关闭");
        sleep(TIME_SHOW_CONFIRM);
         //超时一小时
        //this.createTestSquare(500,1315,100,100);
        return this.isColorRegion(500,1315,100,100,BG_COLOR_NOTICE,function(point){
            this.ra.press(point.x, point.y, TIME_BTN_CLICK, FINGER_2);
        });
    }
    this.clickPropaganda = (number) => {
        toast("点击宣传按钮");
        for(var i = 0;i<number;i++){
            //检查宣传按钮
            if(!this.checkPropaganda()){
                toast("宣传按钮不存在了");
                sleep(1000);
                continue;
            }
            this.ra.press(device.width-150, device.height-170,5000,FINGER_2);
        }
    }
    this.workStart = function(){
        var $this = this;       
        threads.start(function(){
            //在新线程执行的代码
            while(true){
                //检查广告
                $this.checkAdv();
                //检查游戏界面
                if(!$this.checkStart()){
                    toast("游戏退出了");
                    sleep(1000*10);
                    continue;
                }
                //检查弹窗
                $this.checkNotice();
                //检查分享按钮
                $this.checkShare();
                //检查订单
                $this.checkOrder();
                //检查对话
                $this.checkTalk();
                //检查赌博
                $this.checkSwindler(true,3);
                //餐厅
                if($this.isRestaurant()){
                    //检查任务
                    $this.checkTask();
                    //检查金钱
                    $this.checkRestaurantMoney();
                    //检查小费&点击
                    $this.checkGratuity(true);
                    //检查歌手
                    $this.checkSinger(true);
                    //宣传
                    $this.clickPropaganda(3);
                    //切换页面到花园
                    $this.switchPage(BG_COLOR_KITCHEN);
                }else if($this.isGarden()){ //花园
                    //检测花园金钱
                    $this.checkGardenMoney();
                    //检查花朵是否成熟
                    $this.checkFlowerIsRipe();
                    //检查花朵是否展示
                    $this.checkFlowerShow();
                    //检查是否需要种植花朵
                    $this.checkFlowerCultivate();
                    //宣传
                    $this.clickPropaganda(3);
                    //宣传X15
                    $this.checkPropagandaBtn(true);
                    //切换页面到餐厅
                    $this.switchPage(BG_COLOR_RESTAURANT);
                }else if($this.iskitchen()){ //厨房
                    $this.checkkitchenMoney();
                    //宣传
                    $this.clickPropaganda(3);
                    //切换到花园
                    $this.switchPage(BG_COLOR_GARDEN);
                }
            }
        });
    }
    //音量UP按下
    this.volumeUp = function(event){
        if(!this.is_run){
            if(this.checkStart()){
                this.ra = new RootAutomator();
                toast("脚本开始运行了");
                this.is_run = true;
                this.workStart();
            }else{
                toast("请先打开动物餐厅");
            }
        }else{
            toast("脚本已经在运行了.");
        }
    }
    //音量DOWN按下
    this.volumeDown = function(event){
        if(this.is_run){
            toast("脚本停止运行了");
            //改变状态为close
            this.is_run = false;
            //关闭所有子进程
            threads.shutDownAll();
            //移除屏幕点击监听事件
            events.removeAllTouchListeners();
            //清除当前页面
            this.current_bg_color = "";
            //RootAutomator 停止
        }else{
            toast("脚本不在运行状态");
        }
    }
    //程序初始化
    this.initEvents = function(){
        if(!requestScreenCapture(false)){
            toast("获取截图权限失败,中断操作");
            exit();
        }
        //屏蔽原音量键功能
        events.setKeyInterceptionEnabled("volume_up", true);
        events.setKeyInterceptionEnabled("volume_down", true);
        //启用按键监听
        events.observeKey();
        //监听音量上键按下
        events.onKeyDown("volume_up", this.volumeUp.bind(this));
        //监听音量下键按下
        events.onKeyDown("volume_down", this.volumeDown.bind(this));
        //设置屏幕适配
        setScreenMetrics(1080, 2160);
        // sleep(3000);
    }
}
var animal = new Animal();
animal.initEvents();
