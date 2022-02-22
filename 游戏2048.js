function akzt0() {
  new java.lang.Thread(function() {
    while (packageName("com.stardust.scriptdroid").id("input").findOne().getText() == null);
    while (!packageName("com.stardust.scriptdroid").id("submit").findOne().click());

  }).start();
}

function a1() {
  a0 = new Array();
  for (i0 = 0; i0 <= 3; i0++) {
    a0[i0] = new Array();
    for (i1 = 0; i1 <= 3; i1++) {
      a0[i0][i1] = 0;
    }
  }
} //初始化游戏
function b1() {
  b = "2向上6向右8向下4向左\n";
  for (i0 = 0; i0 <= 3; i0++) {
    for (i1 = 0; i1 <= 3; i1++) {
      b0 = "";
      for (i3 = ("" + a0[i1][i0]).length; i3 <= 4; i3++) {
        b0 = "   " + b0;
      }
        if(a0[i1][i0]!=0){
      b = b + b0 + a0[i1][i0] + " ";}else{
       b = b + b0 +"."+ " ";
          }
    }
   b = b + "\n\n\n";
  }
  console.info(b);
} //重绘显示游戏
function c0(c1) {
  c2 = [0, 0, 0, 0];
  c3 = 0;
  for (i = 0; i <= 3; i++) {
    if (c1[i] != 0) {
      c2[c3] = c1[i];
      c3++;
    }
  } //排列
  for (i = 0; i <= 2; i++) {
    if (c2[i] == c2[i + 1]) {
      c2[i] = c2[i + 1] * 2;
      c2[i + 1] = 0;
    }
  } //合并
  c1 = c2;
  c2 = [0, 0, 0, 0];
  c3 = 0;
  for (i = 0; i <= 3; i++) {
    if (c1[i] != 0) {
      c2[c3] = c1[i];
      c3++;
    }
  } //排列
  return c2;
} //合并排列
function d0() {
  d1 = 0;
  for (i0 = 0; i0 <= 3; i0++) {
    for (i1 = 0; i1 <= 3; i1++) {
      if (a0[i0][i1] == 0) {
        d1++;
      }
    }
  }
  if (d1 == 0) {
    log("死亡!");
    return true;
  }
  d2 = random(1, d1);
  d1 = 0;
  for (i0 = 0; i0 <= 3; i0++) {
    for (i1 = 0; i1 <= 3; i1++) {
      if (a0[i0][i1] == 0) {
        d1++;
        if (d1 == d2) {
          a0[i0][i1] = 2;
        }
      }
    }
  }
  return false;
} //随机插入2
function e0(e1) {
  e4 = 0;
  if (e1 == 2) {
    for (i0 = 0; i0 <= 3; i0++) {
      e2 = [0, 0, 0, 0];
      for (i1 = 0; i1 <= 3; i1++) {
        e2[i1] = a0[i0][i1];
      }
      e3 = c0(e2);
      for (i1 = 0; i1 <= 3; i1++) {
        if (a0[i0][i1] != e3[i1]) {
          e4++;
        }
        a0[i0][i1] = e3[i1];

      }
    }
  } //上
  if (e1 == 6) {
    for (i0 = 0; i0 <= 3; i0++) {
      e2 = [0, 0, 0, 0];
      for (i1 = 0; i1 <= 3; i1++) {
        e2[i1] = a0[3 - i1][i0];
      }
      e3 = c0(e2);

      for (i1 = 0; i1 <= 3; i1++) {
        if (a0[3 - i1][i0] != e3[i1]) {
          e4++;
        }
        a0[3 - i1][i0] = e3[i1];
      }
    }
  } //右
  if (e1 == 8) {
    for (i0 = 0; i0 <= 3; i0++) {
      e2 = [0, 0, 0, 0];
      for (i1 = 0; i1 <= 3; i1++) {
        e2[i1] = a0[i0][3 - i1];
      }
      e3 = c0(e2);

      for (i1 = 0; i1 <= 3; i1++) {
        if (a0[i0][3 - i1] != e3[i1]) {
          e4++;
        }
        a0[i0][3 - i1] = e3[i1];
      }
    }
  } //下
  if (e1 == 4) {
    for (i0 = 0; i0 <= 3; i0++) {
      e2 = [0, 0, 0, 0];
      for (i1 = 0; i1 <= 3; i1++) {
        e2[i1] = a0[i1][i0];
      }
      e3 = c0(e2);

      for (i1 = 0; i1 <= 3; i1++) {
        if (a0[i1][i0] != e3[i1]) {
          e4++;
        }
        a0[i1][i0] = e3[i1];
      }
    }
  } //左
  if (e4 == 0) {
    return true;
  } else {
    return false;
  }
} //移动
a1();
d0();
d0();
while (true) {
    clearConsole();
  b1();
  akzt0();
  while (e0(console.rawInput())) {
    akzt0();
  };
  if (d0()) {
    break;
  };
}