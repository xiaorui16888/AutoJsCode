/**
 * 作者: 日涨半斤的胖子
 * 时间: 2018-01-02
 * 手机: huawei P10 Plus
 * 系统: Android 7.0 EMUI 5.1
 * 支付宝: 10.1.52 // 支付宝版本不一样很可能发生异常哦！
 * 无障碍模式: 打开
 * 截屏权限: 打开
 * Auto.js: Version 4.1.0 Alpha5
 * VSCode: 1.30.1
 * 本软件版本: v1.0.0
 * 备注: 本软件不得用于商业用途,仅做学习交流
 * 联系方式: 296170342@qq.com
 */

var RET_SUCCES = 0;
var RET_FAILED = -1;
var RET_ERR_AUTO_FAIED = -2;
var RET_ERR_GET_SCREENSHOT_PRI_FAILED = -3;
var RET_ERR_INVALID_TIME_INTERVAL = -4;
var RET_ERR_INVALID_RETRY_TIMES = -5;
var RET_ERR_ENTER_FOREST_FAILED = -6;
var ERR_RET_GET_CAPTURE_SCREEN_FAILED = -7;

var RET_ERR_INVALID_ENERGY_NUM = -10;
var RET_ERR_OVER_MAX_COLLECT_TIMES = -11;
var RET_ERR_NOT_FIND_LOOPUP_MORE_FRIEND = -12;
var RET_ERR_ENTER_FRIEND_RANKING_LIST_FAILED = -13;

var RET_ERR_INVALID_MAX_FRIEND_NUM = -30;
var RET_ERR_NOT_FIND_RANK_LIST_MORE_IN_FRIEND_RANKING_LIST = -31; 
var RET_ERR_OVER_MAX_LOOKUP_MORE_CLICK_TIMES = -32;

var debug_flag = 1;

/* (取消)多行注释 Alt + Shitf + A */
// 单行注释 Ctrl + / 或者 Ctrl + k + c
// 取消单行注释 Ctrl + k + u

/* 可变参数不知道怎么写的，稍后补充 */
function DUMP_OUT_ERR (format)
{
    sleep(100);
    console.error(format);
}
function DUMP_OUT_VERBOSE (format)
{
    sleep(100);
    console.verbose(format);
}
function DUMP_OUT_WARNING (format)
{
    sleep(100);
    console.warn(format);
}

function DUMP_OUT_DEBUG (format)
{
    if (debug_flag)
    {
        sleep(100);
        console.log(format);
    }
}


function anti_forest_err_return(err)
{
    switch(err)
    {
        case RET_SUCCES:
            return RET_SUCCES;
        case RET_FAILED:
            DUMP_OUT_ERR("返回失败!");
            break;
        case RET_ERR_AUTO_FAIED:
            DUMP_OUT_ERR("\"无障碍服务\"开启失败!");
            break;
        case RET_ERR_GET_SCREENSHOT_PRI_FAILED:
            DUMP_OUT_ERR("请求截图失败");
            break;
        case RET_ERR_INVALID_TIME_INTERVAL:
            DUMP_OUT_ERR("Wait for anti forest open retry time interval set error!");
            break;
        case RET_ERR_INVALID_RETRY_TIMES:
            DUMP_OUT_ERR("Wait for anti forest open retry times set error!");
            break;
        case RET_ERR_ENTER_FOREST_FAILED:
            DUMP_OUT_ERR("\"蚂蚁森林\"打开失败!");
            break;
        case ERR_RET_GET_CAPTURE_SCREEN_FAILED:
            DUMP_OUT_ERR("\"截屏\"获取失败!");
            break;
        case RET_ERR_OVER_MAX_COLLECT_TIMES:
            DUMP_OUT_ERR("收集能量次数超过上限");
            break;
        case RET_ERR_NOT_FIND_LOOPUP_MORE_FRIEND:
            DUMP_OUT_ERR("\"查看更多好友\"未找到!");
            break;
        case RET_ERR_ENTER_FRIEND_RANKING_LIST_FAILED:
            DUMP_OUT_ERR("\"好友排行榜\"进入失败!");
            break;
        case RET_ERR_INVALID_MAX_FRIEND_NUM:
            DUMP_OUT_ERR("\"最大好友数\"输入错误!");
            break;
        case RET_ERR_NOT_FIND_RANK_LIST_MORE_IN_FRIEND_RANKING_LIST:
            DUMP_OUT_ERR("\"好友排行榜\"中\"查看更多\"不存在!");
            break;
        case RET_ERR_OVER_MAX_LOOKUP_MORE_CLICK_TIMES:
            DUMP_OUT_ERR("\"好友排行榜\"下拉次数超过上限!");
            break;
        default:
            err_str = "Unknown error: " + err;
            DUMP_OUT_ERR(err_str);
            break;
    }
    return err;
}

