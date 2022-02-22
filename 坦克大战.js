"ui";
"use strict";
toast("作者：High_Logic，禁止将本JS用于任何商业用途。")
alert("说明书：①长按向下移动键退出。②点击方向键或者屏幕开火。③长按屏幕十连击。④长按向右移动键加作者QQ。")
Array.prototype.delete = function(x, y) {
  if (!y) {
    y = x
  }
  this.splice(x, y - x + 1)
}
alert("如果你手机无法正常显示，在代码第11，12行调一下吧！有什么bug，请通过QQ联系作者，感激不尽。")
var textSize = 42
var button = 1.0 //数值在0-2之间，越大，按钮和进度条越往下。
ui.layout("<frame background='#666666'><text id='board'textSize='" + textSize + "px'marginBottom='100'textColor='#000000'/><text id='left'marginTop='" + 540 * button + "'w='120px'h='120px'textSize='100px'textColor='#ffffff'marginLeft='55'>◀</text><text id='right'marginTop='" + 540 * button + "'w='120px'h='120px'textSize='100px'textColor='#ffffff'marginLeft='250'>▶</text><text id='up'marginTop='" + 500 * button + "'w='120px'h='120px'textSize='100px'textColor='#ffffff'marginLeft='150'>▲</text><text id='down'marginTop='" + 580 * button + "'w='120px'h='120px'textSize='100px'textColor='#ffffff'marginLeft='150'>▼</text><progressbar marginTop='" + 610 * button + "'id='progressbar'progress='100'style='@style/Base.Widget.AppCompat.ProgressBar.Horizontal'/></frame>")
ui.left.click(() => {
  goLeft(core[8], 8)
})
ui.right.click(() => {
  goRight(core[8], 8)
})
ui.up.click(() => {
  goUp(core[8], 8)
})
ui.down.click(() => {
  goDown(core[8], 8)
})
ui.board.click(() => {
  moving[8] = 0
  if (!(count % $speed)) return
  fire(core[8], dn[8], moving[8])
})
ui.board.longClick(() => {
  fastFire = 10
})
ui.down.longClick(() => {
  clearInterval(il)
  exit()
  toast("33行print board删掉。")
})
ui.right.longClick(() => {
  try {
    app.startActivity({
      action: 'android.intent.action.VIEW',
      data: 'mqqapi://card/show_pslcard?&uin=2185141495'
    });
    toast('正在打开QQ')
  } catch (e) {
    alert('失败，作者QQ2185141495，请手动添加。')
  }
})

function layout() {
  ui.progressbar.setProgress(Math.floor(100 * hp[8] / $hp))
  var str = []
  for (var i = 0; i < 31; i++) {
    for (var j = 0; j < 25; j++) {
      var a = map[i][j]
      if (a) {
        if (a === "8") {
          str += "●"
        } else {
          str += "■"
        }
      } else {
        str += "□"
      }
    }
    str += "\n"
  }
  ui.board.text(str)
}
//②全局变量初始化，横线上面的可以改。
var $speed = 10 //自己的火力，正整数，越大火力越强，为1时无法开火。
var speed = 7 //敌人攻击你的概率，正整数，越小概率越大，为1时100%开火。
var ie = 70 //开局无敌时间。
var pEnemy = 70 //刷怪频率。
var hEnemy = 1 //小怪血量。
var $hp = 10 //自身血量。
var ifSetEnemy = 1 //是否刷怪。
var enemyMax = 4 //最大敌人数量。
var fastFire = 0
var bossCore = null
//====================//
var $ie = ie
var map = [] //地图。
var ct = 9 //敌人编号。
var core = [] //存储坦克的核。
core[8] = [8, 9]
var dn = [] //存储炮口朝向。
dn[8] = "up"
var moving = [] //存储移动状态。
moving[8] = 0
var hp = [] //存储血量。
hp[8] = $hp
var count = 0
var enemy = 0 //敌人数量。
var died = 0 //死亡次数。
//③地图初始化。
for (var i = 0; i < 31; i++) {
  map.push([])
  for (var j = 0; j < 25; j++) {
    map[i].push(0)
  }
}
map[8][8] = 8, map[8][9] = "8", map[8][10] = 8, map[9][8] = 8, map[9][10] = 8, map[7][9] = 8
layout()
var il = setInterval(tick, 25)
/*0：空。
 *2：boss。
 *3：左子弹。
 *4：右子弹。
 *5：上子弹。
 *6：下子弹。
 *7：爆炸。
 *8：自身。(除核。)
 *"8"：核。
 *9-?：敌人。
 *"9-?"敌人的核。
 */
