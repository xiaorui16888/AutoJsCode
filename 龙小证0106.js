"auto";
if (parseInt(device.sdkInt) < 24){
  alert("您手机安卓版本低于7.0版本，无法使用该程序。")
  exit();
}
alert("逢山开路，遇水架桥的魄力孕育了龙小证的诞生！满足广大用户的小需求是龙小证的优秀基因！类似的小需求可以反馈哦；欢迎加入龙小证儿，QQ群号码：1974172");
threads.start(function() {
  events.on("exit", function() {
    console.hide();
    device.vibrate(70);
    //alipay("FKX099191JMATRSHNYWGD3");
    if ((sub_score >= 60) && (B_num == 1) && (C_num == 0))
      if (confirm("龙小证同学经过" + String(sub_score) + "个步骤，终于完成了进京证的申请！，帮着您完成了繁琐的步骤，让您可以安稳的睡觉,让您摆脱了黄牛的困扰!觉得值得打赏吗？  不论如何开心快乐每一天！!")) {
        console.hide();
        sleep(1000);
        alipay("FKX099191JMATRSHNYWGD3");
        sleep(3000);
      }
    if ((sub_score >= 120) && (B_num == 0) && (C_num == 1))
      if (confirm("龙小证同学经过" + String(sub_score) + "个步骤，终于完成了进京证的申请！，帮着您完成了繁琐的步骤，让您可以安稳的睡觉,让您摆脱了黄牛的困扰!觉得值得打赏吗？  不论如何开心快乐每一天！!")) {
        console.hide();
        sleep(1000);
        alipay("FKX099191JMATRSHNYWGD3");
        sleep(3000);
      }
  });
});
var A_num = 0;
var B_num = 0;
var C_num = 0;
var M_num = 0;
var path_f = context.getFilesDir();
var num_rec = 0;
var clxx = 0;
var sub_score = 0;
var re_try = 0;
console.clear();
var check_f = new Array();
var y_pic = new Array();
var qqTime = "";
check_f = files.listDir(path_f, function(name) {
  return name.endsWith(".txt")
});

function gettime() {
  var recode_qq = http.get("http://cgi.im.qq.com/cgi-bin/cgi_svrtime");
  return recode_qq.body.string().replace(" ", "T");
}

function clickByXY(widget) {
  var b = widget.bounds();
  click(b.centerX(), b.centerY());
}

function clickByXY_confirm(widget) {
  var b = widget.bounds();
  console.log(b);
  click(b.centerX(), b.centerY() / 2);
}

function UiObjectPress(UiObiect, duration) {
  console.hide();
  sleep(200);
  let x = UiObiect.bounds().centerX();
  let y = UiObiect.bounds().centerY();
  if (y <= m_h) {
    press(x, y, duration);
    console.log("点击坐标："+x+","+y);
    return true;
  } else {
    console.log("坐标超出界面,无法使用点击函数！");
    return false;
  }
  console.log("Press点击坐标信息："+x+","+y);
  console.show();
}

function Factory(name) {
  console.log(device.brand);
  switch (name) {
    case "Xiaomi":
      {
        console.log("小米手机");
        sleep(1000);
        if (parseInt(device.sdkInt) > 23) {
          swipe(m_v * 0.8, m_h / 2, m_v * 0.2, m_h / 2, 500);
          sleep(500);
          console.log("开始选择相册");
          XM_click("进京证");
          sleep(1000);
          swipe(m_v * 0.5, m_h * 0.3, m_v * 0.5, m_h * 0.8, 500);
          sleep(1000);
          XM_click("名称");
        }
        console.log("完成");
        break;
      }
    case "HONOR":
      {
        console.log("华为荣耀");
        if (parseInt(device.sdkInt) > 23) {
          while (!((textContains("进京证").exists()) || (descContains("进京证").exists()))) {
            sleep(100);
            swipe(m_v / 2, m_h * 0.8, m_v / 2, m_h * 0.15, 500);
          }
        }
        if (textContains("进京证").exists())
          click("进京证");
        if (descContains("进京证进京证").exists())
          click("进京证");
        break;
      }

    default:
      {
        console.log("其他品牌，默认荣耀配置");
        if (parseInt(device.sdkInt) > 23) {
          while (!((textContains("进京证").exists()) || (descContains("进京证").exists()))) {
            sleep(100);
            swipe(m_v / 2, m_h * 0.8, m_v / 2, m_h * 0.15, 500);
          }
        }
        if (textContains("进京证").exists())
          click("进京证");
        if (descContains("进京证进京证").exists())
          click("进京证");
      }

  }
}