function debug_test(flag)
{
    if (flag)
    {
        err_str = "Test True: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + flag;
        DUMP_OUT_ERR(err_str);
    }
    else
    {
        err_str = "Test False: !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!" + flag;
        DUMP_OUT_ERR(err_str);
    }
}

// 随机点击
function random_click(rect)
{
    var debug_str = null;
    var width = rect.width();
    var height = rect.height();

    var x = rect.left;
    var y = rect.top;
    var press_time = random(50,300);
    if (width > 20)
    {
        x += random(width / 4, width * 3 / 4);
    }
    else if (width > 10)
    {
        x += random(5, width - 1);
    }
    else
    {
        x += random(1, width);
    }

    if (height > 20)
    {
        y += random(height / 4, height * 3 / 4);
    }
    else if (height > 10)
    {
        y += random(5, height - 1);
    }
    else
    {
        y += random(1, height);
    }

    press(x, y, press_time);

    debug_str = "click (" + x + ", " + y + ") " + press_time + "ms";
    debug_str += " In Rect(" + rect.left + ", " + rect.top + ", " 
                            + rect.right + ", " + rect.bottom + ")";
    DUMP_OUT_DEBUG(debug_str)
}

function go_back()
{
    var retry_count = 0;
    var back_view = className("android.widget.TextView").desc("返回").findOne(1000);

    while (!back_view)
    {
        back_view = className("android.widget.TextView").desc("返回").findOne(1000);
        retry_count++;

        if (5 < retry_count)
        {
            break;
        }
    }

    if (back_view)
    {
        back_view.click();
    }
    else
    {
        DUMP_OUT_ERR("Not find back!!!");
    }
}

//dialogs.info("请开启\"无障碍服务\"");
function accessibility_services ()
{
    /* 检测“无障碍服务”是否开启 */
    try {
        auto(); // 如果无障碍服务未启动会停止脚本
        // auto.waitFor(); // 在无障碍服务启动后继续运行
        // auto.setMode("fast"); // 启用控件缓存，从而选择器获取屏幕控件更快
    } catch (error) {
        return RET_ERR_AUTO_FAIED;
    }

    return RET_SUCCES;
}

/**
 * 获取截屏权限
 */
function get_screenshot_privileges()
{
    if(!requestScreenCapture()){
        return RET_ERR_GET_SCREENSHOT_PRI_FAILED;
    }

    return RET_SUCCES;
}

/**
 * 获取截屏
 */
function getCaptureImg ()
{
    var img0 = captureScreen();

    if(!img0 || typeof(img0) == "undifined")
    {
        return ERR_RET_GET_CAPTURE_SCREEN_FAILED;
    }
    else
    {
        return img0;
    }
}