//④主要的函数。
function faqBoss() {
  bossCore = properCore(2, 2)

}

function attack(who) { //令敌军攻击你。
  var a = core[who],
    b = core[8]
  if (Math.abs(a[0] - b[0]) <= 1) {
    if (a[1] < b[1]) {
      turnRight(a, who)
    } else {
      turnLeft(a, who)
    }
    fire(a, dn[who])
  }
  if (Math.abs(a[1] - b[1]) <= 1) {
    if (a[0] < b[0]) {
      turnDown(a, who)
    } else {
      turnUp(a, who)
    }
    fire(a, dn[who])
  }
}

function properCore(w, h) {
  for (var k = 0; k < 100; k++) {
    var i = random(1, 29),
      j = random(1, 23),
      flag = 1
    for (var l = 8; l < enemy + 9; l++) {
      if (!(distance(core[l], [i, j]) >= 5 && i >= h && i <= 30 - h && j >= w && j <= 24 - w)) flag = 0
    }
    if (flag) {
      return [i, j]
    }
  }
}

function setEnemy() {
  if (enemy >= enemyMax) return
  var numb = enemy + 9 //敌军编号。
  core[numb] = properCore(0, 0) //敌军核坐标。
  dn[numb] = "up"
  moving[numb] = 0
  hp[numb] = hEnemy
  var i = core[numb][0],
    j = core[numb][1]
  map[i][j] = "" + numb, map[i - 1][j] = numb, map[i][j - 1] = numb, map[i][j + 1] = numb, map[i + 1][j - 1] = numb, map[i + 1][j + 1] = numb
  enemy++
}

function fire(core, dn, moving) { //核坐标，方向，*是否在移动。
  var i = core[0],
    j = core[1]
  switch (dn) {
    case "left":
      {
        if (j <= 1) return
        if (map[i][j - 2] >= 8) {
          hit(map[i][j - 2])
          return
        }
        map[i][j - 2] = 3
        break
      }
    case "right":
      {
        if (j >= 23) return
        if (map[i][j + 2] >= 8) {
          hit(map[i][j + 2])
          return
        }
        map[i][j + 2] = 4
        break
      }
    case "up":
      {
        if (i <= 1) return
        if (map[i - 2][j] >= 8) {
          hit(map[i - 2][j])
          return
        }
        map[i - 2][j] = 5
        break
      }
    case "down":
      {
        if (i >= 29) return
        if (map[i + 2][j] >= 8) {
          hit(map[i + 2][j])
          return
        }
        map[i + 2][j] = 6
        break
      }
  }
  layout()
}

function distance(core1, core2) { //计算两个核的距离。
  return Math.sqrt(Math.pow(core1[0] - core2[0], 2) + Math.pow(core1[1] - core2[1], 2))
}

function kill(who) {
  moving[who] = 0
  if (who == 8) {
    if (ie > 0) return
    died++
    toast("第" + died + "次死亡。QAQ")
    ie = $ie
    hp[8] = $hp
    core[8] = properCore(0, 0)
  } else {
    core.delete(who), dn.delete(who), moving.delete(who), hp.delete(who)
    enemy--
  }
  for (var i = 0; i < 31; i++) {
    for (var j = 0; j < 25; j++) {
      if (map[i][j] == who) map[i][j] = 0
      if (who > 8 && map[i][j] > who) {
        if (typeof(map[i][j]) === "string") {
          map[i][j] = String(map[i][j] - 1)
        } else {
          map[i][j]--
        }
      }
    }
  }
}

function goLeft(core, who) {
  turnLeft(core, who)
  fire(core, dn[who])
  moving[who] = 1
}

function goRight(core, who) {
  turnRight(core, who)
  fire(core, dn[who])
  moving[who] = 1
}

function goUp(core, who) {
  turnUp(core, who)
  fire(core, dn[who])
  moving[who] = 1
}

function goDown(core, who) {
  turnDown(core, who)
  fire(core, dn[who])
  moving[who] = 1
}