function Factory_pos(name) {
  switch (name) {
    case "Xiaomi":
      {
        console.log("Xiaomi");
        if (textOrDesc("名称").exists())
          y_pic = String(textOrDesc("名称").findOne().parent().bounds()).match(/\d+/g);
        break;
      }

    case "HONOR":
      {
        console.log("荣耀");
        if (textOrDesc("选择图片").exists())
          y_pic = String(textOrDesc("选择图片").findOne().parent().bounds()).match(/\d+/g);
        break;
      }

    default:
      {
        console.log("其他品牌，默认荣耀配置");
        if (textOrDesc("选择图片").exists())
          y_pic = String(textOrDesc("选择图片").findOne().parent().bounds()).match(/\d+/g);
      }

  }
}

function Factory_confirm(name) {
  switch (name) {
    case "Xiaomi":
      {
        console.log("小米");
        break;
      }
    case "HONOR":
      {
        console.log("荣耀");
        re_exe('确定', 5);
        break;
      }

    default:
      {
        console.log("其他品牌，默认荣耀配置");
        re_exe('确定', 5);
      }

  }
}

function restart_try() {
  console.log("进入retry");
  if (textContains("您确定要退出吗").exists() || descContains("您确定要退出吗").exists()) {
    click("确定");
    console.error("没关系，重新开始！");
    console.show();
    lcl_v();
  }
  if (descContains("货运汽车和小型客车办理进京证").exists() || textContains("货运汽车和小型客车办理进京证").exists()) {
    console.error("没关系，重新开始！");
    console.show();
    lcl_v();
  }
}

function XM_click(name) {
  sub_score++;
  console.hide();
  var refresh_l = new Array();
  if (descContains(name).exists() || textContains(name).exists()) {
    if (descContains(name).exists()) {
      refresh_l = String(descContains(name).findOne().bounds()).match(/\d+/g);
      console.log(refresh_l);
      press((parseInt(refresh_l[0]) + parseInt(refresh_l[2])) / 2, (parseInt(refresh_l[1]) + parseInt(refresh_l[3])) / 2, 500);
    }
    if (textContains(name).exists()) {
      refresh_l = String(textContains(name).findOne().bounds()).match(/\d+/g);
      console.log(refresh_l);
      press((parseInt(refresh_l[0]) + parseInt(refresh_l[2])) / 2, (parseInt(refresh_l[1]) + parseInt(refresh_l[3])) / 2, 500);
    }
  } else {
    console.log("控件不存在，导致点击失败！");
  }
}
if (parseInt(device.sdkInt) > 23)
  A_num = 1;
else {
  alert("安卓7.0版本以上可实现一键申请，低于安卓7.0程序只能自动申请到上传图片阶段！否则程序将会报错！");
  if (confirm("是否接受到达图片上传阶段进行声音提示？")) {
    M_num = 1;
    alert("请在手机内存根目录下放置一个命名为1.mp3的音频文件，用于上传图片阶段的声音提醒！");
    alert("切记手机不要静音！!");
  }
}

function lxz_music() {
  sub_score++;
  importClass(android.media.MediaPlayer);
  var player = new MediaPlayer();
  player.setDataSource("/sdcard/1.mp3");
  player.setVolume(100, 100);
  player.prepare();
  player.start();
  if (confirm("是否关闭音乐提示？")) {
    player.stop();
    player.release();
  }
}