/* 进入"蚂蚁森林" */
function ant_forest_enter(time_interval, retry_times)
{
    var enter_flag = 1; // 0: success 1:fail
    var index = 0;
    
    /*
     * time_interval: 
     * retry_times: 尝试等待"蚂蚁森林"的打开最大次数
     * return: 0 成功
     *         1 失败
     */
    if (1000 > time_interval || time_interval > 5000)
    {
        return RET_ERR_INVALID_TIME_INTERVAL;
    }

    if (1 > retry_times || 20 < retry_times)
    {
        return RET_ERR_INVALID_RETRY_TIMES;
    }

    for (index = 0; index <= retry_times; index++)
    {

        /* 通过下面三个"控件"来判断成功进入了蚂蚁森林 */
        var close_exist = className("android.widget.ImageView").desc("关闭").exists();
        var stock_tree_exist = className("android.widget.Button").desc("种树").exists();
        var mytree_exist = className("android.widget.Button").desc("我的大树养成记录").exists();
        if(close_exist 
            && stock_tree_exist 
            && mytree_exist)
        {
            enter_flag = 0;
            break;
        }
        else
        {
            if (index)
            {
                debug_str = "Retry enter into ant forest: " + index  + " times.\n    close: " + close_exist 
                    + ", stock_tree: " + stock_tree_exist + " mytree: " + mytree_exist;
                DUMP_OUT_DEBUG(debug_str);
                // DUMP_OUT_DEBUG("Retry enter into ant forest: %d times.\n    close:%d, stock_tree:%d, mytree:%d", 
                //     index, close_exist, stock_tree_exist, mytree_exist);

            }
        }

        if (0 == index % 5)
        //if (0)
        {
            /* 如何获取data(支付宝客户端的标准scheme)(简而言之：百度)
            * http://myjsapi.alipay.com/jsapi/h5app-lifecycle.html
            * https://www.jianshu.com/p/5ea0b9d84caa
            * (百度)获取得到蚂蚁森林的scheme("URL"): alipay://platformapi/startapp?appId=60000002
            * packageName:通过Auto.js的"布局分析"可以获得
            */
            app.startActivity({        
                action: "android.intent.action.VIEW",
                data: "alipays://platformapi/startapp?appId=60000002",
                packageName: "com.eg.android.AlipayGphone"
            });
        }

        sleep(time_interval);
    }

    /* 如果进入蚂蚁森林失败，则退出程序 */
    if (enter_flag)
    {
        return RET_ERR_ENTER_FOREST_FAILED;
    }
    return RET_SUCCES;
}

/*
 * 功能: 收集能量
 * 1. 确保已经进入自己的主页或者好友的主页
 * 2. 确定好能量球个数上限，可以防止其他异常情况导致死循环（有好友有保护罩导致死循环的情况。）
 */
function collect_energy (max_energy_num)
{
    var index = 0;
    if (0 > max_energy_num || 50 < max_energy_num)
    {
        return RET_ERR_INVALID_ENERGY_NUM;
    }

    if (0) { /* #if 0 */
    if (className("android.widget.Button").descContains("收集能量").exists())
    {
        var energy_button = className("android.widget.Button").descContains("收集能量").find();
        energy_button.forEach (function (object)
        {
            debug_str = "energy exist1: " + index + ", " + object.desc();
            DUMP_OUT_DEBUG(debug_str);
            //DUMP_OUT_DEBUG("energy exist1: %d, %s", index, object.desc());
            // TODO
            //click(object.bounds().centerX(), object.bounds().centerY());
            index++;

            if (index > max_energy_num)
            {
                return RET_ERR_OVER_MAX_COLLECT_TIMES;
            }
            sleep(2000);
        });
    }
    } else if (0){ /* #else */
    /*
     * findOne() : 阻塞
     * findOne(timeout) : timeout毫秒后,未找到则返回null (非阻塞)
     * descContains(str) : 找desc中包含str的UiSeletor
     */
    var energy_button = className("android.widget.Button").descContains("收集能量").findOne(1000);
    while (energy_button)
    {
        debug_str = "energy exist2: " + index + ", " + energy_button.desc();
        DUMP_OUT_DEBUG(debug_str);
        //DUMP_OUT_DEBUG("energy exist2: %d, %s", index, energy_button.desc());
        
        // TODO: collect this energy
        energy_button.click();
        index++;   
        if (index > max_energy_num)
        {
            return RET_ERR_OVER_MAX_COLLECT_TIMES;
        }
        sleep(2000);
        energy_button = className("android.widget.Button").descContains("收集能量").findOne(1000);
    }
    } /* #elseif */
    else
    {
        var barrier_free_view = className("android.view.View").idEndsWith("J_barrier_free").findOne(1000);

        barrier_free_view.children().forEach(function(child_button)
        {
            if (!child_button)
            {
                return false;
            }

            index++;

            if (child_button.desc() != "地图"
                && child_button.desc() != "成就"
                && child_button.desc() != "通知"
                && child_button.desc() != "攻略"
                && child_button.desc() != "任务"
                && child_button.desc() != "背包"
                && child_button.desc() != "发消息"
                && child_button.desc() != "弹幕"
                && child_button.desc() != "浇水"
                )
            {
                debug_str = "energy exist3: " + index + ", " + child_button.desc();
                DUMP_OUT_DEBUG(debug_str);
                //child_button.click();
                var rect = child_button.bounds();
                random_click(rect);
                sleep(500);
            }
        });
    }/* #endif */
    return RET_SUCCES;
}