function turnLeft(core, who) {
  var i = core[0],
    j = core[1]
  if (((map[i + 1][j + 1] !== who) && (map[i + 1][j + 1] !== 0)) ||
    ((map[i - 1][j + 1] !== who) && (map[i - 1][j + 1] !== 0))) return
  for (var k = i - 1; k <= i + 1; k++) {
    for (var l = j - 1; l <= j + 1; l++) {
      if (map[k][l] === who) map[k][l] = 0
    }
  }
  map[i - 1][j] = who, map[i - 1][j + 1] = who, map[i][j - 1] = who, map[i + 1][j] = who, map[i + 1][j + 1] = who
  dn[who] = "left"
  layout()
}

function turnRight(core, who) {
  var i = core[0],
    j = core[1]
  if (((map[i + 1][j - 1] !== who) && (map[i + 1][j - 1] !== 0)) ||
    ((map[i - 1][j - 1] !== who) && (map[i - 1][j - 1] !== 0))) return
  for (var k = i - 1; k <= i + 1; k++) {
    for (var l = j - 1; l <= j + 1; l++) {
      if (map[k][l] === who) map[k][l] = 0
    }
  }
  map[i - 1][j - 1] = who, map[i - 1][j] = who, map[i][j + 1] = who, map[i + 1][j - 1] = who, map[i + 1][j] = who
  dn[who] = "right"
  layout()
}

function turnUp(core, who) {
  var i = core[0],
    j = core[1]
  if (((map[i + 1][j + 1] !== who) && (map[i + 1][j + 1] !== 0)) ||
    ((map[i + 1][j - 1] !== who) && (map[i + 1][j - 1] !== 0))) return
  for (var k = i - 1; k <= i + 1; k++) {
    for (var l = j - 1; l <= j + 1; l++) {
      if (map[k][l] === who) map[k][l] = 0
    }
  }
  map[i - 1][j] = who, map[i][j - 1] = who, map[i][j + 1] = who, map[i + 1][j - 1] = who, map[i + 1][j + 1] = who
  dn[who] = "up"
  layout()
}

function turnDown(core, who) {
  var i = core[0],
    j = core[1]
  if (((map[i - 1][j + 1] !== who) && (map[i - 1][j + 1] !== 0)) ||
    ((map[i - 1][j - 1] !== who) && (map[i - 1][j - 1] !== 0))) return
  for (var k = i - 1; k <= i + 1; k++) {
    for (var l = j - 1; l <= j + 1; l++) {
      if (map[k][l] === who) map[k][l] = 0
    }
  }
  map[i - 1][j - 1] = who, map[i - 1][j + 1] = who, map[i][j - 1] = who, map[i][j + 1] = who, map[i + 1][j] = who
  dn[who] = "down"
  layout()
}

function bossLeft() {
  for (var i = 0; i < 31; i++) {
    for (var j = 0; j < 25; j++) {
      if (map[i][j] == 2) {
        map[i][j - 1] = map[i][j]
      }
    }
  }
}

function bossRight() {
  for (var i = 30; i >= 0; i--) {
    for (var j = 24; j >= 0; j--) {
      if (map[i][j] == 2) {
        map[i][j + 1] = map[i][j]
      }
    }
  }
}

function bossUp() {
  for (var i = 0; i < 31; i++) {
    for (var j = 0; j < 25; j++) {
      if (map[i][j] == 2) {
        map[i - 1][j] = map[i][j]
      }
    }
  }
}

function bossDown() {
  for (var i = 30; i >= 0; i--) {
    for (var j = 24; j >= 0; j--) {
      if (map[i][j] == 2) {
        map[i + 1][j] = map[i][j]
      }
    }
  }
}

function left(core, who) {
  var i = core[0],
    j = core[1]

  if (j === 1 || map[i - 1][j - 1] > 7 || map[i][j - 2] > 7 || map[i + 1][j - 1] > 7) {
    moving[who] = 0
    return
  }
  map[i - 1][j - 1] = who, map[i + 1][j - 1] = who, map[i][j - 2] = who, map[i - 1][j + 1] = 0, map[i][j] = 0, map[i + 1][j + 1] = 0, map[i][j - 1] = "" + who
  core[1]--
}

