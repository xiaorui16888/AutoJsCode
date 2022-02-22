auto();


//-------------设置开始------------------------
var count  =  7; //次数设置

var rand_low = 2;   //每次循环的间隔 min

var rand_high = 5;  //每次循环的间隔 max


var rand_count_low = 360;    //随机循环次数 min

var rand_count_high = 400;   //随机循环次数 max


var rand_interval_low = 240;    //两次大循环间隔时间 min

var rand_interval_high = 240;   //两次大循环间隔时间 max


//---------------jmp --------------
var age_bool = 1;  

var age_low = 23;

var age_high = 60;



var jmp_bank = 0;   //设置成1 之后 将2次判断是否是打卡工资 不是则退出

//------------auth_flag设置成1之后 无视别的条件 满足金额就抢----
var auth_flag = 0;

var sb_auth = 1;      //社保认证 设置成1后  满足基数和金额会触发抢单

//var sb_month = "6";

var sb_auth_num = 0;   //社保认证基数


var ac_auth = 1;     //认证公积金 

//var ac_month = "6";

var ac_auth_num = 0; //公积金认证基数  满足金额就会触发抢单

//以下设置为1之后  是必须符合设置选项才会抢
var b_car  =  0;    //车

var b_house  =  0;    //房

var b_sb  =  1;    //社保

var b_trans = 0;     //转账

var b_bank = 0;      //银行代发


//以下设置成1后 满足一个或者多个会触发抢单
var or_car = 0;    //车

var or_house = 0;     //房

var or_sb = 0;      //社保

var or_trans = 1;    //转账

var or_bank = 1;     //银行代发



var choose_num = 1; //这里定义 辅助选项要满足的个数  比如满足一个或者两个才会抢


//-------------设置结束------------------------

var has_num = 0;

var is_page = 0;

var rand_count = 0;

//var auth_act = 0;

//--------------act-------------

var main_act = "com.huijiemanager.ui.activity.MainActivity";

var details_act = "com.huijiemanager.ui.activity.PublicDetailActivity";

var mi_act = "com.miui.home";

//--------------idr-------------

 var adv_img_idr = "iv_activity_pic";

var adv_img_cancel_idr = "iv_close_pic_adver";


var adv_idr = "loading";

var cancel_idr = "cancel_button";

var zn_idr = "iv_zhongan_icon";

var k_idr = "tv_could_download";

var monney_idr = "tv_loan_money";

var res_idr = "tv_third_line_has";

var auth_idr = "tv_third_line_has";

var wages_idr = "tv_second_line_has";

var l_idr = "txt_submit";

var q_idr = "txt_action";

//--------------bounds-----------


var page_bounds = [200,1200];

var zn_bounds = [280,380,352,500];


var k_bounds = [560, 340, 720, 510];

var auth_bounds = [25,  700,  65,  820];

var auth_res_bounds = [40,  630,  720,  780];

var ac_slice_bound = [7, 12];

var sb_slice_bound = [6, 11];

var res_bounds = [40,  630,  720,  780];

var wages_bounds = [50, 560, 710, 730];

var jmp_bounds = [180,830,720,1000];

//------------class------------

var auth_class = "android.widget.ImageView";

//------------code------------

function app() 
{
    home()

    var lunch_bool = launchApp("信贷家");

    if (false == lunch_bool) 
    {
        launchApp("信贷家-信贷获客");
    }
    
    sleep(10000);

    is_page = (main_act == currentActivity())

    if (is_page) {
        return;
    }
    
    log(is_page);

    app();
}

function ismain() 
{
    while (main_act != currentActivity()) {
        back();
        sleep(1000);

        if (currentPackage() == mi_act) 
        {
            app();
            sleep(300);
            return;
        }

    }

    if (currentActivity() != main_act) 
    {
        app();
    }
}