function lookup_more_friend ()
{
    /* 调用次方法前需确保已经进入了"蚂蚁森林"界面 */
    var index = 0;
    var centerX = 0;
    var centerY = 0;
    var more_friend_view = className("android.view.View").descContains("查看更多好友").findOne(1000);
    while (!more_friend_view || !more_friend_view.bounds())
    {
        index++;

        if (index > 4)
        {
            return RET_ERR_NOT_FIND_LOOPUP_MORE_FRIEND;
        }
        debug_str = "Not find loopup more firend: " + index;
        DUMP_OUT_DEBUG(debug_str);
        //DUMP_OUT_DEBUG("not find loopup more firend: %d", index);

        more_friend_view = className("android.view.View").descContains("查看更多好友").findOne(1000);
    }

    centerX = more_friend_view.bounds().centerX();
    centerY = more_friend_view.bounds().centerY();
    
    debug_str = "Find lookup more friend: (" + centerX + ", " + centerY + ")";
    DUMP_OUT_DEBUG(debug_str);

    // DUMP_OUT_DEBUG("Find lookup more friend: (%d, %d)", centerX, centerY);
    
    var enter_flag = 1; // 0: success 1:fail
    var retry_times = 4;
    /* 进入"好友排行榜" */
    for (index = 0; index <= retry_times; index++)
    {
        /* TODO: 通过坐标点击"查看更多好友"无法进入"好友排行榜", 原因未知 */
        //press(centerX, centerY, 2000);
        //click(centerX, centerY);
        more_friend_view.click();

        /* 通过下面三个"控件"来判断成功进入了"好友排行榜" */
        var close_exist = className("android.widget.ImageView").desc("关闭").exists();
        var more_exist = className("android.widget.ImageView").desc("更多").exists();
        var friend_ranking_list_exist = className("android.widget.TextView").text("好友排行榜").exists();
        var stock_tree_exist = className("android.widget.Button").desc("种树").exists();
        if(close_exist 
            && more_exist 
            && friend_ranking_list_exist
            && !stock_tree_exist)
        {
            enter_flag = 0;
            break;
        }
        else
        {
            if (index)
            {
                debug_str = "Retry enter into friend ranking list: " + index + " times.\n    close: " 
                    + close_exist + ", more: " + more_exist + ", friend ranking list: " 
                    + friend_ranking_list_exist + ", stock tree: " + stock_tree_exist;
                DUMP_OUT_DEBUG(debug_str);
                // DUMP_OUT_DEBUG("Retry enter into friend ranking list: %d times.\n    close:%d, more:%d, friend ranking list:%d, stock tree:%d", 
                //     index, close_exist, more_exist, friend_ranking_list_exist, stock_tree_exist);
            }
        }

        sleep(2000);
    }

    /* 如果进入"好友排行榜"失败，返回错误 */
    if (enter_flag)
    {
        return RET_ERR_ENTER_FRIEND_RANKING_LIST_FAILED;
    }

    return RET_SUCCES;
}