function xvxy() {
  sub_score++;
  Factory_pos(String(device.brand));
  n_v = parseInt(y_pic[3]) + 120;
  console.log(n_v);
  var file_r = open(path, "r");
  user_data = file_r.readlines();
  file_r.close();
  if (user_data[4] == 0) {
    user_data[4] = user_data[6] = user_data[8] = user_data[10] = p_1y = p_2y = p_3y = p_4y = String(n_v);
    var file_w = open(path, "w");
    file_w.writelines(user_data);
    file_w.close();
    var file_r = open(path, "r");
    user_data = file_r.readlines();
    file_r.close();
    console.show();
    for (var i = 0; i < 13; i++) {
      console.warn("自动坐标：" + user_data[i]);
    }
    console.hide();
  }
}
if (check_f.length == 0) {
  console.log("欢迎使用龙小证进京证自动申请神器,若需要使用说明书，请关注微信公众号:龙小证；后续应用更新在公众号推送！如好用，请口口相传！");
  //sleep(5000);
  if (String(device.brand) == "Xiaomi")
    alert("小米品牌的手机请务必把进京证相册置顶，否则无法保证自动申请流程");

  alert("音量+按键可以强制关闭程序");
  alert("申请过程中，除输入用户信息外，请勿操作手机！");
  console.show();
  sleep(500);
  if (textContains("悬浮窗管理").exists()) {
    idContains("main_switcher").click();
    back();
  }
  alert("欢迎使用龍开发的进京证自动申请神器！！第一次使用时请先输入您的个人信息，用于自动申请进京证。");
}
var d_ap = "";
var d_time = "";
var p_1x = 0;
var p_1y = 0;
var p_2x = 0;
var p_2y = 0;
var p_3x = 0;
var p_3y = 0;
var p_4x = 0;
var p_4y = 0;
var p_5x = 0;
var p_5y = 0;
var m_v = device.width;
var m_h = device.height;

function re_exe(t_text_k, re_counter_k) {
  sub_score++;
  console.warn(sub_score);
  console.show();
  var t_text_a = ""
  t_text_a = t_text_k;
  var End_text = "";
  var re_counter = re_counter_k;
  var re_counter1 = Math.ceil(re_counter_k / 2);
  var re_counter2 = Math.ceil(re_counter_k / 2);
  while (re_counter) {
    sleep(1000);
    var End_text = t_text_a;
    if (!(textOrDesc(t_text_a).exists())) {
      if (textOrDesc("车辆及进京证信息").exists()) {
        if (t_text_a.indexOf("申请") > 0) {
          if ((textContains("有效期").exists() || descContains("有效期").exists()) && ((textOrDesc("查看").exists()) || textOrDesc("审核中").exists()) && (!textOrDesc("+申请").exists())) {
            alert("刚刚申请已经成功或您之前申请的进京证还没有到期，请到期后再来申请吧！");
            home();
            exit();
          }
        }
      }
      console.log(End_text + " 第" + re_counter + "次尝试");
      re_counter--;
      if ((descContains("刷新").exists() || textContains("刷新").exists()) && (textOrDesc("车辆及进京证信息").exists()) && (!textOrDesc("+申请").exists()))
        while (re_counter2--) {
          console.show();
          if (!(re_counter2 == 0)) {
            console.log("第" + re_counter2 + "次点击刷新");
            if (descContains("车辆及进京证信息").exists())
              var refresh_w = String(descContains("车辆及进京证信息").findOne().bounds()).match(/\d+/g);
            if (textContains("车辆及进京证信息").exists())
              var refresh_w = String(textContains("车辆及进京证信息").findOne().bounds()).match(/\d+/g);
            sleep(1000);
            console.hide();
            sleep(1000);
            press((parseInt(refresh_w[0]) + parseInt(refresh_w[2])) * 0.87, (parseInt(refresh_w[1]) + parseInt(refresh_w[3])) / 2, 500);
            sleep(7000);
            console.show();
            console.log("完成对刷新区域坐标的点击");
            if (textOrDesc(t_text_a).exists()) {
              textOrDesc(t_text_a).findOne().click();
              re_counter2 = Math.ceil(re_counter_k / 2);
              break;
            } else {
              if (click(t_text_a)) {
                re_counter2 = Math.ceil(re_counter_k / 2);
                break;
              }
            }
          } else {
            re_counter2 = Math.ceil(re_counter_k / 2);
            break;
          }
        }
      if (re_counter == 0) {
        console.log("重试尝试");
        while (!re_try) {
          back();
          sleep(1000);
          restart_try();
        }
      }
    } else {
      console.info(End_text + "执行点击");
      console.show();
      sleep(200);
      if (textOrDesc(t_text_a).exists()) {
        if (!UiObjectPress(textOrDesc(t_text_a).findOne(), 200)) {
          textOrDesc(t_text_a).findOne().click();
          console.log("在视野里面");

        }
      }
      if (t_text_a == "确定")
        if (id("timebtn").exists()) {
          console.hide();
          sleep(1000);
          UiObjectPress(id('timebtn').findOne(), 300);
        }
      sleep(500);
      console.show();
      while (re_counter1--) {
        sleep(2000);
        if (!((descContains("loading").exists()) || (descStartsWith("加载中").exists()))) {
          console.info("点击成功");
          return;
        } else {
          console.warn("卡住了第" + re_counter1 + "尝试");
          if (re_counter1 == 0) {
            back();
            console.error("没关系，重新开始！");
            console.show();
            lcl_v();
          }
        }
      }
    }
  }
}