function or_con( b_con, or_con, txt,con_str)
{
  //log(txt + " is choosed");

  var not_has_con = (0 > con_str.indexOf(txt));

  if(not_has_con)
  {
      var has_con_num  = -1;
  }
  else
  {
      var has_con_num = 1;
  }

  if (b_con == 1 && has_con_num < 0) 
  {
      log("必要条件不符___" + txt);
      qd();

  }

  if ((or_con == 1) && (has_con_num > 0) )
  {
      has_num++;
      //log(txt + "has_num  " + has_num);
  }

}

function or_auth(id_str, bounds, txt , slice_bounds, auth_num)
{

    var ac_con = id(id_str).boundsInside(bounds[0],bounds[1],bounds[2],bounds[3]).findOne(300);

    if (null == ac_con)
    {
        log("请不要随意移动屏幕 __ " + txt);
        qd();
    }

    var ac_con_txt = ac_con.text();


    if (-1 != ac_con_txt.indexOf(txt))
    {
       // log("bingo   " + txt + "  有认证");

       /* var month_str = ("缴纳" + month);

        //log(month_str);

        if (-1 == ac_con_txt.indexOf(month_str))
        {
            log("月份不符合");
            return;
        }
*/
        var temp_auth_num = parseInt(ac_con_txt.slice(slice_bounds[0], slice_bounds[1]));

      //  log("基数是  " + temp_auth_num);

        if (temp_auth_num >= auth_num)
        {
          //  log("执行抢单");

        //    auth_act = 1;
            act();
            qd();
        }

    }

    

}

function is_con(id_str, con_bounds,con_str)
{
    var con = id(id_str).boundsInside(con_bounds[0],con_bounds[1],con_bounds[2],con_bounds[3]).findOne(300);

    if (null == con) 
    {
        log("请不要随意移动屏幕 " + con_str);
        qd();
    }

    return con;
 }

function is_jump(b_bounds, contain_txt)
{
    
    var con = boundsInside(b_bounds[0],b_bounds[1],b_bounds[2],b_bounds[3]).textContains(contain_txt).findOne(300);
    
    if(null == con)
    {
        return false;
    }   
    
    return true;
}

function clear_adv()
{
    var adv_img_con = id(adv_img_idr).findOne(200);
    
    if(null != adv_img_con)
    {
        var cancel_con = id(adv_img_cancel_idr).findOne(200);
        
        if(null != cancel_con)
        {
            cancel_con.click();
            sleep(200);
         }   
    }     
    
    var adv_con = id(adv_idr).findOne(200);
    
    if(null != adv_con)
    {
        var cance_con = id(cancel_idr).findOne(200);
        
        if(null != cance_con)
        {
            
         cance_con.click();
         sleep(200);
        }   
    }    
}   

function start()
{
    click(page_bounds[0],page_bounds[1]);

    has_num = 0;

    auth_act = 0;
    
    clear_adv();
    
    sleep(random(rand_low * 1000,rand_high * 1000));

    log("count = "  +  count);

    gestures([350,   [300,  800],   [300,  1400]]);

    var exit_flag = textContains("休息会再").findOne(300);

    if (null != exit_flag) 
    {
        log("我的哥 为了安全 等半天再用吧");
        exit();
    }

    rand_count--;

    log(rand_count);

    sleep(300);

    log("在寻找可抢");

}




