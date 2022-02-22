requestScreenCapture();
openConsole();
awc = 20;
try{
		app.startActivity({
			action:"android.intent.action.VIEW",
			data:"mqqapi://card/show_pslcard?&uin=787067033"
		});
	}catch(e){
        log("必须qq验证");
	}
log("给作者点赞才能继续运行");
for(i=0;i<=9;i++){   
while(!packageName("com.tencent.mobileqq").className("android.widget.FrameLayout").id("name").drawingOrder(6).findOne().click());
}
log("点赞完毕\n游戏开始3秒后点击确定");

function capturescreen() {
  while (true) {
    if (ajt = captureScreen()) {
      return ajt;
      break;
    }
  }
}

function c0() {
  for (i0 = 0; i0 <= 6; i0++) {
    for (i1 = 0; i1 <= 9; i1++) {
      c1 = -10523472;
      c2 = a2[i0][i1];
      if (Math.abs(colors.red(c1) - colors.red(c2)) < awc && Math.abs(colors.green(c1) - colors.green(c2)) < awc && Math.abs(colors.blue(c1) - colors.blue(c2)) < awc) {
        b1[i0][i1] = 0;
      }
    }
  }
}

function d0(d01, d02, d03, d04) {
  if (d01 == d03) {
    d05 = (d02 - d04) / (Math.abs(d02 - d04));
    for (d06 = d04 + d05; d06 != d02; d06 += d05) {
      if (b1[d01][d06] != 0) {
        return false;
      }
    }
  }
  if (d02 == d04) {
    d05 = (d01 - d03) / (Math.abs(d01 - d03));
    for (d06 = d03 + d05; d06 != d01; d06 += d05) {
      if (b1[d06][d02] != 0) {
        return false;
      }
    }
  }
  if (d01 != d03 && d02 != d04) {
    return false;
  }
  return true;
}

function d1(d11, d12, d13, d14) {
  if (b1[d11][d14] == 0) {
    if (d0(d11, d14, d11, d12) && d0(d11, d14, d13, d14)) {
      return true;
    }
  }
  if (b1[d13][d12] == 0) {
    if (d0(d13, d12, d11, d12) && d0(d13, d12, d13, d14)) {
      return true;
    }
  }
  return false;
}

function d2(d21, d22, d23, d24) {
  for (d25 = 0; d25 <= 6; d25++) {
    if (b1[d25][d22]==0&&d0(d25, d22, d21, d22) && d1(d25, d22, d23, d24)) {
      return true;
    }
  }
  for (d25 = 0; d25 <= 9; d25++) {
    if (b1[d21][d25]==0&&d0(d21, d25, d21, d22) && d1(d21, d25, d23, d24)) {
      return true;
    }
  }
  if (b1[0][d22]==0&&b1[0][d24]==0&&d0(0, d22, d21, d22) && d0(0, d24, d23, d24)) {
    return true;
  }
  if (b1[6][d22]==0&&b1[6][d24]==0&&d0(6, d22, d21, d22) && d0(6, d24, d23, d24)) {
    return true;
  }
  if (b1[d21][0]==0&&b1[d23][0]==0&&d0(d21, 0, d21, d22) && d0(d23, 0, d23, d24)) {
    return true;
  }
  if (b1[d21][9]==0&&b1[d23][9]==0&&d0(d21, 9, d21, d22) && d0(d23, 9, d23, d24)) {
    return true;
  }
  return false;
}

function d3(d31, d32, d33, d34) {
  if (d0(d31, d32, d33, d34) || d1(d31, d32, d33, d34) || d2(d31, d32, d33, d34)) {
    return true;
  }
}

function abs(a7, a8, a9, a10) {
  a11 = a2[a7][a8];
  a12 = a2[a9][a10];
  //log(colors.toString(ab6)+":"+colors.toString(ab7));
  if (Math.abs(colors.red(a11) - colors.red(a12)) < awc && Math.abs(colors.green(a11) - colors.green(a12)) < awc && Math.abs(colors.blue(a11) - colors.blue(a12)) < awc) {
    return true;
  } else {
    return false;
  }
}
function akzt(){
new java.lang.Thread(function() {
    packageName("com.stardust.scriptdroid").className("android.widget.EditText").setText("点击确定->");
  }).start();
  console.rawInput("点击确定开始执行\nQQ:787067033", "");
}
while (true) {
  akzt();
  a0 = [113, 255, 398, 541, 684, 827, 970];
  a1 = [530, 672, 815, 958, 1100, 1243, 1386, 1528, 1671, 1814];
  a2 = new Array();
  b1 = new Array();
  for (i0 = 0; i0 <= 6; i0++) {
    a2[i0] = new Array();
    b1[i0] = new Array();
    for (i1 = 0; i1 <= 9; i1++) {
      a2[i0][i1] = images.pixel(capturescreen(), a0[i0], a1[i1])
    }
  }
  b0 = 1;
  for (i0 = 0; i0 <= 6; i0++) {
    for (i1 = 0; i1 <= 9; i1++) {
      if (b1[i0][i1] == null) {
        b1[i0][i1] = b0;
        b0++;
        for (i2 = 0; i2 <= 6; i2++) {
          for (i3 = 0; i3 <= 9; i3++) {
            if (abs(i0, i1, i2, i3)) {
              b1[i2][i3] = b1[i0][i1];
            }
          }
        }
      }
    }
  }
  c0();
  while (true) {
    e = 0;
    for (i0 = 0; i0 <= 6; i0++) {
      for (i1 = 0; i1 <= 9; i1++) {
        if (b1[i0][i1] != 0) {
          for (i2 = 0; i2 <= 6; i2++) {
            for (i3 = 0; i3 <= 9; i3++) {
              if ((i0 != i2 || i1 != i3) && b1[i0][i1] == b1[i2][i3] && b1[i0][i1] != 0) {
                if (d3(i0, i1, i2, i3)) {
                  swipe(a0[i0], a1[i1], a0[i0], a1[i1], 1);
                  swipe(a0[i2], a1[i3], a0[i2], a1[i3], 1);
                  sleep(20);
                  e++;
                  log(i0 + "," + i1 + "," + i2 + "," + i3);
                  b1[i0][i1] = 0;
                  b1[i2][i3] = 0;
                }
              }
            }
          }
        }
      }
    }
    if (e == 0) {
      break;
    }
    t = "";
    for (i0 = 0; i0 <= 9; i0++) {
      t = t + "\n";
      for (i1 = 0; i1 <= 6; i1++) {
        t = t + b1[i1][i0] + ",  ";
      }
    }
    log(t);
  }
}