function textOrDesc(str) {
  return enabled(true).filter(function(obj) {
    return str == obj.text() || str == obj.desc();
  });
}

function textConOrDescCon(str) {
  return enabled(true).filter(function(obj) {
    return str == obj.textContains() || str == obj.descContains();
  });
}

function parseLocalDate(s) {
  var b_va = s.split(/\D/);
  return new Date(b_va[0], b_va[1] - 1, b_va[2], b_va[3], b_va[4]);
}

function pic_jjz() {

  sub_score++;
  console.hide();
  sleep(500);

  Factory(String(device.brand));
}

function jjz1() {
  sub_score++;
  console.show();
  re_exe("货运汽车和小型客车办理进京证", 10);
  console.info("第一步结束");
  re_exe("+申请", 10);
  console.info("第二步结束");
  re_exe("提交", 10);
  console.info("第三步结束");
}

function jjz2() {
  sub_score++;
  sleep(13000);
  console.hide();
    swipe(m_v / 2, m_h * 0.7, m_v / 2, m_h * 0.15, 1000);
    swipe(m_v / 2, m_h * 0.7, m_v / 2, m_h * 0.15, 1000);
    swipe(m_v / 2, m_h * 0.7, m_v / 2, m_h * 0.15, 1000);
    swipe(m_v / 2, m_h * 0.7, m_v / 2, m_h * 0.15, 1000);
    swipe(m_v / 2, m_h * 0.7, m_v / 2, m_h * 0.15, 1000);
    swipe(m_v / 2, m_h * 0.7, m_v / 2, m_h * 0.15, 1000);
    var refresh_l_con = new Array();
    sleep(1000);
    if (desc("北京市公安局公安交通管理局").exists() || text("北京市公安局公安交通管理局").exists()) {
      if (desc("北京市公安局公安交通管理局").exists()) {
        refresh_l_con = String(desc("北京市公安局公安交通管理局").findOne().bounds()).match(/\d+/g);
        console.log(refresh_l_con);
        press(parseInt((parseInt(refresh_l_con[0]) + parseInt(refresh_l_con[2])) / 2), parseInt(parseInt(refresh_l_con[3]) * 0.96), 300);
      }
      if (text("北京市公安局公安交通管理局").exists()) {
        refresh_l_con = String(text("北京市公安局公安交通管理局").findOne().bounds()).match(/\d+/g);
        console.log(refresh_l_con);
        press(parseInt((parseInt(refresh_l_con[0]) + parseInt(refresh_l_con[2])) / 2), parseInt(parseInt(refresh_l_con[3]) * 0.96), 300);
      }
    }
  sleep(1000);
  console.show();
  sleep(500);
  user_adata[13] = String(num_rec);
  console.log(num_rec);
  if (clxx == 1) {
    alert("只有10秒的时间去输入车辆信息！，快！");
    sleep(12000);
  }
  console.error("1秒后执行点击！！");
  sleep(1000);
  re_exe("核验环保等级", 5);
  if (A_num == 0) {
    if (M_num == 1) {
      C_num = 1;
      lxz_music();
    }
    alert("由于安卓版本过低，导致上传图片内容无法自动进行，请手动继续申请！");
    alert("请点击音量+按钮结束龙小证！");
  }
  re_exe('0', 11);
  sleep(500);
  click("从手机相册中选择");
  sleep(500);
  console.warn("点击相册选择按钮");
  sleep(1000);
  pic_jjz();
  sleep(2000);
  xvxy();
  sleep(1000);
  press(p_1x, p_1y, 300);
  sleep(800);
  Factory_confirm(String(device.brand));
  sleep(1000);
  re_exe('1', 5);
  sleep(500);
  click("从手机相册中选择");
  sleep(500);
  console.warn("点击相册选择按钮");
  pic_jjz();
  sleep(1000);
  press(p_2x, p_2y, 300);
  sleep(800);
  Factory_confirm(String(device.brand));
  sleep(500);
  if (!(textContains(d_name).exists() || descContains(d_name).exists())) {
    sleep(500);
    console.warn("自动输入驾驶员信息:姓名");
    while (!setText(2, d_name));
    console.warn("执行成功");
  }
  if (!(textContains(d_number).exists() || descContains(d_number).exists())) {
    sleep(500);
    console.warn("自动输入驾驶员信息：驾驶证号");
    while (!setText(3, d_number));
    console.warn("执行成功");
  }
  sleep(1000);
  re_exe('2', 5);
  sleep(500);
  click("从手机相册中选择");
  sleep(500);
  console.warn("点击相册选择按钮");
  pic_jjz();
  sleep(2000);
  press(p_3x, p_3y, 300);
  sleep(800);
  Factory_confirm(String(device.brand));
  sleep(500);
  re_exe('3', 5);
  sleep(500);
  click("从手机相册中选择");
  sleep(500);
  console.warn("点击相册选择按钮");
  pic_jjz();
  sleep(2000);
  press(p_4x, p_4y, 300);
  sleep(800);
  Factory_confirm(String(device.brand));
  sub_score = sub_score + 10;
  sleep(800);
  swipe(m_v / 2, m_h * 0.8, m_v / 2, m_h * 0.15, 500);
  re_exe('下一步', 5);
  re_exe('请选择进京日期', 5);
  console.warn("执行日期点击动作" + " " + d_ap + "号");
  sleep(1000);
  if (desc(d_ap).exists()) {
    UiObjectPress(desc(d_ap).findOne(), 200);
  }
  if (text(d_ap).exists()) {
    UiObjectPress(text(d_ap).findOne(), 200);
  }
  console.warn("日期点击成功");
  re_exe('请选择进京时长', 5);
  console.hide();
  sleep(500);
  swipe(m_v / 2, m_h * 0.8, m_v / 2, m_h * 0.15, 500);
  re_exe('7天', 5);
  re_exe('请选进京区县', 5);
  re_exe('昌平', 5);
  re_exe('请选进京道路', 5);
  re_exe('其他道路', 5);
  re_exe('提交', 5);
  sub_score = sub_score + 10;
  sleep(1000);
  re_exe('确认提交', 10);
  B_num = 1;
  sub_score = sub_score + 10;
  sleep(1600);
  alert("申请过程结束,请点击音量+按键，结束龙小证!，如果不点的话，无法停止哦！哦，对，他是一匹马，不让它停，它是停不下来的。哈哈哈");
}

