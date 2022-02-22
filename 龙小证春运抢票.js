"auto";
console.show();
sleep(500);
if (textContains("悬浮窗管理").exists()) {
  idContains("main_switcher").click();
  back();
}
console.hide();
threads.start(function () {
  events.on("exit", function () {
    alert("龙小证被强制关闭，再见");
    threads.shutDownAll();
    console.hide();
  });
});
var counter = 0;
var hly_v = "";
var d_number_key = rawInput("请输入身份证的前六位与后四位数字，例如身份证号码:211302xxxxxxxx0931,则输入2113020931");
stf_v();
d_key = rawInput("请输入验证码,该验证码与身份证号是对应的,加入龙小证儿内测qq群:1974172,发送申请人身份证号前六位与后四位，我将为你生成KEY后回复给你");
if (!(d_key == hly_v)) {
  alert("验证失败，请确认验证码是否正确！本程序将退出，如需要重试，请重新运行程序");
  exit();
}
var m_v = device.width;
var m_h = device.height;
var window = floaty.window(
  <frame>
    <button id="action" text="龙小证春运抢票" w="auto" h="auto" bg="#77ffffff" />
  </frame>
);
setInterval(() => { }, 1000);
var execution = null;
var x = 0;
var y = 0;
var windowX, windowY;
var downTime;
console.setPosition(0, 250);
var seat_kind = "";
var n_fact = "";
var key_d = false;
n_fact = rawInput("请输入需求的乘坐类型，如：硬座，一等座等");
switch (n_fact) {
  case "硬座":
    {
      seat_kind = "硬座";
      break;
    }
  case "硬卧":
    {
      seat_kind = "硬卧";
      break;
    }

  case "软卧":
    {
      seat_kind = "软卧";
      break;
    }
  case "无座":
    {
      seat_kind = "无座";
      break;
    }
  case "一等":
    {
      seat_kind = "一等";
      break;
    }
  case "二等":
    {
      seat_kind = "二等";
      break;
    }

  case "特等":
    {
      seat_kind = "特等";
      break;
    }

  case "高软":
    {
      seat_kind = "高软";
      break;
    }

  case "任意":
    {
      key_d = true;
      break;
    }
}
window.action.setOnTouchListener(function (view, event) {
  switch (event.getAction()) {
    case event.ACTION_DOWN:
      x = event.getRawX();
      y = event.getRawY();
      windowX = window.getX();
      windowY = window.getY();
      downTime = new Date().getTime();
      return true;
    
    case event.ACTION_MOVE:
      window.setPosition(windowX + (event.getRawX() - x),
        windowY + (event.getRawY() - y));
      return true;
    case event.ACTION_UP:
      if (Math.abs(event.getRawY() - y) < 5 && Math.abs(event.getRawX() - x) < 5) {
      threads.start(function () {
          onClick();
        });
      }
      return true;
  }
  return true;
});
function onClick() {
  if (window.action.getText() == '龙小证开始抢票') {
    window.action.setText('暂停龙小证');
    while (true) {
      counter++;
      toast("龙小证抢了" + String(counter) + "次了！！");

      console.hide();
      sleep(1000);

      swipe(m_v / 2, m_h * 0.35, m_v / 2, m_h * 0.7, 500);
      sleep(1500);

      if (desc("提交订单").exists()) {
        if (!key_d) {
          sleep(200);
          desc(seat_kind).findOne().click();
        }
        desc("提交订单").click();
      }

      if (text("提交订单").exists()) {
        if (!key_d) {
          sleep(200);
          text(seat_kind).findOne().click();
        }

        text("提交订单").click();
      }

      if (desc("确认支付").exists()) {
        alert("龙小证已经为您抢到票了，请先点击停止脚本，然后自己快去支付吧!");
        if (counter > 800) {
          if (confirm("龙小证同学经过" + String(counter) + "次尝试，终于完成了抢票！觉得值得打赏吗？")) {
            console.hide();
            sleep(1000);
            alipay("FKX099191JMATRSHNYWGD3");
            sleep(3000);
          }
        }
        while (true) {
          device.vibrate(500);
          sleep(3000);
        }
        break;
      }
      if (text("确认支付").exists()) {
        alert("龙小证已经为您抢到票了，请先点击停止脚本，然后自己快去支付吧!");
        while (true) {
          device.vibrate(500);
          sleep(3000);
        }
        break;
      }
      if (desc("提交订单").exists()) {
        if (!key_d) {
          sleep(200);
          desc(seat_kind).findOne().click();
        }
        desc("提交订单").click();
      }


      if (text("提交订单").exists()) {
        if (!key_d) {
          sleep(200);
          text(seat_kind).findOne().click();
        }

        text("提交订单").click();

      }

      if (textOrDesc("不购").exists()) {
        while (true) {
          device.vibrate(500);
          sleep(3000);
          toast("龙小证提示您：快去支付！点击悬浮按钮结束申请过程！");
        }

      }

      if (textOrDesc("加载中...").exists()) {
        //toast("加载中");
        sleep(1500);
        continue;
      }

      while (textOrDesc("温馨提示").exists()) {
        sleep(800);
        back();
      }

      /*
      if (textOrDesc("温馨提示").exists() && (descContains("目前您还有处理的订单").exists() || textContains("目前您还有处理的订单").exists())) {
       // toast("温馨提示");
        sleep(500);
        back();
        sleep(500);
        back();
      }

if (textOrDesc("温馨提示").exists() && (descContains("出票失败，没有足够的票").exists() || textContains("出票失败，没有足够的票").exists())) {
       // toast("温馨提示");
        sleep(500);
        back();
        sleep(500);
        back();
      }

      if (textOrDesc("温馨提示").exists() && (descContains("出票失败，对不起，由于您取消次数过多").exists() || textContains("出票失败，对不起，由于您取消次数过多").exists())) {
        device.vibrate(500);
        alert("龙小证发现您取消次数过多,今天不能抢票了，明天再来!!再见");
        console.hide();
        threads.shutDownAll();
        //window.action.setText('龙小证开始抢票');
      }
      //console.show();*/
      if (!(desc("确认订单").exists() || text("确认订单").exists())) {
        if (!key_d) {
          if (descEndsWith("张").descStartsWith(seat_kind).exists()) {
            sleep(200);
            descEndsWith("张").descStartsWith(seat_kind).findOne().click();
          }

          if (descEndsWith("有").descStartsWith(seat_kind).exists()) {
            sleep(200);
            descEndsWith("有").descStartsWith(seat_kind).findOne().click();
          }

          if (textEndsWith("张").textStartsWith(seat_kind).exists()) {
            sleep(200);
            textEndsWith("张").textStartsWith(seat_kind).findOne().click();
          }

          if (textEndsWith("有").textStartsWith(seat_kind).exists()) {
            sleep(200);
            textEndsWith("有").textStartsWith(seat_kind).findOne().click();
          }

          // toast("执行选择性点击");
        }
        else {
          if (descEndsWith("张").exists())
            descEndsWith("张").findOne().click();
          if (descEndsWith("有").exists())
            descEndsWith("有").findOne().click();
          if (textEndsWith("张").exists())
            textEndsWith("张").findOne().click();
          if (textEndsWith("有").exists())
            textEndsWith("有").findOne().click();
          //toast("执行不区分车次的点击");
        }
      }
      //window.action.setText('暂停龙小证');
    }
    //window.action.setText('暂停龙小证');
  } else {
    threads.shutDownAll();
    window.action.setText('龙小证开始抢票');
  }
}
function textOrDesc(str) {
  return enabled(true).filter(function (obj) {
    return str == obj.text() || str == obj.desc();
  });
}
function stf_v() {
  a_v = d_number_key.substring(1, 2);
  b_v = d_number_key.substring(2, 5);
  c_v = d_number_key.substring(4, 6);
  d_v = d_number_key.substring(5, 8);
  e_v = d_number_key.substring(7, 9);
  f_v = d_number_key.substring(6, 7);
  g_v = d_number_key.substring(3, 9);
  fy = a_v * b_v * c_v / 5.16 + d_v - e_v * f_v * g_v / 1.20;
  if (fy < 0)
    fy = e_v * f_v * g_v / 1.20 - a_v * b_v * c_v / 5.16 + 161205;
  hly_v = String(Math.ceil(Math.pow(fy, 0.77)));
}


function alipay(code) {
  var url = "intent://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&qrcode=https%3A%2F%2Fqr.alipay.com%2F" + code + "%3F_s%3Dweb-other&_t=1472443966571#Intent;scheme=alipayqr;package=com.eg.android.AlipayGphone;end"
  var intent = android.content.Intent.parseUri(url, android.content.Intent.URI_INTENT_SCHEME);
  context.startActivity(intent);
}