function go_friend_homepage_steal (max_friend_num)
{
    var index = 0;
    var retry_count = 0;
    var may_finish = 0;
    var max_click_times = 0;
    var debug_str = null;
    var old_indexInParent = 0;
    var cur_indexInParent = 0;
    var rank_list_more_view = null;
    var ranking_list = null;
    if (0 > max_friend_num || 1000 < max_friend_num)
    {
        return RET_ERR_INVALID_MAX_FRIEND_NUM;
    }

    /* 每一次点击可以刷出20个好友, 加上20,10算是容错范围 */
    max_click_times = max_friend_num / 20;
    max_click_times = max_click_times > 10 ? (max_click_times + 20) : (max_click_times + 10);

    /*
     * 注意: J_rank_list_more 的desc刚开始应该是"查看更多"
     *                            如果人工下一次且未到底，desc为null
     *                            如果人工下拉到底，desc为"没有更多了"
     *                            如果使用脚本调用控件的click()下拉一次且未到底,desc为null
     *                            如果使用脚本调用控件的click()下拉一次到底,desc为null
     *       所以不建议使用desc来判断是否到底了
     *       下面的思路使用的是 J_rank_list_more 在父空间中的 indexInParent ,测试过没有问题
     */
    
    //var lookup_more_view = className("android.view.View").descContains("查看更多").findOne(1000);
    //var not_more_view = className("android.view.View").descContains("没有更多了").findOne(1000);

    retry_count = 0;
    while (1)
    {
        sleep(1000);
        rank_list_more_view = className("android.view.View").idEndsWith("J_rank_list_more").findOne(1000);
        if (rank_list_more_view)
        {
            old_indexInParent = 0;
            new_indexInParent = rank_list_more_view.indexInParent();
            break;
        }
        
        retry_count++;
        if (5 < retry_count)
        {
            /* 异常情况, 未获取到控件, 按理说不应该发生 */
            return RET_ERR_NOT_FIND_RANK_LIST_MORE_IN_FRIEND_RANKING_LIST;
        }
        
    }

    retry_count = 0;
    may_finish = 0;
    while (retry_count <= max_click_times)
    {
        retry_count++;

        if (!may_finish)
        {
            debug_str = "Loding more firend: " + retry_count + "/" + max_click_times;
        }
        else
        {
            debug_str = "Loding more firend may finish: " + retry_count + "/" + max_click_times;
        }
        DUMP_OUT_DEBUG(debug_str);

        /* 如果rank list more在父空间的index不变了,那么很可能已经刷新到底了。 */
        if (old_indexInParent == new_indexInParent)
        {
            /* 仍然尝试三次再退出 */
            may_finish++;
            retry_count--;
            if (1 < may_finish)
            {
                break;
            }
        }
        else
        {
            may_finish = 0;
        }

        sleep(2000);
        rank_list_more_view = className("android.view.View").idEndsWith("J_rank_list_more").findOne(1000);
        if (rank_list_more_view)
        {
            rank_list_more_view.click();
        }
        else
        {
            /* 异常情况, 未获取到控件, 按理说不应该发生 */
            DUMP_OUT_WARNING("Not find rank list more in friend ranking list!");
            continue;
        }
        old_indexInParent = new_indexInParent;
        new_indexInParent = rank_list_more_view.indexInParent();
    }
    
    /* 超过最大尝试次数 */
    if (retry_count >= max_click_times)
    {
        return RET_ERR_OVER_MAX_LOOKUP_MORE_CLICK_TIMES;
    }

    debug_str = "Refresh rank list more int friend ranking list successful."
    DUMP_OUT_DEBUG(debug_str);

    index = 0;
    retry_count = 0;

    max_click_times = max_friend_num / 6 + 3;
    while (1)
    {
        sleep(1000);
        ranking_list = className("android.view.View").idEndsWith("J_rank_list").findOne(1000);
        /* 获取到好友列表 */
        if (ranking_list)
        {
            index = 0;
            /* forEach 使用异常来提前结束 */
            try
            {
                max_click_times = ranking_list.childCount() / 6 + 3;
                ranking_list.children().forEach(function(friend_view)
                {
                    index++;

                    //debug_str = "Friend : " + index;
                    //DUMP_OUT_DEBUG(debug_str);

                    /* 判断是否需要进入该好友主页 */
                    /* 方法1: 取好友所在这个控件的右上角三个点，都时白色的话则认为不需要处理该好友 */
                    if (1)
                    {
                        var friend_right = 0;
                        var friend_top = 0;
                        
                        var screen_img = getCaptureImg();
                        var rect = friend_view.bounds();
                        
                        if (!rect)
                        {
                            throw new Error("END_error");
                        }

                        /* 为了 random_click 能点击成功，需要处在屏幕内(350代表"好友排行榜"的高度) */
                        if (rect.bottom <= device.height * 2 / 9
                            || rect.top <= device.height * 2 / 9)
                        {
                           return false;
                        }
                        else if (rect.bottom >= device.height)
                        {
                            throw new Error("END_foreach");
                        }

                        friend_right = rect.right;
                        friend_top = rect.top;
                        
                        /*
                         * 采用反向思维来判断，如果这里不是白色(ARGB = 0XFFFFFFFF)
                         * 手机屏幕的坐标，左上角是(0, 0)。向右为x正方向。向下为y轴正方向
                         */
                        var argb_1 = images.pixel(screen_img, rect.right - 10, rect.top + 10);
                        var argb_2 = images.pixel(screen_img, rect.right - 11, rect.top + 11);
                        var argb_3 = images.pixel(screen_img, rect.right - 12, rect.top + 12);

                        debug_str = "Friend " + index + ": " + (argb_1 & 0xffffff).toString(16) 
                            + " " + (argb_2 & 0xffffff).toString(16) + " " + (argb_3 & 0xffffff).toString(16);
                        //DUMP_OUT_VERBOSE(debug_str);

                        /* argb_1可能是64bit的，不和0xffffffff与的话，当颜色为白色时，等式无法成立 */
                        if ((argb_1 & 0xffffff) == 0xffffff 
                            && (argb_2 & 0xffffff) == 0xffffff 
                            && (argb_3 & 0xffffff) == 0xffffff)
                        {
                            debug_str = "Friend " + index + " has Nothing. 0xFFFFFF"
                            DUMP_OUT_DEBUG(debug_str);
                            return false;
                        }
                        /* 暂不支持帮好友收取能量 */
                        // else if ((argb_1 & 0xffffff) == 0xf99137 
                        //     || (argb_2 & 0xffffff) == 0xf99137 
                        //     || (argb_3 & 0xffffff) == 0xf99137)
                        // {
                        //     debug_str = "Friend " + index + " can Help. 0xf99137"
                        //     DUMP_OUT_DEBUG(debug_str);
                        //     return false;
                        // }
                        else
                        {
                            debug_str = "Friend " + index + " can Steal.";
                            DUMP_OUT_VERBOSE(debug_str);
                        }

                        debug_str = "Find lookup more friend handle: (" + friend_right + ", " + friend_top + ")";
                        //DUMP_OUT_DEBUG(debug_str);

                        random_click(rect);
                        // TODO
                        sleep(2000)
                        //friend_view.click(); // 控件点击方法无效
                        collect_energy(10);
                        sleep(2000)
                        go_back();
                        sleep(2000)

                    }
                    /* 方法二: 使用了多点找色，找出绿色底的白色小手 */
                    // TODO：稍后支持
                    else
                    {
                        var friend_right = 0;
                        var friend_top = 0;
                        
                        var screen_img = getCaptureImg();
                        var p = null;
                        var hand_pixel_1 = 0;
                        var hand_pixel_2 = 0;
                        var hand_pixel_3 = 0;

                        var rect = friend_view.bounds();
                        
                        if (!rect)
                        {
                            throw new Error("END_error");
                        }

                        /* 为了 random_click 能点击成功，需要处在屏幕内 */
                        if (rect.top <= 0)
                        {
                            return 0;
                        }
                        else if (rect.bottom >= device.height)
                        {
                            throw new Error("END_foreach");
                        }

                        friend_right = rect.right;
                        friend_top = rect.top;

                        debug_str = "Find lookup more friend handle: (" + friend_right + ", " + friend_top + ")";
                        DUMP_OUT_DEBUG(debug_str);

                        //hand_pixel_1 = images.pixel(screen_img, friend_right - 1, friend_top);

                        //411宽度 #a2cbb4  1032,1820  #30bf6c  1032,1787   -33     #52ca84  1032,1832   12     #ffffff  1032,1835   15
                        // p = images.findMultiColors(screen_img, "#a2cbb4",[[0, -33, "#30bf6c"], [0,12, "#52ca84"],[0,15, "#ffffff"]], {
                        //     region: [1032, 180, 1, 1700]
                        // });

                        if (p)
                        {
                            debug_str = "Friend " + index + " has nothing."
                            DUMP_OUT_DEBUG(debug_str);
                        }
                        else
                        {
                            debug_str = "Friend " + index + " can steal/help.";
                            DUMP_OUT_VERBOSE(debug_str);
                        }

                        random_click(rect);
                        //friend_view.click(); // 控件点击方法无效
                    }
                });
            }
            catch (e)
            {
                if (e.message == "END_error")
                {
                    DUMP_OUT_ERR("执行出错");
                    break;
                }
                else if (e.message == "END_foreach")
                {
                    debug_str = "Next " + retry_count + "/" + max_click_times + " ......";
                    DUMP_OUT_DEBUG(debug_str);
                }
                else
                {
                    DUMP_OUT_ERR("未知异常");
                    throw e;
                }
            }
        }
        
        retry_count++;
        //if (max_click_times < index)
        if (5 < retry_count && !ranking_list)
        {
            /* 异常情况, 未获取到控件, 按理说不应该发生 */
            return RET_ERR_NOT_FIND_RANK_LIST_MORE_IN_FRIEND_RANKING_LIST;
        }

        /* 已经遍历过所有的好友，结束 */
        if (max_click_times < retry_count)
        {
            break;
        }

        /* 滑动 */
        gesture(random(300,600), [random(50, device.width - 50), random(device.height * 7 / 9, device.height * 7 / 9 - 100)]
                                 , [random(50, device.width - 50), random(device.height * 2 / 9, device.height * 2 / 9 - 100)]
                                 //, [random(50, device.width - 50), random(device.height * 5 / 8, device.height * 6 / 8 - 10)]
                                 );
        /* 可变参数不会写，稍后支持 */
        //random_gesture();
    }

    return RET_SUCCES;
}