console.hide();
var d_name = rawInput("请输入驾驶人名字");
var path = context.getFilesDir() + "/" + d_name + ".txt";
var path_a = context.getFilesDir();
var user_data = new Array();
var user_adata = new Array();
if (files.exists(path) && (confirm("请确认您之前存储的信息是否正确"))) {
  var file_r = open(path, "r");
  sub_score = sub_score + 10;
  user_adata = file_r.readlines();
  d_name = user_adata[0];
  d_number = user_adata[1];
  var d_key = user_adata[2];
  p_1x = parseInt(user_adata[3]);
  p_1y = parseInt(user_adata[4]);
  p_2x = parseInt(user_adata[5]);
  p_2y = parseInt(user_adata[6]);
  p_3x = parseInt(user_adata[7]);
  p_3y = parseInt(user_adata[8]);
  p_4x = parseInt(user_adata[9]);
  p_4y = parseInt(user_adata[10]);
  p_5x = parseInt(user_adata[11]);
  p_5y = parseInt(user_adata[12]);
  num_rec = parseInt(user_adata[13]) + 1;
  user_adata[13] = String(num_rec);
  file_r.close();
  var file_rec = open(path, "w");
  file_rec.writelines(user_adata);
  file_rec.close();
  var file_r = open(path, "r");
  user_adata = file_r.readlines();
  console.warn("龙小证已经为您服务" + user_adata[13] + "次了，天天开心哦！");
} else {
  files.removeDir(path_a);
  var path_k = context.getFilesDir();
  user_data[0] = d_name;
  d_number = user_data[1] = rawInput("请输入驾驶证号码，也就是您的身份证号码，请确保准确无误");
  //stf_v();
  //d_key = rawInput("请输入验证码,该验证码与身份证号是对应的,加入龙小证儿内测qq群:1974172,发送申请人身份证号前六位与后四位，我将为你生成KEY后回复给你");
  user_data[2] = "0";
  user_data[4] = user_data[6] = user_data[8] = user_data[10] = p_1y = p_2y = p_3y = p_4y = String(0);
  p_1x = user_data[3] = String(Math.ceil(m_v * 0.125));
  p_2x = user_data[5] = String(Math.ceil(m_v * 0.375));
  p_3x = user_data[7] = String(Math.ceil(m_v * 0.625));
  p_4x = user_data[9] = String(Math.ceil(m_v * 0.875));
  p_5x = user_data[11] = String(Math.ceil(m_v * 0.935));
  p_5y = user_data[12] = String(Math.ceil(0));
  user_data[13] = "0";
  num_rec = parseInt(user_data[13]);
  console.show();
    if (user_data[0] == "") {
      alert("信息不全，重新输入吧，要不也用不了!");
      exit();
    }

  var file_w = open(path, "w");
  file_w.writelines(user_data);
  file_w.close();
}
console.warn("申请过程开始!");
console.error(num_rec);
if (num_rec < 1)
  if (confirm("车辆环保信息是否需要修改，如果您的车辆信息还没有填写过，请点击确认，如果信息已经存在请点击取消！")) {
    clxx = 1;
  }