function right(core, who) {
  var i = core[0],
    j = core[1]
  if (j === 23 || map[i - 1][j + 1] > 7 || map[i][j + 2] > 7 || map[i + 1][j + 1] > 7) {
    moving[who] = 0
    return
  }
  map[i - 1][j + 1] = who, map[i + 1][j + 1] = who, map[i][j + 2] = who, map[i - 1][j - 1] = 0, map[i][j] = 0, map[i + 1][j - 1] = 0, map[i][j + 1] = "" + who
  core[1]++
}

function up(core, who) {
  var i = core[0],
    j = core[1]
  if (i === 1 || map[i - 1][j - 1] > 7 || map[i - 2][j] > 7 || map[i - 1][j + 1] > 7) {
    moving[who] = 0
    return
  }
  map[i - 1][j - 1] = who, map[i - 2][j] = who, map[i - 1][j + 1] = who, map[i + 1][j - 1] = 0, map[i][j] = 0, map[i + 1][j + 1] = 0, map[i - 1][j] = "" + who
  core[0]--
}

function down(core, who) {
  var i = core[0],
    j = core[1]
  if (i === 29 || map[i + 1][j - 1] > 7 || map[i + 2][j] > 7 || map[i + 1][j + 1] > 7) {
    moving[who] = 0
    return
  }
  map[i + 1][j - 1] = who, map[i + 2][j] = who, map[i + 1][j + 1] = who, map[i - 1][j - 1] = 0, map[i][j] = 0, map[i - 1][j + 1] = 0, map[i + 1][j] = "" + who
  core[0]++
}

function hit(who) {
  hp[who]--
    if (hp[who] <= 0) kill(who)
}

function tick() {
  var iy = [],
    jy = []
  count++
  ie--
  if (fastFire > 0) {
    fire(core[8], dn[8])
    fastFire--
  }
  for (var i = 9; i < enemy + 9; i++) {
    var rm = random(0, 100)
    if (!(rm % speed)) {
      attack(i)
    }
    if (!(count % 40)) {
      switch (Math.floor(rm / 20)) {
        case 0:
          goLeft(core[i], i);
          break
        case 1:
          goRight(core[i], i);
          break
        case 2:
          goUp(core[i], i);
          break
        case 3:
          goDown(core[i], i);
          break
        case 4:
          fire(core[i], dn[i]);
          break
      }
    }
  }
  if (!(count % pEnemy) && ifSetEnemy) {
    setEnemy()
  }
  for (var i = 8; i < enemy + 9; i++) {
    if (moving[i] && count % 2) { //%后面的数字，代表移动速度，数字越大，越慢。
      switch (dn[i]) {
        case "left":
          {
            left(core[i], i)
            break
          }
        case "right":
          {
            right(core[i], i)
            break
          }
        case "up":
          {
            up(core[i], i)
            break
          }
        case "down":
          {
            down(core[i], i)
            break
          }
      }
    }
  }
  for (var i = 0; i < 31; i++) {
    for (var j = 0; j < 25; j++) {
      switch (map[i][j]) {
        case 3:
          {
            if (j === 0) {
              map[i][j] = 0
              break
            }
            if (map[i][j - 1] > 7) {
              hit(map[i][j - 1])
            } else {
              map[i][j - 1] = 3
            }
            map[i][j] = 0
            break
          }
        case 4:
          {
            iy.push(i)
            jy.push(j)
            break
          }
        case 5:
          {
            if (i === 0) {
              map[i][j] = 0
              break
            }
            if (map[i - 1][j] > 7) {
              hit(map[i - 1][j])
            } else {
              map[i - 1][j] = 5
            }
            map[i][j] = 0
            break
          }
        case 6:
          {
            iy.push(i)
            jy.push(j)
            break
          }
      }
    }
  }
  for (var k = iy.length - 1; k >= 0; k--) {
    var i = iy[k],
      j = jy[k]
    switch (map[i][j]) {
      case 4:
        {
          if (j === 24) {
            map[i][j] = 0
            break
          }
          if (map[i][j + 1] > 7) {
            hit(map[i][j + 1])
          } else {
            map[i][j + 1] = 4
          }
          map[i][j] = 0
          break
        }
      case 6:
        {
          if (i === 30) {
            map[i][j] = 0
            break
          }
          if (map[i + 1][j] > 7) {
            hit(map[i + 1][j])
          } else {
            map[i + 1][j] = 6
          }
          map[i][j] = 0
          break
        }
    }
  }
  layout()
}
//