function user_define_main ()
{
    var ret = 0;
    //setScreenMetrics(1080, 1920);
    setScreenMetrics(1440, 2560);

    var debug_str = "Get device: (" + device.width + ", " + device.height + ")";
    DUMP_OUT_DEBUG(debug_str);
    // DUMP_OUT_DEBUG("Get device: (%d, %d)", device.width, device.height);

    /* 开启"无障碍服务"" */
    DUMP_OUT_VERBOSE("\"无障碍服务\" start...");
    ret = accessibility_services();
    if (ret)
    {
        anti_forest_err_return(ret);
        DUMP_OUT_ERR("程序异常终止");
        return ret;
    }
    else
    {
        DUMP_OUT_VERBOSE("\"无障碍服务\"成功开启");
    }
    DUMP_OUT_VERBOSE("\"无障碍服务\" end...");
    
    /* 获取"截屏"权限 */
    DUMP_OUT_VERBOSE("\"截屏权限\"获取 start...");
    ret = get_screenshot_privileges ();
    if (ret)
    {
        anti_forest_err_return(ret);
        DUMP_OUT_VERBOSE("程序异常终止");
        return ret;
    }
    else
    {
        DUMP_OUT_VERBOSE("\"截屏权限\"获取成功");
    }
    DUMP_OUT_VERBOSE("\"截屏权限\"获取 end...");

    /* 进入蚂蚁森林 */
    DUMP_OUT_VERBOSE("\"蚂蚁森林\"进入 start...");
    ret = ant_forest_enter(2000, 15);
    if (ret)
    {
        anti_forest_err_return(ret);
        DUMP_OUT_VERBOSE("程序异常终止");
        return ret;
    }
    else
    {
        DUMP_OUT_VERBOSE("\"蚂蚁森林\"进入成功");
    }
    DUMP_OUT_VERBOSE("\"蚂蚁森林\"进入 end...");

    /* 收集自己的能量 */
    DUMP_OUT_VERBOSE("\"收集自己的能量\" start...");
    var ret = collect_energy(5);
    if (RET_ERR_OVER_MAX_COLLECT_TIMES == ret)
    {
        anti_forest_err_return(ret);
        // 不退出程序
    }
    else if (ret)
    {
        anti_forest_err_return(ret);
        DUMP_OUT_VERBOSE("程序异常终止");
        return ret;
    }
    else
    {
        DUMP_OUT_VERBOSE("\"收集自己的能量\"完成");
    }
    DUMP_OUT_VERBOSE("\"收集自己的能量\" end...");

    /* 收集他人的能量 */
    DUMP_OUT_VERBOSE("\"收集他人的能量\" start...")
    ret = lookup_more_friend ();
    if (ret)
    {
        anti_forest_err_return(ret);
        DUMP_OUT_VERBOSE("程序异常终止");
        return ret;
    }
    else
    {
        DUMP_OUT_VERBOSE("\"查看更多好友\"进入成功");
    }

    sleep(2000);
    ret = go_friend_homepage_steal (200);
    if (ret)
    {
        anti_forest_err_return(ret);
        DUMP_OUT_VERBOSE("程序异常终止");
        return ret;
    }
    else
    {
        DUMP_OUT_VERBOSE("\"偷取/帮收\"能量成功");
    }
    DUMP_OUT_VERBOSE("\"收集他人的能量\" end...");

    /* 退出"蚂蚁森林" */
    back();
    back();
    exit();
}

/* 程序开始处 */
DUMP_OUT_VERBOSE("程序执行开始..........................");
user_define_main ();
DUMP_OUT_VERBOSE("程序执行结束..........................");
exit();
/* 程序结束处 */