threads.start(function() {
  console.hide();
  abstime();
});

function lcl_v() {
  launchApp("北京交警");
  sleep(4000);
  sub_score++;
  console.warn(sub_score);
  while (1) {
    console.show();
    jjz1();
    sleep(3000);
    if ((descContains("由于办理电子进京证").exists()) || (textContains("由于办理电子进京证").exists()) || (textContains("加载失败").exists()) || (descContains("加载失败").exists()) || (descContains("给您带来的不便请谅解").exists()) || textContains("给您带来的不便请谅解").exists() || descContains("系统维护中").exists() || textContains("系统维护中").exists() || textContains("请稍后再试").exists() || descContains("请稍后再试").exists()) {
      back();
      sleep(1000);
      console.error("貌似还申请不了");
    } else {
      console.info("初步状态校验通过");
      jjz_counter = 10;
      while (jjz_counter) {
        if (!(descContains("进京证使用规定").exists() || textContains("进京证使用规定").exists())) {
          sleep(1000);
          jjz_counter--;
          if (jjz_counter == 0) {
            back();
          }
        } else {
          console.error("满足要求,继续申请过程");
          console.show();
          jjz2();
          jjz_counter = 0;
          sleep(1500);
          console.show();
          console.error("申请完成,即将重新确认！！！");
          sleep(3000);
          home();
          lcl_v();
        }
      }
    }
  }
}

function alipay(code) {
  var url = "intent://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2F" + code + "%3F_s%3Dweb-other&_t=1472443966571#Intent;scheme=alipayqr;package=com.eg.android.AlipayGphone;end"
  var intent = android.content.Intent.parseUri(url, android.content.Intent.URI_INTENT_SCHEME);
  context.startActivity(intent);
}

function abstime() {
  sub_score++;
  var i = 0;
  gettime();
  while (qqTime.indexOf("html") >= 0) {
    sleep(200);
    gettime();
  }
  var same_check = qqTime;
  var w_data = qqTime.slice(8, 10);
  if (w_data.indexOf("0") == 0)
    w_data = w_data.replace("0", "");
  d_time = rawInput("开始申请过程的时间,要马上申请的话可以直接输入：马上 ，定时申请的话，要符合如下格式;如2017-11-02T21:30:00", qqTime);
  d_ap = rawInput("请输入需要申请哪天的进京证;注意：进京证申请只能是未来五天的某一天，更长时间是不能申请的！！输入内容实例：比如今天是" + w_data + "号，那么请输入：" + w_data, w_data);
  var delay_time = (parseLocalDate(d_time).getTime() - Date.now());
  if (d_time == same_check) {
    console.show();
    lcl_v();
  } else {
    setTimeout(function() {
      console.show();
      lcl_v();
    }, delay_time);
    setInterval(function() {
      i++;
      toast((delay_time / 1000) - i * 10 + "秒");
    }, 5000);
  }
}