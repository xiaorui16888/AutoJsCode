while (true) {
  sleep(300);

  // xs=dialogs.prompt("按time系数","1.32")*1;
  xs = 1.36
  sleep(800);
  if (!requestScreenCapture()) {
    toast("请求截图失败");
    exit();
  }
  sleep(500);
  var img = captureScreen();
  asd = "#34343f"
  zb(asd);
  var x = dx + 4;
  var y = dy;
  if (x < 540) {
    /////x//x//x/向右侧前进
    g3 = Math.sqrt(3);
    x2 = 1065;
    y2 = Math.round(y - (1080 - x) / g3) + 188;
    im(5, 960)
    var mr1 = mr;
    var mg1 = mg;
    var mb1 = mb;
    while (y + 188 > y2) {
      im(x2, y2)
      if (Math.abs(mr - mr1) < 10 && Math.abs(mg - mg1) < 10 && Math.abs(mb - mb1) < 10) {
        y2 += 5;
        x2 = x2 - Math.round(5 * g3);
      } else {
        break;
      }
    }
    clol = colors.toString(c).replace("#ff", "#");
    log("侧边" + "x2." + x2 + "y2." + y2 + "颜色" + c);
    zb(clol);
    y = y + 188;
    dy = (y2 * 2 - dy);
    log("x=" + x + "y=" + y + "dx=" + dx + "dy=" + dy)
    var jl = Math.round(Math.sqrt(Math.pow(dx - x, 2) + Math.pow(y - dy, 2), 2));
    log("距离" + jl);
    sleep(500);
    press(500, 300, jl * xs)
    
  } else { ///左
    g3 = Math.sqrt(3);
    x2 = 5;
    y2 = Math.round(y - (x / g3)) + 188
    im(5, 960)
    var mr1 = mr;
    var mg1 = mg;
    var mb1 = mb;
    while (y + 188 > y2) {
      im(x2, y2)
      if (Math.abs(mr - mr1) < 10 && Math.abs(mg - mg1) < 10 && Math.abs(mb - mb1) < 10) {
        y2 += 5;
        x2 = x2 + Math.round(5 * g3);
      } else {
        break;
      }
    }
    clol = colors.toString(c).replace("#ff", "#");
    log("侧边" + "x2&." + x2 + "y2.&" + y2 + "颜色" + c);
    zb(clol);
    y = y + 188;
    dy = (y2 * 2 - dy);
    log("x=" + x + "y=" + y + "dx=" + dx + "dy=" + dy)
    var jl = Math.round(Math.sqrt(Math.pow(dx - x, 2) + Math.pow(y - dy, 2), 2));
    log("距离" + jl);
    sleep(500);
    press(500, 300, jl * xs)
    

  }

  sleep(2000);
}


function zb(clol) {
  var point = findColorInRegion(img, clol, 9, 500, 1070, 1000);
  if (point) {
    dx = point.x;
    dy = point.y;
    toastLog("顶点dx = " + dx + ", dy = " + dy);
  } else {
    toastLog("没有找到");
    exit();
  }
}

function im(x2, y2) {
  //获取在点(x, y)处的颜色
  c = images.pixel(img, x2, y2);
  //显示该颜色
  mr = colors.red(c);
  mg = colors.green(c);
  mb = colors.blue(c);
  return mr, mg, mb, c;
};
//2