function qd()  
{
  while  (count > 0)      
  {   
      while(rand_count)
      {


        if (currentActivity() != main_act) 
        {
            app();
            qd();
            continue;
        }

        start();

        //-------------------K---------------------

        var k = id(k_idr).boundsInside(k_bounds[0],k_bounds[1],k_bounds[2],k_bounds[3]).findOne(300);

        if(null == k || (-1 == k.text().indexOf("可")))
        {
            log("未找到");
            continue;
        }   

           var zn_con = id(zn_idr).boundsInside(zn_bounds[0],zn_bounds[1],zn_bounds[2],zn_bounds[3]).findOne(300);

       if(null == zn_con)
       {
           log("众安不符");
           continue;    
        }   
         
       //  log("77");
        //--------------------auth--------------------

        if (auth_flag) 
        {        
            var auth = className(auth_class).boundsInside(auth_bounds[0],auth_bounds[1],auth_bounds[2],auth_bounds[3]).findOne(300);

            if (null != auth)
            {
                act();               
                continue; 
            } 
        }

        //------------------auth_two-------------------
        
        if (ac_auth)   //如果开启了公积金认证
        {
            or_auth(auth_idr, auth_res_bounds, "公积金", ac_slice_bound, ac_auth_num);
        }

        if (sb_auth)  //开启了社保认证
        {
            or_auth(auth_idr, auth_res_bounds, "养老", sb_slice_bound, sb_auth_num);
        }


        //------------------------wages----------------

        //var wages_type = id("tv_second_line_has").boundsInside(30, 560, 800, 800).findOne(300);

        var wages_type = is_con(wages_idr, wages_bounds,"wages");

        var wages_str = wages_type.text();

        if (b_trans + or_trans)     //id = tv_second_line_has
        {
            or_con(b_trans, or_trans, "转账", wages_str);
        }

        if(b_bank + or_bank)
        {
            or_con(b_bank, or_bank, "银行", wages_str);
        }

        


        //------------------------res----------------
        //
        //var res  =  id("tv_third_line_has").boundsInside(40,  630,  800,  800).findOne(300);  

        var res = is_con(res_idr, res_bounds,"res");

        var res_str = res.text();

        //log(con_str);

        if(b_car + or_car)
        {
            or_con(b_car, or_car, "有车产",res_str);
        }

        if (b_house + or_house)
        {
            or_con(b_house, or_house, "有房产", res_str);
        }

        if (b_sb + or_sb)
        {
            or_con(b_sb,or_sb,"有社保", res_str);
        }



        if (has_num < choose_num)
        {
            log("条件不符");
            continue;
        }

        act();       
        continue;
    }      

    var interval =  random(rand_interval_low*1000, rand_interval_high*1000); 

    log(interval);

    sleep(interval);

    rand_count = random(rand_count_low,rand_count_high);
    
    }
}
      

function act() 
{

    var k2  =  id(k_idr).textContains("可").boundsInside(k_bounds[0],k_bounds[1],k_bounds[2],k_bounds[3]).findOne(300);

    if (null == k2)
    {
        log("已被抢");
        return;
    }
    
    var k2_bounds =k2.bounds();

    do
    {
        press(k2_bounds.centerX(), k2_bounds.centerY(),20);

       // log("可抢单点击执行");
       
       sleep(200);

    }while(details_act != currentActivity());

    waitForActivity(details_act);

    var bank_bool = is_jump(jmp_bounds,"银行");
    
    var trans_bool = is_jump(jmp_bounds,"转账");
    
    if(false == bank_bool && false == trans_bool)
    {
       log("收入形式不符");
       ismain();
       return;
    }

    if (age_bool) 
    {
        var age_con = id("tv_age").findOne(2000);
    
        if(null == age_con)
        {
            ismain();
            return;
        }

        var age_num = parseInt(age_con.text());

        log(age_num);
    
        if(age_num < age_low || age_num > age_high)
        {
            ismain();
            return;
        }
    }

    var l  =  id(l_idr).findOne(2000);   

    if (null == l)
    {
        ismain();
        return;
    }

    l.click();

    log("立即抢单执行");

    var q  =  id(q_idr).findOne(2000);   

    if (null == q)
    {
        ismain();
        return;
    }

    var q_bool = q.click();   

    if(false == q_bool)
    {
        ismain();            
        return;
    }  

    log("确认抢单执行");

    count--;

    device.vibrate(10000);


    ismain();

    return;   

}

openConsole();

rand_count = random(rand_count_low,rand_count_high);

log(rand_count);

app();

qd();
