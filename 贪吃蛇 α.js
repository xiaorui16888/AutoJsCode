"ui";

try {

    ui.statusBarColor('#000000')
    ui.layout("<frame><vertical bg='#000000'align='top'h='1000'><frame bg='#CCCCCC'align='top'h='410'><text id='disp'margin='5'bg='#FFFFFF'gravity='top'color='#000000'size='20'h='400'/></frame><frame bg='#CCCCCC'align='top'h='210'><button id='lef'text='左'w='100'h='100'margin='55 0 0 0'/><button id='top'text='上'w='100'h='100'margin='0 0 0 100'/><button id='but'text='下'w='100'h='100'margin='105 0 0 100'/><button id='rig'text='右'w='100'h='100'margin='55 0 0 200'/><text id='hel'text=''w='100'h='55'margin='0'/></frame></vertical></frame>");
    ui.top.click(() => chdire(0))
    ui.rig.click(() => chdire(1))
    ui.but.click(() => chdire(2))
    ui.lef.click(() => chdire(3))
    ui.hel.click(() => chdire(4))
    //格式化代码的时候留意上面的=>，如果变成= >会直接崩溃


    //游戏设置
    var foodfrq = 30
    //每游戏刻有1/foodfrq的概率随机生成食物,设为0则不会随机生成
    //吃光所有食物以后也会生成新的食物
    var ticktime = 400
    //游戏刻的长度，单位毫秒，值越小蛇动的越快


    //全局变量
    var dire
    //0123对应上右下左四个方向,-1表示游戏结束,-2表式开始新游戏
    //转向请调用chdire(0～3),请勿直接修改dire,防止出错

    var snake = []
    //蛇身体数组，第一个成员是蛇头

    var food
    //地图中所有食物的个数

    var map = []
    //地图数组
    var score
    //得分
    main()
    setInterval(gametick, ticktime)
    //游戏刻
} catch (e) {
    //防蹦，没卵用？
    log(e)
    toast(e)
}

//主程，初始化地图和变量
function main() {
    /*
    地图
    0或null空气
    1墙
    2食物
    8蛇头
    9蛇身体
    -1换行
    */
    map = [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, , , , , , , , , , , , , , , , 1, -1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1]
    ]

    //蛇身体占用的方块,第一个值是蛇头,必须有一个值！
    snake = [
        [8, 5],
        [7, 5],
        [6, 5],
        [5, 5]
    ]

    score = 0
    dire = -2
    food = 0
    ui.disp.text('\n    贪吃蛇 Ver 0.2\n\n    By Chr_233\n\n   【按下任意键开始游戏】\n\n\n\n\n\n\n\n\n\n ↓点这里可以联系作者')
    ui.hel.text('\n 得分:' + score)

    fillnull()
    fillsnake()

    spawnfood()
    //setInterval(alert(6),1000)
    /*
    alert(paintmap())

        a=[1, 2, 3, 4, 5, 6, 7, 8]
        for (i in a) {
            gametick()
            dire=dialogs.input(1,dire)
        }
        */
}

//游戏刻过程
function gametick() {
    switch (dire) {
        case 0:
            snkmove(0, -1)
            break
        case 1:
            snkmove(1, 0)
            break
        case 2:
            snkmove(0, 1)
            break
        case 3:
            snkmove(-1, 0)
            break
        case -1:
            ui.hel.text(' 【游戏结束】\n 按任意键重试\n 得分:' + score)
            return (null)
    }
    ui.hel.text('\n 得分:' + score)
    //每游戏刻有1/30的概率随机出现食物，吃掉所有食物也会产生新的食物
    if (foodfrq != 0 && random(1, foodfrq) == 1) {
        spawnfood()
    }
}

//绘制地图
function paintmap() {
    var grap = new String
    for (i in map) {
        for (j in map[i]) {
            grap += txt2grap(map[i][j])
        }
    }
    return (grap)
}

//填充地图
function fillnull() {
    var ys = map.length
    var xs = 0
    for (var i = 0; i < ys; i++) {
        xs = (map[i]).length
        for (var j = 0; j < xs; j++) {
            switch (map[i][j]) {
                case 0:
                case 1:
                case 2:
                case -1:
                    break
                default:
                    map[i][j] = 0
                    break
            }
        }
    }
}

//填充蛇
function fillsnake() {
    for (i in snake) {
        if (map[snake[i][1]][snake[i][0]] == 0) {
            map[snake[i][1]][snake[i][0]] = 9
        }
    }
    map[snake[0][1]][snake[0][0]] = 8
}

//转向(0~3)，分别代表上右下左四个方向(顺时针)
function chdire(num) {
    switch (num) {
        case 0:
        case 1:
        case 2:
        case 3:
            //只能向左,右转，(dire一次只能改变1或3)
            if (Math.abs(dire - num) != 2) {
                dire = num
            } else if (dire == -1) {
                main()
            } else if (dire == -2) {
                dire = num
            }
            break
        case 4:
            qq()
            break
    }
}

//蛇移动(左右,上下移动格数)
function snkmove(mx, my) {
    var lx = snake[0][0] + mx
    var ly = snake[0][1] + my

    switch (map[ly][lx]) {
        case 0:
            //移动蛇头到空地，删除最后一节身体
            snake.unshift([lx, ly])
            var tsnk = snake.pop()
            //更新地图
            map[ly][lx] = 8
            map[ly - my][lx - mx] = 9
            map[tsnk[1]][tsnk[0]] = 0
            break
        case 2:
            //吃到食物,只移动蛇头(相当于增加身体)
            snake.unshift([lx, ly])
            //更新地图
            map[ly][lx] = 8
            map[ly - my][lx - mx] = 9
            score += 100
            food--
            if (food == 0) {
                spawnfood()
            }
            break
        case 1:
        case 9:
            //撞墙或者撞到身体
            dire = -1
            break
    }
    ui.disp.text(paintmap())
    //alert(paintmap())
}

//生成食物
function spawnfood() {
    //可生成的位置
    var space = []
    for (i in map) {
        for (j in map[i]) {
            if (map[i][j] == 0) {
                //空闲空间压入栈
                space.push([j, i])
            }
        }
    }
    var i = space.length
    if (i >= 0) {
        i = random(1, i)
        map[space[i][1]][space[i][0]] = 2
        food++
    } else {
        dire = -1
        //没有空间，游戏结束
    }
}

//数字转换成对应字符，换成自定义主题吧
function txt2grap(num) {
    switch (num) {
        case 0:
            //空气
            return ('□')
        case 1:
            //墙
            return ('■')
        case 2:
            //食物
            return ('●')
        case 8:
            //蛇头(哲♂学♂家)
            return ('♂')
        case 9:
            //蛇身体
            return ('♀')
        case -1:
            //换行标记*不要改这个
            return ('\n')
        default:
            //其他值默认当成空气
            return ('□')
    }
}



/*
******请保留作者信息，谢谢 :-) ******

---作者：Chr_
---创作时间：20171207
---QQ:1142033406

******请保留作者信息，谢谢 :-) ******
*/

function qq() {
    try {
        app.startActivity({
            action: 'android.intent.action.VIEW',
            data: 'mqqapi://card/show_pslcard?&uin=1142033406'
        });
        toast('正在打开QQ,QWQ')
    } catch (e) {
        toast('失败,Orz')
    }
}